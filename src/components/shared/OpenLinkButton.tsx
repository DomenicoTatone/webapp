import { ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button, type ButtonProps } from '@/components/ui/button'

interface OpenLinkButtonProps extends Omit<ButtonProps, 'asChild'> {
  url: string
  label?: string
  showLabel?: boolean
}

export function OpenLinkButton({
  url,
  label,
  showLabel = true,
  variant = 'outline',
  ...props
}: OpenLinkButtonProps) {
  const { t } = useTranslation()
  return (
    <Button asChild variant={variant} {...props}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <ExternalLink />
        {showLabel && (label ?? t('openLink'))}
      </a>
    </Button>
  )
}
