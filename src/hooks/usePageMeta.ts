import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { TranslationKey } from '@/i18n/locales/it'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Per-route, per-language document title + description (localized SEO).
 * Keeps <html lang> in sync with the active language.
 */
export function usePageMeta(titleKey: TranslationKey, descriptionKey?: TranslationKey) {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const title = `${t(titleKey)} · DeepLink Pro`
    document.title = title
    document.documentElement.lang = i18n.language

    const description = descriptionKey ? t(descriptionKey) : t('appTagline')
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', t(titleKey))
    setMeta('property', 'og:description', description)
  }, [t, i18n.language, titleKey, descriptionKey])
}
