document.addEventListener('DOMContentLoaded', function() {
  // Definisce la funzione per trasformare i link in versioni sponsorizzate specifiche per Civitatis
  function trasformaInLinkSponsorizzato(url) {
      // Crea un oggetto URL per analizzare e manipolare facilmente l'URL
      let parsedUrl = new URL(url);
      
      // Pulisci tutti i parametri di query esistenti
      parsedUrl.search = '';
      
      // Aggiungi il parametro di affiliazione
      parsedUrl.searchParams.append('aid', '5488');
      
      // Restituisci l'URL trasformato come stringa
      return parsedUrl.toString();
  }
  
  // Funzione per verificare se l'URL è valido e appartiene a Civitatis
  function isValidCivitatisURL(url) {
      const pattern = /^https:\/\/www\.civitatis\.com\/(it|es|en|fr)\/?.*/;
      return pattern.test(url);
  }
  
  // Riferimento agli elementi per la selezione della lingua e il copy/open dei link Civitatis
  const links = {
      it: "https://www.civitatis.com/it/?aid=5488",
      es: "https://www.civitatis.com/es/?aid=5488",
      en: "https://www.civitatis.com/en/?aid=5488",
      fr: "https://www.civitatis.com/fr/?aid=5488",
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
  
  const inputLink = document.getElementById('inputCLink');
  const transformButton = document.getElementById('transformButton');
  const transformedLinkContainer = document.getElementById('transformedLinkContainer');
  const transformedLink = document.getElementById('transformedLink');
  const copyTransformedLink = document.getElementById('copyTransformedLink');
  const openTransformedLink = document.getElementById('openTransformedLink');
  
  transformButton.addEventListener('click', function() {
      const url = inputLink.value;
      if (isValidCivitatisURL(url)) {
          const transformedUrl = trasformaInLinkSponsorizzato(url);
          transformedLink.textContent = transformedUrl;
          transformedLinkContainer.style.display = 'block';
      } else {
          mostraMessaggioDiErrore('validCivitatisURL');
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