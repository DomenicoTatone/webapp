var select = document.getElementById('siteSelect2');
var sitiProgrammi = {
    "1639250": [
        "Allianz Global Assistance",
        "AXA Assistance",
        "Barceló Hotels & Resorts",
        "BeGood - Trattamento di Bellezza da Indossare",
        "Columbus Assicurazioni",
        "Direct Ferries IT",
        "eDreams",
        "Fedua B2C / Italia",
        "HUMANTE Amore gel lubrificante",
        "ORBIS Lifestyle",
        "Viaggisicuri",
        "Vueling IT",
        "Weweed",
        "Yalla Yalla"
    ],
    "3220593": [
        "À La Folie", 
        "eDreams", 
        "Vueling IT",
        "Weweed"
    ],
    "3335968": [
        "Club Med 2023",
        "Direct Ferries IT",
        "Eurowings IT",
        "Grandi Navi Veloci IT",
        "Viaggi in crociera",
        "Vueling IT",
        "Weweed"
    ],
    "3337668": [
        "Direct Ferries IT", 
        "eDreams", 
        "Vueling IT",
        "Weweed"
    ],
    "3349565": [
        "30% PLUS Commissions Performance Web Hosting",
        "Airport Parking Luton",
        "Airport Parking Manchester",
        "Airport Parking With Us",
        "Compare Cheap Airport Parking Prices at all Major Airports of Uk. Deals at 60% Off",
        "Compare Parking Prices",
        "Direct Ferries UK",
        "Muslim Aid",
        "One 2 One Flights UK",
        "Vueling UK"
    ],
    "3349567": [
        "My Tea Moments - Té e Infusiones Online"
    ]
};

var linkProgrammi = {
    "1639250": {
        "Allianz Global Assistance": "https://clk.tradedoubler.com/click?p=72847&a=1639250",
        "AXA Assistance": "https://clk.tradedoubler.com/click?p=261028&a=1639250",
        "Barceló Hotels & Resorts": "https://clk.tradedoubler.com/click?p=282865&a=1639250",
        "BeGood - Trattamento di Bellezza da Indossare": "https://clk.tradedoubler.com/click?p=332870&a=1639250",
        "Columbus Assicurazioni": "https://clk.tradedoubler.com/click?p=76623&a=1639250",
        "Direct Ferries IT": "https://clk.tradedoubler.com/click?p=313887&a=1639250",
        "eDreams": "https://clk.tradedoubler.com/click?p=17269&a=1639250",
        "Fedua B2C / Italia": "https://clk.tradedoubler.com/click?p=334658&a=1639250",
        "HUMANTE Amore gel lubrificante": "https://clk.tradedoubler.com/click?p=342544&a=1639250",
        "ORBIS Lifestyle": "https://clk.tradedoubler.com/click?p=334006&a=1639250",
        "Viaggisicuri": "https://clk.tradedoubler.com/click?p=249882&a=1639250",
        "Vueling IT": "https://clk.tradedoubler.com/click?p=288053&a=1639250",
        "Weweed": "https://clk.tradedoubler.com/click?p=343473&a=1639250",
        "Yalla Yalla": "https://clk.tradedoubler.com/click?p=218733&a=1639250"
    },
    "3220593": {
        "À La Folie": "https://clk.tradedoubler.com/click?p=348934&a=3220593",
        "eDreams": "https://clk.tradedoubler.com/click?p=17269&a=3220593",
        "Vueling IT": "https://clk.tradedoubler.com/click?p=288053&a=3220593",
        "Weweed": "https://clk.tradedoubler.com/click?p=343473&a=3220593"
    },
    "3335968": {
        "Club Med 2023": "https://clk.tradedoubler.com/click?p=336882&a=3335968",
        "Direct Ferries IT": "https://clk.tradedoubler.com/click?p=313887&a=3335968",
        "Eurowings IT": "https://clk.tradedoubler.com/click?p=307239&a=3335968",
        "Grandi Navi Veloci IT": "https://clk.tradedoubler.com/click?p=316693&a=3335968",
        "Viaggi in crociera": "https://clk.tradedoubler.com/click?p=341133&a=3335968",
        "Vueling IT": "https://clk.tradedoubler.com/click?p=288053&a=3335968",
        "Weweed": "https://clk.tradedoubler.com/click?p=343473&a=3335968"
    },        
    "3337668": {
        "Direct Ferries IT": "https://clk.tradedoubler.com/click?p=313887&a=3337668",
        "eDreams": "https://clk.tradedoubler.com/click?p=17269&a=3337668",
        "Vueling IT": "https://clk.tradedoubler.com/click?p=288053&a=3337668",
        "Weweed": "https://clk.tradedoubler.com/click?p=343473&a=3337668"
    },
    "3349565": {
        "30% PLUS Commissions Performance Web Hosting": "https://clk.tradedoubler.com/click?p=355894&a=3349565",
        "Airport Parking Luton": "https://clk.tradedoubler.com/click?p=343105&a=3349565",
        "Airport Parking Manchester": "https://clk.tradedoubler.com/click?p=343201&a=3349565",
        "Airport Parking With Us": "https://clk.tradedoubler.com/click?p=343202&a=3349565",
        "Compare Cheap Airport Parking Prices at all Major Airports of Uk. Deals at 60% Off": "https://clk.tradedoubler.com/click?p=355499&a=3349565",
        "Compare Parking Prices": "https://clk.tradedoubler.com/click?p=355683&a=3349565",
        "Direct Ferries UK": "https://clk.tradedoubler.com/click?p=324849&a=3349565",
        "Muslim Aid": "https://clk.tradedoubler.com/click?p=335318&a=3349565",
        "One 2 One Flights UK": "https://clk.tradedoubler.com/click?p=348717&a=3349565",
        "Vueling UK": "https://clk.tradedoubler.com/click?p=320047&a=3349565"
    },
    "3349567": {
        "My Tea Moments - Té e Infusiones Online": "https://clk.tradedoubler.com/click?p=357725&a=3349567"
    }
};

var nomi_Isola = {
    "3220593": "Isola di Formentera",
    "3337668": "Isola di Lanzarote",
    "1639250": "Isola di Minorca IT",
    "3349565": "Isola di Minorca EN",
    "3349567": "Isola di Minorca ES",
    "3335968": "Vacanze nel Mediterraneo"
};

// Itera attraverso l'oggetto nomiIsola
for(var codice in nomi_Isola) {
    // Crea un nuovo elemento option per il select
    var option = document.createElement('option');
    // Imposta il valore e il testo dell'option
    // Modifica qui: concatena il codice dell'isola al nome
    option.value = codice;
    option.text = nomi_Isola[codice] + " - " + codice;
    // Aggiungi l'option al select
    select.appendChild(option);
}

var criteriValidazione = {
    "1639250": { // Isola di Minorca IT
        "Allianz Global Assistance": ["https://www.allianz-assistance.it/"],
        "AXA Assistance": ["https://www.assicurazione-viaggio.axa-assistance.it/"],
        "Barceló Hotels & Resorts": ["https://www.barcelo.com/"],
        "BeGood - Trattamento di Bellezza da Indossare": ["https://begood.store/"],
        "Columbus Assicurazioni": ["https://www.columbusassicurazioni.it/"],
        "Direct Ferries IT": ["https://www.directferries.it/"],
        "eDreams": ["https://www.edreams.it/", "https://rentacar.edreams.it/", "https://navette.edreams.it", "https://hotels.edreams.it/"],
        "Fedua B2C / Italia": ["https://fedua.com/"],
        "HUMANTE Amore gel lubrificante": ["https://www.humante.com/"],
        "ORBIS Lifestyle": ["https://orbislifestyle.com/"],
        "Viaggisicuri": ["https://www.viaggisicuri.com/", "https://viaggisicuri.com/"],
        "Vueling IT": ["https://www.vueling.com/", "https://cars.vueling.com", "https://hotel.vueling.com/", "https://activities.vueling.com/", "https://parking.vueling.com/"],
        "Weweed": ["https://prodotti-cannabis.it/"],
        "Yalla Yalla": ["https://www.yallayalla.it/"]
    },
    "3220593": { // Isola di Formentera
        "À La Folie": ["https://alafolie.it/"],
        "eDreams": ["https://www.edreams.it/", "https://rentacar.edreams.it/", "https://navette.edreams.it", "https://hotels.edreams.it/"],
        "Vueling IT": ["https://www.vueling.com/", "https://cars.vueling.com", "https://hotel.vueling.com/", "https://activities.vueling.com/", "https://parking.vueling.com/"],
        "Weweed": ["https://prodotti-cannabis.it/"],
    },
    "3335968": { // Vacanze nel Mediterraneo
        "Club Med 2023": ["https://www.clubmed.it/"],
        "Direct Ferries IT": ["https://www.directferries.it/"],
        "Eurowings IT": ["https://www.eurowings.com/"],
        "Grandi Navi Veloci IT": ["https://www.gnv.it/"],
        "Viaggi in crociera": ["https://www.crocierepiu.it/"],
        "Vueling IT": ["https://www.vueling.com/", "https://cars.vueling.com", "https://hotel.vueling.com/", "https://activities.vueling.com/", "https://parking.vueling.com/"],
        "Weweed": ["https://prodotti-cannabis.it/"],
    },
    "3337668": { // Isola di Lanzarote
        "Direct Ferries IT": ["https://www.directferries"],
        "eDreams": ["https://www.edreams.it/", "https://rentacar.edreams.it/", "https://navette.edreams.it", "https://hotels.edreams.it/"],
        "Vueling IT": ["https://www.vueling.com/", "https://cars.vueling.com", "https://hotel.vueling.com/", "https://activities.vueling.com/", "https://parking.vueling.com/"],
        "Weweed": ["https://prodotti-cannabis.it/"],
    },
    "3349565": { // Isola di Minorca EN
        "30% PLUS Commissions Performance Web Hosting": "https://charityhost.org/",
        "Airport Parking Luton": "https://www.airportparkluton.co.uk/",
        "Airport Parking Manchester": "https://www.airportparkmanchester.co.uk/",
        "Airport Parking With Us": "https://www.airportparkwithus.co.uk/",
        "Compare Cheap Airport Parking Prices at all Major Airports of Uk. Deals at 60% Off": ["https://www.ezybook.co.uk/"],
        "Compare Parking Prices": ["https://www.compareparkingprices.co.uk/"],
        "Direct Ferries UK": ["https://www.directferries.co.uk/"],
        "Muslim Aid": "https://www.muslimaid.org/",
        "One 2 One Flights UK": "https://www.one2oneflights.com/",
        "Vueling UK": "https://www.vueling.com/",
    },
    "3349567": { // Isola di Minorca ES
        "My Tea Moments - Té e Infusiones Online": ["https://myteamoments.com/"]
    }
};

document.getElementById('transformButton').addEventListener('click', function() {
    var inputLink = document.getElementById('inputTLink').value;
    var codiceProgramma = document.getElementById('platformSelect').value;
    var nomeProgramma = document.getElementById('platformSelect').options[document.getElementById('platformSelect').selectedIndex].text;
    var codiceIsola = document.getElementById('siteSelect2').value;

    // Verifica se è stato selezionato un sito
    if (codiceIsola === "0") {
        mostraMessaggioDiErrore('SelectSite'); // "Seleziona prima un Sito"
        return;
    }

    // Verifica se è stata selezionata una piattaforma
    if (!codiceProgramma) {
        mostraMessaggioDiErrore('SelectPlatform'); // "Seleziona una piattaforma"
        return;
    }

    if (!inputLink.startsWith("http://") && !inputLink.startsWith("https://")) {
        mostraMessaggioDiErrore('validURLConstruction'); // Mostra il messaggio di errore
        return;
    }

    // Verifica se è stato inserito un link
    if (!inputLink) {
        mostraMessaggioDiErrore('InsertLink'); // "Inserisci un link"
        return;
    }

    try {
        var inputUrl = new URL(inputLink);
    } catch (error) {
        if (error instanceof TypeError) {
            mostraMessaggioDiErrore('invalidURLConstruction'); // "URL inserito non è valido"
            return;
        } else {
            console.error('Errore non gestito:', error);
            return;
        }
    }

    var codiceIsolaEffettivo = codiceIsola.split(" - ")[0];

    // Verifica la validità dell'URL rispetto ai criteri predefiniti
    var programmiValidi = criteriValidazione[codiceIsolaEffettivo][nomeProgramma];
    var isValidUrl = programmiValidi.some(urlValido => inputUrl.href.includes(urlValido));
    if (!isValidUrl) {
        mostraMessaggioDiErrore('validTradedoublerURL'); // "L'URL non è valido per il programma selezionato"
        return;
    }

    // Costruisce il link finale
    var protocollo = inputUrl.protocol; // Utilizza il protocollo dell'URL inserito
    var linkFinale = `${protocollo}//clk.tradedoubler.com/click?p=${codiceProgramma}&a=${codiceIsolaEffettivo}&url=${encodeURIComponent(inputUrl.href)}`;
    document.getElementById('transformedLink').innerHTML = `<a href="${linkFinale}" target="_blank">${linkFinale}</a>`;
    document.getElementById('transformedLinkContainer').style.display = 'block';
});

// Lista delle piattaforme da disabilitare
var piattaformeDaDisabilitare = ["Allianz Global Assistance"];

document.getElementById('siteSelect2').addEventListener('change', function() {
    var codiceIsola = this.value.split(" - ")[0];
    var programmiIsola = sitiProgrammi[codiceIsola];
    var selectPiattaforme = document.getElementById('platformSelect');

    // Pulisce le opzioni esistenti
    selectPiattaforme.innerHTML = '';

    if (programmiIsola && programmiIsola.length > 0) {
        // Aggiungi un'opzione di placeholder
        selectPiattaforme.options.add(new Option("Seleziona una piattaforma", ""));
        // Popola il menu a discesa delle piattaforme
        programmiIsola.forEach(function(piattaforma) {
            // Verifica se la piattaforma deve essere disabilitata
            var disabilitaPiattaforma = piattaformeDaDisabilitare.includes(piattaforma);
            // Trova il codice del programma per la piattaforma corrente
            for (let programma in linkProgrammi[codiceIsola]) {
                if (programma === piattaforma) {
                    let urlProgramma = linkProgrammi[codiceIsola][programma];
                    let match = urlProgramma.match(/p=(\d+)&a=(\d+)/);
                    if (match) {
                        let codiceProgramma = match[1];
                        // Creare un'opzione disabilitata anziché abilitata se necessario
                        let option = new Option(piattaforma, codiceProgramma);
                        if (disabilitaPiattaforma) {
                            option.classList.add('option-non-selezionabile'); // Aggiungi la classe CSS per lo stile
                            option.disabled = true; // Disabilita l'opzione
                        }
                        selectPiattaforme.appendChild(option);
                        break;
                    }
                }
            }
        });
    } else {
        selectPiattaforme.options.add(new Option("Nessuna piattaforma disponibile", ""));
    }
});

document.getElementById('openLinkButton').addEventListener('click', function() {
    var platformSelect = document.getElementById('platformSelect');
    var selectedOption = platformSelect.options[platformSelect.selectedIndex];
    
    // Prendi il valore dall'opzione selezionata, che sarebbe il codice della piattaforma
    var platformCode = selectedOption.value;
    
    if(platformCode) {
      // Utilizza il codice della piattaforma per ottenere l'URL dal tuo oggetto linkProgrammi
      var codiceIsola = document.getElementById('siteSelect2').value.split(" - ")[0];
      var nomeProgramma = selectedOption.text;
      var urlProgramma = linkProgrammi[codiceIsola][nomeProgramma];
  
      if(urlProgramma) {
        // Apri il link in una nuova scheda del browser
        window.open(urlProgramma, '_blank');
      } else {
        alert('URL non trovato per la piattaforma selezionata.');
      }
    } else {
      mostraMessaggioDiErrore('SelectPlatform'); // "Seleziona una piattaforma"
    }
  });  

document.getElementById('copyTransformedLink').addEventListener('click', function() {
    // Prende l'URL dal contenuto dell'elemento che mostra il link trasformato
    var linkDaCopiare = document.getElementById('transformedLink').querySelector('a').href;
    
    // Usa l'API del clipboard per copiare il testo
    navigator.clipboard.writeText(linkDaCopiare).then(function() {
        console.log('Link copiato negli appunti!');
        mostraMessaggioGlobalmente('DeeplinkCopied');
    }, function(err) {
        console.error('Impossibile copiare il link: ', err);
    });
});

document.getElementById('openTransformedLink').addEventListener('click', function() {
    // Prende l'URL dal contenuto dell'elemento che mostra il link trasformato
    var urlDaAprire = document.getElementById('transformedLink').querySelector('a').href;
    
    // Apri l'URL in una nuova scheda
    window.open(urlDaAprire, '_blank');
});

document.addEventListener('DOMContentLoaded', function() {
    var video = document.querySelector('.gif-container video');

    video.addEventListener('play', function() {
        var gifDescription = this.nextElementSibling; // Assumendo che .gif-description sia subito dopo il video
        if (gifDescription && gifDescription.classList.contains('gif-description')) {
            gifDescription.style.display = 'block'; // Mostra la descrizione
        }
    });
});

document.getElementById('generateDeeplinkButton').addEventListener('click', function() {
    document.getElementById('programmiAttivi').style.display = 'none';
    document.getElementById('linkTransformerContainer').style.display = 'block';
});

document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('linkTransformerContainer').style.display = 'none';
    document.getElementById('programmiAttivi').style.display = 'block';
});
