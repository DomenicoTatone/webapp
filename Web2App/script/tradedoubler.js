document.addEventListener('DOMContentLoaded', function() {
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

    var descrizioniProgrammi = {
        "30% PLUS Commissions Performance Web Hosting": "",
        "À La Folie": "A' La Folie è un nuovo brand di moda con l'obiettivo di vendere borse solo a un mercato femminile. Offriamo il 20% di commissione. Solo vendite in Italia.",
        "AXA Assistance": "AXA Assistance, società del gruppo AXA, è specializzata nell’Assistenza e nell’Assicurazioni Viaggi. Offre tre diversi prodotti a seconda del livello di protezione desiderato. Dall’ Assistenza in viaggio e rimborso spese mediche alla copertura contro l’annullamento/rinuncia del viaggio, infortuni di volo, viaggio, ritardo aereo, responsabilità civile contro terzi, perdita o furto bagaglio.",
        "Airport Parking Luton": "",
        "Airport Parking Manchester": "",
        "Airport Parking With Us": "",
        "Allianz Global Assistance": "Mondial Assistance, Leader Mondiale nell'Assistenza, nell'Assicurazione Viaggi e nei Servizi alle Persone, ora si chiama Allianz Global Assistance.",
        "Barceló Hotels & Resorts": "",
        "BeGood - Trattamento di Bellezza da Indossare": "",
        "Club Med 2023": "",
        "Columbus Assicurazioni": "",
        "Compare Cheap Airport Parking Prices at all Major Airports of Uk. Deals at 60% Off": "",
        "Compare Parking Prices": "",
        "Direct Ferries IT": "",
        "Direct Ferries UK": "",
        "eDreams": "eDreams è uno dei brand di viaggi online leader a livello mondiale. Innovatore nel settore della prenotazione di viaggi online sin dalla sua fondazione nel 1999, capace di mettere a disposizione dei viaggiatori di 40 paesi in tutto il mondo soluzioni tecnologiche all'avanguardia. Offre la più ampia scelta di voli di 665 compagnie aeree, di hotel, pacchetti dinamici volo+hotel, noleggio auto, assicurazione di viaggio e servizi innovativi come eDreams Prime, il primo programma di abbonamento nel settore viaggi. eDreams fa parte del gruppo eDreams ODIGEO, una delle più grandi compagnie di viaggi online al mondo che serve 18 milioni di clienti in 46 paesi.",
        "Eurowings IT": "",
        "Fedua B2C / Italia": "",
        "Grandi Navi Veloci IT": "",
        "HUMANTE Amore gel lubrificante": "",
        "Muslim Aid": "",
        "One 2 One Flights UK": "",
        "ORBIS Lifestyle": "",
        "Viaggi in crociera": "",
        "Viaggisicuri": "",
        "Vueling IT": "Vueling è nata nel luglio 2004 con una flotta di due Airbus A320, quattro percorsi e l'obiettivo di offrire un eccellente servizio clienti a prezzi competitivi. L'azienda gestisce più di 410 rotte in 162 destinazioni in Europa, Medio Oriente e Africa e dispone di una flotta di 106 aeromobili con 20 aeroporti e oltre 100 milioni di passeggeri trasportati. Commissione publisher: 4,2€ CPA Richiedi l'affiliazione e promuovi Vueling! SEM e/o RETARGETING: assolutamente vietate Bidding (SEM) and RETARGETING: absolutely forbidden.",
        "Vueling UK": "",
        "Weweed": "Weweed è un brand di cannabis light e prodotti cbd sul mercato dal 2017. È Conosciuto in tutta Italia grazie all'e-commerce prodotti-cannabis.it. Ci distinguiamo per l'estrema attenzione che diamo alla qualità dei prodotti e alla celerità e puntualità del servizio. Il nostro obbiettivo è dare la possibilità agli utenti di accedere ai migliori prodotti CBD in maniera comoda, veloce ed a prezzi vantaggiosi.",
        "Yalla Yalla": ""
    };
    

    var select = document.getElementById('siteSelect');
    var nomiIsola = {
        "3220593": "Isola di Formentera",
        "3337668": "Isola di Lanzarote",
        "1639250": "Isola di Minorca IT",
        "3349565": "Isola di Minorca EN",
        "3349567": "Isola di Minorca ES",
        "3335968": "Vacanze nel Mediterraneo"
    };

    // Popola il select dei siti
    Object.keys(sitiProgrammi).forEach(function(key) {
        var nomeIsola = nomiIsola[key] || "Isola Sconosciuta";
        var option = new Option(`${nomeIsola} - ${key}`, key);
        select.add(option);
    });

    select.onchange = function() {
        var selectedSite = this.value;
        var programsList = document.getElementById('programsList');
        programsList.innerHTML = ''; // Pulisci la lista precedente
    
        if(sitiProgrammi[selectedSite] && sitiProgrammi[selectedSite].length > 0) {
            var row = document.createElement('div');
            row.className = 'row';
            sitiProgrammi[selectedSite].forEach(function(program) {
                var col = document.createElement('div');
                col.className = 'col-md-4 mb-4';

                var card = document.createElement('div');
                card.className = 'card h-100';

                var cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                var cardTitle = document.createElement('h5');
                cardTitle.className = 'card-title';
                cardTitle.textContent = program;

                var cardText = document.createElement('p');
                cardText.className = 'card-text';
                cardText.textContent = 'Descrizione del programma:';

                // Creazione e gestione della descrizione abbreviata
                var descrizione = document.createElement('p');
                descrizione.className = 'program-description';
                var descrizioneCompleta = descrizioniProgrammi[program] || "Descrizione non disponibile.";
                descrizione.innerHTML = descrizioneCompleta.slice(0, 100);
                if (descrizioneCompleta.length > 100) {
                    descrizione.innerHTML += '<span style="color: blue; cursor: pointer;"> [...]</span>';
                }

                descrizione.onclick = function(event) {
                    if (event.target.tagName === 'SPAN') {
                        document.getElementById('testoDescrizione').textContent = descrizioneCompleta;
                        document.getElementById('modalDescrizione').style.display = 'block';
                    }
                };
            
                // Definizione del pulsante "Apri"
                var openButton = document.createElement('button');
                openButton.textContent = 'Apri';
                openButton.className = 'btn btn-primary mr-2';
    
                // Definizione del pulsante "Copia link"
                var copyLinkButton = document.createElement('button'); // Assicurati che questa definizione sia presente
                copyLinkButton.textContent = 'Copia link';
                copyLinkButton.className = 'btn btn-secondary';
    
                // Assicurati che la logica di gestione del clic sia definita dopo la creazione del pulsante
                if(linkProgrammi[selectedSite] && linkProgrammi[selectedSite][program]) {
                    openButton.onclick = function() {
                        window.open(linkProgrammi[selectedSite][program]);
                    };
    
                    copyLinkButton.onclick = function() {
                        navigator.clipboard.writeText(linkProgrammi[selectedSite][program]).then(function() {
                            mostraMessaggioGlobalmente('DeeplinkCopied');
                        }, function(err) {
                            console.error('Errore nella copia del link: ', err);
                        });
                    };
                }
    
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
                cardBody.appendChild(descrizione);
                cardBody.appendChild(openButton);
                cardBody.appendChild(copyLinkButton);
                card.appendChild(cardBody);
                col.appendChild(card);
                row.appendChild(col);
            });
            programsList.appendChild(row);
        } else {
            // Se non ci sono programmi, mostra un messaggio
            var nomeIsola = nomiIsola[selectedSite] || "Questo sito";
            var noProgramsMessage = document.createElement('p');
            noProgramsMessage.textContent = `Al momento non ci sono programmi attivi per ${nomeIsola}.`;
            programsList.appendChild(noProgramsMessage);
        }
    };

    // Logica per chiudere il modal
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        document.getElementById('modalDescrizione').style.display = "none";
    }

    // Chiudi il modal anche cliccando fuori dal suo contenuto
    window.onclick = function(event) {
        var modal = document.getElementById('modalDescrizione');
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
