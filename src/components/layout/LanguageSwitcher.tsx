import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LANGUAGE_LABELS } from '@/i18n'
import { LANGS, type Lang } from '@/lib/types'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = (i18n.resolvedLanguage ?? i18n.language ?? 'it') as Lang
  const label = LANGUAGE_LABELS[current] ?? LANGUAGE_LABELS.it

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-white hover:bg-white/15"
        >
          <span aria-hidden>{label.flag}</span>
          <span className="font-semibold">{current.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGS.map((l) => (
          <DropdownMenuCheckboxItem
            key={l}
            checked={l === current}
            onCheckedChange={() => void i18n.changeLanguage(l)}
          >
            <span className="mr-1" aria-hidden>
              {LANGUAGE_LABELS[l].flag}
            </span>
            {LANGUAGE_LABELS[l].name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
