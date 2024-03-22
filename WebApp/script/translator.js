document.addEventListener('DOMContentLoaded', function() {
    var translations = {
        'it': {
            'dropAreaText': 'Trascina qui le immagini o clicca per selezionarle',
            'headerTitle': 'Compressore di Immagini',
            'carRental': 'Noleggio Auto',
            'searchHeader': 'Cerca il Deep Link di Booking (Spagna e Isole)',
            'inputPlaceholder': 'Inserisci il termine di ricerca...',
            'searchNotice': 'È normale che la ricerca richieda alcuni secondi per elaborare un grande numero di strutture. In Spagna, ad esempio, ci sono 206.775 strutture.',
            'searchCNotice': 'I link puntano alle homepage delle rispettive piattaforme di noleggio auto.',
            'searchCiNotice': 'I link puntano alla homepage di Civitatis.',
            'searchGNotice': 'I link puntano alla homepage di GetYourGuide.',
            'searchINotice': 'Questo metodo assegna un fattore di compressione alle immagini basandosi sulla loro dimensione: più grande è l\'immagine, maggiore sarà la compressione applicata per ottimizzare lo spazio di archiviazione.',
            'searchTNotice': 'Sono Link di tracciamento standard e puntano alla Homepage delle varie piattaforme.',
            'usefulLinksHeader': 'Deep Link per il Noleggio Auto a Minorca',
            'copyLink': 'Copia link',
            'open': 'Apri',
            'airportPage': 'Pagina Aeroporto',
            'cityPage': 'Pagina Città',
            'districtPage': 'Pagina Quartiere',
            'genericLandingPages': 'Pagina dei risultati generica',
            'hotelPage': 'Pagina Hotel',
            'islandPage': 'Pagina Isola',
            'landmarkPage': 'Pagina Luogo di Interesse',
            'regionPage': 'Pagina Regione',
            'generateDeepLink': 'Genera Deep Link di GetYourGuide',
            'generateCDeepLink': 'Genera Deep Link di Civitatis',
            'insertGetYourGuideLink': 'Inserisci il link di GetYourGuide qui',
            'GetYourGuideLink': 'Deep Link Homepage di GetYourGuide',
            'CivitatisLink': 'Deep Link Homepage di Civitatis',
            'insertCivitatisLink': 'Inserisci il link di Civitatis qui',
            'generateLinkButton': 'Genera Link',
            'copyTransformedLink': 'Copia Link',
            'openTransformedLink': 'Apri Link',
            'searchResultsPageLabel': 'Pagina dei Risultati di Ricerca',
            'landingPageLabel': 'Landing Page',
            'tooltip_searchResultsPage': 'Una pagina dei Risultati di Ricerca mostra un elenco di sistemazioni nella città, nella regione o nella nazione che hai specificato.',
            'tooltip_landingPage': 'Una Landing Page fornisce informazioni sulla città, sulla regione o sul Paese a cui vuoi che i tuoi lettori arrivino tramite link.',
            'activePrograms': 'I Programmi Attivi',
            'sitesLabel': 'Siti',
            'selectSiteOption': 'Seleziona un sito'
        },
        'es': {
            'dropAreaText': 'Arrastra las imágenes aquí o haz clic para seleccionarlas',
            'headerTitle': 'Compresor de Imágenes',
            'carRental': 'Alquiler de Coches',
            'searchHeader': 'Busca tu Deep Link de Booking (España y Islas)',
            'inputPlaceholder': 'Introduce el término de búsqueda...',
            'searchNotice': 'Es normal que la búsqueda tarde unos segundos en procesar un gran número de estructuras. En España, por ejemplo, hay 206.775 estructuras.',
            'searchCNotice': 'Los enlaces conducen a las páginas de inicio de las respectivas plataformas de alquiler de coches.',
            'searchCiNotice': 'Los enlaces apuntan a la página de inicio de Civitatis.',
            'searchGNotice': 'Los enlaces apuntan a la página de inicio de GetYourGuide.',
            'searchINotice': 'Este método asigna un factor de compresión a las imágenes basado en su tamaño: cuanto mayor es la imagen, mayor es la compresión aplicada para optimizar el espacio de almacenamiento.',
            'searchTNotice': 'Son enlaces de seguimiento estándar y apuntan a la página de inicio de las diversas plataformas.',
            'usefulLinksHeader': 'Deep Link para Alquiler de Coches en Menorca',
            'copyLink': 'Copiar enlace',
            'open': 'Abrir',
            'airportPage': 'Página del Aeropuerto',
            'cityPage': 'Página de la Ciudad',
            'districtPage': 'Página del Distrito',
            'genericLandingPages': 'Página de Resultados Generales',
            'hotelPage': 'Página del Hotel',
            'islandPage': 'Página de la Isla',
            'landmarkPage': 'Página de Punto de Interés',
            'regionPage': 'Página de la Región',
            'generateDeepLink': 'Generar Deep Link de GetYourGuide',
            'generateCDeepLink': 'Generar Deep Link de Civitatis',
            'insertGetYourGuideLink': 'Inserta tu enlace de GetYourGuide aquí',
            'GetYourGuideLink': 'Deep Link Página Principal de GetYourGuide',
            'CivitatisLink': 'Deep Link Página Principal de Civitatis',
            'insertCivitatisLink': 'Inserta tu enlace de Civitatis aquí',
            'generateLinkButton': 'Generar Enlace',
            'copyTransformedLink': 'Copiar Enlace',
            'openTransformedLink': 'Abrir Enlace',
            'searchResultsPageLabel': 'Página de Resultados de Búsqueda',
            'landingPageLabel': 'Página de Aterrizaje',
            'tooltip_searchResultsPage': 'Una página de Resultados de Búsqueda muestra una lista de alojamientos en la ciudad, región o país especificado.',
            'tooltip_landingPage': 'Una Landing Page proporciona información sobre la ciudad, región o país al que quieres que tus lectores lleguen a través de enlaces.',
            'activePrograms': 'Los Programas Activos',
            'sitesLabel': 'Sitios',
            'selectSiteOption': 'Selecciona un sitio'
        },
        'en': {
            'dropAreaText': 'Drag images here or click to select them',
            'headerTitle': 'Image Compressor',
            'carRental': 'Car Rental',
            'searchHeader': 'Search for your Booking Deep Link (Spain and Islands)',
            'inputPlaceholder': 'Enter search term...',
            'searchNotice': 'It\'s normal for the search to take a few seconds to process a large number of listings. In Spain, for example, there are 206,775 listings.',
            'searchCNotice': 'The links lead to the homepages of the respective car rental platforms.',
            'searchCiNotice': 'The links point to Civitatis homepage.',
            'searchGNotice': 'The links point to GetYourGuide homepage.',
            'searchINotice': 'This method assigns a compression factor to images based on their size: the larger the image, the greater the compression applied to optimize storage space.',
            'searchTNotice': 'They are standard tracking links and point to the homepage of the various platforms.',
            'usefulLinksHeader': 'Deep Links for Car Rental in Minorca',
            'copyLink': 'Copy link',
            'open': 'Open',
            'airportPage': 'Airport Page',
            'cityPage': 'City Page',
            'districtPage': 'District Page',
            'genericLandingPages': 'Generic Results Page',
            'hotelPage': 'Hotel Page',
            'islandPage': 'Island Page',
            'landmarkPage': 'Landmark Page',
            'regionPage': 'Region Page',
            'generateDeepLink': 'Generate Deep Link of GetYourGuide',
            'generateCDeepLink': 'Generate Deep Link of Civitatis',
            'insertGetYourGuideLink': 'Insert your GetYourGuide link here',
            'GetYourGuideLink': 'Deep Link GetYourGuide Homepage',
            'CivitatisLink': 'Deep Link Civitatis Homepage',
            'insertCivitatisLink': 'Insert your Civitatis link here',
            'generateLinkButton': 'Generate Link',
            'copyTransformedLink': 'Copy Link',
            'openTransformedLink': 'Open Link',
            'searchResultsPageLabel': 'Search Results Page',
            'landingPageLabel': 'Landing Page',
            'tooltip_searchResultsPage': 'A Search Results Page shows a list of accommodations in the specified city, region, or country.',
            'tooltip_landingPage': 'A Landing Page provides information about the city, region, or country you want your readers to reach through links.',
            'activePrograms': 'Active Programs',
            'sitesLabel': 'Sites',
            'selectSiteOption': 'Select a site'
        },
        'fr': {
            'dropAreaText': 'Glissez les images ici ou cliquez pour les sélectionner',
            'headerTitle': 'Compresseur d\'Images',
            'carRental': 'Location de Voitures',
            'searchHeader': 'Cherchez votre Deep Link de Booking (Espagne et Îles)',
            'inputPlaceholder': 'Entrez le terme de recherche...',
            'searchNotice': 'Il est normal que la recherche prenne quelques secondes pour traiter un grand nombre de structures. En Espagne, par exemple, il y a 206 775 structures.',
            'searchCNotice': 'Les liens mènent aux pages d\'accueil des plateformes de location de voitures respectives.',
            'searchCiNotice': 'Les liens pointent vers la page d\'accueil de Civitatis.',
            'searchGNotice': 'Les liens pointent vers la page d\'accueil de GetYourGuide.',
            'searchINotice': 'Cette méthode attribue un facteur de compression aux images en fonction de leur taille : plus l\'image est grande, plus la compression appliquée est importante pour optimiser l\'espace de stockage.',
            'searchTNotice': 'Ce sont des liens de suivi standard et ils pointent vers la page d\'accueil des différentes plateformes.',
            'usefulLinksHeader': 'Deep Link pour la Location de Voiture à Minorque',
            'copyLink': 'Copier le lien',
            'open': 'Ouvrir',
            'airportPage': 'Page de l’Aéroport',
            'cityPage': 'Page de la Ville',
            'districtPage': 'Page du District',
            'genericLandingPages': 'Page de Résultats Génériques',
            'hotelPage': 'Page de l’Hôtel',
            'islandPage': 'Page de l’Île',
            'landmarkPage': 'Page du Point d’Intérêt',
            'regionPage': 'Page de la Région',
            'generateDeepLink': 'Générer un Deep Link de GetYourGuide',
            'generateCDeepLink': 'Générer un Deep Link de Civitatis',
            'insertGetYourGuideLink': 'Insérez votre lien GetYourGuide ici',
            'GetYourGuideLink': 'Deep Link Page d\'Accueil de GetYourGuide',
            'CivitatisLink': 'Deep Link Page d\'Accueil de Civitatis',
            'insertCivitatisLink': 'Insérez votre lien Civitatis ici',
            'generateLinkButton': 'Générer le lien',
            'copyTransformedLink': 'Copier le Lien',
            'openTransformedLink': 'Ouvrir le Lien',
            'searchResultsPageLabel': 'Page des Résultats de Recherche',
            'landingPageLabel': 'Page d’Atterrissage',
            'tooltip_searchResultsPage': 'Une page de Résultats de Recherche montre une liste d\'hébergements dans la ville, la région ou le pays spécifié.',
            'tooltip_landingPage': 'Une Landing Page fournit des informations sur la ville, la région, ou le pays que vous souhaitez que vos lecteurs atteignent via des liens.',
            'activePrograms': 'Les Programmes Actifs',
            'sitesLabel': 'Sites',
            'selectSiteOption': 'Sélectionnez un site'
        }
    };

    function applyTranslations(selectedLanguage) {

        var dropAreaTextElement = document.querySelector('#drop-area p');
        if (dropAreaTextElement) {
            dropAreaTextElement.textContent = translations[selectedLanguage]['dropAreaText'];
        }
    
        var headerTitleElement = document.querySelector('header h1');
        if (headerTitleElement) {
            headerTitleElement.innerHTML = `<img src="https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/ico.svg" alt="Icona"> ${translations[selectedLanguage]['headerTitle']}`;
        }

        var usefulTLinksHeader = document.getElementById('usefulTLinksHeader');
        if (usefulTLinksHeader) {
            usefulTLinksHeader.textContent = translations[selectedLanguage]['activePrograms'];
        }
    
        var siteSelectLabel = document.querySelector('label[for="siteSelect"]');
        if (siteSelectLabel) {
            siteSelectLabel.textContent = translations[selectedLanguage]['sitesLabel'];
        }
    
        var selectSiteOption = document.querySelector('#siteSelect option[value="0"]');
        if (selectSiteOption) {
            selectSiteOption.textContent = translations[selectedLanguage]['selectSiteOption'];
        }
        
        var searchResultsPageLabel = document.querySelector('label[for="searchResultsPage"]');
        if (searchResultsPageLabel) {
            searchResultsPageLabel.textContent = translations[selectedLanguage]['searchResultsPageLabel'];
        }
    
        var landingPageLabel = document.querySelector('label[for="landingPage"]');
        if (landingPageLabel) {
            landingPageLabel.textContent = translations[selectedLanguage]['landingPageLabel'];
        }
        var carRentalLink = document.querySelector('.menu-items a[href="auto.html"]'); // Modifica il selettore in base alla struttura esatta del tuo HTML
        if(carRentalLink) {
            carRentalLink.textContent = translations[selectedLanguage]['carRental'];
        }
        
        var bookingHeader = document.getElementById('bookingHeader');
        if(bookingHeader) {
            bookingHeader.textContent = translations[selectedLanguage]['searchHeader'];
        }

        var bookingInput = document.getElementById('bookingSearchInput');
        if(bookingInput) {
            bookingInput.placeholder = translations[selectedLanguage]['inputPlaceholder'];
        }

        var usefulLinksHeader = document.getElementById('usefulLinksHeader');
        if(usefulLinksHeader) {
            usefulLinksHeader.textContent = translations[selectedLanguage]['usefulLinksHeader'];
        }

        var searchNotice = document.getElementById('searchNotice');
        if (searchNotice) {
            searchNotice.querySelector('.nota').textContent = translations[selectedLanguage]['searchNotice'];
        }

        var searchINotice = document.getElementById('searchINotice');
        if (searchINotice) {
            searchINotice.querySelector('.nota').textContent = translations[selectedLanguage]['searchINotice'];
        }

        var searchCNotice = document.getElementById('searchCNotice');
        if (searchCNotice) {
            searchCNotice.querySelector('.nota').textContent = translations[selectedLanguage]['searchCNotice'];
        }

        var searchCiNotice = document.getElementById('searchCiNotice');
        if (searchCiNotice) {
            searchCiNotice.querySelector('.nota').textContent = translations[selectedLanguage]['searchCiNotice'];
        }

        var searchGNotice = document.getElementById('searchGNotice');
        if (searchGNotice) {
            searchGNotice.querySelector('.nota').textContent = translations[selectedLanguage]['searchGNotice'];
        }

        var searchTNotice = document.getElementById('searchTNotice');
        if (searchTNotice) {
            searchTNotice.querySelector('.nota').textContent = translations[selectedLanguage]['searchTNotice'];
        }

        var copyButton = document.getElementById('copyButton');
        if(copyButton) {
            copyButton.textContent = translations[selectedLanguage]['copyLink'];
        }

        var openButton = document.getElementById('openButton');
        if(openButton) {
            openButton.textContent = translations[selectedLanguage]['open'];
        }

        var getyourguideGen = document.getElementById('getyourguide_gen');
        if(getyourguideGen) {
            getyourguideGen.textContent = translations[selectedLanguage]['generateDeepLink'];
        }

        var inputLink = document.getElementById('inputLink');
        if(inputLink) {
            inputLink.placeholder = translations[selectedLanguage]['insertGetYourGuideLink'];
        }

        var usefulGLinksHeader = document.getElementById('usefulGLinksHeader');
        if(usefulGLinksHeader) {
            usefulGLinksHeader.textContent = translations[selectedLanguage]['GetYourGuideLink'];
        }

        var inputLink = document.getElementById('inputCLink');
        if(inputLink) {
            inputLink.placeholder = translations[selectedLanguage]['insertCivitatisLink'];
        }

        var getyourguideGen = document.getElementById('civitatis_gen');
        if(getyourguideGen) {
            getyourguideGen.textContent = translations[selectedLanguage]['generateCDeepLink'];
        }

        var usefulCLinksHeader = document.getElementById('usefulCLinksHeader');
        if(usefulCLinksHeader) {
            usefulCLinksHeader.textContent = translations[selectedLanguage]['CivitatisLink'];
        }

        var transformButton = document.getElementById('transformButton');
        if(transformButton) {
            transformButton.textContent = translations[selectedLanguage]['generateLinkButton'];
        }

        var copyTransformedLink = document.getElementById('copyTransformedLink');
        if(copyTransformedLink) {
            copyTransformedLink.textContent = translations[selectedLanguage]['copyTransformedLink'];
        }

        var openTransformedLink = document.getElementById('openTransformedLink');
        if(openTransformedLink) {
            openTransformedLink.textContent = translations[selectedLanguage]['openTransformedLink'];
        }
        
        var elementsToUpdate = [
            {selector: '#bookingHeader', type: 'textContent', translationKey: 'searchHeader'},
            {selector: '#bookingSearchInput', type: 'placeholder', translationKey: 'inputPlaceholder'},
            {selector: '#usefulLinksHeader', type: 'textContent', translationKey: 'usefulLinksHeader'},
            {selector: '#searchNotice .nota', type: 'textContent', translationKey: 'searchNotice'},
            {selector: '#searchCNotice .nota', type: 'textContent', translationKey: 'searchCNotice'},
            {selector: '#searchCiNotice .nota', type: 'textContent', translationKey: 'searchCiNotice'},
            {selector: '#searchGNotice .nota', type: 'textContent', translationKey: 'searchGNotice'},
            {selector: '#searchTNotice .nota', type: 'textContent', translationKey: 'searchTNotice'},
            {selector: '#copyButton', type: 'textContent', translationKey: 'copyLink'},
            {selector: '#openButton', type: 'textContent', translationKey: 'open'},
            {selector: '#getyourguide_gen', type: 'textContent', translationKey: 'generateDeepLink'},
            {selector: '#inputLink', type: 'placeholder', translationKey: 'insertGetYourGuideLink'},
            {selector: '#usefulGLinksHeader', type: 'textContent', translationKey: 'GetYourGuideLink'},
            {selector: '#inputCLink', type: 'placeholder', translationKey: 'insertCivitatisLink'},
            {selector: '#civitatis_gen', type: 'textContent', translationKey: 'generateCDeepLink'},
            {selector: '#usefulCLinksHeader', type: 'textContent', translationKey: 'CivitatisLink'},
            {selector: '#transformButton', type: 'textContent', translationKey: 'generateLinkButton'},
            {selector: '#copyTransformedLink', type: 'textContent', translationKey: 'copyTransformedLink'},
            {selector: '#openTransformedLink', type: 'textContent', translationKey: 'openTransformedLink'}
        ];

        elementsToUpdate.forEach(function(item) {
            var element = document.querySelector(item.selector);
            if(element) {
                element[item.type] = translations[selectedLanguage][item.translationKey];
            }
        });

        // Traduzione per le opzioni del menu a tendina
        var select = document.getElementById('pageTypeSelect');
        if (select) {
            Array.from(select.options).forEach(function(option) {
                var key = option.value; // ad esempio 'airportPage'
                if (translations[selectedLanguage][key]) {
                    option.textContent = translations[selectedLanguage][key];
                }
            });
        }

        // Traduzione per i tooltip
        document.querySelectorAll('.tooltip').forEach(function(element) {
            var inputId = element.querySelector('input').id; // Ottiene l'id dell'input associato al tooltip
            var tooltipKey = 'tooltip_' + inputId; // Costruisce la chiave per la traduzione basata sull'id
            if (translations[selectedLanguage][tooltipKey]) {
                element.setAttribute('data-tooltip', translations[selectedLanguage][tooltipKey]);
            }
        });
    }

    // Verifica se una lingua è stata salvata nel Local Storage e applicala
    var savedLanguage = localStorage.getItem('selectedLanguage') || 'it'; // Default italiano se non specificato
    applyTranslations(savedLanguage);

    // Gestione del cambio di lingua tramite click su bandiere
    document.querySelectorAll('.flag-icon').forEach(function(flag) {
        flag.addEventListener('click', function() {
            var selectedLanguage = this.id.split('-')[1];
            localStorage.setItem('selectedLanguage', selectedLanguage);
            applyTranslations(selectedLanguage);
        });
    });
});