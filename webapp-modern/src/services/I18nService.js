/**
 * Internationalization Service with Browser Language Auto-Detection
 * Uses _locales folder structure for translations
 */

const SUPPORTED_LANGUAGES = ['it', 'en', 'es', 'fr', 'de'];
const DEFAULT_LANGUAGE = 'it';

class I18nService {
    constructor() {
        this.messages = {};
        this.currentLanguage = DEFAULT_LANGUAGE;
        this.isLoaded = false;
    }

    /**
     * Initialize the i18n service
     * Detects browser language and loads appropriate messages
     */
    async init() {
        this.currentLanguage = this.detectBrowserLanguage();
        await this.loadMessages(this.currentLanguage);
        this.applyLanguageToDocument();
        return this;
    }

    /**
     * Detect browser language and match to supported languages
     * @returns {string} The detected language code
     */
    detectBrowserLanguage() {
        // Check saved preference first
        const saved = localStorage.getItem('selectedLanguage');
        if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
            return saved;
        }

        // Get browser languages (ordered by preference)
        const browserLanguages = navigator.languages || [navigator.language || navigator.userLanguage];

        for (const lang of browserLanguages) {
            // Extract primary language code (e.g., 'en-US' -> 'en')
            const primaryLang = lang.split('-')[0].toLowerCase();

            if (SUPPORTED_LANGUAGES.includes(primaryLang)) {
                console.log(`[i18n] Browser language detected: ${primaryLang}`);
                return primaryLang;
            }
        }

        console.log(`[i18n] No matching language found, using default: ${DEFAULT_LANGUAGE}`);
        return DEFAULT_LANGUAGE;
    }

    /**
     * Load messages from _locales folder
     * @param {string} lang - Language code
     */
    async loadMessages(lang) {
        try {
            const response = await fetch(`/_locales/${lang}/messages.json`);
            if (!response.ok) {
                throw new Error(`Failed to load ${lang} messages`);
            }
            this.messages = await response.json();
            this.isLoaded = true;
            console.log(`[i18n] Loaded messages for: ${lang}`);
        } catch (error) {
            console.error(`[i18n] Error loading ${lang}:`, error);

            // Fallback to default language
            if (lang !== DEFAULT_LANGUAGE) {
                console.log(`[i18n] Falling back to ${DEFAULT_LANGUAGE}`);
                await this.loadMessages(DEFAULT_LANGUAGE);
            }
        }
    }

    /**
     * Get current language
     */
    getLanguage() {
        return this.currentLanguage;
    }

    /**
     * Set language, save preference, and reload messages
     * @param {string} lang - Language code
     */
    async setLanguage(lang) {
        if (!SUPPORTED_LANGUAGES.includes(lang)) {
            console.warn(`[i18n] Language ${lang} not supported`);
            return false;
        }

        this.currentLanguage = lang;
        localStorage.setItem('selectedLanguage', lang);

        await this.loadMessages(lang);
        this.applyLanguageToDocument();
        this.translatePage();

        return true;
    }

    /**
     * Apply language attribute to document
     */
    applyLanguageToDocument() {
        document.documentElement.lang = this.currentLanguage;
    }

    /**
     * Get translation for a key
     * @param {string} key - Message key
     * @returns {string} Translated string or key if not found
     */
    t(key) {
        if (!this.isLoaded) {
            console.warn('[i18n] Messages not loaded yet');
            return key;
        }
        return this.messages[key] || key;
    }

    /**
     * Translate all elements with data-i18n attribute
     */
    translatePage() {
        if (!this.isLoaded) return;

        // Translate text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translated = this.t(key);

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // Don't change input values, only placeholders
            } else {
                element.textContent = translated;
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });

        // Translate titles
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });
    }

    /**
     * Get all supported languages with metadata
     */
    getSupportedLanguages() {
        return [
            { code: 'it', label: 'Italiano', flag: '🇮🇹' },
            { code: 'en', label: 'English', flag: '🇬🇧' },
            { code: 'es', label: 'Español', flag: '🇪🇸' },
            { code: 'fr', label: 'Français', flag: '🇫🇷' },
            { code: 'de', label: 'Deutsch', flag: '🇩🇪' }
        ];
    }
}

// Create singleton instance
const i18n = new I18nService();

export { i18n, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE };
export default i18n;
