import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { LANGS } from '@/lib/types'
import { it } from './locales/it'
import en from './locales/en'
import es from './locales/es'
import fr from './locales/fr'
import de from './locales/de'

export const resources = {
  it: { translation: it },
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
} as const

export const LANGUAGE_LABELS: Record<(typeof LANGS)[number], { flag: string; name: string }> = {
  it: { flag: '🇮🇹', name: 'Italiano' },
  en: { flag: '🇬🇧', name: 'English' },
  es: { flag: '🇪🇸', name: 'Español' },
  fr: { flag: '🇫🇷', name: 'Français' },
  de: { flag: '🇩🇪', name: 'Deutsch' },
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'it',
    supportedLngs: [...LANGS],
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'dlp-lang',
      caches: ['localStorage'],
    },
  })

export default i18n
