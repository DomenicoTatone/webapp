import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="font-display text-6xl font-extrabold text-gradient-brand">404</p>
      <h1 className="text-xl font-bold">{t('pageNotFound')}</h1>
      <Button asChild>
        <Link to="/booking">{t('goHome')}</Link>
      </Button>
    </div>
  )
}
