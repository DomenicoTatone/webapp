import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PageHeader } from '@/components/shared/PageHeader'
import { ResultLink } from '@/components/shared/ResultLink'
import { CopyButton } from '@/components/shared/CopyButton'
import { OpenLinkButton } from '@/components/shared/OpenLinkButton'
import { CAR_RENTAL_PROVIDERS } from '@/data/affiliates'
import { LANGUAGE_LABELS } from '@/i18n'
import { LANGS, type Lang } from '@/lib/types'
import { usePageMeta } from '@/hooks/usePageMeta'

export function CarRentalPage() {
  const { t } = useTranslation()
  usePageMeta('carRentalHeader')

  const [providerIdx, setProviderIdx] = useState(0)
  const [lang, setLang] = useState<Lang>('it')

  const provider = CAR_RENTAL_PROVIDERS[providerIdx]
  const url =
    provider.urls[lang] || provider.urls.en || Object.values(provider.urls)[0]

  return (
    <div>
      <PageHeader title={t('carRentalHeader')} />
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label>{t('selectProvider')}</Label>
            <Select
              value={String(providerIdx)}
              onValueChange={(v) => setProviderIdx(Number(v))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CAR_RENTAL_PROVIDERS.map((p, i) => (
                  <SelectItem key={p.name} value={String(i)}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3 rounded-lg border border-success/30 bg-success/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              {t('affiliateLink')}
            </p>
            <ResultLink url={url} />
            <div className="flex flex-wrap items-center gap-2">
              <Select value={lang} onValueChange={(v) => setLang(v as Lang)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGS.map((l) => (
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

          <p className="text-sm italic text-muted-foreground">
            {t('carRentalNotice')}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
