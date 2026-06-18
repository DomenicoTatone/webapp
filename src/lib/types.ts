export const LANGS = ['it', 'en', 'es', 'fr', 'de'] as const
export type Lang = (typeof LANGS)[number]

/** Languages for which Booking affiliate data exists on S3 (no DE). */
export const BOOKING_LANGS = ['it', 'es', 'en', 'fr'] as const
export type BookingLang = (typeof BOOKING_LANGS)[number]

/**
 * Every link-generation error is an i18n key — a single, typed error contract
 * (fixes the old mix of i18n keys and raw Italian strings).
 */
export type LinkErrorKey =
  | 'invalidUrl'
  | 'validGetYourGuideURL'
  | 'validCivitatisURL'
  | 'partnerNotRecognized'
  | 'programOrPartnerNotFound'
  | 'urlNotValidForPartner'

export type GenResult =
  | { success: true; link: string; partner?: string }
  | { success: false; error: LinkErrorKey }

export interface Island {
  code: string
  name: string
  displayName: string
}

export interface ProgramCard {
  partner: string
  programId: string
  category: string
  baseLink: string
}

export interface BookingResult {
  name: string
  subtitle: string
  url: string
}
