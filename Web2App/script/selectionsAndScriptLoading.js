document.addEventListener('DOMContentLoaded', function () {
    const languageSelect = document.getElementById('languageSelect');
    const pageTypeSelect = document.getElementById('pageTypeSelect');
    const searchInput = document.getElementById('bookingSearchInput');
    const pageSubTypeRadioGroup = document.getElementById('pageSubTypeRadioGroup'); 
    const resultsContainer = document.getElementById('bookingSearchResults'); 

    function togglePageSubTypeVisibility() {

        function resetStyles() {
            pageSubTypeRadioGroup.style.cssText = '';
            searchInput.style.cssText = '';
            languageSelect.style.cssText = '';
            pageTypeSelect.style.cssText = '';
        }

        if (pageTypeSelect.value === 'genericLandingPages') {
            pageSubTypeRadioGroup.style.height = '0';
            pageSubTypeRadioGroup.style.overflow = 'hidden';
            searchInput.style.display = 'none';
            languageSelect.style.display = 'none';
            pageTypeSelect.style.width = '80%';
            pageTypeSelect.style.margin = '0 auto';
            pageTypeSelect.style.display = 'block';

        } else if (pageTypeSelect.value === 'hotelPage') {
            resetStyles();
            pageSubTypeRadioGroup.style.height = '0';
            pageSubTypeRadioGroup.style.overflow = 'hidden';
            searchInput.style.display = '';

        } else {
            resetStyles();
            pageSubTypeRadioGroup.style.height = '';
            pageSubTypeRadioGroup.style.overflow = '';
            searchInput.style.display = '';
        }
    }    

    function loadScriptBasedOnSelection() {
        const language = languageSelect.value;
        const pageType = pageTypeSelect.value;
        const pageSubTypeRadio = document.querySelector('input[name="pageSubType"]:checked');

        if (pageType === 'genericLandingPages') {
            showGenericLandingPages();
            togglePageSubTypeVisibility();
            return;
        }

        let scriptUrl = 'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/';

        if (pageType === 'districtPage') {
            scriptUrl += pageSubTypeRadio && pageSubTypeRadio.value === 'landingPage' ? `district_landing_page_links_${language}.js` : `district_page_links_${language}.js`;
        } else if (pageType === 'airportPage') {
            scriptUrl += pageSubTypeRadio && pageSubTypeRadio.value === 'landingPage' ? `airport_landing_page_links_${language}.js` : `airport_page_links_${language}.js`;
        } else if (pageType === 'hotelPage') {
            scriptUrl += `hotel_page_links_${language}.js`;
        } else if (pageType === 'cityPage') {
            scriptUrl += pageSubTypeRadio && pageSubTypeRadio.value === 'landingPage' ? `city_landing_page_links_${language}.js` : `city_page_links_${language}.js`;
        } else if (pageType === 'islandPage') {
            scriptUrl += pageSubTypeRadio && pageSubTypeRadio.value === 'landingPage' ? `island_landing_page_links_${language}.js` : `island_page_links_${language}.js`;
        } else if (pageType === 'landmarkPage') {
            scriptUrl += pageSubTypeRadio && pageSubTypeRadio.value === 'landingPage' ? `landmark_landing_page_links_${language}.js` : `landmark_page_links_${language}.js`;
        } else if (pageType === 'regionPage') {
            scriptUrl += pageSubTypeRadio && pageSubTypeRadio.value === 'landingPage' ? `region_landing_page_links_${language}.js` : `region_page_links_${language}.js`;
        } else {
            console.error("Unsupported page type or sub type selection.");
            return;
        }

        loadScript(scriptUrl);
        togglePageSubTypeVisibility();
    }

    function loadScript(url) {
        if (!document.querySelector(`script[src="${url}"]`)) {
            const script = document.createElement('script');
            script.src = url;
            script.className = 'dynamic-link-script';
            document.body.appendChild(script);
            script.onload = () => {
                console.log(`Script ${url} caricato correttamente.`);
                if (typeof updateLinks === "function") {
                    updateLinks();
                }
                // Aggiungi condizione per mostrare il messaggio solo per gli hotels
                if (url.includes('hotel_page_links')) {
                    mostraMessaggioGlobalmente('HotelsLoaded');
                }
            };
        } else {
            console.log(`Script ${url} già presente. Caricamento evitato.`);
            if (typeof updateLinks === "function") {
                updateLinks();
            }
        }
    }
    

    document.querySelectorAll('.flag-icon').forEach(function(flag) {
        flag.addEventListener('click', function() {
            const selectedLanguage = this.id.split('-')[1];
            showGenericLandingPages(selectedLanguage);
            loadScriptBasedOnSelection();
        });
    });

    const translations = {
        'en': {
            'homePage': 'Home page →',
            'apartmentsPage': 'Apartment results page →',
            'resortsPage': 'Resort results page →',
            'villasPage': 'Villa results page →',
            'bedAndBreakfastPage': 'Bed & breakfast results page →',
            'guestHousePage': 'Guest house results page →',
        },
        'es': {
            'homePage': 'Página principal →',
            'apartmentsPage': 'Página de resultados de apartamentos →',
            'resortsPage': 'Página de resultados de resorts →',
            'villasPage': 'Página de resultados de villas →',
            'bedAndBreakfastPage': 'Página de resultados de bed & breakfast →',
            'guestHousePage': 'Página de resultados de casas de huéspedes →',
        },
        'it': {
            'homePage': 'Pagina principale →',
            'apartmentsPage': 'Pagina dei risultati per appartamenti →',
            'resortsPage': 'Pagina dei risultati per resort →',
            'villasPage': 'Pagina dei risultati per ville →',
            'bedAndBreakfastPage': 'Pagina dei risultati per bed & breakfast →',
            'guestHousePage': 'Pagina dei risultati per affittacamere →',
        },
        'fr': {
            'homePage': 'Page d’accueil →',
            'apartmentsPage': 'Page des résultats pour appartements →',
            'resortsPage': 'Page des résultats pour resorts →',
            'villasPage': 'Page des résultats pour villas →',
            'bedAndBreakfastPage': 'Page des résultats pour chambres d’hôtes →',
            'guestHousePage': 'Page des résultats pour maisons d’hôtes →',
        }
    };

    function showGenericLandingPages(selectedLanguage) {
        const lang = selectedLanguage || languageSelect.value; // Usa la lingua cliccata se fornita, altrimenti quella del selettore
        const t = translations[lang] || translations['it'];

        resultsContainer.innerHTML = `
            <div class="landing-page-link">${t.homePage} <a href="https://www.booking.com/index.html?aid=955564" target="_blank" class="landing-page-url">https://www.booking.com/index.html?aid=955564</a></div>
            <div class="landing-page-link">${t.apartmentsPage} <a href="https://www.booking.com/apartments/index.html?aid=955564" target="_blank" class="landing-page-url">https://www.booking.com/apartments/index.html?aid=955564</a></div>
            <div class="landing-page-link">${t.resortsPage} <a href="https://www.booking.com/resorts/index.html?aid=955564" target="_blank" class="landing-page-url">https://www.booking.com/resorts/index.html?aid=955564</a></div>
            <div class="landing-page-link">${t.villasPage} <a href="https://www.booking.com/villas/index.html?aid=955564" target="_blank" class="landing-page-url">https://www.booking.com/villas/index.html?aid=955564</a></div>
            <div class="landing-page-link">${t.bedAndBreakfastPage} <a href="https://www.booking.com/bed-and-breakfast/index.html?aid=955564" target="_blank" class="landing-page-url">https://www.booking.com/bed-and-breakfast/index.html?aid=955564</a></div>
            <div class="landing-page-link">${t.guestHousePage} <a href="https://www.booking.com/guest-house/index.html?aid=955564" target="_blank" class="landing-page-url">https://www.booking.com/guest-house/index.html?aid=955564</a></div>
        `;
        resultsContainer.style.display = 'block';
    }

    const initialLang = localStorage.getItem('selectedLanguage') || 'it'; // Prendi la lingua salvata o usa 'en' come default
    languageSelect.value = initialLang; // Imposta il valore del selettore di lingue all'avvio
    showGenericLandingPages(initialLang);

    languageSelect.addEventListener('change', loadScriptBasedOnSelection);
    pageTypeSelect.addEventListener('change', loadScriptBasedOnSelection);
    searchInput.addEventListener('input', () => {
        if (typeof updateLinks === "function") {
            updateLinks(); // Aggiorna i link in base al termine di ricerca
        }
    });

    document.querySelectorAll('input[name="pageSubType"]').forEach(radio => {
        radio.addEventListener('change', loadScriptBasedOnSelection);
    });

    loadScriptBasedOnSelection();
});
