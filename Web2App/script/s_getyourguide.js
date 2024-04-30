async function loadData() {
    const scripts = [
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-activity-0.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-activity-1.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-activity-2.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-activity-3.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-activity-4.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-area-0.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-area-category-0.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-area-category-1.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-area-category-2.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-area-category-3.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-area-category-4.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-city-0.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-city-category-0.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-city-category-1.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-city-category-2.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-city-category-3.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-city-category-4.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-city-category-5.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-city-category-6.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-country-0.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-country-category-0.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-day-trips-0.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-neighborhood-0.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-neighborhood-category-0.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-neighborhood-category-1.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-neighborhood-category-2.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-0.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-1.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-category-0.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-category-1.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-category-2.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-category-3.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-category-4.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-category-5.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-category-6.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-category-7.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-category-8.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-category-9.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-category-10.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-category-11.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-category-12.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-category-13.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-category-14.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-category-15.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-poi-category-16.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-supplier-0.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-supplier-1.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-supplier-2.js',
    ];
    window.data = {};
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const progressContainer = document.getElementById('progressContainer'); // Ottieni il riferimento al container
    const totalScripts = scripts.length;

    for (let i = 0; i < scripts.length; i++) {
        const scriptUrl = scripts[i];
        const script = document.createElement('script');
        script.src = scriptUrl;
        document.head.appendChild(script);

        await new Promise(resolve => script.onload = () => {
            const progress = Math.round((i + 1) / totalScripts * 100);
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${progress}%`;  // Aggiorna il testo all'interno della barra

            if (progress === 100) {
                progressContainer.style.display = 'none';  // Nasconde il progressContainer quando il caricamento è completo
                document.getElementById('searchInput').disabled = false;  // Abilita il campo di ricerca
                console.log('Caricamento completato. Tutti i dati sono stati caricati:', Object.keys(window.data).length, 'elementi totali.');
            }
    
            // Estrazione del nome base e utilizzo di eval per il caricamento dinamico
            const urlParts = scriptUrl.split('/');
            const filename = urlParts[urlParts.length - 1]; // Prende l'ultimo segmento dell'URL
            const baseFilename = filename.split('.')[0]; // Rimuove l'estensione .js
            const variableName = `data_${baseFilename.replace(/-/g, '_').replace(/\s+/g, '_')}`;
    
            // Accedi alla variabile dinamica e copia i dati nel global 'data'
            const scriptData = eval(variableName);
            for (let key in scriptData) {
                if (!window.data[key]) {
                    window.data[key] = scriptData[key];
                    window.data[key].scriptSource = i;
                }
            }
            console.log(`Script ${i} caricato da ${scriptUrl}`);
            resolve();
        });
    }    
    document.getElementById('searchInput').disabled = false;
    console.log('Tutti i dati sono stati caricati:', Object.keys(window.data).length, 'elementi totali.');
}

loadData();

function handleKeyPress(event) {
    if (event.keyCode === 13) {  // 13 è il codice del tasto Invio
        searchActivities();      // Chiama la funzione di ricerca quando viene premuto Invio
    }
}

function searchActivities() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    let found = 0; // Contatore per tracciare il numero di risultati trovati
    for (let link in data) {
        let title = data[link].title.toLowerCase();
        if (title.includes(query)) {
            const card = createActivityCard(data[link], link);
            resultsContainer.appendChild(card);
            console.log(`Trovato: ${data[link].title} da Script ${data[link].scriptSource}`);
            found++;
        }
    }
    console.log(`Trovati ${found} risultati per "${query}"`);
}


function createActivityCard(activity, link) {
    const card = document.createElement('div');
    card.className = 'activity-card';
    
    const imageUrl = activity.images && activity.images.length > 0 ? activity.images[0] : 'url_di_un_immagine_di_default.jpg';
    
    const title = document.createElement('h3');
    title.textContent = activity.title;

    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = activity.title;
    image.style.width = "100%";

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copia Link';
    copyButton.onclick = () => copyLink(link);
    const openButton = document.createElement('button');
    openButton.textContent = 'Apri Link';
    openButton.onclick = () => window.open(link, '_blank');

    buttonContainer.appendChild(copyButton);
    buttonContainer.appendChild(openButton);

    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(buttonContainer);
    
    return card;
}


function copyLink(link) {
    navigator.clipboard.writeText(link).then(() => {
        mostraMessaggioGlobalmente('linkCopied');
    }).catch(err => {
        console('Errore durante la copia del link: ' + err);
    });
}
