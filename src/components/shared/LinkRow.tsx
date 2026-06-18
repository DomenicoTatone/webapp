import { CopyButton } from './CopyButton'
import { OpenLinkButton } from './OpenLinkButton'

interface LinkRowProps {
  title: string
  subtitle?: string
  url: string
}

/** A single row in a list of links (Booking results, generic landing links). */
export function LinkRow({ title, subtitle, url }: LinkRowProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate font-medium">{title}</p>
        {subtitle ? (
          <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 gap-2">
        <OpenLinkButton url={url} size="sm" showLabel={false} />
        <CopyButton value={url} size="sm" variant="secondary" showLabel={false} />
      </div>
    </div>
  )
}
