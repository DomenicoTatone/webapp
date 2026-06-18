import { Link, NavLink } from 'react-router-dom'
import { Link2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import type { TranslationKey } from '@/i18n/locales/it'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'

interface NavItem {
  to: string
  label?: string
  labelKey?: TranslationKey
}

const NAV: NavItem[] = [
  { to: '/booking', label: 'Booking' },
  { to: '/tradedoubler', label: 'Tradedoubler' },
  { to: '/getyourguide', label: 'GetYourGuide' },
  { to: '/civitatis', label: 'Civitatis' },
  { to: '/car-rental', labelKey: 'carRentalNav' },
  { to: '/images', labelKey: 'imageToolNav' },
]

export function Header() {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-40 bg-gradient-brand shadow-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-3">
          <Link to="/booking" className="flex items-center gap-2.5 text-white">
            <span className="flex size-9 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/25 backdrop-blur">
              <Link2 className="size-5" />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight">
              DeepLink Pro
            </span>
          </Link>
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>

        <nav className="dlp-scroll -mx-4 flex gap-1 overflow-x-auto px-4 md:mx-0 md:flex-1 md:justify-center md:overflow-visible md:px-0">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white',
                  isActive && 'bg-white/20 text-white'
                )
              }
            >
              {item.label ?? t(item.labelKey as TranslationKey)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
