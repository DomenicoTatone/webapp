import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { Button, type ButtonProps } from '@/components/ui/button'
import { copyToClipboard } from '@/lib/clipboard'

interface CopyButtonProps extends Omit<ButtonProps, 'onClick' | 'value'> {
  value: string
  label?: string
  showLabel?: boolean
}

export function CopyButton({
  value,
  label,
  showLabel = true,
  variant = 'default',
  ...props
}: CopyButtonProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    const ok = await copyToClipboard(value)
    if (ok) {
      setCopied(true)
      toast.success(t('deepLinkCopied'))
      window.setTimeout(() => setCopied(false), 1500)
    } else {
      toast.error(t('copyError'))
    }
  }

  return (
    <Button variant={variant} onClick={onCopy} {...props}>
      {copied ? <Check /> : <Copy />}
      {showLabel && (label ?? t('copyLink'))}
    </Button>
  )
}
