/**
 * URL canonicalization for affiliate links.
 *
 * An affiliate generator must "clean before it signs": strip any competing
 * affiliate code and tracking noise from a pasted URL BEFORE applying our own
 * code, otherwise we either leak another publisher's attribution into our link
 * or pass marketing junk to the destination. We use a denylist (remove only
 * known tracking params) so functional params — dates, currency, language,
 * filters — survive untouched.
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
  // generic referral tags
  'ref',
  'referrer',
  // GetYourGuide internal tracking
  'cmp',
  'psrc',
  'visitor_id',
  'ranking_uuid',
])

export interface CleanUrlOptions {
  /** Extra param keys to strip — e.g. the affiliate code we are about to set. */
  extraParams?: string[]
  /** Drop the URL fragment (#…). Default: true. */
  dropHash?: boolean
}

/**
 * Strip tracking + competing-affiliate params (and, by default, the fragment)
 * from a URL, in place. Returns the same URL object for chaining.
 */
export function cleanUrl(url: URL, options: CleanUrlOptions = {}): URL {
  const { extraParams = [], dropHash = true } = options
  const extra = new Set(extraParams.map((p) => p.toLowerCase()))

  for (const key of [...url.searchParams.keys()]) {
    const k = key.toLowerCase()
    if (k.startsWith('utm_') || TRACKING_PARAMS.has(k) || extra.has(k)) {
      url.searchParams.delete(key)
    }
  }

  if (dropHash) url.hash = ''
  return url
}
