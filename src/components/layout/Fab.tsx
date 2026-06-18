import { Link } from 'react-router-dom'
import { Lightbulb } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

/** Floating shortcut to the feedback page (refined — no pulsing animation). */
export function Fab() {
  const { t } = useTranslation()
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to="/feedback"
          aria-label={t('feedbackNav')}
          className="fixed bottom-6 right-6 z-30 flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105 active:scale-95"
        >
          <Lightbulb className="size-6" />
        </Link>
      </TooltipTrigger>
      <TooltipContent side="left">{t('feedbackNav')}</TooltipContent>
    </Tooltip>
  )
}
