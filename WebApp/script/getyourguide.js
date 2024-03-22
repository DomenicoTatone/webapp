document.addEventListener("DOMContentLoaded", function() {
    function trasformaInLinkSponsorizzato(url) {
        // Crea un oggetto URL per analizzare e manipolare facilmente l'URL
        let parsedUrl = new URL(url);

        // Elimina tutti i parametri di query dall'URL
        let params = new URLSearchParams();

        // Aggiunge solamente i parametri necessari per il partner
        params.set('partner_id', 'Q5TFESQ');
        params.set('utm_medium', 'online_publisher');

        // Reimposta i parametri di ricerca dell'URL con solo i valori aggiunti
        parsedUrl.search = params.toString();

        // Restituisce l'URL modificato
        return parsedUrl.toString();
    }

    function isValidGetYourGuideURL(url) {
        const pattern = /^https:\/\/www\.getyourguide\.(it|com|es|fr)\/?.*/;
        return pattern.test(url);
    }

    // Riferimento agli elementi per la selezione della lingua e il copy/open dei link GetYourGuide
    const links = {
        it: "https://www.getyourguide.it/?partner_id=Q5TFESQ&utm_medium=online_publisher",
        es: "https://www.getyourguide.es/?partner_id=Q5TFESQ&utm_medium=online_publisher",
        en: "https://www.getyourguide.com/?partner_id=Q5TFESQ&utm_medium=online_publisher",
        fr: "https://www.getyourguide.fr/?partner_id=Q5TFESQ&utm_medium=online_publisher",
    };

    const languageSelector = document.getElementById('languageSelector');
    const copyButton = document.getElementById('copyButton');
    const openButton = document.getElementById('openButton');

    function getSelectedLink() {
        const selectedLanguage = languageSelector.value;
        return links[selectedLanguage];
    }

    copyButton.onclick = function() {
        const url = getSelectedLink();
        navigator.clipboard.writeText(url).then(() => {
            mostraMessaggioGlobalmente('DeeplinkCopied');
        }).catch(err => {
            console.error('Errore nella copia del link: ', err);
            mostraMessaggioDiErrore('copyError');
        });
    };

    openButton.onclick = function() {
        const url = getSelectedLink();
        window.open(url, '_blank');
    };

    // Riferimento agli elementi per la trasformazione del link GetYourGuide inserito
    const inputLink = document.getElementById('inputLink');
    const transformButton = document.getElementById('transformButton');
    const transformedLinkContainer = document.getElementById('transformedLinkContainer');
    const transformedLink = document.getElementById('transformedLink');
    const copyTransformedLink = document.getElementById('copyTransformedLink');
    const openTransformedLink = document.getElementById('openTransformedLink');

    transformButton.addEventListener('click', function() {
        const url = inputLink.value;
        if (isValidGetYourGuideURL(url)) {
            const transformedUrl = trasformaInLinkSponsorizzato(url);
            transformedLink.textContent = transformedUrl;
            transformedLinkContainer.style.display = 'block';
        } else {
            mostraMessaggioDiErrore('validGetYourGuideURL');
            transformedLinkContainer.style.display = 'none';
        }
    });

    copyTransformedLink.addEventListener('click', function() {
        navigator.clipboard.writeText(transformedLink.textContent).then(() => {
            mostraMessaggioGlobalmente('DeeplinkCopied');
        }).catch(err => {
            console.error('Errore nella copia del link: ', err);
            mostraMessaggioDiErrore('copyError');
        });
    });

    openTransformedLink.addEventListener('click', function() {
        window.open(transformedLink.textContent, '_blank');
    });
});