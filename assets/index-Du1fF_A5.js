(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}})();const b=["it","en","es","fr","de"],k="it";class w{constructor(){this.messages={},this.currentLanguage=k,this.isLoaded=!1}async init(){return this.currentLanguage=this.detectBrowserLanguage(),await this.loadMessages(this.currentLanguage),this.applyLanguageToDocument(),this}detectBrowserLanguage(){const e=localStorage.getItem("selectedLanguage");if(e&&b.includes(e))return e;const t=navigator.languages||[navigator.language||navigator.userLanguage];for(const n of t){const a=n.split("-")[0].toLowerCase();if(b.includes(a))return console.log(`[i18n] Browser language detected: ${a}`),a}return console.log(`[i18n] No matching language found, using default: ${k}`),k}async loadMessages(e){try{const t=await fetch(`/_locales/${e}/messages.json`);if(!t.ok)throw new Error(`Failed to load ${e} messages`);this.messages=await t.json(),this.isLoaded=!0,console.log(`[i18n] Loaded messages for: ${e}`)}catch(t){console.error(`[i18n] Error loading ${e}:`,t),e!==k&&(console.log(`[i18n] Falling back to ${k}`),await this.loadMessages(k))}}getLanguage(){return this.currentLanguage}async setLanguage(e){return b.includes(e)?(this.currentLanguage=e,localStorage.setItem("selectedLanguage",e),await this.loadMessages(e),this.applyLanguageToDocument(),this.translatePage(),!0):(console.warn(`[i18n] Language ${e} not supported`),!1)}applyLanguageToDocument(){document.documentElement.lang=this.currentLanguage}t(e){return this.isLoaded?this.messages[e]||e:(console.warn("[i18n] Messages not loaded yet"),e)}translatePage(){this.isLoaded&&(document.querySelectorAll("[data-i18n]").forEach(e=>{const t=e.getAttribute("data-i18n"),n=this.t(t);e.tagName==="INPUT"||e.tagName==="TEXTAREA"||(e.textContent=n)}),document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>{const t=e.getAttribute("data-i18n-placeholder");e.placeholder=this.t(t)}),document.querySelectorAll("[data-i18n-title]").forEach(e=>{const t=e.getAttribute("data-i18n-title");e.title=this.t(t)}))}getSupportedLanguages(){return[{code:"it",label:"Italiano",flag:"🇮🇹"},{code:"en",label:"English",flag:"🇬🇧"},{code:"es",label:"Español",flag:"🇪🇸"},{code:"fr",label:"Français",flag:"🇫🇷"},{code:"de",label:"Deutsch",flag:"🇩🇪"}]}}const o=new w,f={1639250:"Isola di Minorca IT",3220593:"Isola di Formentera",3337668:"Isola di Lanzarote",3349565:"Isola di Minorca EN",3349567:"Isola di Minorca ES",3335968:"Vacanze nel Mediterraneo"},P={1639250:["Allianz Global Assistance","AXA Assistance","Barceló Hotels & Resorts","BeGood - Trattamento di Bellezza da Indossare","Columbus Assicurazioni","Direct Ferries IT","eDreams","Grandi Navi Veloci IT","HUMANTE Amore gel lubrificante","ORBIS Lifestyle","Viaggi in crociera","Viaggisicuri","Vueling IT","Weweed","Yalla Yalla"],3220593:["À La Folie","eDreams","Vueling IT","Weweed"],3337668:["Direct Ferries IT","eDreams","Vueling IT","Weweed"],3349565:["30% PLUS Commissions Performance Web Hosting","Airport Parking Luton","Compare Cheap Airport Parking Prices","Compare Parking Prices","Direct Ferries UK","Muslim Aid","One 2 One Flights UK","Vueling UK"],3349567:["My Tea Moments - Té e Infusiones Online"]},v={1639250:{"Allianz Global Assistance":"https://clk.tradedoubler.com/click?p=72847&a=1639250","AXA Assistance":"https://clk.tradedoubler.com/click?p=261028&a=1639250","Barceló Hotels & Resorts":"https://clk.tradedoubler.com/click?p=277498&a=1639250","BeGood - Trattamento di Bellezza da Indossare":"https://clk.tradedoubler.com/click?p=346681&a=1639250","Columbus Assicurazioni":"https://clk.tradedoubler.com/click?p=270116&a=1639250","Direct Ferries IT":"https://clk.tradedoubler.com/click?p=275606&a=1639250",eDreams:"https://clk.tradedoubler.com/click?p=17269&a=1639250","Grandi Navi Veloci IT":"https://clk.tradedoubler.com/click?p=255412&a=1639250","HUMANTE Amore gel lubrificante":"https://clk.tradedoubler.com/click?p=352803&a=1639250","ORBIS Lifestyle":"https://clk.tradedoubler.com/click?p=351047&a=1639250","Viaggi in crociera":"https://clk.tradedoubler.com/click?p=282015&a=1639250",Viaggisicuri:"https://clk.tradedoubler.com/click?p=309891&a=1639250","Vueling IT":"https://clk.tradedoubler.com/click?p=288053&a=1639250",Weweed:"https://clk.tradedoubler.com/click?p=343473&a=1639250","Yalla Yalla":"https://clk.tradedoubler.com/click?p=218733&a=1639250"},3220593:{"À La Folie":"https://clk.tradedoubler.com/click?p=348934&a=3220593",eDreams:"https://clk.tradedoubler.com/click?p=17269&a=3220593","Vueling IT":"https://clk.tradedoubler.com/click?p=288053&a=3220593",Weweed:"https://clk.tradedoubler.com/click?p=343473&a=3220593"},3337668:{"Direct Ferries IT":"https://clk.tradedoubler.com/click?p=275606&a=3337668",eDreams:"https://clk.tradedoubler.com/click?p=17269&a=3337668","Vueling IT":"https://clk.tradedoubler.com/click?p=288053&a=3337668",Weweed:"https://clk.tradedoubler.com/click?p=343473&a=3337668"},3349565:{"30% PLUS Commissions Performance Web Hosting":"https://clk.tradedoubler.com/click?p=355894&a=3349565","Airport Parking Luton":"https://clk.tradedoubler.com/click?p=343105&a=3349565","Compare Cheap Airport Parking Prices":"https://clk.tradedoubler.com/click?p=340817&a=3349565","Compare Parking Prices":"https://clk.tradedoubler.com/click?p=338693&a=3349565","Direct Ferries UK":"https://clk.tradedoubler.com/click?p=275605&a=3349565","Muslim Aid":"https://clk.tradedoubler.com/click?p=287611&a=3349565","One 2 One Flights UK":"https://clk.tradedoubler.com/click?p=339657&a=3349565","Vueling UK":"https://clk.tradedoubler.com/click?p=320047&a=3349565"},3349567:{"My Tea Moments - Té e Infusiones Online":"https://clk.tradedoubler.com/click?p=357725&a=3349567"}},C={1639250:{"Allianz Global Assistance":["https://www.allianz-assistance.it/"],"AXA Assistance":["https://www.assicurazione-viaggio.axa-assistance.it/"],"Barceló Hotels & Resorts":["https://www.barcelo.com/"],"Columbus Assicurazioni":["https://www.columbusassicurazioni.it/"],"Direct Ferries IT":["https://www.directferries"],eDreams:["https://www.edreams.it/","https://rentacar.edreams.it/","https://navette.edreams.it","https://hotels.edreams.it/"],"Grandi Navi Veloci IT":["https://www.gnv.it/"],Viaggisicuri:["https://www.viaggisicuri.com/"],"Vueling IT":["https://www.vueling.com/","https://cars.vueling.com","https://hotel.vueling.com/","https://activities.vueling.com/","https://parking.vueling.com/"],Weweed:["https://prodotti-cannabis.it/"],"Yalla Yalla":["https://www.yallayalla.it/"]},3220593:{"À La Folie":["https://alafolie.it/"],eDreams:["https://www.edreams.it/","https://rentacar.edreams.it/"],"Vueling IT":["https://www.vueling.com/"],Weweed:["https://prodotti-cannabis.it/"]},3337668:{"Direct Ferries IT":["https://www.directferries"],eDreams:["https://www.edreams.it/"],"Vueling IT":["https://www.vueling.com/"],Weweed:["https://prodotti-cannabis.it/"]},3349565:{"Vueling UK":["https://www.vueling.com/"]},3349567:{"My Tea Moments - Té e Infusiones Online":["https://myteamoments.com/"]}};class I{generateDeepLink(e,t,n){let a;try{a=new URL(e)}catch{return{success:!1,error:"invalidUrl"}}const i=this.getPartnerBaseLink(t,n);if(!i)return{success:!1,error:"Programma o partner non trovato"};if(!this.validateUrl(a.href,t,n))return{success:!1,error:`URL non valido per ${n}`};const s=encodeURIComponent(a.href);return{success:!0,link:`${i}&url=${s}`}}getPartnerBaseLink(e,t){return v[e]?.[t]||null}validateUrl(e,t,n){const a=C[t]?.[n];return a?a.some(i=>e.includes(i)):!0}getPartnersForIsland(e){const t=v[e];return t?Object.keys(t).map(n=>({name:n,link:t[n]})):[]}getIslandName(e){return f[e]||"Isola Sconosciuta"}getAllIslands(){return Object.entries(f).map(([e,t])=>({code:e,name:t,displayName:`${t} - ${e}`}))}async copyToClipboard(e){try{return await navigator.clipboard.writeText(e),!0}catch{try{const n=document.createElement("textarea");return n.value=e,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select(),document.execCommand("copy"),document.body.removeChild(n),!0}catch{return!1}}}openLink(e){window.open(e,"_blank","noopener,noreferrer")}generateGetYourGuideLink(e){try{return new URL(e).hostname.match(/getyourguide\.[a-z]{2,}/i)?{success:!0,link:`https://www.getyourguide.com/click/track?partner_id=32A3BBP4J4PPZMHRC1G0&url=${encodeURIComponent(e)}`}:{success:!1,error:"validGetYourGuideURL"}}catch{return{success:!1,error:"invalidUrl"}}}generateCivitatisLink(e){try{return new URL(e).hostname.match(/civitatis\.[a-z]{2,}/i)?{success:!0,link:`https://www.civitatis.com/affiliate/?aid=52698&url=${encodeURIComponent(e)}`}:{success:!1,error:"validCivitatisURL"}}catch{return{success:!1,error:"invalidUrl"}}}}const p=new I;class E{constructor(){this.container=null}init(){if(!this.container&&(this.container=document.createElement("div"),this.container.id="notification-container",this.container.style.cssText=`
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
      `,document.head.appendChild(e)}}show(e,t="info",n=3e3){this.init();const a=document.createElement("div"),i={success:"✓",error:"✕",warning:"⚠",info:"ℹ"},s={success:{bg:"#d4edda",border:"#28a745",text:"#155724"},error:{bg:"#f8d7da",border:"#dc3545",text:"#721c24"},warning:{bg:"#fff3cd",border:"#ffc107",text:"#856404"},info:{bg:"#d1ecf1",border:"#17a2b8",text:"#0c5460"}},d=s[t]||s.info;return a.style.cssText=`
      display: flex; align-items: center; gap: 12px;
      padding: 14px 20px;
      background-color: ${d.bg};
      border-left: 4px solid ${d.border};
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      color: ${d.text};
      font-size: 14px; font-weight: 500;
      animation: slideIn 0.3s ease;
      cursor: pointer;
    `,a.innerHTML=`<span style="font-size: 18px;">${i[t]}</span><span>${e}</span>`,a.addEventListener("click",()=>this.dismiss(a)),this.container.appendChild(a),n>0&&setTimeout(()=>this.dismiss(a),n),a}dismiss(e){e.style.animation="slideOut 0.3s ease forwards",setTimeout(()=>e.remove(),300)}success(e,t){return this.show(e,"success",t)}error(e,t){return this.show(e,"error",t)}warning(e,t){return this.show(e,"warning",t)}info(e,t){return this.show(e,"info",t)}}const u=new E,T="https://allspainbookinglinks.s3.eu-west-3.amazonaws.com",L={hotelPage:{file:r=>`hotel_page_links_${r}.js`,variableName:r=>`links${r.toUpperCase()}`,hasSubType:!1},cityPage:{file:(r,e)=>e==="landing"?`city_landing_page_links_${r}.js`:`city_page_links_${r}.js`,variableName:(r,e)=>e==="landing"?`linksLandingCityPage${r.toUpperCase()}`:`linksCityPage${r.toUpperCase()}`,hasSubType:!0},airportPage:{file:(r,e)=>e==="landing"?`airport_landing_page_links_${r}.js`:`airport_page_links_${r}.js`,variableName:(r,e)=>e==="landing"?`linksAirportLanding${r.toUpperCase()}`:`linksAirport${r.toUpperCase()}`,hasSubType:!0},districtPage:{file:(r,e)=>e==="landing"?`district_landing_page_links_${r}.js`:`district_page_links_${r}.js`,variableName:(r,e)=>e==="landing"?`linksDistrictLandingPage${r.toUpperCase()}`:`linksDistrictPage${r.toUpperCase()}`,hasSubType:!0},islandPage:{file:(r,e)=>e==="landing"?`island_landing_page_links_${r}.js`:`island_page_links_${r}.js`,variableName:(r,e)=>e==="landing"?`linksLandingIslandPage${r.toUpperCase()}`:`linksIslandPage${r.toUpperCase()}`,hasSubType:!0},landmarkPage:{file:(r,e)=>e==="landing"?`landmark_landing_page_links_${r}.js`:`landmark_page_links_${r}.js`,variableName:(r,e)=>e==="landing"?`linksLandmarkLandingPage${r.toUpperCase()}`:`linksLandmarkPage${r.toUpperCase()}`,hasSubType:!0},regionPage:{file:(r,e)=>e==="landing"?`region_landing_page_links_${r}.js`:`region_page_links_${r}.js`,variableName:(r,e)=>e==="landing"?`linksRegionLandingPage${r.toUpperCase()}`:`linksRegionPage${r.toUpperCase()}`,hasSubType:!0}};class B{constructor(){this.dataCache=new Map,this.loadingPromises=new Map}getCacheKey(e,t,n=null){return`${e}_${t}_${n||"default"}`}async loadData(e,t,n=null){const a=this.getCacheKey(e,t,n);if(this.dataCache.has(a))return console.log(`[BookingData] Cache hit for ${a}`),this.dataCache.get(a);if(this.loadingPromises.has(a))return console.log(`[BookingData] Waiting for existing load: ${a}`),this.loadingPromises.get(a);const i=this._fetchData(e,t,n);this.loadingPromises.set(a,i);try{const s=await i;return this.dataCache.set(a,s),console.log(`[BookingData] Loaded ${s.length} items for ${a}`),s}finally{this.loadingPromises.delete(a)}}async _fetchData(e,t,n){const a=L[e];if(!a)throw new Error(`Unknown page type: ${e}`);const i=a.file(t,n),s=a.variableName(t,n),d=`${T}/${i}`;return console.log(`[BookingData] Loading script: ${d}`),console.log(`[BookingData] Expected variable: ${s}`),window[s]&&Array.isArray(window[s])?(console.log("[BookingData] Variable already exists, using cached data"),window[s]):document.querySelector(`script[src="${d}"]`)&&(await this._waitForVariable(s,2e3),window[s])?window[s]:new Promise((c,l)=>{const g=document.createElement("script");g.src=d,g.async=!0,g.className="booking-data-script",g.onload=async()=>{console.log(`[BookingData] Script loaded: ${i}`);try{await this._waitForVariable(s,3e3),window[s]&&Array.isArray(window[s])?(console.log(`[BookingData] Found ${window[s].length} items`),c(window[s])):l(new Error(`Variable ${s} not found after script load`))}catch(h){l(h)}},g.onerror=()=>{console.error(`[BookingData] Failed to load script: ${d}`),l(new Error(`Failed to load ${i}`))},document.body.appendChild(g)})}_waitForVariable(e,t=3e3){return new Promise((n,a)=>{const i=Date.now(),s=()=>{window[e]!==void 0?n():Date.now()-i>t?a(new Error(`Timeout waiting for ${e}`)):setTimeout(s,50)};s()})}normalizeText(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}search(e,t,n=50){if(!e||e.length<3)return[];const a=this.normalizeText(e),i=[];for(const s of t){if(i.length>=n)break;this.normalizeText(s[0]||"").includes(a)&&i.push(s)}return i}formatResult(e,t){const n=e[e.length-1];switch(t){case"hotelPage":return{name:e[0],subtitle:e[1]||"",url:n};case"airportPage":return{name:e[0],subtitle:e[1]||"",url:n};case"districtPage":return{name:e[0],subtitle:e[1]||"",url:n};default:return{name:e[0],subtitle:e.length>2?e[1]:"",url:n}}}hasSubType(e){return L[e]?.hasSubType||!1}clearCache(){this.dataCache.clear(),console.log("[BookingData] Cache cleared")}}const y=new B;class S{constructor(){this.currentPage="booking",this.bookingState={data:null,isLoading:!1,error:null,searchTimeout:null}}async init(){await o.init(),console.log(`[App] Language detected: ${o.getLanguage()}`),this.setupNavigation(),this.setupLanguageSelector(),this.loadPage(this.currentPage)}setupNavigation(){document.querySelectorAll("[data-page]").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),this.loadPage(t.currentTarget.dataset.page)})})}setupLanguageSelector(){const e=o.getLanguage();document.querySelector(`[data-lang="${e}"]`)?.classList.add("active"),document.querySelectorAll(".language-btn").forEach(t=>{t.addEventListener("click",async()=>{const n=t.dataset.lang;document.querySelectorAll(".language-btn").forEach(a=>a.classList.remove("active")),t.classList.add("active"),await o.setLanguage(n),y.clearCache(),this.bookingState.data=null,this.loadPage(this.currentPage),u.success(o.t("languageChanged"))})})}loadPage(e){this.currentPage=e;const t=document.getElementById("page-content");document.querySelectorAll("[data-page]").forEach(a=>{a.classList.toggle("active",a.dataset.page===e)}),({booking:()=>{t.innerHTML=this.renderBookingPage(),this.initBookingPage()},tradedoubler:()=>{t.innerHTML=this.renderTradedoublerPage(),this.initTradedoublerPage()},getyourguide:()=>{t.innerHTML=this.renderGetYourGuidePage(),this.initGetYourGuidePage()},civitatis:()=>{t.innerHTML=this.renderCivitatisPage(),this.initCivitatisPage()}}[e]||(()=>{t.innerHTML="<p>Page not found</p>"}))(),o.translatePage()}renderBookingPage(){return`
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
    `}async initBookingPage(){const e=document.getElementById("pageTypeSelect"),t=document.getElementById("subTypeGroup"),n=document.getElementById("searchGroup"),a=document.getElementById("searchInput"),i=document.getElementById("landingLinksCard"),s=async()=>{const c=e.value,l=c==="genericLandingPages",g=y.hasSubType(c);t.style.display=g?"block":"none",n.style.display=l?"none":"block",i.style.display=l?"block":"none",document.getElementById("resultsCard").style.display="none",document.getElementById("errorState").style.display="none",l?this.showGenericLandingPages():await this.loadBookingData()},d=()=>{clearTimeout(this.bookingState.searchTimeout),this.bookingState.searchTimeout=setTimeout(()=>{this.performSearch(a.value)},300)},m=async()=>{this.bookingState.data=null,await this.loadBookingData()};e.addEventListener("change",s),a.addEventListener("input",d),document.querySelectorAll('input[name="subType"]').forEach(c=>{c.addEventListener("change",m)}),document.getElementById("retryBtn")?.addEventListener("click",()=>this.loadBookingData()),await s()}async loadBookingData(){const e=document.getElementById("pageTypeSelect").value;if(e==="genericLandingPages")return;const t=o.getLanguage(),a=document.querySelector('input[name="subType"]:checked')?.value==="landing"?"landing":null;this.setBookingUIState("loading");try{const i=await y.loadData(e,t,a);this.bookingState.data=i,this.bookingState.error=null,this.setBookingUIState("ready"),u.success(o.t("dataLoaded"));const s=document.getElementById("searchInput")?.value;s&&s.length>=3&&this.performSearch(s)}catch(i){console.error("[Booking] Load error:",i),this.bookingState.error=i.message,this.setBookingUIState("error")}}setBookingUIState(e){const t=document.getElementById("loadingState"),n=document.getElementById("errorState"),a=document.getElementById("resultsCard"),i=document.getElementById("searchHint");t.style.display=e==="loading"?"flex":"none",n.style.display=e==="error"?"flex":"none",a.style.display="none",i&&(i.style.display=e==="ready"?"block":"none")}performSearch(e){if(!this.bookingState.data)return;const t=document.getElementById("resultsCard"),n=document.getElementById("resultsContainer"),a=document.getElementById("resultsCount"),i=document.getElementById("resultsTitle"),s=document.getElementById("searchHint");if(!e||e.length<3){t.style.display="none",s&&(s.style.display="block");return}s&&(s.style.display="none");const d=document.getElementById("pageTypeSelect").value,m=y.search(e,this.bookingState.data,50);if(m.length===0){t.style.display="block",i.textContent="",a.textContent="",n.innerHTML=`
        <div class="empty-state">
          <span class="empty-icon">🔍</span>
          <p data-i18n="noResultsFound">${o.t("noResultsFound")}</p>
        </div>
      `;return}t.style.display="block",a.textContent=`${m.length} ${o.t("resultsFound")}`,n.innerHTML=m.map(c=>{const l=y.formatResult(c,d);return`
        <div class="result-card">
          <div class="result-info">
            <span class="result-name">${this.escapeHtml(l.name)}</span>
            ${l.subtitle?`<span class="result-subtitle">${this.escapeHtml(l.subtitle)}</span>`:""}
          </div>
          <div class="result-actions">
            <button class="btn btn-sm btn-primary" data-copy="${this.escapeHtml(l.url)}">${o.t("copyLink")}</button>
            <a href="${l.url}" target="_blank" class="btn btn-sm btn-outline">${o.t("openLink")}</a>
          </div>
        </div>
      `}).join(""),n.querySelectorAll("[data-copy]").forEach(c=>{c.addEventListener("click",async()=>{const l=await p.copyToClipboard(c.dataset.copy);u[l?"success":"error"](o.t(l?"deepLinkCopied":"copyError"))})})}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}showGenericLandingPages(){const e=document.getElementById("landingLinks");document.getElementById("landingLinksCard").style.display="block",document.getElementById("resultsCard").style.display="none";const t=[{key:"homePage",url:"https://www.booking.com/index.html?aid=955564"},{key:"apartmentsPage",url:"https://www.booking.com/apartments/index.html?aid=955564"},{key:"resortsPage",url:"https://www.booking.com/resorts/index.html?aid=955564"},{key:"villasPage",url:"https://www.booking.com/villas/index.html?aid=955564"},{key:"bedAndBreakfastPage",url:"https://www.booking.com/bed-and-breakfast/index.html?aid=955564"},{key:"guestHousePage",url:"https://www.booking.com/guest-house/index.html?aid=955564"}];e.innerHTML=t.map(n=>`
      <div class="link-item">
        <span>${o.t(n.key)}</span>
        <div class="link-actions">
          <a href="${n.url}" target="_blank" class="btn btn-sm btn-outline">${o.t("openLink")}</a>
          <button class="btn btn-sm btn-primary" data-copy="${n.url}">${o.t("copyLink")}</button>
        </div>
      </div>
    `).join(""),e.querySelectorAll("[data-copy]").forEach(n=>{n.addEventListener("click",async()=>{const a=await p.copyToClipboard(n.dataset.copy);u[a?"success":"error"](o.t(a?"deepLinkCopied":"copyError"))})})}renderTradedoublerPage(){return`
      <div class="page-header">
        <h2 data-i18n="usefulTLinksHeader">I Programmi Attivi</h2>
      </div>

      <div class="card">
        <div class="form-group">
          <label class="form-label">Sito</label>
          <select id="islandSelect" class="form-select">
            <option value="" data-i18n="selectSite">Seleziona un sito</option>
            ${p.getAllIslands().map(t=>`<option value="${t.code}">${t.displayName}</option>`).join("")}
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
    `}initTradedoublerPage(){const e=document.getElementById("islandSelect"),t=document.getElementById("platformSelect"),n=document.getElementById("partnerLinkContainer"),a=document.getElementById("partnerLink"),i=document.getElementById("generateBtn"),s=document.getElementById("inputUrl"),d=document.getElementById("resultContainer"),m=document.getElementById("resultLink");e.addEventListener("change",()=>{const c=e.value;t.innerHTML=`<option value="">${o.t("selectPlatform")}</option>`,c?((P[c]||[]).forEach(l=>{t.appendChild(new Option(l,l))}),t.disabled=!1):t.disabled=!0,n.style.display="none",d.style.display="none"}),t.addEventListener("change",()=>{const c=e.value,l=t.value;if(c&&l){const g=p.getPartnerBaseLink(c,l);g&&(a.innerHTML=`<a href="${g}" target="_blank">${g}</a>`,n.style.display="block")}else n.style.display="none"}),i.addEventListener("click",()=>{const c=e.value,l=t.value,g=s.value.trim();if(!c||!l){u.warning(o.t("selectSiteAndPlatform"));return}if(!g){u.warning(o.t("enterUrl"));return}const h=p.generateDeepLink(g,c,l);h.success?(m.href=h.link,m.textContent=h.link,d.style.display="block",u.success(o.t("deepLinkGenerated"))):u.error(o.t(h.error)||h.error)}),document.getElementById("copyResultBtn")?.addEventListener("click",async()=>{const c=await p.copyToClipboard(m.href);u[c?"success":"error"](o.t(c?"deepLinkCopied":"copyError"))}),document.getElementById("openResultBtn")?.addEventListener("click",()=>{p.openLink(m.href)})}renderGetYourGuidePage(){return`
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
    `}initGetYourGuidePage(){const e=document.getElementById("gygInput"),t=document.getElementById("gygGenerateBtn"),n=document.getElementById("gygResult"),a=document.getElementById("gygResultLink");t.addEventListener("click",()=>{const i=e.value.trim();if(!i){u.warning(o.t("validGetYourGuideURL"));return}const s=p.generateGetYourGuideLink(i);s.success?(a.href=s.link,a.textContent=s.link,n.style.display="block",u.success(o.t("deepLinkGenerated"))):u.error(o.t(s.error))}),document.getElementById("gygCopyBtn")?.addEventListener("click",async()=>{const i=await p.copyToClipboard(a.href);u[i?"success":"error"](o.t(i?"deepLinkCopied":"copyError"))}),document.getElementById("gygOpenBtn")?.addEventListener("click",()=>{p.openLink(a.href)})}renderCivitatisPage(){return`
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
    `}initCivitatisPage(){const e=document.getElementById("civInput"),t=document.getElementById("civGenerateBtn"),n=document.getElementById("civResult"),a=document.getElementById("civResultLink");t.addEventListener("click",()=>{const i=e.value.trim();if(!i){u.warning(o.t("validCivitatisURL"));return}const s=p.generateCivitatisLink(i);s.success?(a.href=s.link,a.textContent=s.link,n.style.display="block",u.success(o.t("deepLinkGenerated"))):u.error(o.t(s.error))}),document.getElementById("civCopyBtn")?.addEventListener("click",async()=>{const i=await p.copyToClipboard(a.href);u[i?"success":"error"](o.t(i?"deepLinkCopied":"copyError"))}),document.getElementById("civOpenBtn")?.addEventListener("click",()=>{p.openLink(a.href)})}}document.addEventListener("DOMContentLoaded",()=>{new S().init()});
