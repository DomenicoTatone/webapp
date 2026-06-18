import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Download, ImageIcon, Trash2, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PageHeader } from '@/components/shared/PageHeader'
import { usePageMeta } from '@/hooks/usePageMeta'
import { toast } from 'sonner'

type OutputFormat = 'image/jpeg' | 'image/webp' | 'image/png'

interface CompressedImage {
  id: string
  name: string
  originalSize: number
  compressedSize: number
  blob: Blob
  url: string
}

function formatBytes(bytes: number): string {
  if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`
  return `${(bytes / 1024).toFixed(1)} KB`
}

function reductionPercent(originalSize: number, compressedSize: number): number {
  return originalSize > 0
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : 0
}

function extensionFor(format: OutputFormat): string {
  if (format === 'image/webp') return 'webp'
  if (format === 'image/png') return 'png'
  return 'jpg'
}

export function ImageToolPage() {
  const { t } = useTranslation()
  usePageMeta('imageToolHeader')

  const [quality, setQuality] = useState(75)
  const [format, setFormat] = useState<OutputFormat>('image/jpeg')
  const [images, setImages] = useState<CompressedImage[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Keep the latest images in a ref so the unmount cleanup revokes the final set.
  const imagesRef = useRef<CompressedImage[]>([])
  useEffect(() => {
    imagesRef.current = images
  }, [images])

  useEffect(() => {
    return () => {
      for (const img of imagesRef.current) {
        URL.revokeObjectURL(img.url)
      }
    }
  }, [])

  function compressImage(file: File): Promise<CompressedImage> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const src = e.target?.result
        if (typeof src !== 'string') {
          reject(new Error('Read failed'))
          return
        }
        const img = new Image()
        img.onload = () => {
          const canvas = canvasRef.current
          if (!canvas) {
            reject(new Error('Canvas unavailable'))
            return
          }
          canvas.width = img.naturalWidth
          canvas.height = img.naturalHeight
          const ctx = canvas.getContext('2d')
          if (!ctx) {
            reject(new Error('Context unavailable'))
            return
          }
          ctx.drawImage(img, 0, 0)
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Compression failed'))
                return
              }
              const baseName = file.name.replace(/\.[^/.]+$/, '')
              const name = `${baseName}_compressed.${extensionFor(format)}`
              resolve({
                id: `${file.name}-${Date.now()}-${Math.random()
                  .toString(36)
                  .slice(2)}`,
                name,
                originalSize: file.size,
                compressedSize: blob.size,
                blob,
                url: URL.createObjectURL(blob),
              })
            },
            format,
            quality / 100,
          )
        }
        img.onerror = () => reject(new Error('Image load failed'))
        img.src = src
      }
      reader.onerror = () => reject(new Error('Read failed'))
      reader.readAsDataURL(file)
    })
  }

  async function processFiles(files: FileList | File[]) {
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue
      try {
        const result = await compressImage(file)
        setImages((prev) => [...prev, result])
      } catch (error) {
        console.error('Compression error:', error)
        toast.error(`${file.name}`)
      }
    }
  }

  function handleRemove(id: string) {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id)
      if (target) URL.revokeObjectURL(target.url)
      return prev.filter((img) => img.id !== id)
    })
  }

  function handleClearAll() {
    setImages((prev) => {
      for (const img of prev) URL.revokeObjectURL(img.url)
      return []
    })
  }

  function handleDownload(img: CompressedImage) {
    const a = document.createElement('a')
    a.href = img.url
    a.download = img.name
    a.click()
  }

  async function handleDownloadAll() {
    if (images.length === 0) return
    const { default: JSZip } = await import('jszip')
    const zip = new JSZip()
    for (const img of images) {
      zip.file(img.name, img.blob)
    }
    const content = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(content)
    const a = document.createElement('a')
    a.href = url
    a.download = 'compressed_images.zip'
    a.click()
    URL.revokeObjectURL(url)
    toast.success(t('downloadStarted'))
  }

  const totalOriginal = images.reduce((sum, img) => sum + img.originalSize, 0)
  const totalCompressed = images.reduce(
    (sum, img) => sum + img.compressedSize,
    0,
  )
  const totalReduction = reductionPercent(totalOriginal, totalCompressed)

  return (
    <div>
      <PageHeader title={t('imageToolHeader')} />

      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) processFiles(e.target.files)
          e.target.value = ''
        }}
      />

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                fileInputRef.current?.click()
              }
            }}
            onDragEnter={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsDragging(true)
            }}
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsDragging(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsDragging(false)
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsDragging(false)
              if (e.dataTransfer.files) processFiles(e.dataTransfer.files)
            }}
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <Upload className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{t('dropZoneText')}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>{t('compressionQuality')}</Label>
                <span className="font-mono text-sm text-primary">
                  {quality}%
                </span>
              </div>
              <Slider
                min={10}
                max={95}
                step={1}
                value={[quality]}
                onValueChange={([n]) => setQuality(n)}
              />
              <p className="text-xs text-muted-foreground">{t('qualityHint')}</p>
            </div>

            <div className="space-y-2">
              <Label>{t('outputFormat')}</Label>
              <Select
                value={format}
                onValueChange={(v) => setFormat(v as OutputFormat)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image/jpeg">{t('formatJpeg')}</SelectItem>
                  <SelectItem value="image/webp">{t('formatWebp')}</SelectItem>
                  <SelectItem value="image/png">{t('formatPng')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <p className="text-sm italic text-muted-foreground">
            {t('imageToolNotice')}
          </p>
        </CardContent>
      </Card>

      {images.length > 0 && (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img) => {
              const reduction = reductionPercent(
                img.originalSize,
                img.compressedSize,
              )
              return (
                <Card key={img.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden bg-secondary">
                    <img
                      src={img.url}
                      alt={img.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="space-y-3 pt-4">
                    <p
                      className="truncate text-sm font-medium text-foreground"
                      title={img.name}
                    >
                      {img.name}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-mono">
                        {formatBytes(img.originalSize)} →{' '}
                        {formatBytes(img.compressedSize)}
                      </span>
                      <span
                        className={`font-semibold ${
                          reduction > 0
                            ? 'text-success'
                            : 'text-muted-foreground'
                        }`}
                      >
                        -{reduction}%
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleDownload(img)}
                      >
                        <Download className="h-4 w-4" />
                        {t('download')}
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        aria-label={t('removeImage')}
                        title={t('removeImage')}
                        onClick={() => handleRemove(img.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card className="mt-6">
            <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ImageIcon className="h-4 w-4" />
                <span>
                  {images.length} {t('images')} •{' '}
                  <span className="font-mono">
                    {formatBytes(totalOriginal)} →{' '}
                    {formatBytes(totalCompressed)}
                  </span>{' '}
                  <span
                    className={`font-semibold ${
                      totalReduction > 0
                        ? 'text-success'
                        : 'text-muted-foreground'
                    }`}
                  >
                    (-{totalReduction}%)
                  </span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={handleClearAll}>
                  <Trash2 className="h-4 w-4" />
                  {t('clearAll')}
                </Button>
                <Button variant="accent" onClick={handleDownloadAll}>
                  <Download className="h-4 w-4" />
                  {t('downloadAll')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
