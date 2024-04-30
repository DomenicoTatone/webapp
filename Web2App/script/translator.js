document.addEventListener('DOMContentLoaded', function() {
    var translations = {
        'it': {
            'dropAreaText': 'Trascina qui le immagini o clicca per selezionarle',
            'headerTitle': 'Compressore di Immagini',
            'carRental': 'Noleggio Auto',
            'searchHeader': 'Cerca il Deep Link di Booking (Spagna e Isole)',
            'inputPlaceholder': 'Inserisci il termine di ricerca...',
            'searchNotice': 'Per favore, attendi il feedback prima di cercare l\'hotel desiderato. Potrebbe richiedere un paio di secondi per elaborare i 206.775 hotel in Spagna.',
            'searchCNotice': 'I link puntano alle homepage delle rispettive piattaforme di noleggio auto.',
            'searchCiNotice': 'I link puntano alla homepage di Civitatis.',
            'searchGNotice': 'I link puntano alla homepage di GetYourGuide.',
            'searchINotice': 'Questo metodo assegna un fattore di compressione alle immagini basandosi sulla loro dimensione: più grande è l\'immagine, maggiore sarà la compressione applicata per ottimizzare lo spazio di archiviazione.',
            'searchTNotice': 'Sono Link di tracciamento standard e puntano alla Homepage delle varie piattaforme.',
            'searchT2Notice': 'A differenza di Tradedoubler, abbiamo introdotto una verifica per prevenire errori umani. Guarda il video qui sotto per maggiori dettagli.',
            'videoDescriptionTitle': `L'ID del programma di Vueling è <span class="highlight">288053</span>, quindi l'URL generata è sbagliata.`,
            'expectedUrl': `<strong>URL attesa: </strong><span class="fake-link">https://clk.tradedoubler.com/click?p=<span class="highlight">288053</span>&a=3220593&url=https%3A%2F%2Fwww.vueling.com%2Fit</span>`,
            'generatedUrl': `<strong>URL generata: </strong><span class="fake-link">https://clk.tradedoubler.com/click?p=<span class="highlight">17269</span>&a=3220593&url=https%3A%2F%2Fwww.vueling.com%2Fit</span>`,
            'generateDeeplinkButton': 'Genera DeepLink',
            'reports': 'Segnalazioni',
            'backButton': 'Indietro',
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
            'platformLabel': 'Piattaforme',
            'selectPlatformOption': 'Seleziona una piattaforma',
            'sitesLabel': 'Siti',
            'selectSiteOption': 'Seleziona un sito',
            'reportsSuggestionsTitle': 'Segnalazioni e Suggerimenti',
            'nameLabel': 'Nome:',
            'emailLabel': 'Email:',
            'platformLabel': 'Piattaforma:',
            'messageLabel': 'Messaggio:',
            'sendButton': 'Invia',
            'otherOption': 'Altro',
            'noleggio_autoOption': 'Noleggio Auto',
            'enableButton': 'Attiva wp-login per i link',
            'disableButton': 'Disattiva wp-login per i link'
        },
        'es': {
            'dropAreaText': 'Arrastra las imágenes aquí o haz clic para seleccionarlas',
            'headerTitle': 'Compresor de Imágenes',
            'carRental': 'Alquiler de Coches',
            'searchHeader': 'Busca tu Deep Link de Booking (España y Islas)',
            'inputPlaceholder': 'Introduce el término de búsqueda...',
            'searchNotice': 'Por favor, espera el feedback antes de buscar el hotel deseado. Puede tardar unos segundos en procesar los 206.775 hoteles en España.',
            'searchCNotice': 'Los enlaces conducen a las páginas de inicio de las respectivas plataformas de alquiler de coches.',
            'searchCiNotice': 'Los enlaces apuntan a la página de inicio de Civitatis.',
            'searchGNotice': 'Los enlaces apuntan a la página de inicio de GetYourGuide.',
            'searchINotice': 'Este método asigna un factor de compresión a las imágenes basado en su tamaño: cuanto mayor es la imagen, mayor es la compresión aplicada para optimizar el espacio de almacenamiento.',
            'searchTNotice': 'Son enlaces de seguimiento estándar y apuntan a la página de inicio de las diversas plataformas.',
            'searchT2Notice': 'A diferencia de Tradedoubler, hemos implementado una verificación para prevenir errores humanos. Mira el video a continuación para más detalles.',
            'videoDescriptionTitle': `El ID del programa de Vueling es <span class="highlight">288053</span>, por lo que la URL generada es incorrecta.`,
            'expectedUrl': `<strong>URL esperada: </strong><span class="fake-link">https://clk.tradedoubler.com/click?p=<span class="highlight">288053</span>&a=3220593&url=https%3A%2F%2Fwww.vueling.com%2Fes</span>`,
            'generatedUrl': `<strong>URL generada: </strong><span class="fake-link">https://clk.tradedoubler.com/click?p=<span class="highlight">17269</span>&a=3220593&url=https%3A%2F%2Fwww.vueling.com%2Fes</span>`,
            'generateDeeplinkButton': 'Generar DeepLink',
            'reports': 'Notificaciones',
            'backButton': 'Atrás',      
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
            'platformLabel': 'Plataformas',
            'selectPlatformOption': 'Selecciona una plataforma',
            'sitesLabel': 'Sitios',
            'selectSiteOption': 'Selecciona un sitio',
            'reportsSuggestionsTitle': 'Notificaciones y Sugerencias',
            'nameLabel': 'Nombre:',
            'emailLabel': 'Correo electrónico:',
            'platformLabel': 'Plataforma:',
            'messageLabel': 'Mensaje:',
            'sendButton': 'Enviar',
            'otherOption': 'Otro',
            'noleggio_autoOption': 'Alquiler de Coches',
            'enableButton': 'Activar wp-login para los enlaces',
            'disableButton': 'Desactivar wp-login para los enlaces'
        },
        'en': {
            'dropAreaText': 'Drag images here or click to select them',
            'headerTitle': 'Image Compressor',
            'carRental': 'Car Rental',
            'searchHeader': 'Search for your Booking Deep Link (Spain and Islands)',
            'inputPlaceholder': 'Enter search term...',
            'searchNotice': 'Please wait for the feedback before searching for the desired hotel. It may take a few seconds to process the 206,775 hotels in Spain.',
            'searchCNotice': 'The links lead to the homepages of the respective car rental platforms.',
            'searchCiNotice': 'The links point to Civitatis homepage.',
            'searchGNotice': 'The links point to GetYourGuide homepage.',
            'searchINotice': 'This method assigns a compression factor to images based on their size: the larger the image, the greater the compression applied to optimize storage space.',
            'searchTNotice': 'They are standard tracking links and point to the homepage of the various platforms.',
            'searchT2Notice': '"Unlike Tradedoubler, we have implemented a check to prevent human errors. Watch the video below for more details.',
            'videoDescriptionTitle': `The program ID for Vueling is <span class="highlight">288053</span>, hence the generated URL is incorrect.`,
            'expectedUrl': `<strong>Expected URL: </strong><span class="fake-link">https://clk.tradedoubler.com/click?p=<span class="highlight">288053</span>&a=3220593&url=https%3A%2F%2Fwww.vueling.com%2Fen</span>`,
            'generatedUrl': `<strong>Generated URL: </strong><span class="fake-link">https://clk.tradedoubler.com/click?p=<span class="highlight">17269</span>&a=3220593&url=https%3A%2F%2Fwww.vueling.com%2Fen</span>`,
            'generateDeeplinkButton': 'Generate DeepLink',
            'reports': 'Reports',
            'backButton': 'Back',        
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
            'platformLabel': 'Platforms',
            'selectPlatformOption': 'Select a platform',
            'sitesLabel': 'Sites',
            'selectSiteOption': 'Select a site',
            'reportsSuggestionsTitle': 'Reports and Suggestions',
            'nameLabel': 'Name:',
            'emailLabel': 'Email:',
            'platformLabel': 'Platform:',
            'messageLabel': 'Message:',
            'sendButton': 'Send',
            'otherOption': 'Other',
            'noleggio_autoOption': 'Car Rental',
            'enableButton': 'Enable wp-login for links',
            'disableButton': 'Deactivate wp-login for links'
        },
        'fr': {
            'dropAreaText': 'Glissez les images ici ou cliquez pour les sélectionner',
            'headerTitle': 'Compresseur d\'Images',
            'carRental': 'Location de Voitures',
            'searchHeader': 'Cherchez votre Deep Link de Booking (Espagne et Îles)',
            'inputPlaceholder': 'Entrez le terme de recherche...',
            'searchNotice': 'Veuillez patienter avant de rechercher l\'hôtel désiré. Il peut prendre quelques secondes pour traiter les 206 775 hôtels en Espagne.',
            'searchCNotice': 'Les liens mènent aux pages d\'accueil des plateformes de location de voitures respectives.',
            'searchCiNotice': 'Les liens pointent vers la page d\'accueil de Civitatis.',
            'searchGNotice': 'Les liens pointent vers la page d\'accueil de GetYourGuide.',
            'searchINotice': 'Cette méthode attribue un facteur de compression aux images en fonction de leur taille : plus l\'image est grande, plus la compression appliquée est importante pour optimiser l\'espace de stockage.',
            'searchTNotice': 'Ce sont des liens de suivi standard et ils pointent vers la page d\'accueil des différentes plateformes.',
            'searchT2Notice': 'Contrairement à Tradedoubler, nous avons introduit une vérification pour éviter les erreurs humaines. Regardez la vidéo ci-dessous pour plus de détails.',
            'videoDescriptionTitle': `L'ID du programme Vueling est <span class="highlight">288053</span>, donc l'URL générée est incorrecte.`,
            'expectedUrl': `<strong>URL attendue: </strong><span class="fake-link">https://clk.tradedoubler.com/click?p=<span class="highlight">288053</span>&a=3220593&url=https%3A%2F%2Fwww.vueling.com%2Ffr</span>`,
            'generatedUrl': `<strong>URL générée: </strong><span class="fake-link">https://clk.tradedoubler.com/click?p=<span class="highlight">17269</span>&a=3220593&url=https%3A%2F%2Fwww.vueling.com%2Ffr</span>`,
            'generateDeeplinkButton': 'Générer DeepLink',
            'reports': 'Signalements',
            'backButton': 'Retour',           
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
            'platformLabel': 'Plateformes',
            'selectPlatformOption': 'Sélectionnez une plateforme',
            'sitesLabel': 'Sites',
            'selectSiteOption': 'Sélectionnez un site',
            'reportsSuggestionsTitle': 'Signalements et Suggestions',
            'nameLabel': 'Nom:',
            'emailLabel': 'Email:',
            'platformLabel': 'Plateforme:',
            'messageLabel': 'Message:',
            'sendButton': 'Envoyer',
            'otherOption': 'Autre',
            'noleggio_autoOption': 'Location de Voitures',
            'enableButton': 'Activer wp-login pour les liens',
            'disableButton': 'Désactiver wp-login pour les liens'
        }
    };

    function applyTranslations(selectedLanguage) {

        const toggleButton = document.getElementById('toggleLinkButton');
        let linksModified = localStorage.getItem('linksModified') === 'true';
    
        // Aggiorna il testo del pulsante in base allo stato e alla lingua
        toggleButton.textContent = linksModified ? translations[selectedLanguage]['disableButton'] : translations[selectedLanguage]['enableButton'];
        if (linksModified) {
            toggleButton.classList.add('active');
        } else {
            toggleButton.classList.remove('active');
        }
    
        toggleButton.addEventListener('click', function() {
            linksModified = !linksModified;
            localStorage.setItem('linksModified', linksModified);
            this.textContent = linksModified ? translations[selectedLanguage]['disableButton'] : translations[selectedLanguage]['enableButton'];
            this.classList.toggle('active', linksModified);
        });
    
        var reportsSuggestionsTitle = document.querySelector('#app > div > h1');
        if(reportsSuggestionsTitle) {
            reportsSuggestionsTitle.innerHTML = `<i class="fas fa-lightbulb"></i> ${translations[selectedLanguage]['reportsSuggestionsTitle']}`;
        }
    
        var nameLabel = document.querySelector('label[for="name"]');
        if(nameLabel) {
            nameLabel.textContent = translations[selectedLanguage]['nameLabel'];
        }
    
        var emailLabel = document.querySelector('label[for="email"]');
        if(emailLabel) {
            emailLabel.textContent = translations[selectedLanguage]['emailLabel'];
        }
    
        var platformLabel = document.querySelector('label[for="platform"]');
        if(platformLabel) {
            platformLabel.textContent = translations[selectedLanguage]['platformLabel'];
        }
    
        var messageLabel = document.querySelector('label[for="message"]');
        if(messageLabel) {
            messageLabel.textContent = translations[selectedLanguage]['messageLabel'];
        }
    
        var sendButton = document.querySelector('form[name="contact"] button[type="submit"]');
        if(sendButton) {
            sendButton.textContent = translations[selectedLanguage]['sendButton'];
        }

        var select = document.getElementById('platform');
        if (select) {
            Array.from(select.options).forEach(function(option) {
                var key = option.value + 'Option';
                if (translations[selectedLanguage][key]) {
                    option.textContent = translations[selectedLanguage][key];
                }
            });
        }

        var dropAreaTextElement = document.querySelector('#drop-area p');
        if (dropAreaTextElement) {
            dropAreaTextElement.textContent = translations[selectedLanguage]['dropAreaText'];
        }

        var reportsTextElement = document.getElementById('reportsText');
        if (reportsTextElement) {
            reportsTextElement.textContent = translations[selectedLanguage]['reports'];
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
    
        var siteSelectLabel = document.querySelector('label[for="siteSelect2"]');
        if (siteSelectLabel) {
            siteSelectLabel.textContent = translations[selectedLanguage]['sitesLabel'];
        }
    
        var selectSiteOption = document.querySelector('#siteSelect2 option[value="0"]');
        if (selectSiteOption) {
            selectSiteOption.textContent = translations[selectedLanguage]['selectSiteOption'];
        }
        
        var platformSelectLabel = document.querySelector('label[for="platformSelect"]');
        if (platformSelectLabel) {
            platformSelectLabel.textContent = translations[selectedLanguage]['platformLabel'];
        }

        var selectPlatformOption = document.querySelector('#platformSelect option[value=""]');
        if (selectPlatformOption) {
            selectPlatformOption.textContent = translations[selectedLanguage]['selectPlatformOption'];
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
            searchNotice.querySelector('.HotelsNote').textContent = translations[selectedLanguage]['searchNotice'];
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

        var searchT2Notice = document.getElementById('searchT2Notice');
        if (searchT2Notice) {
            searchT2Notice.querySelector('.nota').textContent = translations[selectedLanguage]['searchT2Notice'];
        }

        var videoDescriptionContainer = document.querySelector('.gif-description');
        if (videoDescriptionContainer) {
            videoDescriptionContainer.innerHTML = `
                <h5>${translations[selectedLanguage]['videoDescriptionTitle']}</h5>
                <p>${translations[selectedLanguage]['expectedUrl']}</p>
                <p>${translations[selectedLanguage]['generatedUrl']}</p>
            `;
        }        

        var generateDeeplinkButtonText = translations[selectedLanguage]['generateDeeplinkButton'];
        var backButtonText = translations[selectedLanguage]['backButton'];
    
        var generateDeeplinkButton = document.getElementById('generateDeeplinkButton');
        if (generateDeeplinkButton) {
            generateDeeplinkButton.textContent = generateDeeplinkButtonText;
        }
    
        var backButton = document.getElementById('backButton');
        if (backButton) {
            backButton.textContent = backButtonText;
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
            {selector: '#searchT2Notice .nota', type: 'textContent', translationKey: 'searchT2Notice'},
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