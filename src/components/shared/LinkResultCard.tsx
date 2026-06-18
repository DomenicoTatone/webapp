import { useTranslation } from 'react-i18next'
import { CopyButton } from './CopyButton'
import { OpenLinkButton } from './OpenLinkButton'
import { ResultLink } from './ResultLink'

interface LinkResultCardProps {
  url: string
  label?: string
}

/** Shared "generated link" result block — label + link box + copy/open actions. */
export function LinkResultCard({ url, label }: LinkResultCardProps) {
  const { t } = useTranslation()
  return (
    <div className="space-y-3 rounded-lg border border-success/30 bg-success/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {label ?? t('generatedDeepLink')}
      </p>
      <ResultLink url={url} />
      <div className="flex flex-wrap gap-2">
        <CopyButton value={url} variant="default" />
        <OpenLinkButton url={url} />
      </div>
    </div>
  )
}
