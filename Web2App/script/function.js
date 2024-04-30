const translations = {
    it: {
        DeeplinkCopied: 'Deep Link copiato negli appunti!',
        linkCopied: 'Link copiato negli appunti!',
        copyError: 'Errore nella copia del link.',
        validGetYourGuideURL: 'Per favore, inserisci un URL valido di GetYourGuide.',
        validCivitatisURL: 'Per favore, inserisci un URL valido di Civitatis.',
        HotelsLoaded: 'Lista Hotels caricata correttamente!',
        SelectPlatform: 'Seleziona almeno una piattaforma!',
        validTradedoublerURL: 'Per favore, inserisci un URL valido o la piattaforma non è attiva.',
        InsertLink: 'Inserisci un link.',
        SelectSite: 'Seleziona prima un sito.',
        validURLConstruction: 'Il link inserito non è valido. Si prega di assicurarsi di includere il protocollo "http://" o "https://".',
        NewProgramActive: {
            "3220593": "Nuovo programma attivo su Isola di Formentera",
            "3337668": "Nuovo programma attivo su Isola di Lanzarote",
            "1639250": "Nuovo programma attivo su Isola di Minorca IT",
            "3349565": "Nuovo programma attivo su Isola di Minorca EN",
            "3349567": "Nuovo programma attivo su Isola di Minorca ES",
            "3335968": "Nuovo programma attivo su Vacanze nel Mediterraneo"
        }
    },
    es: {
        DeeplinkCopied: '¡Deep Link copiado al portapapeles!',
        linkCopied: 'Link copiado al portapapeles!',
        copyError: 'Error al copiar el enlace.',
        validGetYourGuideURL: 'Por favor, introduce una URL válida de GetYourGuide.',
        validCivitatisURL: 'Por favor, introduce una URL válida de Civitatis.',
        HotelsLoaded: 'Lista de hoteles cargada correctamente!',
        SelectPlatform: '¡Selecciona al menos una plataforma!',
        validTradedoublerURL: 'Por favor, introduce una URL válida o la plataforma no está activa.',
        InsertLink: 'Introduce un enlace.',
        SelectSite: 'Selecciona un sitio primero.',
        validURLConstruction: '¡El enlace ingresado no es válido! Por favor, asegúrese de incluir el protocolo "http://" o "https://".',
        NewProgramActive: {
            "3220593": "Nuevo programa activo en Isla de Formentera",
            "3337668": "Nuevo programa activo en Isla de Lanzarote",
            "1639250": "Nuevo programa activo en Isla de Menorca IT",
            "3349565": "Nuevo programa activo en Isla de Menorca EN",
            "3349567": "Nuevo programa activo en Isla de Menorca ES",
            "3335968": "Nuevo programa activo en Vacaciones en el Mediterráneo"
        }
    },
    en: {
        DeeplinkCopied: 'Deep Link copied to clipboard!',
        linkCopied: 'Link copied to clipboard!',
        copyError: 'Error copying the link.',
        validGetYourGuideURL: 'Please, enter a valid GetYourGuide URL.',
        validCivitatisURL: 'Please, enter a valid Civitatis URL.',
        HotelsLoaded: 'List of hotels loaded successfully!',
        SelectPlatform: 'Please select at least one platform!',
        validTradedoublerURL: 'Please enter a valid URL or the platform is not active.',
        InsertLink: 'Insert a link.',
        SelectSite: 'Select a site first.',
        validURLConstruction: 'The entered link is not valid. Please make sure to include the "http://" or "https://" protocol.',
        NewProgramActive: {
            "3220593": "New program active on Formentera Island",
            "3337668": "New program active on Lanzarote Island",
            "1639250": "New program active on Minorca Island IT",
            "3349565": "New program active on Minorca Island EN",
            "3349567": "New program active on Minorca Island ES",
            "3335968": "New program active on Mediterranean Holidays"
        }
    },
    fr: {
        DeeplinkCopied: 'Deep Link copié dans le presse-papiers!',
        linkCopied: 'Link copié dans le presse-papiers!',
        copyError: 'Erreur lors de la copie du lien.',
        validGetYourGuideURL: 'Veuillez saisir une URL valide de GetYourGuide.',
        validCivitatisURL: 'Veuillez saisir une URL valide de Civitatis.',
        HotelsLoaded: 'Liste des hôtels chargée avec succès !',
        SelectPlatform: 'Sélectionnez au moins une plateforme!',
        validTradedoublerURL: 'Veuillez entrer une URL valide ou la plateforme n\'est pas active.',
        InsertLink: 'Insérez un lien.',
        SelectSite: 'Sélectionnez d\'abord un site.',
        validURLConstruction: 'Le lien saisi n\'est pas valide. Veuillez vous assurer d\'inclure le protocole "http://" ou "https://".',
        NewProgramActive: {
            "3220593": "Nouveau programme actif sur l'île de Formentera",
            "3337668": "Nouveau programme actif sur l'île de Lanzarote",
            "1639250": "Nouveau programme actif sur l'île de Minorque IT",
            "3349565": "Nouveau programme actif sur l'île de Minorque EN",
            "3349567": "Nouveau programme actif sur l'île de Minorque ES",
            "3335968": "Nouveau programme actif sur Vacances en Méditerranée"
        }
    }
};

function mostraMessaggioGlobalmente(chiaveMessaggio) {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'it'; // Default italiano
    var messaggio = translations[selectedLanguage][chiaveMessaggio];
    const alertBox = document.createElement('div');
    alertBox.textContent = messaggio;
    alertBox.style.position = 'fixed';
    alertBox.style.top = '100px';
    alertBox.style.left = '20px';
    alertBox.style.backgroundColor = 'rgba(40, 167, 69, 0.75)';
    alertBox.style.color = 'white';
    alertBox.style.padding = '10px 20px';
    alertBox.style.borderRadius = '5px';
    alertBox.style.zIndex = '10000';
    alertBox.style.opacity = '0';
    alertBox.style.transition = 'opacity 0.5s, top 0.5s'; // Animazione per opacità e posizione
    document.body.appendChild(alertBox);

    // Aggiungere un leggero ritardo prima di iniziare l'animazione per garantire che venga eseguita correttamente
    setTimeout(() => {
        alertBox.style.opacity = '1';
        alertBox.style.top = '90px'; // Muove leggermente verso l'alto per attirare attenzione
    }, 10);

    // Rimuovere il messaggio dopo 4 secondi con effetto di fade out
    setTimeout(() => {
        alertBox.style.opacity = '0';
        alertBox.style.top = '100px'; // Ritorna alla posizione originale per il fade out
        // Rimuovere l'elemento dal DOM dopo che l'animazione di fade out è completata
        setTimeout(() => {
            alertBox.remove();
        }, 500); // Corrisponde alla durata dell'animazione di opacità
    }, 4000);
}

function mostraMessaggioDiErrore(chiaveMessaggio) {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'it'; // Default italiano
    var messaggio = translations[selectedLanguage][chiaveMessaggio];
    const alertBox = document.createElement('div');
    alertBox.textContent = messaggio;
    alertBox.style.position = 'fixed';
    alertBox.style.top = '100px';
    alertBox.style.left = '20px';
    alertBox.style.backgroundColor = 'rgba(220, 53, 69, 0.75)'; // Colore rosso per errori
    alertBox.style.color = 'white';
    alertBox.style.padding = '10px 20px';
    alertBox.style.borderRadius = '5px';
    alertBox.style.zIndex = '10000';
    alertBox.style.opacity = '0';
    alertBox.style.transition = 'opacity 0.5s, top 0.5s'; // Animazione per opacità e posizione
    document.body.appendChild(alertBox);

    // Aggiungere un leggero ritardo prima di iniziare l'animazione per garantire che venga eseguita correttamente
    setTimeout(() => {
        alertBox.style.opacity = '1';
        alertBox.style.top = '90px'; // Muove leggermente verso l'alto per attirare attenzione
    }, 10);

    // Rimuovere il messaggio dopo 4 secondi con effetto di fade out
    setTimeout(() => {
        alertBox.style.opacity = '0';
        alertBox.style.top = '100px'; // Ritorna alla posizione originale per il fade out
        // Rimuovere l'elemento dal DOM dopo che l'animazione di fade out è completata
        setTimeout(() => {
            alertBox.remove();
        }, 500); // Corrisponde alla durata dell'animazione di opacità
    }, 4000);
}

document.addEventListener('DOMContentLoaded', function() {
    var messaggi = [
        { idIsola: "3337668", selectedLanguage: localStorage.getItem('selectedLanguage') || 'it' },
        { idIsola: "3349565", selectedLanguage: localStorage.getItem('selectedLanguage') || 'it' },
        { idIsola: "3349567", selectedLanguage: localStorage.getItem('selectedLanguage') || 'it' }
    ];

    messaggi.forEach(messaggio => {
        aggiungiMessaggioInCoda(messaggio);
    });

    mostraProssimoMessaggioDallaCoda();
});

var codaMessaggi = [];

function aggiungiMessaggioInCoda(messaggio) {
    codaMessaggi.push(messaggio);
}

function mostraProssimoMessaggioDallaCoda() {
    if (codaMessaggi.length > 0) {
        var prossimoMessaggio = codaMessaggi.shift();
        mostraMessaggioSeNecessario(prossimoMessaggio);
    }
}

function mostraMessaggioSeNecessario(messaggio) {
    //var testoMessaggio = translations[messaggio.selectedLanguage]?.NewProgramActive?.[messaggio.idIsola];

    if (!testoMessaggio) {
        console.error("Messaggio non trovato per l'ID specificato:", messaggio.idIsola);
        return;
    }

    var idMessaggio = getIdMessaggio(testoMessaggio);
    var messaggiMostrati = JSON.parse(localStorage.getItem('messaggiMostrati')) || {};

    var ultimaMostra = new Date(messaggiMostrati[idMessaggio]);
    var dataAttuale = new Date();
    if (!messaggiMostrati[idMessaggio] || ultimaMostra.getTime() + (7 * 24 * 60 * 60 * 1000) < dataAttuale.getTime()) {
        mostraMessaggioNovita(testoMessaggio, function() {
            // Callback chiamata al termine della visualizzazione del messaggio
            messaggiMostrati[idMessaggio] = dataAttuale.toISOString();
            localStorage.setItem('messaggiMostrati', JSON.stringify(messaggiMostrati));
            mostraProssimoMessaggioDallaCoda(); // Mostra il prossimo messaggio nella coda
        });
    } else {
        // Se il messaggio non deve essere mostrato, passa al prossimo messaggio nella coda
        mostraProssimoMessaggioDallaCoda();
    }
}

function getIdMessaggio(testoMessaggio) {
    let hash = 0;
    for (let i = 0; i < testoMessaggio.length; i++) {
        const char = testoMessaggio.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Converti a 32bit integer
    }
    return 'msg_' + Math.abs(hash);
}

function mostraMessaggioNovita(testoMessaggio, callback) {
    const novitaBox = document.createElement('div');
    const icona = document.createElement('i'); // Usa Font Awesome per l'icona
    icona.className = 'fa fa-star'; // Icona stella per indicare "novità"
    icona.style.marginRight = '10px';

    novitaBox.appendChild(icona); // Aggiungi l'icona al box di novità
    novitaBox.appendChild(document.createTextNode(testoMessaggio)); // Aggiungi il testo dopo l'icona

    // Stili base per il messaggio di novità
    novitaBox.style.display = 'flex';
    novitaBox.style.alignItems = 'center';
    novitaBox.style.position = 'fixed';
    novitaBox.style.bottom = '20px'; // Posizionamento in basso per meno intrusività
    novitaBox.style.left = '20px';
    novitaBox.style.backgroundColor = '#17a2b8'; // Colore blu-verde per un aspetto fresco
    novitaBox.style.color = 'white';
    novitaBox.style.padding = '10px 20px';
    novitaBox.style.borderRadius = '5px';
    novitaBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Ombra leggera per risaltare
    novitaBox.style.zIndex = '10000';
    novitaBox.style.opacity = '0';
    novitaBox.style.transition = 'opacity 0.5s, bottom 0.5s'; // Animazione per opacità e posizione

    document.body.appendChild(novitaBox);

    setTimeout(() => {
        novitaBox.style.opacity = '1';
        novitaBox.style.bottom = '30px'; // Movimento leggero per attirare attenzione
    }, 10);

    // Rimuovere il messaggio dopo 5 secondi con effetto di fade out
    setTimeout(() => {
        novitaBox.style.opacity = '0';
        novitaBox.style.bottom = '20px'; // Ritorna alla posizione originale per il fade out
        setTimeout(() => {
            novitaBox.remove();
            callback(); // Chiamata al callback dopo il fade out
        }, 500); // Corrisponde alla durata dell'animazione di opacità
    }, 5000);
}


