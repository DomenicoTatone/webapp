/**
 * URL canonicalization for affiliate links.
 *
 * Two policies, because correct cleaning depends on the link type:
 *
 * - "clean slate" (stripAllParams): for an affiliate's OWN product pages
 *   (GetYourGuide, Civitatis) the product is identified by the PATH (e.g.
 *   `…-t441948/`), so every query param is session/tracking noise
 *   (ranking_uuid, referral_redirect, visitor-id, …). We drop them ALL and add
 *   only our own affiliate params. Robust against new tracking params the
 *   platform invents — no denylist whack-a-mole.
 *
 * - denylist (default): for THIRD-PARTY destination URLs (the Tradedoubler
 *   targets such as eDreams / Direct Ferries) we must keep functional params
 *   (dates, routes, currency), so we strip only known tracking params.
 */

/** Well-known tracking / click-id params (matched case-insensitively). */
const TRACKING_PARAMS = new Set<string>([
  // ad-platform click ids
  'gclid',
  'gclsrc',
  'dclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'igshid',
  'igsh',
  'msclkid',
  'ttclid',
  'twclid',
  'li_fat_id',
  'epik',
  'rdt_cid',
  'yclid',
  // email / analytics
  'mc_cid',
  'mc_eid',
  '_hsenc',
  '_hsmi',
  '_ga',
  '_gl',
  'mkt_tok',
  's_kwcid',
  'ef_id',
  '_openstat',
  // generic referral / redirect tags
  'ref',
  'referrer',
  'referral_redirect',
  // platform internal tracking (also covered by clean-slate; kept here so
  // third-party denylist cleaning catches them too)
  'cmp',
  'psrc',
  'visitor_id',
  'visitor-id',
  'ranking_uuid',
])

export interface CleanUrlOptions {
  /** Extra param keys to strip — e.g. the affiliate code we are about to set. */
  extraParams?: string[]
  /** Drop the URL fragment (#…). Default: true. */
  dropHash?: boolean
  /**
   * Remove ALL query params (clean slate). Use for path-identified product
   * pages (GetYourGuide, Civitatis) where any query param is noise.
   */
  stripAllParams?: boolean
}

/**
 * Strip tracking / competing-affiliate params (and, by default, the fragment)
 * from a URL, in place. Returns the same URL object for chaining.
 */
export function cleanUrl(url: URL, options: CleanUrlOptions = {}): URL {
  const { extraParams = [], dropHash = true, stripAllParams = false } = options

  if (stripAllParams) {
    url.search = ''
  } else {
    const extra = new Set(extraParams.map((p) => p.toLowerCase()))
    for (const key of [...url.searchParams.keys()]) {
      const k = key.toLowerCase()
      if (k.startsWith('utm_') || TRACKING_PARAMS.has(k) || extra.has(k)) {
        url.searchParams.delete(key)
      }
    }
  }

  if (dropHash) url.hash = ''
  return url
}
