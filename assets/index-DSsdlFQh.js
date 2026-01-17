(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();class b{constructor(e,t={}){this.originalSelect=e,this.options={searchable:t.searchable||!1,placeholder:t.placeholder||"Select...",...t},this.isOpen=!1,this.selectedIndex=-1,this.focusedIndex=-1,this.id=`custom-select-${Math.random().toString(36).substr(2,9)}`,this.init()}init(){this.originalSelect.style.display="none",this.originalSelect.setAttribute("aria-hidden","true"),this.container=this.createContainer(),this.originalSelect.parentNode.insertBefore(this.container,this.originalSelect.nextSibling),this.syncFromOriginal(),this.bindEvents()}createContainer(){const e=document.createElement("div");return e.className="custom-select",e.innerHTML=`
            <button type="button" 
                    class="custom-select__trigger"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded="false"
                    aria-controls="${this.id}-listbox"
                    id="${this.id}-button">
                <span class="custom-select__value">${this.options.placeholder}</span>
                <span class="custom-select__arrow">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </button>
            <div class="custom-select__dropdown" id="${this.id}-listbox" role="listbox" aria-labelledby="${this.id}-button">
                ${this.options.searchable?`
                    <div class="custom-select__search">
                        <input type="text" placeholder="Search..." class="custom-select__search-input" />
                    </div>
                `:""}
                <ul class="custom-select__options">
                    ${this.renderOptions()}
                </ul>
            </div>
        `,e}renderOptions(){const e=this.originalSelect.querySelectorAll("option");return Array.from(e).map((t,a)=>{const n=t.selected,s=t.disabled;return`
                <li class="custom-select__option ${n?"is-selected":""} ${s?"is-disabled":""}"
                    role="option"
                    aria-selected="${n}"
                    data-value="${t.value}"
                    data-index="${a}"
                    tabindex="-1">
                    ${t.textContent}
                </li>
            `}).join("")}bindEvents(){const e=this.container.querySelector(".custom-select__trigger"),t=this.container.querySelector(".custom-select__dropdown"),a=this.container.querySelector(".custom-select__options");e.addEventListener("click",()=>this.toggle()),a.addEventListener("click",n=>{const s=n.target.closest(".custom-select__option");s&&!s.classList.contains("is-disabled")&&this.selectOption(parseInt(s.dataset.index))}),e.addEventListener("keydown",n=>this.handleKeydown(n)),t.addEventListener("keydown",n=>this.handleKeydown(n)),document.addEventListener("click",n=>{this.container.contains(n.target)||this.close()}),this.options.searchable&&this.container.querySelector(".custom-select__search-input").addEventListener("input",s=>this.filterOptions(s.target.value))}handleKeydown(e){const t=this.container.querySelectorAll(".custom-select__option:not(.is-disabled):not(.is-hidden)");switch(e.key){case"Enter":case" ":if(e.preventDefault(),this.isOpen&&this.focusedIndex>=0){const a=t[this.focusedIndex];a&&this.selectOption(parseInt(a.dataset.index))}else this.toggle();break;case"Escape":e.preventDefault(),this.close();break;case"ArrowDown":e.preventDefault(),this.isOpen?this.focusOption(Math.min(this.focusedIndex+1,t.length-1)):this.open();break;case"ArrowUp":e.preventDefault(),this.isOpen?this.focusOption(Math.max(this.focusedIndex-1,0)):this.open();break;case"Tab":this.close();break}}focusOption(e){const t=this.container.querySelectorAll(".custom-select__option:not(.is-disabled):not(.is-hidden)");t.forEach(a=>a.classList.remove("is-focused")),t[e]&&(t[e].classList.add("is-focused"),t[e].scrollIntoView({block:"nearest"}),this.focusedIndex=e)}toggle(){this.isOpen?this.close():this.open()}open(){if(this.isOpen)return;this.isOpen=!0,this.container.classList.add("is-open"),this.container.querySelector(".custom-select__trigger").setAttribute("aria-expanded","true");const t=this.container.querySelector(".custom-select__option.is-selected");if(t){const a=this.container.querySelectorAll(".custom-select__option:not(.is-disabled)");this.focusedIndex=Array.from(a).indexOf(t),this.focusOption(this.focusedIndex)}else this.focusOption(0);this.options.searchable&&setTimeout(()=>{this.container.querySelector(".custom-select__search-input").focus()},50)}close(){if(!this.isOpen)return;this.isOpen=!1,this.container.classList.remove("is-open");const e=this.container.querySelector(".custom-select__trigger");if(e.setAttribute("aria-expanded","false"),e.focus(),this.options.searchable){const t=this.container.querySelector(".custom-select__search-input");t.value="",this.filterOptions("")}this.container.querySelectorAll(".custom-select__option").forEach(t=>{t.classList.remove("is-focused")}),this.focusedIndex=-1}selectOption(e){const a=this.originalSelect.querySelectorAll("option")[e];if(!a||a.disabled)return;this.originalSelect.value=a.value,this.originalSelect.dispatchEvent(new Event("change",{bubbles:!0}));const n=this.container.querySelector(".custom-select__value");n.textContent=a.textContent,n.classList.add("has-value"),this.container.querySelectorAll(".custom-select__option").forEach((s,i)=>{s.classList.toggle("is-selected",i===e),s.setAttribute("aria-selected",i===e)}),this.selectedIndex=e,this.close()}filterOptions(e){const t=this.container.querySelectorAll(".custom-select__option"),a=e.toLowerCase();t.forEach(n=>{const i=n.textContent.toLowerCase().includes(a);n.classList.toggle("is-hidden",!i)}),this.focusedIndex=-1,this.focusOption(0)}syncFromOriginal(){const e=this.originalSelect.querySelector("option:checked");if(e&&e.value){const t=Array.from(this.originalSelect.querySelectorAll("option")).indexOf(e);if(t>=0){const a=this.container.querySelector(".custom-select__value");a.textContent=e.textContent,a.classList.add("has-value"),this.selectedIndex=t;const n=this.container.querySelector(`[data-index="${t}"]`);n&&(n.classList.add("is-selected"),n.setAttribute("aria-selected","true"))}}}getValue(){return this.originalSelect.value}setValue(e){const t=this.originalSelect.querySelectorAll("option"),a=Array.from(t).findIndex(n=>n.value===e);a>=0&&this.selectOption(a)}destroy(){this.originalSelect.style.display="",this.originalSelect.removeAttribute("aria-hidden"),this.container.remove()}}const E=["it","en","es","fr","de"],L="it";class ${constructor(){this.messages={},this.currentLanguage=L,this.isLoaded=!1}async init(){return this.currentLanguage=this.detectBrowserLanguage(),await this.loadMessages(this.currentLanguage),this.applyLanguageToDocument(),this}detectBrowserLanguage(){const e=localStorage.getItem("selectedLanguage");if(e&&E.includes(e))return e;const t=navigator.languages||[navigator.language||navigator.userLanguage];for(const a of t){const n=a.split("-")[0].toLowerCase();if(E.includes(n))return console.log(`[i18n] Browser language detected: ${n}`),n}return console.log(`[i18n] No matching language found, using default: ${L}`),L}async loadMessages(e){try{const a=await fetch(`/webapp/locales/${e}/messages.json`);if(!a.ok)throw new Error(`Failed to load ${e} messages`);this.messages=await a.json(),this.isLoaded=!0,console.log(`[i18n] Loaded messages for: ${e}`)}catch(t){console.error(`[i18n] Error loading ${e}:`,t),e!==L&&(console.log(`[i18n] Falling back to ${L}`),await this.loadMessages(L))}}getLanguage(){return this.currentLanguage}async setLanguage(e){return E.includes(e)?(this.currentLanguage=e,localStorage.setItem("selectedLanguage",e),await this.loadMessages(e),this.applyLanguageToDocument(),this.translatePage(),!0):(console.warn(`[i18n] Language ${e} not supported`),!1)}applyLanguageToDocument(){document.documentElement.lang=this.currentLanguage}t(e){return this.isLoaded?this.messages[e]||e:(console.warn("[i18n] Messages not loaded yet"),e)}translatePage(){this.isLoaded&&(document.querySelectorAll("[data-i18n]").forEach(e=>{const t=e.getAttribute("data-i18n"),a=this.t(t);e.tagName==="INPUT"||e.tagName==="TEXTAREA"||(e.textContent=a)}),document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>{const t=e.getAttribute("data-i18n-placeholder");e.placeholder=this.t(t)}),document.querySelectorAll("[data-i18n-title]").forEach(e=>{const t=e.getAttribute("data-i18n-title");e.title=this.t(t)}))}getSupportedLanguages(){return[{code:"it",label:"Italiano",flag:"🇮🇹"},{code:"en",label:"English",flag:"🇬🇧"},{code:"es",label:"Español",flag:"🇪🇸"},{code:"fr",label:"Français",flag:"🇫🇷"},{code:"de",label:"Deutsch",flag:"🇩🇪"}]}}const c=new $,P={3220593:"Isola di Formentera",3337668:"Isola di Lanzarote",1639250:"Isola di Minorca",3349565:"Isola di Minorca EN",3349567:"Isola di Minorca ES",3335968:"Vacanze nel Mediterraneo"},_={eDreams:"17269","Direct Ferries IT":"313887","Direct Ferries ES":"327261","Direct Ferries UK":"324849","Vueling IT":"288053","Vueling UK":"320047",Weweed:"343473","Allianz Partners":"72847","AXA Assistance":"261028","Barceló Hotels & Resorts":"282865","Columbus Assicurazioni":"76623",Veratour:"319774",Viaggisicuri:"249882","Yalla Yalla":"218733","Airport Parking Luton":"343105","Airport Parking Manchester":"343201","Airport Parking With Us":"343202","Bee Parking":"383148","Compare Cheap Parking Prices At M...":"355499","Compare Parking Prices":"355683","Compare Your Parking Deals":"360206","Muslim Aid":"335318","AXA Seguros de Viaje":"343738",InterMundial:"381548","Vayacruceros ES":"342494","Eurowings IT":"307239","Grandi Navi Veloci IT":"316693","Viaggi in crociera":"341133"},x={eDreams:"VIAGGI","Direct Ferries IT":"VIAGGI","Direct Ferries ES":"VIAGGI","Direct Ferries UK":"VIAGGI","Vueling IT":"VIAGGI","Vueling UK":"VIAGGI",Veratour:"VIAGGI","Yalla Yalla":"VIAGGI","Eurowings IT":"VIAGGI","Grandi Navi Veloci IT":"VIAGGI","Viaggi in crociera":"VIAGGI","Vayacruceros ES":"VIAGGI","Airport Parking Luton":"VIAGGI","Airport Parking Manchester":"VIAGGI","Airport Parking With Us":"VIAGGI","Bee Parking":"VIAGGI","Compare Cheap Parking Prices At M...":"VIAGGI","Compare Parking Prices":"VIAGGI","Compare Your Parking Deals":"VIAGGI","Allianz Partners":"ASSICURAZIONI","AXA Assistance":"ASSICURAZIONI","AXA Seguros de Viaje":"ASSICURAZIONI","Columbus Assicurazioni":"FINANZA",Viaggisicuri:"ASSICURAZIONI",InterMundial:"ASSICURAZIONI","Barceló Hotels & Resorts":"VIAGGI","Muslim Aid":"ORGANIZZAZIONI NO PROFIT"},S={3220593:["eDreams"],3337668:["Direct Ferries IT","eDreams"],1639250:["Allianz Partners","AXA Assistance","Barceló Hotels & Resorts","Columbus Assicurazioni","Direct Ferries IT","Veratour","Viaggisicuri","Yalla Yalla"],3349565:["Airport Parking Luton","Airport Parking Manchester","Airport Parking With Us","Bee Parking","Compare Cheap Parking Prices At M...","Compare Parking Prices","Compare Your Parking Deals","Direct Ferries UK","Muslim Aid"],3349567:["AXA Seguros de Viaje","Direct Ferries ES","eDreams","InterMundial","Vayacruceros ES"],3335968:["Direct Ferries IT","Eurowings IT","Grandi Navi Veloci IT","Veratour","Viaggi in crociera"]};function R(){const o={};for(const[e,t]of Object.entries(S)){o[e]={};for(const a of t){const n=_[a];n&&(o[e][a]=`https://clk.tradedoubler.com/click?p=${n}&a=${e}`)}}return o}const A=R(),B=[{name:"Coches Menorca",urls:{it:"https://cochesmenorca.es/it/?agentId=3",es:"https://cochesmenorca.es/?agentId=3",en:"https://cochesmenorca.es/en/?agentId=3",fr:"https://cochesmenorca.es/en/?agentId=3",de:"https://cochesmenorca.es/en/?agentId=3"}},{name:"Menorca Rent",urls:{it:"https://www.menorcarent.com/it/?agentId=15",es:"https://www.menorcarent.com/?agentId=15",en:"https://www.menorcarent.com/en/?agentId=15",fr:"https://www.menorcarent.com/fr/?agentId=15",de:"https://www.menorcarent.com/en/?agentId=15"}},{name:"Autos Xoroi",urls:{it:"http://www.alquilercochesmenorca.com/it/?link=ISOLADIMINORCA",es:"http://www.alquilercochesmenorca.com/es/?link=ISOLADIMINORCA",en:"http://www.alquilercochesmenorca.com/?link=ISOLADIMINORCA",fr:"http://www.alquilercochesmenorca.com/fr/?link=ISOLADIMINORCA",de:"http://www.alquilercochesmenorca.com/?link=ISOLADIMINORCA"}},{name:"HIPER Rent a Car",urls:{it:"https://hiperrentacar.com/it/?colaborador=LO-0495108",es:"https://hiperrentacar.com/es/?colaborador=LO-0495108",en:"https://hiperrentacar.com/en/?colaborador=LO-0495108",fr:"https://hiperrentacar.com/fr/?colaborador=LO-0495108",de:"https://hiperrentacar.com/de/?colaborador=LO-0495108"}},{name:"Rentalcars",urls:{it:"https://www.rentalcars.com/it/?affiliateCode=latitudine983",es:"https://www.rentalcars.com/es/?affiliateCode=latitudine983",en:"https://www.rentalcars.com/en/?affiliateCode=latitudine983",fr:"https://www.rentalcars.com/fr/?affiliateCode=latitudine983",de:"https://www.rentalcars.com/de/?affiliateCode=latitudine983"}}],D={1639250:{"Allianz Partners":["https://www.allianz-assistance.it/"],"AXA Assistance":["https://www.assicurazione-viaggio.axa-assistance.it/"],"Barceló Hotels & Resorts":["https://www.barcelo.com/"],"Columbus Assicurazioni":["https://www.columbusassicurazioni.it/"],"Direct Ferries IT":["https://www.directferries"],Veratour:["https://www.veratour.it/"],Viaggisicuri:["https://www.viaggisicuri.com/"],"Yalla Yalla":["https://www.yallayalla.it/"]},3220593:{eDreams:["https://www.edreams.it/"]},3337668:{"Direct Ferries IT":["https://www.directferries"],eDreams:["https://www.edreams.it/"]},3349565:{"Direct Ferries UK":["https://www.directferries"]},3349567:{eDreams:["https://www.edreams.es/"],"Vayacruceros ES":["https://www.vayacruceros.com/"]},3335968:{"Direct Ferries IT":["https://www.directferries"],"Eurowings IT":["https://www.eurowings.com/"],"Grandi Navi Veloci IT":["https://www.gnv.it/"],Veratour:["https://www.veratour.it/"],"Viaggi in crociera":["https://www.viaggio-in-crociera.it/"]}};class G{generateDeepLink(e,t,a){let n;try{n=new URL(e)}catch{return{success:!1,error:"invalidUrl"}}const s=this.getPartnerBaseLink(t,a);if(!s)return{success:!1,error:"Programma o partner non trovato"};if(!this.validateUrl(n.href,t,a))return{success:!1,error:`URL non valido per ${a}`};const i=encodeURIComponent(n.href);return{success:!0,link:`${s}&url=${i}`}}getPartnerBaseLink(e,t){return A[e]?.[t]||null}validateUrl(e,t,a){const n=D[t]?.[a];return n?n.some(s=>e.includes(s)):!0}getPartnersForIsland(e){const t=A[e];return t?Object.keys(t).map(a=>({name:a,link:t[a]})):[]}getIslandName(e){return P[e]||"Isola Sconosciuta"}getAllIslands(){return Object.entries(P).map(([e,t])=>({code:e,name:t,displayName:`${t} - ${e}`}))}async copyToClipboard(e){try{return await navigator.clipboard.writeText(e),!0}catch{try{const a=document.createElement("textarea");return a.value=e,a.style.position="fixed",a.style.left="-9999px",document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),!0}catch{return!1}}}openLink(e){window.open(e,"_blank","noopener,noreferrer")}generateGetYourGuideLink(e){try{return new URL(e).hostname.match(/getyourguide\.[a-z]{2,}/i)?{success:!0,link:`https://www.getyourguide.com/click/track?partner_id=32A3BBP4J4PPZMHRC1G0&url=${encodeURIComponent(e)}`}:{success:!1,error:"validGetYourGuideURL"}}catch{return{success:!1,error:"invalidUrl"}}}generateCivitatisLink(e){try{return new URL(e).hostname.match(/civitatis\.[a-z]{2,}/i)?{success:!0,link:`https://www.civitatis.com/affiliate/?aid=52698&url=${encodeURIComponent(e)}`}:{success:!1,error:"validCivitatisURL"}}catch{return{success:!1,error:"invalidUrl"}}}}const g=new G;class O{constructor(){this.container=null}init(){if(!this.container&&(this.container=document.createElement("div"),this.container.id="notification-container",this.container.style.cssText=`
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
      `,document.head.appendChild(e)}}show(e,t="info",a=3e3){this.init();const n=document.createElement("div"),s={success:"✓",error:"✕",warning:"⚠",info:"ℹ"},i={success:{bg:"#d4edda",border:"#28a745",text:"#155724"},error:{bg:"#f8d7da",border:"#dc3545",text:"#721c24"},warning:{bg:"#fff3cd",border:"#ffc107",text:"#856404"},info:{bg:"#d1ecf1",border:"#17a2b8",text:"#0c5460"}},r=i[t]||i.info;return n.style.cssText=`
      display: flex; align-items: center; gap: 12px;
      padding: 14px 20px;
      background-color: ${r.bg};
      border-left: 4px solid ${r.border};
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      color: ${r.text};
      font-size: 14px; font-weight: 500;
      animation: slideIn 0.3s ease;
      cursor: pointer;
    `,n.innerHTML=`<span style="font-size: 18px;">${s[t]}</span><span>${e}</span>`,n.addEventListener("click",()=>this.dismiss(n)),this.container.appendChild(n),a>0&&setTimeout(()=>this.dismiss(n),a),n}dismiss(e){e.style.animation="slideOut 0.3s ease forwards",setTimeout(()=>e.remove(),300)}success(e,t){return this.show(e,"success",t)}error(e,t){return this.show(e,"error",t)}warning(e,t){return this.show(e,"warning",t)}info(e,t){return this.show(e,"info",t)}}const p=new O,H="https://allspainbookinglinks.s3.eu-west-3.amazonaws.com",T={hotelPage:{file:o=>`hotel_page_links_${o}.js`,variableName:o=>`links${o.toUpperCase()}`,hasSubType:!1},cityPage:{file:(o,e)=>e==="landing"?`city_landing_page_links_${o}.js`:`city_page_links_${o}.js`,variableName:(o,e)=>e==="landing"?`linksLandingCityPage${o.toUpperCase()}`:`linksCityPage${o.toUpperCase()}`,hasSubType:!0},airportPage:{file:(o,e)=>e==="landing"?`airport_landing_page_links_${o}.js`:`airport_page_links_${o}.js`,variableName:(o,e)=>e==="landing"?`linksAirportLanding${o.toUpperCase()}`:`linksAirport${o.toUpperCase()}`,hasSubType:!0},districtPage:{file:(o,e)=>e==="landing"?`district_landing_page_links_${o}.js`:`district_page_links_${o}.js`,variableName:(o,e)=>e==="landing"?`linksDistrictLandingPage${o.toUpperCase()}`:`linksDistrictPage${o.toUpperCase()}`,hasSubType:!0},islandPage:{file:(o,e)=>e==="landing"?`island_landing_page_links_${o}.js`:`island_page_links_${o}.js`,variableName:(o,e)=>e==="landing"?`linksLandingIslandPage${o.toUpperCase()}`:`linksIslandPage${o.toUpperCase()}`,hasSubType:!0},landmarkPage:{file:(o,e)=>e==="landing"?`landmark_landing_page_links_${o}.js`:`landmark_page_links_${o}.js`,variableName:(o,e)=>e==="landing"?`linksLandmarkLandingPage${o.toUpperCase()}`:`linksLandmarkPage${o.toUpperCase()}`,hasSubType:!0},regionPage:{file:(o,e)=>e==="landing"?`region_landing_page_links_${o}.js`:`region_page_links_${o}.js`,variableName:(o,e)=>e==="landing"?`linksRegionLandingPage${o.toUpperCase()}`:`linksRegionPage${o.toUpperCase()}`,hasSubType:!0}};class N{constructor(){this.dataCache=new Map,this.loadingPromises=new Map,this.STORAGE_PREFIX="bookingData_",this.CACHE_EXPIRY_MS=1440*60*1e3}getCacheKey(e,t,a=null){return`${e}_${t}_${a||"default"}`}getFromStorage(e){try{const t=localStorage.getItem(this.STORAGE_PREFIX+e);if(!t)return null;const{data:a,timestamp:n}=JSON.parse(t),s=Date.now()-n;return s>this.CACHE_EXPIRY_MS?(localStorage.removeItem(this.STORAGE_PREFIX+e),console.log(`[BookingData] Storage expired for ${e}`),null):(console.log(`[BookingData] Storage hit for ${e} (age: ${Math.round(s/6e4)}min)`),a)}catch(t){return console.warn("[BookingData] Storage read error:",t),null}}saveToStorage(e,t){try{const a=JSON.stringify({data:t,timestamp:Date.now()});localStorage.setItem(this.STORAGE_PREFIX+e,a),console.log(`[BookingData] Saved to storage: ${e}`)}catch(a){console.warn("[BookingData] Storage write error:",a)}}async loadData(e,t,a=null){const n=this.getCacheKey(e,t,a);if(this.dataCache.has(n))return console.log(`[BookingData] Memory cache hit for ${n}`),this.dataCache.get(n);const s=this.getFromStorage(n);if(s)return this.dataCache.set(n,s),s;if(this.loadingPromises.has(n))return console.log(`[BookingData] Waiting for existing load: ${n}`),this.loadingPromises.get(n);const i=this._fetchData(e,t,a);this.loadingPromises.set(n,i);try{const r=await i;return this.dataCache.set(n,r),this.saveToStorage(n,r),console.log(`[BookingData] Loaded ${r.length} items for ${n}`),r}finally{this.loadingPromises.delete(n)}}async _fetchData(e,t,a){const n=T[e];if(!n)throw new Error(`Unknown page type: ${e}`);const s=n.file(t,a),i=n.variableName(t,a),r=`${H}/${s}`;return console.log(`[BookingData] Loading script: ${r}`),console.log(`[BookingData] Expected variable: ${i}`),window[i]&&Array.isArray(window[i])?(console.log("[BookingData] Variable already exists, using cached data"),window[i]):document.querySelector(`script[src="${r}"]`)&&(await this._waitForVariable(i,2e3),window[i])?window[i]:new Promise((l,m)=>{const y=document.createElement("script");y.src=r,y.async=!0,y.className="booking-data-script",y.onload=async()=>{console.log(`[BookingData] Script loaded: ${s}`);try{await this._waitForVariable(i,3e3),window[i]&&Array.isArray(window[i])?(console.log(`[BookingData] Found ${window[i].length} items`),l(window[i])):m(new Error(`Variable ${i} not found after script load`))}catch(u){m(u)}},y.onerror=()=>{console.error(`[BookingData] Failed to load script: ${r}`),m(new Error(`Failed to load ${s}`))},document.body.appendChild(y)})}_waitForVariable(e,t=3e3){return new Promise((a,n)=>{const s=Date.now(),i=()=>{window[e]!==void 0?a():Date.now()-s>t?n(new Error(`Timeout waiting for ${e}`)):setTimeout(i,50)};i()})}normalizeText(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}search(e,t,a=50){if(!e||e.length<3)return[];const n=this.normalizeText(e),s=[];for(const i of t){if(s.length>=a)break;this.normalizeText(i[0]||"").includes(n)&&s.push(i)}return s}formatResult(e,t){const a=e[e.length-1];switch(t){case"hotelPage":return{name:e[0],subtitle:e[1]||"",url:a};case"airportPage":return{name:e[0],subtitle:e[1]||"",url:a};case"districtPage":return{name:e[0],subtitle:e[1]||"",url:a};default:return{name:e[0],subtitle:e.length>2?e[1]:"",url:a}}}hasSubType(e){return T[e]?.hasSubType||!1}clearCache(){this.dataCache.clear(),console.log("[BookingData] Cache cleared")}}const w=new N;class F{constructor(){this.currentPage="booking",this.bookingState={data:null,isLoading:!1,error:null,searchTimeout:null}}async init(){await c.init(),console.log(`[App] Language detected: ${c.getLanguage()}`),this.setupNavigation(),this.setupLanguageSelector(),this.loadPage(this.currentPage)}setupNavigation(){document.querySelectorAll("[data-page]").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),this.loadPage(t.currentTarget.dataset.page)})})}setupLanguageSelector(){const e=document.querySelector(".language-dropdown"),t=document.getElementById("langTrigger");document.getElementById("langMenu");const a=document.querySelectorAll(".lang-option"),n={it:{flag:"🇮🇹",code:"IT"},en:{flag:"🇬🇧",code:"EN"},es:{flag:"🇪🇸",code:"ES"},fr:{flag:"🇫🇷",code:"FR"},de:{flag:"🇩🇪",code:"DE"}},s=c.getLanguage();this.updateLangTrigger(t,n[s]),document.querySelector(`[data-lang="${s}"]`)?.classList.add("active"),t?.addEventListener("click",i=>{i.stopPropagation(),e.classList.toggle("is-open"),t.setAttribute("aria-expanded",e.classList.contains("is-open"))}),document.addEventListener("click",i=>{e?.contains(i.target)||(e?.classList.remove("is-open"),t?.setAttribute("aria-expanded","false"))}),a.forEach(i=>{i.addEventListener("click",async()=>{const r=i.dataset.lang;a.forEach(d=>d.classList.remove("active")),i.classList.add("active"),this.updateLangTrigger(t,n[r]),e.classList.remove("is-open"),t.setAttribute("aria-expanded","false"),await c.setLanguage(r),w.clearCache(),this.bookingState.data=null,this.loadPage(this.currentPage),p.success(c.t("languageChanged"))})})}updateLangTrigger(e,t){!e||!t||(e.querySelector(".lang-flag").textContent=t.flag,e.querySelector(".lang-code").textContent=t.code)}loadPage(e){this.currentPage=e;const t=document.getElementById("page-content");document.querySelectorAll("[data-page]").forEach(n=>{n.classList.toggle("active",n.dataset.page===e)}),({booking:()=>{t.innerHTML=this.renderBookingPage(),this.initBookingPage()},tradedoubler:()=>{t.innerHTML=this.renderTradedoublerPage(),this.initTradedoublerPage()},getyourguide:()=>{t.innerHTML=this.renderGetYourGuidePage(),this.initGetYourGuidePage()},civitatis:()=>{t.innerHTML=this.renderCivitatisPage(),this.initCivitatisPage()},carrental:()=>{t.innerHTML=this.renderCarRentalPage(),this.initCarRentalPage()},imgtool:()=>{t.innerHTML=this.renderImageToolPage(),this.initImageToolPage()},feedback:()=>{t.innerHTML=this.renderFeedbackPage(),this.initFeedbackPage()}}[e]||(()=>{t.innerHTML="<p>Page not found</p>"}))(),c.translatePage()}renderBookingPage(){return`
      <div class="page-header">
        <h2 data-i18n="bookingHeader">Cerca il Deep Link di Booking</h2>
        <span class="badge badge-warning" data-i18n="spainIslandsOnly">⚠️ Solo Spagna e Isole</span>
      </div>
      
      <div class="card booking-unified-card">
        <!-- Top Controls Row -->
        <div class="booking-controls">
          <div class="booking-control-group">
            <select id="pageTypeSelect" class="form-select form-select-sm">
              <option value="cityPage" data-i18n="cityPage">Pagina Città</option>
              <option value="hotelPage" data-i18n="hotelPage">Pagina Hotel</option>
              <option value="airportPage" data-i18n="airportPage">Pagina Aeroporto</option>
              <option value="districtPage" data-i18n="districtPage">Pagina Quartiere</option>
              <option value="islandPage" data-i18n="islandPage">Pagina Isola</option>
              <option value="landmarkPage" data-i18n="landmarkPage">Pagina Luogo</option>
              <option value="regionPage" data-i18n="regionPage">Pagina Regione</option>
              <option value="genericLandingPages" data-i18n="genericLandingPages">Pagina Generica</option>
            </select>
            <select id="bookingLangSelect" class="form-select form-select-sm">
              <option value="it">🇮🇹 IT</option>
              <option value="es">🇪🇸 ES</option>
              <option value="en">🇬🇧 EN</option>
              <option value="fr">🇫🇷 FR</option>
            </select>
          </div>
          <input type="text" id="searchInput" class="form-control" 
                 data-i18n-placeholder="searchPlaceholder" 
                 placeholder="Cerca...">
        </div>

        <!-- Sub Type Radio (when applicable) -->
        <div class="form-group" id="subTypeGroup" style="display:none;">
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

        <!-- Search Hint -->
        <div id="searchHint" class="search-hint" data-i18n="searchMinChars">Digita almeno 3 caratteri per cercare</div>

        <!-- Loading State (inline) -->
        <div id="loadingState" class="loading-inline" style="display:none;">
          <div class="loading-spinner"></div>
          <span data-i18n="loadingData">Caricamento dati...</span>
        </div>

        <!-- Error State (inline) -->
        <div id="errorState" class="error-inline" style="display:none;">
          <span class="error-icon">⚠️</span>
          <span id="errorMessage" data-i18n="errorLoadingData">Errore nel caricamento</span>
          <button id="retryBtn" class="btn btn-sm btn-primary" data-i18n="retryLoad">Riprova</button>
        </div>

        <!-- Results Header -->
        <div id="resultsHeader" class="results-header" style="display:none;">
          <span id="resultsCount" class="results-count"></span>
        </div>

        <!-- Results Container -->
        <div id="resultsContainer" class="results-list"></div>
      </div>

      <!-- Generic Landing Pages (separate card) -->
      <div class="card mt-6" id="landingLinksCard" style="display:none;">
        <h3 class="card-title" data-i18n="genericLandingPages">Link Generici</h3>
        <div id="landingLinks" class="link-list"></div>
      </div>
    `}async initBookingPage(){const e=document.getElementById("pageTypeSelect"),t=document.getElementById("subTypeGroup"),a=document.getElementById("searchInput"),n=document.getElementById("searchHint"),s=document.getElementById("landingLinksCard");e&&new b(e);const i=document.getElementById("bookingLangSelect");i&&new b(i);const r=async()=>{const u=e.value,h=u==="genericLandingPages",f=w.hasSubType(u);t.style.display=f?"block":"none",a.style.display=h?"none":"block",n&&(n.style.display=h?"none":"block"),s.style.display=h?"block":"none",document.getElementById("resultsHeader").style.display="none",document.getElementById("resultsContainer").innerHTML="",document.getElementById("errorState").style.display="none",h?this.showGenericLandingPages():await this.loadBookingData()},d=()=>{clearTimeout(this.bookingState.searchTimeout),this.bookingState.searchTimeout=setTimeout(()=>{this.performSearch(a.value)},300)},l=async()=>{this.bookingState.data=null,await this.loadBookingData()},m=document.getElementById("bookingLangSelect"),y=async()=>{this.bookingState.data=null,await this.loadBookingData()};e.addEventListener("change",r),a.addEventListener("input",d),m.addEventListener("change",y),document.querySelectorAll('input[name="subType"]').forEach(u=>{u.addEventListener("change",l)}),document.getElementById("retryBtn")?.addEventListener("click",()=>this.loadBookingData()),await r()}async loadBookingData(){const e=document.getElementById("pageTypeSelect").value;if(e==="genericLandingPages")return;const t=document.getElementById("bookingLangSelect")?.value||"it",n=document.querySelector('input[name="subType"]:checked')?.value==="landing"?"landing":null;this.setBookingUIState("loading");try{const s=await w.loadData(e,t,n);this.bookingState.data=s,this.bookingState.error=null,this.setBookingUIState("ready"),p.success(c.t("dataLoaded"));const i=document.getElementById("searchInput")?.value;i&&i.length>=3&&this.performSearch(i)}catch(s){console.error("[Booking] Load error:",s),this.bookingState.error=s.message,this.setBookingUIState("error")}}setBookingUIState(e){const t=document.getElementById("loadingState"),a=document.getElementById("errorState"),n=document.getElementById("resultsHeader"),s=document.getElementById("resultsContainer"),i=document.getElementById("searchHint");t.style.display=e==="loading"?"flex":"none",a.style.display=e==="error"?"flex":"none",n.style.display="none",s.innerHTML="",i&&(i.style.display=e==="ready"?"block":"none")}performSearch(e){if(!this.bookingState.data)return;const t=document.getElementById("resultsHeader"),a=document.getElementById("resultsContainer"),n=document.getElementById("resultsCount"),s=document.getElementById("searchHint");if(!e||e.length<3){t.style.display="none",a.innerHTML="",s&&(s.style.display="block");return}s&&(s.style.display="none");const i=document.getElementById("pageTypeSelect").value,r=w.search(e,this.bookingState.data,50);if(r.length===0){t.style.display="flex",n.textContent=c.t("noResultsFound"),a.innerHTML=`
        <div class="empty-state">
          <span class="empty-icon">🔍</span>
          <p data-i18n="noResultsFound">${c.t("noResultsFound")}</p>
        </div>
      `;return}t.style.display="flex",n.textContent=`${r.length} ${c.t("resultsFound")}`,a.innerHTML=r.map(d=>{const l=w.formatResult(d,i);return`
        <div class="result-card">
          <div class="result-info">
            <span class="result-name">${this.escapeHtml(l.name)}</span>
            ${l.subtitle?`<span class="result-subtitle">${this.escapeHtml(l.subtitle)}</span>`:""}
          </div>
          <div class="result-actions">
            <button class="btn btn-sm btn-primary" data-copy="${this.escapeHtml(l.url)}">${c.t("copyLink")}</button>
            <a href="${l.url}" target="_blank" class="btn btn-sm btn-outline">${c.t("openLink")}</a>
          </div>
        </div>
      `}).join(""),a.querySelectorAll("[data-copy]").forEach(d=>{d.addEventListener("click",async()=>{const l=await g.copyToClipboard(d.dataset.copy);p[l?"success":"error"](c.t(l?"deepLinkCopied":"copyError"))})})}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}showGenericLandingPages(){const e=document.getElementById("landingLinks");document.getElementById("landingLinksCard").style.display="block",document.getElementById("resultsCard").style.display="none";const t=[{key:"homePage",url:"https://www.booking.com/index.html?aid=955564"},{key:"apartmentsPage",url:"https://www.booking.com/apartments/index.html?aid=955564"},{key:"resortsPage",url:"https://www.booking.com/resorts/index.html?aid=955564"},{key:"villasPage",url:"https://www.booking.com/villas/index.html?aid=955564"},{key:"bedAndBreakfastPage",url:"https://www.booking.com/bed-and-breakfast/index.html?aid=955564"},{key:"guestHousePage",url:"https://www.booking.com/guest-house/index.html?aid=955564"}];e.innerHTML=t.map(a=>`
      <div class="link-item">
        <span>${c.t(a.key)}</span>
        <div class="link-actions">
          <a href="${a.url}" target="_blank" class="btn btn-sm btn-outline">${c.t("openLink")}</a>
          <button class="btn btn-sm btn-primary" data-copy="${a.url}">${c.t("copyLink")}</button>
        </div>
      </div>
    `).join(""),e.querySelectorAll("[data-copy]").forEach(a=>{a.addEventListener("click",async()=>{const n=await g.copyToClipboard(a.dataset.copy);p[n?"success":"error"](c.t(n?"deepLinkCopied":"copyError"))})})}renderTradedoublerPage(){return`
      <div class="page-header">
        <h2 data-i18n="usefulTLinksHeader">I Programmi Attivi</h2>
      </div>

      <div class="card td-unified-card">
        <!-- Site Selector -->
        <div class="td-site-selector">
          <select id="islandSelect" class="form-select">
            <option value="" data-i18n="selectSite">Seleziona un sito</option>
            ${g.getAllIslands().map(t=>`<option value="${t.code}">${t.displayName}</option>`).join("")}
          </select>
        </div>

        <!-- Deep Link Generator (Collapsible) -->
        <details class="td-deeplink-details">
          <summary class="td-deeplink-summary">
            <span data-i18n="generateDeepLinkSection">Genera Deep Link Personalizzato</span>
          </summary>
          <div class="td-deeplink-content">
            <div class="td-platform-row">
              <select id="platformSelect" class="form-select" disabled>
                <option value="" data-i18n="selectPlatform">Seleziona una piattaforma</option>
              </select>
            </div>
            <div id="partnerLinkContainer" class="alert alert-info" style="display:none;">
              <span id="partnerLink"></span>
            </div>
            <div class="td-input-row">
              <input type="text" id="inputUrl" class="form-control" placeholder="https://..." data-i18n-placeholder="urlPlaceholder">
              <button id="generateBtn" class="btn btn-primary" data-i18n="generateLink">Genera</button>
            </div>
            <div id="resultContainer" class="td-result-section" style="display:none;">
              <div class="result-box">
                <a id="resultLink" href="#" target="_blank" class="result-link"></a>
              </div>
              <div class="td-result-actions">
                <button id="copyResultBtn" class="btn btn-success" data-i18n="copyLink">Copia Link</button>
                <button id="openResultBtn" class="btn btn-outline" data-i18n="openLink">Apri Link</button>
              </div>
            </div>
          </div>
        </details>

        <!-- Program Cards Grid -->
        <div id="programCardsContainer" class="program-cards-grid">
          <div class="program-cards-empty">
            <span class="empty-icon">📋</span>
            <p data-i18n="selectSiteToViewPrograms">Seleziona un sito per vedere i programmi attivi</p>
          </div>
        </div>
      </div>
    `}initTradedoublerPage(){const e=document.getElementById("islandSelect"),t=document.getElementById("platformSelect"),a=document.getElementById("partnerLinkContainer"),n=document.getElementById("partnerLink"),s=document.getElementById("generateBtn"),i=document.getElementById("inputUrl"),r=document.getElementById("resultContainer"),d=document.getElementById("resultLink"),l=document.getElementById("programCardsContainer");e&&new b(e);let m=t?new b(t):null;const y=u=>{const h=S[u]||[];if(!u||h.length===0){l.innerHTML=`
          <div class="program-cards-empty">
            <span class="empty-icon">📋</span>
            <p data-i18n="selectSiteToViewPrograms">Seleziona un sito per vedere i programmi attivi</p>
          </div>
        `;return}const f=h.map(v=>{const k=g.getPartnerBaseLink(u,v),I=_[v]||"—",C=x[v]||"ALTRO";return`
          <div class="program-card">
            <div class="program-card-body">
              <div class="program-card-meta">
                <span class="program-badge program-badge--${C.toLowerCase().replace(/\s+/g,"-")}">${C}</span>
                <span class="program-id">ID: ${I}</span>
              </div>
              <h4 class="program-card-title">${this.escapeHtml(v)}</h4>
              <p class="program-card-link">${k?new URL(k).hostname:"tradedoubler.com"}</p>
            </div>
            <div class="program-card-actions">
              <button class="btn btn-sm btn-primary" data-copy="${this.escapeHtml(k||"")}" title="${c.t("copyLink")}">
                ${c.t("copyLink")}
              </button>
              <a href="${k||"#"}" target="_blank" class="btn btn-sm btn-outline" title="${c.t("openLink")}">
                ${c.t("openLink")}
              </a>
            </div>
          </div>
        `}).join("");l.innerHTML=`
        <div class="program-cards-count">${h.length} ${c.t("programsActive")||"programmi attivi"}</div>
        <div class="program-cards-wrapper">${f}</div>
      `,l.querySelectorAll("[data-copy]").forEach(v=>{v.addEventListener("click",async()=>{const k=v.dataset.copy;if(k){const I=await g.copyToClipboard(k);p[I?"success":"error"](c.t(I?"deepLinkCopied":"copyError"))}})})};e.addEventListener("change",()=>{const u=e.value;y(u),t.innerHTML=`<option value="">${c.t("selectPlatform")}</option>`,u?((S[u]||[]).forEach(h=>{t.appendChild(new Option(h,h))}),t.disabled=!1):t.disabled=!0,m&&m.destroy(),m=new b(t),a.style.display="none",r.style.display="none"}),t.addEventListener("change",()=>{const u=e.value,h=t.value;if(u&&h){const f=g.getPartnerBaseLink(u,h);f&&(n.innerHTML=`<a href="${f}" target="_blank">${f}</a>`,a.style.display="block")}else a.style.display="none"}),s.addEventListener("click",()=>{const u=e.value,h=t.value,f=i.value.trim();if(!u||!h){p.warning(c.t("selectSiteAndPlatform"));return}if(!f){p.warning(c.t("enterUrl"));return}const v=g.generateDeepLink(f,u,h);v.success?(d.href=v.link,d.textContent=v.link,r.style.display="block",p.success(c.t("deepLinkGenerated"))):p.error(c.t(v.error)||v.error)}),document.getElementById("copyResultBtn")?.addEventListener("click",async()=>{const u=await g.copyToClipboard(d.href);p[u?"success":"error"](c.t(u?"deepLinkCopied":"copyError"))}),document.getElementById("openResultBtn")?.addEventListener("click",()=>{g.openLink(d.href)})}renderGetYourGuidePage(){return`
      <div class="page-header">
        <h2 data-i18n="GetYourGuideLink">Deep Link GetYourGuide</h2>
      </div>

      <!-- Homepage Links Section -->
      <div class="card">
        <h3 class="section-title" data-i18n="homepageLinks">Link Homepage</h3>
        <div id="gygHomepageResult" class="result-container">
          <label class="form-label" data-i18n="affiliateLink">Link Affiliato</label>
          <div class="result-box">
            <a id="gygHomepageLink" href="#" target="_blank" class="result-link"></a>
          </div>
          <div class="integrated-actions mt-4">
            <select id="gygLangSelect" class="form-select form-select-sm">
              <option value="it">🇮🇹 IT</option>
              <option value="es">🇪🇸 ES</option>
              <option value="en">🇬🇧 EN</option>
              <option value="fr">🇫🇷 FR</option>
            </select>
            <div class="button-group">
              <button id="gygHomepageCopyBtn" class="btn btn-success" data-i18n="copyLink">Copia Link</button>
              <button id="gygHomepageOpenBtn" class="btn btn-outline" data-i18n="openLink">Apri Link</button>
            </div>
          </div>
        </div>
      </div>

      <!-- URL Transformer Section -->
      <div class="card mt-6">
        <h3 class="section-title" data-i18n="generateDeepLinkSection">Genera Deep Link</h3>
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
    `}initGetYourGuidePage(){const e={it:"https://www.getyourguide.it/?partner_id=Q5TFESQ&utm_medium=online_publisher",es:"https://www.getyourguide.es/?partner_id=Q5TFESQ&utm_medium=online_publisher",en:"https://www.getyourguide.com/?partner_id=Q5TFESQ&utm_medium=online_publisher",fr:"https://www.getyourguide.fr/?partner_id=Q5TFESQ&utm_medium=online_publisher"},t=document.getElementById("gygLangSelect"),a=document.getElementById("gygHomepageLink");t&&new b(t);const n=()=>{const l=e[t.value]||e.en;a.href=l,a.textContent=l};t.addEventListener("change",n),n(),document.getElementById("gygHomepageCopyBtn")?.addEventListener("click",async()=>{const l=await g.copyToClipboard(a.href);p[l?"success":"error"](c.t(l?"deepLinkCopied":"copyError"))}),document.getElementById("gygHomepageOpenBtn")?.addEventListener("click",()=>{g.openLink(a.href)});const s=document.getElementById("gygInput"),i=document.getElementById("gygGenerateBtn"),r=document.getElementById("gygResult"),d=document.getElementById("gygResultLink");i.addEventListener("click",()=>{const l=s.value.trim();if(!l){p.warning(c.t("validGetYourGuideURL"));return}const m=g.generateGetYourGuideLink(l);m.success?(d.href=m.link,d.textContent=m.link,r.style.display="block",p.success(c.t("deepLinkGenerated"))):p.error(c.t(m.error))}),document.getElementById("gygCopyBtn")?.addEventListener("click",async()=>{const l=await g.copyToClipboard(d.href);p[l?"success":"error"](c.t(l?"deepLinkCopied":"copyError"))}),document.getElementById("gygOpenBtn")?.addEventListener("click",()=>{g.openLink(d.href)})}renderCivitatisPage(){return`
      <div class="page-header">
        <h2 data-i18n="CivitatisLink">Deep Link Civitatis</h2>
      </div>

      <!-- Homepage Links Section -->
      <div class="card">
        <h3 class="section-title" data-i18n="homepageLinks">Link Homepage</h3>
        <div id="civHomepageResult" class="result-container">
          <label class="form-label" data-i18n="affiliateLink">Link Affiliato</label>
          <div class="result-box">
            <a id="civHomepageLink" href="#" target="_blank" class="result-link"></a>
          </div>
          <div class="integrated-actions mt-4">
            <select id="civLangSelect" class="form-select form-select-sm">
              <option value="it">🇮🇹 IT</option>
              <option value="es">🇪🇸 ES</option>
              <option value="en">🇬🇧 EN</option>
              <option value="fr">🇫🇷 FR</option>
            </select>
            <div class="button-group">
              <button id="civHomepageCopyBtn" class="btn btn-success" data-i18n="copyLink">Copia Link</button>
              <button id="civHomepageOpenBtn" class="btn btn-outline" data-i18n="openLink">Apri Link</button>
            </div>
          </div>
        </div>
      </div>

      <!-- URL Transformer Section -->
      <div class="card mt-6">
        <h3 class="section-title" data-i18n="generateDeepLinkSection">Genera Deep Link</h3>
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
    `}initCivitatisPage(){const e={it:"https://www.civitatis.com/it/?aid=5488",es:"https://www.civitatis.com/es/?aid=5488",en:"https://www.civitatis.com/en/?aid=5488",fr:"https://www.civitatis.com/fr/?aid=5488"},t=document.getElementById("civLangSelect"),a=document.getElementById("civHomepageLink");t&&new b(t);const n=()=>{const l=e[t.value]||e.en;a.href=l,a.textContent=l};t.addEventListener("change",n),n(),document.getElementById("civHomepageCopyBtn")?.addEventListener("click",async()=>{const l=await g.copyToClipboard(a.href);p[l?"success":"error"](c.t(l?"deepLinkCopied":"copyError"))}),document.getElementById("civHomepageOpenBtn")?.addEventListener("click",()=>{g.openLink(a.href)});const s=document.getElementById("civInput"),i=document.getElementById("civGenerateBtn"),r=document.getElementById("civResult"),d=document.getElementById("civResultLink");i.addEventListener("click",()=>{const l=s.value.trim();if(!l){p.warning(c.t("validCivitatisURL"));return}const m=g.generateCivitatisLink(l);m.success?(d.href=m.link,d.textContent=m.link,r.style.display="block",p.success(c.t("deepLinkGenerated"))):p.error(c.t(m.error))}),document.getElementById("civCopyBtn")?.addEventListener("click",async()=>{const l=await g.copyToClipboard(d.href);p[l?"success":"error"](c.t(l?"deepLinkCopied":"copyError"))}),document.getElementById("civOpenBtn")?.addEventListener("click",()=>{g.openLink(d.href)})}renderCarRentalPage(){return`
      <div class="page-header">
        <h2 data-i18n="carRentalHeader">Noleggio Auto a Minorca</h2>
      </div>

      <div class="card">
        <div class="form-group">
          <label class="form-label" data-i18n="selectProvider">Seleziona Noleggio</label>
          <select id="carProviderSelect" class="form-select">
            ${B.map((e,t)=>`<option value="${t}">${e.name}</option>`).join("")}
          </select>
        </div>

        <div id="carLinkContainer" class="result-container mt-6">
          <label class="form-label" data-i18n="affiliateLink">Link Affiliato</label>
          <div class="result-box">
            <a id="carResultLink" href="#" target="_blank" class="result-link"></a>
          </div>
          <div class="integrated-actions mt-4">
            <select id="carLangSelect" class="form-select form-select-sm">
              <option value="it">🇮🇹 IT</option>
              <option value="es">🇪🇸 ES</option>
              <option value="en">🇬🇧 EN</option>
              <option value="fr">🇫🇷 FR</option>
              <option value="de">🇩🇪 DE</option>
            </select>
            <div class="button-group">
              <button id="carCopyBtn" class="btn btn-success" data-i18n="copyLink">Copia Link</button>
              <button id="carOpenBtn" class="btn btn-outline" data-i18n="openLink">Apri Link</button>
            </div>
          </div>
        </div>

        <p class="note text-muted" style="margin-top: 16px; font-style: italic;" data-i18n="carRentalNotice">I link puntano alle homepage delle rispettive piattaforme di noleggio auto.</p>
      </div>
    `}initCarRentalPage(){const e=document.getElementById("carProviderSelect"),t=document.getElementById("carLangSelect"),a=document.getElementById("carResultLink");e&&new b(e),t&&new b(t);const n=()=>{const s=B[e.value],i=t.value,r=s.urls[i]||s.urls.en||Object.values(s.urls)[0];a.href=r,a.textContent=r};e.addEventListener("change",n),t.addEventListener("change",n),n(),document.getElementById("carCopyBtn")?.addEventListener("click",async()=>{const s=await g.copyToClipboard(a.href);p[s?"success":"error"](c.t(s?"deepLinkCopied":"copyError"))}),document.getElementById("carOpenBtn")?.addEventListener("click",()=>{g.openLink(a.href)})}renderImageToolPage(){return`
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
    `}initImageToolPage(){const e=document.getElementById("dropZone"),t=document.getElementById("imageInput"),a=document.getElementById("qualitySlider"),n=document.getElementById("qualityValue"),s=document.getElementById("formatSelect"),i=document.getElementById("imagesContainer"),r=document.getElementById("downloadAllContainer");s&&new b(s),this.compressedImages=[],a.addEventListener("input",()=>{n.textContent=`${a.value}%`}),e.addEventListener("click",()=>t.click()),["dragenter","dragover","dragleave","drop"].forEach(d=>{e.addEventListener(d,l=>{l.preventDefault(),l.stopPropagation()})}),e.addEventListener("dragenter",()=>e.classList.add("drag-over")),e.addEventListener("dragover",()=>e.classList.add("drag-over")),e.addEventListener("dragleave",()=>e.classList.remove("drag-over")),e.addEventListener("drop",d=>{e.classList.remove("drag-over");const l=d.dataTransfer.files;this.processImages(l)}),t.addEventListener("change",()=>{this.processImages(t.files)}),document.getElementById("clearAllBtn")?.addEventListener("click",()=>{this.compressedImages=[],i.innerHTML="",r.style.display="none"}),document.getElementById("downloadAllBtn")?.addEventListener("click",async()=>{this.compressedImages.length!==0&&await this.downloadAllAsZip()})}async processImages(e){const t=document.getElementById("qualitySlider").value/100,a=document.getElementById("formatSelect").value,n=document.getElementById("imagesContainer"),s=document.getElementById("downloadAllContainer");for(const i of e)if(i.type.startsWith("image/"))try{const r=await this.compressImage(i,t,a);this.compressedImages.push(r),this.renderImageCard(r,n),this.updateTotalStats(),s.style.display="block"}catch(r){console.error("Compression error:",r),p.error(`Errore: ${i.name}`)}}compressImage(e,t,a){return new Promise((n,s)=>{const i=new FileReader;i.onload=r=>{const d=new Image;d.onload=()=>{const l=document.createElement("canvas");l.width=d.naturalWidth,l.height=d.naturalHeight,l.getContext("2d").drawImage(d,0,0),l.toBlob(y=>{if(!y){s(new Error("Compression failed"));return}const u=a==="image/webp"?"webp":a==="image/png"?"png":"jpg",h=e.name.replace(/\.[^/.]+$/,"");n({originalName:e.name,compressedName:`${h}_compressed.${u}`,originalSize:e.size,compressedSize:y.size,reduction:((1-y.size/e.size)*100).toFixed(1),blob:y,url:URL.createObjectURL(y)})},a,t)},d.onerror=s,d.src=r.target.result},i.onerror=s,i.readAsDataURL(e)})}renderImageCard(e,t){const a=document.createElement("div");a.className="image-card";const n=i=>i>1024*1024?`${(i/1024/1024).toFixed(2)} MB`:`${(i/1024).toFixed(1)} KB`,s=parseFloat(e.reduction)>50?"text-success":parseFloat(e.reduction)>20?"text-warning":"text-muted";a.innerHTML=`
      <img src="${e.url}" alt="${e.originalName}" class="image-preview">
      <div class="image-info">
        <span class="image-name">${this.escapeHtml(e.originalName)}</span>
        <div class="image-stats">
          <span>${n(e.originalSize)} → ${n(e.compressedSize)}</span>
          <span class="${s}">-${e.reduction}%</span>
        </div>
      </div>
      <div class="image-actions">
        <button class="btn btn-sm btn-primary download-btn">${c.t("download")}</button>
        <button class="btn btn-sm btn-outline remove-btn">✕</button>
      </div>
    `,a.querySelector(".download-btn").addEventListener("click",()=>{const i=document.createElement("a");i.href=e.url,i.download=e.compressedName,i.click()}),a.querySelector(".remove-btn").addEventListener("click",()=>{const i=this.compressedImages.findIndex(r=>r.url===e.url);i>-1&&(URL.revokeObjectURL(e.url),this.compressedImages.splice(i,1),a.remove(),this.updateTotalStats(),this.compressedImages.length===0&&(document.getElementById("downloadAllContainer").style.display="none"))}),t.appendChild(a)}updateTotalStats(){const e=document.getElementById("totalStats");if(!e||this.compressedImages.length===0)return;const t=this.compressedImages.reduce((i,r)=>i+r.originalSize,0),a=this.compressedImages.reduce((i,r)=>i+r.compressedSize,0),n=((1-a/t)*100).toFixed(1),s=i=>i>1024*1024?`${(i/1024/1024).toFixed(2)} MB`:`${(i/1024).toFixed(1)} KB`;e.textContent=`${this.compressedImages.length} ${c.t("images")} • ${s(t)} → ${s(a)} (-${n}%)`}async downloadAllAsZip(){if(!window.JSZip){const n=document.createElement("script");n.src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",document.head.appendChild(n),await new Promise(s=>n.onload=s)}const e=new JSZip;for(const n of this.compressedImages)e.file(n.compressedName,n.blob);const t=await e.generateAsync({type:"blob"}),a=document.createElement("a");a.href=URL.createObjectURL(t),a.download="compressed_images.zip",a.click(),URL.revokeObjectURL(a.href),p.success(c.t("downloadStarted"))}renderFeedbackPage(){return`
      <div class="page-header">
        <h2 data-i18n="feedbackHeader">💡 Segnalazioni e Suggerimenti</h2>
      </div>

      <div class="card feedback-card">
        <form id="feedbackForm" name="contact" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="contact">
          
          <div class="form-group">
            <label class="form-label" data-i18n="yourName">Nome</label>
            <input type="text" id="feedbackName" name="name" class="form-control" required>
          </div>

          <div class="form-group">
            <label class="form-label" data-i18n="yourEmail">Email</label>
            <input type="email" id="feedbackEmail" name="email" class="form-control" required>
          </div>

          <div class="form-group">
            <label class="form-label" data-i18n="platform">Piattaforma</label>
            <select id="feedbackPlatform" name="platform" class="form-select" required>
              <option value="booking">Booking</option>
              <option value="tradedoubler">Tradedoubler</option>
              <option value="getyourguide">GetYourGuide</option>
              <option value="civitatis">Civitatis</option>
              <option value="carrental" data-i18n="carRentalNav">Noleggio Auto</option>
              <option value="imgtool" data-i18n="imageToolNav">Immagini</option>
              <option value="other" data-i18n="other">Altro</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" data-i18n="message">Messaggio</label>
            <textarea id="feedbackMessage" name="message" class="form-control form-textarea" rows="6" required></textarea>
          </div>

          <div class="button-group">
            <button type="submit" class="btn btn-primary btn-lg" data-i18n="send">Invia</button>
          </div>
        </form>

        <div id="feedbackSuccess" class="feedback-success" style="display:none;">
          <div class="success-icon">✅</div>
          <h3 data-i18n="thankYou">Grazie!</h3>
          <p data-i18n="messageReceived">Il tuo messaggio è stato ricevuto. Ti risponderemo al più presto.</p>
          <button id="newFeedbackBtn" class="btn btn-outline mt-4" data-i18n="sendAnother">Invia un altro</button>
        </div>
      </div>
    `}initFeedbackPage(){const e=document.getElementById("feedbackForm"),t=document.getElementById("feedbackSuccess"),a="https://formspree.io/f/mjgggwek";e?.addEventListener("submit",async n=>{n.preventDefault();const s=new FormData(e);try{if((await fetch(a,{method:"POST",body:s,headers:{Accept:"application/json"}})).ok)e.style.display="none",t.style.display="block",p.success(c.t("messageSent"));else throw new Error("Form submission failed")}catch(i){console.error("Form error:",i),p.error(c.t("sendError"))}}),document.getElementById("newFeedbackBtn")?.addEventListener("click",()=>{e.reset(),e.style.display="block",t.style.display="none"})}}document.addEventListener("DOMContentLoaded",()=>{new F().init()});
