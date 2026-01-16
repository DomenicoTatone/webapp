/**
 * WebApp Modern - Main Application
 * Deep Link Generator with Browser Locale Auto-Detection
 */

import './styles/base.css';
import './styles/components.css';
import './styles/app.css';

import { i18n } from './services/I18nService.js';
import { linkGenerator } from './services/LinkGeneratorService.js';
import { notifications } from './services/NotificationService.js';
import { bookingData } from './services/BookingDataService.js';
import { AFFILIATE_PARTNERS, CAR_RENTAL_PROVIDERS } from './data/affiliates.js';

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
    const currentLang = i18n.getLanguage();
    document.querySelector(`[data-lang="${currentLang}"]`)?.classList.add('active');

    document.querySelectorAll('.language-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const lang = btn.dataset.lang;
        document.querySelectorAll('.language-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        await i18n.setLanguage(lang);
        // Clear booking cache when language changes
        bookingData.clearCache();
        this.bookingState.data = null;
        this.loadPage(this.currentPage);
        notifications.success(i18n.t('languageChanged'));
      });
    });
  }

  loadPage(pageName) {
    this.currentPage = pageName;
    const content = document.getElementById('page-content');

    document.querySelectorAll('[data-page]').forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageName);
    });

    const pages = {
      booking: () => { content.innerHTML = this.renderBookingPage(); this.initBookingPage(); },
      tradedoubler: () => { content.innerHTML = this.renderTradedoublerPage(); this.initTradedoublerPage(); },
      getyourguide: () => { content.innerHTML = this.renderGetYourGuidePage(); this.initGetYourGuidePage(); },
      civitatis: () => { content.innerHTML = this.renderCivitatisPage(); this.initCivitatisPage(); },
      carrental: () => { content.innerHTML = this.renderCarRentalPage(); this.initCarRentalPage(); }
    };

    (pages[pageName] || (() => { content.innerHTML = '<p>Page not found</p>'; }))();
    i18n.translatePage();
  }

  // ============================================
  // BOOKING PAGE - PRO REFACTORED
  // ============================================

  renderBookingPage() {
    return `
      <div class="page-header">
        <h2 data-i18n="bookingHeader">Cerca il Deep Link di Booking</h2>
      </div>
      
      <div class="card">
        <div class="form-group">
          <label class="form-label" data-i18n="pageType">Tipo Pagina</label>
          <select id="pageTypeSelect" class="form-select">
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

        <div class="form-group" id="subTypeGroup">
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" name="subType" value="searchResults" checked>
              <span data-i18n="searchResultsPageLabel">Pagina Risultati</span>
            </label>
            <label class="radio-label">
              <input type="radio" name="subType" value="landing">
              <span data-i18n="landingPageLabel">Landing Page</span>
            </label>
          </div>
        </div>

        <div class="form-group" id="searchGroup">
          <input type="text" id="searchInput" class="form-control" 
                 data-i18n-placeholder="searchPlaceholder" 
                 placeholder="Cerca...">
          <div id="searchHint" class="search-hint" data-i18n="searchMinChars">Digita almeno 3 caratteri per cercare</div>
        </div>
      </div>

      <!-- Loading State -->
      <div id="loadingState" class="card mt-6 loading-card" style="display:none;">
        <div class="loading-spinner"></div>
        <span data-i18n="loadingData">Caricamento dati...</span>
      </div>

      <!-- Error State -->
      <div id="errorState" class="card mt-6 error-card" style="display:none;">
        <div class="error-icon">⚠️</div>
        <p id="errorMessage" data-i18n="errorLoadingData">Errore nel caricamento</p>
        <button id="retryBtn" class="btn btn-primary" data-i18n="retryLoad">Riprova</button>
      </div>

      <!-- Results Container -->
      <div id="resultsCard" class="card mt-6" style="display:none;">
        <div class="results-header">
          <h3 class="card-title" id="resultsTitle"></h3>
          <span id="resultsCount" class="results-count"></span>
        </div>
        <div id="resultsContainer" class="results-list"></div>
      </div>

      <!-- Generic Landing Pages -->
      <div class="card mt-6" id="landingLinksCard" style="display:none;">
        <h3 class="card-title" data-i18n="genericLandingPages">Link Generici</h3>
        <div id="landingLinks" class="link-list"></div>
      </div>
    `;
  }

  async initBookingPage() {
    const pageTypeSelect = document.getElementById('pageTypeSelect');
    const subTypeGroup = document.getElementById('subTypeGroup');
    const searchGroup = document.getElementById('searchGroup');
    const searchInput = document.getElementById('searchInput');
    const landingLinksCard = document.getElementById('landingLinksCard');

    // Handle page type change
    const handlePageTypeChange = async () => {
      const pageType = pageTypeSelect.value;
      const isGeneric = pageType === 'genericLandingPages';
      const hasSubType = bookingData.hasSubType(pageType);

      // Update UI visibility
      subTypeGroup.style.display = hasSubType ? 'block' : 'none';
      searchGroup.style.display = isGeneric ? 'none' : 'block';
      landingLinksCard.style.display = isGeneric ? 'block' : 'none';
      document.getElementById('resultsCard').style.display = 'none';
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

    // Attach event listeners
    pageTypeSelect.addEventListener('change', handlePageTypeChange);
    searchInput.addEventListener('input', handleSearch);
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

    const language = i18n.getLanguage();
    const subTypeRadio = document.querySelector('input[name="subType"]:checked');
    const subType = subTypeRadio?.value === 'landing' ? 'landing' : null;

    // Show loading state
    this.setBookingUIState('loading');

    try {
      const data = await bookingData.loadData(pageType, language, subType);
      this.bookingState.data = data;
      this.bookingState.error = null;

      // Show ready state
      this.setBookingUIState('ready');
      notifications.success(i18n.t('dataLoaded'));

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
    const resultsCard = document.getElementById('resultsCard');
    const searchHint = document.getElementById('searchHint');

    loadingState.style.display = state === 'loading' ? 'flex' : 'none';
    errorState.style.display = state === 'error' ? 'flex' : 'none';
    resultsCard.style.display = 'none';

    if (searchHint) {
      searchHint.style.display = state === 'ready' ? 'block' : 'none';
    }
  }

  performSearch(query) {
    if (!this.bookingState.data) return;

    const resultsCard = document.getElementById('resultsCard');
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsCount = document.getElementById('resultsCount');
    const resultsTitle = document.getElementById('resultsTitle');
    const searchHint = document.getElementById('searchHint');

    if (!query || query.length < 3) {
      resultsCard.style.display = 'none';
      if (searchHint) searchHint.style.display = 'block';
      return;
    }

    if (searchHint) searchHint.style.display = 'none';

    const pageType = document.getElementById('pageTypeSelect').value;
    const results = bookingData.search(query, this.bookingState.data, 50);

    if (results.length === 0) {
      resultsCard.style.display = 'block';
      resultsTitle.textContent = '';
      resultsCount.textContent = '';
      resultsContainer.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">🔍</span>
          <p data-i18n="noResultsFound">${i18n.t('noResultsFound')}</p>
        </div>
      `;
      return;
    }

    // Render results
    resultsCard.style.display = 'block';
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

      <div class="card">
        <div class="form-group">
          <label class="form-label">Sito</label>
          <select id="islandSelect" class="form-select">
            <option value="" data-i18n="selectSite">Seleziona un sito</option>
            ${islands.map(i => `<option value="${i.code}">${i.displayName}</option>`).join('')}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Piattaforma</label>
          <select id="platformSelect" class="form-select" disabled>
            <option value="" data-i18n="selectPlatform">Seleziona una piattaforma</option>
          </select>
        </div>

        <div id="partnerLinkContainer" class="alert alert-info" style="display:none;">
          <span id="partnerLink"></span>
        </div>

        <hr class="divider">

        <h3 class="section-title" data-i18n="generateDeepLinkSection">Genera Deep Link</h3>
        
        <div class="form-group">
          <label class="form-label" data-i18n="urlToTransform">URL da trasformare</label>
          <input type="text" id="inputUrl" class="form-control" placeholder="https://...">
        </div>

        <div class="button-group">
          <button id="generateBtn" class="btn btn-primary" data-i18n="generateLink">Genera Link</button>
        </div>

        <div id="resultContainer" class="result-container" style="display:none;">
          <label class="form-label" data-i18n="generatedDeepLink">Deep Link Generato</label>
          <div class="result-box">
            <a id="resultLink" href="#" target="_blank" class="result-link"></a>
          </div>
          <div class="button-group mt-4">
            <button id="copyResultBtn" class="btn btn-success" data-i18n="copyLink">Copia Link</button>
            <button id="openResultBtn" class="btn btn-outline" data-i18n="openLink">Apri Link</button>
          </div>
        </div>
      </div>
    `;
  }

  initTradedoublerPage() {
    const islandSelect = document.getElementById('islandSelect');
    const platformSelect = document.getElementById('platformSelect');
    const partnerLinkContainer = document.getElementById('partnerLinkContainer');
    const partnerLink = document.getElementById('partnerLink');
    const generateBtn = document.getElementById('generateBtn');
    const inputUrl = document.getElementById('inputUrl');
    const resultContainer = document.getElementById('resultContainer');
    const resultLink = document.getElementById('resultLink');

    islandSelect.addEventListener('change', () => {
      const code = islandSelect.value;
      platformSelect.innerHTML = `<option value="">${i18n.t('selectPlatform')}</option>`;

      if (code) {
        (AFFILIATE_PARTNERS[code] || []).forEach(name => {
          platformSelect.appendChild(new Option(name, name));
        });
        platformSelect.disabled = false;
      } else {
        platformSelect.disabled = true;
      }

      partnerLinkContainer.style.display = 'none';
      resultContainer.style.display = 'none';
    });

    platformSelect.addEventListener('change', () => {
      const code = islandSelect.value;
      const partner = platformSelect.value;

      if (code && partner) {
        const baseLink = linkGenerator.getPartnerBaseLink(code, partner);
        if (baseLink) {
          partnerLink.innerHTML = `<a href="${baseLink}" target="_blank">${baseLink}</a>`;
          partnerLinkContainer.style.display = 'block';
        }
      } else {
        partnerLinkContainer.style.display = 'none';
      }
    });

    generateBtn.addEventListener('click', () => {
      const code = islandSelect.value;
      const partner = platformSelect.value;
      const url = inputUrl.value.trim();

      if (!code || !partner) { notifications.warning(i18n.t('selectSiteAndPlatform')); return; }
      if (!url) { notifications.warning(i18n.t('enterUrl')); return; }

      const result = linkGenerator.generateDeepLink(url, code, partner);

      if (result.success) {
        resultLink.href = result.link;
        resultLink.textContent = result.link;
        resultContainer.style.display = 'block';
        notifications.success(i18n.t('deepLinkGenerated'));
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

      <div class="card">
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

      <div class="card">
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

      <div class="card">
        <div class="form-group">
          <label class="form-label" data-i18n="selectProvider">Seleziona Noleggio</label>
          <select id="carProviderSelect" class="form-select">
            ${CAR_RENTAL_PROVIDERS.map((p, i) => `<option value="${i}">${p.name}</option>`).join('')}
          </select>
        </div>

        <div id="carLinkContainer" class="result-container">
          <label class="form-label" data-i18n="affiliateLink">Link Affiliato</label>
          <div class="result-box">
            <a id="carResultLink" href="#" target="_blank" class="result-link"></a>
          </div>
          <div class="button-group mt-4">
            <button id="carCopyBtn" class="btn btn-success" data-i18n="copyLink">Copia Link</button>
            <button id="carOpenBtn" class="btn btn-outline" data-i18n="openLink">Apri Link</button>
          </div>
        </div>

        <p class="note text-muted" style="margin-top: 16px; font-style: italic;" data-i18n="carRentalNotice">I link puntano alle homepage delle rispettive piattaforme di noleggio auto.</p>
      </div>
    `;
  }

  initCarRentalPage() {
    const providerSelect = document.getElementById('carProviderSelect');
    const resultLink = document.getElementById('carResultLink');

    const updateLink = () => {
      const provider = CAR_RENTAL_PROVIDERS[providerSelect.value];
      const lang = i18n.getLanguage();
      // Fallback to 'en' if language not available
      const url = provider.urls[lang] || provider.urls['en'] || Object.values(provider.urls)[0];
      resultLink.href = url;
      resultLink.textContent = url;
    };

    providerSelect.addEventListener('change', updateLink);
    updateLink(); // Initial load

    document.getElementById('carCopyBtn')?.addEventListener('click', async () => {
      const success = await linkGenerator.copyToClipboard(resultLink.href);
      notifications[success ? 'success' : 'error'](i18n.t(success ? 'deepLinkCopied' : 'copyError'));
    });

    document.getElementById('carOpenBtn')?.addEventListener('click', () => {
      linkGenerator.openLink(resultLink.href);
    });
  }
}

// Start the app
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
