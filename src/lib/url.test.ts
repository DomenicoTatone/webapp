import { describe, it, expect } from 'vitest'
import { cleanUrl } from './url'

describe('cleanUrl', () => {
  it('removes utm_*, click-ids and the hash but keeps functional params', () => {
    const u = cleanUrl(
      new URL(
        'https://x.com/p?date=2026-01-01&lang=it&utm_campaign=a&gclid=b&fbclid=c&msclkid=d#frag'
      )
    )
    expect(u.searchParams.get('date')).toBe('2026-01-01')
    expect(u.searchParams.get('lang')).toBe('it')
    expect(u.searchParams.has('utm_campaign')).toBe(false)
    expect(u.searchParams.has('gclid')).toBe(false)
    expect(u.searchParams.has('fbclid')).toBe(false)
    expect(u.searchParams.has('msclkid')).toBe(false)
    expect(u.hash).toBe('')
  })

  it('removes extra (affiliate) params case-insensitively', () => {
    const u = cleanUrl(new URL('https://x.com/?AID=1&Partner_Id=2&keep=ok'), {
      extraParams: ['aid', 'partner_id'],
    })
    expect(u.searchParams.has('keep')).toBe(true)
    expect(u.searchParams.has('AID')).toBe(false)
    expect(u.searchParams.has('Partner_Id')).toBe(false)
  })

  it('keeps the hash when dropHash is false', () => {
    const u = cleanUrl(new URL('https://x.com/p#keep'), { dropHash: false })
    expect(u.hash).toBe('#keep')
  })

  it('leaves a clean URL untouched', () => {
    const u = cleanUrl(new URL('https://x.com/p?size=large'))
    expect(u.toString()).toBe('https://x.com/p?size=large')
  })
})
