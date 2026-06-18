/**
 * Centralized affiliate program data — single source of truth.
 * Ported from the original app (Tradedoubler screenshots, 2026-01-17) to TS.
 */
import type { Island, Lang, ProgramCard } from '@/lib/types'

// --- Affiliate account identifiers -----------------------------------------
// NOTE: keep each affiliate id defined ONCE here and reuse everywhere so the
// homepage links and the deep-link generators can never drift out of sync
// (the old app had two different GetYourGuide ids and two different Civitatis
// ids — both attribution bugs).
export const GETYOURGUIDE_PARTNER_ID = 'Q5TFESQ'
/**
 * Civitatis affiliate id — 5488, confirmed in the Civitatis affiliate panel.
 * The old app wrongly used 52698 in the deep-link generator (an attribution
 * bug); unified here to the correct value.
 */
export const CIVITATIS_AFFILIATE_ID = '5488'
export const BOOKING_AFFILIATE_ID = '955564'

// --- Tradedoubler sites / programs ------------------------------------------
export const ISLAND_NAMES: Record<string, string> = {
  '3220593': 'Isola di Formentera',
  '3337668': 'Isola di Lanzarote',
  '1639250': 'Isola di Minorca',
  '3349565': 'Isola di Minorca EN',
  '3349567': 'Isola di Minorca ES',
  '3335968': 'Vacanze nel Mediterraneo',
}

export const PROGRAM_IDS: Record<string, string> = {
  eDreams: '17269',
  'Direct Ferries IT': '313887',
  'Direct Ferries ES': '327261',
  'Direct Ferries UK': '324849',
  'Vueling IT': '288053',
  'Vueling UK': '320047',
  Weweed: '343473',
  'Allianz Partners': '72847',
  'AXA Assistance': '261028',
  'Barceló Hotels & Resorts': '282865',
  'Columbus Assicurazioni': '76623',
  Veratour: '319774',
  Viaggisicuri: '249882',
  'Yalla Yalla': '218733',
  'Airport Parking Luton': '343105',
  'Airport Parking Manchester': '343201',
  'Airport Parking With Us': '343202',
  'Bee Parking': '383148',
  'Compare Cheap Parking Prices At M...': '355499',
  'Compare Parking Prices': '355683',
  'Compare Your Parking Deals': '360206',
  'Muslim Aid': '335318',
  'AXA Seguros de Viaje': '343738',
  InterMundial: '381548',
  'Vayacruceros ES': '342494',
  'Eurowings IT': '307239',
  'Grandi Navi Veloci IT': '316693',
  'Viaggi in crociera': '341133',
}

export const PROGRAM_CATEGORIES: Record<string, string> = {
  eDreams: 'VIAGGI, SHOPPING & RETAIL, AUTOMOTIVE',
  'Direct Ferries IT': 'VIAGGI',
  'Allianz Partners': 'ASSICURAZIONI, VIAGGI',
  'AXA Assistance': 'ASSICURAZIONI',
  'Barceló Hotels & Resorts': 'VIAGGI',
  'Columbus Assicurazioni': 'FINANZA, FAMIGLIA, ASSICURAZIONI',
  Veratour: 'VIAGGI',
  Viaggisicuri: 'ASSICURAZIONI',
  'Yalla Yalla': 'VIAGGI',
  'Airport Parking Luton': 'VIAGGI',
  'Airport Parking Manchester': 'VIAGGI',
  'Airport Parking With Us': 'VIAGGI',
  'Bee Parking': 'VIAGGI',
  'Compare Cheap Parking Prices At M...': 'VIAGGI',
  'Compare Parking Prices': 'VIAGGI',
  'Compare Your Parking Deals': 'VIAGGI',
  'Direct Ferries UK': 'VIAGGI',
  'Muslim Aid': 'ORGANIZZAZIONI NO PROFIT',
  'AXA Seguros de Viaje': 'VIAGGI',
  'Direct Ferries ES': 'VIAGGI',
  InterMundial: 'ASSICURAZIONI, VIAGGI',
  'Vayacruceros ES': 'VIAGGI',
  'Eurowings IT': 'VIAGGI',
  'Grandi Navi Veloci IT': 'VIAGGI',
  'Viaggi in crociera': 'VIAGGI',
}

export const AFFILIATE_PARTNERS: Record<string, string[]> = {
  '3220593': ['eDreams'],
  '3337668': ['Direct Ferries IT', 'eDreams'],
  '1639250': [
    'Allianz Partners',
    'AXA Assistance',
    'Barceló Hotels & Resorts',
    'Columbus Assicurazioni',
    'Direct Ferries IT',
    'Veratour',
    'Viaggisicuri',
    'Yalla Yalla',
  ],
  '3349565': [
    'Airport Parking Luton',
    'Airport Parking Manchester',
    'Airport Parking With Us',
    'Bee Parking',
    'Compare Cheap Parking Prices At M...',
    'Compare Parking Prices',
    'Compare Your Parking Deals',
    'Direct Ferries UK',
    'Muslim Aid',
  ],
  '3349567': [
    'AXA Seguros de Viaje',
    'Direct Ferries ES',
    'eDreams',
    'InterMundial',
    'Vayacruceros ES',
  ],
  '3335968': [
    'Direct Ferries IT',
    'Eurowings IT',
    'Grandi Navi Veloci IT',
    'Veratour',
    'Viaggi in crociera',
  ],
}

function generatePartnerLinks(): Record<string, Record<string, string>> {
  const links: Record<string, Record<string, string>> = {}
  for (const [siteId, partners] of Object.entries(AFFILIATE_PARTNERS)) {
    links[siteId] = {}
    for (const partner of partners) {
      const programId = PROGRAM_IDS[partner]
      if (programId) {
        links[siteId][partner] =
          `https://clk.tradedoubler.com/click?p=${programId}&a=${siteId}`
      }
    }
  }
  return links
}

export const PARTNER_LINKS = generatePartnerLinks()

export const VALIDATION_CRITERIA: Record<
  string,
  Record<string, string[]>
> = {
  '1639250': {
    'Allianz Partners': [
      'https://www.allianz-assicurazioneviaggio.it/',
      'https://www.allianz-assistance.it/',
    ],
    'AXA Assistance': [
      'https://www.assicurazione-viaggio.axa-assistance.it/',
    ],
    'Barceló Hotels & Resorts': ['https://www.barcelo.com/'],
    'Columbus Assicurazioni': ['https://www.columbusassicurazioni.it/'],
    'Direct Ferries IT': ['https://www.directferries'],
    Veratour: ['https://www.veratour.it/'],
    Viaggisicuri: ['https://www.viaggisicuri.com/'],
    'Yalla Yalla': ['https://www.yallayalla.it/'],
  },
  '3220593': { eDreams: ['https://www.edreams.it/'] },
  '3337668': {
    'Direct Ferries IT': ['https://www.directferries'],
    eDreams: ['https://www.edreams.it/'],
  },
  '3349565': { 'Direct Ferries UK': ['https://www.directferries'] },
  '3349567': {
    eDreams: ['https://www.edreams.es/'],
    'Vayacruceros ES': ['https://www.vayacruceros.com/'],
  },
  '3335968': {
    'Direct Ferries IT': ['https://www.directferries'],
    'Eurowings IT': ['https://www.eurowings.com/'],
    'Grandi Navi Veloci IT': ['https://www.gnv.it/'],
    Veratour: ['https://www.veratour.it/'],
    'Viaggi in crociera': ['https://www.viaggio-in-crociera.it/'],
  },
}

// --- Homepage affiliate links (per language) --------------------------------
const GYG_TLD: Record<Lang, string> = {
  it: 'it',
  es: 'es',
  en: 'com',
  fr: 'fr',
  de: 'com',
}

export function getYourGuideHomepageUrl(lang: Lang): string {
  const tld = GYG_TLD[lang] ?? 'com'
  return `https://www.getyourguide.${tld}/?partner_id=${GETYOURGUIDE_PARTNER_ID}&utm_medium=online_publisher`
}

const CIV_PATH: Record<Lang, string> = {
  it: 'it',
  es: 'es',
  en: 'en',
  fr: 'fr',
  de: 'en',
}

export function civitatisHomepageUrl(lang: Lang): string {
  const path = CIV_PATH[lang] ?? 'en'
  return `https://www.civitatis.com/${path}/?aid=${CIVITATIS_AFFILIATE_ID}`
}

// --- Booking generic landing links ------------------------------------------
export interface BookingLandingLink {
  /** i18n key for the label */
  key: string
  url: string
}

export const BOOKING_LANDING_LINKS: BookingLandingLink[] = [
  { key: 'homePage', url: `https://www.booking.com/index.html?aid=${BOOKING_AFFILIATE_ID}` },
  { key: 'apartmentsPage', url: `https://www.booking.com/apartments/index.html?aid=${BOOKING_AFFILIATE_ID}` },
  { key: 'resortsPage', url: `https://www.booking.com/resorts/index.html?aid=${BOOKING_AFFILIATE_ID}` },
  { key: 'villasPage', url: `https://www.booking.com/villas/index.html?aid=${BOOKING_AFFILIATE_ID}` },
  { key: 'bedAndBreakfastPage', url: `https://www.booking.com/bed-and-breakfast/index.html?aid=${BOOKING_AFFILIATE_ID}` },
  { key: 'guestHousePage', url: `https://www.booking.com/guest-house/index.html?aid=${BOOKING_AFFILIATE_ID}` },
]

// --- Car rental providers ---------------------------------------------------
export interface CarRentalProvider {
  name: string
  urls: Record<Lang, string>
}

export const CAR_RENTAL_PROVIDERS: CarRentalProvider[] = [
  {
    name: 'Coches Menorca',
    urls: {
      it: 'https://cochesmenorca.es/it/?agentId=3',
      es: 'https://cochesmenorca.es/?agentId=3',
      en: 'https://cochesmenorca.es/en/?agentId=3',
      fr: 'https://cochesmenorca.es/en/?agentId=3',
      de: 'https://cochesmenorca.es/en/?agentId=3',
    },
  },
  {
    name: 'Menorca Rent',
    urls: {
      it: 'https://www.menorcarent.com/it/?agentId=15',
      es: 'https://www.menorcarent.com/?agentId=15',
      en: 'https://www.menorcarent.com/en/?agentId=15',
      fr: 'https://www.menorcarent.com/fr/?agentId=15',
      de: 'https://www.menorcarent.com/en/?agentId=15',
    },
  },
  {
    name: 'Autos Xoroi',
    urls: {
      it: 'http://www.alquilercochesmenorca.com/it/?link=ISOLADIMINORCA',
      es: 'http://www.alquilercochesmenorca.com/es/?link=ISOLADIMINORCA',
      en: 'http://www.alquilercochesmenorca.com/?link=ISOLADIMINORCA',
      fr: 'http://www.alquilercochesmenorca.com/fr/?link=ISOLADIMINORCA',
      de: 'http://www.alquilercochesmenorca.com/?link=ISOLADIMINORCA',
    },
  },
  {
    name: 'HIPER Rent a Car',
    urls: {
      it: 'https://hiperrentacar.com/it/?colaborador=LO-0495108',
      es: 'https://hiperrentacar.com/es/?colaborador=LO-0495108',
      en: 'https://hiperrentacar.com/en/?colaborador=LO-0495108',
      fr: 'https://hiperrentacar.com/fr/?colaborador=LO-0495108',
      de: 'https://hiperrentacar.com/de/?colaborador=LO-0495108',
    },
  },
  {
    name: 'Rentalcars',
    urls: {
      it: 'https://www.rentalcars.com/it/?affiliateCode=latitudine983',
      es: 'https://www.rentalcars.com/es/?affiliateCode=latitudine983',
      en: 'https://www.rentalcars.com/en/?affiliateCode=latitudine983',
      fr: 'https://www.rentalcars.com/fr/?affiliateCode=latitudine983',
      de: 'https://www.rentalcars.com/de/?affiliateCode=latitudine983',
    },
  },
]

// --- Derived helpers --------------------------------------------------------
export function getAllIslands(): Island[] {
  return Object.entries(ISLAND_NAMES)
    .map(([code, name]) => ({ code, name, displayName: `${name} — ${code}` }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function getIslandName(code: string): string {
  return ISLAND_NAMES[code] ?? 'Isola Sconosciuta'
}

export function getProgramsForIsland(islandCode: string): ProgramCard[] {
  const partners = AFFILIATE_PARTNERS[islandCode] ?? []
  return partners
    .map((partner) => {
      const programId = PROGRAM_IDS[partner]
      const baseLink = PARTNER_LINKS[islandCode]?.[partner]
      if (!programId || !baseLink) return null
      return {
        partner,
        programId,
        category: PROGRAM_CATEGORIES[partner] ?? 'ALTRO',
        baseLink,
      }
    })
    .filter((p): p is ProgramCard => p !== null)
}
