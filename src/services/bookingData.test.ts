import { describe, it, expect } from 'vitest'
import {
  formatBookingResult,
  normalizeText,
  parseArrayLiteral,
  searchBooking,
} from './bookingData'

describe('parseArrayLiteral', () => {
  it('extracts the array from a `var X = [...]` data file without executing it', () => {
    const file =
      "var linksHotelPageIT = [['Hotel Uno','Mahón','https://www.booking.com/hotel/a.html?aid=955564'],['Hotel Due','Ciutadella','https://www.booking.com/hotel/b.html?aid=955564']];"
    const rows = parseArrayLiteral(file)
    expect(rows).toHaveLength(2)
    expect(rows[0][0]).toBe('Hotel Uno')
    expect(rows[1][2]).toContain('aid=955564')
  })

  it('throws when there is no array literal', () => {
    expect(() => parseArrayLiteral('var x = 1;')).toThrow()
  })
})

describe('normalizeText', () => {
  it('strips accents and lowercases', () => {
    expect(normalizeText('Maó-Mahón')).toBe('mao-mahon')
  })
})

describe('searchBooking', () => {
  const data = [
    ['Mahón', 'Menorca', 'https://x/1'],
    ['Ciutadella', 'Menorca', 'https://x/2'],
    ['Madrid', 'Spain', 'https://x/3'],
  ]

  it('requires at least 3 characters', () => {
    expect(searchBooking('ma', data)).toEqual([])
  })

  it('matches accent-insensitively on the first column', () => {
    const res = searchBooking('mahon', data)
    expect(res).toHaveLength(1)
    expect(res[0][0]).toBe('Mahón')
  })

  it('respects the limit', () => {
    expect(searchBooking('men', data, 1)).toHaveLength(0) // "men" not in col 0
    expect(searchBooking('mad', data)).toHaveLength(1)
  })
})

describe('formatBookingResult', () => {
  it('uses the last element as the url and item[1] as subtitle when present', () => {
    expect(formatBookingResult(['Name', 'Sub', 'https://u'])).toEqual({
      name: 'Name',
      subtitle: 'Sub',
      url: 'https://u',
    })
  })

  it('has an empty subtitle for two-element rows', () => {
    expect(formatBookingResult(['Name', 'https://u'])).toEqual({
      name: 'Name',
      subtitle: '',
      url: 'https://u',
    })
  })
})
