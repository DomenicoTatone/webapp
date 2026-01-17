/**
 * Booking Data Service PRO
 * Handles async data loading, caching, and search for Booking affiliate links
 */

const S3_BASE_URL = 'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com';

// Mapping page types to S3 file patterns
const PAGE_TYPE_CONFIG = {
    hotelPage: {
        file: (lang) => `hotel_page_links_${lang}.js`,
        variableName: (lang) => `links${lang.toUpperCase()}`,
        hasSubType: false
    },
    cityPage: {
        file: (lang, subType) => subType === 'landing'
            ? `city_landing_page_links_${lang}.js`
            : `city_page_links_${lang}.js`,
        variableName: (lang, subType) => subType === 'landing'
            ? `linksLandingCityPage${lang.toUpperCase()}`
            : `linksCityPage${lang.toUpperCase()}`,
        hasSubType: true
    },
    airportPage: {
        file: (lang, subType) => subType === 'landing'
            ? `airport_landing_page_links_${lang}.js`
            : `airport_page_links_${lang}.js`,
        variableName: (lang, subType) => subType === 'landing'
            ? `linksAirportLanding${lang.toUpperCase()}`
            : `linksAirport${lang.toUpperCase()}`,
        hasSubType: true
    },
    districtPage: {
        file: (lang, subType) => subType === 'landing'
            ? `district_landing_page_links_${lang}.js`
            : `district_page_links_${lang}.js`,
        variableName: (lang, subType) => subType === 'landing'
            ? `linksDistrictLandingPage${lang.toUpperCase()}`
            : `linksDistrictPage${lang.toUpperCase()}`,
        hasSubType: true
    },
    islandPage: {
        file: (lang, subType) => subType === 'landing'
            ? `island_landing_page_links_${lang}.js`
            : `island_page_links_${lang}.js`,
        variableName: (lang, subType) => subType === 'landing'
            ? `linksLandingIslandPage${lang.toUpperCase()}`
            : `linksIslandPage${lang.toUpperCase()}`,
        hasSubType: true
    },
    landmarkPage: {
        file: (lang, subType) => subType === 'landing'
            ? `landmark_landing_page_links_${lang}.js`
            : `landmark_page_links_${lang}.js`,
        variableName: (lang, subType) => subType === 'landing'
            ? `linksLandmarkLandingPage${lang.toUpperCase()}`
            : `linksLandmarkPage${lang.toUpperCase()}`,
        hasSubType: true
    },
    regionPage: {
        file: (lang, subType) => subType === 'landing'
            ? `region_landing_page_links_${lang}.js`
            : `region_page_links_${lang}.js`,
        variableName: (lang, subType) => subType === 'landing'
            ? `linksRegionLandingPage${lang.toUpperCase()}`
            : `linksRegionPage${lang.toUpperCase()}`,
        hasSubType: true
    }
};

class BookingDataService {
    constructor() {
        this.dataCache = new Map();
        this.loadingPromises = new Map();
        this.STORAGE_PREFIX = 'bookingData_';
        this.CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours
    }

    /**
     * Generate cache key for a specific data request
     */
    getCacheKey(pageType, language, subType = null) {
        return `${pageType}_${language}_${subType || 'default'}`;
    }

    /**
     * Try to get data from localStorage
     */
    getFromStorage(cacheKey) {
        try {
            const stored = localStorage.getItem(this.STORAGE_PREFIX + cacheKey);
            if (!stored) return null;

            const { data, timestamp } = JSON.parse(stored);
            const age = Date.now() - timestamp;

            if (age > this.CACHE_EXPIRY_MS) {
                localStorage.removeItem(this.STORAGE_PREFIX + cacheKey);
                console.log(`[BookingData] Storage expired for ${cacheKey}`);
                return null;
            }

            console.log(`[BookingData] Storage hit for ${cacheKey} (age: ${Math.round(age / 60000)}min)`);
            return data;
        } catch (e) {
            console.warn('[BookingData] Storage read error:', e);
            return null;
        }
    }

    /**
     * Save data to localStorage
     */
    saveToStorage(cacheKey, data) {
        try {
            const payload = JSON.stringify({
                data,
                timestamp: Date.now()
            });
            localStorage.setItem(this.STORAGE_PREFIX + cacheKey, payload);
            console.log(`[BookingData] Saved to storage: ${cacheKey}`);
        } catch (e) {
            console.warn('[BookingData] Storage write error:', e);
        }
    }

    /**
     * Load data for a page type with caching
     * Priority: Memory Cache → LocalStorage → Network
     */
    async loadData(pageType, language, subType = null) {
        const cacheKey = this.getCacheKey(pageType, language, subType);

        // 1. Check memory cache (fastest)
        if (this.dataCache.has(cacheKey)) {
            console.log(`[BookingData] Memory cache hit for ${cacheKey}`);
            return this.dataCache.get(cacheKey);
        }

        // 2. Check localStorage (survives reload)
        const storedData = this.getFromStorage(cacheKey);
        if (storedData) {
            this.dataCache.set(cacheKey, storedData); // Populate memory cache
            return storedData;
        }

        // 3. Return existing loading promise if already loading
        if (this.loadingPromises.has(cacheKey)) {
            console.log(`[BookingData] Waiting for existing load: ${cacheKey}`);
            return this.loadingPromises.get(cacheKey);
        }

        // 4. Fetch from network
        const loadPromise = this._fetchData(pageType, language, subType);
        this.loadingPromises.set(cacheKey, loadPromise);

        try {
            const data = await loadPromise;
            this.dataCache.set(cacheKey, data);
            this.saveToStorage(cacheKey, data); // Persist to localStorage
            console.log(`[BookingData] Loaded ${data.length} items for ${cacheKey}`);
            return data;
        } finally {
            this.loadingPromises.delete(cacheKey);
        }
    }

    /**
     * Fetch data from S3 using script injection (bypasses CORS)
     * Legacy files define global variables which we extract after loading
     */
    async _fetchData(pageType, language, subType) {
        const config = PAGE_TYPE_CONFIG[pageType];
        if (!config) {
            throw new Error(`Unknown page type: ${pageType}`);
        }

        const fileName = config.file(language, subType);
        const variableName = config.variableName(language, subType);
        const url = `${S3_BASE_URL}/${fileName}`;

        console.log(`[BookingData] Loading script: ${url}`);
        console.log(`[BookingData] Expected variable: ${variableName}`);

        // Check if already loaded
        if (window[variableName] && Array.isArray(window[variableName])) {
            console.log(`[BookingData] Variable already exists, using cached data`);
            return window[variableName];
        }

        // Check if script already exists
        const existingScript = document.querySelector(`script[src="${url}"]`);
        if (existingScript) {
            // Script exists, wait a bit and check for variable
            await this._waitForVariable(variableName, 2000);
            if (window[variableName]) {
                return window[variableName];
            }
        }

        // Inject script and wait for variable
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.className = 'booking-data-script';

            script.onload = async () => {
                console.log(`[BookingData] Script loaded: ${fileName}`);

                // Wait for the variable to be defined
                try {
                    await this._waitForVariable(variableName, 3000);

                    if (window[variableName] && Array.isArray(window[variableName])) {
                        console.log(`[BookingData] Found ${window[variableName].length} items`);
                        resolve(window[variableName]);
                    } else {
                        reject(new Error(`Variable ${variableName} not found after script load`));
                    }
                } catch (error) {
                    reject(error);
                }
            };

            script.onerror = () => {
                console.error(`[BookingData] Failed to load script: ${url}`);
                reject(new Error(`Failed to load ${fileName}`));
            };

            document.body.appendChild(script);
        });
    }

    /**
     * Wait for a global variable to be defined
     */
    _waitForVariable(variableName, timeout = 3000) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();

            const check = () => {
                if (window[variableName] !== undefined) {
                    resolve();
                } else if (Date.now() - startTime > timeout) {
                    reject(new Error(`Timeout waiting for ${variableName}`));
                } else {
                    setTimeout(check, 50);
                }
            };

            check();
        });
    }

    /**
     * Remove accents for search normalization
     */
    normalizeText(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    }

    /**
     * Search data array with normalized matching
     * @param {string} query - Search term
     * @param {Array} data - Data array to search
     * @param {number} limit - Max results (default 50)
     * @returns {Array} Filtered results
     */
    search(query, data, limit = 50) {
        if (!query || query.length < 3) {
            return [];
        }

        const normalizedQuery = this.normalizeText(query);
        const results = [];

        for (const item of data) {
            if (results.length >= limit) break;

            // Item structure: [name, city/code, url] or [name, url] etc.
            const searchableText = this.normalizeText(item[0] || '');

            if (searchableText.includes(normalizedQuery)) {
                results.push(item);
            }
        }

        return results;
    }

    /**
     * Format a result item for display
     * @param {Array} item - Raw data item
     * @param {string} pageType - Type of page
     * @returns {Object} Formatted result { name, subtitle, url }
     */
    formatResult(item, pageType) {
        const url = item[item.length - 1]; // URL is always last

        switch (pageType) {
            case 'hotelPage':
                // [hotelName, city, url]
                return {
                    name: item[0],
                    subtitle: item[1] || '',
                    url
                };
            case 'airportPage':
                // [airportName, IATA, city, region, url]
                return {
                    name: item[0],
                    subtitle: item[1] || '', // IATA code
                    url
                };
            case 'districtPage':
                // [districtName, city, code, url]
                return {
                    name: item[0],
                    subtitle: item[1] || '',
                    url
                };
            case 'cityPage':
            case 'islandPage':
            case 'landmarkPage':
            case 'regionPage':
            default:
                // [name, ...other, url]
                return {
                    name: item[0],
                    subtitle: item.length > 2 ? item[1] : '',
                    url
                };
        }
    }

    /**
     * Check if a page type has sub-type options (landing vs search results)
     */
    hasSubType(pageType) {
        return PAGE_TYPE_CONFIG[pageType]?.hasSubType || false;
    }

    /**
     * Clear all cached data
     */
    clearCache() {
        this.dataCache.clear();
        console.log('[BookingData] Cache cleared');
    }
}

// Singleton export
export const bookingData = new BookingDataService();
export default bookingData;
