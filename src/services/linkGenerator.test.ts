import { describe, it, expect } from 'vitest'
import {
  detectPartnerFromUrl,
  generateCivitatisLink,
  generateGetYourGuideLink,
  generateTradedoublerLink,
  validateUrl,
} from './linkGenerator'
import {
  CIVITATIS_AFFILIATE_ID,
  GETYOURGUIDE_PARTNER_ID,
} from '@/data/affiliates'

describe('generateGetYourGuideLink', () => {
  it('appends the partner_id and utm_medium to a product URL', () => {
    const res = generateGetYourGuideLink(
      'https://www.getyourguide.com/minorca-l465/x-t441948/'
    )
    expect(res.success).toBe(true)
    if (res.success) {
      const url = new URL(res.link)
      expect(url.searchParams.get('partner_id')).toBe(GETYOURGUIDE_PARTNER_ID)
      expect(url.searchParams.get('utm_medium')).toBe('online_publisher')
      expect(url.pathname).toBe('/minorca-l465/x-t441948/')
    }
  })

  it('accepts any regional TLD', () => {
    expect(generateGetYourGuideLink('https://www.getyourguide.it/').success).toBe(
      true
    )
    expect(generateGetYourGuideLink('https://www.getyourguide.de/').success).toBe(
      true
    )
  })

  it('clean-slates the query and keeps only our params', () => {
    const res = generateGetYourGuideLink(
      'https://www.getyourguide.com/x-t1/?ranking=1&partner_id=OLD&currency=EUR'
    )
    expect(res.success).toBe(true)
    if (res.success) {
      const url = new URL(res.link)
      expect([...url.searchParams.keys()].sort()).toEqual([
        'partner_id',
        'utm_medium',
      ])
      expect(url.searchParams.get('partner_id')).toBe(GETYOURGUIDE_PARTNER_ID)
    }
  })

  it('rejects non-GetYourGuide hosts', () => {
    const res = generateGetYourGuideLink('https://www.booking.com/x')
    expect(res).toEqual({ success: false, error: 'validGetYourGuideURL' })
  })

  it('rejects malformed URLs', () => {
    expect(generateGetYourGuideLink('not a url')).toEqual({
      success: false,
      error: 'invalidUrl',
    })
  })
})

describe('generateCivitatisLink', () => {
  it('appends the unified aid to the product URL (no 52698 drift, no /affiliate/ wrapper)', () => {
    const res = generateCivitatisLink('https://www.civitatis.com/it/menorca/')
    expect(res.success).toBe(true)
    if (res.success) {
      expect(res.link).toBe(
        `https://www.civitatis.com/it/menorca/?aid=${CIVITATIS_AFFILIATE_ID}`
      )
      expect(res.link).not.toContain('52698')
      expect(res.link).not.toContain('/affiliate/')
    }
  })

  it('rejects non-Civitatis hosts', () => {
    expect(generateCivitatisLink('https://example.com').success).toBe(false)
  })
})

describe('generateTradedoublerLink', () => {
  it('auto-detects the partner and builds a clk.tradedoubler deep link', () => {
    const res = generateTradedoublerLink(
      'https://www.edreams.it/flights/',
      '3220593'
    )
    expect(res.success).toBe(true)
    if (res.success) {
      expect(res.partner).toBe('eDreams')
      expect(res.link).toContain('clk.tradedoubler.com/click?p=17269&a=3220593')
      expect(res.link).toContain(
        `url=${encodeURIComponent('https://www.edreams.it/flights/')}`
      )
    }
  })

  it('fails when no partner matches the URL', () => {
    expect(
      generateTradedoublerLink('https://www.unknown.com/x', '3220593')
    ).toEqual({ success: false, error: 'partnerNotRecognized' })
  })

  it('fails on malformed URLs', () => {
    expect(generateTradedoublerLink('bad', '3220593')).toEqual({
      success: false,
      error: 'invalidUrl',
    })
  })
})

describe('detectPartnerFromUrl / validateUrl', () => {
  it('detects Direct Ferries IT from a matching URL', () => {
    const d = detectPartnerFromUrl(
      'https://www.directferries.it/route',
      '1639250'
    )
    expect(d?.partner).toBe('Direct Ferries IT')
    expect(d?.category).toBe('VIAGGI')
  })

  it('accepts any URL when no criteria exist for the partner', () => {
    expect(validateUrl('https://anything.test', '9999999', 'Nobody')).toBe(true)
  })
})

describe('URL cleaning before applying the affiliate code', () => {
  it('GYG: clean-slates a noisy product URL, leaving only our params and the path (real-world case)', () => {
    const res = generateGetYourGuideLink(
      'https://www.getyourguide.com/it-it/minorca-l465/mahon-tour-t441948/?ranking_uuid=01fe5957&referral_redirect=1&visitor-id=5KCNOANQ63LC92NERYFJTMUYSX88LLD4&partner_id=COMPETITOR&utm_source=foo#reviews'
    )
    expect(res.success).toBe(true)
    if (res.success) {
      expect(res.link).toBe(
        `https://www.getyourguide.com/it-it/minorca-l465/mahon-tour-t441948/?partner_id=${GETYOURGUIDE_PARTNER_ID}&utm_medium=online_publisher`
      )
    }
  })

  it('Civitatis: drops a competing aid + tracking, then appends our aid to the product URL', () => {
    const res = generateCivitatisLink(
      'https://www.civitatis.com/it/madrid/tour?aid=99999&utm_source=x&fbclid=y'
    )
    expect(res.success).toBe(true)
    if (res.success) {
      const u = new URL(res.link)
      expect(u.pathname).toBe('/it/madrid/tour')
      expect(u.searchParams.get('aid')).toBe(CIVITATIS_AFFILIATE_ID)
      expect(res.link).not.toContain('99999')
      expect(u.searchParams.has('utm_source')).toBe(false)
      expect(u.searchParams.has('fbclid')).toBe(false)
      expect(res.link).not.toContain('/affiliate/')
    }
  })

  it('Tradedoubler: cleans the target URL before wrapping and still auto-detects', () => {
    const res = generateTradedoublerLink(
      'https://www.edreams.it/flights/?gclid=abc&utm_source=foo',
      '3220593'
    )
    expect(res.success).toBe(true)
    if (res.success) {
      expect(res.partner).toBe('eDreams')
      const inner = decodeURIComponent(res.link.split('&url=')[1])
      expect(inner).toBe('https://www.edreams.it/flights/')
      expect(res.link).not.toContain('gclid')
      expect(res.link).not.toContain('utm_source')
    }
  })
})
