/**
 * Affiliate deep-link generation & validation.
 * Pure functions (easy to unit-test); every failure returns a typed i18n key.
 */
import {
  CIVITATIS_AFFILIATE_ID,
  GETYOURGUIDE_PARTNER_ID,
  PARTNER_LINKS,
  PROGRAM_CATEGORIES,
  PROGRAM_IDS,
  VALIDATION_CRITERIA,
} from '@/data/affiliates'
import { cleanUrl } from '@/lib/url'
import type { GenResult } from '@/lib/types'

export interface DetectedPartner {
  partner: string
  programId: string | null
  category: string
}

export function getPartnerBaseLink(
  islandCode: string,
  partnerName: string
): string | null {
  return PARTNER_LINKS[islandCode]?.[partnerName] ?? null
}

/** Validate a destination URL against the allowed domains for a partner. */
export function validateUrl(
  url: string,
  islandCode: string,
  partnerName: string
): boolean {
  const criteria = VALIDATION_CRITERIA[islandCode]?.[partnerName]
  if (!criteria) return true
  return criteria.some((allowed) => url.includes(allowed))
}

/** Auto-detect the partner a URL belongs to, within a given site. */
export function detectPartnerFromUrl(
  url: string,
  siteCode: string
): DetectedPartner | null {
  const criteria = VALIDATION_CRITERIA[siteCode]
  if (!criteria) return null
  for (const [partner, patterns] of Object.entries(criteria)) {
    if (patterns.some((pattern) => url.includes(pattern))) {
      return {
        partner,
        programId: PROGRAM_IDS[partner] ?? null,
        category: PROGRAM_CATEGORIES[partner] ?? 'ALTRO',
      }
    }
  }
  return null
}

/** Tradedoubler deep link (with partner auto-detection). */
export function generateTradedoublerLink(
  inputUrl: string,
  islandCode: string,
  partnerName: string | null = null
): GenResult {
  let parsed: URL
  try {
    parsed = new URL(inputUrl)
  } catch {
    return { success: false, error: 'invalidUrl' }
  }

  // Canonicalize the destination before wrapping it (strip tracking noise).
  const target = cleanUrl(parsed).href

  let partner = partnerName
  if (!partner) {
    const detected = detectPartnerFromUrl(target, islandCode)
    if (!detected) return { success: false, error: 'partnerNotRecognized' }
    partner = detected.partner
  }

  const baseLink = getPartnerBaseLink(islandCode, partner)
  if (!baseLink) return { success: false, error: 'programOrPartnerNotFound' }

  if (!validateUrl(target, islandCode, partner)) {
    return { success: false, error: 'urlNotValidForPartner' }
  }

  const deepLink = `${baseLink}&url=${encodeURIComponent(target)}`
  return { success: true, link: deepLink, partner }
}

/**
 * GetYourGuide deep link. Appends partner_id + utm_medium to the product URL
 * (GYG's documented affiliate format), preserving any existing query params.
 */
export function generateGetYourGuideLink(inputUrl: string): GenResult {
  let url: URL
  try {
    url = new URL(inputUrl)
  } catch {
    return { success: false, error: 'invalidUrl' }
  }
  if (!/getyourguide\.[a-z]{2,}/i.test(url.hostname)) {
    return { success: false, error: 'validGetYourGuideURL' }
  }
  // GetYourGuide product pages are path-identified (…-t441948/), so every query
  // param is session/tracking noise — clean-slate it and apply only ours.
  cleanUrl(url, { stripAllParams: true })
  url.searchParams.set('partner_id', GETYOURGUIDE_PARTNER_ID)
  url.searchParams.set('utm_medium', 'online_publisher')
  return { success: true, link: url.toString() }
}

/** Civitatis affiliate deep link (redirect wrapper). */
export function generateCivitatisLink(inputUrl: string): GenResult {
  let url: URL
  try {
    url = new URL(inputUrl)
  } catch {
    return { success: false, error: 'invalidUrl' }
  }
  if (!/civitatis\.[a-z]{2,}/i.test(url.hostname)) {
    return { success: false, error: 'validCivitatisURL' }
  }
  // Civitatis affiliate method (per their docs): append ?aid=<id> directly to
  // the product URL. The page is path-identified, so clean-slate the query
  // first. (The old /affiliate/?aid=&url= wrapper 301'd to the affiliate panel
  // and discarded the destination, so those links never attributed the sale.)
  cleanUrl(url, { stripAllParams: true })
  url.searchParams.set('aid', CIVITATIS_AFFILIATE_ID)
  return { success: true, link: url.toString() }
}
