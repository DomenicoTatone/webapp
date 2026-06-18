interface ResultLinkProps {
  url: string
}

/** A scrollable, mono-font box showing a generated link. */
export function ResultLink({ url }: ResultLinkProps) {
  return (
    <div className="dlp-scroll overflow-x-auto rounded-lg border border-border bg-secondary/50 px-4 py-3">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-sm break-all text-primary hover:underline"
      >
        {url}
      </a>
    </div>
  )
}
