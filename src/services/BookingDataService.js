/**
 * Booking Data Service PRO
 * Handles async data loading with IndexedDB caching for Booking affiliate links
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
        this.DB_NAME = 'DeepLinkPro';
        this.DB_VERSION = 1;
        this.STORE_NAME = 'bookingData';
        this.CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours
        this.db = null;
        this.dbReady = this._initDB();
    }

    /**
     * Initialize IndexedDB connection
     */
    async _initDB() {
        if (!window.indexedDB) {
            console.warn('[BookingData] IndexedDB not supported, using memory-only cache');
            return;
        }

        try {
            this.db = await new Promise((resolve, reject) => {
                const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);

                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains(this.STORE_NAME)) {
                        const store = db.createObjectStore(this.STORE_NAME, { keyPath: 'key' });
                        store.createIndex('timestamp', 'timestamp', { unique: false });
                        console.log('[BookingData] IndexedDB store created');
                    }
                };
            });
            console.log('[BookingData] IndexedDB connected');
        } catch (e) {
            console.warn('[BookingData] IndexedDB init failed:', e);
            this.db = null;
        }
    }

    /**
     * Generate cache key for a specific data request
     */
    getCacheKey(pageType, language, subType = null) {
        return `${pageType}_${language}_${subType || 'default'}`;
    }

    /**
     * Get data from IndexedDB
     */
    async getFromStorage(cacheKey) {
        await this.dbReady;
        if (!this.db) return null;

        try {
            const result = await new Promise((resolve, reject) => {
                const tx = this.db.transaction(this.STORE_NAME, 'readonly');
                const store = tx.objectStore(this.STORE_NAME);
                const request = store.get(cacheKey);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });

            if (!result) return null;

            const age = Date.now() - result.timestamp;
            if (age > this.CACHE_EXPIRY_MS) {
                this._deleteFromStorage(cacheKey);
                console.log(`[BookingData] IndexedDB expired: ${cacheKey}`);
                return null;
            }

            console.log(`[BookingData] IndexedDB hit: ${cacheKey} (age: ${Math.round(age / 60000)}min)`);
            return result.data;
        } catch (e) {
            console.warn('[BookingData] IndexedDB read error:', e);
            return null;
        }
    }

    /**
     * Save data to IndexedDB
     */
    async saveToStorage(cacheKey, data) {
        await this.dbReady;
        if (!this.db) return;

        try {
            await new Promise((resolve, reject) => {
                const tx = this.db.transaction(this.STORE_NAME, 'readwrite');
                const store = tx.objectStore(this.STORE_NAME);
                const request = store.put({
                    key: cacheKey,
                    data: data,
                    timestamp: Date.now()
                });
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
            console.log(`[BookingData] IndexedDB saved: ${cacheKey} (${data.length} items)`);
        } catch (e) {
            console.warn('[BookingData] IndexedDB write error:', e);
        }
    }

    /**
     * Delete entry from IndexedDB
     */
    async _deleteFromStorage(cacheKey) {
        if (!this.db) return;

        try {
            const tx = this.db.transaction(this.STORE_NAME, 'readwrite');
            const store = tx.objectStore(this.STORE_NAME);
            store.delete(cacheKey);
        } catch (e) {
            console.warn('[BookingData] IndexedDB delete error:', e);
        }
    }

    /**
     * Load data for a page type with caching
     * Priority: Memory Cache → IndexedDB → Network
     */
    async loadData(pageType, language, subType = null) {
        const cacheKey = this.getCacheKey(pageType, language, subType);

        // 1. Check memory cache (fastest)
        if (this.dataCache.has(cacheKey)) {
            console.log(`[BookingData] Memory hit: ${cacheKey}`);
            return this.dataCache.get(cacheKey);
        }

        // 2. Check IndexedDB (survives reload)
        const storedData = await this.getFromStorage(cacheKey);
        if (storedData) {
            this.dataCache.set(cacheKey, storedData);
            return storedData;
        }

        // 3. Return existing loading promise if already loading
        if (this.loadingPromises.has(cacheKey)) {
            console.log(`[BookingData] Waiting for load: ${cacheKey}`);
            return this.loadingPromises.get(cacheKey);
        }

        // 4. Fetch from network
        const loadPromise = this._fetchData(pageType, language, subType);
        this.loadingPromises.set(cacheKey, loadPromise);

        try {
            const data = await loadPromise;
            this.dataCache.set(cacheKey, data);
            this.saveToStorage(cacheKey, data); // Persist to IndexedDB (async)
            console.log(`[BookingData] Loaded ${data.length} items: ${cacheKey}`);
            return data;
        } finally {
            this.loadingPromises.delete(cacheKey);
        }
    }

    /**
     * Fetch data from S3 using script injection (bypasses CORS)
     */
    async _fetchData(pageType, language, subType) {
        const config = PAGE_TYPE_CONFIG[pageType];
        if (!config) {
            throw new Error(`Unknown page type: ${pageType}`);
        }

        const fileName = config.file(language, subType);
        const variableName = config.variableName(language, subType);
        const url = `${S3_BASE_URL}/${fileName}`;

        console.log(`[BookingData] Loading: ${url}`);

        // Check if already loaded
        if (window[variableName] && Array.isArray(window[variableName])) {
            return window[variableName];
        }

        // Check if script already exists
        const existingScript = document.querySelector(`script[src="${url}"]`);
        if (existingScript) {
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
                try {
                    await this._waitForVariable(variableName, 3000);
                    if (window[variableName] && Array.isArray(window[variableName])) {
                        resolve(window[variableName]);
                    } else {
                        reject(new Error(`Variable ${variableName} not found`));
                    }
                } catch (error) {
                    reject(error);
                }
            };

            script.onerror = () => reject(new Error(`Failed to load ${fileName}`));
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
     */
    search(query, data, limit = 50) {
        if (!query || query.length < 3) return [];

        const normalizedQuery = this.normalizeText(query);
        const results = [];

        for (const item of data) {
            if (results.length >= limit) break;
            const searchableText = this.normalizeText(item[0] || '');
            if (searchableText.includes(normalizedQuery)) {
                results.push(item);
            }
        }

        return results;
    }

    /**
     * Format a result item for display
     */
    formatResult(item, pageType) {
        const url = item[item.length - 1];

        switch (pageType) {
            case 'hotelPage':
                return { name: item[0], subtitle: item[1] || '', url };
            case 'airportPage':
                return { name: item[0], subtitle: item[1] || '', url };
            case 'districtPage':
                return { name: item[0], subtitle: item[1] || '', url };
            default:
                return { name: item[0], subtitle: item.length > 2 ? item[1] : '', url };
        }
    }

    /**
     * Check if a page type has sub-type options
     */
    hasSubType(pageType) {
        return PAGE_TYPE_CONFIG[pageType]?.hasSubType || false;
    }

    /**
     * Clear all cached data
     */
    clearCache() {
        this.dataCache.clear();
        console.log('[BookingData] Memory cache cleared');
    }
}

// Singleton export
export const bookingData = new BookingDataService();
export default bookingData;
