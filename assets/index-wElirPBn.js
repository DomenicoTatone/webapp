(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();class y{constructor(e,t={}){this.originalSelect=e,this.options={searchable:t.searchable||!1,placeholder:t.placeholder||"Select...",...t},this.isOpen=!1,this.selectedIndex=-1,this.focusedIndex=-1,this.id=`custom-select-${Math.random().toString(36).substr(2,9)}`,this.init()}init(){this.originalSelect.style.display="none",this.originalSelect.setAttribute("aria-hidden","true"),this.container=this.createContainer(),this.originalSelect.parentNode.insertBefore(this.container,this.originalSelect.nextSibling),this.syncFromOriginal(),this.bindEvents()}createContainer(){const e=document.createElement("div");return e.className="custom-select",e.innerHTML=`
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
            `}).join("")}bindEvents(){const e=this.container.querySelector(".custom-select__trigger"),t=this.container.querySelector(".custom-select__dropdown"),a=this.container.querySelector(".custom-select__options");e.addEventListener("click",()=>this.toggle()),a.addEventListener("click",n=>{const s=n.target.closest(".custom-select__option");s&&!s.classList.contains("is-disabled")&&this.selectOption(parseInt(s.dataset.index))}),e.addEventListener("keydown",n=>this.handleKeydown(n)),t.addEventListener("keydown",n=>this.handleKeydown(n)),document.addEventListener("click",n=>{this.container.contains(n.target)||this.close()}),this.options.searchable&&this.container.querySelector(".custom-select__search-input").addEventListener("input",s=>this.filterOptions(s.target.value))}handleKeydown(e){const t=this.container.querySelectorAll(".custom-select__option:not(.is-disabled):not(.is-hidden)");switch(e.key){case"Enter":case" ":if(e.preventDefault(),this.isOpen&&this.focusedIndex>=0){const a=t[this.focusedIndex];a&&this.selectOption(parseInt(a.dataset.index))}else this.toggle();break;case"Escape":e.preventDefault(),this.close();break;case"ArrowDown":e.preventDefault(),this.isOpen?this.focusOption(Math.min(this.focusedIndex+1,t.length-1)):this.open();break;case"ArrowUp":e.preventDefault(),this.isOpen?this.focusOption(Math.max(this.focusedIndex-1,0)):this.open();break;case"Tab":this.close();break}}focusOption(e){const t=this.container.querySelectorAll(".custom-select__option:not(.is-disabled):not(.is-hidden)");t.forEach(a=>a.classList.remove("is-focused")),t[e]&&(t[e].classList.add("is-focused"),t[e].scrollIntoView({block:"nearest"}),this.focusedIndex=e)}toggle(){this.isOpen?this.close():this.open()}open(){if(this.isOpen)return;this.isOpen=!0,this.container.classList.add("is-open"),this.container.querySelector(".custom-select__trigger").setAttribute("aria-expanded","true");const t=this.container.querySelector(".custom-select__option.is-selected");if(t){const a=this.container.querySelectorAll(".custom-select__option:not(.is-disabled)");this.focusedIndex=Array.from(a).indexOf(t),this.focusOption(this.focusedIndex)}else this.focusOption(0);this.options.searchable&&setTimeout(()=>{this.container.querySelector(".custom-select__search-input").focus()},50)}close(){if(!this.isOpen)return;this.isOpen=!1,this.container.classList.remove("is-open");const e=this.container.querySelector(".custom-select__trigger");if(e.setAttribute("aria-expanded","false"),e.focus(),this.options.searchable){const t=this.container.querySelector(".custom-select__search-input");t.value="",this.filterOptions("")}this.container.querySelectorAll(".custom-select__option").forEach(t=>{t.classList.remove("is-focused")}),this.focusedIndex=-1}selectOption(e){const a=this.originalSelect.querySelectorAll("option")[e];if(!a||a.disabled)return;this.originalSelect.value=a.value,this.originalSelect.dispatchEvent(new Event("change",{bubbles:!0}));const n=this.container.querySelector(".custom-select__value");n.textContent=a.textContent,n.classList.add("has-value"),this.container.querySelectorAll(".custom-select__option").forEach((s,i)=>{s.classList.toggle("is-selected",i===e),s.setAttribute("aria-selected",i===e)}),this.selectedIndex=e,this.close()}filterOptions(e){const t=this.container.querySelectorAll(".custom-select__option"),a=e.toLowerCase();t.forEach(n=>{const i=n.textContent.toLowerCase().includes(a);n.classList.toggle("is-hidden",!i)}),this.focusedIndex=-1,this.focusOption(0)}syncFromOriginal(){const e=this.originalSelect.querySelector("option:checked");if(e&&e.value){const t=Array.from(this.originalSelect.querySelectorAll("option")).indexOf(e);if(t>=0){const a=this.container.querySelector(".custom-select__value");a.textContent=e.textContent,a.classList.add("has-value"),this.selectedIndex=t;const n=this.container.querySelector(`[data-index="${t}"]`);n&&(n.classList.add("is-selected"),n.setAttribute("aria-selected","true"))}}}getValue(){return this.originalSelect.value}setValue(e){const t=this.originalSelect.querySelectorAll("option"),a=Array.from(t).findIndex(n=>n.value===e);a>=0&&this.selectOption(a)}destroy(){this.originalSelect.style.display="",this.originalSelect.removeAttribute("aria-hidden"),this.container.remove()}}const L=["it","en","es","fr","de"],f="it";class T{constructor(){this.messages={},this.currentLanguage=f,this.isLoaded=!1}async init(){return this.currentLanguage=this.detectBrowserLanguage(),await this.loadMessages(this.currentLanguage),this.applyLanguageToDocument(),this}detectBrowserLanguage(){const e=localStorage.getItem("selectedLanguage");if(e&&L.includes(e))return e;const t=navigator.languages||[navigator.language||navigator.userLanguage];for(const a of t){const n=a.split("-")[0].toLowerCase();if(L.includes(n))return console.log(`[i18n] Browser language detected: ${n}`),n}return console.log(`[i18n] No matching language found, using default: ${f}`),f}async loadMessages(e){try{const a=await fetch(`/webapp/locales/${e}/messages.json`);if(!a.ok)throw new Error(`Failed to load ${e} messages`);this.messages=await a.json(),this.isLoaded=!0,console.log(`[i18n] Loaded messages for: ${e}`)}catch(t){console.error(`[i18n] Error loading ${e}:`,t),e!==f&&(console.log(`[i18n] Falling back to ${f}`),await this.loadMessages(f))}}getLanguage(){return this.currentLanguage}async setLanguage(e){return L.includes(e)?(this.currentLanguage=e,localStorage.setItem("selectedLanguage",e),await this.loadMessages(e),this.applyLanguageToDocument(),this.translatePage(),!0):(console.warn(`[i18n] Language ${e} not supported`),!1)}applyLanguageToDocument(){document.documentElement.lang=this.currentLanguage}t(e){return this.isLoaded?this.messages[e]||e:(console.warn("[i18n] Messages not loaded yet"),e)}translatePage(){this.isLoaded&&(document.querySelectorAll("[data-i18n]").forEach(e=>{const t=e.getAttribute("data-i18n"),a=this.t(t);e.tagName==="INPUT"||e.tagName==="TEXTAREA"||(e.textContent=a)}),document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>{const t=e.getAttribute("data-i18n-placeholder");e.placeholder=this.t(t)}),document.querySelectorAll("[data-i18n-title]").forEach(e=>{const t=e.getAttribute("data-i18n-title");e.title=this.t(t)}))}getSupportedLanguages(){return[{code:"it",label:"Italiano"},{code:"en",label:"English"},{code:"es",label:"Español"},{code:"fr",label:"Français"},{code:"de",label:"Deutsch"}]}}const d=new T,I={3220593:"Isola di Formentera",3337668:"Isola di Lanzarote",1639250:"Isola di Minorca",3349565:"Isola di Minorca EN",3349567:"Isola di Minorca ES",3335968:"Vacanze nel Mediterraneo"},w={eDreams:"17269","Direct Ferries IT":"313887","Direct Ferries ES":"327261","Direct Ferries UK":"324849","Vueling IT":"288053","Vueling UK":"320047",Weweed:"343473","Allianz Partners":"72847","AXA Assistance":"261028","Barceló Hotels & Resorts":"282865","Columbus Assicurazioni":"76623",Veratour:"319774",Viaggisicuri:"249882","Yalla Yalla":"218733","Airport Parking Luton":"343105","Airport Parking Manchester":"343201","Airport Parking With Us":"343202","Bee Parking":"383148","Compare Cheap Parking Prices At M...":"355499","Compare Parking Prices":"355683","Compare Your Parking Deals":"360206","Muslim Aid":"335318","AXA Seguros de Viaje":"343738",InterMundial:"381548","Vayacruceros ES":"342494","Eurowings IT":"307239","Grandi Navi Veloci IT":"316693","Viaggi in crociera":"341133"},P={eDreams:"VIAGGI, SHOPPING & RETAIL, AUTOMOTIVE","Direct Ferries IT":"VIAGGI","Allianz Partners":"ASSICURAZIONI, VIAGGI","AXA Assistance":"ASSICURAZIONI","Barceló Hotels & Resorts":"VIAGGI","Columbus Assicurazioni":"FINANZA, FAMIGLIA, ASSICURAZIONI",Veratour:"VIAGGI",Viaggisicuri:"ASSICURAZIONI","Yalla Yalla":"VIAGGI","Airport Parking Luton":"VIAGGI","Airport Parking Manchester":"VIAGGI","Airport Parking With Us":"VIAGGI","Bee Parking":"VIAGGI","Compare Cheap Parking Prices At M...":"VIAGGI","Compare Parking Prices":"VIAGGI","Compare Your Parking Deals":"VIAGGI","Direct Ferries UK":"VIAGGI","Muslim Aid":"ORGANIZZAZIONI NO PROFIT","AXA Seguros de Viaje":"VIAGGI","Direct Ferries ES":"VIAGGI",InterMundial:"ASSICURAZIONI, VIAGGI","Vayacruceros ES":"VIAGGI","Eurowings IT":"VIAGGI","Grandi Navi Veloci IT":"VIAGGI","Viaggi in crociera":"VIAGGI"},B={3220593:["eDreams"],3337668:["Direct Ferries IT","eDreams"],1639250:["Allianz Partners","AXA Assistance","Barceló Hotels & Resorts","Columbus Assicurazioni","Direct Ferries IT","Veratour","Viaggisicuri","Yalla Yalla"],3349565:["Airport Parking Luton","Airport Parking Manchester","Airport Parking With Us","Bee Parking","Compare Cheap Parking Prices At M...","Compare Parking Prices","Compare Your Parking Deals","Direct Ferries UK","Muslim Aid"],3349567:["AXA Seguros de Viaje","Direct Ferries ES","eDreams","InterMundial","Vayacruceros ES"],3335968:["Direct Ferries IT","Eurowings IT","Grandi Navi Veloci IT","Veratour","Viaggi in crociera"]};function _(){const l={};for(const[e,t]of Object.entries(B)){l[e]={};for(const a of t){const n=w[a];n&&(l[e][a]=`https://clk.tradedoubler.com/click?p=${n}&a=${e}`)}}return l}const E=_(),S=[{name:"Coches Menorca",urls:{it:"https://cochesmenorca.es/it/?agentId=3",es:"https://cochesmenorca.es/?agentId=3",en:"https://cochesmenorca.es/en/?agentId=3",fr:"https://cochesmenorca.es/en/?agentId=3",de:"https://cochesmenorca.es/en/?agentId=3"}},{name:"Menorca Rent",urls:{it:"https://www.menorcarent.com/it/?agentId=15",es:"https://www.menorcarent.com/?agentId=15",en:"https://www.menorcarent.com/en/?agentId=15",fr:"https://www.menorcarent.com/fr/?agentId=15",de:"https://www.menorcarent.com/en/?agentId=15"}},{name:"Autos Xoroi",urls:{it:"http://www.alquilercochesmenorca.com/it/?link=ISOLADIMINORCA",es:"http://www.alquilercochesmenorca.com/es/?link=ISOLADIMINORCA",en:"http://www.alquilercochesmenorca.com/?link=ISOLADIMINORCA",fr:"http://www.alquilercochesmenorca.com/fr/?link=ISOLADIMINORCA",de:"http://www.alquilercochesmenorca.com/?link=ISOLADIMINORCA"}},{name:"HIPER Rent a Car",urls:{it:"https://hiperrentacar.com/it/?colaborador=LO-0495108",es:"https://hiperrentacar.com/es/?colaborador=LO-0495108",en:"https://hiperrentacar.com/en/?colaborador=LO-0495108",fr:"https://hiperrentacar.com/fr/?colaborador=LO-0495108",de:"https://hiperrentacar.com/de/?colaborador=LO-0495108"}},{name:"Rentalcars",urls:{it:"https://www.rentalcars.com/it/?affiliateCode=latitudine983",es:"https://www.rentalcars.com/es/?affiliateCode=latitudine983",en:"https://www.rentalcars.com/en/?affiliateCode=latitudine983",fr:"https://www.rentalcars.com/fr/?affiliateCode=latitudine983",de:"https://www.rentalcars.com/de/?affiliateCode=latitudine983"}}],C={1639250:{"Allianz Partners":["https://www.allianz-assicurazioneviaggio.it/","https://www.allianz-assistance.it/"],"AXA Assistance":["https://www.assicurazione-viaggio.axa-assistance.it/"],"Barceló Hotels & Resorts":["https://www.barcelo.com/"],"Columbus Assicurazioni":["https://www.columbusassicurazioni.it/"],"Direct Ferries IT":["https://www.directferries"],Veratour:["https://www.veratour.it/"],Viaggisicuri:["https://www.viaggisicuri.com/"],"Yalla Yalla":["https://www.yallayalla.it/"]},3220593:{eDreams:["https://www.edreams.it/"]},3337668:{"Direct Ferries IT":["https://www.directferries"],eDreams:["https://www.edreams.it/"]},3349565:{"Direct Ferries UK":["https://www.directferries"]},3349567:{eDreams:["https://www.edreams.es/"],"Vayacruceros ES":["https://www.vayacruceros.com/"]},3335968:{"Direct Ferries IT":["https://www.directferries"],"Eurowings IT":["https://www.eurowings.com/"],"Grandi Navi Veloci IT":["https://www.gnv.it/"],Veratour:["https://www.veratour.it/"],"Viaggi in crociera":["https://www.viaggio-in-crociera.it/"]}};class ${generateDeepLink(e,t,a=null){let n;try{n=new URL(e)}catch{return{success:!1,error:"invalidUrl"}}if(!a){const c=this.detectPartnerFromUrl(e,t);if(!c)return{success:!1,error:"partnerNotRecognized"};a=c.partner}const s=this.getPartnerBaseLink(t,a);if(!s)return{success:!1,error:"Programma o partner non trovato"};if(!this.validateUrl(n.href,t,a))return{success:!1,error:`URL non valido per ${a}`};const i=encodeURIComponent(n.href);return{success:!0,link:`${s}&url=${i}`,partner:a}}getPartnerBaseLink(e,t){return E[e]?.[t]||null}validateUrl(e,t,a){const n=C[t]?.[a];return n?n.some(s=>e.includes(s)):!0}detectPartnerFromUrl(e,t){const a=C[t];if(!a)return null;for(const[n,s]of Object.entries(a))if(s.some(i=>e.includes(i)))return{partner:n,programId:w[n]||null,category:P[n]||"ALTRO"};return null}getPartnersForIsland(e){const t=E[e];return t?Object.keys(t).map(a=>({name:a,link:t[a]})):[]}getIslandName(e){return I[e]||"Isola Sconosciuta"}getAllIslands(){return Object.entries(I).map(([e,t])=>({code:e,name:t,displayName:`${t} - ${e}`})).sort((e,t)=>e.name.localeCompare(t.name))}async copyToClipboard(e){try{return await navigator.clipboard.writeText(e),!0}catch{try{const a=document.createElement("textarea");return a.value=e,a.style.position="fixed",a.style.left="-9999px",document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),!0}catch{return!1}}}openLink(e){window.open(e,"_blank","noopener,noreferrer")}generateGetYourGuideLink(e){try{return new URL(e).hostname.match(/getyourguide\.[a-z]{2,}/i)?{success:!0,link:`https://www.getyourguide.com/click/track?partner_id=32A3BBP4J4PPZMHRC1G0&url=${encodeURIComponent(e)}`}:{success:!1,error:"validGetYourGuideURL"}}catch{return{success:!1,error:"invalidUrl"}}}generateCivitatisLink(e){try{return new URL(e).hostname.match(/civitatis\.[a-z]{2,}/i)?{success:!0,link:`https://www.civitatis.com/affiliate/?aid=52698&url=${encodeURIComponent(e)}`}:{success:!1,error:"validCivitatisURL"}}catch{return{success:!1,error:"invalidUrl"}}}}const m=new $;class x{constructor(){this.currentTimeout=null}show(e,t="info",a=4e3){let n=document.getElementById("page-status");if(!n){const i=document.getElementById("page-content");if(i)n=document.createElement("div"),n.id="page-status",n.className="page-status",i.insertBefore(n,i.firstChild);else{console.warn("No page-status element found");return}}this.currentTimeout&&clearTimeout(this.currentTimeout);const s={success:"✓",error:"✕",warning:"⚠",info:"ℹ"};n.innerHTML=`
            <span class="page-status__icon">${s[t]||s.info}</span>
            <span class="page-status__message">${e}</span>
        `,n.className=`page-status page-status--${t} page-status--visible`,a>0&&(this.currentTimeout=setTimeout(()=>{this.dismiss()},a))}dismiss(){const e=document.getElementById("page-status");e&&(e.classList.remove("page-status--visible"),setTimeout(()=>{e.classList.contains("page-status--visible")||(e.innerHTML="",e.className="page-status")},250))}success(e,t){return this.show(e,"success",t)}error(e,t){return this.show(e,"error",t)}warning(e,t){return this.show(e,"warning",t)}info(e,t){return this.show(e,"info",t)}}const p=new x,D="https://allspainbookinglinks.s3.eu-west-3.amazonaws.com",A={hotelPage:{file:l=>`hotel_page_links_${l}.js`,variableName:l=>`links${l.toUpperCase()}`,hasSubType:!1},cityPage:{file:(l,e)=>e==="landing"?`city_landing_page_links_${l}.js`:`city_page_links_${l}.js`,variableName:(l,e)=>e==="landing"?`linksLandingCityPage${l.toUpperCase()}`:`linksCityPage${l.toUpperCase()}`,hasSubType:!0},airportPage:{file:(l,e)=>e==="landing"?`airport_landing_page_links_${l}.js`:`airport_page_links_${l}.js`,variableName:(l,e)=>e==="landing"?`linksAirportLanding${l.toUpperCase()}`:`linksAirport${l.toUpperCase()}`,hasSubType:!0},districtPage:{file:(l,e)=>e==="landing"?`district_landing_page_links_${l}.js`:`district_page_links_${l}.js`,variableName:(l,e)=>e==="landing"?`linksDistrictLandingPage${l.toUpperCase()}`:`linksDistrictPage${l.toUpperCase()}`,hasSubType:!0},islandPage:{file:(l,e)=>e==="landing"?`island_landing_page_links_${l}.js`:`island_page_links_${l}.js`,variableName:(l,e)=>e==="landing"?`linksLandingIslandPage${l.toUpperCase()}`:`linksIslandPage${l.toUpperCase()}`,hasSubType:!0},landmarkPage:{file:(l,e)=>e==="landing"?`landmark_landing_page_links_${l}.js`:`landmark_page_links_${l}.js`,variableName:(l,e)=>e==="landing"?`linksLandmarkLandingPage${l.toUpperCase()}`:`linksLandmarkPage${l.toUpperCase()}`,hasSubType:!0},regionPage:{file:(l,e)=>e==="landing"?`region_landing_page_links_${l}.js`:`region_page_links_${l}.js`,variableName:(l,e)=>e==="landing"?`linksRegionLandingPage${l.toUpperCase()}`:`linksRegionPage${l.toUpperCase()}`,hasSubType:!0}};class R{constructor(){this.dataCache=new Map,this.loadingPromises=new Map,this.DB_NAME="DeepLinkPro",this.DB_VERSION=1,this.STORE_NAME="bookingData",this.CACHE_EXPIRY_MS=1440*60*1e3,this.db=null,this.dbReady=this._initDB()}async _initDB(){if(!window.indexedDB){console.warn("[BookingData] IndexedDB not supported, using memory-only cache");return}try{this.db=await new Promise((e,t)=>{const a=indexedDB.open(this.DB_NAME,this.DB_VERSION);a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result),a.onupgradeneeded=n=>{const s=n.target.result;s.objectStoreNames.contains(this.STORE_NAME)||(s.createObjectStore(this.STORE_NAME,{keyPath:"key"}).createIndex("timestamp","timestamp",{unique:!1}),console.log("[BookingData] IndexedDB store created"))}}),console.log("[BookingData] IndexedDB connected")}catch(e){console.warn("[BookingData] IndexedDB init failed:",e),this.db=null}}getCacheKey(e,t,a=null){return`${e}_${t}_${a||"default"}`}async getFromStorage(e){if(await this.dbReady,!this.db)return null;try{const t=await new Promise((n,s)=>{const c=this.db.transaction(this.STORE_NAME,"readonly").objectStore(this.STORE_NAME).get(e);c.onsuccess=()=>n(c.result),c.onerror=()=>s(c.error)});if(!t)return null;const a=Date.now()-t.timestamp;return a>this.CACHE_EXPIRY_MS?(this._deleteFromStorage(e),console.log(`[BookingData] IndexedDB expired: ${e}`),null):(console.log(`[BookingData] IndexedDB hit: ${e} (age: ${Math.round(a/6e4)}min)`),t.data)}catch(t){return console.warn("[BookingData] IndexedDB read error:",t),null}}async saveToStorage(e,t){if(await this.dbReady,!!this.db)try{await new Promise((a,n)=>{const o=this.db.transaction(this.STORE_NAME,"readwrite").objectStore(this.STORE_NAME).put({key:e,data:t,timestamp:Date.now()});o.onsuccess=()=>a(),o.onerror=()=>n(o.error)}),console.log(`[BookingData] IndexedDB saved: ${e} (${t.length} items)`)}catch(a){console.warn("[BookingData] IndexedDB write error:",a)}}async _deleteFromStorage(e){if(this.db)try{this.db.transaction(this.STORE_NAME,"readwrite").objectStore(this.STORE_NAME).delete(e)}catch(t){console.warn("[BookingData] IndexedDB delete error:",t)}}async loadData(e,t,a=null){const n=this.getCacheKey(e,t,a);if(this.dataCache.has(n))return console.log(`[BookingData] Memory hit: ${n}`),this.dataCache.get(n);const s=await this.getFromStorage(n);if(s)return this.dataCache.set(n,s),s;if(this.loadingPromises.has(n))return console.log(`[BookingData] Waiting for load: ${n}`),this.loadingPromises.get(n);const i=this._fetchData(e,t,a);this.loadingPromises.set(n,i);try{const o=await i;return this.dataCache.set(n,o),this.saveToStorage(n,o),console.log(`[BookingData] Loaded ${o.length} items: ${n}`),o}finally{this.loadingPromises.delete(n)}}async _fetchData(e,t,a){const n=A[e];if(!n)throw new Error(`Unknown page type: ${e}`);const s=n.file(t,a),i=n.variableName(t,a),o=`${D}/${s}`;return console.log(`[BookingData] Loading: ${o}`),window[i]&&Array.isArray(window[i])||document.querySelector(`script[src="${o}"]`)&&(await this._waitForVariable(i,2e3),window[i])?window[i]:new Promise((r,u)=>{const g=document.createElement("script");g.src=o,g.async=!0,g.className="booking-data-script",g.onload=async()=>{try{await this._waitForVariable(i,3e3),window[i]&&Array.isArray(window[i])?r(window[i]):u(new Error(`Variable ${i} not found`))}catch(h){u(h)}},g.onerror=()=>u(new Error(`Failed to load ${s}`)),document.body.appendChild(g)})}_waitForVariable(e,t=3e3){return new Promise((a,n)=>{const s=Date.now(),i=()=>{window[e]!==void 0?a():Date.now()-s>t?n(new Error(`Timeout waiting for ${e}`)):setTimeout(i,50)};i()})}normalizeText(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}search(e,t,a=50){if(!e||e.length<3)return[];const n=this.normalizeText(e),s=[];for(const i of t){if(s.length>=a)break;this.normalizeText(i[0]||"").includes(n)&&s.push(i)}return s}formatResult(e,t){const a=e[e.length-1];switch(t){case"hotelPage":return{name:e[0],subtitle:e[1]||"",url:a};case"airportPage":return{name:e[0],subtitle:e[1]||"",url:a};case"districtPage":return{name:e[0],subtitle:e[1]||"",url:a};default:return{name:e[0],subtitle:e.length>2?e[1]:"",url:a}}}hasSubType(e){return A[e]?.hasSubType||!1}clearCache(){this.dataCache.clear(),console.log("[BookingData] Memory cache cleared")}}const b=new R;class O{constructor(){this.currentPage="booking",this.bookingState={data:null,isLoading:!1,error:null,searchTimeout:null}}async init(){await d.init(),console.log(`[App] Language detected: ${d.getLanguage()}`),this.setupNavigation(),this.setupLanguageSelector(),this.loadPage(this.currentPage)}setupNavigation(){document.querySelectorAll("[data-page]").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),this.loadPage(t.currentTarget.dataset.page)})})}setupLanguageSelector(){const e=document.querySelector(".language-dropdown"),t=document.getElementById("langTrigger");document.getElementById("langMenu");const a=document.querySelectorAll(".lang-option"),n={it:{code:"IT"},en:{code:"EN"},es:{code:"ES"},fr:{code:"FR"},de:{code:"DE"}},s=d.getLanguage();this.updateLangTrigger(t,n[s]),document.querySelector(`[data-lang="${s}"]`)?.classList.add("active"),t?.addEventListener("click",i=>{i.stopPropagation(),e.classList.toggle("is-open"),t.setAttribute("aria-expanded",e.classList.contains("is-open"))}),document.addEventListener("click",i=>{e?.contains(i.target)||(e?.classList.remove("is-open"),t?.setAttribute("aria-expanded","false"))}),a.forEach(i=>{i.addEventListener("click",async()=>{const o=i.dataset.lang;a.forEach(c=>c.classList.remove("active")),i.classList.add("active"),this.updateLangTrigger(t,n[o]),e.classList.remove("is-open"),t.setAttribute("aria-expanded","false"),await d.setLanguage(o),b.clearCache(),this.bookingState.data=null,this.loadPage(this.currentPage),p.success(d.t("languageChanged"))})})}updateLangTrigger(e,t){!e||!t||(e.querySelector(".lang-code").textContent=t.code)}loadPage(e){this.currentPage=e;const t=document.getElementById("page-content");document.querySelectorAll("[data-page]").forEach(o=>{o.classList.toggle("active",o.dataset.page===e)});const n={booking:()=>this.renderBookingPage(),tradedoubler:()=>this.renderTradedoublerPage(),getyourguide:()=>this.renderGetYourGuidePage(),civitatis:()=>this.renderCivitatisPage(),carrental:()=>this.renderCarRentalPage(),imgtool:()=>this.renderImageToolPage(),feedback:()=>this.renderFeedbackPage()}[e];if(n)t.innerHTML=n();else{t.innerHTML="<p>Page not found</p>";return}d.translatePage();const i={booking:()=>this.initBookingPage(),tradedoubler:()=>this.initTradedoublerPage(),getyourguide:()=>this.initGetYourGuidePage(),civitatis:()=>this.initCivitatisPage(),carrental:()=>this.initCarRentalPage(),imgtool:()=>this.initImageToolPage(),feedback:()=>this.initFeedbackPage()}[e];i&&i()}renderBookingPage(){return`
      <div class="page-header">
        <h2 data-i18n="bookingHeader">Cerca il Deep Link di Booking</h2>
        <span class="badge badge-warning" data-i18n="spainIslandsOnly">⚠️ Solo Spagna e Isole</span>
      </div>
      
      <div id="page-status" class="page-status"></div>
      
      <div class="card booking-unified-card">
        <!-- Labeled Controls -->
        <div class="form-row">
          <div class="form-group">
            <label class="form-label form-label-sm" data-i18n="pageTypeLabel">Tipo Pagina</label>
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
          </div>
          <div class="form-group form-group-sm">
            <label class="form-label form-label-sm" data-i18n="languageLabel">Lingua</label>
            <select id="bookingLangSelect" class="form-select form-select-sm">
              <option value="it">IT</option>
              <option value="es">ES</option>
              <option value="en">EN</option>
              <option value="fr">FR</option>
            </select>
          </div>
          <div class="form-group form-group-grow">
            <label class="form-label form-label-sm" data-i18n="searchLabel">Cerca</label>
            <input type="text" id="searchInput" class="form-control" 
                   data-i18n-placeholder="searchPlaceholder" 
                   placeholder="Cerca...">
          </div>
        </div>

        <!-- Sub Type Radio (when applicable) -->
        <div class="form-group" id="subTypeGroup" style="display:none;">
          <div class="radio-group">
            <label class="radio-label has-tooltip" data-tooltip="Mostra un elenco di hotel/sistemazioni nella destinazione selezionata. Ideale per offrire scelta ai lettori.">
              <input type="radio" name="subType" value="searchResults" checked>
              <span data-i18n="searchResultsPageLabel">Pagina Risultati</span>
            </label>
            <label class="radio-label has-tooltip" data-tooltip="Pagina informativa sulla destinazione con info turistiche e opzioni di alloggio. Perfetta per contenuti editoriali.">
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
    `}async initBookingPage(){const e=document.getElementById("pageTypeSelect"),t=document.getElementById("subTypeGroup"),a=document.getElementById("searchInput"),n=document.getElementById("searchHint"),s=document.getElementById("landingLinksCard");e&&new y(e);const i=document.getElementById("bookingLangSelect");i&&new y(i);const o=async()=>{const h=e.value,v=h==="genericLandingPages",k=b.hasSubType(h);t.style.display=k?"block":"none",a.style.display=v?"none":"block",n&&(n.style.display=v?"none":"block"),s.style.display=v?"block":"none",document.getElementById("resultsHeader").style.display="none",document.getElementById("resultsContainer").innerHTML="",document.getElementById("errorState").style.display="none",v?this.showGenericLandingPages():await this.loadBookingData()},c=()=>{clearTimeout(this.bookingState.searchTimeout),this.bookingState.searchTimeout=setTimeout(()=>{this.performSearch(a.value)},300)},r=async()=>{this.bookingState.data=null,await this.loadBookingData()},u=document.getElementById("bookingLangSelect"),g=async()=>{this.bookingState.data=null,await this.loadBookingData()};e.addEventListener("change",o),a.addEventListener("input",c),u.addEventListener("change",g),document.querySelectorAll('input[name="subType"]').forEach(h=>{h.addEventListener("change",r)}),document.getElementById("retryBtn")?.addEventListener("click",()=>this.loadBookingData()),await o()}async loadBookingData(){const e=document.getElementById("pageTypeSelect").value;if(e==="genericLandingPages")return;const t=document.getElementById("bookingLangSelect")?.value||"it",n=document.querySelector('input[name="subType"]:checked')?.value==="landing"?"landing":null;this.setBookingUIState("loading");try{const s=await b.loadData(e,t,n);this.bookingState.data=s,this.bookingState.error=null,this.setBookingUIState("ready");const i=document.getElementById("searchInput")?.value;i&&i.length>=3&&this.performSearch(i)}catch(s){console.error("[Booking] Load error:",s),this.bookingState.error=s.message,this.setBookingUIState("error")}}setBookingUIState(e){const t=document.getElementById("loadingState"),a=document.getElementById("errorState"),n=document.getElementById("resultsHeader"),s=document.getElementById("resultsContainer"),i=document.getElementById("searchHint");t.style.display=e==="loading"?"flex":"none",a.style.display=e==="error"?"flex":"none",n.style.display="none",s.innerHTML="",i&&(i.style.display=e==="ready"?"block":"none")}performSearch(e){if(!this.bookingState.data)return;const t=document.getElementById("resultsHeader"),a=document.getElementById("resultsContainer"),n=document.getElementById("resultsCount"),s=document.getElementById("searchHint");if(!e||e.length<3){t.style.display="none",a.innerHTML="",s&&(s.style.display="block");return}s&&(s.style.display="none");const i=document.getElementById("pageTypeSelect").value,o=b.search(e,this.bookingState.data,50);if(o.length===0){t.style.display="flex",n.textContent=d.t("noResultsFound"),a.innerHTML=`
        <div class="empty-state">
          <span class="empty-icon">🔍</span>
          <p data-i18n="noResultsFound">${d.t("noResultsFound")}</p>
        </div>
      `;return}t.style.display="flex",n.textContent=`${o.length} ${d.t("resultsFound")}`,a.innerHTML=o.map(c=>{const r=b.formatResult(c,i);return`
        <div class="result-card">
          <div class="result-info">
            <span class="result-name">${this.escapeHtml(r.name)}</span>
            ${r.subtitle?`<span class="result-subtitle">${this.escapeHtml(r.subtitle)}</span>`:""}
          </div>
          <div class="result-actions">
            <button class="btn btn-sm btn-primary" data-copy="${this.escapeHtml(r.url)}">${d.t("copyLink")}</button>
            <a href="${r.url}" target="_blank" class="btn btn-sm btn-outline">${d.t("openLink")}</a>
          </div>
        </div>
      `}).join(""),a.querySelectorAll("[data-copy]").forEach(c=>{c.addEventListener("click",async()=>{const r=await m.copyToClipboard(c.dataset.copy);p[r?"success":"error"](d.t(r?"deepLinkCopied":"copyError"))})})}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}showGenericLandingPages(){const e=document.getElementById("landingLinks");document.getElementById("landingLinksCard").style.display="block",document.getElementById("resultsCard").style.display="none";const t=[{key:"homePage",url:"https://www.booking.com/index.html?aid=955564"},{key:"apartmentsPage",url:"https://www.booking.com/apartments/index.html?aid=955564"},{key:"resortsPage",url:"https://www.booking.com/resorts/index.html?aid=955564"},{key:"villasPage",url:"https://www.booking.com/villas/index.html?aid=955564"},{key:"bedAndBreakfastPage",url:"https://www.booking.com/bed-and-breakfast/index.html?aid=955564"},{key:"guestHousePage",url:"https://www.booking.com/guest-house/index.html?aid=955564"}];e.innerHTML=t.map(a=>`
      <div class="link-item">
        <span>${d.t(a.key)}</span>
        <div class="link-actions">
          <a href="${a.url}" target="_blank" class="btn btn-sm btn-outline">${d.t("openLink")}</a>
          <button class="btn btn-sm btn-primary" data-copy="${a.url}">${d.t("copyLink")}</button>
        </div>
      </div>
    `).join(""),e.querySelectorAll("[data-copy]").forEach(a=>{a.addEventListener("click",async()=>{const n=await m.copyToClipboard(a.dataset.copy);p[n?"success":"error"](d.t(n?"deepLinkCopied":"copyError"))})})}renderTradedoublerPage(){return`
      <div class="page-header">
        <h2 data-i18n="usefulTLinksHeader">I Programmi Attivi</h2>
      </div>

      <div id="page-status" class="page-status"></div>

      <div class="card td-unified-card">
        <!-- Site Selector -->
        <div class="td-site-selector">
          <label class="form-label" data-i18n="programLabel">Programma</label>
          <select id="islandSelect" class="form-select">
            <option value="" data-i18n="selectSite">Seleziona un sito</option>
            ${m.getAllIslands().map(t=>`<option value="${t.code}">${t.displayName}</option>`).join("")}
          </select>
        </div>

        <!-- Deep Link Generator (Collapsible) -->
        <details class="td-deeplink-details">
          <summary class="td-deeplink-summary">
            <span data-i18n="generateDeepLinkSection">Genera Deep Link Personalizzato</span>
          </summary>
          <div class="td-deeplink-content">
            <div class="td-info-note">
              <span class="info-icon">ℹ️</span>
              <span data-i18n="autoDetectNote">Incolla un URL e il programma verrà riconosciuto automaticamente</span>
            </div>
            <div class="td-input-row">
              <input type="text" id="inputUrl" class="form-control" placeholder="https://www.edreams.it/..." data-i18n-placeholder="urlPlaceholder">
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
    `}initTradedoublerPage(){const e=document.getElementById("islandSelect"),t=document.getElementById("generateBtn"),a=document.getElementById("inputUrl"),n=document.getElementById("resultContainer"),s=document.getElementById("resultLink"),i=document.getElementById("programCardsContainer");e&&new y(e);const o=c=>{const r=B[c]||[];if(!c||r.length===0){i.innerHTML=`
          <div class="program-cards-empty">
            <span class="empty-icon">📋</span>
            <p data-i18n="selectSiteToViewPrograms">Seleziona un sito per vedere i programmi attivi</p>
          </div>
        `;return}const u=r.map(g=>{const h=m.getPartnerBaseLink(c,g),v=w[g]||"—",k=P[g]||"ALTRO";return`
          <div class="program-card">
            <div class="program-card-body">
              <div class="program-card-meta">
                <span class="program-badge program-badge--${k.toLowerCase().replace(/\s+/g,"-")}">${k}</span>
                <span class="program-id">ID: ${v}</span>
              </div>
              <h4 class="program-card-title">${this.escapeHtml(g)}</h4>
              <p class="program-card-link">${h?new URL(h).hostname:"tradedoubler.com"}</p>
            </div>
            <div class="program-card-actions">
              <button class="btn btn-sm btn-primary" data-copy="${this.escapeHtml(h||"")}" title="${d.t("copyLink")}">
                ${d.t("copyLink")}
              </button>
              <a href="${h||"#"}" target="_blank" class="btn btn-sm btn-outline" title="${d.t("openLink")}">
                ${d.t("openLink")}
              </a>
            </div>
          </div>
        `}).join("");i.innerHTML=`
        <div class="program-cards-count">${r.length} ${d.t("programsActive")||"programmi attivi"}</div>
        <div class="program-cards-wrapper">${u}</div>
      `,i.querySelectorAll("[data-copy]").forEach(g=>{g.addEventListener("click",async()=>{const h=g.dataset.copy;if(h){const v=await m.copyToClipboard(h);p[v?"success":"error"](d.t(v?"deepLinkCopied":"copyError"))}})})};e.addEventListener("change",()=>{const c=e.value;o(c),n.style.display="none"}),t.addEventListener("click",()=>{const c=e.value,r=a.value.trim();if(!c){p.warning(d.t("selectSite")||"Seleziona un sito");return}if(!r){p.warning(d.t("enterUrl"));return}const u=m.generateDeepLink(r,c);u.success?(s.href=u.link,s.textContent=u.link,n.style.display="block",p.success(`${d.t("deepLinkGenerated")} (${u.partner})`)):p.error(d.t(u.error)||u.error)}),document.getElementById("copyResultBtn")?.addEventListener("click",async()=>{const c=await m.copyToClipboard(s.href);p[c?"success":"error"](d.t(c?"deepLinkCopied":"copyError"))}),document.getElementById("openResultBtn")?.addEventListener("click",()=>{m.openLink(s.href)})}renderGetYourGuidePage(){return`
      <div class="page-header">
        <h2 data-i18n="GetYourGuideLink">Deep Link GetYourGuide</h2>
      </div>

      <div id="page-status" class="page-status"></div>

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
    `}initGetYourGuidePage(){const e={it:"https://www.getyourguide.it/?partner_id=Q5TFESQ&utm_medium=online_publisher",es:"https://www.getyourguide.es/?partner_id=Q5TFESQ&utm_medium=online_publisher",en:"https://www.getyourguide.com/?partner_id=Q5TFESQ&utm_medium=online_publisher",fr:"https://www.getyourguide.fr/?partner_id=Q5TFESQ&utm_medium=online_publisher"},t=document.getElementById("gygLangSelect"),a=document.getElementById("gygHomepageLink");t&&new y(t);const n=()=>{const r=e[t.value]||e.en;a.href=r,a.textContent=r};t.addEventListener("change",n),n(),document.getElementById("gygHomepageCopyBtn")?.addEventListener("click",async()=>{const r=await m.copyToClipboard(a.href);p[r?"success":"error"](d.t(r?"deepLinkCopied":"copyError"))}),document.getElementById("gygHomepageOpenBtn")?.addEventListener("click",()=>{m.openLink(a.href)});const s=document.getElementById("gygInput"),i=document.getElementById("gygGenerateBtn"),o=document.getElementById("gygResult"),c=document.getElementById("gygResultLink");i.addEventListener("click",()=>{const r=s.value.trim();if(!r){p.warning(d.t("validGetYourGuideURL"));return}const u=m.generateGetYourGuideLink(r);u.success?(c.href=u.link,c.textContent=u.link,o.style.display="block",p.success(d.t("deepLinkGenerated"))):p.error(d.t(u.error))}),document.getElementById("gygCopyBtn")?.addEventListener("click",async()=>{const r=await m.copyToClipboard(c.href);p[r?"success":"error"](d.t(r?"deepLinkCopied":"copyError"))}),document.getElementById("gygOpenBtn")?.addEventListener("click",()=>{m.openLink(c.href)})}renderCivitatisPage(){return`
      <div class="page-header">
        <h2 data-i18n="CivitatisLink">Deep Link Civitatis</h2>
      </div>

      <div id="page-status" class="page-status"></div>

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
    `}initCivitatisPage(){const e={it:"https://www.civitatis.com/it/?aid=5488",es:"https://www.civitatis.com/es/?aid=5488",en:"https://www.civitatis.com/en/?aid=5488",fr:"https://www.civitatis.com/fr/?aid=5488"},t=document.getElementById("civLangSelect"),a=document.getElementById("civHomepageLink");t&&new y(t);const n=()=>{const r=e[t.value]||e.en;a.href=r,a.textContent=r};t.addEventListener("change",n),n(),document.getElementById("civHomepageCopyBtn")?.addEventListener("click",async()=>{const r=await m.copyToClipboard(a.href);p[r?"success":"error"](d.t(r?"deepLinkCopied":"copyError"))}),document.getElementById("civHomepageOpenBtn")?.addEventListener("click",()=>{m.openLink(a.href)});const s=document.getElementById("civInput"),i=document.getElementById("civGenerateBtn"),o=document.getElementById("civResult"),c=document.getElementById("civResultLink");i.addEventListener("click",()=>{const r=s.value.trim();if(!r){p.warning(d.t("validCivitatisURL"));return}const u=m.generateCivitatisLink(r);u.success?(c.href=u.link,c.textContent=u.link,o.style.display="block",p.success(d.t("deepLinkGenerated"))):p.error(d.t(u.error))}),document.getElementById("civCopyBtn")?.addEventListener("click",async()=>{const r=await m.copyToClipboard(c.href);p[r?"success":"error"](d.t(r?"deepLinkCopied":"copyError"))}),document.getElementById("civOpenBtn")?.addEventListener("click",()=>{m.openLink(c.href)})}renderCarRentalPage(){return`
      <div class="page-header">
        <h2 data-i18n="carRentalHeader">Noleggio Auto a Minorca</h2>
      </div>

      <div id="page-status" class="page-status"></div>

      <div class="card">
        <div class="form-group">
          <label class="form-label" data-i18n="selectProvider">Seleziona Noleggio</label>
          <select id="carProviderSelect" class="form-select">
            ${S.map((e,t)=>`<option value="${t}">${e.name}</option>`).join("")}
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
    `}initCarRentalPage(){const e=document.getElementById("carProviderSelect"),t=document.getElementById("carLangSelect"),a=document.getElementById("carResultLink");e&&new y(e),t&&new y(t);const n=()=>{const s=S[e.value],i=t.value,o=s.urls[i]||s.urls.en||Object.values(s.urls)[0];a.href=o,a.textContent=o};e.addEventListener("change",n),t.addEventListener("change",n),n(),document.getElementById("carCopyBtn")?.addEventListener("click",async()=>{const s=await m.copyToClipboard(a.href);p[s?"success":"error"](d.t(s?"deepLinkCopied":"copyError"))}),document.getElementById("carOpenBtn")?.addEventListener("click",()=>{m.openLink(a.href)})}renderImageToolPage(){return`
      <div class="page-header">
        <h2 data-i18n="imageToolHeader">Compressore di Immagini</h2>
      </div>

      <div id="page-status" class="page-status"></div>

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

        <div class="image-controls">
          <div class="form-group image-controls__quality">
            <label class="form-label" data-i18n="compressionQuality">Qualità Compressione</label>
            <div class="slider-container">
              <input type="range" id="qualitySlider" min="10" max="95" value="75" class="slider">
              <span id="qualityValue" class="slider-value">75%</span>
            </div>
            <p class="text-muted text-sm" data-i18n="qualityHint">Valori più bassi = file più piccoli, qualità ridotta</p>
          </div>

          <div class="form-group image-controls__format">
            <label class="form-label" data-i18n="outputFormat">Formato Output</label>
            <select id="formatSelect" class="form-select">
              <option value="image/jpeg" data-i18n="formatJpeg">JPEG (consigliato)</option>
              <option value="image/webp" data-i18n="formatWebp">WebP (moderno)</option>
              <option value="image/png" data-i18n="formatPng">PNG (lossless)</option>
            </select>
          </div>
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
    `}initImageToolPage(){const e=document.getElementById("dropZone"),t=document.getElementById("imageInput"),a=document.getElementById("qualitySlider"),n=document.getElementById("qualityValue"),s=document.getElementById("formatSelect"),i=document.getElementById("imagesContainer"),o=document.getElementById("downloadAllContainer");s&&new y(s),this.compressedImages=[],a.addEventListener("input",()=>{n.textContent=`${a.value}%`}),e.addEventListener("click",()=>t.click()),["dragenter","dragover","dragleave","drop"].forEach(c=>{e.addEventListener(c,r=>{r.preventDefault(),r.stopPropagation()})}),e.addEventListener("dragenter",()=>e.classList.add("drag-over")),e.addEventListener("dragover",()=>e.classList.add("drag-over")),e.addEventListener("dragleave",()=>e.classList.remove("drag-over")),e.addEventListener("drop",c=>{e.classList.remove("drag-over");const r=c.dataTransfer.files;this.processImages(r)}),t.addEventListener("change",()=>{this.processImages(t.files)}),document.getElementById("clearAllBtn")?.addEventListener("click",()=>{this.compressedImages=[],i.innerHTML="",o.style.display="none"}),document.getElementById("downloadAllBtn")?.addEventListener("click",async()=>{this.compressedImages.length!==0&&await this.downloadAllAsZip()})}async processImages(e){const t=document.getElementById("qualitySlider").value/100,a=document.getElementById("formatSelect").value,n=document.getElementById("imagesContainer"),s=document.getElementById("downloadAllContainer");for(const i of e)if(i.type.startsWith("image/"))try{const o=await this.compressImage(i,t,a);this.compressedImages.push(o),this.renderImageCard(o,n),this.updateTotalStats(),s.style.display="block"}catch(o){console.error("Compression error:",o),p.error(`Errore: ${i.name}`)}}compressImage(e,t,a){return new Promise((n,s)=>{const i=new FileReader;i.onload=o=>{const c=new Image;c.onload=()=>{const r=document.createElement("canvas");r.width=c.naturalWidth,r.height=c.naturalHeight,r.getContext("2d").drawImage(c,0,0),r.toBlob(g=>{if(!g){s(new Error("Compression failed"));return}const h=a==="image/webp"?"webp":a==="image/png"?"png":"jpg",v=e.name.replace(/\.[^/.]+$/,"");n({originalName:e.name,compressedName:`${v}_compressed.${h}`,originalSize:e.size,compressedSize:g.size,reduction:((1-g.size/e.size)*100).toFixed(1),blob:g,url:URL.createObjectURL(g)})},a,t)},c.onerror=s,c.src=o.target.result},i.onerror=s,i.readAsDataURL(e)})}renderImageCard(e,t){const a=document.createElement("div");a.className="image-card";const n=i=>i>1024*1024?`${(i/1024/1024).toFixed(2)} MB`:`${(i/1024).toFixed(1)} KB`,s=parseFloat(e.reduction)>50?"text-success":parseFloat(e.reduction)>20?"text-warning":"text-muted";a.innerHTML=`
      <img src="${e.url}" alt="${e.originalName}" class="image-preview">
      <div class="image-info">
        <span class="image-name">${this.escapeHtml(e.originalName)}</span>
        <div class="image-stats">
          <span>${n(e.originalSize)} → ${n(e.compressedSize)}</span>
          <span class="${s}">-${e.reduction}%</span>
        </div>
      </div>
      <div class="image-actions">
        <button class="btn btn-sm btn-primary download-btn">${d.t("download")}</button>
        <button class="btn btn-sm btn-outline remove-btn">✕</button>
      </div>
    `,a.querySelector(".download-btn").addEventListener("click",()=>{const i=document.createElement("a");i.href=e.url,i.download=e.compressedName,i.click()}),a.querySelector(".remove-btn").addEventListener("click",()=>{const i=this.compressedImages.findIndex(o=>o.url===e.url);i>-1&&(URL.revokeObjectURL(e.url),this.compressedImages.splice(i,1),a.remove(),this.updateTotalStats(),this.compressedImages.length===0&&(document.getElementById("downloadAllContainer").style.display="none"))}),t.appendChild(a)}updateTotalStats(){const e=document.getElementById("totalStats");if(!e||this.compressedImages.length===0)return;const t=this.compressedImages.reduce((i,o)=>i+o.originalSize,0),a=this.compressedImages.reduce((i,o)=>i+o.compressedSize,0),n=((1-a/t)*100).toFixed(1),s=i=>i>1024*1024?`${(i/1024/1024).toFixed(2)} MB`:`${(i/1024).toFixed(1)} KB`;e.textContent=`${this.compressedImages.length} ${d.t("images")} • ${s(t)} → ${s(a)} (-${n}%)`}async downloadAllAsZip(){if(!window.JSZip){const n=document.createElement("script");n.src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",document.head.appendChild(n),await new Promise(s=>n.onload=s)}const e=new JSZip;for(const n of this.compressedImages)e.file(n.compressedName,n.blob);const t=await e.generateAsync({type:"blob"}),a=document.createElement("a");a.href=URL.createObjectURL(t),a.download="compressed_images.zip",a.click(),URL.revokeObjectURL(a.href),p.success(d.t("downloadStarted"))}renderFeedbackPage(){return`
      <div class="page-header">
        <h2 data-i18n="feedbackHeader">💡 Segnalazioni e Suggerimenti</h2>
      </div>

      <div id="page-status" class="page-status"></div>

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
    `}initFeedbackPage(){const e=document.getElementById("feedbackForm"),t=document.getElementById("feedbackSuccess"),a=document.getElementById("feedbackPlatform"),n="https://formspree.io/f/mjgggwek";a&&new y(a),e?.addEventListener("submit",async s=>{s.preventDefault();const i=new FormData(e);try{if((await fetch(n,{method:"POST",body:i,headers:{Accept:"application/json"}})).ok)e.style.display="none",t.style.display="block",p.success(d.t("messageSent"));else throw new Error("Form submission failed")}catch(o){console.error("Form error:",o),p.error(d.t("sendError"))}}),document.getElementById("newFeedbackBtn")?.addEventListener("click",()=>{e.reset(),e.style.display="block",t.style.display="none"})}}document.addEventListener("DOMContentLoaded",()=>{new O().init()});
