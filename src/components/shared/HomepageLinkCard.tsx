import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LANGUAGE_LABELS } from '@/i18n'
import type { Lang } from '@/lib/types'
import { CopyButton } from './CopyButton'
import { OpenLinkButton } from './OpenLinkButton'
import { ResultLink } from './ResultLink'

interface HomepageLinkCardProps {
  getUrl: (lang: Lang) => string
  languages?: Lang[]
}

/** Language-aware homepage affiliate link with copy/open (GYG & Civitatis). */
export function HomepageLinkCard({
  getUrl,
  languages = ['it', 'es', 'en', 'fr'],
}: HomepageLinkCardProps) {
  const [lang, setLang] = useState<Lang>(languages[0])
  const url = getUrl(lang)

  return (
    <div className="space-y-3 rounded-lg border border-success/30 bg-success/5 p-4">
      <ResultLink url={url} />
      <div className="flex flex-wrap items-center gap-2">
        <Select value={lang} onValueChange={(v) => setLang(v as Lang)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((l) => (
              <SelectItem key={l} value={l}>
                {LANGUAGE_LABELS[l].flag} {l.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <CopyButton value={url} />
        <OpenLinkButton url={url} />
      </div>
    </div>
  )
}
