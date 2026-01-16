(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}})();const k=["it","en","es","fr","de"],y="it";class C{constructor(){this.messages={},this.currentLanguage=y,this.isLoaded=!1}async init(){return this.currentLanguage=this.detectBrowserLanguage(),await this.loadMessages(this.currentLanguage),this.applyLanguageToDocument(),this}detectBrowserLanguage(){const e=localStorage.getItem("selectedLanguage");if(e&&k.includes(e))return e;const t=navigator.languages||[navigator.language||navigator.userLanguage];for(const n of t){const a=n.split("-")[0].toLowerCase();if(k.includes(a))return console.log(`[i18n] Browser language detected: ${a}`),a}return console.log(`[i18n] No matching language found, using default: ${y}`),y}async loadMessages(e){try{const t=await fetch(`/_locales/${e}/messages.json`);if(!t.ok)throw new Error(`Failed to load ${e} messages`);this.messages=await t.json(),this.isLoaded=!0,console.log(`[i18n] Loaded messages for: ${e}`)}catch(t){console.error(`[i18n] Error loading ${e}:`,t),e!==y&&(console.log(`[i18n] Falling back to ${y}`),await this.loadMessages(y))}}getLanguage(){return this.currentLanguage}async setLanguage(e){return k.includes(e)?(this.currentLanguage=e,localStorage.setItem("selectedLanguage",e),await this.loadMessages(e),this.applyLanguageToDocument(),this.translatePage(),!0):(console.warn(`[i18n] Language ${e} not supported`),!1)}applyLanguageToDocument(){document.documentElement.lang=this.currentLanguage}t(e){return this.isLoaded?this.messages[e]||e:(console.warn("[i18n] Messages not loaded yet"),e)}translatePage(){this.isLoaded&&(document.querySelectorAll("[data-i18n]").forEach(e=>{const t=e.getAttribute("data-i18n"),n=this.t(t);e.tagName==="INPUT"||e.tagName==="TEXTAREA"||(e.textContent=n)}),document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>{const t=e.getAttribute("data-i18n-placeholder");e.placeholder=this.t(t)}),document.querySelectorAll("[data-i18n-title]").forEach(e=>{const t=e.getAttribute("data-i18n-title");e.title=this.t(t)}))}getSupportedLanguages(){return[{code:"it",label:"Italiano",flag:"🇮🇹"},{code:"en",label:"English",flag:"🇬🇧"},{code:"es",label:"Español",flag:"🇪🇸"},{code:"fr",label:"Français",flag:"🇫🇷"},{code:"de",label:"Deutsch",flag:"🇩🇪"}]}}const r=new C,v={1639250:"Isola di Minorca IT",3220593:"Isola di Formentera",3337668:"Isola di Lanzarote",3349565:"Isola di Minorca EN",3349567:"Isola di Minorca ES",3335968:"Vacanze nel Mediterraneo"},E={1639250:["Allianz Global Assistance","AXA Assistance","Barceló Hotels & Resorts","BeGood - Trattamento di Bellezza da Indossare","Columbus Assicurazioni","Direct Ferries IT","eDreams","Grandi Navi Veloci IT","HUMANTE Amore gel lubrificante","ORBIS Lifestyle","Viaggi in crociera","Viaggisicuri","Vueling IT","Weweed","Yalla Yalla"],3220593:["À La Folie","eDreams","Vueling IT","Weweed"],3337668:["Direct Ferries IT","eDreams","Vueling IT","Weweed"],3349565:["30% PLUS Commissions Performance Web Hosting","Airport Parking Luton","Compare Cheap Airport Parking Prices","Compare Parking Prices","Direct Ferries UK","Muslim Aid","One 2 One Flights UK","Vueling UK"],3349567:["My Tea Moments - Té e Infusiones Online"]},f={1639250:{"Allianz Global Assistance":"https://clk.tradedoubler.com/click?p=72847&a=1639250","AXA Assistance":"https://clk.tradedoubler.com/click?p=261028&a=1639250","Barceló Hotels & Resorts":"https://clk.tradedoubler.com/click?p=277498&a=1639250","BeGood - Trattamento di Bellezza da Indossare":"https://clk.tradedoubler.com/click?p=346681&a=1639250","Columbus Assicurazioni":"https://clk.tradedoubler.com/click?p=270116&a=1639250","Direct Ferries IT":"https://clk.tradedoubler.com/click?p=275606&a=1639250",eDreams:"https://clk.tradedoubler.com/click?p=17269&a=1639250","Grandi Navi Veloci IT":"https://clk.tradedoubler.com/click?p=255412&a=1639250","HUMANTE Amore gel lubrificante":"https://clk.tradedoubler.com/click?p=352803&a=1639250","ORBIS Lifestyle":"https://clk.tradedoubler.com/click?p=351047&a=1639250","Viaggi in crociera":"https://clk.tradedoubler.com/click?p=282015&a=1639250",Viaggisicuri:"https://clk.tradedoubler.com/click?p=309891&a=1639250","Vueling IT":"https://clk.tradedoubler.com/click?p=288053&a=1639250",Weweed:"https://clk.tradedoubler.com/click?p=343473&a=1639250","Yalla Yalla":"https://clk.tradedoubler.com/click?p=218733&a=1639250"},3220593:{"À La Folie":"https://clk.tradedoubler.com/click?p=348934&a=3220593",eDreams:"https://clk.tradedoubler.com/click?p=17269&a=3220593","Vueling IT":"https://clk.tradedoubler.com/click?p=288053&a=3220593",Weweed:"https://clk.tradedoubler.com/click?p=343473&a=3220593"},3337668:{"Direct Ferries IT":"https://clk.tradedoubler.com/click?p=275606&a=3337668",eDreams:"https://clk.tradedoubler.com/click?p=17269&a=3337668","Vueling IT":"https://clk.tradedoubler.com/click?p=288053&a=3337668",Weweed:"https://clk.tradedoubler.com/click?p=343473&a=3337668"},3349565:{"30% PLUS Commissions Performance Web Hosting":"https://clk.tradedoubler.com/click?p=355894&a=3349565","Airport Parking Luton":"https://clk.tradedoubler.com/click?p=343105&a=3349565","Compare Cheap Airport Parking Prices":"https://clk.tradedoubler.com/click?p=340817&a=3349565","Compare Parking Prices":"https://clk.tradedoubler.com/click?p=338693&a=3349565","Direct Ferries UK":"https://clk.tradedoubler.com/click?p=275605&a=3349565","Muslim Aid":"https://clk.tradedoubler.com/click?p=287611&a=3349565","One 2 One Flights UK":"https://clk.tradedoubler.com/click?p=339657&a=3349565","Vueling UK":"https://clk.tradedoubler.com/click?p=320047&a=3349565"},3349567:{"My Tea Moments - Té e Infusiones Online":"https://clk.tradedoubler.com/click?p=357725&a=3349567"}},L=[{name:"Coches Menorca",urls:{it:"https://cochesmenorca.es/it/?agentId=3",es:"https://cochesmenorca.es/?agentId=3",en:"https://cochesmenorca.es/en/?agentId=3",fr:"https://cochesmenorca.es/en/?agentId=3",de:"https://cochesmenorca.es/en/?agentId=3"}},{name:"Menorca Rent",urls:{it:"https://www.menorcarent.com/it/?agentId=15",es:"https://www.menorcarent.com/?agentId=15",en:"https://www.menorcarent.com/en/?agentId=15",fr:"https://www.menorcarent.com/fr/?agentId=15",de:"https://www.menorcarent.com/en/?agentId=15"}},{name:"Autos Xoroi",urls:{it:"http://www.alquilercochesmenorca.com/it/?link=ISOLADIMINORCA",es:"http://www.alquilercochesmenorca.com/es/?link=ISOLADIMINORCA",en:"http://www.alquilercochesmenorca.com/?link=ISOLADIMINORCA",fr:"http://www.alquilercochesmenorca.com/fr/?link=ISOLADIMINORCA",de:"http://www.alquilercochesmenorca.com/?link=ISOLADIMINORCA"}},{name:"HIPER Rent a Car",urls:{it:"https://hiperrentacar.com/it/?colaborador=LO-0495108",es:"https://hiperrentacar.com/es/?colaborador=LO-0495108",en:"https://hiperrentacar.com/en/?colaborador=LO-0495108",fr:"https://hiperrentacar.com/fr/?colaborador=LO-0495108",de:"https://hiperrentacar.com/de/?colaborador=LO-0495108"}},{name:"Rentalcars",urls:{it:"https://www.rentalcars.com/it/?affiliateCode=latitudine983",es:"https://www.rentalcars.com/es/?affiliateCode=latitudine983",en:"https://www.rentalcars.com/en/?affiliateCode=latitudine983",fr:"https://www.rentalcars.com/fr/?affiliateCode=latitudine983",de:"https://www.rentalcars.com/de/?affiliateCode=latitudine983"}}],P={1639250:{"Allianz Global Assistance":["https://www.allianz-assistance.it/"],"AXA Assistance":["https://www.assicurazione-viaggio.axa-assistance.it/"],"Barceló Hotels & Resorts":["https://www.barcelo.com/"],"Columbus Assicurazioni":["https://www.columbusassicurazioni.it/"],"Direct Ferries IT":["https://www.directferries"],eDreams:["https://www.edreams.it/","https://rentacar.edreams.it/","https://navette.edreams.it","https://hotels.edreams.it/"],"Grandi Navi Veloci IT":["https://www.gnv.it/"],Viaggisicuri:["https://www.viaggisicuri.com/"],"Vueling IT":["https://www.vueling.com/","https://cars.vueling.com","https://hotel.vueling.com/","https://activities.vueling.com/","https://parking.vueling.com/"],Weweed:["https://prodotti-cannabis.it/"],"Yalla Yalla":["https://www.yallayalla.it/"]},3220593:{"À La Folie":["https://alafolie.it/"],eDreams:["https://www.edreams.it/","https://rentacar.edreams.it/"],"Vueling IT":["https://www.vueling.com/"],Weweed:["https://prodotti-cannabis.it/"]},3337668:{"Direct Ferries IT":["https://www.directferries"],eDreams:["https://www.edreams.it/"],"Vueling IT":["https://www.vueling.com/"],Weweed:["https://prodotti-cannabis.it/"]},3349565:{"Vueling UK":["https://www.vueling.com/"]},3349567:{"My Tea Moments - Té e Infusiones Online":["https://myteamoments.com/"]}};class B{generateDeepLink(e,t,n){let a;try{a=new URL(e)}catch{return{success:!1,error:"invalidUrl"}}const s=this.getPartnerBaseLink(t,n);if(!s)return{success:!1,error:"Programma o partner non trovato"};if(!this.validateUrl(a.href,t,n))return{success:!1,error:`URL non valido per ${n}`};const i=encodeURIComponent(a.href);return{success:!0,link:`${s}&url=${i}`}}getPartnerBaseLink(e,t){return f[e]?.[t]||null}validateUrl(e,t,n){const a=P[t]?.[n];return a?a.some(s=>e.includes(s)):!0}getPartnersForIsland(e){const t=f[e];return t?Object.keys(t).map(n=>({name:n,link:t[n]})):[]}getIslandName(e){return v[e]||"Isola Sconosciuta"}getAllIslands(){return Object.entries(v).map(([e,t])=>({code:e,name:t,displayName:`${t} - ${e}`}))}async copyToClipboard(e){try{return await navigator.clipboard.writeText(e),!0}catch{try{const n=document.createElement("textarea");return n.value=e,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select(),document.execCommand("copy"),document.body.removeChild(n),!0}catch{return!1}}}openLink(e){window.open(e,"_blank","noopener,noreferrer")}generateGetYourGuideLink(e){try{return new URL(e).hostname.match(/getyourguide\.[a-z]{2,}/i)?{success:!0,link:`https://www.getyourguide.com/click/track?partner_id=32A3BBP4J4PPZMHRC1G0&url=${encodeURIComponent(e)}`}:{success:!1,error:"validGetYourGuideURL"}}catch{return{success:!1,error:"invalidUrl"}}}generateCivitatisLink(e){try{return new URL(e).hostname.match(/civitatis\.[a-z]{2,}/i)?{success:!0,link:`https://www.civitatis.com/affiliate/?aid=52698&url=${encodeURIComponent(e)}`}:{success:!1,error:"validCivitatisURL"}}catch{return{success:!1,error:"invalidUrl"}}}}const m=new B;class T{constructor(){this.container=null}init(){if(!this.container&&(this.container=document.createElement("div"),this.container.id="notification-container",this.container.style.cssText=`
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    `,document.body.appendChild(this.container),!document.getElementById("toast-styles"))){const e=document.createElement("style");e.id="toast-styles",e.textContent=`
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
      `,document.head.appendChild(e)}}show(e,t="info",n=3e3){this.init();const a=document.createElement("div"),s={success:"✓",error:"✕",warning:"⚠",info:"ℹ"},i={success:{bg:"#d4edda",border:"#28a745",text:"#155724"},error:{bg:"#f8d7da",border:"#dc3545",text:"#721c24"},warning:{bg:"#fff3cd",border:"#ffc107",text:"#856404"},info:{bg:"#d1ecf1",border:"#17a2b8",text:"#0c5460"}},l=i[t]||i.info;return a.style.cssText=`
      display: flex; align-items: center; gap: 12px;
      padding: 14px 20px;
      background-color: ${l.bg};
      border-left: 4px solid ${l.border};
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      color: ${l.text};
      font-size: 14px; font-weight: 500;
      animation: slideIn 0.3s ease;
      cursor: pointer;
    `,a.innerHTML=`<span style="font-size: 18px;">${s[t]}</span><span>${e}</span>`,a.addEventListener("click",()=>this.dismiss(a)),this.container.appendChild(a),n>0&&setTimeout(()=>this.dismiss(a),n),a}dismiss(e){e.style.animation="slideOut 0.3s ease forwards",setTimeout(()=>e.remove(),300)}success(e,t){return this.show(e,"success",t)}error(e,t){return this.show(e,"error",t)}warning(e,t){return this.show(e,"warning",t)}info(e,t){return this.show(e,"info",t)}}const g=new T,S="https://allspainbookinglinks.s3.eu-west-3.amazonaws.com",w={hotelPage:{file:o=>`hotel_page_links_${o}.js`,variableName:o=>`links${o.toUpperCase()}`,hasSubType:!1},cityPage:{file:(o,e)=>e==="landing"?`city_landing_page_links_${o}.js`:`city_page_links_${o}.js`,variableName:(o,e)=>e==="landing"?`linksLandingCityPage${o.toUpperCase()}`:`linksCityPage${o.toUpperCase()}`,hasSubType:!0},airportPage:{file:(o,e)=>e==="landing"?`airport_landing_page_links_${o}.js`:`airport_page_links_${o}.js`,variableName:(o,e)=>e==="landing"?`linksAirportLanding${o.toUpperCase()}`:`linksAirport${o.toUpperCase()}`,hasSubType:!0},districtPage:{file:(o,e)=>e==="landing"?`district_landing_page_links_${o}.js`:`district_page_links_${o}.js`,variableName:(o,e)=>e==="landing"?`linksDistrictLandingPage${o.toUpperCase()}`:`linksDistrictPage${o.toUpperCase()}`,hasSubType:!0},islandPage:{file:(o,e)=>e==="landing"?`island_landing_page_links_${o}.js`:`island_page_links_${o}.js`,variableName:(o,e)=>e==="landing"?`linksLandingIslandPage${o.toUpperCase()}`:`linksIslandPage${o.toUpperCase()}`,hasSubType:!0},landmarkPage:{file:(o,e)=>e==="landing"?`landmark_landing_page_links_${o}.js`:`landmark_page_links_${o}.js`,variableName:(o,e)=>e==="landing"?`linksLandmarkLandingPage${o.toUpperCase()}`:`linksLandmarkPage${o.toUpperCase()}`,hasSubType:!0},regionPage:{file:(o,e)=>e==="landing"?`region_landing_page_links_${o}.js`:`region_page_links_${o}.js`,variableName:(o,e)=>e==="landing"?`linksRegionLandingPage${o.toUpperCase()}`:`linksRegionPage${o.toUpperCase()}`,hasSubType:!0}};class ${constructor(){this.dataCache=new Map,this.loadingPromises=new Map}getCacheKey(e,t,n=null){return`${e}_${t}_${n||"default"}`}async loadData(e,t,n=null){const a=this.getCacheKey(e,t,n);if(this.dataCache.has(a))return console.log(`[BookingData] Cache hit for ${a}`),this.dataCache.get(a);if(this.loadingPromises.has(a))return console.log(`[BookingData] Waiting for existing load: ${a}`),this.loadingPromises.get(a);const s=this._fetchData(e,t,n);this.loadingPromises.set(a,s);try{const i=await s;return this.dataCache.set(a,i),console.log(`[BookingData] Loaded ${i.length} items for ${a}`),i}finally{this.loadingPromises.delete(a)}}async _fetchData(e,t,n){const a=w[e];if(!a)throw new Error(`Unknown page type: ${e}`);const s=a.file(t,n),i=a.variableName(t,n),l=`${S}/${s}`;return console.log(`[BookingData] Loading script: ${l}`),console.log(`[BookingData] Expected variable: ${i}`),window[i]&&Array.isArray(window[i])?(console.log("[BookingData] Variable already exists, using cached data"),window[i]):document.querySelector(`script[src="${l}"]`)&&(await this._waitForVariable(i,2e3),window[i])?window[i]:new Promise((c,d)=>{const p=document.createElement("script");p.src=l,p.async=!0,p.className="booking-data-script",p.onload=async()=>{console.log(`[BookingData] Script loaded: ${s}`);try{await this._waitForVariable(i,3e3),window[i]&&Array.isArray(window[i])?(console.log(`[BookingData] Found ${window[i].length} items`),c(window[i])):d(new Error(`Variable ${i} not found after script load`))}catch(h){d(h)}},p.onerror=()=>{console.error(`[BookingData] Failed to load script: ${l}`),d(new Error(`Failed to load ${s}`))},document.body.appendChild(p)})}_waitForVariable(e,t=3e3){return new Promise((n,a)=>{const s=Date.now(),i=()=>{window[e]!==void 0?n():Date.now()-s>t?a(new Error(`Timeout waiting for ${e}`)):setTimeout(i,50)};i()})}normalizeText(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}search(e,t,n=50){if(!e||e.length<3)return[];const a=this.normalizeText(e),s=[];for(const i of t){if(s.length>=n)break;this.normalizeText(i[0]||"").includes(a)&&s.push(i)}return s}formatResult(e,t){const n=e[e.length-1];switch(t){case"hotelPage":return{name:e[0],subtitle:e[1]||"",url:n};case"airportPage":return{name:e[0],subtitle:e[1]||"",url:n};case"districtPage":return{name:e[0],subtitle:e[1]||"",url:n};default:return{name:e[0],subtitle:e.length>2?e[1]:"",url:n}}}hasSubType(e){return w[e]?.hasSubType||!1}clearCache(){this.dataCache.clear(),console.log("[BookingData] Cache cleared")}}const b=new $;class A{constructor(){this.currentPage="booking",this.bookingState={data:null,isLoading:!1,error:null,searchTimeout:null}}async init(){await r.init(),console.log(`[App] Language detected: ${r.getLanguage()}`),this.setupNavigation(),this.setupLanguageSelector(),this.loadPage(this.currentPage)}setupNavigation(){document.querySelectorAll("[data-page]").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),this.loadPage(t.currentTarget.dataset.page)})})}setupLanguageSelector(){const e=r.getLanguage();document.querySelector(`[data-lang="${e}"]`)?.classList.add("active"),document.querySelectorAll(".language-btn").forEach(t=>{t.addEventListener("click",async()=>{const n=t.dataset.lang;document.querySelectorAll(".language-btn").forEach(a=>a.classList.remove("active")),t.classList.add("active"),await r.setLanguage(n),b.clearCache(),this.bookingState.data=null,this.loadPage(this.currentPage),g.success(r.t("languageChanged"))})})}loadPage(e){this.currentPage=e;const t=document.getElementById("page-content");document.querySelectorAll("[data-page]").forEach(a=>{a.classList.toggle("active",a.dataset.page===e)}),({booking:()=>{t.innerHTML=this.renderBookingPage(),this.initBookingPage()},tradedoubler:()=>{t.innerHTML=this.renderTradedoublerPage(),this.initTradedoublerPage()},getyourguide:()=>{t.innerHTML=this.renderGetYourGuidePage(),this.initGetYourGuidePage()},civitatis:()=>{t.innerHTML=this.renderCivitatisPage(),this.initCivitatisPage()},carrental:()=>{t.innerHTML=this.renderCarRentalPage(),this.initCarRentalPage()},imgtool:()=>{t.innerHTML=this.renderImageToolPage(),this.initImageToolPage()}}[e]||(()=>{t.innerHTML="<p>Page not found</p>"}))(),r.translatePage()}renderBookingPage(){return`
      <div class="page-header">
        <h2 data-i18n="bookingHeader">Cerca il Deep Link di Booking</h2>
      </div>
      
      <div class="card">
        <div class="form-group">
          <label class="form-label" data-i18n="pageType">Tipo Pagina</label>
          <select id="pageTypeSelect" class="form-select">
            <option value="cityPage" data-i18n="cityPage">Pagina Città</option>
            <option value="hotelPage" data-i18n="hotelPage">Pagina Hotel</option>
            <option value="airportPage" data-i18n="airportPage">Pagina Aeroporto</option>
            <option value="districtPage" data-i18n="districtPage">Pagina Quartiere</option>
            <option value="islandPage" data-i18n="islandPage">Pagina Isola</option>
            <option value="landmarkPage" data-i18n="landmarkPage">Pagina Luogo</option>
            <option value="regionPage" data-i18n="regionPage">Pagina Regione</option>
            <option value="genericLandingPages" data-i18n="genericLandingPages">Pagina Generica</option>
          </select>
        </div>

        <div class="form-group" id="subTypeGroup">
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" name="subType" value="searchResults" checked>
              <span data-i18n="searchResultsPageLabel">Pagina Risultati</span>
            </label>
            <label class="radio-label">
              <input type="radio" name="subType" value="landing">
              <span data-i18n="landingPageLabel">Landing Page</span>
            </label>
          </div>
        </div>

        <div class="form-group" id="searchGroup">
          <input type="text" id="searchInput" class="form-control" 
                 data-i18n-placeholder="searchPlaceholder" 
                 placeholder="Cerca...">
          <div id="searchHint" class="search-hint" data-i18n="searchMinChars">Digita almeno 3 caratteri per cercare</div>
        </div>
      </div>

      <!-- Loading State -->
      <div id="loadingState" class="card mt-6 loading-card" style="display:none;">
        <div class="loading-spinner"></div>
        <span data-i18n="loadingData">Caricamento dati...</span>
      </div>

      <!-- Error State -->
      <div id="errorState" class="card mt-6 error-card" style="display:none;">
        <div class="error-icon">⚠️</div>
        <p id="errorMessage" data-i18n="errorLoadingData">Errore nel caricamento</p>
        <button id="retryBtn" class="btn btn-primary" data-i18n="retryLoad">Riprova</button>
      </div>

      <!-- Results Container -->
      <div id="resultsCard" class="card mt-6" style="display:none;">
        <div class="results-header">
          <h3 class="card-title" id="resultsTitle"></h3>
          <span id="resultsCount" class="results-count"></span>
        </div>
        <div id="resultsContainer" class="results-list"></div>
      </div>

      <!-- Generic Landing Pages -->
      <div class="card mt-6" id="landingLinksCard" style="display:none;">
        <h3 class="card-title" data-i18n="genericLandingPages">Link Generici</h3>
        <div id="landingLinks" class="link-list"></div>
      </div>
    `}async initBookingPage(){const e=document.getElementById("pageTypeSelect"),t=document.getElementById("subTypeGroup"),n=document.getElementById("searchGroup"),a=document.getElementById("searchInput"),s=document.getElementById("landingLinksCard"),i=async()=>{const c=e.value,d=c==="genericLandingPages",p=b.hasSubType(c);t.style.display=p?"block":"none",n.style.display=d?"none":"block",s.style.display=d?"block":"none",document.getElementById("resultsCard").style.display="none",document.getElementById("errorState").style.display="none",d?this.showGenericLandingPages():await this.loadBookingData()},l=()=>{clearTimeout(this.bookingState.searchTimeout),this.bookingState.searchTimeout=setTimeout(()=>{this.performSearch(a.value)},300)},u=async()=>{this.bookingState.data=null,await this.loadBookingData()};e.addEventListener("change",i),a.addEventListener("input",l),document.querySelectorAll('input[name="subType"]').forEach(c=>{c.addEventListener("change",u)}),document.getElementById("retryBtn")?.addEventListener("click",()=>this.loadBookingData()),await i()}async loadBookingData(){const e=document.getElementById("pageTypeSelect").value;if(e==="genericLandingPages")return;const t=r.getLanguage(),a=document.querySelector('input[name="subType"]:checked')?.value==="landing"?"landing":null;this.setBookingUIState("loading");try{const s=await b.loadData(e,t,a);this.bookingState.data=s,this.bookingState.error=null,this.setBookingUIState("ready"),g.success(r.t("dataLoaded"));const i=document.getElementById("searchInput")?.value;i&&i.length>=3&&this.performSearch(i)}catch(s){console.error("[Booking] Load error:",s),this.bookingState.error=s.message,this.setBookingUIState("error")}}setBookingUIState(e){const t=document.getElementById("loadingState"),n=document.getElementById("errorState"),a=document.getElementById("resultsCard"),s=document.getElementById("searchHint");t.style.display=e==="loading"?"flex":"none",n.style.display=e==="error"?"flex":"none",a.style.display="none",s&&(s.style.display=e==="ready"?"block":"none")}performSearch(e){if(!this.bookingState.data)return;const t=document.getElementById("resultsCard"),n=document.getElementById("resultsContainer"),a=document.getElementById("resultsCount"),s=document.getElementById("resultsTitle"),i=document.getElementById("searchHint");if(!e||e.length<3){t.style.display="none",i&&(i.style.display="block");return}i&&(i.style.display="none");const l=document.getElementById("pageTypeSelect").value,u=b.search(e,this.bookingState.data,50);if(u.length===0){t.style.display="block",s.textContent="",a.textContent="",n.innerHTML=`
        <div class="empty-state">
          <span class="empty-icon">🔍</span>
          <p data-i18n="noResultsFound">${r.t("noResultsFound")}</p>
        </div>
      `;return}t.style.display="block",a.textContent=`${u.length} ${r.t("resultsFound")}`,n.innerHTML=u.map(c=>{const d=b.formatResult(c,l);return`
        <div class="result-card">
          <div class="result-info">
            <span class="result-name">${this.escapeHtml(d.name)}</span>
            ${d.subtitle?`<span class="result-subtitle">${this.escapeHtml(d.subtitle)}</span>`:""}
          </div>
          <div class="result-actions">
            <button class="btn btn-sm btn-primary" data-copy="${this.escapeHtml(d.url)}">${r.t("copyLink")}</button>
            <a href="${d.url}" target="_blank" class="btn btn-sm btn-outline">${r.t("openLink")}</a>
          </div>
        </div>
      `}).join(""),n.querySelectorAll("[data-copy]").forEach(c=>{c.addEventListener("click",async()=>{const d=await m.copyToClipboard(c.dataset.copy);g[d?"success":"error"](r.t(d?"deepLinkCopied":"copyError"))})})}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}showGenericLandingPages(){const e=document.getElementById("landingLinks");document.getElementById("landingLinksCard").style.display="block",document.getElementById("resultsCard").style.display="none";const t=[{key:"homePage",url:"https://www.booking.com/index.html?aid=955564"},{key:"apartmentsPage",url:"https://www.booking.com/apartments/index.html?aid=955564"},{key:"resortsPage",url:"https://www.booking.com/resorts/index.html?aid=955564"},{key:"villasPage",url:"https://www.booking.com/villas/index.html?aid=955564"},{key:"bedAndBreakfastPage",url:"https://www.booking.com/bed-and-breakfast/index.html?aid=955564"},{key:"guestHousePage",url:"https://www.booking.com/guest-house/index.html?aid=955564"}];e.innerHTML=t.map(n=>`
      <div class="link-item">
        <span>${r.t(n.key)}</span>
        <div class="link-actions">
          <a href="${n.url}" target="_blank" class="btn btn-sm btn-outline">${r.t("openLink")}</a>
          <button class="btn btn-sm btn-primary" data-copy="${n.url}">${r.t("copyLink")}</button>
        </div>
      </div>
    `).join(""),e.querySelectorAll("[data-copy]").forEach(n=>{n.addEventListener("click",async()=>{const a=await m.copyToClipboard(n.dataset.copy);g[a?"success":"error"](r.t(a?"deepLinkCopied":"copyError"))})})}renderTradedoublerPage(){return`
      <div class="page-header">
        <h2 data-i18n="usefulTLinksHeader">I Programmi Attivi</h2>
      </div>

      <div class="card">
        <div class="form-group">
          <label class="form-label">Sito</label>
          <select id="islandSelect" class="form-select">
            <option value="" data-i18n="selectSite">Seleziona un sito</option>
            ${m.getAllIslands().map(t=>`<option value="${t.code}">${t.displayName}</option>`).join("")}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Piattaforma</label>
          <select id="platformSelect" class="form-select" disabled>
            <option value="" data-i18n="selectPlatform">Seleziona una piattaforma</option>
          </select>
        </div>

        <div id="partnerLinkContainer" class="alert alert-info" style="display:none;">
          <span id="partnerLink"></span>
        </div>

        <hr class="divider">

        <h3 class="section-title" data-i18n="generateDeepLinkSection">Genera Deep Link</h3>
        
        <div class="form-group">
          <label class="form-label" data-i18n="urlToTransform">URL da trasformare</label>
          <input type="text" id="inputUrl" class="form-control" placeholder="https://...">
        </div>

        <div class="button-group">
          <button id="generateBtn" class="btn btn-primary" data-i18n="generateLink">Genera Link</button>
        </div>

        <div id="resultContainer" class="result-container" style="display:none;">
          <label class="form-label" data-i18n="generatedDeepLink">Deep Link Generato</label>
          <div class="result-box">
            <a id="resultLink" href="#" target="_blank" class="result-link"></a>
          </div>
          <div class="button-group mt-4">
            <button id="copyResultBtn" class="btn btn-success" data-i18n="copyLink">Copia Link</button>
            <button id="openResultBtn" class="btn btn-outline" data-i18n="openLink">Apri Link</button>
          </div>
        </div>
      </div>
    `}initTradedoublerPage(){const e=document.getElementById("islandSelect"),t=document.getElementById("platformSelect"),n=document.getElementById("partnerLinkContainer"),a=document.getElementById("partnerLink"),s=document.getElementById("generateBtn"),i=document.getElementById("inputUrl"),l=document.getElementById("resultContainer"),u=document.getElementById("resultLink");e.addEventListener("change",()=>{const c=e.value;t.innerHTML=`<option value="">${r.t("selectPlatform")}</option>`,c?((E[c]||[]).forEach(d=>{t.appendChild(new Option(d,d))}),t.disabled=!1):t.disabled=!0,n.style.display="none",l.style.display="none"}),t.addEventListener("change",()=>{const c=e.value,d=t.value;if(c&&d){const p=m.getPartnerBaseLink(c,d);p&&(a.innerHTML=`<a href="${p}" target="_blank">${p}</a>`,n.style.display="block")}else n.style.display="none"}),s.addEventListener("click",()=>{const c=e.value,d=t.value,p=i.value.trim();if(!c||!d){g.warning(r.t("selectSiteAndPlatform"));return}if(!p){g.warning(r.t("enterUrl"));return}const h=m.generateDeepLink(p,c,d);h.success?(u.href=h.link,u.textContent=h.link,l.style.display="block",g.success(r.t("deepLinkGenerated"))):g.error(r.t(h.error)||h.error)}),document.getElementById("copyResultBtn")?.addEventListener("click",async()=>{const c=await m.copyToClipboard(u.href);g[c?"success":"error"](r.t(c?"deepLinkCopied":"copyError"))}),document.getElementById("openResultBtn")?.addEventListener("click",()=>{m.openLink(u.href)})}renderGetYourGuidePage(){return`
      <div class="page-header">
        <h2 data-i18n="GetYourGuideLink">Deep Link GetYourGuide</h2>
      </div>

      <div class="card">
        <div class="form-group">
          <label class="form-label" data-i18n="insertGetYourGuideLink">Inserisci il link</label>
          <input type="text" id="gygInput" class="form-control" placeholder="https://www.getyourguide.com/...">
        </div>

        <div class="button-group">
          <button id="gygGenerateBtn" class="btn btn-primary" data-i18n="generateLink">Genera Link</button>
        </div>

        <div id="gygResult" class="result-container" style="display:none;">
          <label class="form-label" data-i18n="generatedDeepLink">Deep Link Generato</label>
          <div class="result-box">
            <a id="gygResultLink" href="#" target="_blank" class="result-link"></a>
          </div>
          <div class="button-group mt-4">
            <button id="gygCopyBtn" class="btn btn-success" data-i18n="copyLink">Copia Link</button>
            <button id="gygOpenBtn" class="btn btn-outline" data-i18n="openLink">Apri Link</button>
          </div>
        </div>
      </div>
    `}initGetYourGuidePage(){const e=document.getElementById("gygInput"),t=document.getElementById("gygGenerateBtn"),n=document.getElementById("gygResult"),a=document.getElementById("gygResultLink");t.addEventListener("click",()=>{const s=e.value.trim();if(!s){g.warning(r.t("validGetYourGuideURL"));return}const i=m.generateGetYourGuideLink(s);i.success?(a.href=i.link,a.textContent=i.link,n.style.display="block",g.success(r.t("deepLinkGenerated"))):g.error(r.t(i.error))}),document.getElementById("gygCopyBtn")?.addEventListener("click",async()=>{const s=await m.copyToClipboard(a.href);g[s?"success":"error"](r.t(s?"deepLinkCopied":"copyError"))}),document.getElementById("gygOpenBtn")?.addEventListener("click",()=>{m.openLink(a.href)})}renderCivitatisPage(){return`
      <div class="page-header">
        <h2 data-i18n="CivitatisLink">Deep Link Civitatis</h2>
      </div>

      <div class="card">
        <div class="form-group">
          <label class="form-label" data-i18n="insertCivitatisLink">Inserisci il link</label>
          <input type="text" id="civInput" class="form-control" placeholder="https://www.civitatis.com/...">
        </div>

        <div class="button-group">
          <button id="civGenerateBtn" class="btn btn-primary" data-i18n="generateLink">Genera Link</button>
        </div>

        <div id="civResult" class="result-container" style="display:none;">
          <label class="form-label" data-i18n="generatedDeepLink">Deep Link Generato</label>
          <div class="result-box">
            <a id="civResultLink" href="#" target="_blank" class="result-link"></a>
          </div>
          <div class="button-group mt-4">
            <button id="civCopyBtn" class="btn btn-success" data-i18n="copyLink">Copia Link</button>
            <button id="civOpenBtn" class="btn btn-outline" data-i18n="openLink">Apri Link</button>
          </div>
        </div>
      </div>
    `}initCivitatisPage(){const e=document.getElementById("civInput"),t=document.getElementById("civGenerateBtn"),n=document.getElementById("civResult"),a=document.getElementById("civResultLink");t.addEventListener("click",()=>{const s=e.value.trim();if(!s){g.warning(r.t("validCivitatisURL"));return}const i=m.generateCivitatisLink(s);i.success?(a.href=i.link,a.textContent=i.link,n.style.display="block",g.success(r.t("deepLinkGenerated"))):g.error(r.t(i.error))}),document.getElementById("civCopyBtn")?.addEventListener("click",async()=>{const s=await m.copyToClipboard(a.href);g[s?"success":"error"](r.t(s?"deepLinkCopied":"copyError"))}),document.getElementById("civOpenBtn")?.addEventListener("click",()=>{m.openLink(a.href)})}renderCarRentalPage(){return`
      <div class="page-header">
        <h2 data-i18n="carRentalHeader">Noleggio Auto a Minorca</h2>
      </div>

      <div class="card">
        <div class="form-group">
          <label class="form-label" data-i18n="selectProvider">Seleziona Noleggio</label>
          <select id="carProviderSelect" class="form-select">
            ${L.map((e,t)=>`<option value="${t}">${e.name}</option>`).join("")}
          </select>
        </div>

        <div id="carLinkContainer" class="result-container">
          <label class="form-label" data-i18n="affiliateLink">Link Affiliato</label>
          <div class="result-box">
            <a id="carResultLink" href="#" target="_blank" class="result-link"></a>
          </div>
          <div class="button-group mt-4">
            <button id="carCopyBtn" class="btn btn-success" data-i18n="copyLink">Copia Link</button>
            <button id="carOpenBtn" class="btn btn-outline" data-i18n="openLink">Apri Link</button>
          </div>
        </div>

        <p class="note text-muted" style="margin-top: 16px; font-style: italic;" data-i18n="carRentalNotice">I link puntano alle homepage delle rispettive piattaforme di noleggio auto.</p>
      </div>
    `}initCarRentalPage(){const e=document.getElementById("carProviderSelect"),t=document.getElementById("carResultLink"),n=()=>{const a=L[e.value],s=r.getLanguage(),i=a.urls[s]||a.urls.en||Object.values(a.urls)[0];t.href=i,t.textContent=i};e.addEventListener("change",n),n(),document.getElementById("carCopyBtn")?.addEventListener("click",async()=>{const a=await m.copyToClipboard(t.href);g[a?"success":"error"](r.t(a?"deepLinkCopied":"copyError"))}),document.getElementById("carOpenBtn")?.addEventListener("click",()=>{m.openLink(t.href)})}renderImageToolPage(){return`
      <div class="page-header">
        <h2 data-i18n="imageToolHeader">Compressore di Immagini</h2>
      </div>

      <div class="card">
        <div id="dropZone" class="drop-zone">
          <div class="drop-zone-content">
            <span class="drop-zone-icon">📷</span>
            <p data-i18n="dropZoneText">Trascina qui le immagini o clicca per selezionarle</p>
            <input type="file" id="imageInput" multiple accept="image/*" style="display:none;">
          </div>
          <div id="dropZoneProgress" class="drop-zone-progress" style="display:none;">
            <div class="progress-bar"><div class="progress-bar-fill"></div></div>
            <span class="progress-text">0%</span>
          </div>
        </div>

        <div class="form-group mt-6">
          <label class="form-label" data-i18n="compressionQuality">Qualità Compressione</label>
          <div class="slider-container">
            <input type="range" id="qualitySlider" min="10" max="95" value="75" class="slider">
            <span id="qualityValue" class="slider-value">75%</span>
          </div>
          <p class="text-muted text-sm" data-i18n="qualityHint">Valori più bassi = file più piccoli, qualità ridotta</p>
        </div>

        <div class="form-group">
          <label class="form-label" data-i18n="outputFormat">Formato Output</label>
          <select id="formatSelect" class="form-select">
            <option value="image/jpeg">JPEG (consigliato)</option>
            <option value="image/webp">WebP (moderno)</option>
            <option value="image/png">PNG (lossless)</option>
          </select>
        </div>

        <p class="note text-muted" style="font-style: italic;" data-i18n="imageToolNotice">La compressione avviene localmente nel browser. Le immagini non vengono caricate su nessun server.</p>
      </div>

      <div id="imagesContainer" class="images-grid mt-6"></div>

      <div id="downloadAllContainer" class="card mt-6" style="display:none;">
        <div class="flex-between">
          <div>
            <span id="totalStats" class="text-muted"></span>
          </div>
          <div class="button-group">
            <button id="clearAllBtn" class="btn btn-outline" data-i18n="clearAll">Cancella Tutto</button>
            <button id="downloadAllBtn" class="btn btn-success" data-i18n="downloadAll">Scarica Tutto (ZIP)</button>
          </div>
        </div>
      </div>
    `}initImageToolPage(){const e=document.getElementById("dropZone"),t=document.getElementById("imageInput"),n=document.getElementById("qualitySlider"),a=document.getElementById("qualityValue");document.getElementById("formatSelect");const s=document.getElementById("imagesContainer"),i=document.getElementById("downloadAllContainer");this.compressedImages=[],n.addEventListener("input",()=>{a.textContent=`${n.value}%`}),e.addEventListener("click",()=>t.click()),["dragenter","dragover","dragleave","drop"].forEach(l=>{e.addEventListener(l,u=>{u.preventDefault(),u.stopPropagation()})}),e.addEventListener("dragenter",()=>e.classList.add("drag-over")),e.addEventListener("dragover",()=>e.classList.add("drag-over")),e.addEventListener("dragleave",()=>e.classList.remove("drag-over")),e.addEventListener("drop",l=>{e.classList.remove("drag-over");const u=l.dataTransfer.files;this.processImages(u)}),t.addEventListener("change",()=>{this.processImages(t.files)}),document.getElementById("clearAllBtn")?.addEventListener("click",()=>{this.compressedImages=[],s.innerHTML="",i.style.display="none"}),document.getElementById("downloadAllBtn")?.addEventListener("click",async()=>{this.compressedImages.length!==0&&await this.downloadAllAsZip()})}async processImages(e){const t=document.getElementById("qualitySlider").value/100,n=document.getElementById("formatSelect").value,a=document.getElementById("imagesContainer"),s=document.getElementById("downloadAllContainer");for(const i of e)if(i.type.startsWith("image/"))try{const l=await this.compressImage(i,t,n);this.compressedImages.push(l),this.renderImageCard(l,a),this.updateTotalStats(),s.style.display="block"}catch(l){console.error("Compression error:",l),g.error(`Errore: ${i.name}`)}}compressImage(e,t,n){return new Promise((a,s)=>{const i=new FileReader;i.onload=l=>{const u=new Image;u.onload=()=>{const c=document.createElement("canvas");c.width=u.naturalWidth,c.height=u.naturalHeight,c.getContext("2d").drawImage(u,0,0),c.toBlob(p=>{if(!p){s(new Error("Compression failed"));return}const h=n==="image/webp"?"webp":n==="image/png"?"png":"jpg",I=e.name.replace(/\.[^/.]+$/,"");a({originalName:e.name,compressedName:`${I}_compressed.${h}`,originalSize:e.size,compressedSize:p.size,reduction:((1-p.size/e.size)*100).toFixed(1),blob:p,url:URL.createObjectURL(p)})},n,t)},u.onerror=s,u.src=l.target.result},i.onerror=s,i.readAsDataURL(e)})}renderImageCard(e,t){const n=document.createElement("div");n.className="image-card";const a=i=>i>1024*1024?`${(i/1024/1024).toFixed(2)} MB`:`${(i/1024).toFixed(1)} KB`,s=parseFloat(e.reduction)>50?"text-success":parseFloat(e.reduction)>20?"text-warning":"text-muted";n.innerHTML=`
      <img src="${e.url}" alt="${e.originalName}" class="image-preview">
      <div class="image-info">
        <span class="image-name">${this.escapeHtml(e.originalName)}</span>
        <div class="image-stats">
          <span>${a(e.originalSize)} → ${a(e.compressedSize)}</span>
          <span class="${s}">-${e.reduction}%</span>
        </div>
      </div>
      <div class="image-actions">
        <button class="btn btn-sm btn-primary download-btn">${r.t("download")}</button>
        <button class="btn btn-sm btn-outline remove-btn">✕</button>
      </div>
    `,n.querySelector(".download-btn").addEventListener("click",()=>{const i=document.createElement("a");i.href=e.url,i.download=e.compressedName,i.click()}),n.querySelector(".remove-btn").addEventListener("click",()=>{const i=this.compressedImages.findIndex(l=>l.url===e.url);i>-1&&(URL.revokeObjectURL(e.url),this.compressedImages.splice(i,1),n.remove(),this.updateTotalStats(),this.compressedImages.length===0&&(document.getElementById("downloadAllContainer").style.display="none"))}),t.appendChild(n)}updateTotalStats(){const e=document.getElementById("totalStats");if(!e||this.compressedImages.length===0)return;const t=this.compressedImages.reduce((i,l)=>i+l.originalSize,0),n=this.compressedImages.reduce((i,l)=>i+l.compressedSize,0),a=((1-n/t)*100).toFixed(1),s=i=>i>1024*1024?`${(i/1024/1024).toFixed(2)} MB`:`${(i/1024).toFixed(1)} KB`;e.textContent=`${this.compressedImages.length} ${r.t("images")} • ${s(t)} → ${s(n)} (-${a}%)`}async downloadAllAsZip(){if(!window.JSZip){const a=document.createElement("script");a.src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",document.head.appendChild(a),await new Promise(s=>a.onload=s)}const e=new JSZip;for(const a of this.compressedImages)e.file(a.compressedName,a.blob);const t=await e.generateAsync({type:"blob"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download="compressed_images.zip",n.click(),URL.revokeObjectURL(n.href),g.success(r.t("downloadStarted"))}}document.addEventListener("DOMContentLoaded",()=>{new A().init()});
