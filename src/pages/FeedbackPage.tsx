import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PageHeader } from '@/components/shared/PageHeader'
import { usePageMeta } from '@/hooks/usePageMeta'
import type { TranslationKey } from '@/i18n/locales/it'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mjgggwek'

const PLATFORMS: { value: string; label: string; labelKey?: TranslationKey }[] = [
  { value: 'booking', label: 'Booking' },
  { value: 'tradedoubler', label: 'Tradedoubler' },
  { value: 'getyourguide', label: 'GetYourGuide' },
  { value: 'civitatis', label: 'Civitatis' },
  { value: 'carrental', label: '', labelKey: 'carRentalNav' },
  { value: 'imgtool', label: '', labelKey: 'imageToolNav' },
  { value: 'other', label: '', labelKey: 'other' },
]

export function FeedbackPage() {
  const { t } = useTranslation()
  usePageMeta('feedbackHeader')

  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [platform, setPlatform] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setSubmitting(true)
    try {
      const data = new FormData(form)
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error('Request failed')
      setSent(true)
      toast.success(t('messageSent'))
      form.reset()
      setPlatform('')
    } catch {
      toast.error(t('sendError'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title={t('feedbackHeader')} />
      <Card>
        <CardContent className="pt-6">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle2 className="size-14 text-success" />
              <h2 className="font-display text-xl font-bold">{t('thankYou')}</h2>
              <p className="text-muted-foreground">{t('messageReceived')}</p>
              <Button variant="outline" onClick={() => setSent(false)}>
                {t('sendAnother')}
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fb-name">{t('yourName')}</Label>
                <Input id="fb-name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fb-email">{t('yourEmail')}</Label>
                <Input id="fb-email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label>{t('platform')}</Label>
                <input type="hidden" name="platform" value={platform} />
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectPlatform')} />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.labelKey ? t(p.labelKey) : p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fb-message">{t('message')}</Label>
                <Textarea id="fb-message" name="message" required />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {t('send')}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
