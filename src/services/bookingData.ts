/**
 * Booking affiliate data loader.
 * Loads pre-generated link tables from S3, parsing the array literal safely
 * with JSON5 (NO remote <script> injection / code execution — a deliberate
 * security upgrade over the original). Three-tier cache: memory → IndexedDB
 * (24h TTL) → network. In dev we go through a Vite proxy to dodge CORS.
 */
import JSON5 from 'json5'
import type { BookingResult } from '@/lib/types'

const S3_BASE = 'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com'
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000
const DB_NAME = 'DeepLinkPro'
const DB_VERSION = 1
const STORE = 'bookingData'

export type BookingSubType = 'landing' | null
export type Row = string[]

interface PageTypeConfig {
  file: (lang: string, subType: BookingSubType) => string
  hasSubType: boolean
}

const landing = (type: string) => (lang: string, subType: BookingSubType) =>
  subType === 'landing'
    ? `${type}_landing_page_links_${lang}.js`
    : `${type}_page_links_${lang}.js`

export const PAGE_TYPE_CONFIG: Record<string, PageTypeConfig> = {
  hotelPage: { file: (lang) => `hotel_page_links_${lang}.js`, hasSubType: false },
  cityPage: { file: landing('city'), hasSubType: true },
  airportPage: { file: landing('airport'), hasSubType: true },
  districtPage: { file: landing('district'), hasSubType: true },
  islandPage: { file: landing('island'), hasSubType: true },
  landmarkPage: { file: landing('landmark'), hasSubType: true },
  regionPage: { file: landing('region'), hasSubType: true },
}

/** Page-type options shown in the Booking tab (order matters). */
export const BOOKING_PAGE_TYPES = [
  'cityPage',
  'hotelPage',
  'airportPage',
  'districtPage',
  'islandPage',
  'landmarkPage',
  'regionPage',
  'genericLandingPages',
] as const

export function hasSubType(pageType: string): boolean {
  return PAGE_TYPE_CONFIG[pageType]?.hasSubType ?? false
}

// --- caches -----------------------------------------------------------------
const memCache = new Map<string, Row[]>()
const inflight = new Map<string, Promise<Row[]>>()

function cacheKey(
  pageType: string,
  language: string,
  subType: BookingSubType
): string {
  return `${pageType}_${language}_${subType ?? 'default'}`
}

// --- IndexedDB (lazy, no import-time side effects) --------------------------
let dbPromise: Promise<IDBDatabase | null> | null = null

function getDb(): Promise<IDBDatabase | null> {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve) => {
    if (typeof indexedDB === 'undefined') return resolve(null)
    try {
      const req = indexedDB.open(DB_NAME, DB_VERSION)
      req.onupgradeneeded = () => {
        const db = req.result
        if (!db.objectStoreNames.contains(STORE)) {
          const store = db.createObjectStore(STORE, { keyPath: 'key' })
          store.createIndex('timestamp', 'timestamp', { unique: false })
        }
      }
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => resolve(null)
    } catch {
      resolve(null)
    }
  })
  return dbPromise
}

async function getFromStorage(key: string): Promise<Row[] | null> {
  const db = await getDb()
  if (!db) return null
  try {
    const record = await new Promise<{ data: Row[]; timestamp: number } | undefined>(
      (resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly')
        const req = tx.objectStore(STORE).get(key)
        req.onsuccess = () => resolve(req.result)
        req.onerror = () => reject(req.error)
      }
    )
    if (!record) return null
    if (Date.now() - record.timestamp > CACHE_EXPIRY_MS) return null
    return record.data
  } catch {
    return null
  }
}

async function saveToStorage(key: string, data: Row[]): Promise<void> {
  const db = await getDb()
  if (!db) return
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite')
      const req = tx
        .objectStore(STORE)
        .put({ key, data, timestamp: Date.now() })
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  } catch {
    /* ignore persistence failures */
  }
}

// --- network ----------------------------------------------------------------
function dataUrl(fileName: string): string {
  return import.meta.env.DEV ? `/booking-data/${fileName}` : `${S3_BASE}/${fileName}`
}

/** Extract the array literal from a `var X = [ ... ];` file without executing it. */
export function parseArrayLiteral(text: string): Row[] {
  const start = text.indexOf('[')
  const end = text.lastIndexOf(']')
  if (start === -1 || end === -1 || end < start) {
    throw new Error('No array literal found in data file')
  }
  const parsed = JSON5.parse(text.slice(start, end + 1))
  if (!Array.isArray(parsed)) throw new Error('Parsed data is not an array')
  return parsed as Row[]
}

async function fetchData(
  pageType: string,
  language: string,
  subType: BookingSubType
): Promise<Row[]> {
  const config = PAGE_TYPE_CONFIG[pageType]
  if (!config) throw new Error(`Unknown page type: ${pageType}`)
  const fileName = config.file(language, subType)
  const res = await fetch(dataUrl(fileName))
  if (!res.ok) throw new Error(`Failed to load ${fileName}: ${res.status}`)
  return parseArrayLiteral(await res.text())
}

export async function loadBookingData(
  pageType: string,
  language: string,
  subType: BookingSubType = null
): Promise<Row[]> {
  const key = cacheKey(pageType, language, subType)

  const mem = memCache.get(key)
  if (mem) return mem

  const stored = await getFromStorage(key)
  if (stored) {
    memCache.set(key, stored)
    return stored
  }

  const existing = inflight.get(key)
  if (existing) return existing

  const promise = fetchData(pageType, language, subType)
    .then((data) => {
      memCache.set(key, data)
      void saveToStorage(key, data)
      return data
    })
    .finally(() => inflight.delete(key))

  inflight.set(key, promise)
  return promise
}

// --- search & formatting ----------------------------------------------------
export function normalizeText(str: string): string {
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

export function searchBooking(query: string, data: Row[], limit = 50): Row[] {
  if (!query || query.length < 3) return []
  const q = normalizeText(query)
  const results: Row[] = []
  for (const item of data) {
    if (results.length >= limit) break
    if (normalizeText(item[0] ?? '').includes(q)) results.push(item)
  }
  return results
}

export function formatBookingResult(item: Row): BookingResult {
  const url = item[item.length - 1] ?? ''
  return {
    name: item[0] ?? '',
    subtitle: item.length > 2 ? (item[1] ?? '') : '',
    url,
  }
}

export function clearBookingCache(): void {
  memCache.clear()
}
