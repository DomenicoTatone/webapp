import { useState } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { LinkResultCard } from './LinkResultCard'
import type { GenResult, TranslationKeyLike } from './types'

interface DeepLinkGeneratorProps {
  labelKey: TranslationKeyLike
  placeholder?: string
  placeholderKey?: TranslationKeyLike
  emptyWarningKey: TranslationKeyLike
  generate: (url: string) => GenResult
}

/** Input + generate button + result block. Powers the GYG & Civitatis tabs. */
export function DeepLinkGenerator({
  labelKey,
  placeholder,
  placeholderKey,
  emptyWarningKey,
  generate,
}: DeepLinkGeneratorProps) {
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const onGenerate = () => {
    const url = value.trim()
    if (!url) {
      toast.warning(t(emptyWarningKey))
      return
    }
    const res = generate(url)
    if (res.success) {
      setResult(res.link)
      toast.success(t('deepLinkGenerated'))
    } else {
      setResult(null)
      toast.error(t(res.error))
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t(labelKey)}</Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder ?? (placeholderKey ? t(placeholderKey) : undefined)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onGenerate()
            }}
          />
          <Button onClick={onGenerate} className="shrink-0">
            {t('generateLink')}
          </Button>
        </div>
      </div>
      {result ? <LinkResultCard url={result} /> : null}
    </div>
  )
}
