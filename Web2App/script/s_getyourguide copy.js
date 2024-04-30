async function loadData() {
    const scripts = [
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-activity-0.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-activity-1.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-activity-2.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-activity-3.js',
        'https://allspainbookinglinks.s3.eu-west-3.amazonaws.com/GYG/IT/sitemap-activity-4.js'
    ];
    window.data = {}; // Assicurati che `data` sia un oggetto globale inizializzato vuoto
    for (let i = 0; i < scripts.length; i++) {
        const scriptUrl = scripts[i];
        const script = document.createElement('script');
        script.src = scriptUrl;
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = () => {
            // Processa ciascun script caricato per aggiungere l'informazione dello script source
            for (let key in window.data) {
                if (!window.data[key].scriptSource) { // Aggiungi scriptSource solo se non esiste
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
    card.innerHTML = `
        <h3>${activity.title}</h3>
        <img src="${activity.images[0]}" alt="${activity.title}" style="width:100%;"/>
        <button onclick="copyLink('${link}')">Copia Link</button>
        <button onclick="window.open('${link}', '_blank')">Apri Link</button>
    `;
    return card;
}

function copyLink(link) {
    navigator.clipboard.writeText(link).then(() => {
        mostraMessaggioGlobalmente('linkCopied');
    }).catch(err => {
        console('Errore durante la copia del link: ' + err);
    });
}
