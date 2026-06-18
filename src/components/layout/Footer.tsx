import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
      {t('footerText')}
    </footer>
  )
}
