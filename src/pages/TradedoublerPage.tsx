import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { ChevronDown, Info } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PageHeader } from '@/components/shared/PageHeader'
import { LinkResultCard } from '@/components/shared/LinkResultCard'
import { CopyButton } from '@/components/shared/CopyButton'
import { OpenLinkButton } from '@/components/shared/OpenLinkButton'
import { getAllIslands, getProgramsForIsland } from '@/data/affiliates'
import { generateTradedoublerLink } from '@/services/linkGenerator'
import type { ProgramCard } from '@/lib/types'
import { usePageMeta } from '@/hooks/usePageMeta'

type BadgeVariant = 'sky' | 'accent' | 'success' | 'secondary' | 'default'

function categoryVariant(category: string): BadgeVariant {
  const upper = category.toUpperCase()
  if (upper.includes('VIAGGI')) return 'sky'
  if (upper.includes('ASSICURAZIONI')) return 'accent'
  if (upper.includes('FINANZA')) return 'success'
  if (upper.includes('NO PROFIT')) return 'secondary'
  return 'default'
}

export function TradedoublerPage() {
  const { t } = useTranslation()
  usePageMeta('usefulTLinksHeader')

  const islands = useMemo(() => getAllIslands(), [])
  const [selectedSite, setSelectedSite] = useState('')
  const [deepLinkOpen, setDeepLinkOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [resultUrl, setResultUrl] = useState<string | null>(null)

  const programs: ProgramCard[] = selectedSite
    ? getProgramsForIsland(selectedSite)
    : []

  const handleSiteChange = (code: string) => {
    setSelectedSite(code)
    setResultUrl(null)
  }

  const handleGenerate = () => {
    if (!selectedSite) {
      toast.warning(t('selectSite'))
      return
    }
    const trimmed = url.trim()
    if (!trimmed) {
      toast.warning(t('enterUrl'))
      return
    }
    const res = generateTradedoublerLink(trimmed, selectedSite)
    if (res.success) {
      setResultUrl(res.link)
      toast.success(`${t('partnerDetected')}: ${res.partner}`)
    } else {
      setResultUrl(null)
      toast.error(t(res.error))
    }
  }

  return (
    <div>
      <PageHeader title={t('usefulTLinksHeader')} />

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label>{t('programLabel')}</Label>
            <Select value={selectedSite} onValueChange={handleSiteChange}>
              <SelectTrigger>
                <SelectValue placeholder={t('selectSite')} />
              </SelectTrigger>
              <SelectContent>
                {islands.map((island) => (
                  <SelectItem key={island.code} value={island.code}>
                    {island.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border border-border">
            <Button
              variant="ghost"
              onClick={() => setDeepLinkOpen((o) => !o)}
              className="flex w-full items-center justify-between"
            >
              <span>{t('generateDeepLinkSection')}</span>
              <ChevronDown
                className={`size-4 transition-transform ${
                  deepLinkOpen ? 'rotate-180' : ''
                }`}
              />
            </Button>

            {deepLinkOpen && (
              <div className="space-y-4 border-t border-border p-4">
                <div className="flex items-start gap-2 rounded-lg bg-accent p-3 text-sm text-accent-foreground">
                  <Info className="mt-0.5 size-4 shrink-0" />
                  <span>{t('autoDetectNote')}</span>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={t('urlPlaceholder')}
                    className="flex-1"
                  />
                  <Button onClick={handleGenerate}>{t('generateLink')}</Button>
                </div>

                {resultUrl && <LinkResultCard url={resultUrl} />}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedSite && programs.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <Card key={`${program.partner}-${program.programId}`}>
              <CardContent className="space-y-3 pt-6">
                <Badge variant={categoryVariant(program.category)}>
                  {program.category}
                </Badge>
                <p className="font-mono text-xs text-muted-foreground">
                  ID {program.programId}
                </p>
                <p className="font-medium">{program.partner}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <CopyButton value={program.baseLink} size="sm" />
                  <OpenLinkButton url={program.baseLink} size="sm" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">
          {t('selectSiteToViewPrograms')}
        </div>
      )}
    </div>
  )
}
