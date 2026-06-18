import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AlertTriangle, Loader2, SearchX } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PageHeader } from '@/components/shared/PageHeader'
import { LinkRow } from '@/components/shared/LinkRow'
import {
  BOOKING_PAGE_TYPES,
  hasSubType,
  loadBookingData,
  searchBooking,
  formatBookingResult,
  type BookingSubType,
  type Row,
} from '@/services/bookingData'
import { BOOKING_LANDING_LINKS } from '@/data/affiliates'
import { BOOKING_LANGS, type BookingLang } from '@/lib/types'
import { LANGUAGE_LABELS } from '@/i18n'
import { usePageMeta } from '@/hooks/usePageMeta'

const SEARCH_DEBOUNCE_MS = 300
const MIN_SEARCH_CHARS = 3

export function BookingPage() {
  const { t } = useTranslation()
  usePageMeta('bookingHeader')

  const [pageType, setPageType] = useState<string>('cityPage')
  const [lang, setLang] = useState<BookingLang>('it')
  const [subType, setSubType] = useState<BookingSubType>(null)
  const [query, setQuery] = useState('')

  const [data, setData] = useState<Row[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [results, setResults] = useState<Row[]>([])

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isGeneric = pageType === 'genericLandingPages'
  const showSubType = hasSubType(pageType)
  const trimmedLen = query.trim().length

  const load = useCallback(async () => {
    if (pageType === 'genericLandingPages') return
    setLoading(true)
    setError(false)
    setResults([])
    setData(null)
    try {
      const rows = await loadBookingData(pageType, lang, subType)
      setData(rows)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [pageType, lang, subType])

  // (Re)load whenever the data-defining inputs change; reset query + results.
  useEffect(() => {
    setQuery('')
    setResults([])
    if (pageType === 'genericLandingPages') {
      setData(null)
      setLoading(false)
      setError(false)
      return
    }
    void load()
  }, [load, pageType])

  // Debounced search over the loaded dataset.
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (isGeneric || !data || trimmedLen < MIN_SEARCH_CHARS) {
      setResults([])
      return
    }
    debounceRef.current = setTimeout(() => {
      setResults(searchBooking(query, data))
    }, SEARCH_DEBOUNCE_MS)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, data, isGeneric, trimmedLen])

  return (
    <div>
      <PageHeader
        title={t('bookingHeader')}
        badge={
          <Badge variant="accent">
            <AlertTriangle className="size-3.5" />
            {t('spainIslandsOnly')}
          </Badge>
        }
      />

      <Card>
        <CardContent className="space-y-5 pt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t('pageTypeLabel')}</Label>
              <Select value={pageType} onValueChange={setPageType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BOOKING_PAGE_TYPES.map((pt) => (
                    <SelectItem key={pt} value={pt}>
                      {t(pt)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t('languageLabel')}</Label>
              <Select
                value={lang}
                onValueChange={(v) => setLang(v as BookingLang)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BOOKING_LANGS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {LANGUAGE_LABELS[l].flag} {l.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {showSubType ? (
            <div className="flex flex-wrap gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={subType === null ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSubType(null)}
                  >
                    {t('searchResultsPageLabel')}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t('subTypeSearchTooltip')}</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={subType === 'landing' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSubType('landing')}
                  >
                    {t('landingPageLabel')}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t('subTypeLandingTooltip')}</TooltipContent>
              </Tooltip>
            </div>
          ) : null}

          {isGeneric ? (
            <div className="space-y-2">
              {BOOKING_LANDING_LINKS.map((link) => (
                <LinkRow key={link.key} title={t(link.key)} url={link.url} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                disabled={loading || error}
              />

              {loading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  <span>{t('loadingData')}</span>
                </div>
              ) : error ? (
                <div className="flex flex-col gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="size-4" />
                    <span>{t('errorLoadingData')}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void load()}
                  >
                    {t('retryLoad')}
                  </Button>
                </div>
              ) : trimmedLen < MIN_SEARCH_CHARS ? (
                <p className="text-sm text-muted-foreground">
                  {t('searchMinChars')}
                </p>
              ) : results.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-8 text-center text-muted-foreground">
                  <SearchX className="size-6" />
                  <p className="text-sm">{t('noResultsFound')}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {results.length} {t('resultsFound')}
                  </p>
                  <div className="space-y-2">
                    {results.map((row, i) => {
                      const { name, subtitle, url } = formatBookingResult(row)
                      return (
                        <LinkRow
                          key={`${url}-${i}`}
                          title={name}
                          subtitle={subtitle || undefined}
                          url={url}
                        />
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
