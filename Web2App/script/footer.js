document.addEventListener('DOMContentLoaded', (event) => {
  const footerHTML = `
  <footer class="site-footer">
  <button id="toggleLinkButton" class="btn-toggle">Enable wp-login for links</button>
  <div class="footer-container">
    <div class="footer-column">
      <a href="https://www.isoladiminorca.com/" target="_blank">Isola di Minorca</a>
      <a href="https://www.isoladifuerteventura.com/" target="_blank">Isola di Fuerteventura</a>
      <a href="https://www.isoladicretavacanze.com/" target="_blank">Isola di Creta Vacanze</a>
      <a href="https://www.isoladimaltavacanze.com/" target="_blank">Isola di Malta Vacanze</a>
      <a href="https://www.isoladirodivacanze.com/" target="_blank">Isola di Rodi Vacanze</a>
    </div>
    <div class="footer-column">
      <a href="https://www.isoladimaiorca.com/" target="_blank">Isola di Maiorca</a>
      <a href="https://www.isoladiibiza.com/" target="_blank">Isola di Ibiza</a>
      <a href="https://www.isoladilanzarote.com/" target="_blank">Isola di Lanzarote</a>
      <a href="https://www.isoladiformentera.com/" target="_blank">Isola di Formentera</a>
      <a href="https://www.vacanzenelmediterraneo.com/" target="_blank">Vacanze nel Mediterraneo</a>
    </div>
    <div class="footer-column">
      <a href="https://www.voglioviverecosi.com/" target="_blank">Voglio Vivere Così</a>
      <a href="https://www.tierra.it/" target="_blank">Tierra</a>
      <a href="https://www.menorcainfinita.com/it/home" target="_blank">Menorca Infinita</a>
      <a href="https://www.kokulisworld.com/es/inicio" target="_blank">Kokulis World</a>
      <a href="https://www.area54marketplace.com/" target="_blank">Area 54 Marketplace</a>
    </div>
    <div class="footer-column">
      <a href="https://www.mollaretutto.com/" target="_blank">Mollar Tutto</a>
      <a href="https://www.listooo.com/" target="_blank">Listooo</a>
      <a href="https://www.unamelaalgiorno.com/" target="_blank">Una Mela al Giorno</a>
      <a href="https://www.casaledeifruttiantichi.com/" target="_blank">Casale dei Frutti Antichi</a>
    </div>
    <div class="footer-column">
      <a href="https://www.destinioltreconfine.com/" target="_blank">Destini Oltre Confine</a>
      <a href="https://www.amicidiromeo.com/" target="_blank">Amici di Romeo</a>
      <a href="https://www.cambiandoelrumbo.com/" target="_blank">Cambiando el Rumbo</a>
      <a href="https://www.voglioviverecosiebooks.com/" target="_blank">Voglio Vivere Così Ebooks</a>
    </div>
  </div>
</footer> 
`;
  container.insertAdjacentHTML('beforeend', footerHTML);

  const toggleButton = document.getElementById('toggleLinkButton');
  let linksModified = localStorage.getItem('linksModified') === 'true';

  // Imposta il testo e lo stato del pulsante in base allo stato salvato
  toggleButton.textContent = linksModified ? "Deactivate wp-login for links" : "Enable wp-login for links";
  if (linksModified) {
    toggleButton.classList.add('active');
    updateLinks(true); // Aggiorna i link immediatamente se salvati come modificati
  }

  toggleButton.addEventListener('click', function() {
    linksModified = !linksModified;
    localStorage.setItem('linksModified', linksModified); // Salva lo stato nel localStorage
    this.textContent = linksModified ? "Deactivate wp-login for links" : "Enable wp-login for links";
    this.classList.toggle('active', linksModified);
    updateLinks(linksModified);
  });

  function updateLinks(activate) {
    const links = document.querySelectorAll('.footer-container a');
    links.forEach(link => {
      if (activate) {
        if (!link.href.endsWith('/wp-login.php')) {
            link.href += '/wp-login.php';
        }
      } else {
        if (link.href.endsWith('/wp-login.php')) {
            link.href = link.href.slice(0, -13);
        }
      }
    });
  }
});