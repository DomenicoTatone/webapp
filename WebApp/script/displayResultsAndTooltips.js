function rimuoviAccenti(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function updateLinks() {
    const input = document.getElementById('bookingSearchInput').value;
    const searchTerm = rimuoviAccenti(input).toLowerCase();
    const resultsContainer = document.getElementById('bookingSearchResults');
    resultsContainer.innerHTML = '';

    if (searchTerm.length < 3) {
        resultsContainer.style.display = 'none';
        return;
    }

    const language = document.getElementById('languageSelect').value.toUpperCase();
    const pageType = document.getElementById('pageTypeSelect').value;
    const pageSubTypeRadio = document.querySelector('input[name="pageSubType"]:checked');
    const pageSubType = pageSubTypeRadio ? pageSubTypeRadio.value : '';

    let variableName = '';

    switch (pageType) {
        case 'airportPage':
            variableName = `linksAirport${pageSubType === 'landingPage' ? 'Landing' : ''}${language}`;
            break;
        case 'hotelPage':
            variableName = `links${language}`;
            break;
        case 'cityPage':
            variableName = `links${pageSubType === 'landingPage' ? 'LandingCityPage' : 'CityPage'}${language}`;
            break;
        case 'districtPage':
            variableName = `linksDistrict${pageSubType === 'landingPage' ? 'LandingPage' : 'Page'}${language}`;
            break;
        case 'islandPage':
            variableName = pageSubTypeRadio && pageSubTypeRadio.value === 'landingPage' ? `linksLandingIslandPage${language}` : `linksIslandPage${language}`;
            break;
        case 'landmarkPage':
            variableName = pageSubTypeRadio && pageSubTypeRadio.value === 'landingPage' ? `linksLandmarkLandingPage${language}` : `linksLandmarkPage${language}`;
            break;
        case 'regionPage':
            variableName = pageSubTypeRadio && pageSubTypeRadio.value === 'landingPage' ? `linksRegionLandingPage${language}` : `linksRegionPage${language}`;
            break;
        default:
            console.error("Unsupported page type or sub type selection.");
            return;
    }    

    const linksVar = window[variableName];

    if (!linksVar || !Array.isArray(linksVar)) {
        console.error("Variabile dei link non trovata o non è un array:", variableName);
        resultsContainer.innerHTML = '<p>Errore nel caricamento dei dati.</p>';
        resultsContainer.style.display = 'block';
        return;
    }

    const filteredLinks = linksVar.filter(link => link[0] && rimuoviAccenti(link[0].toLowerCase()).includes(searchTerm));
    if (filteredLinks.length > 0) {
        displayResults(filteredLinks);
    } else {
        resultsContainer.innerHTML = '<p>Nessun risultato trovato.</p>';
        resultsContainer.style.display = 'block';
    }
}


function displayResults(filteredLinks) {
    const resultsContainer = document.getElementById('bookingSearchResults');
    resultsContainer.innerHTML = '';

    if (filteredLinks.length === 0) {
        resultsContainer.innerHTML = '<p>Nessun risultato trovato.</p>';
        resultsContainer.style.display = 'block';
        return;
    }

    filteredLinks.forEach(link => {
        const container = document.createElement('div');
        container.className = 'container';
        container.style.display = 'flex';
        container.style.justifyContent = 'space-between';
        container.style.alignItems = 'center';
        container.style.marginBottom = '10px';
        let linkText = '';
        // Identifica se i dati sono per un aeroporto
        const isAirportData = link.length > 4 && link[1].match(/^[A-Z]{3}$/);
        // Identifica se i dati sono per una city page
        const isCityPageData = link.length === 4 && link[2].startsWith("-");
        // Identifica se i dati sono per una district page (non inizia con "-")
        const isDistrictPageData = link.length === 4 && !link[2].startsWith("-");
        // Identifica se i dati sono per una hotel page
        const isHotelPageData = link.length === 3;

        // Costruisci il testo del link basandoti sul tipo di dati
        if (isAirportData) {
            linkText = `${link[0]} - ${link[1]}`; // Aeroporti: "Nome Aeroporto - IATA"
        } else if (isCityPageData) {
            linkText = link[0]; // City Pages: mostra solo il nome della città
        } else if (isDistrictPageData) {
            linkText = `${link[0]} - ${link[1]}`; // District Pages: "Nome - Città"
        } else if (isHotelPageData) {
            linkText = `${link[0]} - ${link[1]}`; // Hotel Page: "Nome dell'hotel - Città"
        } else {
            linkText = link[0]; // Default, mostra solo il nome
        }

        const url = link[link.length - 1]; // L'URL è sempre l'ultimo elemento

        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.target = "_blank";
        linkElement.textContent = linkText;

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'buttonContainer';

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copia link';
        copyButton.className = 'button';
        copyButton.onclick = function () {
            navigator.clipboard.writeText(url).then(() => {
                mostraMessaggioGlobalmente('DeeplinkCopied');
            }).catch(err => {
                console.error('Errore nella copia del link: ', err);
            });
        };

        const openButton = document.createElement('button');
        openButton.textContent = 'Apri';
        openButton.className = 'button';
        openButton.onclick = function () {
            window.open(url, '_blank');
        };

        buttonContainer.appendChild(copyButton);
        buttonContainer.appendChild(openButton);
        container.appendChild(linkElement);
        container.appendChild(buttonContainer);
        resultsContainer.appendChild(container);
    });

    resultsContainer.style.display = 'block';
}
