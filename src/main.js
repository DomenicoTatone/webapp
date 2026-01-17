/**
 * WebApp Modern - Main Application
 * Deep Link Generator with Browser Locale Auto-Detection
 */

import './styles/base.css';
import './styles/components.css';
import './styles/app.css';
import './styles/custom-select.css';

import { CustomSelect } from './components/CustomSelect.js';

import { i18n } from './services/I18nService.js';
import { linkGenerator } from './services/LinkGeneratorService.js';
import { notifications } from './services/NotificationService.js';
import { bookingData } from './services/BookingDataService.js';
import { AFFILIATE_PARTNERS, CAR_RENTAL_PROVIDERS, PROGRAM_IDS, PROGRAM_CATEGORIES } from './data/affiliates.js';

class App {
  constructor() {
    this.currentPage = 'booking';
    this.bookingState = {
      data: null,
      isLoading: false,
      error: null,
      searchTimeout: null
    };
  }

  async init() {
    // Initialize i18n with browser language detection
    await i18n.init();
    console.log(`[App] Language detected: ${i18n.getLanguage()}`);

    this.setupNavigation();
    this.setupLanguageSelector();
    this.loadPage(this.currentPage);
  }

  setupNavigation() {
    document.querySelectorAll('[data-page]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.loadPage(e.currentTarget.dataset.page);
      });
    });
  }

  setupLanguageSelector() {
    const dropdown = document.querySelector('.language-dropdown');
    const trigger = document.getElementById('langTrigger');
    const menu = document.getElementById('langMenu');
    const options = document.querySelectorAll('.lang-option');

    const langData = {
      it: { code: 'IT' },
      en: { code: 'EN' },
      es: { code: 'ES' },
      fr: { code: 'FR' },
      de: { code: 'DE' }
    };

    // Set initial active state
    const currentLang = i18n.getLanguage();
    this.updateLangTrigger(trigger, langData[currentLang]);
    document.querySelector(`[data-lang="${currentLang}"]`)?.classList.add('active');

    // Toggle dropdown on trigger click
    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', dropdown.classList.contains('is-open'));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!dropdown?.contains(e.target)) {
        dropdown?.classList.remove('is-open');
        trigger?.setAttribute('aria-expanded', 'false');
      }
    });

    // Handle language selection
    options.forEach(option => {
      option.addEventListener('click', async () => {
        const lang = option.dataset.lang;

        // Update active state
        options.forEach(o => o.classList.remove('active'));
        option.classList.add('active');

        // Update trigger display
        this.updateLangTrigger(trigger, langData[lang]);

        // Close dropdown
        dropdown.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');

        // Apply language
        await i18n.setLanguage(lang);
        bookingData.clearCache();
        this.bookingState.data = null;
        this.loadPage(this.currentPage);
        notifications.success(i18n.t('languageChanged'));
      });
    });
  }

  updateLangTrigger(trigger, langInfo) {
    if (!trigger || !langInfo) return;
    trigger.querySelector('.lang-code').textContent = langInfo.code;
  }

  loadPage(pageName) {
    this.currentPage = pageName;
    const content = document.getElementById('page-content');

    document.querySelectorAll('[data-page]').forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageName);
    });

    // Render phase: set innerHTML with data-i18n attributes
    const renderers = {
      booking: () => this.renderBookingPage(),
      tradedoubler: () => this.renderTradedoublerPage(),
      getyourguide: () => this.renderGetYourGuidePage(),
      civitatis: () => this.renderCivitatisPage(),
      carrental: () => this.renderCarRentalPage(),
      imgtool: () => this.renderImageToolPage(),
      feedback: () => this.renderFeedbackPage()
    };

    const renderer = renderers[pageName];
    if (renderer) {
      content.innerHTML = renderer();
    } else {
      content.innerHTML = '<p>Page not found</p>';
      return;
    }

    // Translate FIRST so CustomSelect sees localized text
    i18n.translatePage();

    // Init phase: attach event listeners and CustomSelect AFTER translation
    const initializers = {
      booking: () => this.initBookingPage(),
      tradedoubler: () => this.initTradedoublerPage(),
      getyourguide: () => this.initGetYourGuidePage(),
      civitatis: () => this.initCivitatisPage(),
      carrental: () => this.initCarRentalPage(),
      imgtool: () => this.initImageToolPage(),
      feedback: () => this.initFeedbackPage()
    };

    const initializer = initializers[pageName];
    if (initializer) initializer();
  }

  // ============================================
  // BOOKING PAGE - PRO REFACTORED
  // ============================================

  renderBookingPage() {
    return `
      <div class="page-header">
        <h2 data-i18n="bookingHeader">Cerca il Deep Link di Booking</h2>
        <span class="badge badge-warning" data-i18n="spainIslandsOnly">⚠️ Solo Spagna e Isole</span>
      </div>
      
      <div id="page-status" class="page-status"></div>
      
      <div class="card booking-unified-card">
        <!-- Labeled Controls -->
        <div class="form-row">
          <div class="form-group">
            <label class="form-label form-label-sm" data-i18n="pageTypeLabel">Tipo Pagina</label>
            <select id="pageTypeSelect" class="form-select form-select-sm">
              <option value="cityPage" data-i18n="cityPage">Pagina Città</option>
              <option value="hotelPage" data-i18n="hotelPage">Pagina Hotel</option>
              <option value="airportPage" data-i18n="airportPage">Pagina Aeroporto</option>
              <option value="districtPage" data-i18n="districtPage">Pagina Quartiere</option>
              <option value="islandPage" data-i18n="islandPage">Pagina Isola</option>
              <option value="landmarkPage" data-i18n="landmarkPage">Pagina Luogo</option>
              <option value="regionPage" data-i18n="regionPage">Pagina Regione</option>
              <option value="genericLandingPages" data-i18n="genericLandingPages">Pagina Generica</option>
            </select>
          </div>
          <div class="form-group form-group-sm">
            <label class="form-label form-label-sm" data-i18n="languageLabel">Lingua</label>
            <select id="bookingLangSelect" class="form-select form-select-sm">
              <option value="it">IT</option>
              <option value="es">ES</option>
              <option value="en">EN</option>
              <option value="fr">FR</option>
            </select>
          </div>
          <div class="form-group form-group-grow">
            <label class="form-label form-label-sm" data-i18n="searchLabel">Cerca</label>
            <input type="text" id="searchInput" class="form-control" 
                   data-i18n-placeholder="searchPlaceholder" 
                   placeholder="Cerca...">
          </div>
        </div>

        <!-- Sub Type Radio (when applicable) -->
        <div class="form-group" id="subTypeGroup" style="display:none;">
          <div class="radio-group">
            <label class="radio-label has-tooltip" data-tooltip="Mostra un elenco di hotel/sistemazioni nella destinazione selezionata. Ideale per offrire scelta ai lettori.">
              <input type="radio" name="subType" value="searchResults" checked>
              <span data-i18n="searchResultsPageLabel">Pagina Risultati</span>
            </label>
            <label class="radio-label has-tooltip" data-tooltip="Pagina informativa sulla destinazione con info turistiche e opzioni di alloggio. Perfetta per contenuti editoriali.">
              <input type="radio" name="subType" value="landing">
              <span data-i18n="landingPageLabel">Landing Page</span>
            </label>
          </div>
        </div>

        <!-- Search Hint -->
        <div id="searchHint" class="search-hint" data-i18n="searchMinChars">Digita almeno 3 caratteri per cercare</div>

        <!-- Loading State (inline) -->
        <div id="loadingState" class="loading-inline" style="display:none;">
          <div class="loading-spinner"></div>
          <span data-i18n="loadingData">Caricamento dati...</span>
        </div>

        <!-- Error State (inline) -->
        <div id="errorState" class="error-inline" style="display:none;">
          <span class="error-icon">⚠️</span>
          <span id="errorMessage" data-i18n="errorLoadingData">Errore nel caricamento</span>
          <button id="retryBtn" class="btn btn-sm btn-primary" data-i18n="retryLoad">Riprova</button>
        </div>

        <!-- Results Header -->
        <div id="resultsHeader" class="results-header" style="display:none;">
          <span id="resultsCount" class="results-count"></span>
        </div>

        <!-- Results Container -->
        <div id="resultsContainer" class="results-list"></div>
      </div>

      <!-- Generic Landing Pages (separate card) -->
      <div class="card mt-6" id="landingLinksCard" style="display:none;">
        <h3 class="card-title" data-i18n="genericLandingPages">Link Generici</h3>
        <div id="landingLinks" class="link-list"></div>
      </div>
    `;
  }

  async initBookingPage() {
    const pageTypeSelect = document.getElementById('pageTypeSelect');
    const subTypeGroup = document.getElementById('subTypeGroup');
    const searchInput = document.getElementById('searchInput');
    const searchHint = document.getElementById('searchHint');
    const landingLinksCard = document.getElementById('landingLinksCard');

    // Initialize Custom Select dropdowns for premium look
    if (pageTypeSelect) {
      new CustomSelect(pageTypeSelect);
    }
    const bookingLangSelectEl = document.getElementById('bookingLangSelect');
    if (bookingLangSelectEl) {
      new CustomSelect(bookingLangSelectEl);
    }

    // Handle page type change
    const handlePageTypeChange = async () => {
      const pageType = pageTypeSelect.value;
      const isGeneric = pageType === 'genericLandingPages';
      const hasSubType = bookingData.hasSubType(pageType);

      // Update UI visibility
      subTypeGroup.style.display = hasSubType ? 'block' : 'none';
      searchInput.style.display = isGeneric ? 'none' : 'block';
      if (searchHint) searchHint.style.display = isGeneric ? 'none' : 'block';
      landingLinksCard.style.display = isGeneric ? 'block' : 'none';
      document.getElementById('resultsHeader').style.display = 'none';
      document.getElementById('resultsContainer').innerHTML = '';
      document.getElementById('errorState').style.display = 'none';

      if (isGeneric) {
        this.showGenericLandingPages();
      } else {
        // Load data for selected page type
        await this.loadBookingData();
      }
    };

    // Handle search with debounce
    const handleSearch = () => {
      clearTimeout(this.bookingState.searchTimeout);
      this.bookingState.searchTimeout = setTimeout(() => {
        this.performSearch(searchInput.value);
      }, 300);
    };

    // Handle subtype change
    const handleSubTypeChange = async () => {
      this.bookingState.data = null; // Clear cached data for new subtype
      await this.loadBookingData();
    };

    // Handle language change
    const bookingLangSelect = document.getElementById('bookingLangSelect');
    const handleLangChange = async () => {
      this.bookingState.data = null; // Clear cached data for new language
      await this.loadBookingData();
    };

    // Attach event listeners
    pageTypeSelect.addEventListener('change', handlePageTypeChange);
    searchInput.addEventListener('input', handleSearch);
    bookingLangSelect.addEventListener('change', handleLangChange);
    document.querySelectorAll('input[name="subType"]').forEach(radio => {
      radio.addEventListener('change', handleSubTypeChange);
    });
    document.getElementById('retryBtn')?.addEventListener('click', () => this.loadBookingData());

    // Initial load
    await handlePageTypeChange();
  }

  async loadBookingData() {
    const pageType = document.getElementById('pageTypeSelect').value;
    if (pageType === 'genericLandingPages') return;

    // Use the language selector value, not UI language
    const language = document.getElementById('bookingLangSelect')?.value || 'it';
    const subTypeRadio = document.querySelector('input[name="subType"]:checked');
    const subType = subTypeRadio?.value === 'landing' ? 'landing' : null;

    // Show loading state
    this.setBookingUIState('loading');

    try {
      const data = await bookingData.loadData(pageType, language, subType);
      this.bookingState.data = data;
      this.bookingState.error = null;

      // Show ready state (no success notification - only show critical messages)
      this.setBookingUIState('ready');

      // Perform initial search if there's input
      const searchValue = document.getElementById('searchInput')?.value;
      if (searchValue && searchValue.length >= 3) {
        this.performSearch(searchValue);
      }
    } catch (error) {
      console.error('[Booking] Load error:', error);
      this.bookingState.error = error.message;
      this.setBookingUIState('error');
    }
  }

  setBookingUIState(state) {
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const resultsHeader = document.getElementById('resultsHeader');
    const resultsContainer = document.getElementById('resultsContainer');
    const searchHint = document.getElementById('searchHint');

    loadingState.style.display = state === 'loading' ? 'flex' : 'none';
    errorState.style.display = state === 'error' ? 'flex' : 'none';
    resultsHeader.style.display = 'none';
    resultsContainer.innerHTML = '';

    if (searchHint) {
      searchHint.style.display = state === 'ready' ? 'block' : 'none';
    }
  }

  performSearch(query) {
    if (!this.bookingState.data) return;

    const resultsHeader = document.getElementById('resultsHeader');
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsCount = document.getElementById('resultsCount');
    const searchHint = document.getElementById('searchHint');

    if (!query || query.length < 3) {
      resultsHeader.style.display = 'none';
      resultsContainer.innerHTML = '';
      if (searchHint) searchHint.style.display = 'block';
      return;
    }

    if (searchHint) searchHint.style.display = 'none';

    const pageType = document.getElementById('pageTypeSelect').value;
    const results = bookingData.search(query, this.bookingState.data, 50);

    if (results.length === 0) {
      resultsHeader.style.display = 'flex';
      resultsCount.textContent = i18n.t('noResultsFound');
      resultsContainer.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">🔍</span>
          <p data-i18n="noResultsFound">${i18n.t('noResultsFound')}</p>
        </div>
      `;
      return;
    }

    // Render results
    resultsHeader.style.display = 'flex';
    resultsCount.textContent = `${results.length} ${i18n.t('resultsFound')}`;

    resultsContainer.innerHTML = results.map(item => {
      const formatted = bookingData.formatResult(item, pageType);
      return `
        <div class="result-card">
          <div class="result-info">
            <span class="result-name">${this.escapeHtml(formatted.name)}</span>
            ${formatted.subtitle ? `<span class="result-subtitle">${this.escapeHtml(formatted.subtitle)}</span>` : ''}
          </div>
          <div class="result-actions">
            <button class="btn btn-sm btn-primary" data-copy="${this.escapeHtml(formatted.url)}">${i18n.t('copyLink')}</button>
            <a href="${formatted.url}" target="_blank" class="btn btn-sm btn-outline">${i18n.t('openLink')}</a>
          </div>
        </div>
      `;
    }).join('');

    // Attach copy handlers
    resultsContainer.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const success = await linkGenerator.copyToClipboard(btn.dataset.copy);
        notifications[success ? 'success' : 'error'](i18n.t(success ? 'deepLinkCopied' : 'copyError'));
      });
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showGenericLandingPages() {
    const container = document.getElementById('landingLinks');
    document.getElementById('landingLinksCard').style.display = 'block';
    document.getElementById('resultsCard').style.display = 'none';

    const links = [
      { key: 'homePage', url: 'https://www.booking.com/index.html?aid=955564' },
      { key: 'apartmentsPage', url: 'https://www.booking.com/apartments/index.html?aid=955564' },
      { key: 'resortsPage', url: 'https://www.booking.com/resorts/index.html?aid=955564' },
      { key: 'villasPage', url: 'https://www.booking.com/villas/index.html?aid=955564' },
      { key: 'bedAndBreakfastPage', url: 'https://www.booking.com/bed-and-breakfast/index.html?aid=955564' },
      { key: 'guestHousePage', url: 'https://www.booking.com/guest-house/index.html?aid=955564' }
    ];

    container.innerHTML = links.map(link => `
      <div class="link-item">
        <span>${i18n.t(link.key)}</span>
        <div class="link-actions">
          <a href="${link.url}" target="_blank" class="btn btn-sm btn-outline">${i18n.t('openLink')}</a>
          <button class="btn btn-sm btn-primary" data-copy="${link.url}">${i18n.t('copyLink')}</button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const success = await linkGenerator.copyToClipboard(btn.dataset.copy);
        notifications[success ? 'success' : 'error'](i18n.t(success ? 'deepLinkCopied' : 'copyError'));
      });
    });
  }

  // ============================================
  // TRADEDOUBLER PAGE
  // ============================================

  renderTradedoublerPage() {
    const islands = linkGenerator.getAllIslands();

    return `
      <div class="page-header">
        <h2 data-i18n="usefulTLinksHeader">I Programmi Attivi</h2>
      </div>

      <div id="page-status" class="page-status"></div>

      <div class="card td-unified-card">
        <!-- Site Selector -->
        <div class="td-site-selector">
          <label class="form-label" data-i18n="programLabel">Programma</label>
          <select id="islandSelect" class="form-select">
            <option value="" data-i18n="selectSite">Seleziona un sito</option>
            ${islands.map(i => `<option value="${i.code}">${i.displayName}</option>`).join('')}
          </select>
        </div>

        <!-- Deep Link Generator (Collapsible) -->
        <details class="td-deeplink-details">
          <summary class="td-deeplink-summary">
            <span data-i18n="generateDeepLinkSection">Genera Deep Link Personalizzato</span>
          </summary>
          <div class="td-deeplink-content">
            <div class="td-info-note">
              <span class="info-icon">ℹ️</span>
              <span data-i18n="autoDetectNote">Incolla un URL e il programma verrà riconosciuto automaticamente</span>
            </div>
            <div class="td-input-row">
              <input type="text" id="inputUrl" class="form-control" placeholder="https://www.edreams.it/..." data-i18n-placeholder="urlPlaceholder">
              <button id="generateBtn" class="btn btn-primary" data-i18n="generateLink">Genera</button>
            </div>
            <div id="resultContainer" class="td-result-section" style="display:none;">
              <div class="result-box">
                <a id="resultLink" href="#" target="_blank" class="result-link"></a>
              </div>
              <div class="td-result-actions">
                <button id="copyResultBtn" class="btn btn-success" data-i18n="copyLink">Copia Link</button>
                <button id="openResultBtn" class="btn btn-outline" data-i18n="openLink">Apri Link</button>
              </div>
            </div>
          </div>
        </details>

        <!-- Program Cards Grid -->
        <div id="programCardsContainer" class="program-cards-grid">
          <div class="program-cards-empty">
            <span class="empty-icon">📋</span>
            <p data-i18n="selectSiteToViewPrograms">Seleziona un sito per vedere i programmi attivi</p>
          </div>
        </div>
      </div>
    `;
  }

  initTradedoublerPage() {
    const islandSelect = document.getElementById('islandSelect');
    const generateBtn = document.getElementById('generateBtn');
    const inputUrl = document.getElementById('inputUrl');
    const resultContainer = document.getElementById('resultContainer');
    const resultLink = document.getElementById('resultLink');
    const programCardsContainer = document.getElementById('programCardsContainer');

    // Initialize Custom Select dropdown
    if (islandSelect) new CustomSelect(islandSelect);

    // Render program cards when site is selected
    const renderProgramCards = (siteCode) => {
      const partners = AFFILIATE_PARTNERS[siteCode] || [];

      if (!siteCode || partners.length === 0) {
        programCardsContainer.innerHTML = `
          <div class="program-cards-empty">
            <span class="empty-icon">📋</span>
            <p data-i18n="selectSiteToViewPrograms">Seleziona un sito per vedere i programmi attivi</p>
          </div>
        `;
        return;
      }

      const cardsHTML = partners.map(partner => {
        const baseLink = linkGenerator.getPartnerBaseLink(siteCode, partner);
        const programId = PROGRAM_IDS[partner] || '—';
        const category = PROGRAM_CATEGORIES[partner] || 'ALTRO';
        return `
          <div class="program-card">
            <div class="program-card-body">
              <div class="program-card-meta">
                <span class="program-badge program-badge--${category.toLowerCase().replace(/\s+/g, '-')}">${category}</span>
                <span class="program-id">ID: ${programId}</span>
              </div>
              <h4 class="program-card-title">${this.escapeHtml(partner)}</h4>
              <p class="program-card-link">${baseLink ? new URL(baseLink).hostname : 'tradedoubler.com'}</p>
            </div>
            <div class="program-card-actions">
              <button class="btn btn-sm btn-primary" data-copy="${this.escapeHtml(baseLink || '')}" title="${i18n.t('copyLink')}">
                ${i18n.t('copyLink')}
              </button>
              <a href="${baseLink || '#'}" target="_blank" class="btn btn-sm btn-outline" title="${i18n.t('openLink')}">
                ${i18n.t('openLink')}
              </a>
            </div>
          </div>
        `;
      }).join('');

      programCardsContainer.innerHTML = `
        <div class="program-cards-count">${partners.length} ${i18n.t('programsActive') || 'programmi attivi'}</div>
        <div class="program-cards-wrapper">${cardsHTML}</div>
      `;

      // Attach copy handlers
      programCardsContainer.querySelectorAll('[data-copy]').forEach(btn => {
        btn.addEventListener('click', async () => {
          const link = btn.dataset.copy;
          if (link) {
            const success = await linkGenerator.copyToClipboard(link);
            notifications[success ? 'success' : 'error'](i18n.t(success ? 'deepLinkCopied' : 'copyError'));
          }
        });
      });
    };

    islandSelect.addEventListener('change', () => {
      const code = islandSelect.value;
      renderProgramCards(code);
      resultContainer.style.display = 'none';
    });

    generateBtn.addEventListener('click', () => {
      const code = islandSelect.value;
      const url = inputUrl.value.trim();

      if (!code) { notifications.warning(i18n.t('selectSite') || 'Seleziona un sito'); return; }
      if (!url) { notifications.warning(i18n.t('enterUrl')); return; }

      // Auto-detect partner (no need to pass partner name)
      const result = linkGenerator.generateDeepLink(url, code);

      if (result.success) {
        resultLink.href = result.link;
        resultLink.textContent = result.link;
        resultContainer.style.display = 'block';
        notifications.success(`${i18n.t('deepLinkGenerated')} (${result.partner})`);
      } else {
        notifications.error(i18n.t(result.error) || result.error);
      }
    });

    document.getElementById('copyResultBtn')?.addEventListener('click', async () => {
      const success = await linkGenerator.copyToClipboard(resultLink.href);
      notifications[success ? 'success' : 'error'](i18n.t(success ? 'deepLinkCopied' : 'copyError'));
    });

    document.getElementById('openResultBtn')?.addEventListener('click', () => {
      linkGenerator.openLink(resultLink.href);
    });
  }

  // ============================================
  // GETYOURGUIDE PAGE
  // ============================================

  renderGetYourGuidePage() {
    return `
      <div class="page-header">
        <h2 data-i18n="GetYourGuideLink">Deep Link GetYourGuide</h2>
      </div>

      <div id="page-status" class="page-status"></div>

      <!-- Homepage Links Section -->
      <div class="card">
        <h3 class="section-title" data-i18n="homepageLinks">Link Homepage</h3>
        <div id="gygHomepageResult" class="result-container">
          <label class="form-label" data-i18n="affiliateLink">Link Affiliato</label>
          <div class="result-box">
            <a id="gygHomepageLink" href="#" target="_blank" class="result-link"></a>
          </div>
          <div class="integrated-actions mt-4">
            <select id="gygLangSelect" class="form-select form-select-sm">
              <option value="it">🇮🇹 IT</option>
              <option value="es">🇪🇸 ES</option>
              <option value="en">🇬🇧 EN</option>
              <option value="fr">🇫🇷 FR</option>
            </select>
            <div class="button-group">
              <button id="gygHomepageCopyBtn" class="btn btn-success" data-i18n="copyLink">Copia Link</button>
              <button id="gygHomepageOpenBtn" class="btn btn-outline" data-i18n="openLink">Apri Link</button>
            </div>
          </div>
        </div>
      </div>

      <!-- URL Transformer Section -->
      <div class="card mt-6">
        <h3 class="section-title" data-i18n="generateDeepLinkSection">Genera Deep Link</h3>
        <div class="form-group">
          <label class="form-label" data-i18n="insertGetYourGuideLink">Inserisci il link</label>
          <input type="text" id="gygInput" class="form-control" placeholder="https://www.getyourguide.com/...">
        </div>

        <div class="button-group">
          <button id="gygGenerateBtn" class="btn btn-primary" data-i18n="generateLink">Genera Link</button>
        </div>

        <div id="gygResult" class="result-container" style="display:none;">
          <label class="form-label" data-i18n="generatedDeepLink">Deep Link Generato</label>
          <div class="result-box">
            <a id="gygResultLink" href="#" target="_blank" class="result-link"></a>
          </div>
          <div class="button-group mt-4">
            <button id="gygCopyBtn" class="btn btn-success" data-i18n="copyLink">Copia Link</button>
            <button id="gygOpenBtn" class="btn btn-outline" data-i18n="openLink">Apri Link</button>
          </div>
        </div>
      </div>
    `;
  }

  initGetYourGuidePage() {
    // Homepage links
    const gygHomepageLinks = {
      it: "https://www.getyourguide.it/?partner_id=Q5TFESQ&utm_medium=online_publisher",
      es: "https://www.getyourguide.es/?partner_id=Q5TFESQ&utm_medium=online_publisher",
      en: "https://www.getyourguide.com/?partner_id=Q5TFESQ&utm_medium=online_publisher",
      fr: "https://www.getyourguide.fr/?partner_id=Q5TFESQ&utm_medium=online_publisher"
    };

    const langSelect = document.getElementById('gygLangSelect');
    const homepageLink = document.getElementById('gygHomepageLink');

    // Initialize Custom Select dropdown
    if (langSelect) new CustomSelect(langSelect);

    const updateHomepageLink = () => {
      const url = gygHomepageLinks[langSelect.value] || gygHomepageLinks['en'];
      homepageLink.href = url;
      homepageLink.textContent = url;
    };

    langSelect.addEventListener('change', updateHomepageLink);
    updateHomepageLink();

    document.getElementById('gygHomepageCopyBtn')?.addEventListener('click', async () => {
      const success = await linkGenerator.copyToClipboard(homepageLink.href);
      notifications[success ? 'success' : 'error'](i18n.t(success ? 'deepLinkCopied' : 'copyError'));
    });

    document.getElementById('gygHomepageOpenBtn')?.addEventListener('click', () => {
      linkGenerator.openLink(homepageLink.href);
    });

    // URL Transformer
    const input = document.getElementById('gygInput');
    const generateBtn = document.getElementById('gygGenerateBtn');
    const resultContainer = document.getElementById('gygResult');
    const resultLink = document.getElementById('gygResultLink');

    generateBtn.addEventListener('click', () => {
      const url = input.value.trim();
      if (!url) { notifications.warning(i18n.t('validGetYourGuideURL')); return; }

      const result = linkGenerator.generateGetYourGuideLink(url);

      if (result.success) {
        resultLink.href = result.link;
        resultLink.textContent = result.link;
        resultContainer.style.display = 'block';
        notifications.success(i18n.t('deepLinkGenerated'));
      } else {
        notifications.error(i18n.t(result.error));
      }
    });

    document.getElementById('gygCopyBtn')?.addEventListener('click', async () => {
      const success = await linkGenerator.copyToClipboard(resultLink.href);
      notifications[success ? 'success' : 'error'](i18n.t(success ? 'deepLinkCopied' : 'copyError'));
    });

    document.getElementById('gygOpenBtn')?.addEventListener('click', () => {
      linkGenerator.openLink(resultLink.href);
    });
  }

  // ============================================
  // CIVITATIS PAGE
  // ============================================

  renderCivitatisPage() {
    return `
      <div class="page-header">
        <h2 data-i18n="CivitatisLink">Deep Link Civitatis</h2>
      </div>

      <div id="page-status" class="page-status"></div>

      <!-- Homepage Links Section -->
      <div class="card">
        <h3 class="section-title" data-i18n="homepageLinks">Link Homepage</h3>
        <div id="civHomepageResult" class="result-container">
          <label class="form-label" data-i18n="affiliateLink">Link Affiliato</label>
          <div class="result-box">
            <a id="civHomepageLink" href="#" target="_blank" class="result-link"></a>
          </div>
          <div class="integrated-actions mt-4">
            <select id="civLangSelect" class="form-select form-select-sm">
              <option value="it">🇮🇹 IT</option>
              <option value="es">🇪🇸 ES</option>
              <option value="en">🇬🇧 EN</option>
              <option value="fr">🇫🇷 FR</option>
            </select>
            <div class="button-group">
              <button id="civHomepageCopyBtn" class="btn btn-success" data-i18n="copyLink">Copia Link</button>
              <button id="civHomepageOpenBtn" class="btn btn-outline" data-i18n="openLink">Apri Link</button>
            </div>
          </div>
        </div>
      </div>

      <!-- URL Transformer Section -->
      <div class="card mt-6">
        <h3 class="section-title" data-i18n="generateDeepLinkSection">Genera Deep Link</h3>
        <div class="form-group">
          <label class="form-label" data-i18n="insertCivitatisLink">Inserisci il link</label>
          <input type="text" id="civInput" class="form-control" placeholder="https://www.civitatis.com/...">
        </div>

        <div class="button-group">
          <button id="civGenerateBtn" class="btn btn-primary" data-i18n="generateLink">Genera Link</button>
        </div>

        <div id="civResult" class="result-container" style="display:none;">
          <label class="form-label" data-i18n="generatedDeepLink">Deep Link Generato</label>
          <div class="result-box">
            <a id="civResultLink" href="#" target="_blank" class="result-link"></a>
          </div>
          <div class="button-group mt-4">
            <button id="civCopyBtn" class="btn btn-success" data-i18n="copyLink">Copia Link</button>
            <button id="civOpenBtn" class="btn btn-outline" data-i18n="openLink">Apri Link</button>
          </div>
        </div>
      </div>
    `;
  }

  initCivitatisPage() {
    // Homepage links
    const civHomepageLinks = {
      it: "https://www.civitatis.com/it/?aid=5488",
      es: "https://www.civitatis.com/es/?aid=5488",
      en: "https://www.civitatis.com/en/?aid=5488",
      fr: "https://www.civitatis.com/fr/?aid=5488"
    };

    const langSelect = document.getElementById('civLangSelect');
    const homepageLink = document.getElementById('civHomepageLink');

    // Initialize Custom Select dropdown
    if (langSelect) new CustomSelect(langSelect);

    const updateHomepageLink = () => {
      const url = civHomepageLinks[langSelect.value] || civHomepageLinks['en'];
      homepageLink.href = url;
      homepageLink.textContent = url;
    };

    langSelect.addEventListener('change', updateHomepageLink);
    updateHomepageLink();

    document.getElementById('civHomepageCopyBtn')?.addEventListener('click', async () => {
      const success = await linkGenerator.copyToClipboard(homepageLink.href);
      notifications[success ? 'success' : 'error'](i18n.t(success ? 'deepLinkCopied' : 'copyError'));
    });

    document.getElementById('civHomepageOpenBtn')?.addEventListener('click', () => {
      linkGenerator.openLink(homepageLink.href);
    });

    // URL Transformer
    const input = document.getElementById('civInput');
    const generateBtn = document.getElementById('civGenerateBtn');
    const resultContainer = document.getElementById('civResult');
    const resultLink = document.getElementById('civResultLink');

    generateBtn.addEventListener('click', () => {
      const url = input.value.trim();
      if (!url) { notifications.warning(i18n.t('validCivitatisURL')); return; }

      const result = linkGenerator.generateCivitatisLink(url);

      if (result.success) {
        resultLink.href = result.link;
        resultLink.textContent = result.link;
        resultContainer.style.display = 'block';
        notifications.success(i18n.t('deepLinkGenerated'));
      } else {
        notifications.error(i18n.t(result.error));
      }
    });

    document.getElementById('civCopyBtn')?.addEventListener('click', async () => {
      const success = await linkGenerator.copyToClipboard(resultLink.href);
      notifications[success ? 'success' : 'error'](i18n.t(success ? 'deepLinkCopied' : 'copyError'));
    });

    document.getElementById('civOpenBtn')?.addEventListener('click', () => {
      linkGenerator.openLink(resultLink.href);
    });
  }

  // ============================================
  // CAR RENTAL PAGE
  // ============================================

  renderCarRentalPage() {
    return `
      <div class="page-header">
        <h2 data-i18n="carRentalHeader">Noleggio Auto a Minorca</h2>
      </div>

      <div id="page-status" class="page-status"></div>

      <div class="card">
        <div class="form-group">
          <label class="form-label" data-i18n="selectProvider">Seleziona Noleggio</label>
          <select id="carProviderSelect" class="form-select">
            ${CAR_RENTAL_PROVIDERS.map((p, i) => `<option value="${i}">${p.name}</option>`).join('')}
          </select>
        </div>

        <div id="carLinkContainer" class="result-container mt-6">
          <label class="form-label" data-i18n="affiliateLink">Link Affiliato</label>
          <div class="result-box">
            <a id="carResultLink" href="#" target="_blank" class="result-link"></a>
          </div>
          <div class="integrated-actions mt-4">
            <select id="carLangSelect" class="form-select form-select-sm">
              <option value="it">🇮🇹 IT</option>
              <option value="es">🇪🇸 ES</option>
              <option value="en">🇬🇧 EN</option>
              <option value="fr">🇫🇷 FR</option>
              <option value="de">🇩🇪 DE</option>
            </select>
            <div class="button-group">
              <button id="carCopyBtn" class="btn btn-success" data-i18n="copyLink">Copia Link</button>
              <button id="carOpenBtn" class="btn btn-outline" data-i18n="openLink">Apri Link</button>
            </div>
          </div>
        </div>

        <p class="note text-muted" style="margin-top: 16px; font-style: italic;" data-i18n="carRentalNotice">I link puntano alle homepage delle rispettive piattaforme di noleggio auto.</p>
      </div>
    `;
  }

  initCarRentalPage() {
    const providerSelect = document.getElementById('carProviderSelect');
    const langSelect = document.getElementById('carLangSelect');
    const resultLink = document.getElementById('carResultLink');

    // Initialize Custom Select dropdowns
    if (providerSelect) new CustomSelect(providerSelect);
    if (langSelect) new CustomSelect(langSelect);

    const updateLink = () => {
      const provider = CAR_RENTAL_PROVIDERS[providerSelect.value];
      const lang = langSelect.value;
      // Fallback to 'en' if language not available for this provider
      const url = provider.urls[lang] || provider.urls['en'] || Object.values(provider.urls)[0];
      resultLink.href = url;
      resultLink.textContent = url;
    };

    providerSelect.addEventListener('change', updateLink);
    langSelect.addEventListener('change', updateLink);
    updateLink(); // Initial load

    document.getElementById('carCopyBtn')?.addEventListener('click', async () => {
      const success = await linkGenerator.copyToClipboard(resultLink.href);
      notifications[success ? 'success' : 'error'](i18n.t(success ? 'deepLinkCopied' : 'copyError'));
    });

    document.getElementById('carOpenBtn')?.addEventListener('click', () => {
      linkGenerator.openLink(resultLink.href);
    });
  }

  // ============================================
  // IMAGE TOOL PAGE - MODERN COMPRESSOR
  // ============================================

  renderImageToolPage() {
    return `
      <div class="page-header">
        <h2 data-i18n="imageToolHeader">Compressore di Immagini</h2>
      </div>

      <div id="page-status" class="page-status"></div>

      <div class="card">
        <div id="dropZone" class="drop-zone">
          <div class="drop-zone-content">
            <span class="drop-zone-icon">📷</span>
            <p data-i18n="dropZoneText">Trascina qui le immagini o clicca per selezionarle</p>
            <input type="file" id="imageInput" multiple accept="image/*" style="display:none;">
          </div>
          <div id="dropZoneProgress" class="drop-zone-progress" style="display:none;">
            <div class="progress-bar"><div class="progress-bar-fill"></div></div>
            <span class="progress-text">0%</span>
          </div>
        </div>

        <div class="image-controls">
          <div class="form-group image-controls__quality">
            <label class="form-label" data-i18n="compressionQuality">Qualità Compressione</label>
            <div class="slider-container">
              <input type="range" id="qualitySlider" min="10" max="95" value="75" class="slider">
              <span id="qualityValue" class="slider-value">75%</span>
            </div>
            <p class="text-muted text-sm" data-i18n="qualityHint">Valori più bassi = file più piccoli, qualità ridotta</p>
          </div>

          <div class="form-group image-controls__format">
            <label class="form-label" data-i18n="outputFormat">Formato Output</label>
            <select id="formatSelect" class="form-select">
              <option value="image/jpeg" data-i18n="formatJpeg">JPEG (consigliato)</option>
              <option value="image/webp" data-i18n="formatWebp">WebP (moderno)</option>
              <option value="image/png" data-i18n="formatPng">PNG (lossless)</option>
            </select>
          </div>
        </div>

        <p class="note text-muted" style="font-style: italic;" data-i18n="imageToolNotice">La compressione avviene localmente nel browser. Le immagini non vengono caricate su nessun server.</p>
      </div>

      <div id="imagesContainer" class="images-grid mt-6"></div>

      <div id="downloadAllContainer" class="card mt-6" style="display:none;">
        <div class="flex-between">
          <div>
            <span id="totalStats" class="text-muted"></span>
          </div>
          <div class="button-group">
            <button id="clearAllBtn" class="btn btn-outline" data-i18n="clearAll">Cancella Tutto</button>
            <button id="downloadAllBtn" class="btn btn-success" data-i18n="downloadAll">Scarica Tutto (ZIP)</button>
          </div>
        </div>
      </div>
    `;
  }

  initImageToolPage() {
    const dropZone = document.getElementById('dropZone');
    const imageInput = document.getElementById('imageInput');
    const qualitySlider = document.getElementById('qualitySlider');
    const qualityValue = document.getElementById('qualityValue');
    const formatSelect = document.getElementById('formatSelect');
    const imagesContainer = document.getElementById('imagesContainer');
    const downloadAllContainer = document.getElementById('downloadAllContainer');

    // Initialize Custom Select dropdown
    if (formatSelect) new CustomSelect(formatSelect);

    // Store compressed images for batch download
    this.compressedImages = [];

    // Quality slider
    qualitySlider.addEventListener('input', () => {
      qualityValue.textContent = `${qualitySlider.value}%`;
    });

    // Click to upload
    dropZone.addEventListener('click', () => imageInput.click());

    // Drag & Drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
      dropZone.addEventListener(event, (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    dropZone.addEventListener('dragenter', () => dropZone.classList.add('drag-over'));
    dropZone.addEventListener('dragover', () => dropZone.classList.add('drag-over'));
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', (e) => {
      dropZone.classList.remove('drag-over');
      const files = e.dataTransfer.files;
      this.processImages(files);
    });

    // File input change
    imageInput.addEventListener('change', () => {
      this.processImages(imageInput.files);
    });

    // Clear all
    document.getElementById('clearAllBtn')?.addEventListener('click', () => {
      this.compressedImages = [];
      imagesContainer.innerHTML = '';
      downloadAllContainer.style.display = 'none';
    });

    // Download all as ZIP
    document.getElementById('downloadAllBtn')?.addEventListener('click', async () => {
      if (this.compressedImages.length === 0) return;
      await this.downloadAllAsZip();
    });
  }

  async processImages(files) {
    const quality = document.getElementById('qualitySlider').value / 100;
    const format = document.getElementById('formatSelect').value;
    const imagesContainer = document.getElementById('imagesContainer');
    const downloadAllContainer = document.getElementById('downloadAllContainer');

    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;

      try {
        const result = await this.compressImage(file, quality, format);
        this.compressedImages.push(result);
        this.renderImageCard(result, imagesContainer);
        this.updateTotalStats();
        downloadAllContainer.style.display = 'block';
      } catch (error) {
        console.error('Compression error:', error);
        notifications.error(`Errore: ${file.name}`);
      }
    }
  }

  compressImage(file, quality, format) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Create canvas
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          // Compress
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Compression failed'));
              return;
            }

            const extension = format === 'image/webp' ? 'webp' : format === 'image/png' ? 'png' : 'jpg';
            const originalName = file.name.replace(/\.[^/.]+$/, '');

            resolve({
              originalName: file.name,
              compressedName: `${originalName}_compressed.${extension}`,
              originalSize: file.size,
              compressedSize: blob.size,
              reduction: ((1 - blob.size / file.size) * 100).toFixed(1),
              blob: blob,
              url: URL.createObjectURL(blob)
            });
          }, format, quality);
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  renderImageCard(result, container) {
    const card = document.createElement('div');
    card.className = 'image-card';

    const formatSize = (bytes) => {
      if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
      return `${(bytes / 1024).toFixed(1)} KB`;
    };

    const reductionClass = parseFloat(result.reduction) > 50 ? 'text-success' :
      parseFloat(result.reduction) > 20 ? 'text-warning' : 'text-muted';

    card.innerHTML = `
      <img src="${result.url}" alt="${result.originalName}" class="image-preview">
      <div class="image-info">
        <span class="image-name">${this.escapeHtml(result.originalName)}</span>
        <div class="image-stats">
          <span>${formatSize(result.originalSize)} → ${formatSize(result.compressedSize)}</span>
          <span class="${reductionClass}">-${result.reduction}%</span>
        </div>
      </div>
      <div class="image-actions">
        <button class="btn btn-sm btn-primary download-btn">${i18n.t('download')}</button>
        <button class="btn btn-sm btn-outline remove-btn">✕</button>
      </div>
    `;

    // Download single
    card.querySelector('.download-btn').addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = result.url;
      a.download = result.compressedName;
      a.click();
    });

    // Remove
    card.querySelector('.remove-btn').addEventListener('click', () => {
      const index = this.compressedImages.findIndex(i => i.url === result.url);
      if (index > -1) {
        URL.revokeObjectURL(result.url);
        this.compressedImages.splice(index, 1);
        card.remove();
        this.updateTotalStats();
        if (this.compressedImages.length === 0) {
          document.getElementById('downloadAllContainer').style.display = 'none';
        }
      }
    });

    container.appendChild(card);
  }

  updateTotalStats() {
    const totalStats = document.getElementById('totalStats');
    if (!totalStats || this.compressedImages.length === 0) return;

    const totalOriginal = this.compressedImages.reduce((sum, img) => sum + img.originalSize, 0);
    const totalCompressed = this.compressedImages.reduce((sum, img) => sum + img.compressedSize, 0);
    const totalReduction = ((1 - totalCompressed / totalOriginal) * 100).toFixed(1);

    const formatSize = (bytes) => {
      if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
      return `${(bytes / 1024).toFixed(1)} KB`;
    };

    totalStats.textContent = `${this.compressedImages.length} ${i18n.t('images')} • ${formatSize(totalOriginal)} → ${formatSize(totalCompressed)} (-${totalReduction}%)`;
  }

  async downloadAllAsZip() {
    // Dynamic import for JSZip (only when needed)
    if (!window.JSZip) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
      document.head.appendChild(script);
      await new Promise(resolve => script.onload = resolve);
    }

    const zip = new JSZip();

    for (const img of this.compressedImages) {
      zip.file(img.compressedName, img.blob);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = 'compressed_images.zip';
    a.click();
    URL.revokeObjectURL(a.href);

    notifications.success(i18n.t('downloadStarted'));
  }

  // ============================================
  // FEEDBACK PAGE
  // ============================================

  renderFeedbackPage() {
    return `
      <div class="page-header">
        <h2 data-i18n="feedbackHeader">💡 Segnalazioni e Suggerimenti</h2>
      </div>

      <div id="page-status" class="page-status"></div>

      <div class="card feedback-card">
        <form id="feedbackForm" name="contact" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="contact">
          
          <div class="form-group">
            <label class="form-label" data-i18n="yourName">Nome</label>
            <input type="text" id="feedbackName" name="name" class="form-control" required>
          </div>

          <div class="form-group">
            <label class="form-label" data-i18n="yourEmail">Email</label>
            <input type="email" id="feedbackEmail" name="email" class="form-control" required>
          </div>

          <div class="form-group">
            <label class="form-label" data-i18n="platform">Piattaforma</label>
            <select id="feedbackPlatform" name="platform" class="form-select" required>
              <option value="booking">Booking</option>
              <option value="tradedoubler">Tradedoubler</option>
              <option value="getyourguide">GetYourGuide</option>
              <option value="civitatis">Civitatis</option>
              <option value="carrental" data-i18n="carRentalNav">Noleggio Auto</option>
              <option value="imgtool" data-i18n="imageToolNav">Immagini</option>
              <option value="other" data-i18n="other">Altro</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" data-i18n="message">Messaggio</label>
            <textarea id="feedbackMessage" name="message" class="form-control form-textarea" rows="6" required></textarea>
          </div>

          <div class="button-group">
            <button type="submit" class="btn btn-primary btn-lg" data-i18n="send">Invia</button>
          </div>
        </form>

        <div id="feedbackSuccess" class="feedback-success" style="display:none;">
          <div class="success-icon">✅</div>
          <h3 data-i18n="thankYou">Grazie!</h3>
          <p data-i18n="messageReceived">Il tuo messaggio è stato ricevuto. Ti risponderemo al più presto.</p>
          <button id="newFeedbackBtn" class="btn btn-outline mt-4" data-i18n="sendAnother">Invia un altro</button>
        </div>
      </div>
    `;
  }

  initFeedbackPage() {
    const form = document.getElementById('feedbackForm');
    const successMessage = document.getElementById('feedbackSuccess');
    const platformSelect = document.getElementById('feedbackPlatform');
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mjgggwek';

    // Initialize Custom Select dropdown
    if (platformSelect) new CustomSelect(platformSelect);

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.style.display = 'none';
          successMessage.style.display = 'block';
          notifications.success(i18n.t('messageSent'));
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error('Form error:', error);
        notifications.error(i18n.t('sendError'));
      }
    });

    document.getElementById('newFeedbackBtn')?.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      successMessage.style.display = 'none';
    });
  }
}

// Start the app
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
