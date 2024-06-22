function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./vaadin-big-decimal-field-e51def24-a2hLWxUU.js","./vaadin-text-field-0b3db014-DiAt2klQ.js","./vaadin-button-2511ad84-D_5gLsoS.js","./vaadin-checkbox-group-a7c65bf2-BixjaPgu.js","./vaadin-checkbox-4e68df64-kW5P85a1.js","./vaadin-combo-box-96451ddd-DHuISLlQ.js","./vaadin-confirm-dialog-4d718829-BSl_lcHn.js","./vaadin-custom-field-42c85b9e-Ce37n7V_.js","./vaadin-date-picker-f2001167-Bnv6NWfk.js","./vaadin-date-time-picker-c8c047a7-CWqMCSWp.js","./vaadin-email-field-d7a35f04-DkFdXpAE.js","./vaadin-grid-pro-ff415555-BE70EpBf.js","./vaadin-grid-0a4791c2-B3d9n2IN.js","./vaadin-integer-field-85078932-CFEPSXse.js","./vaadin-login-form-638996c6-qvIm4Wgb.js","./vaadin-login-overlay-f8a5db8a-B4yUEIGb.js","./vaadin-message-input-996ac37c-Cq9S8lsK.js","./vaadin-multi-select-combo-box-a3373557-DUJDloeC.js","./vaadin-number-field-cb3ee8b2-LXc_yfKO.js","./vaadin-password-field-d289cb18-BHUSXyTj.js","./vaadin-radio-group-88b5afd8-DHytIEgo.js","./vaadin-select-df6e9947-BW5QoWz2.js","./vaadin-text-area-83627ebc-DMAjhtgY.js","./vaadin-time-picker-715ec415-DIGsQ2bd.js","./vaadin-upload-d3c162ed-B-IwuX3Z.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();window.Vaadin=window.Vaadin||{};window.Vaadin.featureFlags=window.Vaadin.featureFlags||{};window.Vaadin.featureFlags.exampleFeatureFlag=!1;window.Vaadin.featureFlags.collaborationEngineBackend=!1;window.Vaadin.featureFlags.webPush=!1;window.Vaadin.featureFlags.formFillerAddon=!1;window.Vaadin.featureFlags.reactRouter=!1;const Sn="modulepreload",xn=function(t,e){return new URL(t,e).href},Vo={},g=function(e,o,i){let n=Promise.resolve();if(o&&o.length>0){const s=document.getElementsByTagName("link");n=Promise.all(o.map(r=>{if(r=xn(r,i),r in Vo)return;Vo[r]=!0;const l=r.endsWith(".css"),a=l?'[rel="stylesheet"]':"";if(!!i)for(let p=s.length-1;p>=0;p--){const u=s[p];if(u.href===r&&(!l||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${a}`))return;const h=document.createElement("link");if(h.rel=l?"stylesheet":Sn,l||(h.as="script",h.crossOrigin=""),h.href=r,document.head.appendChild(h),l)return new Promise((p,u)=>{h.addEventListener("load",p),h.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${r}`)))})}))}return n.then(()=>e()).catch(s=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=s,window.dispatchEvent(r),!r.defaultPrevented)throw s})};function _t(t){return t=t||[],Array.isArray(t)?t:[t]}function te(t){return`[Vaadin.Router] ${t}`}function Cn(t){if(typeof t!="object")return String(t);const e=Object.prototype.toString.call(t).match(/ (.*)\]$/)[1];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(t)}`:e}const bt="module",wt="nomodule",ao=[bt,wt];function Do(t){if(!t.match(/.+\.[m]?js$/))throw new Error(te(`Unsupported type for bundle "${t}": .js or .mjs expected.`))}function Fi(t){if(!t||!Z(t.path))throw new Error(te('Expected route config to be an object with a "path" string property, or an array of such objects'));const e=t.bundle,o=["component","redirect","bundle"];if(!we(t.action)&&!Array.isArray(t.children)&&!we(t.children)&&!Et(e)&&!o.some(i=>Z(t[i])))throw new Error(te(`Expected route config "${t.path}" to include either "${o.join('", "')}" or "action" function but none found.`));if(e)if(Z(e))Do(e);else if(ao.some(i=>i in e))ao.forEach(i=>i in e&&Do(e[i]));else throw new Error(te('Expected route bundle to include either "'+wt+'" or "'+bt+'" keys, or both'));t.redirect&&["bundle","component"].forEach(i=>{i in t&&console.warn(te(`Route config "${t.path}" has both "redirect" and "${i}" properties, and "redirect" will always override the latter. Did you mean to only use "${i}"?`))})}function Uo(t){_t(t).forEach(e=>Fi(e))}function zo(t,e){let o=document.head.querySelector('script[src="'+t+'"][async]');return o||(o=document.createElement("script"),o.setAttribute("src",t),e===bt?o.setAttribute("type",bt):e===wt&&o.setAttribute(wt,""),o.async=!0),new Promise((i,n)=>{o.onreadystatechange=o.onload=s=>{o.__dynamicImportLoaded=!0,i(s)},o.onerror=s=>{o.parentNode&&o.parentNode.removeChild(o),n(s)},o.parentNode===null?document.head.appendChild(o):o.__dynamicImportLoaded&&i()})}function Tn(t){return Z(t)?zo(t):Promise.race(ao.filter(e=>e in t).map(e=>zo(t[e],e)))}function Be(t,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${t}`,{cancelable:t==="go",detail:e}))}function Et(t){return typeof t=="object"&&!!t}function we(t){return typeof t=="function"}function Z(t){return typeof t=="string"}function Bi(t){const e=new Error(te(`Page not found (${t.pathname})`));return e.context=t,e.code=404,e}const Ie=new class{};function kn(t){const e=t.port,o=t.protocol,s=o==="http:"&&e==="80"||o==="https:"&&e==="443"?t.hostname:t.host;return`${o}//${s}`}function jo(t){if(t.defaultPrevented||t.button!==0||t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)return;let e=t.target;const o=t.composedPath?t.composedPath():t.path||[];for(let l=0;l<o.length;l++){const a=o[l];if(a.nodeName&&a.nodeName.toLowerCase()==="a"){e=a;break}}for(;e&&e.nodeName.toLowerCase()!=="a";)e=e.parentNode;if(!e||e.nodeName.toLowerCase()!=="a"||e.target&&e.target.toLowerCase()!=="_self"||e.hasAttribute("download")||e.hasAttribute("router-ignore")||e.pathname===window.location.pathname&&e.hash!==""||(e.origin||kn(e))!==window.location.origin)return;const{pathname:n,search:s,hash:r}=e;Be("go",{pathname:n,search:s,hash:r})&&(t.preventDefault(),t&&t.type==="click"&&window.scrollTo(0,0))}const $n={activate(){window.document.addEventListener("click",jo)},inactivate(){window.document.removeEventListener("click",jo)}},An=/Trident/.test(navigator.userAgent);An&&!we(window.PopStateEvent)&&(window.PopStateEvent=function(t,e){e=e||{};var o=document.createEvent("Event");return o.initEvent(t,!!e.bubbles,!!e.cancelable),o.state=e.state||null,o},window.PopStateEvent.prototype=window.Event.prototype);function Fo(t){if(t.state==="vaadin-router-ignore")return;const{pathname:e,search:o,hash:i}=window.location;Be("go",{pathname:e,search:o,hash:i})}const Rn={activate(){window.addEventListener("popstate",Fo)},inactivate(){window.removeEventListener("popstate",Fo)}};var ze=Ji,Nn=go,In=Mn,Pn=qi,On=Ki,Hi="/",Wi="./",Ln=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function go(t,e){for(var o=[],i=0,n=0,s="",r=e&&e.delimiter||Hi,l=e&&e.delimiters||Wi,a=!1,d;(d=Ln.exec(t))!==null;){var h=d[0],p=d[1],u=d.index;if(s+=t.slice(n,u),n=u+h.length,p){s+=p[1],a=!0;continue}var _="",se=t[n],G=d[2],ot=d[3],zt=d[4],W=d[5];if(!a&&s.length){var ie=s.length-1;l.indexOf(s[ie])>-1&&(_=s[ie],s=s.slice(0,ie))}s&&(o.push(s),s="",a=!1);var Ce=_!==""&&se!==void 0&&se!==_,Te=W==="+"||W==="*",jt=W==="?"||W==="*",re=_||r,it=ot||zt;o.push({name:G||i++,prefix:_,delimiter:re,optional:jt,repeat:Te,partial:Ce,pattern:it?Vn(it):"[^"+ue(re)+"]+?"})}return(s||n<t.length)&&o.push(s+t.substr(n)),o}function Mn(t,e){return qi(go(t,e))}function qi(t){for(var e=new Array(t.length),o=0;o<t.length;o++)typeof t[o]=="object"&&(e[o]=new RegExp("^(?:"+t[o].pattern+")$"));return function(i,n){for(var s="",r=n&&n.encode||encodeURIComponent,l=0;l<t.length;l++){var a=t[l];if(typeof a=="string"){s+=a;continue}var d=i?i[a.name]:void 0,h;if(Array.isArray(d)){if(!a.repeat)throw new TypeError('Expected "'+a.name+'" to not repeat, but got array');if(d.length===0){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to not be empty')}for(var p=0;p<d.length;p++){if(h=r(d[p],a),!e[l].test(h))throw new TypeError('Expected all "'+a.name+'" to match "'+a.pattern+'"');s+=(p===0?a.prefix:a.delimiter)+h}continue}if(typeof d=="string"||typeof d=="number"||typeof d=="boolean"){if(h=r(String(d),a),!e[l].test(h))throw new TypeError('Expected "'+a.name+'" to match "'+a.pattern+'", but got "'+h+'"');s+=a.prefix+h;continue}if(a.optional){a.partial&&(s+=a.prefix);continue}throw new TypeError('Expected "'+a.name+'" to be '+(a.repeat?"an array":"a string"))}return s}}function ue(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function Vn(t){return t.replace(/([=!:$/()])/g,"\\$1")}function Gi(t){return t&&t.sensitive?"":"i"}function Dn(t,e){if(!e)return t;var o=t.source.match(/\((?!\?)/g);if(o)for(var i=0;i<o.length;i++)e.push({name:i,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return t}function Un(t,e,o){for(var i=[],n=0;n<t.length;n++)i.push(Ji(t[n],e,o).source);return new RegExp("(?:"+i.join("|")+")",Gi(o))}function zn(t,e,o){return Ki(go(t,o),e,o)}function Ki(t,e,o){o=o||{};for(var i=o.strict,n=o.start!==!1,s=o.end!==!1,r=ue(o.delimiter||Hi),l=o.delimiters||Wi,a=[].concat(o.endsWith||[]).map(ue).concat("$").join("|"),d=n?"^":"",h=t.length===0,p=0;p<t.length;p++){var u=t[p];if(typeof u=="string")d+=ue(u),h=p===t.length-1&&l.indexOf(u[u.length-1])>-1;else{var _=u.repeat?"(?:"+u.pattern+")(?:"+ue(u.delimiter)+"(?:"+u.pattern+"))*":u.pattern;e&&e.push(u),u.optional?u.partial?d+=ue(u.prefix)+"("+_+")?":d+="(?:"+ue(u.prefix)+"("+_+"))?":d+=ue(u.prefix)+"("+_+")"}}return s?(i||(d+="(?:"+r+")?"),d+=a==="$"?"$":"(?="+a+")"):(i||(d+="(?:"+r+"(?="+a+"))?"),h||(d+="(?="+r+"|"+a+")")),new RegExp(d,Gi(o))}function Ji(t,e,o){return t instanceof RegExp?Dn(t,e):Array.isArray(t)?Un(t,e,o):zn(t,e,o)}ze.parse=Nn;ze.compile=In;ze.tokensToFunction=Pn;ze.tokensToRegExp=On;const{hasOwnProperty:jn}=Object.prototype,lo=new Map;lo.set("|false",{keys:[],pattern:/(?:)/});function Bo(t){try{return decodeURIComponent(t)}catch{return t}}function Fn(t,e,o,i,n){o=!!o;const s=`${t}|${o}`;let r=lo.get(s);if(!r){const d=[];r={keys:d,pattern:ze(t,d,{end:o,strict:t===""})},lo.set(s,r)}const l=r.pattern.exec(e);if(!l)return null;const a=Object.assign({},n);for(let d=1;d<l.length;d++){const h=r.keys[d-1],p=h.name,u=l[d];(u!==void 0||!jn.call(a,p))&&(h.repeat?a[p]=u?u.split(h.delimiter).map(Bo):[]:a[p]=u&&Bo(u))}return{path:l[0],keys:(i||[]).concat(r.keys),params:a}}function Yi(t,e,o,i,n){let s,r,l=0,a=t.path||"";return a.charAt(0)==="/"&&(o&&(a=a.substr(1)),o=!0),{next(d){if(t===d)return{done:!0};const h=t.__children=t.__children||t.children;if(!s&&(s=Fn(a,e,!h,i,n),s))return{done:!1,value:{route:t,keys:s.keys,params:s.params,path:s.path}};if(s&&h)for(;l<h.length;){if(!r){const u=h[l];u.parent=t;let _=s.path.length;_>0&&e.charAt(_)==="/"&&(_+=1),r=Yi(u,e.substr(_),o,s.keys,s.params)}const p=r.next(d);if(!p.done)return{done:!1,value:p.value};r=null,l++}return{done:!0}}}}function Bn(t){if(we(t.route.action))return t.route.action(t)}function Hn(t,e){let o=e;for(;o;)if(o=o.parent,o===t)return!0;return!1}function Wn(t){let e=`Path '${t.pathname}' is not properly resolved due to an error.`;const o=(t.route||{}).path;return o&&(e+=` Resolution had failed on route: '${o}'`),e}function qn(t,e){const{route:o,path:i}=e;if(o&&!o.__synthetic){const n={path:i,route:o};if(!t.chain)t.chain=[];else if(o.parent){let s=t.chain.length;for(;s--&&t.chain[s].route&&t.chain[s].route!==o.parent;)t.chain.pop()}t.chain.push(n)}}class We{constructor(e,o={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=o.baseUrl||"",this.errorHandler=o.errorHandler,this.resolveRoute=o.resolveRoute||Bn,this.context=Object.assign({resolver:this},o.context),this.root=Array.isArray(e)?{path:"",__children:e,parent:null,__synthetic:!0}:e,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(e){Uo(e);const o=[..._t(e)];this.root.__children=o}addRoutes(e){return Uo(e),this.root.__children.push(..._t(e)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(e){const o=Object.assign({},this.context,Z(e)?{pathname:e}:e),i=Yi(this.root,this.__normalizePathname(o.pathname),this.baseUrl),n=this.resolveRoute;let s=null,r=null,l=o;function a(d,h=s.value.route,p){const u=p===null&&s.value.route;return s=r||i.next(u),r=null,!d&&(s.done||!Hn(h,s.value.route))?(r=s,Promise.resolve(Ie)):s.done?Promise.reject(Bi(o)):(l=Object.assign(l?{chain:l.chain?l.chain.slice(0):[]}:{},o,s.value),qn(l,s.value),Promise.resolve(n(l)).then(_=>_!=null&&_!==Ie?(l.result=_.result||_,l):a(d,h,_)))}return o.next=a,Promise.resolve().then(()=>a(!0,this.root)).catch(d=>{const h=Wn(l);if(d?console.warn(h):d=new Error(h),d.context=d.context||l,d instanceof DOMException||(d.code=d.code||500),this.errorHandler)return l.result=this.errorHandler(d),l;throw d})}static __createUrl(e,o){return new URL(e,o)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^\/]*$/,""):""}__normalizePathname(e){if(!this.baseUrl)return e;const o=this.__effectiveBaseUrl,i=this.constructor.__createUrl(e,o).href;if(i.slice(0,o.length)===o)return i.slice(o.length)}}We.pathToRegexp=ze;const{pathToRegexp:Ho}=We,Wo=new Map;function Xi(t,e,o){const i=e.name||e.component;if(i&&(t.has(i)?t.get(i).push(e):t.set(i,[e])),Array.isArray(o))for(let n=0;n<o.length;n++){const s=o[n];s.parent=e,Xi(t,s,s.__children||s.children)}}function qo(t,e){const o=t.get(e);if(o&&o.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return o&&o[0]}function Go(t){let e=t.path;return e=Array.isArray(e)?e[0]:e,e!==void 0?e:""}function Gn(t,e={}){if(!(t instanceof We))throw new TypeError("An instance of Resolver is expected");const o=new Map;return(i,n)=>{let s=qo(o,i);if(!s&&(o.clear(),Xi(o,t.root,t.root.__children),s=qo(o,i),!s))throw new Error(`Route "${i}" not found`);let r=Wo.get(s.fullPath);if(!r){let a=Go(s),d=s.parent;for(;d;){const _=Go(d);_&&(a=_.replace(/\/$/,"")+"/"+a.replace(/^\//,"")),d=d.parent}const h=Ho.parse(a),p=Ho.tokensToFunction(h),u=Object.create(null);for(let _=0;_<h.length;_++)Z(h[_])||(u[h[_].name]=!0);r={toPath:p,keys:u},Wo.set(a,r),s.fullPath=a}let l=r.toPath(n,e)||"/";if(e.stringifyQueryParams&&n){const a={},d=Object.keys(n);for(let p=0;p<d.length;p++){const u=d[p];r.keys[u]||(a[u]=n[u])}const h=e.stringifyQueryParams(a);h&&(l+=h.charAt(0)==="?"?h:`?${h}`)}return l}}let Ko=[];function Kn(t){Ko.forEach(e=>e.inactivate()),t.forEach(e=>e.activate()),Ko=t}const Jn=t=>{const e=getComputedStyle(t).getPropertyValue("animation-name");return e&&e!=="none"},Yn=(t,e)=>{const o=()=>{t.removeEventListener("animationend",o),e()};t.addEventListener("animationend",o)};function Jo(t,e){return t.classList.add(e),new Promise(o=>{if(Jn(t)){const i=t.getBoundingClientRect(),n=`height: ${i.bottom-i.top}px; width: ${i.right-i.left}px`;t.setAttribute("style",`position: absolute; ${n}`),Yn(t,()=>{t.classList.remove(e),t.removeAttribute("style"),o()})}else t.classList.remove(e),o()})}const Xn=256;function Wt(t){return t!=null}function Qn(t){const e=Object.assign({},t);return delete e.next,e}function K({pathname:t="",search:e="",hash:o="",chain:i=[],params:n={},redirectFrom:s,resolver:r},l){const a=i.map(d=>d.route);return{baseUrl:r&&r.baseUrl||"",pathname:t,search:e,hash:o,routes:a,route:l||a.length&&a[a.length-1]||null,params:n,redirectFrom:s,getUrl:(d={})=>mt(pe.pathToRegexp.compile(Qi(a))(Object.assign({},n,d)),r)}}function Yo(t,e){const o=Object.assign({},t.params);return{redirect:{pathname:e,from:t.pathname,params:o}}}function Zn(t,e){e.location=K(t);const o=t.chain.map(i=>i.route).indexOf(t.route);return t.chain[o].element=e,e}function pt(t,e,o){if(we(t))return t.apply(o,e)}function Xo(t,e,o){return i=>{if(i&&(i.cancel||i.redirect))return i;if(o)return pt(o[t],e,o)}}function es(t,e){if(!Array.isArray(t)&&!Et(t))throw new Error(te(`Incorrect "children" value for the route ${e.path}: expected array or object, but got ${t}`));e.__children=[];const o=_t(t);for(let i=0;i<o.length;i++)Fi(o[i]),e.__children.push(o[i])}function lt(t){if(t&&t.length){const e=t[0].parentNode;for(let o=0;o<t.length;o++)e.removeChild(t[o])}}function mt(t,e){const o=e.__effectiveBaseUrl;return o?e.constructor.__createUrl(t.replace(/^\//,""),o).pathname:t}function Qi(t){return t.map(e=>e.path).reduce((e,o)=>o.length?e.replace(/\/$/,"")+"/"+o.replace(/^\//,""):e,"")}class pe extends We{constructor(e,o){const i=document.head.querySelector("base"),n=i&&i.getAttribute("href");super([],Object.assign({baseUrl:n&&We.__createUrl(n,document.URL).pathname.replace(/[^\/]*$/,"")},o)),this.resolveRoute=r=>this.__resolveRoute(r);const s=pe.NavigationTrigger;pe.setTriggers.apply(pe,Object.keys(s).map(r=>s[r])),this.baseUrl,this.ready,this.ready=Promise.resolve(e),this.location,this.location=K({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(e),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(e){const o=e.route;let i=Promise.resolve();we(o.children)&&(i=i.then(()=>o.children(Qn(e))).then(s=>{!Wt(s)&&!we(o.children)&&(s=o.children),es(s,o)}));const n={redirect:s=>Yo(e,s),component:s=>{const r=document.createElement(s);return this.__createdByRouter.set(r,!0),r}};return i.then(()=>{if(this.__isLatestRender(e))return pt(o.action,[e,n],o)}).then(s=>{if(Wt(s)&&(s instanceof HTMLElement||s.redirect||s===Ie))return s;if(Z(o.redirect))return n.redirect(o.redirect);if(o.bundle)return Tn(o.bundle).then(()=>{},()=>{throw new Error(te(`Bundle not found: ${o.bundle}. Check if the file name is correct`))})}).then(s=>{if(Wt(s))return s;if(Z(o.component))return n.component(o.component)})}setOutlet(e){e&&this.__ensureOutlet(e),this.__outlet=e}getOutlet(){return this.__outlet}setRoutes(e,o=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(e),o||this.__onNavigationEvent(),this.ready}render(e,o){const i=++this.__lastStartedRenderId,n=Object.assign({search:"",hash:""},Z(e)?{pathname:e}:e,{__renderId:i});return this.ready=this.resolve(n).then(s=>this.__fullyResolveChain(s)).then(s=>{if(this.__isLatestRender(s)){const r=this.__previousContext;if(s===r)return this.__updateBrowserHistory(r,!0),this.location;if(this.location=K(s),o&&this.__updateBrowserHistory(s,i===1),Be("location-changed",{router:this,location:this.location}),s.__skipAttach)return this.__copyUnchangedElements(s,r),this.__previousContext=s,this.location;this.__addAppearingContent(s,r);const l=this.__animateIfNeeded(s);return this.__runOnAfterEnterCallbacks(s),this.__runOnAfterLeaveCallbacks(s,r),l.then(()=>{if(this.__isLatestRender(s))return this.__removeDisappearingContent(),this.__previousContext=s,this.location})}}).catch(s=>{if(i===this.__lastStartedRenderId)throw o&&this.__updateBrowserHistory(n),lt(this.__outlet&&this.__outlet.children),this.location=K(Object.assign(n,{resolver:this})),Be("error",Object.assign({router:this,error:s},n)),s}),this.ready}__fullyResolveChain(e,o=e){return this.__findComponentContextAfterAllRedirects(o).then(i=>{const s=i!==o?i:e,l=mt(Qi(i.chain),i.resolver)===i.pathname,a=(d,h=d.route,p)=>d.next(void 0,h,p).then(u=>u===null||u===Ie?l?d:h.parent!==null?a(d,h.parent,u):u:u);return a(i).then(d=>{if(d===null||d===Ie)throw Bi(s);return d&&d!==Ie&&d!==i?this.__fullyResolveChain(s,d):this.__amendWithOnBeforeCallbacks(i)})})}__findComponentContextAfterAllRedirects(e){const o=e.result;return o instanceof HTMLElement?(Zn(e,o),Promise.resolve(e)):o.redirect?this.__redirect(o.redirect,e.__redirectCount,e.__renderId).then(i=>this.__findComponentContextAfterAllRedirects(i)):o instanceof Error?Promise.reject(o):Promise.reject(new Error(te(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${Cn(o)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(e){return this.__runOnBeforeCallbacks(e).then(o=>o===this.__previousContext||o===e?o:this.__fullyResolveChain(o))}__runOnBeforeCallbacks(e){const o=this.__previousContext||{},i=o.chain||[],n=e.chain;let s=Promise.resolve();const r=()=>({cancel:!0}),l=a=>Yo(e,a);if(e.__divergedChainIndex=0,e.__skipAttach=!1,i.length){for(let a=0;a<Math.min(i.length,n.length)&&!(i[a].route!==n[a].route||i[a].path!==n[a].path&&i[a].element!==n[a].element||!this.__isReusableElement(i[a].element,n[a].element));a=++e.__divergedChainIndex);if(e.__skipAttach=n.length===i.length&&e.__divergedChainIndex==n.length&&this.__isReusableElement(e.result,o.result),e.__skipAttach){for(let a=n.length-1;a>=0;a--)s=this.__runOnBeforeLeaveCallbacks(s,e,{prevent:r},i[a]);for(let a=0;a<n.length;a++)s=this.__runOnBeforeEnterCallbacks(s,e,{prevent:r,redirect:l},n[a]),i[a].element.location=K(e,i[a].route)}else for(let a=i.length-1;a>=e.__divergedChainIndex;a--)s=this.__runOnBeforeLeaveCallbacks(s,e,{prevent:r},i[a])}if(!e.__skipAttach)for(let a=0;a<n.length;a++)a<e.__divergedChainIndex?a<i.length&&i[a].element&&(i[a].element.location=K(e,i[a].route)):(s=this.__runOnBeforeEnterCallbacks(s,e,{prevent:r,redirect:l},n[a]),n[a].element&&(n[a].element.location=K(e,n[a].route)));return s.then(a=>{if(a){if(a.cancel)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if(a.redirect)return this.__redirect(a.redirect,e.__redirectCount,e.__renderId)}return e})}__runOnBeforeLeaveCallbacks(e,o,i,n){const s=K(o);return e.then(r=>{if(this.__isLatestRender(o))return Xo("onBeforeLeave",[s,i,this],n.element)(r)}).then(r=>{if(!(r||{}).redirect)return r})}__runOnBeforeEnterCallbacks(e,o,i,n){const s=K(o,n.route);return e.then(r=>{if(this.__isLatestRender(o))return Xo("onBeforeEnter",[s,i,this],n.element)(r)})}__isReusableElement(e,o){return e&&o?this.__createdByRouter.get(e)&&this.__createdByRouter.get(o)?e.localName===o.localName:e===o:!1}__isLatestRender(e){return e.__renderId===this.__lastStartedRenderId}__redirect(e,o,i){if(o>Xn)throw new Error(te(`Too many redirects when rendering ${e.from}`));return this.resolve({pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:(o||0)+1,__renderId:i})}__ensureOutlet(e=this.__outlet){if(!(e instanceof Node))throw new TypeError(te(`Expected router outlet to be a valid DOM Node (but got ${e})`))}__updateBrowserHistory({pathname:e,search:o="",hash:i=""},n){if(window.location.pathname!==e||window.location.search!==o||window.location.hash!==i){const s=n?"replaceState":"pushState";window.history[s](null,document.title,e+o+i),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(e,o){let i=this.__outlet;for(let n=0;n<e.__divergedChainIndex;n++){const s=o&&o.chain[n].element;if(s)if(s.parentNode===i)e.chain[n].element=s,i=s;else break}return i}__addAppearingContent(e,o){this.__ensureOutlet(),this.__removeAppearingContent();const i=this.__copyUnchangedElements(e,o);this.__appearingContent=[],this.__disappearingContent=Array.from(i.children).filter(s=>this.__addedByRouter.get(s)&&s!==e.result);let n=i;for(let s=e.__divergedChainIndex;s<e.chain.length;s++){const r=e.chain[s].element;r&&(n.appendChild(r),this.__addedByRouter.set(r,!0),n===i&&this.__appearingContent.push(r),n=r)}}__removeDisappearingContent(){this.__disappearingContent&&lt(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(lt(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(e,o){if(o)for(let i=o.chain.length-1;i>=e.__divergedChainIndex&&this.__isLatestRender(e);i--){const n=o.chain[i].element;if(n)try{const s=K(e);pt(n.onAfterLeave,[s,{},o.resolver],n)}finally{this.__disappearingContent.indexOf(n)>-1&&lt(n.children)}}}__runOnAfterEnterCallbacks(e){for(let o=e.__divergedChainIndex;o<e.chain.length&&this.__isLatestRender(e);o++){const i=e.chain[o].element||{},n=K(e,e.chain[o].route);pt(i.onAfterEnter,[n,{},e.resolver],i)}}__animateIfNeeded(e){const o=(this.__disappearingContent||[])[0],i=(this.__appearingContent||[])[0],n=[],s=e.chain;let r;for(let l=s.length;l>0;l--)if(s[l-1].route.animate){r=s[l-1].route.animate;break}if(o&&i&&r){const l=Et(r)&&r.leave||"leaving",a=Et(r)&&r.enter||"entering";n.push(Jo(o,l)),n.push(Jo(i,a))}return Promise.all(n).then(()=>e)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(e){const{pathname:o,search:i,hash:n}=e?e.detail:window.location;Z(this.__normalizePathname(o))&&(e&&e.preventDefault&&e.preventDefault(),this.render({pathname:o,search:i,hash:n},!0))}static setTriggers(...e){Kn(e)}urlForName(e,o){return this.__urlForName||(this.__urlForName=Gn(this)),mt(this.__urlForName(e,o),this)}urlForPath(e,o){return mt(pe.pathToRegexp.compile(e)(o),this)}static go(e){const{pathname:o,search:i,hash:n}=Z(e)?this.__createUrl(e,"http://a"):e;return Be("go",{pathname:o,search:i,hash:n})}}const ts=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,vt=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function os(){function t(){return!0}return Zi(t)}function is(){try{return ns()?!0:ss()?vt?!rs():!os():!1}catch{return!1}}function ns(){return localStorage.getItem("vaadin.developmentmode.force")}function ss(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function rs(){return!!(vt&&Object.keys(vt).map(e=>vt[e]).filter(e=>e.productionMode).length>0)}function Zi(t,e){if(typeof t!="function")return;const o=ts.exec(t.toString());if(o)try{t=new Function(o[1])}catch(i){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",i)}return t(e)}window.Vaadin=window.Vaadin||{};const Qo=function(t,e){if(window.Vaadin.developmentMode)return Zi(t,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=is());function as(){}const ls=function(){if(typeof Qo=="function")return Qo(as)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.4"});ls();pe.NavigationTrigger={POPSTATE:Rn,CLICK:$n};var qt,A;(function(t){t.CONNECTED="connected",t.LOADING="loading",t.RECONNECTING="reconnecting",t.CONNECTION_LOST="connection-lost"})(A||(A={}));class ds{constructor(e){this.stateChangeListeners=new Set,this.loadingCount=0,this.connectionState=e,this.serviceWorkerMessageListener=this.serviceWorkerMessageListener.bind(this),navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",this.serviceWorkerMessageListener),navigator.serviceWorker.ready.then(o=>{var i;(i=o.active)===null||i===void 0||i.postMessage({method:"Vaadin.ServiceWorker.isConnectionLost",id:"Vaadin.ServiceWorker.isConnectionLost"})}))}addStateChangeListener(e){this.stateChangeListeners.add(e)}removeStateChangeListener(e){this.stateChangeListeners.delete(e)}loadingStarted(){this.state=A.LOADING,this.loadingCount+=1}loadingFinished(){this.decreaseLoadingCount(A.CONNECTED)}loadingFailed(){this.decreaseLoadingCount(A.CONNECTION_LOST)}decreaseLoadingCount(e){this.loadingCount>0&&(this.loadingCount-=1,this.loadingCount===0&&(this.state=e))}get state(){return this.connectionState}set state(e){if(e!==this.connectionState){const o=this.connectionState;this.connectionState=e,this.loadingCount=0;for(const i of this.stateChangeListeners)i(o,this.connectionState)}}get online(){return this.connectionState===A.CONNECTED||this.connectionState===A.LOADING}get offline(){return!this.online}serviceWorkerMessageListener(e){typeof e.data=="object"&&e.data.id==="Vaadin.ServiceWorker.isConnectionLost"&&(e.data.result===!0&&(this.state=A.CONNECTION_LOST),navigator.serviceWorker.removeEventListener("message",this.serviceWorkerMessageListener))}}const cs=t=>!!(t==="localhost"||t==="[::1]"||/^127\.\d+\.\d+\.\d+$/u.exec(t)),dt=window;if(!(!((qt=dt.Vaadin)===null||qt===void 0)&&qt.connectionState)){let t;cs(window.location.hostname)?t=!0:t=navigator.onLine,dt.Vaadin||(dt.Vaadin={}),dt.Vaadin.connectionState=new ds(t?A.CONNECTED:A.CONNECTION_LOST)}function H(t,e,o,i){var n=arguments.length,s=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(t,e,o,i);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(s=(n<3?r(s):n>3?r(e,o,s):r(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const hs=!1,ft=globalThis,yo=ft.ShadowRoot&&(ft.ShadyCSS===void 0||ft.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,_o=Symbol(),Zo=new WeakMap;class en{constructor(e,o,i){if(this._$cssResult$=!0,i!==_o)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this._strings=o}get styleSheet(){let e=this._styleSheet;const o=this._strings;if(yo&&e===void 0){const i=o!==void 0&&o.length===1;i&&(e=Zo.get(o)),e===void 0&&((this._styleSheet=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Zo.set(o,e))}return e}toString(){return this.cssText}}const us=t=>{if(t._$cssResult$===!0)return t.cssText;if(typeof t=="number")return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)},ps=t=>new en(typeof t=="string"?t:String(t),void 0,_o),$=(t,...e)=>{const o=t.length===1?t[0]:e.reduce((i,n,s)=>i+us(n)+t[s+1],t[0]);return new en(o,t,_o)},ms=(t,e)=>{if(yo)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(const o of e){const i=document.createElement("style"),n=ft.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=o.cssText,t.appendChild(i)}},vs=t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return ps(e)},ei=yo||hs?t=>t:t=>t instanceof CSSStyleSheet?vs(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:fs,defineProperty:gs,getOwnPropertyDescriptor:ti,getOwnPropertyNames:ys,getOwnPropertySymbols:_s,getPrototypeOf:oi}=Object,j=globalThis;let Q;const ii=j.trustedTypes,bs=ii?ii.emptyScript:"",gt=j.reactiveElementPolyfillSupportDevMode;var Di;{const t=j.litIssuedWarnings??(j.litIssuedWarnings=new Set);Q=(e,o)=>{o+=` See https://lit.dev/msg/${e} for more information.`,t.has(o)||(console.warn(o),t.add(o))},Q("dev-mode","Lit is in dev mode. Not recommended for production!"),(Di=j.ShadyDOM)!=null&&Di.inUse&&gt===void 0&&Q("polyfill-support-missing","Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded.")}const Gt=t=>{j.emitLitDebugLogEvents&&j.dispatchEvent(new CustomEvent("lit-debug",{detail:t}))},Pe=(t,e)=>t,St={toAttribute(t,e){switch(e){case Boolean:t=t?bs:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t);break}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}break}return o}},bo=(t,e)=>!fs(t,e),ni={attribute:!0,type:String,converter:St,reflect:!1,hasChanged:bo};Symbol.metadata??(Symbol.metadata=Symbol("metadata"));j.litPropertyMetadata??(j.litPropertyMetadata=new WeakMap);class de extends HTMLElement{static addInitializer(e){this.__prepare(),(this._initializers??(this._initializers=[])).push(e)}static get observedAttributes(){return this.finalize(),this.__attributeToPropertyMap&&[...this.__attributeToPropertyMap.keys()]}static createProperty(e,o=ni){if(o.state&&(o.attribute=!1),this.__prepare(),this.elementProperties.set(e,o),!o.noAccessor){const i=Symbol.for(`${String(e)} (@property() cache)`),n=this.getPropertyDescriptor(e,i,o);n!==void 0&&gs(this.prototype,e,n)}}static getPropertyDescriptor(e,o,i){const{get:n,set:s}=ti(this.prototype,e)??{get(){return this[o]},set(r){this[o]=r}};if(n==null){if("value"in(ti(this.prototype,e)??{}))throw new Error(`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it's actually declared as a value on the prototype. Usually this is due to using @property or @state on a method.`);Q("reactive-property-without-getter",`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it does not have a getter. This will be an error in a future version of Lit.`)}return{get(){return n==null?void 0:n.call(this)},set(r){const l=n==null?void 0:n.call(this);s.call(this,r),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ni}static __prepare(){if(this.hasOwnProperty(Pe("elementProperties")))return;const e=oi(this);e.finalize(),e._initializers!==void 0&&(this._initializers=[...e._initializers]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Pe("finalized")))return;if(this.finalized=!0,this.__prepare(),this.hasOwnProperty(Pe("properties"))){const o=this.properties,i=[...ys(o),..._s(o)];for(const n of i)this.createProperty(n,o[n])}const e=this[Symbol.metadata];if(e!==null){const o=litPropertyMetadata.get(e);if(o!==void 0)for(const[i,n]of o)this.elementProperties.set(i,n)}this.__attributeToPropertyMap=new Map;for(const[o,i]of this.elementProperties){const n=this.__attributeNameForProperty(o,i);n!==void 0&&this.__attributeToPropertyMap.set(n,o)}this.elementStyles=this.finalizeStyles(this.styles),this.hasOwnProperty("createProperty")&&Q("no-override-create-property","Overriding ReactiveElement.createProperty() is deprecated. The override will not be called with standard decorators"),this.hasOwnProperty("getPropertyDescriptor")&&Q("no-override-get-property-descriptor","Overriding ReactiveElement.getPropertyDescriptor() is deprecated. The override will not be called with standard decorators")}static finalizeStyles(e){const o=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const n of i)o.unshift(ei(n))}else e!==void 0&&o.push(ei(e));return o}static __attributeNameForProperty(e,o){const i=o.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this.__instanceProperties=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.__reflectingProperty=null,this.__initialize()}__initialize(){var e;this.__updatePromise=new Promise(o=>this.enableUpdating=o),this._$changedProperties=new Map,this.__saveInstanceProperties(),this.requestUpdate(),(e=this.constructor._initializers)==null||e.forEach(o=>o(this))}addController(e){var o;(this.__controllers??(this.__controllers=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((o=e.hostConnected)==null||o.call(e))}removeController(e){var o;(o=this.__controllers)==null||o.delete(e)}__saveInstanceProperties(){const e=new Map,o=this.constructor.elementProperties;for(const i of o.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this.__instanceProperties=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ms(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this.__controllers)==null||e.forEach(o=>{var i;return(i=o.hostConnected)==null?void 0:i.call(o)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this.__controllers)==null||e.forEach(o=>{var i;return(i=o.hostDisconnected)==null?void 0:i.call(o)})}attributeChangedCallback(e,o,i){this._$attributeToProperty(e,i)}__propertyToAttribute(e,o){var r;const n=this.constructor.elementProperties.get(e),s=this.constructor.__attributeNameForProperty(e,n);if(s!==void 0&&n.reflect===!0){const a=(((r=n.converter)==null?void 0:r.toAttribute)!==void 0?n.converter:St).toAttribute(o,n.type);this.constructor.enabledWarnings.includes("migration")&&a===void 0&&Q("undefined-attribute-value",`The attribute value for the ${e} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`),this.__reflectingProperty=e,a==null?this.removeAttribute(s):this.setAttribute(s,a),this.__reflectingProperty=null}}_$attributeToProperty(e,o){var s;const i=this.constructor,n=i.__attributeToPropertyMap.get(e);if(n!==void 0&&this.__reflectingProperty!==n){const r=i.getPropertyOptions(n),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((s=r.converter)==null?void 0:s.fromAttribute)!==void 0?r.converter:St;this.__reflectingProperty=n,this[n]=l.fromAttribute(o,r.type),this.__reflectingProperty=null}}requestUpdate(e,o,i){if(e!==void 0){e instanceof Event&&Q("","The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()"),i??(i=this.constructor.getPropertyOptions(e));const n=i.hasChanged??bo,s=this[e];if(n(s,o))this._$changeProperty(e,o,i);else return}this.isUpdatePending===!1&&(this.__updatePromise=this.__enqueueUpdate())}_$changeProperty(e,o,i){this._$changedProperties.has(e)||this._$changedProperties.set(e,o),i.reflect===!0&&this.__reflectingProperty!==e&&(this.__reflectingProperties??(this.__reflectingProperties=new Set)).add(e)}async __enqueueUpdate(){this.isUpdatePending=!0;try{await this.__updatePromise}catch(o){Promise.reject(o)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){const e=this.performUpdate();return this.constructor.enabledWarnings.includes("async-perform-update")&&typeof(e==null?void 0:e.then)=="function"&&Q("async-perform-update",`Element ${this.localName} returned a Promise from performUpdate(). This behavior is deprecated and will be removed in a future version of ReactiveElement.`),e}performUpdate(){var i;if(!this.isUpdatePending)return;if(Gt==null||Gt({kind:"update"}),!this.hasUpdated){this.renderRoot??(this.renderRoot=this.createRenderRoot());{const r=[...this.constructor.elementProperties.keys()].filter(l=>this.hasOwnProperty(l)&&l in oi(this));if(r.length)throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${r.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`)}if(this.__instanceProperties){for(const[s,r]of this.__instanceProperties)this[s]=r;this.__instanceProperties=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[s,r]of n)r.wrapped===!0&&!this._$changedProperties.has(s)&&this[s]!==void 0&&this._$changeProperty(s,this[s],r)}let e=!1;const o=this._$changedProperties;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),(i=this.__controllers)==null||i.forEach(n=>{var s;return(s=n.hostUpdate)==null?void 0:s.call(n)}),this.update(o)):this.__markUpdated()}catch(n){throw e=!1,this.__markUpdated(),n}e&&this._$didUpdate(o)}willUpdate(e){}_$didUpdate(e){var o;(o=this.__controllers)==null||o.forEach(i=>{var n;return(n=i.hostUpdated)==null?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e),this.isUpdatePending&&this.constructor.enabledWarnings.includes("change-in-update")&&Q("change-in-update",`Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`)}__markUpdated(){this._$changedProperties=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.__updatePromise}shouldUpdate(e){return!0}update(e){this.__reflectingProperties&&(this.__reflectingProperties=this.__reflectingProperties.forEach(o=>this.__propertyToAttribute(o,this[o]))),this.__markUpdated()}updated(e){}firstUpdated(e){}}de.elementStyles=[];de.shadowRootOptions={mode:"open"};de[Pe("elementProperties")]=new Map;de[Pe("finalized")]=new Map;gt==null||gt({ReactiveElement:de});{de.enabledWarnings=["change-in-update","async-perform-update"];const t=function(e){e.hasOwnProperty(Pe("enabledWarnings"))||(e.enabledWarnings=e.enabledWarnings.slice())};de.enableWarning=function(e){t(this),this.enabledWarnings.includes(e)||this.enabledWarnings.push(e)},de.disableWarning=function(e){t(this);const o=this.enabledWarnings.indexOf(e);o>=0&&this.enabledWarnings.splice(o,1)}}(j.reactiveElementVersions??(j.reactiveElementVersions=[])).push("2.0.4");j.reactiveElementVersions.length>1&&Q("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=globalThis,E=t=>{D.emitLitDebugLogEvents&&D.dispatchEvent(new CustomEvent("lit-debug",{detail:t}))};let ws=0,qe;D.litIssuedWarnings??(D.litIssuedWarnings=new Set),qe=(t,e)=>{e+=t?` See https://lit.dev/msg/${t} for more information.`:"",D.litIssuedWarnings.has(e)||(console.warn(e),D.litIssuedWarnings.add(e))},qe("dev-mode","Lit is in dev mode. Not recommended for production!");var Ui,zi;const X=(Ui=D.ShadyDOM)!=null&&Ui.inUse&&((zi=D.ShadyDOM)==null?void 0:zi.noPatch)===!0?D.ShadyDOM.wrap:t=>t,xt=D.trustedTypes,si=xt?xt.createPolicy("lit-html",{createHTML:t=>t}):void 0,Es=t=>t,Dt=(t,e,o)=>Es,Ss=t=>{if(xe!==Dt)throw new Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");xe=t},xs=()=>{xe=Dt},co=(t,e,o)=>xe(t,e,o),tn="$lit$",ae=`lit$${Math.random().toFixed(9).slice(2)}$`,on="?"+ae,Cs=`<${on}>`,Ee=document,Ge=()=>Ee.createComment(""),Ke=t=>t===null||typeof t!="object"&&typeof t!="function",nn=Array.isArray,Ts=t=>nn(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",Kt=`[ 	
\f\r]`,ks=`[^ 	
\f\r"'\`<>=]`,$s=`[^\\s"'>=/]`,je=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ri=1,Jt=2,As=3,ai=/-->/g,li=/>/g,fe=new RegExp(`>|${Kt}(?:(${$s}+)(${Kt}*=${Kt}*(?:${ks}|("|')|))|$)`,"g"),Rs=0,di=1,Ns=2,ci=3,Yt=/'/g,Xt=/"/g,sn=/^(?:script|style|textarea|title)$/i,Is=1,Ct=2,wo=1,Tt=2,Ps=3,Os=4,Ls=5,Eo=6,Ms=7,rn=t=>(e,...o)=>(e.some(i=>i===void 0)&&console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`),o.some(i=>i==null?void 0:i._$litStatic$)&&qe("",`Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.
Please use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions`),{_$litType$:t,strings:e,values:o}),y=rn(Is),Ne=rn(Ct),Se=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),hi=new WeakMap,_e=Ee.createTreeWalker(Ee,129);let xe=Dt;function an(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw")){let o="invalid template strings array";throw o=`
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g,`
`),new Error(o)}return si!==void 0?si.createHTML(e):e}const Vs=(t,e)=>{const o=t.length-1,i=[];let n=e===Ct?"<svg>":"",s,r=je;for(let a=0;a<o;a++){const d=t[a];let h=-1,p,u=0,_;for(;u<d.length&&(r.lastIndex=u,_=r.exec(d),_!==null);)if(u=r.lastIndex,r===je){if(_[ri]==="!--")r=ai;else if(_[ri]!==void 0)r=li;else if(_[Jt]!==void 0)sn.test(_[Jt])&&(s=new RegExp(`</${_[Jt]}`,"g")),r=fe;else if(_[As]!==void 0)throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions")}else r===fe?_[Rs]===">"?(r=s??je,h=-1):_[di]===void 0?h=-2:(h=r.lastIndex-_[Ns].length,p=_[di],r=_[ci]===void 0?fe:_[ci]==='"'?Xt:Yt):r===Xt||r===Yt?r=fe:r===ai||r===li?r=je:(r=fe,s=void 0);console.assert(h===-1||r===fe||r===Yt||r===Xt,"unexpected parse state B");const se=r===fe&&t[a+1].startsWith("/>")?" ":"";n+=r===je?d+Cs:h>=0?(i.push(p),d.slice(0,h)+tn+d.slice(h)+ae+se):d+ae+(h===-2?a:se)}const l=n+(t[o]||"<?>")+(e===Ct?"</svg>":"");return[an(t,l),i]};class Je{constructor({strings:e,["_$litType$"]:o},i){this.parts=[];let n,s=0,r=0;const l=e.length-1,a=this.parts,[d,h]=Vs(e,o);if(this.el=Je.createElement(d,i),_e.currentNode=this.el.content,o===Ct){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(n=_e.nextNode())!==null&&a.length<l;){if(n.nodeType===1){{const p=n.localName;if(/^(?:textarea|template)$/i.test(p)&&n.innerHTML.includes(ae)){const u=`Expressions are not supported inside \`${p}\` elements. See https://lit.dev/msg/expression-in-${p} for more information.`;if(p==="template")throw new Error(u);qe("",u)}}if(n.hasAttributes())for(const p of n.getAttributeNames())if(p.endsWith(tn)){const u=h[r++],se=n.getAttribute(p).split(ae),G=/([.?@])?(.*)/.exec(u);a.push({type:wo,index:s,name:G[2],strings:se,ctor:G[1]==="."?Us:G[1]==="?"?zs:G[1]==="@"?js:Ut}),n.removeAttribute(p)}else p.startsWith(ae)&&(a.push({type:Eo,index:s}),n.removeAttribute(p));if(sn.test(n.tagName)){const p=n.textContent.split(ae),u=p.length-1;if(u>0){n.textContent=xt?xt.emptyScript:"";for(let _=0;_<u;_++)n.append(p[_],Ge()),_e.nextNode(),a.push({type:Tt,index:++s});n.append(p[u],Ge())}}}else if(n.nodeType===8)if(n.data===on)a.push({type:Tt,index:s});else{let u=-1;for(;(u=n.data.indexOf(ae,u+1))!==-1;)a.push({type:Ms,index:s}),u+=ae.length-1}s++}if(h.length!==r)throw new Error('Detected duplicate attribute bindings. This occurs if your template has duplicate attributes on an element tag. For example "<input ?disabled=${true} ?disabled=${false}>" contains a duplicate "disabled" attribute. The error was detected in the following template: \n`'+e.join("${...}")+"`");E&&E({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:e})}static createElement(e,o){const i=Ee.createElement("template");return i.innerHTML=e,i}}function Le(t,e,o=t,i){var r,l;if(e===Se)return e;let n=i!==void 0?(r=o.__directives)==null?void 0:r[i]:o.__directive;const s=Ke(e)?void 0:e._$litDirective$;return(n==null?void 0:n.constructor)!==s&&((l=n==null?void 0:n._$notifyDirectiveConnectionChanged)==null||l.call(n,!1),s===void 0?n=void 0:(n=new s(t),n._$initialize(t,o,i)),i!==void 0?(o.__directives??(o.__directives=[]))[i]=n:o.__directive=n),n!==void 0&&(e=Le(t,n._$resolve(t,e.values),n,i)),e}class Ds{constructor(e,o){this._$parts=[],this._$disconnectableChildren=void 0,this._$template=e,this._$parent=o}get parentNode(){return this._$parent.parentNode}get _$isConnected(){return this._$parent._$isConnected}_clone(e){const{el:{content:o},parts:i}=this._$template,n=((e==null?void 0:e.creationScope)??Ee).importNode(o,!0);_e.currentNode=n;let s=_e.nextNode(),r=0,l=0,a=i[0];for(;a!==void 0;){if(r===a.index){let d;a.type===Tt?d=new et(s,s.nextSibling,this,e):a.type===wo?d=new a.ctor(s,a.name,a.strings,this,e):a.type===Eo&&(d=new Fs(s,this,e)),this._$parts.push(d),a=i[++l]}r!==(a==null?void 0:a.index)&&(s=_e.nextNode(),r++)}return _e.currentNode=Ee,n}_update(e){let o=0;for(const i of this._$parts)i!==void 0&&(E&&E({kind:"set part",part:i,value:e[o],valueIndex:o,values:e,templateInstance:this}),i.strings!==void 0?(i._$setValue(e,i,o),o+=i.strings.length-2):i._$setValue(e[o])),o++}}class et{get _$isConnected(){var e;return((e=this._$parent)==null?void 0:e._$isConnected)??this.__isConnected}constructor(e,o,i,n){this.type=Tt,this._$committedValue=k,this._$disconnectableChildren=void 0,this._$startNode=e,this._$endNode=o,this._$parent=i,this.options=n,this.__isConnected=(n==null?void 0:n.isConnected)??!0,this._textSanitizer=void 0}get parentNode(){let e=X(this._$startNode).parentNode;const o=this._$parent;return o!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=o.parentNode),e}get startNode(){return this._$startNode}get endNode(){return this._$endNode}_$setValue(e,o=this){var i;if(this.parentNode===null)throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");if(e=Le(this,e,o),Ke(e))e===k||e==null||e===""?(this._$committedValue!==k&&(E&&E({kind:"commit nothing to child",start:this._$startNode,end:this._$endNode,parent:this._$parent,options:this.options}),this._$clear()),this._$committedValue=k):e!==this._$committedValue&&e!==Se&&this._commitText(e);else if(e._$litType$!==void 0)this._commitTemplateResult(e);else if(e.nodeType!==void 0){if(((i=this.options)==null?void 0:i.host)===e){this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"),console.warn("Attempted to render the template host",e,"inside itself. This is almost always a mistake, and in dev mode ","we render some warning text. In production however, we'll ","render it, which will usually result in an error, and sometimes ","in the element disappearing from the DOM.");return}this._commitNode(e)}else Ts(e)?this._commitIterable(e):this._commitText(e)}_insert(e){return X(X(this._$startNode).parentNode).insertBefore(e,this._$endNode)}_commitNode(e){var o;if(this._$committedValue!==e){if(this._$clear(),xe!==Dt){const i=(o=this._$startNode.parentNode)==null?void 0:o.nodeName;if(i==="STYLE"||i==="SCRIPT"){let n="Forbidden";throw i==="STYLE"?n="Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and make do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.":n="Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.",new Error(n)}}E&&E({kind:"commit node",start:this._$startNode,parent:this._$parent,value:e,options:this.options}),this._$committedValue=this._insert(e)}}_commitText(e){if(this._$committedValue!==k&&Ke(this._$committedValue)){const o=X(this._$startNode).nextSibling;this._textSanitizer===void 0&&(this._textSanitizer=co(o,"data","property")),e=this._textSanitizer(e),E&&E({kind:"commit text",node:o,value:e,options:this.options}),o.data=e}else{const o=Ee.createTextNode("");this._commitNode(o),this._textSanitizer===void 0&&(this._textSanitizer=co(o,"data","property")),e=this._textSanitizer(e),E&&E({kind:"commit text",node:o,value:e,options:this.options}),o.data=e}this._$committedValue=e}_commitTemplateResult(e){var s;const{values:o,["_$litType$"]:i}=e,n=typeof i=="number"?this._$getTemplate(e):(i.el===void 0&&(i.el=Je.createElement(an(i.h,i.h[0]),this.options)),i);if(((s=this._$committedValue)==null?void 0:s._$template)===n)E&&E({kind:"template updating",template:n,instance:this._$committedValue,parts:this._$committedValue._$parts,options:this.options,values:o}),this._$committedValue._update(o);else{const r=new Ds(n,this),l=r._clone(this.options);E&&E({kind:"template instantiated",template:n,instance:r,parts:r._$parts,options:this.options,fragment:l,values:o}),r._update(o),E&&E({kind:"template instantiated and updated",template:n,instance:r,parts:r._$parts,options:this.options,fragment:l,values:o}),this._commitNode(l),this._$committedValue=r}}_$getTemplate(e){let o=hi.get(e.strings);return o===void 0&&hi.set(e.strings,o=new Je(e)),o}_commitIterable(e){nn(this._$committedValue)||(this._$committedValue=[],this._$clear());const o=this._$committedValue;let i=0,n;for(const s of e)i===o.length?o.push(n=new et(this._insert(Ge()),this._insert(Ge()),this,this.options)):n=o[i],n._$setValue(s),i++;i<o.length&&(this._$clear(n&&X(n._$endNode).nextSibling,i),o.length=i)}_$clear(e=X(this._$startNode).nextSibling,o){var i;for((i=this._$notifyConnectionChanged)==null||i.call(this,!1,!0,o);e&&e!==this._$endNode;){const n=X(e).nextSibling;X(e).remove(),e=n}}setConnected(e){var o;if(this._$parent===void 0)this.__isConnected=e,(o=this._$notifyConnectionChanged)==null||o.call(this,e);else throw new Error("part.setConnected() may only be called on a RootPart returned from render().")}}class Ut{get tagName(){return this.element.tagName}get _$isConnected(){return this._$parent._$isConnected}constructor(e,o,i,n,s){this.type=wo,this._$committedValue=k,this._$disconnectableChildren=void 0,this.element=e,this.name=o,this._$parent=n,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$committedValue=new Array(i.length-1).fill(new String),this.strings=i):this._$committedValue=k,this._sanitizer=void 0}_$setValue(e,o=this,i,n){const s=this.strings;let r=!1;if(s===void 0)e=Le(this,e,o,0),r=!Ke(e)||e!==this._$committedValue&&e!==Se,r&&(this._$committedValue=e);else{const l=e;e=s[0];let a,d;for(a=0;a<s.length-1;a++)d=Le(this,l[i+a],o,a),d===Se&&(d=this._$committedValue[a]),r||(r=!Ke(d)||d!==this._$committedValue[a]),d===k?e=k:e!==k&&(e+=(d??"")+s[a+1]),this._$committedValue[a]=d}r&&!n&&this._commitValue(e)}_commitValue(e){e===k?X(this.element).removeAttribute(this.name):(this._sanitizer===void 0&&(this._sanitizer=xe(this.element,this.name,"attribute")),e=this._sanitizer(e??""),E&&E({kind:"commit attribute",element:this.element,name:this.name,value:e,options:this.options}),X(this.element).setAttribute(this.name,e??""))}}class Us extends Ut{constructor(){super(...arguments),this.type=Ps}_commitValue(e){this._sanitizer===void 0&&(this._sanitizer=xe(this.element,this.name,"property")),e=this._sanitizer(e),E&&E({kind:"commit property",element:this.element,name:this.name,value:e,options:this.options}),this.element[this.name]=e===k?void 0:e}}class zs extends Ut{constructor(){super(...arguments),this.type=Os}_commitValue(e){E&&E({kind:"commit boolean attribute",element:this.element,name:this.name,value:!!(e&&e!==k),options:this.options}),X(this.element).toggleAttribute(this.name,!!e&&e!==k)}}class js extends Ut{constructor(e,o,i,n,s){if(super(e,o,i,n,s),this.type=Ls,this.strings!==void 0)throw new Error(`A \`<${e.localName}>\` has a \`@${o}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`)}_$setValue(e,o=this){if(e=Le(this,e,o,0)??k,e===Se)return;const i=this._$committedValue,n=e===k&&i!==k||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==k&&(i===k||n);E&&E({kind:"commit event listener",element:this.element,name:this.name,value:e,options:this.options,removeListener:n,addListener:s,oldListener:i}),n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$committedValue=e}handleEvent(e){var o;typeof this._$committedValue=="function"?this._$committedValue.call(((o=this.options)==null?void 0:o.host)??this.element,e):this._$committedValue.handleEvent(e)}}class Fs{constructor(e,o,i){this.element=e,this.type=Eo,this._$disconnectableChildren=void 0,this._$parent=o,this.options=i}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e){E&&E({kind:"commit to element binding",element:this.element,value:e,options:this.options}),Le(this,e)}}const Qt=D.litHtmlPolyfillSupportDevMode;Qt==null||Qt(Je,et);(D.litHtmlVersions??(D.litHtmlVersions=[])).push("3.1.3");D.litHtmlVersions.length>1&&qe("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");const be=(t,e,o)=>{if(e==null)throw new TypeError(`The container to render into may not be ${e}`);const i=ws++,n=(o==null?void 0:o.renderBefore)??e;let s=n._$litPart$;if(E&&E({kind:"begin render",id:i,value:t,container:e,options:o,part:s}),s===void 0){const r=(o==null?void 0:o.renderBefore)??null;n._$litPart$=s=new et(e.insertBefore(Ge(),r),r,void 0,o??{})}return s._$setValue(t),E&&E({kind:"end render",id:i,value:t,container:e,options:o,part:s}),s};be.setSanitizer=Ss,be.createSanitizer=co,be._testOnlyClearSanitizerFactoryDoNotCallOrElse=xs;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bs=(t,e)=>t;let ln;{const t=globalThis.litIssuedWarnings??(globalThis.litIssuedWarnings=new Set);ln=(e,o)=>{o+=` See https://lit.dev/msg/${e} for more information.`,t.has(o)||(console.warn(o),t.add(o))}}class N extends de{constructor(){super(...arguments),this.renderOptions={host:this},this.__childPart=void 0}createRenderRoot(){var o;const e=super.createRenderRoot();return(o=this.renderOptions).renderBefore??(o.renderBefore=e.firstChild),e}update(e){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.__childPart=be(o,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this.__childPart)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.__childPart)==null||e.setConnected(!1)}render(){return Se}}N._$litElement$=!0;N[Bs("finalized")]=!0;var ji;(ji=globalThis.litElementHydrateSupport)==null||ji.call(globalThis,{LitElement:N});const Zt=globalThis.litElementPolyfillSupportDevMode;Zt==null||Zt({LitElement:N});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.5");globalThis.litElementVersions.length>1&&ln("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const U=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let dn;{const t=globalThis.litIssuedWarnings??(globalThis.litIssuedWarnings=new Set);dn=(e,o)=>{o+=` See https://lit.dev/msg/${e} for more information.`,t.has(o)||(console.warn(o),t.add(o))}}const Hs=(t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,i?{...t,wrapped:!0}:t),i?Object.getOwnPropertyDescriptor(e,o):void 0},Ws={attribute:!0,type:String,converter:St,reflect:!1,hasChanged:bo},qs=(t=Ws,e,o)=>{const{kind:i,metadata:n}=o;n==null&&dn("missing-class-metadata",`The class ${e} is missing decorator metadata. This could mean that you're using a compiler that supports decorators but doesn't support decorator metadata, such as TypeScript 5.1. Please update your compiler.`);let s=globalThis.litPropertyMetadata.get(n);if(s===void 0&&globalThis.litPropertyMetadata.set(n,s=new Map),s.set(o.name,t),i==="accessor"){const{name:r}=o;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(r,a,t)},init(l){return l!==void 0&&this._$changeProperty(r,void 0,t),l}}}else if(i==="setter"){const{name:r}=o;return function(l){const a=this[r];e.call(this,l),this.requestUpdate(r,a,t)}}throw new Error(`Unsupported decorator location: ${i}`)};function b(t){return(e,o)=>typeof o=="object"?qs(t,e,o):Hs(t,e,o)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function I(t){return b({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Gs=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let cn;{const t=globalThis.litIssuedWarnings??(globalThis.litIssuedWarnings=new Set);cn=(e,o)=>{o+=e?` See https://lit.dev/msg/${e} for more information.`:"",t.has(o)||(console.warn(o),t.add(o))}}function tt(t,e){return(o,i,n)=>{const s=r=>{var a;const l=((a=r.renderRoot)==null?void 0:a.querySelector(t))??null;if(l===null&&e&&!r.hasUpdated){const d=typeof i=="object"?i.name:i;cn("",`@query'd field ${JSON.stringify(String(d))} with the 'cache' flag set for selector '${t}' has been accessed before the first update and returned null. This is expected if the renderRoot tree has not been provided beforehand (e.g. via Declarative Shadow DOM). Therefore the value hasn't been cached.`)}return l};return Gs(o,i,{get(){return s(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ks={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Js=t=>(...e)=>({_$litDirective$:t,values:e});class Ys{constructor(e){}get _$isConnected(){return this._$parent._$isConnected}_$initialize(e,o,i){this.__part=e,this._$parent=o,this.__attributeIndex=i}_$resolve(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Xs extends Ys{constructor(e){var o;if(super(e),e.type!==Ks.ATTRIBUTE||e.name!=="class"||((o=e.strings)==null?void 0:o.length)>2)throw new Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(o=>e[o]).join(" ")+" "}update(e,[o]){var n,s;if(this._previousClasses===void 0){this._previousClasses=new Set,e.strings!==void 0&&(this._staticClasses=new Set(e.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in o)o[r]&&!((n=this._staticClasses)!=null&&n.has(r))&&this._previousClasses.add(r);return this.render(o)}const i=e.element.classList;for(const r of this._previousClasses)r in o||(i.remove(r),this._previousClasses.delete(r));for(const r in o){const l=!!o[r];l!==this._previousClasses.has(r)&&!((s=this._staticClasses)!=null&&s.has(r))&&(l?(i.add(r),this._previousClasses.add(r)):(i.remove(r),this._previousClasses.delete(r)))}return Se}}const So=Js(Xs),eo="css-loading-indicator";var J;(function(t){t.IDLE="",t.FIRST="first",t.SECOND="second",t.THIRD="third"})(J||(J={}));class O extends N{static create(){var e,o;const i=window;return!((e=i.Vaadin)===null||e===void 0)&&e.connectionIndicator||(i.Vaadin||(i.Vaadin={}),i.Vaadin.connectionIndicator=document.createElement("vaadin-connection-indicator"),document.body.appendChild(i.Vaadin.connectionIndicator)),(o=i.Vaadin)===null||o===void 0?void 0:o.connectionIndicator}constructor(){super(),this.firstDelay=450,this.secondDelay=1500,this.thirdDelay=5e3,this.expandedDuration=2e3,this.onlineText="Online",this.offlineText="Connection lost",this.reconnectingText="Connection lost, trying to reconnect...",this.offline=!1,this.reconnecting=!1,this.expanded=!1,this.loading=!1,this.loadingBarState=J.IDLE,this.applyDefaultThemeState=!0,this.firstTimeout=0,this.secondTimeout=0,this.thirdTimeout=0,this.expandedTimeout=0,this.lastMessageState=A.CONNECTED,this.connectionStateListener=()=>{this.expanded=this.updateConnectionState(),this.expandedTimeout=this.timeoutFor(this.expandedTimeout,this.expanded,()=>{this.expanded=!1},this.expandedDuration)}}render(){return y`
      <div class="v-loading-indicator ${this.loadingBarState}" style=${this.getLoadingBarStyle()}></div>

      <div
        class="v-status-message ${So({active:this.reconnecting})}"
      >
        <span class="text"> ${this.renderMessage()} </span>
      </div>
    `}connectedCallback(){var e;super.connectedCallback();const o=window;!((e=o.Vaadin)===null||e===void 0)&&e.connectionState&&(this.connectionStateStore=o.Vaadin.connectionState,this.connectionStateStore.addStateChangeListener(this.connectionStateListener),this.updateConnectionState()),this.updateTheme()}disconnectedCallback(){super.disconnectedCallback(),this.connectionStateStore&&this.connectionStateStore.removeStateChangeListener(this.connectionStateListener),this.updateTheme()}get applyDefaultTheme(){return this.applyDefaultThemeState}set applyDefaultTheme(e){e!==this.applyDefaultThemeState&&(this.applyDefaultThemeState=e,this.updateTheme())}createRenderRoot(){return this}updateConnectionState(){var e;const o=(e=this.connectionStateStore)===null||e===void 0?void 0:e.state;return this.offline=o===A.CONNECTION_LOST,this.reconnecting=o===A.RECONNECTING,this.updateLoading(o===A.LOADING),this.loading?!1:o!==this.lastMessageState?(this.lastMessageState=o,!0):!1}updateLoading(e){this.loading=e,this.loadingBarState=J.IDLE,this.firstTimeout=this.timeoutFor(this.firstTimeout,e,()=>{this.loadingBarState=J.FIRST},this.firstDelay),this.secondTimeout=this.timeoutFor(this.secondTimeout,e,()=>{this.loadingBarState=J.SECOND},this.secondDelay),this.thirdTimeout=this.timeoutFor(this.thirdTimeout,e,()=>{this.loadingBarState=J.THIRD},this.thirdDelay)}renderMessage(){return this.reconnecting?this.reconnectingText:this.offline?this.offlineText:this.onlineText}updateTheme(){if(this.applyDefaultThemeState&&this.isConnected){if(!document.getElementById(eo)){const e=document.createElement("style");e.id=eo,e.textContent=this.getDefaultStyle(),document.head.appendChild(e)}}else{const e=document.getElementById(eo);e&&document.head.removeChild(e)}}getDefaultStyle(){return`
      @keyframes v-progress-start {
        0% {
          width: 0%;
        }
        100% {
          width: 50%;
        }
      }
      @keyframes v-progress-delay {
        0% {
          width: 50%;
        }
        100% {
          width: 90%;
        }
      }
      @keyframes v-progress-wait {
        0% {
          width: 90%;
          height: 4px;
        }
        3% {
          width: 91%;
          height: 7px;
        }
        100% {
          width: 96%;
          height: 7px;
        }
      }
      @keyframes v-progress-wait-pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.1;
        }
        100% {
          opacity: 1;
        }
      }
      .v-loading-indicator,
      .v-status-message {
        position: fixed;
        z-index: 251;
        left: 0;
        right: auto;
        top: 0;
        background-color: var(--lumo-primary-color, var(--material-primary-color, blue));
        transition: none;
      }
      .v-loading-indicator {
        width: 50%;
        height: 4px;
        opacity: 1;
        pointer-events: none;
        animation: v-progress-start 1000ms 200ms both;
      }
      .v-loading-indicator[style*='none'] {
        display: block !important;
        width: 100%;
        opacity: 0;
        animation: none;
        transition: opacity 500ms 300ms, width 300ms;
      }
      .v-loading-indicator.second {
        width: 90%;
        animation: v-progress-delay 3.8s forwards;
      }
      .v-loading-indicator.third {
        width: 96%;
        animation: v-progress-wait 5s forwards, v-progress-wait-pulse 1s 4s infinite backwards;
      }

      vaadin-connection-indicator[offline] .v-loading-indicator,
      vaadin-connection-indicator[reconnecting] .v-loading-indicator {
        display: none;
      }

      .v-status-message {
        opacity: 0;
        width: 100%;
        max-height: var(--status-height-collapsed, 8px);
        overflow: hidden;
        background-color: var(--status-bg-color-online, var(--lumo-primary-color, var(--material-primary-color, blue)));
        color: var(
          --status-text-color-online,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
        transition: all 0.5s;
        padding: 0 0.5em;
      }

      vaadin-connection-indicator[offline] .v-status-message,
      vaadin-connection-indicator[reconnecting] .v-status-message {
        opacity: 1;
        background-color: var(--status-bg-color-offline, var(--lumo-shade, #333));
        color: var(
          --status-text-color-offline,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        background-image: repeating-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0) 10px,
          rgba(255, 255, 255, 0.1) 10px,
          rgba(255, 255, 255, 0.1) 20px
        );
      }

      vaadin-connection-indicator[reconnecting] .v-status-message {
        animation: show-reconnecting-status 2s;
      }

      vaadin-connection-indicator[offline] .v-status-message:hover,
      vaadin-connection-indicator[reconnecting] .v-status-message:hover,
      vaadin-connection-indicator[expanded] .v-status-message {
        max-height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[expanded] .v-status-message {
        opacity: 1;
      }

      .v-status-message span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[reconnecting] .v-status-message span::before {
        content: '';
        width: 1em;
        height: 1em;
        border-top: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-left: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-right: 2px solid transparent;
        border-bottom: 2px solid transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: v-spin 0.4s linear infinite;
        margin: 0 0.5em;
      }

      @keyframes v-spin {
        100% {
          transform: rotate(360deg);
        }
      }
    `}getLoadingBarStyle(){switch(this.loadingBarState){case J.IDLE:return"display: none";case J.FIRST:case J.SECOND:case J.THIRD:return"display: block";default:return""}}timeoutFor(e,o,i,n){return e!==0&&window.clearTimeout(e),o?window.setTimeout(i,n):0}static get instance(){return O.create()}}H([b({type:Number})],O.prototype,"firstDelay",void 0);H([b({type:Number})],O.prototype,"secondDelay",void 0);H([b({type:Number})],O.prototype,"thirdDelay",void 0);H([b({type:Number})],O.prototype,"expandedDuration",void 0);H([b({type:String})],O.prototype,"onlineText",void 0);H([b({type:String})],O.prototype,"offlineText",void 0);H([b({type:String})],O.prototype,"reconnectingText",void 0);H([b({type:Boolean,reflect:!0})],O.prototype,"offline",void 0);H([b({type:Boolean,reflect:!0})],O.prototype,"reconnecting",void 0);H([b({type:Boolean,reflect:!0})],O.prototype,"expanded",void 0);H([b({type:Boolean,reflect:!0})],O.prototype,"loading",void 0);H([b({type:String})],O.prototype,"loadingBarState",void 0);H([b({type:Boolean})],O.prototype,"applyDefaultTheme",null);customElements.get("vaadin-connection-indicator")===void 0&&customElements.define("vaadin-connection-indicator",O);O.instance;var ui;const kt=window;kt.Vaadin||(kt.Vaadin={});(ui=kt.Vaadin).registrations||(ui.registrations=[]);kt.Vaadin.registrations.push({is:"@vaadin/common-frontend",version:"0.0.18"});class pi extends Error{}const Fe=window.document.body,C=window;class Qs{constructor(e){this.response=void 0,this.pathname="",this.isActive=!1,this.baseRegex=/^\//,this.navigation="",Fe.$=Fe.$||[],this.config=e||{},C.Vaadin=C.Vaadin||{},C.Vaadin.Flow=C.Vaadin.Flow||{},C.Vaadin.Flow.clients={TypeScript:{isActive:()=>this.isActive}};const o=document.head.querySelector("base");this.baseRegex=new RegExp(`^${(document.baseURI||o&&o.href||"/").replace(/^https?:\/\/[^/]+/i,"")}`),this.appShellTitle=document.title,this.addConnectionIndicator()}get serverSideRoutes(){return[{path:"(.*)",action:this.action}]}loadingStarted(){this.isActive=!0,C.Vaadin.connectionState.loadingStarted()}loadingFinished(){this.isActive=!1,C.Vaadin.connectionState.loadingFinished(),!C.Vaadin.listener&&(C.Vaadin.listener={},document.addEventListener("click",e=>{e.target&&(e.target.hasAttribute("router-link")?this.navigation="link":e.composedPath().some(o=>o.nodeName==="A")&&(this.navigation="client"))},{capture:!0}))}get action(){return async e=>{if(this.pathname=e.pathname,C.Vaadin.connectionState.online)try{await this.flowInit()}catch(o){if(o instanceof pi)return C.Vaadin.connectionState.state=A.CONNECTION_LOST,this.offlineStubAction();throw o}else return this.offlineStubAction();return this.container.onBeforeEnter=(o,i)=>this.flowNavigate(o,i),this.container.onBeforeLeave=(o,i)=>this.flowLeave(o,i),this.container}}async flowLeave(e,o){const{connectionState:i}=C.Vaadin;return this.pathname===e.pathname||!this.isFlowClientLoaded()||i.offline?Promise.resolve({}):new Promise(n=>{this.loadingStarted(),this.container.serverConnected=s=>{n(o&&s?o.prevent():{}),this.loadingFinished()},Fe.$server.leaveNavigation(this.getFlowRoutePath(e),this.getFlowRouteQuery(e))})}async flowNavigate(e,o){return this.response?new Promise(i=>{this.loadingStarted(),this.container.serverConnected=(n,s)=>{o&&n?i(o.prevent()):o&&o.redirect&&s?i(o.redirect(s.pathname)):(this.container.style.display="",i(this.container)),this.loadingFinished()},this.container.serverPaused=()=>{this.loadingFinished()},Fe.$server.connectClient(this.getFlowRoutePath(e),this.getFlowRouteQuery(e),this.appShellTitle,history.state,this.navigation),this.navigation="history"}):Promise.resolve(this.container)}getFlowRoutePath(e){return decodeURIComponent(e.pathname).replace(this.baseRegex,"")}getFlowRouteQuery(e){return e.search&&e.search.substring(1)||""}async flowInit(){if(!this.isFlowClientLoaded()){this.loadingStarted(),this.response=await this.flowInitUi();const{pushScript:e,appConfig:o}=this.response;typeof e=="string"&&await this.loadScript(e);const{appId:i}=o;await(await g(()=>import("./FlowBootstrap-CHUuW4WK.js"),__vite__mapDeps([]),import.meta.url)).init(this.response),typeof this.config.imports=="function"&&(this.injectAppIdScript(i),await this.config.imports());const s=`flow-container-${i.toLowerCase()}`,r=document.querySelector(s);r?this.container=r:(this.container=document.createElement(s),this.container.id=i),Fe.$[i]=this.container;const l=await g(()=>import("./FlowClient-BZ2ixoyw.js"),__vite__mapDeps([]),import.meta.url);await this.flowInitClient(l),this.loadingFinished()}return this.container&&!this.container.isConnected&&(this.container.style.display="none",document.body.appendChild(this.container)),this.response}async loadScript(e){return new Promise((o,i)=>{const n=document.createElement("script");n.onload=()=>o(),n.onerror=i,n.src=e,document.body.appendChild(n)})}injectAppIdScript(e){const o=e.substring(0,e.lastIndexOf("-")),i=document.createElement("script");i.type="module",i.setAttribute("data-app-id",o),document.body.append(i)}async flowInitClient(e){return e.init(),new Promise(o=>{const i=setInterval(()=>{Object.keys(C.Vaadin.Flow.clients).filter(s=>s!=="TypeScript").reduce((s,r)=>s||C.Vaadin.Flow.clients[r].isActive(),!1)||(clearInterval(i),o())},5)})}async flowInitUi(){const e=C.Vaadin&&C.Vaadin.TypeScript&&C.Vaadin.TypeScript.initial;return e?(C.Vaadin.TypeScript.initial=void 0,Promise.resolve(e)):new Promise((o,i)=>{const s=new XMLHttpRequest,r=`?v-r=init&location=${encodeURIComponent(this.getFlowRoutePath(location))}&query=${encodeURIComponent(this.getFlowRouteQuery(location))}`;s.open("GET",r),s.onerror=()=>i(new pi(`Invalid server response when initializing Flow UI.
        ${s.status}
        ${s.responseText}`)),s.onload=()=>{const l=s.getResponseHeader("content-type");l&&l.indexOf("application/json")!==-1?o(JSON.parse(s.responseText)):s.onerror()},s.send()})}addConnectionIndicator(){O.create(),C.addEventListener("online",()=>{if(!this.isFlowClientLoaded()){C.Vaadin.connectionState.state=A.RECONNECTING;const e=new XMLHttpRequest;e.open("HEAD","sw.js"),e.onload=()=>{C.Vaadin.connectionState.state=A.CONNECTED},e.onerror=()=>{C.Vaadin.connectionState.state=A.CONNECTION_LOST},setTimeout(()=>e.send(),50)}}),C.addEventListener("offline",()=>{this.isFlowClientLoaded()||(C.Vaadin.connectionState.state=A.CONNECTION_LOST)})}async offlineStubAction(){const e=document.createElement("iframe");e.setAttribute("src","./offline-stub.html"),e.setAttribute("style","width: 100%; height: 100%; border: 0"),this.response=void 0;let i;const n=()=>{i!==void 0&&(C.Vaadin.connectionState.removeStateChangeListener(i),i=void 0)};return e.onBeforeEnter=(s,r,l)=>{i=()=>{C.Vaadin.connectionState.online&&(n(),l.render(s,!1))},C.Vaadin.connectionState.addStateChangeListener(i)},e.onBeforeLeave=(s,r,l)=>{n()},e}isFlowClientLoaded(){return this.response!==void 0}}const{serverSideRoutes:Zs}=new Qs({imports:()=>g(()=>import("./generated-flow-imports-BRjZLFHq.js"),__vite__mapDeps([]),import.meta.url)}),er=[...Zs],tr=new pe(document.querySelector("#outlet"));tr.setRoutes(er);(function(){if(typeof document>"u"||"adoptedStyleSheets"in document)return;var t="ShadyCSS"in window&&!ShadyCSS.nativeShadow,e=document.implementation.createHTMLDocument(""),o=new WeakMap,i=typeof DOMException=="object"?Error:DOMException,n=Object.defineProperty,s=Array.prototype.forEach,r=/@import.+?;?$/gm;function l(c){var m=c.replace(r,"");return m!==c&&console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"),m.trim()}function a(c){return"isConnected"in c?c.isConnected:document.contains(c)}function d(c){return c.filter(function(m,w){return c.indexOf(m)===w})}function h(c,m){return c.filter(function(w){return m.indexOf(w)===-1})}function p(c){c.parentNode.removeChild(c)}function u(c){return c.shadowRoot||o.get(c)}var _=["addRule","deleteRule","insertRule","removeRule"],se=CSSStyleSheet,G=se.prototype;G.replace=function(){return Promise.reject(new i("Can't call replace on non-constructed CSSStyleSheets."))},G.replaceSync=function(){throw new i("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")};function ot(c){return typeof c=="object"?ke.isPrototypeOf(c)||G.isPrototypeOf(c):!1}function zt(c){return typeof c=="object"?G.isPrototypeOf(c):!1}var W=new WeakMap,ie=new WeakMap,Ce=new WeakMap,Te=new WeakMap;function jt(c,m){var w=document.createElement("style");return Ce.get(c).set(m,w),ie.get(c).push(m),w}function re(c,m){return Ce.get(c).get(m)}function it(c,m){Ce.get(c).delete(m),ie.set(c,ie.get(c).filter(function(w){return w!==m}))}function Ro(c,m){requestAnimationFrame(function(){m.textContent=W.get(c).textContent,Te.get(c).forEach(function(w){return m.sheet[w.method].apply(m.sheet,w.args)})})}function nt(c){if(!W.has(c))throw new TypeError("Illegal invocation")}function Ft(){var c=this,m=document.createElement("style");e.body.appendChild(m),W.set(c,m),ie.set(c,[]),Ce.set(c,new WeakMap),Te.set(c,[])}var ke=Ft.prototype;ke.replace=function(m){try{return this.replaceSync(m),Promise.resolve(this)}catch(w){return Promise.reject(w)}},ke.replaceSync=function(m){if(nt(this),typeof m=="string"){var w=this;W.get(w).textContent=l(m),Te.set(w,[]),ie.get(w).forEach(function(z){z.isConnected()&&Ro(w,re(w,z))})}},n(ke,"cssRules",{configurable:!0,enumerable:!0,get:function(){return nt(this),W.get(this).sheet.cssRules}}),n(ke,"media",{configurable:!0,enumerable:!0,get:function(){return nt(this),W.get(this).sheet.media}}),_.forEach(function(c){ke[c]=function(){var m=this;nt(m);var w=arguments;Te.get(m).push({method:c,args:w}),ie.get(m).forEach(function(B){if(B.isConnected()){var L=re(m,B).sheet;L[c].apply(L,w)}});var z=W.get(m).sheet;return z[c].apply(z,w)}}),n(Ft,Symbol.hasInstance,{configurable:!0,value:ot});var No={childList:!0,subtree:!0},Io=new WeakMap;function $e(c){var m=Io.get(c);return m||(m=new Lo(c),Io.set(c,m)),m}function Po(c){n(c.prototype,"adoptedStyleSheets",{configurable:!0,enumerable:!0,get:function(){return $e(this).sheets},set:function(m){$e(this).update(m)}})}function Bt(c,m){for(var w=document.createNodeIterator(c,NodeFilter.SHOW_ELEMENT,function(B){return u(B)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT},null,!1),z=void 0;z=w.nextNode();)m(u(z))}var st=new WeakMap,Ae=new WeakMap,rt=new WeakMap;function wn(c,m){return m instanceof HTMLStyleElement&&Ae.get(c).some(function(w){return re(w,c)})}function Oo(c){var m=st.get(c);return m instanceof Document?m.body:m}function Ht(c){var m=document.createDocumentFragment(),w=Ae.get(c),z=rt.get(c),B=Oo(c);z.disconnect(),w.forEach(function(L){m.appendChild(re(L,c)||jt(L,c))}),B.insertBefore(m,null),z.observe(B,No),w.forEach(function(L){Ro(L,re(L,c))})}function Lo(c){var m=this;m.sheets=[],st.set(m,c),Ae.set(m,[]),rt.set(m,new MutationObserver(function(w,z){if(!document){z.disconnect();return}w.forEach(function(B){t||s.call(B.addedNodes,function(L){L instanceof Element&&Bt(L,function(Re){$e(Re).connect()})}),s.call(B.removedNodes,function(L){L instanceof Element&&(wn(m,L)&&Ht(m),t||Bt(L,function(Re){$e(Re).disconnect()}))})})}))}if(Lo.prototype={isConnected:function(){var c=st.get(this);return c instanceof Document?c.readyState!=="loading":a(c.host)},connect:function(){var c=Oo(this);rt.get(this).observe(c,No),Ae.get(this).length>0&&Ht(this),Bt(c,function(m){$e(m).connect()})},disconnect:function(){rt.get(this).disconnect()},update:function(c){var m=this,w=st.get(m)===document?"Document":"ShadowRoot";if(!Array.isArray(c))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+w+": Iterator getter is not callable.");if(!c.every(ot))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+w+": Failed to convert value to 'CSSStyleSheet'");if(c.some(zt))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+w+": Can't adopt non-constructed stylesheets");m.sheets=c;var z=Ae.get(m),B=d(c),L=h(z,B);L.forEach(function(Re){p(re(Re,m)),it(Re,m)}),Ae.set(m,B),m.isConnected()&&B.length>0&&Ht(m)}},window.CSSStyleSheet=Ft,Po(Document),"ShadowRoot"in window){Po(ShadowRoot);var Mo=Element.prototype,En=Mo.attachShadow;Mo.attachShadow=function(m){var w=En.call(this,m);return m.mode==="closed"&&o.set(this,w),w}}var at=$e(document);at.isConnected()?at.connect():document.addEventListener("DOMContentLoaded",at.connect.bind(at))})();/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const hn=Symbol.for(""),or=t=>{if((t==null?void 0:t.r)===hn)return t==null?void 0:t._$litStatic$},ir=t=>{if(t._$litStatic$!==void 0)return t._$litStatic$;throw new Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)},ct=(t,...e)=>({_$litStatic$:e.reduce((o,i,n)=>o+ir(i)+t[n+1],t[0]),r:hn}),mi=new Map,nr=t=>(e,...o)=>{const i=o.length;let n,s;const r=[],l=[];let a=0,d=!1,h;for(;a<i;){for(h=e[a];a<i&&(s=o[a],(n=or(s))!==void 0);)h+=n+e[++a],d=!0;a!==i&&l.push(s),r.push(h),a++}if(a===i&&r.push(e[i]),d){const p=r.join("$$lit$$");e=mi.get(p),e===void 0&&(r.raw=r,mi.set(p,e=r)),o=l}return t(e,...o)},sr=nr(y),rr="modulepreload",ar=function(t){return"/"+t},vi={},f=function(t,e,o){return!e||e.length===0?t():(document.getElementsByTagName("link"),Promise.all(e.map(i=>{if(i=ar(i),i in vi)return;vi[i]=!0;const n=i.endsWith(".css"),s=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${s}`))return;const r=document.createElement("link");if(r.rel=n?"stylesheet":rr,n||(r.as="script",r.crossOrigin=""),r.href=i,document.head.appendChild(r),n)return new Promise((l,a)=>{r.addEventListener("load",l),r.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>t()).catch(i=>{const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=i,window.dispatchEvent(n),!n.defaultPrevented)throw i}))};function v(t,e,o,i){var n=arguments.length,s=n<3?e:i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(t,e,o,i);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(s=(n<3?r(s):n>3?r(e,o,s):r(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s}const xo=1e3,Co=(t,e)=>{const o=Array.from(t.querySelectorAll(e.join(", "))),i=Array.from(t.querySelectorAll("*")).filter(n=>n.shadowRoot).flatMap(n=>Co(n.shadowRoot,e));return[...o,...i]};let fi=!1;const Ye=(t,e)=>{fi||(window.addEventListener("message",n=>{n.data==="validate-license"&&window.location.reload()},!1),fi=!0);const o=t._overlayElement;if(o){if(o.shadowRoot){const n=o.shadowRoot.querySelector("slot:not([name])");if(n&&n.assignedElements().length>0){Ye(n.assignedElements()[0],e);return}}Ye(o,e);return}const i=e.messageHtml?e.messageHtml:`${e.message} <p>Component: ${e.product.name} ${e.product.version}</p>`.replace(/https:([^ ]*)/g,"<a href='https:$1'>https:$1</a>");t.isConnected&&(t.outerHTML=`<no-license style="display:flex;align-items:center;text-align:center;justify-content:center;"><div>${i}</div></no-license>`)},He={},gi={},Me={},un={},ne=t=>`${t.name}_${t.version}`,yi=t=>{const{cvdlName:e,version:o}=t.constructor,i={name:e,version:o},n=t.tagName.toLowerCase();He[e]=He[e]??[],He[e].push(n);const s=Me[ne(i)];s&&setTimeout(()=>Ye(t,s),xo),Me[ne(i)]||un[ne(i)]||gi[ne(i)]||(gi[ne(i)]=!0,window.Vaadin.devTools.checkLicense(i))},lr=t=>{un[ne(t)]=!0,console.debug("License check ok for",t)},pn=t=>{const e=t.product.name;Me[ne(t.product)]=t,console.error("License check failed for",e);const o=He[e];(o==null?void 0:o.length)>0&&Co(document,o).forEach(i=>{setTimeout(()=>Ye(i,Me[ne(t.product)]),xo)})},dr=t=>{const e=t.message,o=t.product.name;t.messageHtml=`No license found. <a target=_blank onclick="javascript:window.open(this.href);return false;" href="${e}">Go here to start a trial or retrieve your license.</a>`,Me[ne(t.product)]=t,console.error("No license found when checking",o);const i=He[o];(i==null?void 0:i.length)>0&&Co(document,i).forEach(n=>{setTimeout(()=>Ye(n,Me[ne(t.product)]),xo)})},cr=t=>t.command==="license-check-ok"?(lr(t.data),!0):t.command==="license-check-failed"?(pn(t.data),!0):t.command==="license-check-nokey"?(dr(t.data),!0):!1,hr=()=>{window.Vaadin.devTools.createdCvdlElements.forEach(t=>{yi(t)}),window.Vaadin.devTools.createdCvdlElements={push:t=>{yi(t)}}};function ur(t){var e;const o=[];for(;t&&t.parentNode;){const i=ho(t);if(i.nodeId!==-1){if((e=i.element)!=null&&e.tagName.startsWith("FLOW-CONTAINER-"))break;o.push(i)}t=t.parentElement?t.parentElement:t.parentNode.host}return o.reverse()}function ho(t){const e=window.Vaadin;if(e&&e.Flow){const{clients:o}=e.Flow,i=Object.keys(o);for(const n of i){const s=o[n];if(s.getNodeId){const r=s.getNodeId(t);if(r>=0)return{nodeId:r,uiId:s.getUIId(),element:t}}}}return{nodeId:-1,uiId:-1,element:void 0}}function pr(t,e){if(t.contains(e))return!0;let o=e;const i=e.ownerDocument;for(;o&&o!==i&&o!==t;)o=o.parentNode||(o instanceof ShadowRoot?o.host:null);return o===t}var S;(function(t){t.ACTIVE="active",t.INACTIVE="inactive",t.UNAVAILABLE="unavailable",t.ERROR="error"})(S||(S={}));class $t{constructor(){this.status=S.UNAVAILABLE}onHandshake(){}onConnectionError(e){}onStatusChange(e){}setActive(e){!e&&this.status===S.ACTIVE?this.setStatus(S.INACTIVE):e&&this.status===S.INACTIVE&&this.setStatus(S.ACTIVE)}setStatus(e){this.status!==e&&(this.status=e,this.onStatusChange(e))}}$t.HEARTBEAT_INTERVAL=18e4;class mr extends $t{constructor(e){super(),this.webSocket=new WebSocket(e),this.webSocket.onmessage=o=>this.handleMessage(o),this.webSocket.onerror=o=>this.handleError(o),this.webSocket.onclose=o=>{this.status!==S.ERROR&&this.setStatus(S.UNAVAILABLE),this.webSocket=void 0},setInterval(()=>{this.webSocket&&self.status!==S.ERROR&&this.status!==S.UNAVAILABLE&&this.webSocket.send("")},$t.HEARTBEAT_INTERVAL)}onReload(){}handleMessage(e){let o;try{o=JSON.parse(e.data)}catch(i){this.handleError(`[${i.name}: ${i.message}`);return}o.command==="hello"?(this.setStatus(S.ACTIVE),this.onHandshake()):o.command==="reload"?this.status===S.ACTIVE&&this.onReload():this.handleError(`Unknown message from the livereload server: ${e}`)}handleError(e){console.error(e),this.setStatus(S.ERROR),e instanceof Event&&this.webSocket?this.onConnectionError(`Error in WebSocket connection to ${this.webSocket.url}`):this.onConnectionError(e)}}const mn=$`
  .popup {
    width: auto;
    position: fixed;
    background-color: var(--dev-tools-background-color-active-blurred);
    color: var(--dev-tools-text-color-primary);
    padding: 0.1875rem 0.75rem 0.1875rem 1rem;
    background-clip: padding-box;
    border-radius: var(--dev-tools-border-radius);
    overflow: hidden;
    margin: 0.5rem;
    width: 30rem;
    max-width: calc(100% - 1rem);
    max-height: calc(100vh - 1rem);
    flex-shrink: 1;
    background-color: var(--dev-tools-background-color-active);
    color: var(--dev-tools-text-color);
    transition: var(--dev-tools-transition-duration);
    transform-origin: bottom right;
    display: flex;
    flex-direction: column;
    box-shadow: var(--dev-tools-box-shadow);
    outline: none;
  }
`,vr=(t,e)=>{const o=t[e];return o?typeof o=="function"?o():Promise.resolve(o):new Promise((i,n)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+e)))})};var R;(function(t){t.text="text",t.checkbox="checkbox",t.range="range",t.color="color"})(R||(R={}));const oe={lumoSize:["--lumo-size-xs","--lumo-size-s","--lumo-size-m","--lumo-size-l","--lumo-size-xl"],lumoSpace:["--lumo-space-xs","--lumo-space-s","--lumo-space-m","--lumo-space-l","--lumo-space-xl"],lumoBorderRadius:["0","--lumo-border-radius-m","--lumo-border-radius-l"],lumoFontSize:["--lumo-font-size-xxs","--lumo-font-size-xs","--lumo-font-size-s","--lumo-font-size-m","--lumo-font-size-l","--lumo-font-size-xl","--lumo-font-size-xxl","--lumo-font-size-xxxl"],lumoTextColor:["--lumo-header-text-color","--lumo-body-text-color","--lumo-secondary-text-color","--lumo-tertiary-text-color","--lumo-disabled-text-color","--lumo-primary-text-color","--lumo-error-text-color","--lumo-success-text-color"],basicBorderSize:["0px","1px","2px","3px"]},fr=Object.freeze(Object.defineProperty({__proto__:null,presets:oe},Symbol.toStringTag,{value:"Module"})),le={textColor:{propertyName:"color",displayName:"Text color",editorType:R.color,presets:oe.lumoTextColor},fontSize:{propertyName:"font-size",displayName:"Font size",editorType:R.range,presets:oe.lumoFontSize,icon:"font"},fontWeight:{propertyName:"font-weight",displayName:"Bold",editorType:R.checkbox,checkedValue:"bold"},fontStyle:{propertyName:"font-style",displayName:"Italic",editorType:R.checkbox,checkedValue:"italic"}},ee={backgroundColor:{propertyName:"background-color",displayName:"Background color",editorType:R.color},borderColor:{propertyName:"border-color",displayName:"Border color",editorType:R.color},borderWidth:{propertyName:"border-width",displayName:"Border width",editorType:R.range,presets:oe.basicBorderSize,icon:"square"},borderRadius:{propertyName:"border-radius",displayName:"Border radius",editorType:R.range,presets:oe.lumoBorderRadius,icon:"square"},padding:{propertyName:"padding",displayName:"Padding",editorType:R.range,presets:oe.lumoSpace,icon:"square"},gap:{propertyName:"gap",displayName:"Spacing",editorType:R.range,presets:oe.lumoSpace,icon:"square"}},gr={height:{propertyName:"height",displayName:"Size",editorType:R.range,presets:oe.lumoSize,icon:"square"},paddingInline:{propertyName:"padding-inline",displayName:"Padding",editorType:R.range,presets:oe.lumoSpace,icon:"square"}},uo={iconColor:{propertyName:"color",displayName:"Icon color",editorType:R.color,presets:oe.lumoTextColor},iconSize:{propertyName:"font-size",displayName:"Icon size",editorType:R.range,presets:oe.lumoFontSize,icon:"font"}},yr=[ee.backgroundColor,ee.borderColor,ee.borderWidth,ee.borderRadius,ee.padding],_r=[le.textColor,le.fontSize,le.fontWeight,le.fontStyle],br=[uo.iconColor,uo.iconSize],wr=Object.freeze(Object.defineProperty({__proto__:null,fieldProperties:gr,iconProperties:uo,shapeProperties:ee,standardIconProperties:br,standardShapeProperties:yr,standardTextProperties:_r,textProperties:le},Symbol.toStringTag,{value:"Module"}));function vn(t){const e=t.charAt(0).toUpperCase()+t.slice(1);return{tagName:t,displayName:e,elements:[{selector:t,displayName:"Element",properties:[ee.backgroundColor,ee.borderColor,ee.borderWidth,ee.borderRadius,ee.padding,le.textColor,le.fontSize,le.fontWeight,le.fontStyle]}]}}const Er=Object.freeze(Object.defineProperty({__proto__:null,createGenericMetadata:vn},Symbol.toStringTag,{value:"Module"})),Sr=t=>vr(Object.assign({"./components/defaults.ts":()=>f(()=>Promise.resolve().then(()=>wr),void 0),"./components/generic.ts":()=>f(()=>Promise.resolve().then(()=>Er),void 0),"./components/presets.ts":()=>f(()=>Promise.resolve().then(()=>fr),void 0),"./components/vaadin-accordion-heading.ts":()=>f(()=>g(()=>import("./vaadin-accordion-heading-c0acdd6d-Dg6fE-qT.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-accordion-panel.ts":()=>f(()=>g(()=>import("./vaadin-accordion-panel-616e55d6-D4XGNDcQ.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-accordion.ts":()=>f(()=>g(()=>import("./vaadin-accordion-eed3b794-zTe9Iobv.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-app-layout.ts":()=>f(()=>g(()=>import("./vaadin-app-layout-e56de2e9-nGH1Pmz-.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-avatar.ts":()=>f(()=>g(()=>import("./vaadin-avatar-7599297d-Cy-CiH16.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-big-decimal-field.ts":()=>f(()=>g(()=>import("./vaadin-big-decimal-field-e51def24-a2hLWxUU.js"),__vite__mapDeps([0,1,2]),import.meta.url),["assets/vaadin-big-decimal-field-e51def24.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-board-row.ts":()=>f(()=>g(()=>import("./vaadin-board-row-c70d0c55-DOPtw-IZ.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-board.ts":()=>f(()=>g(()=>import("./vaadin-board-828ebdea-YS0_pzOh.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-button.ts":()=>f(()=>g(()=>import("./vaadin-button-2511ad84-D_5gLsoS.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-chart.ts":()=>f(()=>g(()=>import("./vaadin-chart-5192dc15-CHf_FGYI.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-checkbox-group.ts":()=>f(()=>g(()=>import("./vaadin-checkbox-group-a7c65bf2-BixjaPgu.js"),__vite__mapDeps([3,1,4]),import.meta.url),["assets/vaadin-checkbox-group-a7c65bf2.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-checkbox-4e68df64.js"]),"./components/vaadin-checkbox.ts":()=>f(()=>g(()=>import("./vaadin-checkbox-4e68df64-kW5P85a1.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-combo-box.ts":()=>f(()=>g(()=>import("./vaadin-combo-box-96451ddd-DHuISLlQ.js"),__vite__mapDeps([5,1]),import.meta.url),["assets/vaadin-combo-box-96451ddd.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-confirm-dialog.ts":()=>f(()=>g(()=>import("./vaadin-confirm-dialog-4d718829-BSl_lcHn.js"),__vite__mapDeps([6,2]),import.meta.url),["assets/vaadin-confirm-dialog-4d718829.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-cookie-consent.ts":()=>f(()=>g(()=>import("./vaadin-cookie-consent-46c09f8b-gLuWKhYA.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-crud.ts":()=>f(()=>g(()=>import("./vaadin-crud-8d161a22-DgdVqfng.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-custom-field.ts":()=>f(()=>g(()=>import("./vaadin-custom-field-42c85b9e-Ce37n7V_.js"),__vite__mapDeps([7,1]),import.meta.url),["assets/vaadin-custom-field-42c85b9e.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-date-picker.ts":()=>f(()=>g(()=>import("./vaadin-date-picker-f2001167-Bnv6NWfk.js"),__vite__mapDeps([8,1]),import.meta.url),["assets/vaadin-date-picker-f2001167.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-date-time-picker.ts":()=>f(()=>g(()=>import("./vaadin-date-time-picker-c8c047a7-CWqMCSWp.js"),__vite__mapDeps([9,1]),import.meta.url),["assets/vaadin-date-time-picker-c8c047a7.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-details-summary.ts":()=>f(()=>g(()=>import("./vaadin-details-summary-351a1448-BQN28KCc.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-details.ts":()=>f(()=>g(()=>import("./vaadin-details-bf336660-CyPBX5fz.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-dialog.ts":()=>f(()=>g(()=>import("./vaadin-dialog-53253a08-i7YuKWte.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-email-field.ts":()=>f(()=>g(()=>import("./vaadin-email-field-d7a35f04-DkFdXpAE.js"),__vite__mapDeps([10,1,2]),import.meta.url),["assets/vaadin-email-field-d7a35f04.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-form-layout.ts":()=>f(()=>g(()=>import("./vaadin-form-layout-47744b1d-DU7mcyO7.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-grid-pro.ts":()=>f(()=>g(()=>import("./vaadin-grid-pro-ff415555-BE70EpBf.js"),__vite__mapDeps([11,4,12,1]),import.meta.url),["assets/vaadin-grid-pro-ff415555.js","assets/vaadin-checkbox-4e68df64.js","assets/vaadin-grid-0a4791c2.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-grid.ts":()=>f(()=>g(()=>import("./vaadin-grid-0a4791c2-B3d9n2IN.js"),__vite__mapDeps([12,4]),import.meta.url),["assets/vaadin-grid-0a4791c2.js","assets/vaadin-checkbox-4e68df64.js"]),"./components/vaadin-horizontal-layout.ts":()=>f(()=>g(()=>import("./vaadin-horizontal-layout-3193943f-MQ8ok6Tf.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-icon.ts":()=>f(()=>g(()=>import("./vaadin-icon-601f36ed-BDsA26NQ.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-integer-field.ts":()=>f(()=>g(()=>import("./vaadin-integer-field-85078932-CFEPSXse.js"),__vite__mapDeps([13,1,2]),import.meta.url),["assets/vaadin-integer-field-85078932.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-list-box.ts":()=>f(()=>g(()=>import("./vaadin-list-box-d7a8433b-CQkMgmCl.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-login-form.ts":()=>f(()=>g(()=>import("./vaadin-login-form-638996c6-qvIm4Wgb.js"),__vite__mapDeps([14,1,2]),import.meta.url),["assets/vaadin-login-form-638996c6.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-login-overlay.ts":()=>f(()=>g(()=>import("./vaadin-login-overlay-f8a5db8a-B4yUEIGb.js"),__vite__mapDeps([15,1,2]),import.meta.url),["assets/vaadin-login-overlay-f8a5db8a.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-map.ts":()=>f(()=>g(()=>import("./vaadin-map-d40a0116-B1-i-gx2.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-menu-bar.ts":()=>f(()=>g(()=>import("./vaadin-menu-bar-3f5ab096-Y1OcFzBj.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-message-input.ts":()=>f(()=>g(()=>import("./vaadin-message-input-996ac37c-Cq9S8lsK.js"),__vite__mapDeps([16,1]),import.meta.url),["assets/vaadin-message-input-996ac37c.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-message-list.ts":()=>f(()=>g(()=>import("./vaadin-message-list-70a435ba-DgqyFZ04.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-multi-select-combo-box.ts":()=>f(()=>g(()=>import("./vaadin-multi-select-combo-box-a3373557-DUJDloeC.js"),__vite__mapDeps([17,1]),import.meta.url),["assets/vaadin-multi-select-combo-box-a3373557.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-notification.ts":()=>f(()=>g(()=>import("./vaadin-notification-bd6eb776-BmuRIGwa.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-number-field.ts":()=>f(()=>g(()=>import("./vaadin-number-field-cb3ee8b2-LXc_yfKO.js"),__vite__mapDeps([18,1,2]),import.meta.url),["assets/vaadin-number-field-cb3ee8b2.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-password-field.ts":()=>f(()=>g(()=>import("./vaadin-password-field-d289cb18-BHUSXyTj.js"),__vite__mapDeps([19,1,2]),import.meta.url),["assets/vaadin-password-field-d289cb18.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-progress-bar.ts":()=>f(()=>g(()=>import("./vaadin-progress-bar-309ecf1f-Qx2t9CG1.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-radio-group.ts":()=>f(()=>g(()=>import("./vaadin-radio-group-88b5afd8-DHytIEgo.js"),__vite__mapDeps([20,1]),import.meta.url),["assets/vaadin-radio-group-88b5afd8.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-rich-text-editor.ts":()=>f(()=>g(()=>import("./vaadin-rich-text-editor-8cd892f2-Ce6dNjTN.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-scroller.ts":()=>f(()=>g(()=>import("./vaadin-scroller-35e68818-DoSQ8F0x.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-select.ts":()=>f(()=>g(()=>import("./vaadin-select-df6e9947-BW5QoWz2.js"),__vite__mapDeps([21,1]),import.meta.url),["assets/vaadin-select-df6e9947.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-side-nav-item.ts":()=>f(()=>g(()=>import("./vaadin-side-nav-item-34918f92-72c-ZGIl.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-side-nav.ts":()=>f(()=>g(()=>import("./vaadin-side-nav-ba80d91d-C9aU-y9K.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-split-layout.ts":()=>f(()=>g(()=>import("./vaadin-split-layout-80c92131-DQfTQIPs.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-spreadsheet.ts":()=>f(()=>g(()=>import("./vaadin-spreadsheet-59d8c5ef-DTcOJOjE.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-tab.ts":()=>f(()=>g(()=>import("./vaadin-tab-aaf32809-BhKKkZHu.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-tabs.ts":()=>f(()=>g(()=>import("./vaadin-tabs-d9a5e24e-C2otlbWU.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-tabsheet.ts":()=>f(()=>g(()=>import("./vaadin-tabsheet-dd99ed9a-CgpWeUS-.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-text-area.ts":()=>f(()=>g(()=>import("./vaadin-text-area-83627ebc-DMAjhtgY.js"),__vite__mapDeps([22,1,2]),import.meta.url),["assets/vaadin-text-area-83627ebc.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-text-field.ts":()=>f(()=>g(()=>import("./vaadin-text-field-0b3db014-DiAt2klQ.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-time-picker.ts":()=>f(()=>g(()=>import("./vaadin-time-picker-715ec415-DIGsQ2bd.js"),__vite__mapDeps([23,1]),import.meta.url),["assets/vaadin-time-picker-715ec415.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-upload.ts":()=>f(()=>g(()=>import("./vaadin-upload-d3c162ed-B-IwuX3Z.js"),__vite__mapDeps([24,2]),import.meta.url),["assets/vaadin-upload-d3c162ed.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-vertical-layout.ts":()=>f(()=>g(()=>import("./vaadin-vertical-layout-ad4174c4-AT0LdTfG.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-virtual-list.ts":()=>f(()=>g(()=>import("./vaadin-virtual-list-96896203-B-Qcqstl.js"),__vite__mapDeps([]),import.meta.url),[])}),`./components/${t}.ts`);class xr{constructor(e=Sr){this.loader=e,this.metadata={}}async getMetadata(e){var o;const i=(o=e.element)==null?void 0:o.localName;if(!i)return null;if(!i.startsWith("vaadin-"))return vn(i);let n=this.metadata[i];if(n)return n;try{n=(await this.loader(i)).default,this.metadata[i]=n}catch{console.warn(`Failed to load metadata for component: ${i}`)}return n||null}}const Cr=new xr,yt={crosshair:Ne`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
   <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
   <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
   <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
   <path d="M9 12l6 0"></path>
   <path d="M12 9l0 6"></path>
</svg>`,square:Ne`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
</svg>`,font:Ne`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 20l3 0"></path>
   <path d="M14 20l7 0"></path>
   <path d="M6.9 15l6.9 0"></path>
   <path d="M10.2 6.3l5.8 13.7"></path>
   <path d="M5 20l6 -16l2 0l7 16"></path>
</svg>`,undo:Ne`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1"></path>
</svg>`,redo:Ne`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M15 13l4 -4l-4 -4m4 4h-11a4 4 0 0 0 0 8h1"></path>
</svg>`,cross:Ne`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M18 6l-12 12"></path>
   <path d="M6 6l12 12"></path>
</svg>`};var Ve;(function(t){t.disabled="disabled",t.enabled="enabled",t.missing_theme="missing_theme"})(Ve||(Ve={}));var P;(function(t){t.local="local",t.global="global"})(P||(P={}));function to(t,e){return`${t}|${e}`}class me{constructor(e){this._properties={},this._metadata=e}get metadata(){return this._metadata}get properties(){return Object.values(this._properties)}getPropertyValue(e,o){return this._properties[to(e,o)]||null}updatePropertyValue(e,o,i,n){if(!i){delete this._properties[to(e,o)];return}let s=this.getPropertyValue(e,o);s?(s.value=i,s.modified=n||!1):(s={elementSelector:e,propertyName:o,value:i,modified:n||!1},this._properties[to(e,o)]=s)}addPropertyValues(e){e.forEach(o=>{this.updatePropertyValue(o.elementSelector,o.propertyName,o.value,o.modified)})}getPropertyValuesForElement(e){return this.properties.filter(o=>o.elementSelector===e)}static combine(...e){if(e.length<2)throw new Error("Must provide at least two themes");const o=new me(e[0].metadata);return e.forEach(i=>o.addPropertyValues(i.properties)),o}static fromServerRules(e,o,i){const n=new me(e);return e.elements.forEach(s=>{const r=De(s,o),l=i.find(a=>a.selector===r.replace(/ > /g,">"));l&&s.properties.forEach(a=>{const d=l.properties[a.propertyName];d&&n.updatePropertyValue(s.selector,a.propertyName,d,!0)})}),n}}function De(t,e){const o=t.selector;if(e.themeScope===P.global)return o;if(!e.localClassName)throw new Error("Can not build local scoped selector without instance class name");const i=o.match(/^[\w\d-_]+/),n=i&&i[0];if(!n)throw new Error(`Selector does not start with a tag name: ${o}`);return`${n}.${e.localClassName}${o.substring(n.length,o.length)}`}function Tr(t,e,o,i){const n=De(t,e),s={[o]:i};return o==="border-width"&&(parseInt(i)>0?s["border-style"]="solid":s["border-style"]=""),{selector:n,properties:s}}function kr(t){const e=Object.entries(t.properties).map(([o,i])=>`${o}: ${i};`).join(" ");return`${t.selector} { ${e} }`}let ht,_i="";function To(t){ht||(ht=new CSSStyleSheet,document.adoptedStyleSheets=[...document.adoptedStyleSheets,ht]),_i+=t.cssText,ht.replaceSync(_i)}const fn=$`
  .editor-row {
    display: flex;
    align-items: baseline;
    padding: var(--theme-editor-section-horizontal-padding);
    gap: 10px;
  }

  .editor-row > .label {
    flex: 0 0 auto;
    width: 120px;
  }

  .editor-row > .editor {
    flex: 1 1 0;
  }
`,bi="__vaadin-theme-editor-measure-element",wi=/((::before)|(::after))$/,Ei=/::part\(([\w\d_-]+)\)$/;To($`
  .__vaadin-theme-editor-measure-element {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
  }
`);async function $r(t){const e=new me(t),o=document.createElement(t.tagName);o.classList.add(bi),document.body.append(o),t.setupElement&&await t.setupElement(o);const i={themeScope:P.local,localClassName:bi};try{t.elements.forEach(n=>{Si(o,n,i,!0);let s=De(n,i);const r=s.match(wi);s=s.replace(wi,"");const l=s.match(Ei),a=s.replace(Ei,"");let d=document.querySelector(a);if(d&&l){const u=`[part~="${l[1]}"]`;d=d.shadowRoot.querySelector(u)}if(!d)return;d.style.transition="none";const h=r?r[1]:null,p=getComputedStyle(d,h);n.properties.forEach(u=>{const _=p.getPropertyValue(u.propertyName)||u.defaultValue||"";e.updatePropertyValue(n.selector,u.propertyName,_)}),Si(o,n,i,!1)})}finally{try{t.cleanupElement&&await t.cleanupElement(o)}finally{o.remove()}}return e}function Si(t,e,o,i){if(e.stateAttribute){if(e.stateElementSelector){const n=De({...e,selector:e.stateElementSelector},o);t=document.querySelector(n)}t&&(i?t.setAttribute(e.stateAttribute,""):t.removeAttribute(e.stateAttribute))}}function xi(t){return t.trim()}function Ar(t){const e=t.element;if(!e)return null;const o=e.querySelector("label");if(o&&o.textContent)return xi(o.textContent);const i=e.textContent;return i?xi(i):null}class Rr{constructor(){this._localClassNameMap=new Map}get stylesheet(){return this.ensureStylesheet(),this._stylesheet}add(e){this.ensureStylesheet(),this._stylesheet.replaceSync(e)}clear(){this.ensureStylesheet(),this._stylesheet.replaceSync("")}previewLocalClassName(e,o){if(!e)return;const i=this._localClassNameMap.get(e);i&&(e.classList.remove(i),e.overlayClass=null),o?(e.classList.add(o),e.overlayClass=o,this._localClassNameMap.set(e,o)):this._localClassNameMap.delete(e)}ensureStylesheet(){this._stylesheet||(this._stylesheet=new CSSStyleSheet,this._stylesheet.replaceSync(""),document.adoptedStyleSheets=[...document.adoptedStyleSheets,this._stylesheet])}}const ge=new Rr;var Y;(function(t){t.response="themeEditorResponse",t.loadComponentMetadata="themeEditorComponentMetadata",t.setLocalClassName="themeEditorLocalClassName",t.setCssRules="themeEditorRules",t.loadRules="themeEditorLoadRules",t.history="themeEditorHistory",t.openCss="themeEditorOpenCss",t.markAsUsed="themeEditorMarkAsUsed"})(Y||(Y={}));var po;(function(t){t.ok="ok",t.error="error"})(po||(po={}));class Nr{constructor(e){this.pendingRequests={},this.requestCounter=0,this.wrappedConnection=e;const o=this.wrappedConnection.onMessage;this.wrappedConnection.onMessage=i=>{i.command===Y.response?this.handleResponse(i.data):o.call(this.wrappedConnection,i)}}sendRequest(e,o){const i=(this.requestCounter++).toString(),n=o.uiId??this.getGlobalUiId();return new Promise((s,r)=>{this.wrappedConnection.send(e,{...o,requestId:i,uiId:n}),this.pendingRequests[i]={resolve:s,reject:r}})}handleResponse(e){const o=this.pendingRequests[e.requestId];if(!o){console.warn("Received response for unknown request");return}delete this.pendingRequests[e.requestId],e.code===po.ok?o.resolve(e):o.reject(e)}loadComponentMetadata(e){return this.sendRequest(Y.loadComponentMetadata,{nodeId:e.nodeId})}setLocalClassName(e,o){return this.sendRequest(Y.setLocalClassName,{nodeId:e.nodeId,className:o})}setCssRules(e){return this.sendRequest(Y.setCssRules,{rules:e})}loadRules(e){return this.sendRequest(Y.loadRules,{selectors:e})}markAsUsed(){return this.sendRequest(Y.markAsUsed,{})}undo(e){return this.sendRequest(Y.history,{undo:e})}redo(e){return this.sendRequest(Y.history,{redo:e})}openCss(e){return this.sendRequest(Y.openCss,{selector:e})}getGlobalUiId(){if(this.globalUiId===void 0){const e=window.Vaadin;if(e&&e.Flow){const{clients:o}=e.Flow,i=Object.keys(o);for(const n of i){const s=o[n];if(s.getNodeId){this.globalUiId=s.getUIId();break}}}}return this.globalUiId??-1}}const M={index:-1,entries:[]};class Ir{constructor(e){this.api=e}get allowUndo(){return M.index>=0}get allowRedo(){return M.index<M.entries.length-1}get allowedActions(){return{allowUndo:this.allowUndo,allowRedo:this.allowRedo}}push(e,o,i){const n={requestId:e,execute:o,rollback:i};if(M.index++,M.entries=M.entries.slice(0,M.index),M.entries.push(n),o)try{o()}catch(s){console.error("Execute history entry failed",s)}return this.allowedActions}async undo(){if(!this.allowUndo)return this.allowedActions;const e=M.entries[M.index];M.index--;try{await this.api.undo(e.requestId),e.rollback&&e.rollback()}catch(o){console.error("Undo failed",o)}return this.allowedActions}async redo(){if(!this.allowRedo)return this.allowedActions;M.index++;const e=M.entries[M.index];try{await this.api.redo(e.requestId),e.execute&&e.execute()}catch(o){console.error("Redo failed",o)}return this.allowedActions}static clear(){M.entries=[],M.index=-1}}class Pr extends CustomEvent{constructor(e,o,i){super("theme-property-value-change",{bubbles:!0,composed:!0,detail:{element:e,property:o,value:i}})}}class q extends N{constructor(){super(...arguments),this.value=""}static get styles(){return[fn,$`
        :host {
          display: block;
        }

        .editor-row .label .modified {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: orange;
          border-radius: 3px;
          margin-left: 3px;
        }
      `]}update(e){super.update(e),(e.has("propertyMetadata")||e.has("theme"))&&this.updateValueFromTheme()}render(){var e;return y`
      <div class="editor-row">
        <div class="label">
          ${this.propertyMetadata.displayName}
          ${(e=this.propertyValue)!=null&&e.modified?y`<span class="modified"></span>`:null}
        </div>
        <div class="editor">${this.renderEditor()}</div>
      </div>
    `}updateValueFromTheme(){var e;this.propertyValue=this.theme.getPropertyValue(this.elementMetadata.selector,this.propertyMetadata.propertyName),this.value=((e=this.propertyValue)==null?void 0:e.value)||""}dispatchChange(e){this.dispatchEvent(new Pr(this.elementMetadata,this.propertyMetadata,e))}}v([b({})],q.prototype,"elementMetadata",void 0);v([b({})],q.prototype,"propertyMetadata",void 0);v([b({})],q.prototype,"theme",void 0);v([I()],q.prototype,"propertyValue",void 0);v([I()],q.prototype,"value",void 0);class At{get values(){return this._values}get rawValues(){return this._rawValues}constructor(e){if(this._values=[],this._rawValues={},e){const o=e.propertyName,i=e.presets??[];this._values=(i||[]).map(s=>s.startsWith("--")?`var(${s})`:s);const n=document.createElement("div");n.style.borderStyle="solid",n.style.visibility="hidden",document.body.append(n);try{this._values.forEach(s=>{n.style.setProperty(o,s);const r=getComputedStyle(n);this._rawValues[s]=r.getPropertyValue(o).trim()})}finally{n.remove()}}}tryMapToRawValue(e){return this._rawValues[e]??e}tryMapToPreset(e){return this.findPreset(e)??e}findPreset(e){const o=e&&e.trim();return this.values.find(i=>this._rawValues[i]===o)}}class Ci extends CustomEvent{constructor(e){super("change",{detail:{value:e}})}}let Rt=class extends N{constructor(){super(...arguments),this.value="",this.showClearButton=!1}static get styles(){return $`
      :host {
        display: inline-block;
        width: 100%;
        position: relative;
      }

      input {
        width: 100%;
        box-sizing: border-box;
        padding: 0.25rem 0.375rem;
        color: inherit;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.25rem;
        border: none;
      }

      button {
        display: none;
        position: absolute;
        right: 4px;
        top: 4px;
        padding: 0;
        line-height: 0;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      button svg {
        width: 16px;
        height: 16px;
      }

      button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      :host(.show-clear-button) input {
        padding-right: 20px;
      }

      :host(.show-clear-button) button {
        display: block;
      }
    `}update(t){super.update(t),t.has("showClearButton")&&(this.showClearButton?this.classList.add("show-clear-button"):this.classList.remove("show-clear-button"))}render(){return y`
      <input class="input" .value=${this.value} @change=${this.handleInputChange} />
      <button @click=${this.handleClearClick}>${yt.cross}</button>
    `}handleInputChange(t){const e=t.target;this.dispatchEvent(new Ci(e.value))}handleClearClick(){this.dispatchEvent(new Ci(""))}};v([b({})],Rt.prototype,"value",void 0);v([b({})],Rt.prototype,"showClearButton",void 0);Rt=v([U("vaadin-dev-tools-theme-text-input")],Rt);class Or extends CustomEvent{constructor(e){super("class-name-change",{detail:{value:e}})}}let Xe=class extends N{constructor(){super(...arguments),this.editedClassName="",this.invalid=!1}static get styles(){return[fn,$`
        .editor-row {
          padding-top: 0;
        }

        .editor-row .editor .error {
          display: inline-block;
          color: var(--dev-tools-red-color);
          margin-top: 4px;
        }
      `]}update(t){super.update(t),t.has("className")&&(this.editedClassName=this.className,this.invalid=!1)}render(){return y` <div class="editor-row local-class-name">
      <div class="label">CSS class name</div>
      <div class="editor">
        <vaadin-dev-tools-theme-text-input
          type="text"
          .value=${this.editedClassName}
          @change=${this.handleInputChange}
        ></vaadin-dev-tools-theme-text-input>
        ${this.invalid?y`<br /><span class="error">Please enter a valid CSS class name</span>`:null}
      </div>
    </div>`}handleInputChange(t){this.editedClassName=t.detail.value;const e=/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;this.invalid=!this.editedClassName.match(e),!this.invalid&&this.editedClassName!==this.className&&this.dispatchEvent(new Or(this.editedClassName))}};v([b({})],Xe.prototype,"className",void 0);v([I()],Xe.prototype,"editedClassName",void 0);v([I()],Xe.prototype,"invalid",void 0);Xe=v([U("vaadin-dev-tools-theme-class-name-editor")],Xe);class Lr extends CustomEvent{constructor(e){super("scope-change",{detail:{value:e}})}}To($`
  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] {
    --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
    z-index: 100000 !important;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector']::part(overlay) {
    background: #333;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item {
    color: rgba(255, 255, 255, 0.8);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(content) {
    font-size: 13px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item .title {
    color: rgba(255, 255, 255, 0.95);
    font-weight: bold;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark) {
    margin: 6px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark)::before {
    color: rgba(255, 255, 255, 0.95);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`);let Qe=class extends N{constructor(){super(...arguments),this.value=P.local}static get styles(){return $`
      vaadin-select {
        --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
        width: 100px;
      }

      vaadin-select::part(input-field) {
        background: rgba(0, 0, 0, 0.2);
      }

      vaadin-select vaadin-select-value-button,
      vaadin-select::part(toggle-button) {
        color: var(--dev-tools-text-color);
      }

      vaadin-select:hover vaadin-select-value-button,
      vaadin-select:hover::part(toggle-button) {
        color: var(--dev-tools-text-color-emphasis);
      }

      vaadin-select vaadin-select-item {
        font-size: 13px;
      }
    `}update(t){var e;super.update(t),t.has("metadata")&&((e=this.select)==null||e.requestContentUpdate())}render(){return y` <vaadin-select
      theme="small vaadin-dev-tools-theme-scope-selector"
      .value=${this.value}
      .renderer=${this.selectRenderer.bind(this)}
      @value-changed=${this.handleValueChange}
    ></vaadin-select>`}selectRenderer(t){var e;const o=((e=this.metadata)==null?void 0:e.displayName)||"Component",i=`${o}s`;be(y`
        <vaadin-list-box>
          <vaadin-item value=${P.local} label="Local">
            <span class="title">Local</span>
            <br />
            <span>Edit styles for this ${o}</span>
          </vaadin-item>
          <vaadin-item value=${P.global} label="Global">
            <span class="title">Global</span>
            <br />
            <span>Edit styles for all ${i}</span>
          </vaadin-item>
        </vaadin-list-box>
      `,t)}handleValueChange(t){const e=t.detail.value;e!==this.value&&this.dispatchEvent(new Lr(e))}};v([b({})],Qe.prototype,"value",void 0);v([b({})],Qe.prototype,"metadata",void 0);v([tt("vaadin-select")],Qe.prototype,"select",void 0);Qe=v([U("vaadin-dev-tools-theme-scope-selector")],Qe);let Ti=class extends q{static get styles(){return[q.styles,$`
        .editor-row {
          align-items: center;
        }
      `]}handleInputChange(t){const e=t.target.checked?this.propertyMetadata.checkedValue:"";this.dispatchChange(e||"")}renderEditor(){const t=this.value===this.propertyMetadata.checkedValue;return y` <input type="checkbox" .checked=${t} @change=${this.handleInputChange} /> `}};Ti=v([U("vaadin-dev-tools-theme-checkbox-property-editor")],Ti);let ki=class extends q{handleInputChange(t){this.dispatchChange(t.detail.value)}renderEditor(){var t;return y`
      <vaadin-dev-tools-theme-text-input
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleInputChange}
      ></vaadin-dev-tools-theme-text-input>
    `}};ki=v([U("vaadin-dev-tools-theme-text-property-editor")],ki);let Nt=class extends q{constructor(){super(...arguments),this.selectedPresetIndex=-1,this.presets=new At}static get styles(){return[q.styles,$`
        :host {
          --preset-count: 3;
          --slider-bg: #fff;
          --slider-border: #333;
        }

        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .editor-row .input {
          flex: 0 0 auto;
          width: 80px;
        }

        .slider-wrapper {
          flex: 1 1 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .icon {
          width: 20px;
          height: 20px;
          color: #aaa;
        }

        .icon.prefix > svg {
          transform: scale(0.75);
        }

        .slider {
          flex: 1 1 0;
          -webkit-appearance: none;
          background: linear-gradient(to right, #666, #666 2px, transparent 2px);
          background-size: calc((100% - 13px) / (var(--preset-count) - 1)) 8px;
          background-position: 5px 50%;
          background-repeat: repeat-x;
        }

        .slider::-webkit-slider-runnable-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-moz-range-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .custom-value {
          opacity: 0.5;
        }

        .custom-value:hover,
        .custom-value:focus-within {
          opacity: 1;
        }

        .custom-value:not(:hover, :focus-within) {
          --slider-bg: #333;
          --slider-border: #666;
        }
      `]}update(t){t.has("propertyMetadata")&&(this.presets=new At(this.propertyMetadata)),super.update(t)}renderEditor(){var t;const e={"slider-wrapper":!0,"custom-value":this.selectedPresetIndex<0},o=this.presets.values.length;return y`
      <div class=${So(e)}>
        ${null}
        <input
          type="range"
          class="slider"
          style="--preset-count: ${o}"
          step="1"
          min="0"
          .max=${(o-1).toString()}
          .value=${this.selectedPresetIndex}
          @input=${this.handleSliderInput}
          @change=${this.handleSliderChange}
        />
        ${null}
      </div>
      <vaadin-dev-tools-theme-text-input
        class="input"
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleValueChange}
      ></vaadin-dev-tools-theme-text-input>
    `}handleSliderInput(t){const e=t.target,o=parseInt(e.value),i=this.presets.values[o];this.selectedPresetIndex=o,this.value=this.presets.rawValues[i]}handleSliderChange(){this.dispatchChange(this.value)}handleValueChange(t){this.value=t.detail.value,this.updateSliderValue(),this.dispatchChange(this.value)}dispatchChange(t){const e=this.presets.tryMapToPreset(t);super.dispatchChange(e)}updateValueFromTheme(){var t;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((t=this.propertyValue)==null?void 0:t.value)||""),this.updateSliderValue()}updateSliderValue(){const t=this.presets.findPreset(this.value);this.selectedPresetIndex=t?this.presets.values.indexOf(t):-1}};v([I()],Nt.prototype,"selectedPresetIndex",void 0);v([I()],Nt.prototype,"presets",void 0);Nt=v([U("vaadin-dev-tools-theme-range-property-editor")],Nt);const Ue=(t,e=0,o=1)=>t>o?o:t<e?e:t,F=(t,e=0,o=Math.pow(10,e))=>Math.round(o*t)/o,gn=({h:t,s:e,v:o,a:i})=>{const n=(200-e)*o/100;return{h:F(t),s:F(n>0&&n<200?e*o/100/(n<=100?n:200-n)*100:0),l:F(n/2),a:F(i,2)}},mo=t=>{const{h:e,s:o,l:i}=gn(t);return`hsl(${e}, ${o}%, ${i}%)`},oo=t=>{const{h:e,s:o,l:i,a:n}=gn(t);return`hsla(${e}, ${o}%, ${i}%, ${n})`},Mr=({h:t,s:e,v:o,a:i})=>{t=t/360*6,e=e/100,o=o/100;const n=Math.floor(t),s=o*(1-e),r=o*(1-(t-n)*e),l=o*(1-(1-t+n)*e),a=n%6;return{r:F([o,r,s,s,l,o][a]*255),g:F([l,o,o,r,s,s][a]*255),b:F([s,s,l,o,o,r][a]*255),a:F(i,2)}},Vr=t=>{const{r:e,g:o,b:i,a:n}=Mr(t);return`rgba(${e}, ${o}, ${i}, ${n})`},Dr=t=>{const e=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(t);return e?Ur({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:e[7]===void 0?1:Number(e[7])/(e[8]?100:1)}):{h:0,s:0,v:0,a:1}},Ur=({r:t,g:e,b:o,a:i})=>{const n=Math.max(t,e,o),s=n-Math.min(t,e,o),r=s?n===t?(e-o)/s:n===e?2+(o-t)/s:4+(t-e)/s:0;return{h:F(60*(r<0?r+6:r)),s:F(n?s/n*100:0),v:F(n/255*100),a:i}},zr=(t,e)=>{if(t===e)return!0;for(const o in t)if(t[o]!==e[o])return!1;return!0},jr=(t,e)=>t.replace(/\s/g,"")===e.replace(/\s/g,""),$i={},yn=t=>{let e=$i[t];return e||(e=document.createElement("template"),e.innerHTML=t,$i[t]=e),e},ko=(t,e,o)=>{t.dispatchEvent(new CustomEvent(e,{bubbles:!0,detail:o}))};let Oe=!1;const vo=t=>"touches"in t,Fr=t=>Oe&&!vo(t)?!1:(Oe||(Oe=vo(t)),!0),Ai=(t,e)=>{const o=vo(e)?e.touches[0]:e,i=t.el.getBoundingClientRect();ko(t.el,"move",t.getMove({x:Ue((o.pageX-(i.left+window.pageXOffset))/i.width),y:Ue((o.pageY-(i.top+window.pageYOffset))/i.height)}))},Br=(t,e)=>{const o=e.keyCode;o>40||t.xy&&o<37||o<33||(e.preventDefault(),ko(t.el,"move",t.getMove({x:o===39?.01:o===37?-.01:o===34?.05:o===33?-.05:o===35?1:o===36?-1:0,y:o===40?.01:o===38?-.01:0},!0)))};class $o{constructor(e,o,i,n){const s=yn(`<div role="slider" tabindex="0" part="${o}" ${i}><div part="${o}-pointer"></div></div>`);e.appendChild(s.content.cloneNode(!0));const r=e.querySelector(`[part=${o}]`);r.addEventListener("mousedown",this),r.addEventListener("touchstart",this),r.addEventListener("keydown",this),this.el=r,this.xy=n,this.nodes=[r.firstChild,r]}set dragging(e){const o=e?document.addEventListener:document.removeEventListener;o(Oe?"touchmove":"mousemove",this),o(Oe?"touchend":"mouseup",this)}handleEvent(e){switch(e.type){case"mousedown":case"touchstart":if(e.preventDefault(),!Fr(e)||!Oe&&e.button!=0)return;this.el.focus(),Ai(this,e),this.dragging=!0;break;case"mousemove":case"touchmove":e.preventDefault(),Ai(this,e);break;case"mouseup":case"touchend":this.dragging=!1;break;case"keydown":Br(this,e);break}}style(e){e.forEach((o,i)=>{for(const n in o)this.nodes[i].style.setProperty(n,o[n])})}}class Hr extends $o{constructor(e){super(e,"hue",'aria-label="Hue" aria-valuemin="0" aria-valuemax="360"',!1)}update({h:e}){this.h=e,this.style([{left:`${e/360*100}%`,color:mo({h:e,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuenow",`${F(e)}`)}getMove(e,o){return{h:o?Ue(this.h+e.x*360,0,360):360*e.x}}}class Wr extends $o{constructor(e){super(e,"saturation",'aria-label="Color"',!0)}update(e){this.hsva=e,this.style([{top:`${100-e.v}%`,left:`${e.s}%`,color:mo(e)},{"background-color":mo({h:e.h,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuetext",`Saturation ${F(e.s)}%, Brightness ${F(e.v)}%`)}getMove(e,o){return{s:o?Ue(this.hsva.s+e.x*100,0,100):e.x*100,v:o?Ue(this.hsva.v-e.y*100,0,100):Math.round(100-e.y*100)}}}const qr=':host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none!important}[role=slider]{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;outline:0}[role=slider]:last-child{border-radius:0 0 8px 8px}[part$=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;display:flex;place-content:center center;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part$=pointer]::after{content:"";width:100%;height:100%;border-radius:inherit;background-color:currentColor}[role=slider]:focus [part$=pointer]{transform:translate(-50%,-50%) scale(1.1)}',Gr="[part=hue]{flex:0 0 24px;background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}[part=hue-pointer]{top:50%;z-index:2}",Kr="[part=saturation]{flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=saturation-pointer]{z-index:3}",ut=Symbol("same"),io=Symbol("color"),Ri=Symbol("hsva"),no=Symbol("update"),Ni=Symbol("parts"),It=Symbol("css"),Pt=Symbol("sliders");let Jr=class extends HTMLElement{static get observedAttributes(){return["color"]}get[It](){return[qr,Gr,Kr]}get[Pt](){return[Wr,Hr]}get color(){return this[io]}set color(t){if(!this[ut](t)){const e=this.colorModel.toHsva(t);this[no](e),this[io]=t}}constructor(){super();const t=yn(`<style>${this[It].join("")}</style>`),e=this.attachShadow({mode:"open"});e.appendChild(t.content.cloneNode(!0)),e.addEventListener("move",this),this[Ni]=this[Pt].map(o=>new o(e))}connectedCallback(){if(this.hasOwnProperty("color")){const t=this.color;delete this.color,this.color=t}else this.color||(this.color=this.colorModel.defaultColor)}attributeChangedCallback(t,e,o){const i=this.colorModel.fromAttr(o);this[ut](i)||(this.color=i)}handleEvent(t){const e=this[Ri],o={...e,...t.detail};this[no](o);let i;!zr(o,e)&&!this[ut](i=this.colorModel.fromHsva(o))&&(this[io]=i,ko(this,"color-changed",{value:i}))}[ut](t){return this.color&&this.colorModel.equal(t,this.color)}[no](t){this[Ri]=t,this[Ni].forEach(e=>e.update(t))}};class Yr extends $o{constructor(e){super(e,"alpha",'aria-label="Alpha" aria-valuemin="0" aria-valuemax="1"',!1)}update(e){this.hsva=e;const o=oo({...e,a:0}),i=oo({...e,a:1}),n=e.a*100;this.style([{left:`${n}%`,color:oo(e)},{"--gradient":`linear-gradient(90deg, ${o}, ${i}`}]);const s=F(n);this.el.setAttribute("aria-valuenow",`${s}`),this.el.setAttribute("aria-valuetext",`${s}%`)}getMove(e,o){return{a:o?Ue(this.hsva.a+e.x):e.x}}}const Xr=`[part=alpha]{flex:0 0 24px}[part=alpha]::after{display:block;content:"";position:absolute;top:0;left:0;right:0;bottom:0;border-radius:inherit;background-image:var(--gradient);box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part^=alpha]{background-color:#fff;background-image:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>')}[part=alpha-pointer]{top:50%}`;class Qr extends Jr{get[It](){return[...super[It],Xr]}get[Pt](){return[...super[Pt],Yr]}}const Zr={defaultColor:"rgba(0, 0, 0, 1)",toHsva:Dr,fromHsva:Vr,equal:jr,fromAttr:t=>t};class ea extends Qr{get colorModel(){return Zr}}/**
* @license
* Copyright (c) 2017 - 2023 Vaadin Ltd.
* This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/function ta(t){const e=[];for(;t;){if(t.nodeType===Node.DOCUMENT_NODE){e.push(t);break}if(t.nodeType===Node.DOCUMENT_FRAGMENT_NODE){e.push(t),t=t.host;continue}if(t.assignedSlot){t=t.assignedSlot;continue}t=t.parentNode}return e}const so={start:"top",end:"bottom"},ro={start:"left",end:"right"},Ii=new ResizeObserver(t=>{setTimeout(()=>{t.forEach(e=>{e.target.__overlay&&e.target.__overlay._updatePosition()})})}),oa=t=>class extends t{static get properties(){return{positionTarget:{type:Object,value:null},horizontalAlign:{type:String,value:"start"},verticalAlign:{type:String,value:"top"},noHorizontalOverlap:{type:Boolean,value:!1},noVerticalOverlap:{type:Boolean,value:!1},requiredVerticalSpace:{type:Number,value:0}}}static get observers(){return["__positionSettingsChanged(horizontalAlign, verticalAlign, noHorizontalOverlap, noVerticalOverlap, requiredVerticalSpace)","__overlayOpenedChanged(opened, positionTarget)"]}constructor(){super(),this.__onScroll=this.__onScroll.bind(this),this._updatePosition=this._updatePosition.bind(this)}connectedCallback(){super.connectedCallback(),this.opened&&this.__addUpdatePositionEventListeners()}disconnectedCallback(){super.disconnectedCallback(),this.__removeUpdatePositionEventListeners()}__addUpdatePositionEventListeners(){window.addEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes=ta(this.positionTarget),this.__positionTargetAncestorRootNodes.forEach(e=>{e.addEventListener("scroll",this.__onScroll,!0)})}__removeUpdatePositionEventListeners(){window.removeEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes&&(this.__positionTargetAncestorRootNodes.forEach(e=>{e.removeEventListener("scroll",this.__onScroll,!0)}),this.__positionTargetAncestorRootNodes=null)}__overlayOpenedChanged(e,o){if(this.__removeUpdatePositionEventListeners(),o&&(o.__overlay=null,Ii.unobserve(o),e&&(this.__addUpdatePositionEventListeners(),o.__overlay=this,Ii.observe(o))),e){const i=getComputedStyle(this);this.__margins||(this.__margins={},["top","bottom","left","right"].forEach(n=>{this.__margins[n]=parseInt(i[n],10)})),this.setAttribute("dir",i.direction),this._updatePosition(),requestAnimationFrame(()=>this._updatePosition())}}__positionSettingsChanged(){this._updatePosition()}__onScroll(e){this.contains(e.target)||this._updatePosition()}_updatePosition(){if(!this.positionTarget||!this.opened)return;const e=this.positionTarget.getBoundingClientRect(),o=this.__shouldAlignStartVertically(e);this.style.justifyContent=o?"flex-start":"flex-end";const i=this.__isRTL,n=this.__shouldAlignStartHorizontally(e,i),s=!i&&n||i&&!n;this.style.alignItems=s?"flex-start":"flex-end";const r=this.getBoundingClientRect(),l=this.__calculatePositionInOneDimension(e,r,this.noVerticalOverlap,so,this,o),a=this.__calculatePositionInOneDimension(e,r,this.noHorizontalOverlap,ro,this,n);Object.assign(this.style,l,a),this.toggleAttribute("bottom-aligned",!o),this.toggleAttribute("top-aligned",o),this.toggleAttribute("end-aligned",!s),this.toggleAttribute("start-aligned",s)}__shouldAlignStartHorizontally(e,o){const i=Math.max(this.__oldContentWidth||0,this.$.overlay.offsetWidth);this.__oldContentWidth=this.$.overlay.offsetWidth;const n=Math.min(window.innerWidth,document.documentElement.clientWidth),s=!o&&this.horizontalAlign==="start"||o&&this.horizontalAlign==="end";return this.__shouldAlignStart(e,i,n,this.__margins,s,this.noHorizontalOverlap,ro)}__shouldAlignStartVertically(e){const o=this.requiredVerticalSpace||Math.max(this.__oldContentHeight||0,this.$.overlay.offsetHeight);this.__oldContentHeight=this.$.overlay.offsetHeight;const i=Math.min(window.innerHeight,document.documentElement.clientHeight),n=this.verticalAlign==="top";return this.__shouldAlignStart(e,o,i,this.__margins,n,this.noVerticalOverlap,so)}__shouldAlignStart(e,o,i,n,s,r,l){const a=i-e[r?l.end:l.start]-n[l.end],d=e[r?l.start:l.end]-n[l.start],h=s?a:d,p=h>(s?d:a)||h>o;return s===p}__adjustBottomProperty(e,o,i){let n;if(e===o.end){if(o.end===so.end){const s=Math.min(window.innerHeight,document.documentElement.clientHeight);if(i>s&&this.__oldViewportHeight){const r=this.__oldViewportHeight-s;n=i-r}this.__oldViewportHeight=s}if(o.end===ro.end){const s=Math.min(window.innerWidth,document.documentElement.clientWidth);if(i>s&&this.__oldViewportWidth){const r=this.__oldViewportWidth-s;n=i-r}this.__oldViewportWidth=s}}return n}__calculatePositionInOneDimension(e,o,i,n,s,r){const l=r?n.start:n.end,a=r?n.end:n.start,d=parseFloat(s.style[l]||getComputedStyle(s)[l]),h=this.__adjustBottomProperty(l,n,d),p=o[r?n.start:n.end]-e[i===r?n.end:n.start],u=h?`${h}px`:`${d+p*(r?-1:1)}px`;return{[l]:u,[a]:""}}};class ia extends CustomEvent{constructor(e){super("color-picker-change",{detail:{value:e}})}}const _n=$`
  :host {
    --preview-size: 24px;
    --preview-color: rgba(0, 0, 0, 0);
  }

  .preview {
    --preview-bg-size: calc(var(--preview-size) / 2);
    --preview-bg-pos: calc(var(--preview-size) / 4);

    width: var(--preview-size);
    height: var(--preview-size);
    padding: 0;
    position: relative;
    overflow: hidden;
    background: none;
    border: solid 2px #888;
    border-radius: 4px;
    box-sizing: content-box;
  }

  .preview::before,
  .preview::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .preview::before {
    content: '';
    background: white;
    background-image: linear-gradient(45deg, #666 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #666 75%), linear-gradient(45deg, transparent 75%, #666 75%),
      linear-gradient(45deg, #666 25%, transparent 25%);
    background-size: var(--preview-bg-size) var(--preview-bg-size);
    background-position: 0 0, 0 0, calc(var(--preview-bg-pos) * -1) calc(var(--preview-bg-pos) * -1),
      var(--preview-bg-pos) var(--preview-bg-pos);
  }

  .preview::after {
    content: '';
    background-color: var(--preview-color);
  }
`;let Ze=class extends N{constructor(){super(...arguments),this.commitValue=!1}static get styles(){return[_n,$`
        #toggle {
          display: block;
        }
      `]}update(t){super.update(t),t.has("value")&&this.overlay&&this.overlay.requestContentUpdate()}firstUpdated(){this.overlay=document.createElement("vaadin-dev-tools-color-picker-overlay"),this.overlay.renderer=this.renderOverlayContent.bind(this),this.overlay.owner=this,this.overlay.positionTarget=this.toggle,this.overlay.noVerticalOverlap=!0,this.overlay.addEventListener("vaadin-overlay-escape-press",this.handleOverlayEscape.bind(this)),this.overlay.addEventListener("vaadin-overlay-close",this.handleOverlayClose.bind(this)),this.append(this.overlay)}render(){const t=this.value||"rgba(0, 0, 0, 0)";return y` <button
      id="toggle"
      class="preview"
      style="--preview-color: ${t}"
      @click=${this.open}
    ></button>`}open(){this.commitValue=!1,this.overlay.opened=!0,this.overlay.style.zIndex="1000000";const t=this.overlay.shadowRoot.querySelector('[part="overlay"]');t.style.background="#333"}renderOverlayContent(t){const e=getComputedStyle(this.toggle,"::after").getPropertyValue("background-color");be(y` <div>
        <vaadin-dev-tools-color-picker-overlay-content
          .value=${e}
          .presets=${this.presets}
          @color-changed=${this.handleColorChange.bind(this)}
        ></vaadin-dev-tools-color-picker-overlay-content>
      </div>`,t)}handleColorChange(t){this.commitValue=!0,this.dispatchEvent(new ia(t.detail.value)),t.detail.close&&(this.overlay.opened=!1,this.handleOverlayClose())}handleOverlayEscape(){this.commitValue=!1}handleOverlayClose(){const t=this.commitValue?"color-picker-commit":"color-picker-cancel";this.dispatchEvent(new CustomEvent(t))}};v([b({})],Ze.prototype,"value",void 0);v([b({})],Ze.prototype,"presets",void 0);v([tt("#toggle")],Ze.prototype,"toggle",void 0);Ze=v([U("vaadin-dev-tools-color-picker")],Ze);let Ot=class extends N{static get styles(){return[_n,$`
        :host {
          display: block;
          padding: 12px;
        }

        .picker::part(saturation),
        .picker::part(hue) {
          margin-bottom: 10px;
        }

        .picker::part(hue),
        .picker::part(alpha) {
          flex: 0 0 20px;
        }

        .picker::part(saturation),
        .picker::part(hue),
        .picker::part(alpha) {
          border-radius: 3px;
        }

        .picker::part(saturation-pointer),
        .picker::part(hue-pointer),
        .picker::part(alpha-pointer) {
          width: 20px;
          height: 20px;
        }

        .swatches {
          display: grid;
          grid-template-columns: repeat(6, var(--preview-size));
          grid-column-gap: 10px;
          grid-row-gap: 6px;
          margin-top: 16px;
        }
      `]}render(){return y` <div>
      <vaadin-dev-tools-rgba-string-color-picker
        class="picker"
        .color=${this.value}
        @color-changed=${this.handlePickerChange}
      ></vaadin-dev-tools-rgba-string-color-picker>
      ${this.renderSwatches()}
    </div>`}renderSwatches(){if(!this.presets||this.presets.length===0)return;const t=this.presets.map(e=>y` <button
        class="preview"
        style="--preview-color: ${e}"
        @click=${()=>this.selectPreset(e)}
      ></button>`);return y` <div class="swatches">${t}</div>`}handlePickerChange(t){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:t.detail.value}}))}selectPreset(t){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:t,close:!0}}))}};v([b({})],Ot.prototype,"value",void 0);v([b({})],Ot.prototype,"presets",void 0);Ot=v([U("vaadin-dev-tools-color-picker-overlay-content")],Ot);customElements.whenDefined("vaadin-overlay").then(()=>{const t=customElements.get("vaadin-overlay");class e extends oa(t){}customElements.define("vaadin-dev-tools-color-picker-overlay",e)});customElements.define("vaadin-dev-tools-rgba-string-color-picker",ea);let Pi=class extends q{constructor(){super(...arguments),this.presets=new At}static get styles(){return[q.styles,$`
        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `]}update(t){t.has("propertyMetadata")&&(this.presets=new At(this.propertyMetadata)),super.update(t)}renderEditor(){var t;return y`
      <vaadin-dev-tools-color-picker
        .value=${this.value}
        .presets=${this.presets.values}
        @color-picker-change=${this.handleColorPickerChange}
        @color-picker-commit=${this.handleColorPickerCommit}
        @color-picker-cancel=${this.handleColorPickerCancel}
      ></vaadin-dev-tools-color-picker>
      <vaadin-dev-tools-theme-text-input
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleInputChange}
      ></vaadin-dev-tools-theme-text-input>
    `}handleInputChange(t){this.value=t.detail.value,this.dispatchChange(this.value)}handleColorPickerChange(t){this.value=t.detail.value}handleColorPickerCommit(){this.dispatchChange(this.value)}handleColorPickerCancel(){this.updateValueFromTheme()}dispatchChange(t){const e=this.presets.tryMapToPreset(t);super.dispatchChange(e)}updateValueFromTheme(){var t;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((t=this.propertyValue)==null?void 0:t.value)||"")}};Pi=v([U("vaadin-dev-tools-theme-color-property-editor")],Pi);class na extends CustomEvent{constructor(e){super("open-css",{detail:{element:e}})}}let Lt=class extends N{static get styles(){return $`
      .section .header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        padding: 0.4rem var(--theme-editor-section-horizontal-padding);
        color: var(--dev-tools-text-color-emphasis);
        background-color: rgba(0, 0, 0, 0.2);
      }

      .section .property-list .property-editor:not(:last-child) {
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .section .header .open-css {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        background-color: rgba(255, 255, 255, 0.12);
        color: var(--dev-tools-text-color);
        font-weight: 600;
        padding: 0.25rem 0.375rem;
        border-radius: 0.25rem;
      }

      .section .header .open-css:hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}render(){const t=this.metadata.elements.map(e=>this.renderSection(e));return y` <div>${t}</div> `}renderSection(t){const e=t.properties.map(o=>this.renderPropertyEditor(t,o));return y`
      <div class="section" data-testid=${t==null?void 0:t.displayName}>
        <div class="header">
          <span> ${t.displayName} </span>
          <button class="open-css" @click=${()=>this.handleOpenCss(t)}>Edit CSS</button>
        </div>
        <div class="property-list">${e}</div>
      </div>
    `}handleOpenCss(t){this.dispatchEvent(new na(t))}renderPropertyEditor(t,e){let o;switch(e.editorType){case R.checkbox:o=ct`vaadin-dev-tools-theme-checkbox-property-editor`;break;case R.range:o=ct`vaadin-dev-tools-theme-range-property-editor`;break;case R.color:o=ct`vaadin-dev-tools-theme-color-property-editor`;break;default:o=ct`vaadin-dev-tools-theme-text-property-editor`}return sr` <${o}
          class="property-editor"
          .elementMetadata=${t}
          .propertyMetadata=${e}
          .theme=${this.theme}
          data-testid=${e.propertyName}
        >
        </${o}>`}};v([b({})],Lt.prototype,"metadata",void 0);v([b({})],Lt.prototype,"theme",void 0);Lt=v([U("vaadin-dev-tools-theme-property-list")],Lt);let Mt=class extends N{render(){return y`<div
      tabindex="-1"
      @mousemove=${this.onMouseMove}
      @click=${this.onClick}
      @keydown=${this.onKeyDown}
    ></div>`}onClick(t){const e=this.getTargetElement(t);this.dispatchEvent(new CustomEvent("shim-click",{detail:{target:e}}))}onMouseMove(t){const e=this.getTargetElement(t);this.dispatchEvent(new CustomEvent("shim-mousemove",{detail:{target:e}}))}onKeyDown(t){this.dispatchEvent(new CustomEvent("shim-keydown",{detail:{originalEvent:t}}))}getTargetElement(t){this.style.display="none";const e=document.elementFromPoint(t.clientX,t.clientY);return this.style.display="",e}};Mt.shadowRootOptions={...N.shadowRootOptions,delegatesFocus:!0};Mt.styles=[$`
      div {
        pointer-events: auto;
        background: rgba(255, 255, 255, 0);
        position: fixed;
        inset: 0px;
        z-index: 1000000;
      }
    `];Mt=v([U("vaadin-dev-tools-shim")],Mt);const sa={resolve:t=>he(e=>e.classList.contains("cc-banner"),t)?document.querySelector("vaadin-cookie-consent"):void 0},ra={resolve:t=>{const e=he(o=>o.localName==="vaadin-login-overlay-wrapper",t);return e?e.__dataHost:void 0}},aa={resolve:t=>t.localName==="vaadin-dialog-overlay"?t.__dataHost:void 0},la={resolve:t=>{const e=he(o=>o.localName==="vaadin-confirm-dialog-overlay",t);return e?e.__dataHost:void 0}},da={resolve:t=>{const e=he(o=>o.localName==="vaadin-notification-card",t);return e?e.__dataHost:void 0}},ca={resolve:t=>t.localName!=="vaadin-menu-bar-item"?void 0:he(e=>e.localName==="vaadin-menu-bar",t)},Oi=[sa,ra,aa,la,da,ca],ha={resolve:t=>he(e=>e.classList.contains("cc-banner"),t)},ua={resolve:t=>{var e;const o=he(i=>{var n;return((n=i.shadowRoot)==null?void 0:n.querySelector("[part=overlay]"))!=null},t);return(e=o==null?void 0:o.shadowRoot)==null?void 0:e.querySelector("[part=overlay]")}},pa={resolve:t=>{var e;const o=he(i=>i.localName==="vaadin-login-overlay-wrapper",t);return(e=o==null?void 0:o.shadowRoot)==null?void 0:e.querySelector("[part=card]")}},Li=[pa,ha,ua],he=function(t,e){return t(e)?e:e.parentNode&&e.parentNode instanceof HTMLElement?he(t,e.parentNode):void 0};class ma{resolveElement(e){for(const o in Oi){let i=e;if((i=Oi[o].resolve(e))!==void 0)return i}return e}}class va{resolveElement(e){for(const o in Li){let i=e;if((i=Li[o].resolve(e))!==void 0)return i}return e}}const fa=new ma,ga=new va;let ve=class extends N{constructor(){super(),this.active=!1,this.components=[],this.selected=0,this.mouseMoveEvent=this.mouseMoveEvent.bind(this)}connectedCallback(){super.connectedCallback();const t=new CSSStyleSheet;t.replaceSync(`
    .vaadin-dev-tools-highlight-overlay {
      pointer-events: none;
      position: absolute;
      z-index: 10000;
      background: rgba(158,44,198,0.25);
    }`),document.adoptedStyleSheets=[...document.adoptedStyleSheets,t],this.overlayElement=document.createElement("div"),this.overlayElement.classList.add("vaadin-dev-tools-highlight-overlay"),this.addEventListener("mousemove",this.mouseMoveEvent)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousemove",this.mouseMoveEvent)}render(){var t;return this.active?(this.style.display="block",y`
      <vaadin-dev-tools-shim
        @shim-click=${this.shimClick}
        @shim-mousemove=${this.shimMove}
        @shim-keydown=${this.shimKeydown}
      ></vaadin-dev-tools-shim>
      <div class="window popup component-picker-info">${(t=this.options)==null?void 0:t.infoTemplate}</div>
      <div class="window popup component-picker-components-info">
        <div>
          ${this.components.map((e,o)=>y`<div class=${o===this.selected?"selected":""}>
                ${e.element.tagName.toLowerCase()}
              </div>`)}
        </div>
      </div>
    `):(this.style.display="none",null)}open(t){this.options=t,this.active=!0,this.dispatchEvent(new CustomEvent("component-picker-opened",{}))}close(){this.active=!1,this.dispatchEvent(new CustomEvent("component-picker-closed",{}))}update(t){if(super.update(t),(t.has("selected")||t.has("components"))&&this.highlight(this.components[this.selected]),t.has("active")){const e=t.get("active"),o=this.active;!e&&o?requestAnimationFrame(()=>this.shim.focus()):e&&!o&&this.highlight(void 0)}}mouseMoveEvent(t){var e;if(!this.active){this.style.display="none";return}const o=(e=this.shadowRoot)==null?void 0:e.querySelector(".component-picker-info");if(o){const i=o.getBoundingClientRect();t.x>i.x&&t.x<i.x+i.width&&t.y>i.y&&t.y<=i.y+i.height?o.style.opacity="0.05":o.style.opacity="1.0"}}shimKeydown(t){const e=t.detail.originalEvent;if(e.key==="Escape")this.close(),t.stopPropagation(),t.preventDefault();else if(e.key==="ArrowUp"){let o=this.selected-1;o<0&&(o=this.components.length-1),this.selected=o}else e.key==="ArrowDown"?this.selected=(this.selected+1)%this.components.length:e.key==="Enter"&&(this.pickSelectedComponent(),t.stopPropagation(),t.preventDefault())}shimMove(t){const e=fa.resolveElement(t.detail.target);this.components=ur(e),this.selected=this.components.length-1,this.components[this.selected].highlightElement=ga.resolveElement(t.detail.target)}shimClick(t){this.pickSelectedComponent()}pickSelectedComponent(){const t=this.components[this.selected];if(t&&this.options)try{this.options.pickCallback(t)}catch(e){console.error("Pick callback failed",e)}this.close()}highlight(t){let e=(t==null?void 0:t.highlightElement)??(t==null?void 0:t.element);if(this.highlighted!==e)if(e){const o=e.getBoundingClientRect(),i=getComputedStyle(e);this.overlayElement.style.top=`${o.top}px`,this.overlayElement.style.left=`${o.left}px`,this.overlayElement.style.width=`${o.width}px`,this.overlayElement.style.height=`${o.height}px`,this.overlayElement.style.borderRadius=i.borderRadius,document.body.append(this.overlayElement)}else this.overlayElement.remove();this.highlighted=e}};ve.styles=[mn,$`
      .component-picker-info {
        left: 1em;
        bottom: 1em;
      }

      .component-picker-components-info {
        right: 3em;
        bottom: 1em;
      }

      .component-picker-components-info .selected {
        font-weight: bold;
      }
    `];v([I()],ve.prototype,"active",void 0);v([I()],ve.prototype,"components",void 0);v([I()],ve.prototype,"selected",void 0);v([tt("vaadin-dev-tools-shim")],ve.prototype,"shim",void 0);ve=v([U("vaadin-dev-tools-component-picker")],ve);const ya=Object.freeze(Object.defineProperty({__proto__:null,get ComponentPicker(){return ve}},Symbol.toStringTag,{value:"Module"}));class _a{constructor(){this.currentActiveComponent=null,this.currentActiveComponentMetaData=null,this.componentPicked=async(e,o)=>{await this.hideOverlay(),this.currentActiveComponent=e,this.currentActiveComponentMetaData=o},this.showOverlay=()=>{!this.currentActiveComponent||!this.currentActiveComponentMetaData||this.currentActiveComponentMetaData.openOverlay&&this.currentActiveComponentMetaData.openOverlay(this.currentActiveComponent)},this.hideOverlay=()=>{!this.currentActiveComponent||!this.currentActiveComponentMetaData||this.currentActiveComponentMetaData.hideOverlay&&this.currentActiveComponentMetaData.hideOverlay(this.currentActiveComponent)},this.reset=()=>{this.currentActiveComponent=null,this.currentActiveComponentMetaData=null}}}const ye=new _a,Ra=t=>{const e=t.element.$.comboBox,o=e.$.overlay;ba(t.element,e,o)},Na=t=>{const e=t.element,o=e.$.comboBox,i=o.$.overlay;wa(e,o,i)},ba=(t,e,o)=>{t.opened=!0,o._storedModeless=o.modeless,o.modeless=!0,document._themeEditorDocClickListener=Ea(t,e),document.addEventListener("click",document._themeEditorDocClickListener),e.removeEventListener("focusout",e._boundOnFocusout)},wa=(t,e,o)=>{t.opened=!1,!(!e||!o)&&(o.modeless=o._storedModeless,delete o._storedModeless,e.addEventListener("focusout",e._boundOnFocusout),document.removeEventListener("click",document._themeEditorDocClickListener),delete document._themeEditorDocClickListener)},Ea=(t,e)=>o=>{const i=o.target;i!=null&&(e.opened=!Sa(i,t))};function Sa(t,e){if(!t||!t.tagName)return!0;if(t.tagName.startsWith("VAADIN-DEV"))return!1;let o=t,i={nodeId:-1,uiId:-1,element:void 0};for(;o&&o.parentNode&&(i=ho(o),i.nodeId===-1);)o=o.parentElement?o.parentElement:o.parentNode.host;const n=ho(e);return!(i.nodeId!==-1&&n.nodeId===i.nodeId)}To($`
  .vaadin-theme-editor-highlight {
    outline: solid 2px #9e2cc6;
    outline-offset: 3px;
  }
`);let ce=class extends N{constructor(){super(...arguments),this.expanded=!1,this.themeEditorState=Ve.enabled,this.context=null,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null,this.markedAsUsed=!1}static get styles(){return $`
      :host {
        animation: fade-in var(--dev-tools-transition-duration) ease-in;
        --theme-editor-section-horizontal-padding: 0.75rem;
        display: flex;
        flex-direction: column;
        max-height: 400px;
      }

      .notice {
        padding: var(--theme-editor-section-horizontal-padding);
      }

      .notice a {
        color: var(--dev-tools-text-color-emphasis);
      }

      .hint vaadin-icon {
        color: var(--dev-tools-green-color);
        font-size: var(--lumo-icon-size-m);
      }

      .hint {
        display: flex;
        align-items: center;
        gap: var(--theme-editor-section-horizontal-padding);
      }

      .header {
        flex: 0 0 auto;
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .header .picker-row {
        padding: var(--theme-editor-section-horizontal-padding);
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: space-between;
      }

      .picker {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        align-items: center;
      }

      .picker button {
        min-width: 0;
        display: inline-flex;
        align-items: center;
        padding: 0;
        line-height: 20px;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .picker button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .picker svg,
      .picker .component-type {
        flex: 0 0 auto;
        margin-right: 4px;
      }

      .picker .instance-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #e5a2fce5;
      }

      .picker .instance-name-quote {
        color: #e5a2fce5;
      }

      .picker .no-selection {
        font-style: italic;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .property-list {
        flex: 1 1 auto;
        overflow-y: auto;
      }

      .link-button {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        color: inherit;
        font-weight: 600;
        text-decoration: underline;
      }

      .link-button:focus,
      .link-button:hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .icon-button {
        padding: 0;
        line-height: 0;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .icon-button:disabled {
        opacity: 0.5;
      }

      .icon-button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}firstUpdated(){this.api=new Nr(this.connection),this.history=new Ir(this.api),this.historyActions=this.history.allowedActions,this.undoRedoListener=t=>{var e,o;const i=t.key==="Z"||t.key==="z";i&&(t.ctrlKey||t.metaKey)&&t.shiftKey?(e=this.historyActions)!=null&&e.allowRedo&&this.handleRedo():i&&(t.ctrlKey||t.metaKey)&&(o=this.historyActions)!=null&&o.allowUndo&&this.handleUndo()},document.addEventListener("vaadin-theme-updated",()=>{ge.clear(),this.refreshTheme()}),document.addEventListener("keydown",this.undoRedoListener)}activate(){this.dispatchEvent(new CustomEvent("before-open"))}deactivate(){this.dispatchEvent(new CustomEvent("after-close"))}update(t){var e,o;super.update(t),t.has("expanded")&&(this.expanded?(this.highlightElement((e=this.context)==null?void 0:e.component.element),ye.showOverlay()):(ye.hideOverlay(),this.removeElementHighlight((o=this.context)==null?void 0:o.component.element)))}disconnectedCallback(){var t;super.disconnectedCallback(),this.removeElementHighlight((t=this.context)==null?void 0:t.component.element),ye.hideOverlay(),ye.reset(),document.removeEventListener("keydown",this.undoRedoListener)}render(){var t,e,o;return this.themeEditorState===Ve.missing_theme?this.renderMissingThemeNotice():y`
      <div class="header">
        <div class="picker-row">
          ${this.renderPicker()}
          <div class="actions">
            ${(t=this.context)!=null&&t.metadata?y` <vaadin-dev-tools-theme-scope-selector
                  .value=${this.context.scope}
                  .metadata=${this.context.metadata}
                  @scope-change=${this.handleScopeChange}
                ></vaadin-dev-tools-theme-scope-selector>`:null}
            <button
              class="icon-button"
              data-testid="undo"
              ?disabled=${!((e=this.historyActions)!=null&&e.allowUndo)}
              @click=${this.handleUndo}
            >
              ${yt.undo}
            </button>
            <button
              class="icon-button"
              data-testid="redo"
              ?disabled=${!((o=this.historyActions)!=null&&o.allowRedo)}
              @click=${this.handleRedo}
            >
              ${yt.redo}
            </button>
          </div>
        </div>
        ${this.renderLocalClassNameEditor()}
      </div>
      ${this.renderPropertyList()}
    `}renderMissingThemeNotice(){return y`
      <div class="notice">
        It looks like you have not set up an application theme yet. Theme editor requires an existing theme to work
        with. Please check our
        <a href="https://vaadin.com/docs/latest/styling/application-theme" target="_blank">documentation</a>
        on how to set up an application theme.
      </div>
    `}renderPropertyList(){if(!this.context)return null;if(!this.context.metadata){const t=this.context.component.element.localName;return y`
        <div class="notice">Styling <code>&lt;${t}&gt;</code> components is not supported at the moment.</div>
      `}if(this.context.scope===P.local&&!this.context.accessible){const t=this.context.metadata.displayName;return y`
        ${this.context.metadata.notAccessibleDescription&&this.context.scope===P.local?y`<div class="notice hint" style="padding-bottom: 0;">
              <vaadin-icon icon="vaadin:lightbulb"></vaadin-icon>
              <div>${this.context.metadata.notAccessibleDescription}</div>
            </div>`:""}
        <div class="notice">
          The selected ${t} cannot be styled locally. Currently, Theme Editor only supports styling
          instances that are assigned to a local variable, like so:
          <pre><code>Button saveButton = new Button("Save");</code></pre>
          If you want to modify the code so that it satisfies this requirement,
          <button class="link-button" @click=${this.handleShowComponent}>click here</button>
          to open it in your IDE. Alternatively you can choose to style all ${t}s by selecting "Global" from
          the scope dropdown above.
        </div>
      `}return y` ${this.context.metadata.description&&this.context.scope===P.local?y`<div class="notice hint">
            <vaadin-icon icon="vaadin:lightbulb"></vaadin-icon>
            <div>${this.context.metadata.description}</div>
          </div>`:""}
      <vaadin-dev-tools-theme-property-list
        class="property-list"
        .metadata=${this.context.metadata}
        .theme=${this.effectiveTheme}
        @theme-property-value-change=${this.handlePropertyChange}
        @open-css=${this.handleOpenCss}
      ></vaadin-dev-tools-theme-property-list>`}handleShowComponent(){if(!this.context)return;const t=this.context.component,e={nodeId:t.nodeId,uiId:t.uiId};this.connection.sendShowComponentCreateLocation(e)}async handleOpenCss(t){if(!this.context)return;await this.ensureLocalClassName();const e={themeScope:this.context.scope,localClassName:this.context.localClassName},o=De(t.detail.element,e);await this.api.openCss(o)}renderPicker(){var t;let e;if((t=this.context)!=null&&t.metadata){const o=this.context.scope===P.local?this.context.metadata.displayName:`All ${this.context.metadata.displayName}s`,i=y`<span class="component-type">${o}</span>`,n=this.context.scope===P.local?Ar(this.context.component):null,s=n?y` <span class="instance-name-quote">"</span><span class="instance-name">${n}</span
            ><span class="instance-name-quote">"</span>`:null;e=y`${i} ${s}`}else e=y`<span class="no-selection">Pick an element to get started</span>`;return y`
      <div class="picker">
        <button @click=${this.pickComponent}>${yt.crosshair} ${e}</button>
      </div>
    `}renderLocalClassNameEditor(){var t;const e=((t=this.context)==null?void 0:t.scope)===P.local&&this.context.accessible;if(!this.context||!e)return null;const o=this.context.localClassName||this.context.suggestedClassName;return y` <vaadin-dev-tools-theme-class-name-editor
      .className=${o}
      @class-name-change=${this.handleClassNameChange}
    >
    </vaadin-dev-tools-theme-class-name-editor>`}async handleClassNameChange(t){if(!this.context)return;const e=this.context.localClassName,o=t.detail.value;if(e){const i=this.context.component.element;this.context.localClassName=o;const n=await this.api.setLocalClassName(this.context.component,o);this.historyActions=this.history.push(n.requestId,()=>ge.previewLocalClassName(i,o),()=>ge.previewLocalClassName(i,e))}else this.context={...this.context,suggestedClassName:o}}async pickComponent(){var t;ye.hideOverlay(),this.removeElementHighlight((t=this.context)==null?void 0:t.component.element),this.pickerProvider().open({infoTemplate:y`
        <div>
          <h3>Locate the component to style</h3>
          <p>Use the mouse cursor to highlight components in the UI.</p>
          <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
          <p>Click the primary mouse button to select the component.</p>
        </div>
      `,pickCallback:async e=>{var o;const i=await Cr.getMetadata(e);if(!i){this.context={component:e,scope:((o=this.context)==null?void 0:o.scope)||P.local},this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null;return}await ye.componentPicked(e,i),this.highlightElement(e.element),this.refreshComponentAndTheme(e,i),ye.showOverlay()}})}handleScopeChange(t){this.context&&this.refreshTheme({...this.context,scope:t.detail.value})}async handlePropertyChange(t){if(!this.context||!this.baseTheme||!this.editedTheme)return;const{element:e,property:o,value:i}=t.detail;this.editedTheme.updatePropertyValue(e.selector,o.propertyName,i,!0),this.effectiveTheme=me.combine(this.baseTheme,this.editedTheme),await this.ensureLocalClassName();const n={themeScope:this.context.scope,localClassName:this.context.localClassName},s=Tr(e,n,o.propertyName,i);try{const r=await this.api.setCssRules([s]);this.historyActions=this.history.push(r.requestId);const l=kr(s);ge.add(l)}catch(r){console.error("Failed to update property value",r)}}async handleUndo(){this.historyActions=await this.history.undo(),await this.refreshComponentAndTheme()}async handleRedo(){this.historyActions=await this.history.redo(),await this.refreshComponentAndTheme()}async ensureLocalClassName(){if(!this.context||this.context.scope===P.global||this.context.localClassName)return;if(!this.context.localClassName&&!this.context.suggestedClassName)throw new Error("Cannot assign local class name for the component because it does not have a suggested class name");const t=this.context.component.element,e=this.context.suggestedClassName;this.context.localClassName=e;const o=await this.api.setLocalClassName(this.context.component,e);this.historyActions=this.history.push(o.requestId,()=>ge.previewLocalClassName(t,e),()=>ge.previewLocalClassName(t))}async refreshComponentAndTheme(t,e){var o,i,n;if(t=t||((o=this.context)==null?void 0:o.component),e=e||((i=this.context)==null?void 0:i.metadata),!t||!e)return;const s=await this.api.loadComponentMetadata(t);this.markedAsUsed||this.api.markAsUsed().then(()=>{this.markedAsUsed=!0}),ge.previewLocalClassName(t.element,s.className),await this.refreshTheme({scope:((n=this.context)==null?void 0:n.scope)||P.local,metadata:e,component:t,localClassName:s.className,suggestedClassName:s.suggestedClassName,accessible:s.accessible})}async refreshTheme(t){const e=t||this.context;if(!e||!e.metadata)return;if(e.scope===P.local&&!e.accessible){this.context=e,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null;return}let o=new me(e.metadata);if(!(e.scope===P.local&&!e.localClassName)){const n={themeScope:e.scope,localClassName:e.localClassName},s=e.metadata.elements.map(l=>De(l,n)),r=await this.api.loadRules(s);o=me.fromServerRules(e.metadata,n,r.rules)}const i=await $r(e.metadata);this.context=e,this.baseTheme=i,this.editedTheme=o,this.effectiveTheme=me.combine(i,this.editedTheme)}highlightElement(t){t&&t.classList.add("vaadin-theme-editor-highlight")}removeElementHighlight(t){t&&t.classList.remove("vaadin-theme-editor-highlight")}};v([b({})],ce.prototype,"expanded",void 0);v([b({})],ce.prototype,"themeEditorState",void 0);v([b({})],ce.prototype,"pickerProvider",void 0);v([b({})],ce.prototype,"connection",void 0);v([I()],ce.prototype,"historyActions",void 0);v([I()],ce.prototype,"context",void 0);v([I()],ce.prototype,"effectiveTheme",void 0);ce=v([U("vaadin-dev-tools-theme-editor")],ce);var xa=function(){var t=document.getSelection();if(!t.rangeCount)return function(){};for(var e=document.activeElement,o=[],i=0;i<t.rangeCount;i++)o.push(t.getRangeAt(i));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return t.removeAllRanges(),function(){t.type==="Caret"&&t.removeAllRanges(),t.rangeCount||o.forEach(function(n){t.addRange(n)}),e&&e.focus()}},Mi={"text/plain":"Text","text/html":"Url",default:"Text"},Ca="Copy to clipboard: #{key}, Enter";function Ta(t){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return t.replace(/#{\s*key\s*}/g,e)}function ka(t,e){var o,i,n,s,r,l,a=!1;e||(e={}),o=e.debug||!1;try{n=xa(),s=document.createRange(),r=document.getSelection(),l=document.createElement("span"),l.textContent=t,l.style.all="unset",l.style.position="fixed",l.style.top=0,l.style.clip="rect(0, 0, 0, 0)",l.style.whiteSpace="pre",l.style.webkitUserSelect="text",l.style.MozUserSelect="text",l.style.msUserSelect="text",l.style.userSelect="text",l.addEventListener("copy",function(h){if(h.stopPropagation(),e.format)if(h.preventDefault(),typeof h.clipboardData>"u"){o&&console.warn("unable to use e.clipboardData"),o&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var p=Mi[e.format]||Mi.default;window.clipboardData.setData(p,t)}else h.clipboardData.clearData(),h.clipboardData.setData(e.format,t);e.onCopy&&(h.preventDefault(),e.onCopy(h.clipboardData))}),document.body.appendChild(l),s.selectNodeContents(l),r.addRange(s);var d=document.execCommand("copy");if(!d)throw new Error("copy command was unsuccessful");a=!0}catch(h){o&&console.error("unable to copy using execCommand: ",h),o&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",t),e.onCopy&&e.onCopy(window.clipboardData),a=!0}catch(p){o&&console.error("unable to copy using clipboardData: ",p),o&&console.error("falling back to prompt"),i=Ta("message"in e?e.message:Ca),window.prompt(i,t)}}finally{r&&(typeof r.removeRange=="function"?r.removeRange(s):r.removeAllRanges()),l&&document.body.removeChild(l),n()}return a}let Vt=class extends N{constructor(){super(...arguments),this.serverInfo={versions:[]}}createRenderRoot(){return this}render(){return y` <div class="info-tray">
      <button class="button copy" @click=${this.copyInfoToClipboard}>Copy</button>
      <dl>
        ${this.serverInfo.versions.map(t=>y`
            <dt>${t.name}</dt>
            <dd>${t.version}</dd>
          `)}
        <dt>Browser</dt>
        <dd>${navigator.userAgent}</dd>
        <dt>
          Live reload
          <label class="switch">
            <input
              id="toggle"
              type="checkbox"
              ?disabled=${!this._devTools.conf.enable||(this._devTools.frontendStatus===S.UNAVAILABLE||this._devTools.frontendStatus===S.ERROR)&&(this._devTools.javaStatus===S.UNAVAILABLE||this._devTools.javaStatus===S.ERROR)}
              ?checked="${this._devTools.frontendStatus===S.ACTIVE||this._devTools.javaStatus===S.ACTIVE}"
              @change=${t=>this._devTools.setActive(t.target.checked)}
            />
            <span class="slider"></span>
          </label>
        </dt>
        <dd
          class="live-reload-status"
          style="--status-color: ${this._devTools.getStatusColor(this._devTools.conf.backend===x.HOTSWAP_AGENT||this._devTools.conf.backend===x.JREBEL?this._devTools.frontendStatus:this._devTools.javaStatus)}"
        >
          Java ${this._devTools.conf.backend===x.HOTSWAP_AGENT||this._devTools.conf.backend===x.JREBEL?this._devTools.frontendStatus:this._devTools.javaStatus}
          ${this._devTools.conf.backend?`(${x.BACKEND_DISPLAY_NAME[this._devTools.conf.backend]})`:""}
        </dd>
        <dd
          class="live-reload-status"
          style="--status-color: ${this._devTools.getStatusColor(this._devTools.frontendStatus)}"
        >
          Front end ${this._devTools.frontendStatus}
        </dd>
      </dl>
    </div>`}handleMessage(t){return(t==null?void 0:t.command)==="serverInfo"?(this.serverInfo=t.data,!0):!1}copyInfoToClipboard(){const t=this.renderRoot.querySelectorAll(".info-tray dt, .info-tray dd"),e=Array.from(t).map(o=>(o.localName==="dd"?": ":`
`)+o.textContent.trim()).join("").replace(/^\n/,"");ka(e),this._devTools.showNotification(V.INFORMATION,"Environment information copied to clipboard",void 0,void 0,"versionInfoCopied")}};v([b({type:Object})],Vt.prototype,"_devTools",void 0);v([I()],Vt.prototype,"serverInfo",void 0);Vt=v([U("vaadin-dev-tools-info")],Vt);let fo=class extends N{createRenderRoot(){return this}activate(){this._devTools.unreadErrors=!1,this.updateComplete.then(()=>{const t=this.renderRoot.querySelector(".message-tray .message:last-child");t&&t.scrollIntoView()})}render(){return y`<div class="message-tray">
      ${this._devTools.messages.map(t=>this._devTools.renderMessage(t))}
    </div>`}};v([b({type:Object})],fo.prototype,"_devTools",void 0);fo=v([U("vaadin-dev-tools-log")],fo);const Vi=16384;class bn extends $t{constructor(e){if(super(),!e)return;const o={transport:"websocket",fallbackTransport:"websocket",url:e,contentType:"application/json; charset=UTF-8",reconnectInterval:5e3,timeout:-1,maxReconnectOnClose:1e7,trackMessageLength:!0,enableProtocol:!0,handleOnlineOffline:!1,executeCallbackBeforeReconnect:!0,messageDelimiter:"|",onMessage:i=>{const n={data:i.responseBody};this.handleMessage(n)},onError:i=>{this.handleError(i)}};$a().then(i=>{this.socket=i.subscribe(o)})}onReload(){}onUpdate(e,o){}onMessage(e){}handleMessage(e){let o;try{o=JSON.parse(e.data)}catch(i){this.handleError(`[${i.name}: ${i.message}`);return}o.command==="hello"?(this.setStatus(S.ACTIVE),this.onHandshake()):o.command==="reload"?this.status===S.ACTIVE&&this.onReload():o.command==="update"?this.status===S.ACTIVE&&this.onUpdate(o.path,o.content):this.onMessage(o)}handleError(e){console.error(e),this.setStatus(S.ERROR),this.onConnectionError(e)}send(e,o){if(!this.socket){Ao(()=>this.socket,s=>this.send(e,o));return}const i=JSON.stringify({command:e,data:o});let n=i.length+"|"+i;for(;n.length;)this.socket.push(n.substring(0,Vi)),n=n.substring(Vi)}}bn.HEARTBEAT_INTERVAL=18e4;function Ao(t,e){const o=t();o?e(o):setTimeout(()=>Ao(t,e),50)}function $a(){return new Promise((t,e)=>{Ao(()=>{var o;return(o=window==null?void 0:window.vaadinPush)==null?void 0:o.atmosphere},t)})}var T,V;(function(t){t.LOG="log",t.INFORMATION="information",t.WARNING="warning",t.ERROR="error"})(V||(V={}));let x=T=class extends N{static get styles(){return[$`
        :host {
          --dev-tools-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
            'Helvetica Neue', sans-serif;
          --dev-tools-font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
            monospace;

          --dev-tools-font-size: 0.8125rem;
          --dev-tools-font-size-small: 0.75rem;

          --dev-tools-text-color: rgba(255, 255, 255, 0.8);
          --dev-tools-text-color-secondary: rgba(255, 255, 255, 0.65);
          --dev-tools-text-color-emphasis: rgba(255, 255, 255, 0.95);
          --dev-tools-text-color-active: rgba(255, 255, 255, 1);

          --dev-tools-background-color-inactive: rgba(45, 45, 45, 0.25);
          --dev-tools-background-color-active: rgba(45, 45, 45, 0.98);
          --dev-tools-background-color-active-blurred: rgba(45, 45, 45, 0.85);

          --dev-tools-border-radius: 0.5rem;
          --dev-tools-box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.4);

          --dev-tools-blue-hsl: 206, 100%, 70%;
          --dev-tools-blue-color: hsl(var(--dev-tools-blue-hsl));
          --dev-tools-green-hsl: 145, 80%, 42%;
          --dev-tools-green-color: hsl(var(--dev-tools-green-hsl));
          --dev-tools-grey-hsl: 0, 0%, 50%;
          --dev-tools-grey-color: hsl(var(--dev-tools-grey-hsl));
          --dev-tools-yellow-hsl: 38, 98%, 64%;
          --dev-tools-yellow-color: hsl(var(--dev-tools-yellow-hsl));
          --dev-tools-red-hsl: 355, 100%, 68%;
          --dev-tools-red-color: hsl(var(--dev-tools-red-hsl));

          /* Needs to be in ms, used in JavaScript as well */
          --dev-tools-transition-duration: 180ms;

          all: initial;

          direction: ltr;
          cursor: default;
          font: normal 400 var(--dev-tools-font-size) / 1.125rem var(--dev-tools-font-family);
          color: var(--dev-tools-text-color);
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
          color-scheme: dark;

          position: fixed;
          z-index: 20000;
          pointer-events: none;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
        }

        .dev-tools {
          pointer-events: auto;
          display: flex;
          align-items: center;
          position: fixed;
          z-index: inherit;
          right: 0.5rem;
          bottom: 0.5rem;
          min-width: 1.75rem;
          height: 1.75rem;
          max-width: 1.75rem;
          border-radius: 0.5rem;
          padding: 0.375rem;
          box-sizing: border-box;
          background-color: var(--dev-tools-background-color-inactive);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          white-space: nowrap;
          line-height: 1rem;
        }

        .dev-tools:hover,
        .dev-tools.active {
          background-color: var(--dev-tools-background-color-active);
          box-shadow: var(--dev-tools-box-shadow);
        }

        .dev-tools.active {
          max-width: calc(100% - 1rem);
        }

        .dev-tools .dev-tools-icon {
          flex: none;
          pointer-events: none;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          fill: #fff;
          transition: var(--dev-tools-transition-duration);
          margin: 0;
        }

        .dev-tools.active .dev-tools-icon {
          opacity: 0;
          position: absolute;
          transform: scale(0.5);
        }

        .dev-tools .status-blip {
          flex: none;
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          z-index: 20001;
          background: var(--dev-tools-grey-color);
          position: absolute;
          top: -1px;
          right: -1px;
        }

        .dev-tools .status-description {
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 0.25rem;
        }

        .dev-tools.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.15);
          animation: bounce 0.5s;
          animation-iteration-count: 2;
        }

        .switch {
          display: inline-flex;
          align-items: center;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        .switch .slider {
          display: block;
          flex: none;
          width: 28px;
          height: 18px;
          border-radius: 9px;
          background-color: rgba(255, 255, 255, 0.3);
          transition: var(--dev-tools-transition-duration);
          margin-right: 0.5rem;
        }

        .switch:focus-within .slider,
        .switch .slider:hover {
          background-color: rgba(255, 255, 255, 0.35);
          transition: none;
        }

        .switch input:focus-visible ~ .slider {
          box-shadow: 0 0 0 2px var(--dev-tools-background-color-active), 0 0 0 4px var(--dev-tools-blue-color);
        }

        .switch .slider::before {
          content: '';
          display: block;
          margin: 2px;
          width: 14px;
          height: 14px;
          background-color: #fff;
          transition: var(--dev-tools-transition-duration);
          border-radius: 50%;
        }

        .switch input:checked + .slider {
          background-color: var(--dev-tools-green-color);
        }

        .switch input:checked + .slider::before {
          transform: translateX(10px);
        }

        .switch input:disabled + .slider::before {
          background-color: var(--dev-tools-grey-color);
        }

        .window.hidden {
          opacity: 0;
          transform: scale(0);
          position: absolute;
        }

        .window.visible {
          transform: none;
          opacity: 1;
          pointer-events: auto;
        }

        .window.visible ~ .dev-tools {
          opacity: 0;
          pointer-events: none;
        }

        .window.visible ~ .dev-tools .dev-tools-icon,
        .window.visible ~ .dev-tools .status-blip {
          transition: none;
          opacity: 0;
        }

        .window {
          border-radius: var(--dev-tools-border-radius);
          overflow: auto;
          margin: 0.5rem;
          min-width: 30rem;
          max-width: calc(100% - 1rem);
          max-height: calc(100vh - 1rem);
          flex-shrink: 1;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          display: flex;
          flex-direction: column;
          box-shadow: var(--dev-tools-box-shadow);
          outline: none;
        }

        .window-toolbar {
          display: flex;
          flex: none;
          align-items: center;
          padding: 0.375rem;
          white-space: nowrap;
          order: 1;
          background-color: rgba(0, 0, 0, 0.2);
          gap: 0.5rem;
        }

        .tab {
          color: var(--dev-tools-text-color-secondary);
          font: inherit;
          font-size: var(--dev-tools-font-size-small);
          font-weight: 500;
          line-height: 1;
          padding: 0.25rem 0.375rem;
          background: none;
          border: none;
          margin: 0;
          border-radius: 0.25rem;
          transition: var(--dev-tools-transition-duration);
        }

        .tab:hover,
        .tab.active {
          color: var(--dev-tools-text-color-active);
        }

        .tab.active {
          background-color: rgba(255, 255, 255, 0.12);
        }

        .tab.unreadErrors::after {
          content: '•';
          color: hsl(var(--dev-tools-red-hsl));
          font-size: 1.5rem;
          position: absolute;
          transform: translate(0, -50%);
        }

        .ahreflike {
          font-weight: 500;
          color: var(--dev-tools-text-color-secondary);
          text-decoration: underline;
          cursor: pointer;
        }

        .ahreflike:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .button {
          all: initial;
          font-family: inherit;
          font-size: var(--dev-tools-font-size-small);
          line-height: 1;
          white-space: nowrap;
          background-color: rgba(0, 0, 0, 0.2);
          color: inherit;
          font-weight: 600;
          padding: 0.25rem 0.375rem;
          border-radius: 0.25rem;
        }

        .button:focus,
        .button:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .minimize-button {
          flex: none;
          width: 1rem;
          height: 1rem;
          color: inherit;
          background-color: transparent;
          border: 0;
          padding: 0;
          margin: 0 0 0 auto;
          opacity: 0.8;
        }

        .minimize-button:hover {
          opacity: 1;
        }

        .minimize-button svg {
          max-width: 100%;
        }

        .message.information {
          --dev-tools-notification-color: var(--dev-tools-blue-color);
        }

        .message.warning {
          --dev-tools-notification-color: var(--dev-tools-yellow-color);
        }

        .message.error {
          --dev-tools-notification-color: var(--dev-tools-red-color);
        }

        .message {
          display: flex;
          padding: 0.1875rem 0.75rem 0.1875rem 2rem;
          background-clip: padding-box;
        }

        .message.log {
          padding-left: 0.75rem;
        }

        .message-content {
          margin-right: 0.5rem;
          -webkit-user-select: text;
          -moz-user-select: text;
          user-select: text;
        }

        .message-heading {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0.125rem 0;
        }

        .message.log {
          color: var(--dev-tools-text-color-secondary);
        }

        .message:not(.log) .message-heading {
          font-weight: 500;
        }

        .message.has-details .message-heading {
          color: var(--dev-tools-text-color-emphasis);
          font-weight: 600;
        }

        .message-heading::before {
          position: absolute;
          margin-left: -1.5rem;
          display: inline-block;
          text-align: center;
          font-size: 0.875em;
          font-weight: 600;
          line-height: calc(1.25em - 2px);
          width: 14px;
          height: 14px;
          box-sizing: border-box;
          border: 1px solid transparent;
          border-radius: 50%;
        }

        .message.information .message-heading::before {
          content: 'i';
          border-color: currentColor;
          color: var(--dev-tools-notification-color);
        }

        .message.warning .message-heading::before,
        .message.error .message-heading::before {
          content: '!';
          color: var(--dev-tools-background-color-active);
          background-color: var(--dev-tools-notification-color);
        }

        .features-tray {
          padding: 0.75rem;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .features-tray p {
          margin-top: 0;
          color: var(--dev-tools-text-color-secondary);
        }

        .features-tray .feature {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 0.5em;
        }

        .message .message-details {
          font-weight: 400;
          color: var(--dev-tools-text-color-secondary);
          margin: 0.25rem 0;
        }

        .message .message-details[hidden] {
          display: none;
        }

        .message .message-details p {
          display: inline;
          margin: 0;
          margin-right: 0.375em;
          word-break: break-word;
        }

        .message .persist {
          color: var(--dev-tools-text-color-secondary);
          white-space: nowrap;
          margin: 0.375rem 0;
          display: flex;
          align-items: center;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        .message .persist::before {
          content: '';
          width: 1em;
          height: 1em;
          border-radius: 0.2em;
          margin-right: 0.375em;
          background-color: rgba(255, 255, 255, 0.3);
        }

        .message .persist:hover::before {
          background-color: rgba(255, 255, 255, 0.4);
        }

        .message .persist.on::before {
          background-color: rgba(255, 255, 255, 0.9);
        }

        .message .persist.on::after {
          content: '';
          order: -1;
          position: absolute;
          width: 0.75em;
          height: 0.25em;
          border: 2px solid var(--dev-tools-background-color-active);
          border-width: 0 0 2px 2px;
          transform: translate(0.05em, -0.05em) rotate(-45deg) scale(0.8, 0.9);
        }

        .message .dismiss-message {
          font-weight: 600;
          align-self: stretch;
          display: flex;
          align-items: center;
          padding: 0 0.25rem;
          margin-left: 0.5rem;
          color: var(--dev-tools-text-color-secondary);
        }

        .message .dismiss-message:hover {
          color: var(--dev-tools-text-color);
        }

        .notification-tray {
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
          margin: 0.5rem;
          flex: none;
        }

        .window.hidden + .notification-tray {
          margin-bottom: 3rem;
        }

        .notification-tray .message {
          pointer-events: auto;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          max-width: 30rem;
          box-sizing: border-box;
          border-radius: var(--dev-tools-border-radius);
          margin-top: 0.5rem;
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          animation: slideIn var(--dev-tools-transition-duration);
          box-shadow: var(--dev-tools-box-shadow);
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }

        .notification-tray .message.animate-out {
          animation: slideOut forwards var(--dev-tools-transition-duration);
        }

        .notification-tray .message .message-details {
          max-height: 10em;
          overflow: hidden;
        }

        .message-tray {
          flex: auto;
          overflow: auto;
          max-height: 20rem;
          user-select: text;
        }

        .message-tray .message {
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          padding-left: 2.25rem;
        }

        .message-tray .message.warning {
          background-color: hsla(var(--dev-tools-yellow-hsl), 0.09);
        }

        .message-tray .message.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.09);
        }

        .message-tray .message.error .message-heading {
          color: hsl(var(--dev-tools-red-hsl));
        }

        .message-tray .message.warning .message-heading {
          color: hsl(var(--dev-tools-yellow-hsl));
        }

        .message-tray .message + .message {
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .message-tray .dismiss-message,
        .message-tray .persist {
          display: none;
        }

        .info-tray {
          padding: 0.75rem;
          position: relative;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .info-tray dl {
          margin: 0;
          display: grid;
          grid-template-columns: max-content 1fr;
          column-gap: 0.75rem;
          position: relative;
        }

        .info-tray dt {
          grid-column: 1;
          color: var(--dev-tools-text-color-emphasis);
        }

        .info-tray dt:not(:first-child)::before {
          content: '';
          width: 100%;
          position: absolute;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.1);
          margin-top: -0.375rem;
        }

        .info-tray dd {
          grid-column: 2;
          margin: 0;
        }

        .info-tray :is(dt, dd):not(:last-child) {
          margin-bottom: 0.75rem;
        }

        .info-tray dd + dd {
          margin-top: -0.5rem;
        }

        .info-tray .live-reload-status::before {
          content: '•';
          color: var(--status-color);
          width: 0.75rem;
          display: inline-block;
          font-size: 1rem;
          line-height: 0.5rem;
        }

        .info-tray .copy {
          position: fixed;
          z-index: 1;
          top: 0.5rem;
          right: 0.5rem;
        }

        .info-tray .switch {
          vertical-align: -4px;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0%);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
        }

        @keyframes bounce {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.5);
            background-color: hsla(var(--dev-tools-red-hsl), 1);
          }
          100% {
            transform: scale(1);
          }
        }

        @supports (backdrop-filter: blur(1px)) {
          .dev-tools,
          .window,
          .notification-tray .message {
            backdrop-filter: blur(8px);
          }
          .dev-tools:hover,
          .dev-tools.active,
          .window,
          .notification-tray .message {
            background-color: var(--dev-tools-background-color-active-blurred);
          }
        }
      `,mn]}static get isActive(){const t=window.sessionStorage.getItem(T.ACTIVE_KEY_IN_SESSION_STORAGE);return t===null||t!=="false"}static notificationDismissed(t){const e=window.localStorage.getItem(T.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);return e!==null&&e.includes(t)}elementTelemetry(){let t={};try{const e=localStorage.getItem("vaadin.statistics.basket");if(!e)return;t=JSON.parse(e)}catch{return}this.frontendConnection&&this.frontendConnection.send("reportTelemetry",{browserData:t})}openWebSocketConnection(){if(this.frontendStatus=S.UNAVAILABLE,this.javaStatus=S.UNAVAILABLE,!this.conf.token){console.error("Dev tools functionality denied for this host."),this.log(V.LOG,"See Vaadin documentation on how to configure devmode.hostsAllowed property.",void 0,"https://vaadin.com/docs/latest/configuration/properties#properties",void 0);return}const t=n=>this.log(V.ERROR,n),e=()=>{this.showSplashMessage("Reloading…");const n=window.sessionStorage.getItem(T.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE),s=n?parseInt(n,10)+1:1;window.sessionStorage.setItem(T.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE,s.toString()),window.sessionStorage.setItem(T.TRIGGERED_KEY_IN_SESSION_STORAGE,"true"),window.location.reload()},o=(n,s)=>{let r=document.head.querySelector(`style[data-file-path='${n}']`);r?(this.log(V.INFORMATION,"Hot update of "+n),r.textContent=s,document.dispatchEvent(new CustomEvent("vaadin-theme-updated"))):e()},i=new bn(this.getDedicatedWebSocketUrl());i.onHandshake=()=>{this.log(V.LOG,"Vaadin development mode initialized"),T.isActive||i.setActive(!1),this.elementTelemetry()},i.onConnectionError=t,i.onReload=e,i.onUpdate=o,i.onStatusChange=n=>{this.frontendStatus=n},i.onMessage=n=>this.handleFrontendMessage(n),this.frontendConnection=i,this.conf.backend===T.SPRING_BOOT_DEVTOOLS?(this.javaConnection=new mr(this.getSpringBootWebSocketUrl(window.location)),this.javaConnection.onHandshake=()=>{T.isActive||this.javaConnection.setActive(!1)},this.javaConnection.onReload=e,this.javaConnection.onConnectionError=t,this.javaConnection.onStatusChange=n=>{this.javaStatus=n},this.javaConnection.onHandshake=()=>{this.conf.backend&&this.log(V.INFORMATION,`Java live reload available: ${T.BACKEND_DISPLAY_NAME[this.conf.backend]}`)}):(this.conf.backend===T.HOTSWAP_AGENT||this.conf.backend===T.JREBEL)&&(this.frontendConnection.onHandshake=()=>{this.conf.backend&&this.log(V.INFORMATION,`Java live reload available: ${T.BACKEND_DISPLAY_NAME[this.conf.backend]}`)}),this.conf.backend||this.showNotification(V.WARNING,"Java live reload unavailable","Live reload for Java changes is currently not set up. Find out how to make use of this functionality to boost your workflow.","https://vaadin.com/docs/latest/flow/configuration/live-reload","liveReloadUnavailable")}tabHandleMessage(t,e){const o=t;return o.handleMessage&&o.handleMessage.call(t,e)}handleFrontendMessage(t){for(const e of this.tabs)if(e.element&&this.tabHandleMessage(e.element,t))return;if(t.command==="featureFlags")this.features=t.data.features;else if(t.command==="themeEditorState"){const e=!!window.Vaadin.Flow;this.themeEditorState=t.data,e&&this.themeEditorState!==Ve.disabled&&(this.tabs.push({id:"theme-editor",title:"Theme Editor (Preview)",render:()=>this.renderThemeEditor()}),this.requestUpdate())}else cr(t)||this.unhandledMessages.push(t)}getDedicatedWebSocketUrl(){function t(o){const i=document.createElement("div");return i.innerHTML=`<a href="${o}"/>`,i.firstChild.href}if(this.conf.url===void 0)return;const e=t(this.conf.url);if(!e.startsWith("http://")&&!e.startsWith("https://")){console.error("The protocol of the url should be http or https for live reload to work.");return}return`${e}?v-r=push&debug_window&token=${this.conf.token}`}getSpringBootWebSocketUrl(t){const{hostname:e}=t,o=t.protocol==="https:"?"wss":"ws";if(e.endsWith("gitpod.io")){const i=e.replace(/.*?-/,"");return`${o}://${this.conf.liveReloadPort}-${i}`}else return`${o}://${e}:${this.conf.liveReloadPort}`}constructor(){super(),this.unhandledMessages=[],this.conf={enable:!1,url:"",liveReloadPort:-1},this.expanded=!1,this.messages=[],this.notifications=[],this.frontendStatus=S.UNAVAILABLE,this.javaStatus=S.UNAVAILABLE,this.tabs=[{id:"log",title:"Log",render:"vaadin-dev-tools-log"},{id:"info",title:"Info",render:"vaadin-dev-tools-info"},{id:"features",title:"Feature Flags",render:()=>this.renderFeatures()}],this.activeTab="log",this.features=[],this.unreadErrors=!1,this.componentPickActive=!1,this.themeEditorState=Ve.disabled,this.nextMessageId=1,this.transitionDuration=0,window.Vaadin.Flow&&this.tabs.push({id:"code",title:"Code",render:()=>this.renderCode()})}connectedCallback(){if(super.connectedCallback(),this.catchErrors(),this.conf=window.Vaadin.devToolsConf||this.conf,this.disableEventListener=o=>this.demoteSplashMessage(),document.body.addEventListener("focus",this.disableEventListener),document.body.addEventListener("click",this.disableEventListener),window.sessionStorage.getItem(T.TRIGGERED_KEY_IN_SESSION_STORAGE)){const o=new Date,i=`${`0${o.getHours()}`.slice(-2)}:${`0${o.getMinutes()}`.slice(-2)}:${`0${o.getSeconds()}`.slice(-2)}`;this.showSplashMessage(`Page reloaded at ${i}`),window.sessionStorage.removeItem(T.TRIGGERED_KEY_IN_SESSION_STORAGE)}this.transitionDuration=parseInt(window.getComputedStyle(this).getPropertyValue("--dev-tools-transition-duration"),10);const t=window;t.Vaadin=t.Vaadin||{},t.Vaadin.devTools=Object.assign(this,t.Vaadin.devTools),document.documentElement.addEventListener("vaadin-overlay-outside-click",o=>{const i=o,n=i.target.owner;n&&pr(this,n)||i.detail.sourceEvent.composedPath().includes(this)&&o.preventDefault()});const e=window.Vaadin;e.devToolsPlugins&&(Array.from(e.devToolsPlugins).forEach(o=>this.initPlugin(o)),e.devToolsPlugins={push:o=>this.initPlugin(o)}),this.openWebSocketConnection(),hr()}async initPlugin(t){const e=this;t.init({addTab:(o,i)=>{e.tabs.push({id:o,title:o,render:i})},send:function(o,i){e.frontendConnection.send(o,i)}})}format(t){return t.toString()}catchErrors(){const t=window.Vaadin.ConsoleErrors;t&&t.forEach(e=>{this.log(V.ERROR,e.map(o=>this.format(o)).join(" "))}),window.Vaadin.ConsoleErrors={push:e=>{this.log(V.ERROR,e.map(o=>this.format(o)).join(" "))}}}disconnectedCallback(){this.disableEventListener&&(document.body.removeEventListener("focus",this.disableEventListener),document.body.removeEventListener("click",this.disableEventListener)),super.disconnectedCallback()}toggleExpanded(){this.notifications.slice().forEach(t=>this.dismissNotification(t.id)),this.expanded=!this.expanded,this.expanded&&this.root.focus()}showSplashMessage(t){this.splashMessage=t,this.splashMessage&&(this.expanded?this.demoteSplashMessage():setTimeout(()=>{this.demoteSplashMessage()},T.AUTO_DEMOTE_NOTIFICATION_DELAY))}demoteSplashMessage(){this.splashMessage&&this.log(V.LOG,this.splashMessage),this.showSplashMessage(void 0)}checkLicense(t){this.frontendConnection?this.frontendConnection.send("checkLicense",t):pn({message:"Internal error: no connection",product:t})}log(t,e,o,i,n){const s=this.nextMessageId;for(this.nextMessageId+=1,this.messages.push({id:s,type:t,message:e,details:o,link:i,dontShowAgain:!1,dontShowAgainMessage:n,deleted:!1});this.messages.length>T.MAX_LOG_ROWS;)this.messages.shift();this.requestUpdate(),this.updateComplete.then(()=>{const r=this.renderRoot.querySelector(".message-tray .message:last-child");this.expanded&&r?(setTimeout(()=>r.scrollIntoView({behavior:"smooth"}),this.transitionDuration),this.unreadErrors=!1):t===V.ERROR&&(this.unreadErrors=!0)})}showNotification(t,e,o,i,n,s){if(n===void 0||!T.notificationDismissed(n)){if(this.notifications.filter(l=>l.persistentId===n).filter(l=>!l.deleted).length>0)return;const r=this.nextMessageId;this.nextMessageId+=1,this.notifications.push({id:r,type:t,message:e,details:o,link:i,persistentId:n,dontShowAgain:!1,dontShowAgainMessage:s,deleted:!1}),i===void 0&&setTimeout(()=>{this.dismissNotification(r)},T.AUTO_DEMOTE_NOTIFICATION_DELAY),this.requestUpdate()}else this.log(t,e,o,i)}dismissNotification(t){const e=this.findNotificationIndex(t);if(e!==-1&&!this.notifications[e].deleted){const o=this.notifications[e];if(o.dontShowAgain&&o.persistentId&&!T.notificationDismissed(o.persistentId)){let i=window.localStorage.getItem(T.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);i=i===null?o.persistentId:`${i},${o.persistentId}`,window.localStorage.setItem(T.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE,i)}o.deleted=!0,this.log(o.type,o.message,o.details,o.link),setTimeout(()=>{const i=this.findNotificationIndex(t);i!==-1&&(this.notifications.splice(i,1),this.requestUpdate())},this.transitionDuration)}}findNotificationIndex(t){let e=-1;return this.notifications.some((o,i)=>o.id===t?(e=i,!0):!1),e}toggleDontShowAgain(t){const e=this.findNotificationIndex(t);if(e!==-1&&!this.notifications[e].deleted){const o=this.notifications[e];o.dontShowAgain=!o.dontShowAgain,this.requestUpdate()}}setActive(t){var e,o;(e=this.frontendConnection)==null||e.setActive(t),(o=this.javaConnection)==null||o.setActive(t),window.sessionStorage.setItem(T.ACTIVE_KEY_IN_SESSION_STORAGE,t?"true":"false")}getStatusColor(t){return t===S.ACTIVE?"var(--dev-tools-green-color)":t===S.INACTIVE?"var(--dev-tools-grey-color)":t===S.UNAVAILABLE?"var(--dev-tools-yellow-color)":t===S.ERROR?"var(--dev-tools-red-color)":"none"}renderMessage(t){return y`
      <div
        class="message ${t.type} ${t.deleted?"animate-out":""} ${t.details||t.link?"has-details":""}"
      >
        <div class="message-content">
          <div class="message-heading">${t.message}</div>
          <div class="message-details" ?hidden="${!t.details&&!t.link}">
            ${t.details?y`<p>${t.details}</p>`:""}
            ${t.link?y`<a class="ahreflike" href="${t.link}" target="_blank">Learn more</a>`:""}
          </div>
          ${t.persistentId?y`<div
                class="persist ${t.dontShowAgain?"on":"off"}"
                @click=${()=>this.toggleDontShowAgain(t.id)}
              >
                ${t.dontShowAgainMessage||"Don’t show again"}
              </div>`:""}
        </div>
        <div class="dismiss-message" @click=${()=>this.dismissNotification(t.id)}>Dismiss</div>
      </div>
    `}render(){return y` <div
        class="window ${this.expanded&&!this.componentPickActive?"visible":"hidden"}"
        tabindex="0"
        @keydown=${t=>t.key==="Escape"&&this.expanded&&this.toggleExpanded()}
      >
        <div class="window-toolbar">
          ${this.tabs.map(t=>y`<button
                class=${So({tab:!0,active:this.activeTab===t.id,unreadErrors:t.id==="log"&&this.unreadErrors})}
                id="${t.id}"
                @click=${()=>{const e=this.tabs.find(n=>n.id===this.activeTab);if(e&&e.element){const n=typeof e.render=="function"?e.element.firstElementChild:e.element,s=n==null?void 0:n.deactivate;s&&s.call(n)}this.activeTab=t.id;const o=typeof t.render=="function"?t.element.firstElementChild:t.element,i=o.activate;i&&i.call(o)}}
              >
                ${t.title}
              </button> `)}
          <button class="minimize-button" title="Minimize" @click=${()=>this.toggleExpanded()}>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="#fff" opacity=".8">
                <path
                  d="m7.25 1.75c0-.41421.33579-.75.75-.75h3.25c2.0711 0 3.75 1.67893 3.75 3.75v6.5c0 2.0711-1.6789 3.75-3.75 3.75h-6.5c-2.07107 0-3.75-1.6789-3.75-3.75v-3.25c0-.41421.33579-.75.75-.75s.75.33579.75.75v3.25c0 1.2426 1.00736 2.25 2.25 2.25h6.5c1.2426 0 2.25-1.0074 2.25-2.25v-6.5c0-1.24264-1.0074-2.25-2.25-2.25h-3.25c-.41421 0-.75-.33579-.75-.75z"
                />
                <path
                  d="m2.96967 2.96967c.29289-.29289.76777-.29289 1.06066 0l5.46967 5.46967v-2.68934c0-.41421.33579-.75.75-.75.4142 0 .75.33579.75.75v4.5c0 .4142-.3358.75-.75.75h-4.5c-.41421 0-.75-.3358-.75-.75 0-.41421.33579-.75.75-.75h2.68934l-5.46967-5.46967c-.29289-.29289-.29289-.76777 0-1.06066z"
                />
              </g>
            </svg>
          </button>
        </div>
        <div id="tabContainer"></div>
      </div>

      <div class="notification-tray">${this.notifications.map(t=>this.renderMessage(t))}</div>
      <vaadin-dev-tools-component-picker
        .active=${this.componentPickActive}
        @component-picker-opened=${()=>{this.componentPickActive=!0}}
        @component-picker-closed=${()=>{this.componentPickActive=!1}}
      ></vaadin-dev-tools-component-picker>
      <div
        style="display: var(--dev-tools-button-display, 'block')"
        class="dev-tools ${this.splashMessage?"active":""}${this.unreadErrors?" error":""}"
        @click=${()=>this.toggleExpanded()}
      >
        ${this.unreadErrors?y`<svg
              fill="none"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="dev-tools-icon error"
            >
              <clipPath id="a"><path d="m0 0h16v16h-16z" /></clipPath>
              <g clip-path="url(#a)">
                <path
                  d="m6.25685 2.09894c.76461-1.359306 2.72169-1.359308 3.4863 0l5.58035 9.92056c.7499 1.3332-.2135 2.9805-1.7432 2.9805h-11.1606c-1.529658 0-2.4930857-1.6473-1.743156-2.9805z"
                  fill="#ff5c69"
                />
                <path
                  d="m7.99699 4c-.45693 0-.82368.37726-.81077.834l.09533 3.37352c.01094.38726.32803.69551.71544.69551.38741 0 .70449-.30825.71544-.69551l.09533-3.37352c.0129-.45674-.35384-.834-.81077-.834zm.00301 8c.60843 0 1-.3879 1-.979 0-.5972-.39157-.9851-1-.9851s-1 .3879-1 .9851c0 .5911.39157.979 1 .979z"
                  fill="#fff"
                />
              </g>
            </svg>`:y`<svg
              fill="none"
              height="17"
              viewBox="0 0 16 17"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              class="dev-tools-icon logo"
            >
              <g fill="#fff">
                <path
                  d="m8.88273 5.97926c0 .04401-.0032.08898-.00801.12913-.02467.42848-.37813.76767-.8117.76767-.43358 0-.78704-.34112-.81171-.76928-.00481-.04015-.00801-.08351-.00801-.12752 0-.42784-.10255-.87656-1.14434-.87656h-3.48364c-1.57118 0-2.315271-.72849-2.315271-2.21758v-1.26683c0-.42431.324618-.768314.748261-.768314.42331 0 .74441.344004.74441.768314v.42784c0 .47924.39576.81265 1.11293.81265h3.41538c1.5542 0 1.67373 1.156 1.725 1.7679h.03429c.05095-.6119.17048-1.7679 1.72468-1.7679h3.4154c.7172 0 1.0145-.32924 1.0145-.80847l-.0067-.43202c0-.42431.3227-.768314.7463-.768314.4234 0 .7255.344004.7255.768314v1.26683c0 1.48909-.6181 2.21758-2.1893 2.21758h-3.4836c-1.04182 0-1.14437.44872-1.14437.87656z"
                />
                <path
                  d="m8.82577 15.1648c-.14311.3144-.4588.5335-.82635.5335-.37268 0-.69252-.2249-.83244-.5466-.00206-.0037-.00412-.0073-.00617-.0108-.00275-.0047-.00549-.0094-.00824-.0145l-3.16998-5.87318c-.08773-.15366-.13383-.32816-.13383-.50395 0-.56168.45592-1.01879 1.01621-1.01879.45048 0 .75656.22069.96595.6993l2.16882 4.05042 2.17166-4.05524c.2069-.47379.513-.69448.9634-.69448.5603 0 1.0166.45711 1.0166 1.01879 0 .17579-.0465.35029-.1348.50523l-3.1697 5.8725c-.00503.0096-.01006.0184-.01509.0272-.00201.0036-.00402.0071-.00604.0106z"
                />
              </g>
            </svg>`}

        <span
          class="status-blip"
          style="background: linear-gradient(to right, ${this.getStatusColor(this.frontendStatus)} 50%, ${this.getStatusColor(this.conf.backend===T.HOTSWAP_AGENT||this.conf.backend===T.JREBEL?this.frontendStatus:this.javaStatus)} 50%)"
        ></span>
        ${this.splashMessage?y`<span class="status-description">${this.splashMessage}</span></div>`:k}
      </div>`}updated(t){var e;super.updated(t);const o=this.renderRoot.querySelector("#tabContainer"),i=[];if(this.tabs.forEach(s=>{s.element||(typeof s.render=="function"?s.element=document.createElement("div"):(s.element=document.createElement(s.render),s.element._devTools=this),i.push(s.element))}),(o==null?void 0:o.childElementCount)!==this.tabs.length){for(let s=0;s<this.tabs.length;s++){const r=this.tabs[s];o.childElementCount>s&&o.children[s]===r.element||o.insertBefore(r.element,o.children[s])}for(;(o==null?void 0:o.childElementCount)>this.tabs.length;)(e=o.lastElementChild)==null||e.remove()}for(const s of this.tabs){typeof s.render=="function"?be(s.render(),s.element):s.element.requestUpdate&&s.element.requestUpdate();const r=s.id===this.activeTab;s.element.hidden=!r}for(const s of i)for(var n=0;n<this.unhandledMessages.length;n++)this.tabHandleMessage(s,this.unhandledMessages[n])&&(this.unhandledMessages.splice(n,1),n--)}renderCode(){return y`<div class="info-tray">
      <div>
        <select id="locationType">
          <option value="create" selected>Create</option>
          <option value="attach">Attach</option>
        </select>
        <button
          class="button pick"
          @click=${async()=>{await f(()=>Promise.resolve().then(()=>ya),void 0),this.componentPicker.open({infoTemplate:y`
                <div>
                  <h3>Locate a component in source code</h3>
                  <p>Use the mouse cursor to highlight components in the UI.</p>
                  <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
                  <p>
                    Click the primary mouse button to open the corresponding source code line of the highlighted
                    component in your IDE.
                  </p>
                </div>
              `,pickCallback:t=>{const e={nodeId:t.nodeId,uiId:t.uiId};this.renderRoot.querySelector("#locationType").value==="create"?this.frontendConnection.send("showComponentCreateLocation",e):this.frontendConnection.send("showComponentAttachLocation",e)}})}}
        >
          Find component in code
        </button>
      </div>
      </div>
    </div>`}renderFeatures(){return y`<div class="features-tray">
      ${this.features.map(t=>y`<div class="feature">
          <label class="switch">
            <input
              class="feature-toggle"
              id="feature-toggle-${t.id}"
              type="checkbox"
              ?checked=${t.enabled}
              @change=${e=>this.toggleFeatureFlag(e,t)}
            />
            <span class="slider"></span>
            ${t.title}
          </label>
          <a class="ahreflike" href="${t.moreInfoLink}" target="_blank">Learn more</a>
        </div>`)}
    </div>`}setJavaLiveReloadActive(t){var e;this.javaConnection?this.javaConnection.setActive(t):(e=this.frontendConnection)==null||e.setActive(t)}renderThemeEditor(){return y` <vaadin-dev-tools-theme-editor
      .expanded=${this.expanded}
      .themeEditorState=${this.themeEditorState}
      .pickerProvider=${()=>this.componentPicker}
      .connection=${this.frontendConnection}
      @before-open=${()=>this.setJavaLiveReloadActive(!1)}
      @after-close=${()=>this.setJavaLiveReloadActive(!0)}
    ></vaadin-dev-tools-theme-editor>`}toggleFeatureFlag(t,e){const o=t.target.checked;this.frontendConnection?(this.frontendConnection.send("setFeature",{featureId:e.id,enabled:o}),this.showNotification(V.INFORMATION,`“${e.title}” ${o?"enabled":"disabled"}`,e.requiresServerRestart?"This feature requires a server restart":void 0,void 0,`feature${e.id}${o?"Enabled":"Disabled"}`)):this.log(V.ERROR,`Unable to toggle feature ${e.title}: No server connection available`)}};x.MAX_LOG_ROWS=1e3;x.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE="vaadin.live-reload.dismissedNotifications";x.ACTIVE_KEY_IN_SESSION_STORAGE="vaadin.live-reload.active";x.TRIGGERED_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggered";x.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggeredCount";x.AUTO_DEMOTE_NOTIFICATION_DELAY=5e3;x.HOTSWAP_AGENT="HOTSWAP_AGENT";x.JREBEL="JREBEL";x.SPRING_BOOT_DEVTOOLS="SPRING_BOOT_DEVTOOLS";x.BACKEND_DISPLAY_NAME={HOTSWAP_AGENT:"HotswapAgent",JREBEL:"JRebel",SPRING_BOOT_DEVTOOLS:"Spring Boot Devtools"};v([b({type:Boolean,attribute:!1})],x.prototype,"expanded",void 0);v([b({type:Array,attribute:!1})],x.prototype,"messages",void 0);v([b({type:String,attribute:!1})],x.prototype,"splashMessage",void 0);v([b({type:Array,attribute:!1})],x.prototype,"notifications",void 0);v([b({type:String,attribute:!1})],x.prototype,"frontendStatus",void 0);v([b({type:String,attribute:!1})],x.prototype,"javaStatus",void 0);v([I()],x.prototype,"tabs",void 0);v([I()],x.prototype,"activeTab",void 0);v([I()],x.prototype,"features",void 0);v([I()],x.prototype,"unreadErrors",void 0);v([tt(".window")],x.prototype,"root",void 0);v([tt("vaadin-dev-tools-component-picker")],x.prototype,"componentPicker",void 0);v([I()],x.prototype,"componentPickActive",void 0);v([I()],x.prototype,"themeEditorState",void 0);x=T=v([U("vaadin-dev-tools")],x);export{br as A,en as C,Ys as D,ee as I,N as L,oe as N,le as O,Ks as P,ba as R,yr as S,_r as T,uo as _,Se as a,R as b,$ as c,Js as d,wa as e,gr as f,Ea as g,y as h,Ra as i,Na as j,k as n,be as r,Ne as s,ps as u};
