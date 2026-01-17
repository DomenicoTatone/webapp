/**
 * Centralized Affiliate Programs Data
 * Single Source of Truth for all partner/program configurations
 * Updated: 2026-01-17 from Tradedoubler screenshots
 */

export const ISLAND_NAMES = {
  "3220593": "Isola di Formentera",
  "3337668": "Isola di Lanzarote",
  "1639250": "Isola di Minorca",
  "3349565": "Isola di Minorca EN",
  "3349567": "Isola di Minorca ES",
  "3335968": "Vacanze nel Mediterraneo"
};

// Program IDs for each partner (p= parameter in Tradedoubler links)
export const PROGRAM_IDS = {
  // Common programs across sites
  "eDreams": "17269",
  "Direct Ferries IT": "313887",
  "Direct Ferries ES": "327261",
  "Direct Ferries UK": "324849",
  "Vueling IT": "288053",
  "Vueling UK": "320047",
  "Weweed": "343473",

  // Minorca IT (1639250)
  "Allianz Partners": "72847",
  "AXA Assistance": "261028",
  "Barceló Hotels & Resorts": "282865",
  "Columbus Assicurazioni": "76623",
  "Veratour": "319774",
  "Viaggisicuri": "249882",
  "Yalla Yalla": "218733",

  // Minorca EN (3349565)
  "Airport Parking Luton": "343105",
  "Airport Parking Manchester": "343201",
  "Airport Parking With Us": "343202",
  "Bee Parking": "383148",
  "Compare Cheap Parking Prices At M...": "355499",
  "Compare Parking Prices": "355683",
  "Compare Your Parking Deals": "360206",
  "Muslim Aid": "335318",

  // Minorca ES (3349567)
  "AXA Seguros de Viaje": "343738",
  "InterMundial": "381548",
  "Vayacruceros ES": "342494",

  // Vacanze nel Mediterraneo (3335968)
  "Eurowings IT": "307239",
  "Grandi Navi Veloci IT": "316693",
  "Viaggi in crociera": "341133"
};

// Program categories from Tradedoubler screenshots
export const PROGRAM_CATEGORIES = {
  // Formentera (3220593) - eDreams has VIAGGI + 2 OTHERS
  "eDreams": "VIAGGI",

  // Lanzarote (3337668)
  "Direct Ferries IT": "VIAGGI",

  // Minorca IT (1639250) - from screenshot 180325
  "Allianz Partners": "ASSICURAZIONI, VIAGGI",
  "AXA Assistance": "ASSICURAZIONI",
  "Barceló Hotels & Resorts": "VIAGGI",
  "Columbus Assicurazioni": "FINANZA",
  "Veratour": "VIAGGI",
  "Viaggisicuri": "ASSICURAZIONI",
  "Yalla Yalla": "VIAGGI",

  // Minorca EN (3349565) - from screenshot 180337
  "Airport Parking Luton": "VIAGGI",
  "Airport Parking Manchester": "VIAGGI",
  "Airport Parking With Us": "VIAGGI",
  "Bee Parking": "VIAGGI",
  "Compare Cheap Parking Prices At M...": "VIAGGI",
  "Compare Parking Prices": "VIAGGI",
  "Compare Your Parking Deals": "VIAGGI",
  "Direct Ferries UK": "VIAGGI",
  "Muslim Aid": "ORGANIZZAZIONI NO PROFIT",

  // Minorca ES (3349567) - from screenshot 180345
  "AXA Seguros de Viaje": "VIAGGI",
  "Direct Ferries ES": "VIAGGI",
  "InterMundial": "ASSICURAZIONI, VIAGGI",
  "Vayacruceros ES": "VIAGGI",

  // Vacanze nel Mediterraneo (3335968) - from screenshot 180352
  "Eurowings IT": "VIAGGI",
  "Grandi Navi Veloci IT": "VIAGGI",
  "Viaggi in crociera": "VIAGGI"
};

export const AFFILIATE_PARTNERS = {
  // Formentera - 3220593 (1 program)
  "3220593": [
    "eDreams"
  ],

  // Lanzarote - 3337668 (2 programs)
  "3337668": [
    "Direct Ferries IT",
    "eDreams"
  ],

  // Minorca IT - 1639250 (8 programs)
  "1639250": [
    "Allianz Partners",
    "AXA Assistance",
    "Barceló Hotels & Resorts",
    "Columbus Assicurazioni",
    "Direct Ferries IT",
    "Veratour",
    "Viaggisicuri",
    "Yalla Yalla"
  ],

  // Minorca EN - 3349565 (9 programs)
  "3349565": [
    "Airport Parking Luton",
    "Airport Parking Manchester",
    "Airport Parking With Us",
    "Bee Parking",
    "Compare Cheap Parking Prices At M...",
    "Compare Parking Prices",
    "Compare Your Parking Deals",
    "Direct Ferries UK",
    "Muslim Aid"
  ],

  // Minorca ES - 3349567 (5 programs)
  "3349567": [
    "AXA Seguros de Viaje",
    "Direct Ferries ES",
    "eDreams",
    "InterMundial",
    "Vayacruceros ES"
  ],

  // Vacanze nel Mediterraneo - 3335968 (5 programs)
  "3335968": [
    "Direct Ferries IT",
    "Eurowings IT",
    "Grandi Navi Veloci IT",
    "Veratour",
    "Viaggi in crociera"
  ]
};

// Generate PARTNER_LINKS dynamically from PROGRAM_IDS
function generatePartnerLinks() {
  const links = {};
  for (const [siteId, partners] of Object.entries(AFFILIATE_PARTNERS)) {
    links[siteId] = {};
    for (const partner of partners) {
      const programId = PROGRAM_IDS[partner];
      if (programId) {
        links[siteId][partner] = `https://clk.tradedoubler.com/click?p=${programId}&a=${siteId}`;
      }
    }
  }
  return links;
}

export const PARTNER_LINKS = generatePartnerLinks();

/**
 * Car Rental Providers for Menorca
 * Multilingual affiliate links
 */
export const CAR_RENTAL_PROVIDERS = [
  {
    name: "Coches Menorca",
    urls: {
      it: "https://cochesmenorca.es/it/?agentId=3",
      es: "https://cochesmenorca.es/?agentId=3",
      en: "https://cochesmenorca.es/en/?agentId=3",
      fr: "https://cochesmenorca.es/en/?agentId=3",
      de: "https://cochesmenorca.es/en/?agentId=3"
    }
  },
  {
    name: "Menorca Rent",
    urls: {
      it: "https://www.menorcarent.com/it/?agentId=15",
      es: "https://www.menorcarent.com/?agentId=15",
      en: "https://www.menorcarent.com/en/?agentId=15",
      fr: "https://www.menorcarent.com/fr/?agentId=15",
      de: "https://www.menorcarent.com/en/?agentId=15"
    }
  },
  {
    name: "Autos Xoroi",
    urls: {
      it: "http://www.alquilercochesmenorca.com/it/?link=ISOLADIMINORCA",
      es: "http://www.alquilercochesmenorca.com/es/?link=ISOLADIMINORCA",
      en: "http://www.alquilercochesmenorca.com/?link=ISOLADIMINORCA",
      fr: "http://www.alquilercochesmenorca.com/fr/?link=ISOLADIMINORCA",
      de: "http://www.alquilercochesmenorca.com/?link=ISOLADIMINORCA"
    }
  },
  {
    name: "HIPER Rent a Car",
    urls: {
      it: "https://hiperrentacar.com/it/?colaborador=LO-0495108",
      es: "https://hiperrentacar.com/es/?colaborador=LO-0495108",
      en: "https://hiperrentacar.com/en/?colaborador=LO-0495108",
      fr: "https://hiperrentacar.com/fr/?colaborador=LO-0495108",
      de: "https://hiperrentacar.com/de/?colaborador=LO-0495108"
    }
  },
  {
    name: "Rentalcars",
    urls: {
      it: "https://www.rentalcars.com/it/?affiliateCode=latitudine983",
      es: "https://www.rentalcars.com/es/?affiliateCode=latitudine983",
      en: "https://www.rentalcars.com/en/?affiliateCode=latitudine983",
      fr: "https://www.rentalcars.com/fr/?affiliateCode=latitudine983",
      de: "https://www.rentalcars.com/de/?affiliateCode=latitudine983"
    }
  }
];

export const VALIDATION_CRITERIA = {
  "1639250": {
    "Allianz Partners": ["https://www.allianz-assicurazioneviaggio.it/", "https://www.allianz-assistance.it/"],
    "AXA Assistance": ["https://www.assicurazione-viaggio.axa-assistance.it/"],
    "Barceló Hotels & Resorts": ["https://www.barcelo.com/"],
    "Columbus Assicurazioni": ["https://www.columbusassicurazioni.it/"],
    "Direct Ferries IT": ["https://www.directferries"],
    "Veratour": ["https://www.veratour.it/"],
    "Viaggisicuri": ["https://www.viaggisicuri.com/"],
    "Yalla Yalla": ["https://www.yallayalla.it/"]
  },
  "3220593": {
    "eDreams": ["https://www.edreams.it/"]
  },
  "3337668": {
    "Direct Ferries IT": ["https://www.directferries"],
    "eDreams": ["https://www.edreams.it/"]
  },
  "3349565": {
    "Direct Ferries UK": ["https://www.directferries"]
  },
  "3349567": {
    "eDreams": ["https://www.edreams.es/"],
    "Vayacruceros ES": ["https://www.vayacruceros.com/"]
  },
  "3335968": {
    "Direct Ferries IT": ["https://www.directferries"],
    "Eurowings IT": ["https://www.eurowings.com/"],
    "Grandi Navi Veloci IT": ["https://www.gnv.it/"],
    "Veratour": ["https://www.veratour.it/"],
    "Viaggi in crociera": ["https://www.viaggio-in-crociera.it/"]
  }
};
