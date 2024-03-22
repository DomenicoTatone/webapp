
document.addEventListener("DOMContentLoaded", function() {
  const links = [
      { name: "Coches Menorca", urls: { it: "https://cochesmenorca.es/it/?agentId=3", es: "https://cochesmenorca.es/?agentId=3", en: "https://cochesmenorca.es/en/?agentId=3" } },
      { name: "Menorca Rent", urls: { it: "https://www.menorcarent.com/it/?agentId=15", es: "https://www.menorcarent.com/es/?agentId=15", en: "https://www.menorcarent.com/?agentId=15", fr: "https://www.menorcarent.com/fr/?agentId=15" } },
      { name: "Autos Xoroi", urls: { it: "http://www.alquilercochesmenorca.com/it/?link=ISOLADIMINORCA", es: "http://www.alquilercochesmenorca.com/es/?link=ISOLADIMINORCA", en: "http://www.alquilercochesmenorca.com/?link=ISOLADIMINORCA", fr: "http://www.alquilercochesmenorca.com/fr/?link=ISOLADIMINORCA" } },
      { name: "HIPER", urls: { it: "https://hiperrentacar.com/it/?colaborador=LO-0495108", es: "https://hiperrentacar.com/es/?colaborador=LO-0495108", en: "https://hiperrentacar.com/en/?colaborador=LO-0495108", fr: "https://hiperrentacar.com/fr/?colaborador=LO-0495108" } },
      { name: "Rentalcars", urls: { it: "https://www.rentalcars.com/it/?affiliateCode=latitudine983", es: "https://www.rentalcars.com/es/?affiliateCode=latitudine983", en: "https://www.rentalcars.com/en/?affiliateCode=latitudine983", fr: "https://www.rentalcars.com/fr/?affiliateCode=latitudine983" } }
  ];

  const linkSelector = document.getElementById('linkSelector');
  const languageSelector = document.getElementById('languageSelector');
  const copyButton = document.getElementById('copyButton');
  const openButton = document.getElementById('openButton');

  // Popola il selettore di link
  links.forEach((link, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = link.name;
      linkSelector.appendChild(option);
  });

  function getSelectedLink() {
      const selectedLinkIndex = linkSelector.value;
      const selectedLanguage = languageSelector.value;
      return links[selectedLinkIndex].urls[selectedLanguage];
  }

  copyButton.onclick = function() {
      const url = getSelectedLink();
      navigator.clipboard.writeText(url).then(() => {
          mostraMessaggioGlobalmente('DeeplinkCopied');
      }).catch(err => {
          console.error('Errore nella copia del link: ', err);
      });
  };

  openButton.onclick = function() {
      const url = getSelectedLink();
      window.open(url, '_blank');
  };
});