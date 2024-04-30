document.addEventListener('DOMContentLoaded', (event) => {
  // Crea l'elemento link per FontAwesome e lo aggiunge all'head
  const faLink = document.createElement('link');
  faLink.rel = 'stylesheet';
  faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
  document.head.appendChild(faLink);
  // Create the menu HTML
  const menuHTML = `
  <nav style="background-color: #007bff; padding: 10px; display: flex; justify-content: space-between; align-items: center; color: white;">
     <div class="webapp-logo-and-title" style="display: flex; align-items: center;">
        <a href="index.html" style="display: flex; align-items: center; color: white; text-decoration: none;">
           <img src="https://bookinglinks.s3.eu-north-1.amazonaws.com/icona.png" alt="Logo" style="height: 50px; margin-right: 10px;">
           <div>
              <div class="webapp-title">WebApp</div>
              <div class="by-chatgpt">by ChatGPT</div>
           </div>
        </a>
     </div>
     <div class="hamburger-menu">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
     </div>
     <div class="menu-items">
        <a href="index.html" style="color: white; text-decoration: none; margin-right: 20px;">Booking</a>
        <a href="tradedoubler.html" style="color: white; text-decoration: none;">Tradedoubler</a>
        <a href="getyourguide.html" style="color: white; text-decoration: none; margin-right: 20px;">GetYourGuide</a>
        <a href="civitatis.html" style="color: white; text-decoration: none; margin-right: 20px;">Civitatis</a>
        <a href="auto.html" style="color: white; text-decoration: none;">Noleggio Auto</a>
        <a href="img-tool.html" style="color: white; text-decoration: none;">ImgCompr</a>
     </div>
  </nav>
  <div class="flags">
<div class="segnalazioni-link" id="reportsElementId" style="cursor: pointer;">
    <i class="fas fa-paper-plane"></i> <span id="reportsText">Segnalazioni</span>
</div>
     <span class="flag-icon flag-icon-it" id="flag-it" style="cursor: pointer;"></span>
     <span class="flag-icon flag-icon-es" id="flag-es" style="cursor: pointer;"></span>
     <span class="flag-icon flag-icon-gb" id="flag-en" style="cursor: pointer;"></span>
     <span class="flag-icon flag-icon-fr" id="flag-fr" style="cursor: pointer;"></span>
  </div>
  `;
  // Insert the HTML
  document.body.insertAdjacentHTML('afterbegin', menuHTML);
  // Get references to elements
  const hamburger = document.querySelector('.hamburger-menu');
  const menuItems = document.querySelector('.menu-items');
  const segnalazioniLink = document.querySelector('.segnalazioni-link');
  hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  menuItems.classList.toggle('active');
  });
  // Aggiungi il gestore di eventi click per le segnalazioni
  segnalazioniLink.addEventListener('click', () => {
  window.location.href = 'https://domenicotatone.netlify.app/segnalazioni.html'; // Reindirizza alla pagina delle segnalazioni
  });
  });