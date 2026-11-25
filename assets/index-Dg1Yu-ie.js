(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const ie={apiKey:"",authDomain:"",projectId:"",storageBucket:"",messagingSenderId:"",appId:""},dn="",ee=!!(ie.apiKey&&ie.projectId&&ie.appId),Ce=typeof location<"u"&&["localhost","127.0.0.1"].includes(location.hostname),un=()=>{};var tt={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const St=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},hn=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},$e={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,l=c?t[s+2]:0,f=i>>2,h=(i&3)<<4|a>>4;let b=(a&15)<<2|l>>6,p=l&63;c||(p=64,o||(b=64)),r.push(n[f],n[h],n[b],n[p])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(St(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):hn(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||a==null||l==null||h==null)throw new fn;const b=i<<2|a>>4;if(r.push(b),l!==64){const p=a<<4&240|l>>2;if(r.push(p),h!==64){const A=l<<6&192|h;r.push(A)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class fn extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const pn=function(t){const e=St(t);return $e.encodeByteArray(e,!0)},Ot=function(t){return pn(t).replace(/\./g,"")},gn=function(t){try{return $e.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(t){return Rt(void 0,t)}function Rt(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!mn(n)||(t[n]=Rt(t[n],e[n]));return t}function mn(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yn=()=>xe().__FIREBASE_DEFAULTS__,bn=()=>{if(typeof process>"u"||typeof tt>"u")return;const t=tt.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},En=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&gn(t[1]);return e&&JSON.parse(e)},wn=()=>{try{return un()||yn()||bn()||En()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},vt=()=>{var t;return(t=wn())==null?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}function Be(){try{return typeof indexedDB=="object"}catch{return!1}}function _n(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const An="FirebaseError";class z extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=An,Object.setPrototypeOf(this,z.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Fe.prototype.create)}}class Fe{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?In(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new z(s,a,r)}}function In(t,e){try{let n=0,r="";for(;n<t.length;){const s=t.indexOf("{$",n);if(s===-1){r+=t.substring(n);break}const i=t.indexOf("}",s+2);if(i===-1){r+=t.substring(n);break}const o=t.substring(s+2,i),a=e[o];r+=t.substring(n,s)+(a!=null?String(a):`<${o}?>`),n=i+1}return r}catch{return t}}function Te(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(nt(i)&&nt(o)){if(!Te(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function nt(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cn=1e3,Tn=2,Sn=14400*1e3,On=.5;function Rn(t,e=Cn,n=Tn){const r=e*Math.pow(n,t),s=Math.round(On*r*(Math.random()-.5)*2);return Math.min(Sn,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kt(t){return t&&t._delegate?t._delegate:t}class G{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new X;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Dn(e))try{this.getOrInitializeService({instanceIdentifier:$})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=$){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$){return this.instances.has(e)}getOptions(e=$){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:kn(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=$){return this.component?this.component.multipleInstances?e:$:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function kn(t){return t===$?void 0:t}function Dn(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new vn(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var g;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(g||(g={}));const Pn={debug:g.DEBUG,verbose:g.VERBOSE,info:g.INFO,warn:g.WARN,error:g.ERROR,silent:g.SILENT},Ln=g.INFO,Mn={[g.DEBUG]:"log",[g.VERBOSE]:"log",[g.INFO]:"info",[g.WARN]:"warn",[g.ERROR]:"error"},$n=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=Mn[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ue{constructor(e){this.name=e,this._logLevel=Ln,this._logHandler=$n,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in g))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Pn[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,g.DEBUG,...e),this._logHandler(this,g.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,g.VERBOSE,...e),this._logHandler(this,g.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,g.INFO,...e),this._logHandler(this,g.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,g.WARN,...e),this._logHandler(this,g.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,g.ERROR,...e),this._logHandler(this,g.ERROR,...e)}}const xn=(t,e)=>e.some(n=>t instanceof n);let rt,st;function Bn(){return rt||(rt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Fn(){return st||(st=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Dt=new WeakMap,Se=new WeakMap,Nt=new WeakMap,ue=new WeakMap,Ge=new WeakMap;function Un(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(M(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Dt.set(n,t)}).catch(()=>{}),Ge.set(e,t),e}function Gn(t){if(Se.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Se.set(t,e)}let Oe={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Se.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Nt.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return M(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Hn(t){Oe=t(Oe)}function jn(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(he(this),e,...n);return Nt.set(r,e.sort?e.sort():[e]),M(r)}:Fn().includes(t)?function(...e){return t.apply(he(this),e),M(Dt.get(this))}:function(...e){return M(t.apply(he(this),e))}}function Vn(t){return typeof t=="function"?jn(t):(t instanceof IDBTransaction&&Gn(t),xn(t,Bn())?new Proxy(t,Oe):t)}function M(t){if(t instanceof IDBRequest)return Un(t);if(ue.has(t))return ue.get(t);const e=Vn(t);return e!==t&&(ue.set(t,e),Ge.set(e,t)),e}const he=t=>Ge.get(t);function qn(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=M(o);return r&&o.addEventListener("upgradeneeded",c=>{r(M(o.result),c.oldVersion,c.newVersion,M(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const zn=["get","getKey","getAll","getAllKeys","count"],Wn=["put","add","delete","clear"],fe=new Map;function it(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(fe.get(e))return fe.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Wn.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||zn.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),s&&c.done]))[0]};return fe.set(e,i),i}Hn(t=>({...t,get:(e,n,r)=>it(e,n)||t.get(e,n,r),has:(e,n)=>!!it(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Jn(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Jn(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Re="@firebase/app",ot="0.16.7";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R=new Ue("@firebase/app"),Yn="@firebase/app-compat",Xn="@firebase/analytics-compat",Qn="@firebase/analytics",Zn="@firebase/app-check-compat",er="@firebase/app-check",tr="@firebase/auth",nr="@firebase/auth-compat",rr="@firebase/crashlytics",sr="@firebase/database",ir="@firebase/data-connect",or="@firebase/database-compat",ar="@firebase/functions",cr="@firebase/functions-compat",lr="@firebase/installations",dr="@firebase/installations-compat",ur="@firebase/messaging",hr="@firebase/messaging-compat",fr="@firebase/performance",pr="@firebase/performance-compat",gr="@firebase/remote-config",mr="@firebase/remote-config-compat",yr="@firebase/storage",br="@firebase/storage-compat",Er="@firebase/firestore",wr="@firebase/ai",_r="@firebase/firestore-compat",Ar="firebase";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ve="[DEFAULT]",Ir={[Re]:"fire-core",[Yn]:"fire-core-compat",[Qn]:"fire-analytics",[Xn]:"fire-analytics-compat",[er]:"fire-app-check",[Zn]:"fire-app-check-compat",[tr]:"fire-auth",[nr]:"fire-auth-compat",[rr]:"fire-cls",[sr]:"fire-rtdb",[ir]:"fire-data-connect",[or]:"fire-rtdb-compat",[ar]:"fire-fn",[cr]:"fire-fn-compat",[lr]:"fire-iid",[dr]:"fire-iid-compat",[ur]:"fire-fcm",[hr]:"fire-fcm-compat",[fr]:"fire-perf",[pr]:"fire-perf-compat",[gr]:"fire-rc",[mr]:"fire-rc-compat",[yr]:"fire-gcs",[br]:"fire-gcs-compat",[Er]:"fire-fst",[_r]:"fire-fst-compat",[wr]:"fire-vertex","fire-js":"fire-js",[Ar]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oe=new Map,Cr=new Map,ke=new Map;function at(t,e){try{t.container.addComponent(e)}catch(n){R.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function V(t){const e=t.name;if(ke.has(e))return R.debug(`There were multiple attempts to register component ${e}.`),!1;ke.set(e,t);for(const n of oe.values())at(n,t);for(const n of Cr.values())at(n,t);return!0}function He(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Tr(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sr={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},D=new Fe("app","Firebase",Sr);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new G("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw D.create("app-deleted",{appName:this._name})}}function Pt(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:ve,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw D.create("bad-app-name",{appName:String(s)});if(n||(n=vt()),!n)throw D.create("no-options");const i=oe.get(s);if(i)if(Te(n,i.options)){if(Te(r,i.config))return i;throw D.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(r)})}else throw D.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(n)});const o=new Nn(s);for(const c of ke.values())o.addComponent(c);const a=new Or(n,r,o);return oe.set(s,a),a}function Lt(t=ve){const e=oe.get(t);if(!e&&t===ve&&vt())return Pt();if(!e)throw D.create("no-app",{appName:t});return e}function F(t,e,n){let r=Ir[t]??t;n&&(r+=`-${n}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),R.warn(o.join(" "));return}V(new G(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rr="firebase-heartbeat-database",vr=1,Q="firebase-heartbeat-store";let pe=null;function Mt(){return pe||(pe=qn(Rr,vr,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Q)}catch(n){console.warn(n)}}}}).catch(t=>{throw D.create("idb-open",{originalErrorMessage:t.message})})),pe}async function kr(t){try{const n=(await Mt()).transaction(Q),r=await n.objectStore(Q).get($t(t));return await n.done,r}catch(e){if(e instanceof z)R.warn(e.message);else{const n=D.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});R.warn(n.message)}}}async function ct(t,e){try{const r=(await Mt()).transaction(Q,"readwrite");await r.objectStore(Q).put(e,$t(t)),await r.done}catch(n){if(n instanceof z)R.warn(n.message);else{const r=D.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});R.warn(r.message)}}}function $t(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dr=1024,Nr=30;class Pr{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Mr(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=lt();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Nr){const o=$r(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){R.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=lt(),{heartbeatsToSend:r,unsentEntries:s}=Lr(this._heartbeatsCache.heartbeats),i=Ot(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return R.warn(n),""}}}function lt(){return new Date().toISOString().substring(0,10)}function Lr(t,e=Dr){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),dt(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),dt(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Mr{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Be()?_n().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await kr(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return ct(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return ct(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function dt(t){return Ot(JSON.stringify({version:2,heartbeats:t})).length}function $r(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xr(t){V(new G("platform-logger",e=>new Kn(e),"PRIVATE")),V(new G("heartbeat",e=>new Pr(e),"PRIVATE")),F(Re,ot,t),F(Re,ot,"esm2020"),F("fire-js","")}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const De="firebase-js-sdk-policy",Br=["https://www.googletagmanager.com/gtag/js","https://apis.google.com/js/api.js","https://www.google.com/recaptcha/api.js","https://www.google.com/recaptcha/enterprise.js"];let te,xt=!1;function Bt(t){if(!Br.some(n=>t.startsWith(n)&&(t.length===n.length||t.charAt(n.length)==="?")))throw new TypeError(`Firebase: Refusing to load untrusted script URL: ${t}`);return t}function Fr(){if(te===void 0){te=null;const t=typeof window<"u"?window.trustedTypes:void 0;if(t!=null&&t.createPolicy)try{te=t.createPolicy(De,{createScriptURL:Bt})}catch{xt=!0}}return te}function Ur(t,e){Bt(e);const n=Fr();if(n){t.src=n.createScriptURL(e);return}try{t.src=e}catch(r){throw xt&&R.error(`Unable to load ${e} because this page requires Trusted Types for scripts but does not allow the "${De}" Trusted Types policy. To fix this, add "${De}" to the trusted-types directive of the page's Content-Security-Policy.`),r}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */xr("");var Gr="firebase",Hr="13.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */F(Gr,Hr,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ne=new Map,Ft={activated:!1,tokenObservers:[]},jr={initialized:!1,enabled:!1};function _(t){return Ne.get(t)||{...Ft}}function Vr(t,e){return Ne.set(t,e),Ne.get(t)}function le(){return jr}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut="https://content-firebaseappcheck.googleapis.com/v1",qr="exchangeRecaptchaEnterpriseToken",zr="exchangeDebugToken",ut={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},Wr=1440*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kr{constructor(e,n,r,s,i){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=r,this.lowerBound=s,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=s,s>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new X,this.pending.promise.catch(n=>{}),await Jr(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new X,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function Jr(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yr={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},C=new Fe("appCheck","AppCheck",Yr);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(t=!1){var e;return t?(e=self.grecaptcha)==null?void 0:e.enterprise:self.grecaptcha}function je(t){if(!_(t).activated)throw C.create("use-before-activation",{appName:t.name})}function Gt(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),r=Math.floor((e-n*3600*24)/3600),s=Math.floor((e-n*3600*24-r*3600)/60),i=e-n*3600*24-r*3600-s*60;let o="";return n&&(o+=ne(n)+"d:"),r&&(o+=ne(r)+"h:"),o+=ne(s)+"m:"+ne(i)+"s",o}function ne(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ve({url:t,body:e},n){const r={"Content-Type":"application/json"},s=n.getImmediate({optional:!0});if(s){const h=await s.getHeartbeatsHeader();h&&(r["X-Firebase-Client"]=h)}const i={method:"POST",body:JSON.stringify(e),headers:r};let o;try{o=await fetch(t,i)}catch(h){throw C.create("fetch-network-error",{originalErrorMessage:h==null?void 0:h.message})}if(o.status!==200)throw C.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(h){throw C.create("fetch-parse-error",{originalErrorMessage:h==null?void 0:h.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw C.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,f=Date.now();return{token:a.token,expireTimeMillis:f+l,issuedAtTimeMillis:f}}function Xr(t,e){const{projectId:n,appId:r,apiKey:s}=t.options;return{url:`${Ut}/projects/${n}/apps/${r}:${qr}?key=${s}`,body:{recaptcha_enterprise_token:e}}}function Ht(t,e){const{projectId:n,appId:r,apiKey:s}=t.options;return{url:`${Ut}/projects/${n}/apps/${r}:${zr}?key=${s}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr="firebase-app-check-database",Zr=1,Z="firebase-app-check-store",jt="debug-token";let re=null;function Vt(){return re||(re=new Promise((t,e)=>{try{const n=indexedDB.open(Qr,Zr);n.onsuccess=r=>{t(r.target.result)},n.onerror=r=>{var s;e(C.create("storage-open",{originalErrorMessage:(s=r.target.error)==null?void 0:s.message}))},n.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:s.createObjectStore(Z,{keyPath:"compositeKey"})}}}catch(n){e(C.create("storage-open",{originalErrorMessage:n==null?void 0:n.message}))}}),re)}function es(t){return zt(Wt(t))}function ts(t,e){return qt(Wt(t),e)}function ns(t){return qt(jt,t)}function rs(){return zt(jt)}async function qt(t,e){const r=(await Vt()).transaction(Z,"readwrite"),i=r.objectStore(Z).put({compositeKey:t,value:e});return new Promise((o,a)=>{i.onsuccess=c=>{o()},r.onerror=c=>{var l;a(C.create("storage-set",{originalErrorMessage:(l=c.target.error)==null?void 0:l.message}))}})}async function zt(t){const n=(await Vt()).transaction(Z,"readonly"),s=n.objectStore(Z).get(t);return new Promise((i,o)=>{s.onsuccess=a=>{const c=a.target.result;i(c?c.value:void 0)},n.onerror=a=>{var c;o(C.create("storage-get",{originalErrorMessage:(c=a.target.error)==null?void 0:c.message}))}})}function Wt(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L=new Ue("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ss(t){if(Be()){let e;try{e=await es(t)}catch(n){L.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function ge(t,e){return Be()?ts(t,e).catch(n=>{L.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function is(t){let e;try{e=await rs()}catch{}if(e)return e;{const n=crypto.randomUUID();let r=`To use this token for app debugging, register it with your project.

Firebase App Check debug token: ${n}

`;const s=t==null?void 0:t.options.appId,i=t==null?void 0:t.options.projectId;return i&&s?r+=`You can do so in the Firebase Console:
https://console.firebase.google.com/project/${i}/appcheck/apps?selectedAppId=${s}

Or using the Firebase CLI:
firebase appcheck:debugtokens:create ${n} --project ${i} --app ${s}

`:r+=`You will need to add it to your app's App Check settings in the Firebase Console for it to work.

`,r+=`Note: To keep your project secure, please revoke and delete this token using the
Firebase Console or the CLI (\`firebase appcheck:debugtokens:delete\`) when you finish debugging.

Warning: This debug token is a secret and should not be shared or uploaded to source code.

Debug Token Guide: https://firebase.google.com/docs/app-check/web/debug-provider
Firebase CLI install instructions: https://firebase.google.com/docs/cli
`,console.log(r),ns(n).catch(o=>L.warn(`Failed to persist debug token to IndexedDB. Error: ${o}`)),n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qe(){return le().enabled}async function ze(){const t=le();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function os(t){const e=xe(),n=le();if(n.initialized=!0,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&e.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;n.enabled=!0;const r=new X;n.token=r,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?r.resolve(e.FIREBASE_APPCHECK_DEBUG_TOKEN):r.resolve(is(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const as={error:"UNKNOWN_ERROR"};function cs(t){return $e.encodeString(JSON.stringify(t),!1)}async function Pe(t,e=!1,n=!1){const r=t.app;je(r);const s=_(r);let i=s.token,o;if(i&&!j(i)&&(s.token=void 0,i=void 0),!i){const l=await s.cachedTokenPromise;l&&(j(l)?i=l:await ge(r,void 0))}if(!e&&i&&j(i))return{token:i.token};let a=!1;if(qe())try{const l=await ze();s.exchangeTokenPromise||(s.exchangeTokenPromise=Ve(Ht(r,l),t.heartbeatServiceProvider).finally(()=>{s.exchangeTokenPromise=void 0}),a=!0);const f=await s.exchangeTokenPromise;return await ge(r,f),s.token=f,{token:f.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?L.warn(l.message):n&&L.error(l),me(l)}try{s.exchangeTokenPromise||(s.exchangeTokenPromise=s.provider.getToken().finally(()=>{s.exchangeTokenPromise=void 0}),a=!0),i=await _(r).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?L.warn(l.message):n&&L.error(l),o=l}let c;return i?o?j(i)?c={token:i.token,internalError:o}:c=me(o):(c={token:i.token},s.token=i,await ge(r,i)):c=me(o),a&&Yt(r,c),c}async function ls(t){const e=t.app;je(e);const{provider:n}=_(e);if(qe()){const r=await ze(),s=Ht(e,r);s.body.limited_use=!0;const{token:i}=await Ve(s,t.heartbeatServiceProvider);return{token:i}}else{const{token:r}=await n.getToken(!0);return{token:r}}}function Kt(t,e,n,r){const{app:s}=t,i=_(s),o={next:n,error:r,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&j(i.token)){const a=i.token;Promise.resolve().then(()=>{n({token:a.token}),ft(t)}).catch(()=>{})}i.cachedTokenPromise.then(()=>ft(t))}function Jt(t,e){const n=_(t),r=n.tokenObservers.filter(s=>s.next!==e);r.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=r}function ft(t){const{app:e}=t,n=_(e);let r=n.tokenRefresher;r||(r=ds(t),n.tokenRefresher=r),!r.isRunning()&&n.isTokenAutoRefreshEnabled&&r.start()}function ds(t){const{app:e}=t;return new Kr(async()=>{const n=_(e);let r;if(n.token?r=await Pe(t,!0):r=await Pe(t),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const n=_(e);if(n.token){let r=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const s=n.token.expireTimeMillis-300*1e3;return r=Math.min(r,s),Math.max(0,r-Date.now())}else return 0},ut.RETRIAL_MIN_WAIT,ut.RETRIAL_MAX_WAIT)}function Yt(t,e){const n=_(t).tokenObservers;for(const r of n)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function j(t){return t.expireTimeMillis-Date.now()>0}function me(t){return{token:cs(as),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=_(this.app);for(const n of e)Jt(this.app,n.next);return Promise.resolve()}}function hs(t,e){return new us(t,e)}function fs(t){return{getToken:e=>Pe(t,e),getLimitedUseToken:()=>ls(t),addTokenListener:e=>Kt(t,"INTERNAL",e),removeTokenListener:e=>Jt(t.app,e)}}const ps="@firebase/app-check",gs="0.13.2",ms="https://www.google.com/recaptcha/enterprise.js";function ys(t,e){const n=new X,r=_(t);r.reCAPTCHAState={initialized:n};const s=bs(t),i=ht(!0);return i?pt(t,e,i,s,n):_s(()=>{const o=ht(!0);if(!o)throw new Error("no recaptcha");pt(t,e,o,s,n)}),n.promise}function pt(t,e,n,r,s){n.ready(()=>{ws(t,e,n,r),s.resolve(n)})}function bs(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function Es(t){je(t);const n=await _(t).reCAPTCHAState.initialized.promise;return new Promise((r,s)=>{const i=_(t).reCAPTCHAState;n.ready(()=>{r(n.execute(i.widgetId,{action:"fire_app_check"}))})})}function ws(t,e,n,r){const s=n.render(r,{sitekey:e,size:"invisible",callback:()=>{_(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{_(t).reCAPTCHAState.succeeded=!1}}),i=_(t);i.reCAPTCHAState={...i.reCAPTCHAState,widgetId:s}}function _s(t){const e=document.createElement("script");Ur(e,ms+"?render=explicit"),e.onload=t,document.head.appendChild(e)}class We{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(e=!1){var s,i,o;Is(this._throttleData);const n=await Es(this._app).catch(a=>{throw C.create("recaptcha-error")});if(!((s=_(this._app).reCAPTCHAState)!=null&&s.succeeded))throw C.create("recaptcha-error");let r;try{const a=Xr(this._app,n);e&&(a.body.limited_use=!0),r=await Ve(a,this._heartbeatServiceProvider)}catch(a){throw(i=a.code)!=null&&i.includes("fetch-status-error")?(this._throttleData=As(Number((o=a.customData)==null?void 0:o.httpStatus),this._throttleData),C.create("initial-throttle",{time:Gt(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):a}return this._throttleData=null,r}initialize(e){this._app=e,this._heartbeatServiceProvider=He(e,"heartbeat"),ys(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof We?this._siteKey===e._siteKey:!1}}function As(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+Wr,httpStatus:t};{const n=e?e.backoffCount:0,r=Rn(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+r,httpStatus:t}}}function Is(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw C.create("throttled",{time:Gt(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cs(t=Lt(),e){var s;t=kt(t);const n=He(t,"app-check");if(le().initialized||os(t),qe()&&ze().then(i=>{console.log(`Firebase App Check debug token: ${i}`)}),n.isInitialized()){const i=n.getImmediate(),o=n.getOptions();if(o&&!!o.isTokenAutoRefreshEnabled==!!e.isTokenAutoRefreshEnabled&&((s=o.provider)!=null&&s.isEqual(e.provider)))return i;throw C.create("already-initialized",{appName:t.name})}const r=n.initialize({options:e});return Ts(t,e.provider,e.isTokenAutoRefreshEnabled),_(t).isTokenAutoRefreshEnabled&&Kt(r,"INTERNAL",()=>{}),r}function Ts(t,e,n=!1){const r=Vr(t,{...Ft});r.activated=!0,r.provider=e,r.cachedTokenPromise=ss(t).then(s=>(s&&j(s)&&(r.token=s,Yt(t,{token:s.token})),s)),r.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&L.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),r.provider.initialize(t)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ss="app-check",gt="app-check-internal";function Os(){V(new G(Ss,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return hs(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(gt).initialize()})),V(new G(gt,t=>{const e=t.getProvider("app-check").getImmediate();return fs(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),F(ps,gs)}Os();var mt="@firebase/ai",Le="3.1.0";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q="AI",Rs="global",vs="firebasevertexai.googleapis.com",ae="v1beta",yt=Le,ks="gl-js",Ds="hybrid",Ns=180*1e3,Ps="gemini-3.5-flash-lite";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u extends z{constructor(e,n,r){const s=q,i=`${s}/${e}`,o=`${s}: ${n} (${i})`;super(e,o),this.code=e,this.customErrorData=r,Error.captureStackTrace&&Error.captureStackTrace(this,u),Object.setPrototypeOf(this,u.prototype),this.toString=()=>o}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bt=["user","model","function","system"],Xt={HARM_SEVERITY_UNSUPPORTED:"HARM_SEVERITY_UNSUPPORTED"},I={SAFETY:"SAFETY",RECITATION:"RECITATION",BLOCKLIST:"BLOCKLIST",PROHIBITED_CONTENT:"PROHIBITED_CONTENT",SPII:"SPII",MALFORMED_FUNCTION_CALL:"MALFORMED_FUNCTION_CALL",IMAGE_SAFETY:"IMAGE_SAFETY",IMAGE_PROHIBITED_CONTENT:"IMAGE_PROHIBITED_CONTENT",IMAGE_OTHER:"IMAGE_OTHER",NO_IMAGE:"NO_IMAGE",IMAGE_RECITATION:"IMAGE_RECITATION",LANGUAGE:"LANGUAGE",UNEXPECTED_TOOL_CALL:"UNEXPECTED_TOOL_CALL",TOO_MANY_TOOL_CALLS:"TOO_MANY_TOOL_CALLS",MISSING_THOUGHT_SIGNATURE:"MISSING_THOUGHT_SIGNATURE",MALFORMED_RESPONSE:"MALFORMED_RESPONSE"},S={PREFER_ON_DEVICE:"prefer_on_device",ONLY_ON_DEVICE:"only_on_device",ONLY_IN_CLOUD:"only_in_cloud",PREFER_IN_CLOUD:"prefer_in_cloud"},P={ON_DEVICE:"on_device",IN_CLOUD:"in_cloud"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d={ERROR:"error",REQUEST_ERROR:"request-error",RESPONSE_ERROR:"response-error",FETCH_ERROR:"fetch-error",SESSION_CLOSED:"session-closed",INVALID_CONTENT:"invalid-content",API_NOT_ENABLED:"api-not-enabled",ALREADY_INITIALIZED:"already-initialized",INVALID_SCHEMA:"invalid-schema",NO_API_KEY:"no-api-key",NO_APP_ID:"no-app-id",NO_MODEL:"no-model",NO_PROJECT_ID:"no-project-id",PARSE_FAILED:"parse-failed",UNSUPPORTED:"unsupported"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H={STRING:"string",NUMBER:"number",INTEGER:"integer",BOOLEAN:"boolean",ARRAY:"array",OBJECT:"object"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N={AGENT_PLATFORM:"AGENT_PLATFORM",GOOGLE_AI:"GOOGLE_AI"};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(e){this.backendType=e}}class de extends Qt{constructor(){super(N.GOOGLE_AI)}_getModelPath(e,n){return`/${ae}/projects/${e}/${n}`}_getTemplatePath(e,n){return`/${ae}/projects/${e}/templates/${n}`}}class Zt extends Qt{constructor(e){super(N.AGENT_PLATFORM),this.location=Rs,e&&(this.location=e)}_getModelPath(e,n){return`/${ae}/projects/${e}/locations/${this.location}/${n}`}_getTemplatePath(e,n){return`/${ae}/projects/${e}/locations/${this.location}/templates/${n}`}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ls(t){if(t instanceof de)return`${q}/googleai`;if(t instanceof Zt)return`${q}/agentplatform/${t.location}`;throw new u(d.ERROR,`Invalid backend: ${JSON.stringify(t.backendType)}`)}function Ms(t){const e=t.split("/");if(e[0]!==q)throw new u(d.ERROR,`Invalid instance identifier, unknown prefix '${e[0]}'`);switch(e[1]){case"agentplatform":const r=e[2];if(!r)throw new u(d.ERROR,`Invalid instance identifier, unknown location '${t}'`);return new Zt(r);case"googleai":return new de;default:throw new u(d.ERROR,`Invalid instance identifier string: '${t}'`)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w=new Ue("@firebase/ai");var k;(function(t){t.UNAVAILABLE="unavailable",t.DOWNLOADABLE="downloadable",t.DOWNLOADING="downloading",t.AVAILABLE="available"})(k||(k={}));/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const en={type:"text",languages:["en"]},ye=[en,{type:"image"}],be=[en];class T{constructor(e,n,r){this.languageModelProvider=e,this.mode=n,this.downloadPromise=null,this.onDeviceParams={createOptions:{expectedInputs:ye,expectedOutputs:be}},r&&(this.onDeviceParams=r,this.onDeviceParams.createOptions?(this.onDeviceParams.createOptions.expectedInputs||(this.onDeviceParams.createOptions.expectedInputs=ye),this.onDeviceParams.createOptions.expectedOutputs||(this.onDeviceParams.createOptions.expectedOutputs=be)):this.onDeviceParams.createOptions={expectedInputs:ye,expectedOutputs:be})}async isAvailable(e){var r;if(!this.mode)return w.debug("On-device inference unavailable because mode is undefined."),!1;if(this.mode===S.ONLY_IN_CLOUD)return w.debug('On-device inference unavailable because mode is "only_in_cloud".'),!1;const n=await((r=this.languageModelProvider)==null?void 0:r.availability(this.onDeviceParams.createOptions));if(this.mode===S.ONLY_ON_DEVICE){if(n===k.UNAVAILABLE)throw new u(d.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(n===k.DOWNLOADABLE||n===k.DOWNLOADING){w.debug("Waiting for download of LanguageModel to complete.");try{await this.downloadPromise}catch(s){throw new u(d.ERROR,s.message)}return!0}return!0}return n!==k.AVAILABLE?(w.debug(`On-device inference unavailable because availability is "${n}".`),!1):T.isOnDeviceRequest(e)?!0:(w.debug("On-device inference unavailable because request is incompatible."),!1)}async generateContent(e){const n=await this.createSession(),r=await Promise.all(e.contents.map(T.toLanguageModelMessage)),s=await n.prompt(r,this.onDeviceParams.promptOptions);return T.toResponse(s)}async generateContentStream(e){const n=await this.createSession(),r=await Promise.all(e.contents.map(T.toLanguageModelMessage)),s=n.promptStreaming(r,this.onDeviceParams.promptOptions);return T.toStreamResponse(s)}async countTokens(e){throw new u(d.REQUEST_ERROR,"Count Tokens is not yet available for on-device model.")}static isOnDeviceRequest(e){if(e.contents.length===0)return w.debug("Empty prompt rejected for on-device inference."),!1;for(const n of e.contents){if(n.parts.some(r=>"functionResponse"in r))return w.debug("Content with a function response part rejected for on-device inference."),!1;for(const r of n.parts)if("inlineData"in r&&r.inlineData&&T.SUPPORTED_MIME_TYPES.indexOf(r.inlineData.mimeType)===-1)return w.debug(`Unsupported mime type "${r.inlineData.mimeType}" rejected for on-device inference.`),!1}return!0}async downloadIfAvailable(e){var r;const n=await((r=this.languageModelProvider)==null?void 0:r.availability(this.onDeviceParams.createOptions));return(n===k.DOWNLOADABLE||n===k.DOWNLOADING)&&this.download(e),n}download(e){var r;if(this.downloadPromise)return;const n={...this.onDeviceParams.createOptions};n&&!n.monitor&&e&&(n.monitor=s=>{s.addEventListener("downloadprogress",i=>{e(i.loaded)})}),this.downloadPromise=(r=this.languageModelProvider)==null?void 0:r.create(n).finally(()=>{this.downloadPromise=null})}static async toLanguageModelMessage(e){const n=await Promise.all(e.parts.map(T.toLanguageModelMessageContent));return{role:T.toLanguageModelMessageRole(e.role),content:n}}static async toLanguageModelMessageContent(e){if("text"in e&&typeof e.text=="string")return{type:"text",value:e.text};if("inlineData"in e&&e.inlineData){const r=await(await fetch(`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`)).blob();return{type:"image",value:await createImageBitmap(r)}}throw new u(d.REQUEST_ERROR,"Processing of this Part type is not currently supported.")}static toLanguageModelMessageRole(e){return e==="model"?"assistant":"user"}async createSession(){if(!this.languageModelProvider)throw new u(d.UNSUPPORTED,"Chrome AI requested for unsupported browser version.");const e=await this.languageModelProvider.create(this.onDeviceParams.createOptions);return this.oldSession&&this.oldSession.destroy(),this.oldSession=e,e}static toResponse(e){return{json:async()=>({candidates:[{content:{parts:[{text:e}]}}]})}}static toStreamResponse(e){const n=new TextEncoder;return{body:e.pipeThrough(new TransformStream({transform(r,s){const i=JSON.stringify({candidates:[{content:{role:"model",parts:[{text:r}]}}]});s.enqueue(n.encode(`data: ${i}

`))}}))}}}T.SUPPORTED_MIME_TYPES=["image/jpeg","image/png"];function $s(t,e,n){const s=(e||xe()).LanguageModel;if(s&&t)return new T(s,t,n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(e,n,r,s,i){this.app=e,this.backend=n,this.chromeAdapterFactory=i;const o=s==null?void 0:s.getImmediate({optional:!0}),a=r==null?void 0:r.getImmediate({optional:!0});this.auth=a||null,this.appCheck=o||null}_delete(){return Promise.resolve()}set options(e){this._options=e}get options(){return this._options}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bs(t,{instanceIdentifier:e}){if(!e)throw new u(d.ERROR,"AIService instance identifier is undefined.");const n=Ms(e),r=t.getProvider("app").getImmediate(),s=t.getProvider("auth-internal"),i=t.getProvider("app-check-internal");return new xs(r,n,s,i,$s)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fs(t){var n,r,s,i,o,a,c;if((r=(n=t.app)==null?void 0:n.options)!=null&&r.apiKey)if((i=(s=t.app)==null?void 0:s.options)!=null&&i.projectId){if(!((a=(o=t.app)==null?void 0:o.options)!=null&&a.appId))throw new u(d.NO_APP_ID,'The "appId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid app ID.')}else throw new u(d.NO_PROJECT_ID,'The "projectId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid project ID.');else throw new u(d.NO_API_KEY,'The "apiKey" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid API key.');const e={apiKey:t.app.options.apiKey,project:t.app.options.projectId,appId:t.app.options.appId,automaticDataCollectionEnabled:t.app.automaticDataCollectionEnabled,backend:t.backend};if(Tr(t.app)&&t.app.settings.appCheckToken){const l=t.app.settings.appCheckToken;e.getAppCheckToken=()=>Promise.resolve({token:l})}else t.appCheck&&((c=t.options)!=null&&c.useLimitedUseAppCheckTokens?e.getAppCheckToken=()=>t.appCheck.getLimitedUseToken():e.getAppCheckToken=()=>t.appCheck.getToken());return t.auth&&(e.getAuthToken=()=>t.auth.getToken()),e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(e,n){this._apiSettings=Fs(e),this.model=K.normalizeModelName(n,this._apiSettings.backend.backendType)}static normalizeModelName(e,n){return n===N.GOOGLE_AI?K.normalizeGoogleAIModelName(e):K.normalizeVertexAIModelName(e)}static normalizeGoogleAIModelName(e){return`models/${e}`}static normalizeVertexAIModelName(e){let n;return e.includes("/")?e.startsWith("models/")?n=`publishers/google/${e}`:n=e:n=`publishers/google/models/${e}`,n}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Us="Timeout has expired.",Ee="AbortError";class Gs{constructor(e){this.params=e}toString(){const e=new URL(this.baseUrl);return e.pathname=this.pathname,e.search=this.queryParams.toString(),e.toString()}get pathname(){return this.params.templateId?`${this.params.apiSettings.backend._getTemplatePath(this.params.apiSettings.project,this.params.templateId)}:${this.params.task}`:`${this.params.apiSettings.backend._getModelPath(this.params.apiSettings.project,this.params.model)}:${this.params.task}`}get baseUrl(){var e;return((e=this.params.singleRequestOptions)==null?void 0:e.baseUrl)??`https://${vs}`}get queryParams(){const e=new URLSearchParams;return this.params.stream&&e.set("alt","sse"),e}}function Hs(t){const e=[];return e.push(`${ks}/${yt}`),e.push(`fire/${yt}`),(t.params.apiSettings.inferenceMode===S.PREFER_ON_DEVICE||t.params.apiSettings.inferenceMode===S.PREFER_IN_CLOUD)&&e.push(Ds),e.join(" ")}async function js(t){const e=new Headers;if(e.append("Content-Type","application/json"),e.append("x-goog-api-client",Hs(t)),e.append("x-goog-api-key",t.params.apiSettings.apiKey),t.params.apiSettings.automaticDataCollectionEnabled&&e.append("X-Firebase-Appid",t.params.apiSettings.appId),t.params.apiSettings.getAppCheckToken){const n=await t.params.apiSettings.getAppCheckToken();n&&(e.append("X-Firebase-AppCheck",n.token),n.error&&w.warn(`Unable to obtain a valid App Check token: ${n.error.message}`))}if(t.params.apiSettings.getAuthToken){const n=await t.params.apiSettings.getAuthToken();n&&e.append("Authorization",`Firebase ${n.accessToken}`)}return e}async function Ke(t,e){var l,f;const n=new Gs(t);let r;const s=(l=t.singleRequestOptions)==null?void 0:l.signal,i=((f=t.singleRequestOptions)==null?void 0:f.timeout)!=null&&t.singleRequestOptions.timeout>=0?t.singleRequestOptions.timeout:Ns,o=new AbortController,a=setTimeout(()=>{o.abort(new DOMException(Us,Ee)),w.debug(`Aborting request to ${n} due to timeout (${i}ms)`)},i),c=AbortSignal.any(s?[s,o.signal]:[o.signal]);if(s&&s.aborted)throw clearTimeout(a),new DOMException(s.reason??"Aborted externally before fetch",Ee);try{const h={method:"POST",headers:await js(n),signal:c,body:e};if(r=await fetch(n.toString(),h),!r.ok){let b="",p;try{const A=await r.json();b=A.error.message,A.error.details&&(b+=` ${JSON.stringify(A.error.details)}`,p=A.error.details)}catch{}throw r.status===403&&p&&p.some(A=>A.reason==="SERVICE_DISABLED")&&p.some(A=>{var Ze,et;return(et=(Ze=A.links)==null?void 0:Ze[0])==null?void 0:et.description.includes("Google developers console API activation")})?new u(d.API_NOT_ENABLED,`The Firebase AI SDK requires the Firebase AI API ('firebasevertexai.googleapis.com') to be enabled in your Firebase project. Enable this API by visiting the Firebase Console at https://console.firebase.google.com/project/${n.params.apiSettings.project}/ailogic/ and clicking "Get started". If you enabled this API recently, wait a few minutes for the action to propagate to our systems and then retry.`,{status:r.status,statusText:r.statusText,errorDetails:p}):new u(d.FETCH_ERROR,`Error fetching from ${n}: [${r.status} ${r.statusText}] ${b}`,{status:r.status,statusText:r.statusText,errorDetails:p})}}catch(h){let b=h;throw h.code!==d.FETCH_ERROR&&h.code!==d.API_NOT_ENABLED&&h instanceof Error&&h.name!==Ee&&(b=new u(d.ERROR,`Error fetching from ${n.toString()}: ${h.message}`),b.stack=h.stack),b}finally{clearTimeout(a)}return r}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(t){if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&w.warn(`This response had ${t.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),nn(t.candidates[0]))throw new u(d.RESPONSE_ERROR,`Response error: ${x(t)}. Response body stored in error.response`,{response:t});return!0}else return!1}function v(t){return"type"in t&&t.type?t:t.text!==void 0?{...t,type:"text"}:t.inlineData!==void 0?{...t,type:"inlineData"}:t.functionCall!==void 0?{...t,type:"functionCall"}:t.functionResponse!==void 0?{...t,type:"functionResponse"}:t.fileData!==void 0?{...t,type:"fileData"}:t.executableCode!==void 0?{...t,type:"executableCode"}:t.codeExecutionResult!==void 0?{...t,type:"codeExecutionResult"}:t}function ce(t,e=P.IN_CLOUD){var r,s;if((r=t.candidates)!=null&&r[0]&&!t.candidates[0].hasOwnProperty("index")&&(t.candidates[0].index=0),t.candidates)for(const i of t.candidates)(s=i.content)!=null&&s.parts&&(i.content.parts=i.content.parts.map(v));const n=Vs(t);return n.inferenceSource=e,n}function Vs(t){return t.text=()=>{if(se(t))return Et(t,e=>!("thought"in e&&e.thought));if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Text not available. ${x(t)}`,{response:t});return""},t.thoughtSummary=()=>{if(se(t)){const e=Et(t,n=>!!("thought"in n&&n.thought));return e===""?void 0:e}else if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Thought summary not available. ${x(t)}`,{response:t})},t.inlineDataParts=()=>{if(se(t))return qs(t);if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Data not available. ${x(t)}`,{response:t})},t.functionCalls=()=>{if(se(t))return tn(t);if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Function call not available. ${x(t)}`,{response:t})},t}function Et(t,e){var r,s,i,o;const n=[];if((s=(r=t.candidates)==null?void 0:r[0].content)!=null&&s.parts)for(const a of(o=(i=t.candidates)==null?void 0:i[0].content)==null?void 0:o.parts){const c=v(a);c.type==="text"&&e(c)&&n.push(c.text)}return n.length>0?n.join(""):""}function tn(t){var n,r,s,i;if(!t)return;const e=[];if((r=(n=t.candidates)==null?void 0:n[0].content)!=null&&r.parts)for(const o of(i=(s=t.candidates)==null?void 0:s[0].content)==null?void 0:i.parts){const a=v(o);a.type==="functionCall"&&e.push(a.functionCall)}if(e.length>0)return e}function qs(t){var n,r,s,i;const e=[];if((r=(n=t.candidates)==null?void 0:n[0].content)!=null&&r.parts)for(const o of(i=(s=t.candidates)==null?void 0:s[0].content)==null?void 0:i.parts){const a=v(o);a.type==="inlineData"&&e.push(a)}if(e.length>0)return e}const zs=[I.RECITATION,I.SAFETY,I.BLOCKLIST,I.PROHIBITED_CONTENT,I.SPII,I.MALFORMED_FUNCTION_CALL,I.IMAGE_SAFETY,I.IMAGE_PROHIBITED_CONTENT,I.IMAGE_OTHER,I.NO_IMAGE,I.IMAGE_RECITATION,I.LANGUAGE,I.UNEXPECTED_TOOL_CALL,I.TOO_MANY_TOOL_CALLS,I.MISSING_THOUGHT_SIGNATURE,I.MALFORMED_RESPONSE];function nn(t){return!!t.finishReason&&zs.some(e=>e===t.finishReason)}function x(t){var n,r,s;let e="";if((!t.candidates||t.candidates.length===0)&&t.promptFeedback)e+="Response was blocked",(n=t.promptFeedback)!=null&&n.blockReason&&(e+=` due to ${t.promptFeedback.blockReason}`),(r=t.promptFeedback)!=null&&r.blockReasonMessage&&(e+=`: ${t.promptFeedback.blockReasonMessage}`);else if((s=t.candidates)!=null&&s[0]){const i=t.candidates[0];nn(i)&&(e+=`Candidate was blocked due to ${i.finishReason}`,i.finishMessage&&(e+=`: ${i.finishMessage}`))}return e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(t){if(t!=null){if(typeof t=="string")return{role:"system",parts:[{type:"text",text:t}]};if(t.type==="text"||"text"in t&&typeof t.text=="string")return{role:"system",parts:[B(v(t))]};if(t.parts){const e=t.parts.map(n=>B(v(n)));return t.role?{...t,parts:e}:{role:"system",parts:e}}}}function W(t){let e=[];if(typeof t=="string")e=[{type:"text",text:t}];else for(const n of t)typeof n=="string"?e.push({type:"text",text:n}):e.push(B(v(n)));return Ws(e)}function Ws(t){const e={role:"user",parts:[]};let n=!1,r=!1;for(const s of t)s.type==="functionResponse"||"functionResponse"in s?r=!0:n=!0,e.parts.push(s);if(n&&r)throw new u(d.INVALID_CONTENT,"Within a single message, FunctionResponse cannot be mixed with other type of Part in the request for sending chat message.");if(!n&&!r)throw new u(d.INVALID_CONTENT,"No Content is provided for sending chat message.");return e}function we(t){let e;if(t.contents){const n=t;e={...n,contents:n.contents.map(r=>({...r,parts:r.parts?r.parts.map(v):[]}))}}else e={contents:[W(t)]};return t.systemInstruction&&(e.systemInstruction=Je(t.systemInstruction)),e}function Ks(t){return t.parts&&Array.isArray(t.parts)?{...t,parts:t.parts.map(Ye)}:t}function Ye(t){let e;if("type"in t){const{type:n,...r}=t;e=r}else e=t;return e.functionResponse&&(e={...e,functionResponse:Ks(e.functionResponse)}),e}function Xe(t){return t.parts?{...t,parts:t.parts.map(Ye)}:t}function rn(t){return t==null||typeof t=="string"?t:"parts"in t&&Array.isArray(t.parts)?Xe(t):Ye(t)}function sn(t){const e={...t};return e.contents&&(e.contents=e.contents.map(Xe)),e.systemInstruction&&(e.systemInstruction=rn(e.systemInstruction)),e}function Js(t){const e={...t};return e.contents&&(e.contents=e.contents.map(Xe)),e.systemInstruction&&(e.systemInstruction=rn(e.systemInstruction)),e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(t){var e,n;if((e=t.safetySettings)==null||e.forEach(r=>{if(r.method)throw new u(d.UNSUPPORTED,"SafetySetting.method is not supported in the the Gemini Developer API. Please remove this property.")}),(n=t.generationConfig)!=null&&n.topK){const r=Math.round(t.generationConfig.topK);r!==t.generationConfig.topK&&(w.warn("topK in GenerationConfig has been rounded to the nearest integer to match the format for requests to the Gemini Developer API."),t.generationConfig.topK=r)}return t}function Qe(t){return{candidates:t.candidates?Xs(t.candidates):void 0,promptFeedback:t.promptFeedback?Qs(t.promptFeedback):void 0,usageMetadata:t.usageMetadata}}function Ys(t,e){return{generateContentRequest:{model:e,...t}}}function Xs(t){const e=[];let n;return e&&t.forEach(r=>{var o,a;let s;if(r.citationMetadata&&(s={citations:r.citationMetadata.citationSources}),r.safetyRatings&&(n=r.safetyRatings.map(c=>({...c,severity:c.severity??Xt.HARM_SEVERITY_UNSUPPORTED,probabilityScore:c.probabilityScore??0,severityScore:c.severityScore??0}))),(a=(o=r.content)==null?void 0:o.parts)!=null&&a.some(c=>"videoMetadata"in c&&c.videoMetadata))throw new u(d.UNSUPPORTED,"Part.videoMetadata is not supported in the Gemini Developer API. Please remove this property.");const i={index:r.index,content:r.content,finishReason:r.finishReason,finishMessage:r.finishMessage,safetyRatings:n,citationMetadata:s,groundingMetadata:r.groundingMetadata,urlContextMetadata:r.urlContextMetadata};e.push(i)}),e}function Qs(t){const e=[];return(t.safetyRatings??[]).forEach(r=>{e.push({category:r.category,probability:r.probability,severity:r.severity??Xt.HARM_SEVERITY_UNSUPPORTED,probabilityScore:r.probabilityScore??0,severityScore:r.severityScore??0,blocked:r.blocked})}),{blockReason:t.blockReason,safetyRatings:e,blockReasonMessage:t.blockReasonMessage}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wt=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function Zs(t,e,n){const r=t.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),s=ri(r),[i,o]=s.tee(),{response:a,firstValue:c}=await ei(o,e,n);return{stream:ni(i,e,n),response:a,firstValue:c}}async function ei(t,e,n){const[r,s]=t.tee(),i=r.getReader(),{value:o}=await i.read();return{firstValue:o,response:ti(s,e,n)}}async function ti(t,e,n){const r=[],s=t.getReader();for(;;){const{done:i,value:o}=await s.read();if(i){let a=si(r);return e.backend.backendType===N.GOOGLE_AI&&(a=Qe(a)),ce(a,n)}r.push(o)}}async function*ni(t,e,n){var s,i;const r=t.getReader();for(;;){const{value:o,done:a}=await r.read();if(a)break;let c;e.backend.backendType===N.GOOGLE_AI?c=ce(Qe(o),n):c=ce(o,n);const l=(s=c.candidates)==null?void 0:s[0];!((i=l==null?void 0:l.content)!=null&&i.parts)&&!(l!=null&&l.finishReason)&&!(l!=null&&l.citationMetadata)&&!(l!=null&&l.urlContextMetadata)||(yield c)}}function ri(t){const e=t.getReader();return new ReadableStream({start(r){let s="";return i();function i(){return e.read().then(({value:o,done:a})=>{if(a){if(s.trim()){r.error(new u(d.PARSE_FAILED,"Failed to parse stream"));return}r.close();return}s+=o;let c=s.match(wt),l;for(;c;){try{l=JSON.parse(c[1])}catch{r.error(new u(d.PARSE_FAILED,`Error parsing JSON response: "${c[1]}`));return}r.enqueue(l),s=s.substring(c[0].length),c=s.match(wt)}return i()})}}})}function si(t){const e=t[t.length-1],n={promptFeedback:e==null?void 0:e.promptFeedback};for(const r of t)if(r.candidates)for(const s of r.candidates){const i=s.index||0;n.candidates||(n.candidates=[]),n.candidates[i]||(n.candidates[i]={index:s.index}),n.candidates[i].citationMetadata=s.citationMetadata,n.candidates[i].finishReason=s.finishReason,n.candidates[i].finishMessage=s.finishMessage,n.candidates[i].safetyRatings=s.safetyRatings,n.candidates[i].groundingMetadata=s.groundingMetadata;const o=s.urlContextMetadata;if(typeof o=="object"&&o!==null&&Object.keys(o).length>0&&(n.candidates[i].urlContextMetadata=o),s.content){if(!s.content.parts)continue;n.candidates[i].content||(n.candidates[i].content={role:s.content.role||"user",parts:[]});for(const a of s.content.parts){if("text"in a&&a.text==="")continue;if(Object.keys(a).length===0)throw new u(d.INVALID_CONTENT,"Part should have at least one property, but there are none. This is likely caused by a malformed response from the backend.");const c=v({...a});Object.keys(c).length>0&&n.candidates[i].content.parts.push(c)}}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ii=[d.FETCH_ERROR,d.ERROR,d.API_NOT_ENABLED];async function an(t,e,n,r){if(!e)return{response:await r(),inferenceSource:P.IN_CLOUD};switch(e.mode){case S.ONLY_ON_DEVICE:if(await e.isAvailable(t))return{response:await n(),inferenceSource:P.ON_DEVICE};throw new u(d.UNSUPPORTED,"Inference mode is ONLY_ON_DEVICE, but an on-device model is not available.");case S.ONLY_IN_CLOUD:return{response:await r(),inferenceSource:P.IN_CLOUD};case S.PREFER_IN_CLOUD:try{return{response:await r(),inferenceSource:P.IN_CLOUD}}catch(s){if(s instanceof u&&ii.includes(s.code)&&await e.isAvailable(t))return{response:await n(),inferenceSource:P.ON_DEVICE};throw s}case S.PREFER_ON_DEVICE:return await e.isAvailable(t)?{response:await n(),inferenceSource:P.ON_DEVICE}:{response:await r(),inferenceSource:P.IN_CLOUD};default:throw new u(d.ERROR,`Unexpected infererence mode: ${e.mode}`)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oi(t,e,n,r){return n=sn(n),t.backend.backendType===N.GOOGLE_AI&&(n=on(n)),Ke({task:"streamGenerateContent",model:e,apiSettings:t,stream:!0,singleRequestOptions:r},JSON.stringify(n))}async function cn(t,e,n,r,s){const i=await an(n,r,()=>r.generateContentStream(n),()=>oi(t,e,n,s));return Zs(i.response,t,i.inferenceSource)}async function ai(t,e,n,r){return n=sn(n),t.backend.backendType===N.GOOGLE_AI&&(n=on(n)),Ke({model:e,task:"generateContent",apiSettings:t,stream:!1,singleRequestOptions:r},JSON.stringify(n))}async function ln(t,e,n,r,s){const i=await an(n,r,()=>r.generateContent(n),()=>ai(t,e,n,s)),o=await ci(i.response,t);return{response:ce(o,i.inferenceSource)}}async function ci(t,e){const n=await t.json();return e.backend.backendType===N.GOOGLE_AI?Qe(n):n}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _t="SILENT_ERROR",At=10;class li{constructor(e,n,r){this.params=n,this.requestOptions=r,this._history=[],this._sendPromise=Promise.resolve(),this._apiSettings=e}async getHistory(){return await this._sendPromise,B(this._history).map(e=>({...e,parts:e.parts?e.parts.map(v):[]}))}async _sendMessage(e,n){let r={};await this._sendPromise;const s=[];return this._sendPromise=this._sendPromise.then(async()=>{var c,l,f;let i,o=0;const a=((c=this.requestOptions)==null?void 0:c.maxSequentialFunctionCalls)??At;do{let h;if(i){o++;const A=await this._callFunctionsAsNeeded(i);h=W(A)}else h=W(e);const b=this._formatRequest(h,[...s]);s.push(h);const p=await this._callGenerateContent(b,n);if(p)if(r=p,i=this._getCallableFunctionCalls(p.response),p.response.candidates&&p.response.candidates.length>0){const A={parts:((l=p.response.candidates)==null?void 0:l[0].content.parts)||[],role:((f=p.response.candidates)==null?void 0:f[0].content.role)||"model"};s.push(B(A))}else{const A=x(p.response);A&&w.warn(`sendMessage() was unsuccessful. ${A}. Inspect response object for details.`)}else i=void 0}while(i&&o<a);i&&o>=a&&w.warn(`Automatic function calling exceeded the limit of ${a} function calls. Returning last model response.`)}),await this._sendPromise,this._history=this._history.concat(s),r}async _sendMessageStream(e,n){await this._sendPromise;const r=[],i=(async()=>{var f;let o,a=0;const c=((f=this.requestOptions)==null?void 0:f.maxSequentialFunctionCalls)??At;let l;do{let h;if(o){a++;const p=await this._callFunctionsAsNeeded(o);h=W(p)}else h=W(e);const b=this._formatRequest(h,[...r]);if(r.push(h),l=await this._callGenerateContentStream(b,n),o=this._getCallableFunctionCalls(l.firstValue),o&&l.firstValue&&l.firstValue.candidates&&l.firstValue.candidates.length>0){const p={...l.firstValue.candidates[0].content};p.role||(p.role="model"),r.push(p)}}while(o&&a<c);return o&&a>=c&&w.warn(`Automatic function calling exceeded the limit of ${c} function calls. Returning last model response.`),{stream:l.stream,response:l.response}})();return this._sendPromise=this._sendPromise.then(async()=>i).catch(o=>{throw new Error(_t)}).then(o=>o.response).then(o=>{if(o.candidates&&o.candidates.length>0){this._history=this._history.concat(r);const a={...o.candidates[0].content};a.role||(a.role="model"),this._history.push(B(a))}else{const a=x(o);a&&w.warn(`sendMessageStream() was unsuccessful. ${a}. Inspect response object for details.`)}}).catch(o=>{o.message!==_t&&o.name!=="AbortError"&&w.error(o)}),i}_getCallableFunctionCalls(e){var s,i,o;const n=(i=(s=this.params)==null?void 0:s.tools)==null?void 0:i.find(a=>a.functionDeclarations);if(!(n!=null&&n.functionDeclarations))return;const r=tn(e);if(r){for(const a of r)if(!((o=n.functionDeclarations)==null?void 0:o.some(l=>l.name===a.name&&typeof l.functionReference=="function")))return;return r}}async _callFunctionsAsNeeded(e){var i,o;const n=[],r=[],s=(o=(i=this.params)==null?void 0:i.tools)==null?void 0:o.find(a=>a.functionDeclarations);if(s&&s.functionDeclarations){for(const c of e){const l=s.functionDeclarations.find(f=>f.name===c.name);if(l!=null&&l.functionReference){const f=Promise.resolve(l.functionReference(c.args)).catch(h=>{const b=new u(d.ERROR,`Error in user-defined function "${l.name}": ${h.message}`);throw b.stack=h.stack,b});n.push({name:c.name,id:c.id,results:f}),r.push(f)}}await Promise.all(r);const a=[];for(const{name:c,id:l,results:f}of n){const h={name:c,response:await f};l&&(h.id=l),a.push({type:"functionResponse",functionResponse:h})}return a}else throw new u(d.REQUEST_ERROR,'No function declarations were provided in "tools".')}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const di=["text","inlineData","functionCall","functionResponse","thought","thoughtSignature"],ui={user:["text","inlineData","functionResponse"],function:["functionResponse"],model:["text","functionCall","thought","thoughtSignature"],system:["text"]},It={user:["model"],function:["model"],model:["user","function"],system:[]};function hi(t){let e=null;for(const n of t){const{role:r,parts:s}=n;if(!e&&r!=="user")throw new u(d.INVALID_CONTENT,`First Content should be with role 'user', got ${r}`);if(!bt.includes(r))throw new u(d.INVALID_CONTENT,`Each item should include role field. Got ${r} but valid roles are: ${JSON.stringify(bt)}`);if(!Array.isArray(s))throw new u(d.INVALID_CONTENT,"Content should have 'parts' property with an array of Parts");if(s.length===0)throw new u(d.INVALID_CONTENT,"Each Content should have at least one part");const i={text:0,inlineData:0,functionCall:0,functionResponse:0,thought:0,thoughtSignature:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const a of s){if(a.type)i[a.type]+=1;else for(const c of["text","inlineData","functionCall","functionResponse","fileData","executableCode","codeExecutionResult"])c in a&&(i[c]+=1);"thought"in a&&a.thought&&(i.thought+=1),"thoughtSignature"in a&&a.thoughtSignature&&(i.thoughtSignature+=1)}const o=ui[r];for(const a of di)if(!o.includes(a)&&i[a]>0)throw new u(d.INVALID_CONTENT,`Content with role '${r}' can't contain '${a}' part`);if(e&&!It[r].includes(e.role))throw new u(d.INVALID_CONTENT,`Content with role '${r}' can't follow '${e.role}'. Valid previous roles: ${JSON.stringify(It)}`);e=n}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi extends li{constructor(e,n,r,s,i){var o;super(e,s,i),this.model=n,this.chromeAdapter=r,this.params=s,this.requestOptions=i,s!=null&&s.history&&(hi(s.history),this._history=B(s.history)),((o=this.params)==null?void 0:o.systemInstruction)!=null&&(this.params={...this.params,systemInstruction:Je(this.params.systemInstruction)})}_formatRequest(e,n){var r,s,i,o,a;return{safetySettings:(r=this.params)==null?void 0:r.safetySettings,generationConfig:(s=this.params)==null?void 0:s.generationConfig,tools:(i=this.params)==null?void 0:i.tools,toolConfig:(o=this.params)==null?void 0:o.toolConfig,systemInstruction:(a=this.params)==null?void 0:a.systemInstruction,contents:[...this._history,...n,e]}}_callGenerateContent(e,n){return ln(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}_callGenerateContentStream(e,n){return cn(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}async sendMessage(e,n){return this._sendMessage(e,n)}async sendMessageStream(e,n){return this._sendMessageStream(e,n)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pi(t,e,n,r){n=Js(n);let s="";if(t.backend.backendType===N.GOOGLE_AI){const o=Ys(n,e);s=JSON.stringify(o)}else s=JSON.stringify(n);return(await Ke({model:e,task:"countTokens",apiSettings:t,stream:!1,singleRequestOptions:r},s)).json()}async function gi(t,e,n,r,s){if((r==null?void 0:r.mode)===S.ONLY_ON_DEVICE)throw new u(d.UNSUPPORTED,"countTokens() is not supported for on-device models.");return pi(t,e,n,s)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi extends K{constructor(e,n,r,s){super(e,n.model),this.chromeAdapter=s,this.generationConfig=n.generationConfig||{},yi(this.generationConfig),this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=Je(n.systemInstruction),this.requestOptions=r||{}}async initializeDeviceModel(e){if(!this.chromeAdapter||this.chromeAdapter.mode===S.ONLY_IN_CLOUD)return;if(await this.chromeAdapter.downloadIfAvailable(e)===k.UNAVAILABLE){const r=new u(d.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(this.chromeAdapter.mode===S.ONLY_ON_DEVICE)throw r;w.debug(r.message)}await this.chromeAdapter.downloadPromise}async generateContent(e,n){const r=we(e);return ln(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...r},this.chromeAdapter,{...this.requestOptions,...n})}async generateContentStream(e,n){const r=we(e),{stream:s,response:i}=await cn(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...r},this.chromeAdapter,{...this.requestOptions,...n});return{stream:s,response:i}}startChat(e){return new fi(this._apiSettings,this.model,this.chromeAdapter,{tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,generationConfig:this.generationConfig,safetySettings:this.safetySettings,...e},this.requestOptions)}async countTokens(e,n){const r=we(e);return gi(this._apiSettings,this.model,r,this.chromeAdapter,{...this.requestOptions,...n})}}function yi(t){var e,n;if(((e=t.thinkingConfig)==null?void 0:e.thinkingBudget)!=null&&((n=t.thinkingConfig)!=null&&n.thinkingLevel))throw new u(d.UNSUPPORTED,"Cannot set both thinkingBudget and thinkingLevel in a config.");if(t.responseSchema!=null&&t.responseJsonSchema!=null)throw new u(d.UNSUPPORTED,"Cannot set both responseSchema and responseJsonSchema in a config.");if((t.responseSchema!=null||t.responseJsonSchema!=null)&&t.responseMimeType!=="application/json"&&t.responseMimeType!=="text/x.enum")throw new u(d.UNSUPPORTED,'responseMimeType must be set to "application/json" or "text/x.enum" if responseSchema or responseJsonSchema are set.')}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(e){if(!e.type&&!e.anyOf)throw new u(d.INVALID_SCHEMA,"A schema must have either a 'type' or an 'anyOf' array of sub-schemas.");for(const n in e)this[n]=e[n];this.type=e.type,this.format=e.hasOwnProperty("format")?e.format:void 0,this.nullable=e.hasOwnProperty("nullable")?!!e.nullable:!1}toJSON(){const e={type:this.type};for(const n in this)this.hasOwnProperty(n)&&this[n]!==void 0&&(n!=="required"||this.type===H.OBJECT)&&(e[n]=this[n]);return e}static array(e){return new _i(e,e.items)}static object(e){return new Ai(e,e.properties,e.optionalProperties)}static string(e){return new Ct(e)}static enumString(e){return new Ct(e,e.enum)}static integer(e){return new bi(e)}static number(e){return new Ei(e)}static boolean(e){return new wi(e)}static anyOf(e){return new Ii(e)}}class bi extends E{constructor(e){super({type:H.INTEGER,...e})}}class Ei extends E{constructor(e){super({type:H.NUMBER,...e})}}class wi extends E{constructor(e){super({type:H.BOOLEAN,...e})}}class Ct extends E{constructor(e,n){super({type:H.STRING,...e}),this.enum=n}toJSON(){const e=super.toJSON();return this.enum&&(e.enum=this.enum),e}}class _i extends E{constructor(e,n){super({type:H.ARRAY,...e}),this.items=n}toJSON(){const e=super.toJSON();return e.items=this.items.toJSON(),e}}class Ai extends E{constructor(e,n,r=[]){super({type:H.OBJECT,...e}),this.properties=n,this.optionalProperties=r}toJSON(){const e=super.toJSON();e.properties={...this.properties};const n=[];if(this.optionalProperties){for(const r of this.optionalProperties)if(!this.properties.hasOwnProperty(r))throw new u(d.INVALID_SCHEMA,`Property "${r}" specified in "optionalProperties" does not exist.`)}for(const r in this.properties)this.properties.hasOwnProperty(r)&&(e.properties[r]=this.properties[r].toJSON(),this.optionalProperties.includes(r)||n.push(r));return n.length>0&&(e.required=n),delete e.optionalProperties,e}}class Ii extends E{constructor(e){if(e.anyOf.length===0)throw new u(d.INVALID_SCHEMA,"The 'anyOf' array must not be empty.");super({...e,type:void 0}),this.anyOf=e.anyOf}toJSON(){const e=super.toJSON();return this.anyOf&&Array.isArray(this.anyOf)&&(e.anyOf=this.anyOf.map(n=>n.toJSON())),e}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ci(t=Lt(),e){t=kt(t);const n=He(t,q),r=(e==null?void 0:e.backend)??new de,s=Ls(r),i=n.getImmediate({identifier:s}),o=i.options;if(o){const a=e==null?void 0:e.useLimitedUseAppCheckTokens,c=!!o.useLimitedUseAppCheckTokens;if(a!=null&&!!a!==c)throw new u(d.ALREADY_INITIALIZED,`getAI() has already been called for app "${t.name}" and this backend with useLimitedUseAppCheckTokens: ${c}. This option cannot be changed after the AI instance has been initialized. Pass the desired options to the first getAI() call for this app and backend, or omit useLimitedUseAppCheckTokens to reuse the existing instance.`);return i}return i.options={useLimitedUseAppCheckTokens:(e==null?void 0:e.useLimitedUseAppCheckTokens)??!1},i}const Ti=["mode","onDeviceParams","inCloudParams"];function Si(t,e,n){var a;const r=e;let s;if(r.mode){for(const c of Object.keys(e))Ti.includes(c)||w.warn(`When a hybrid inference mode is specified (mode is currently set to ${r.mode}), "${c}" cannot be configured at the top level. Configuration for in-cloud and on-device must be done separately in inCloudParams and onDeviceParams. Configuration values set outside of inCloudParams and onDeviceParams will be ignored.`);s=r.inCloudParams||{model:Ps}}else s=e;if(!s.model)throw new u(d.NO_MODEL,"Must provide a model name. Example: getGenerativeModel({ model: 'my-model-name' })");const i=(a=t.chromeAdapterFactory)==null?void 0:a.call(t,r.mode,typeof window>"u"?void 0:window,r.onDeviceParams),o=new mi(t,s,n,i);return o._apiSettings.inferenceMode=r.mode,o}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oi(){V(new G(q,Bs,"PUBLIC").setMultipleInstances(!0)),F(mt,Le),F(mt,Le,"esm2020")}Oi();let J="not-configured";function Ri(t){try{Ce&&(self.FIREBASE_APPCHECK_DEBUG_TOKEN=!0),dn||(Ce?(Cs(t,{provider:new We("debug-placeholder"),isTokenAutoRefreshEnabled:!0}),J="debug-provider"):J="missing-site-key")}catch(e){console.warn("[JobGuard] App Check init failed:",e),J="error"}}let _e=null,Me=null,Ae=null;ee?(_e=Pt(ie),Ri(_e),Me=Ci(_e,{backend:new de})):J="not-configured";const vi=E.object({properties:{verdict:E.string({description:"One of SAFE, CAUTION, DANGER."}),risk_score:E.integer({description:"Risk score from 0 (safest) to 100 (most likely a scam)."}),red_flags:E.array({items:E.object({properties:{flag:E.string({description:"Short name of the red flag."}),evidence:E.string({description:"Exact quote from the job ad proving this flag."}),severity:E.string({description:"One of low, medium, high."})}}),description:"Suspicious signals found in the ad, with quoted evidence."}),green_flags:E.array({items:E.string({description:"One trust signal found in the ad."})}),summary:E.string({description:"One-paragraph plain-English explanation of the verdict."}),verify_steps:E.array({items:E.string({description:"One concrete check the user can do before applying."})})}}),ki="gemini-3.5-flash-lite";function Di(){if(!Me)throw new Error("Firebase is not configured yet.");return Ae||(Ae=Si(Me,{model:ki,generationConfig:{responseMimeType:"application/json",responseSchema:vi}})),Ae}const Ni=`You are a job-scam screening assistant. Analyze the job advertisement below.
Return ONLY valid JSON matching the schema.
Red flags to weigh: upfront fees of any kind, unrealistic salary for the role, no verifiable company identity, contact only via personal Telegram/WhatsApp, urgency pressure ("apply now", "limited slots"), request for ID documents or bank details before any interview, vague job description, many typos or inconsistent details.
Be conservative: if the evidence is thin, choose CAUTION, not DANGER. If the ad looks like a normal posting from a traceable employer with no fee requests, choose SAFE.
Green flags to note: named company with a verifiable website/address, official company email domain, clear role and responsibilities, a real interview process, salary in a normal range for the role, no payment requested at any stage.
Always include exactly 3 verify_steps: concrete checks the reader can do before applying (e.g. search the company, check the domain, never pay upfront).

Job ad:
"""%AD%"""`;function Pi(t){const e=String((t==null?void 0:t.verdict)||"CAUTION").toUpperCase(),n=["SAFE","CAUTION","DANGER"].includes(e)?e:"CAUTION",r=Math.max(0,Math.min(100,Number.isFinite(t==null?void 0:t.risk_score)?Math.round(t.risk_score):50)),s=Array.isArray(t==null?void 0:t.red_flags)?t.red_flags.filter(a=>a&&a.flag).map(a=>({flag:String(a.flag),evidence:String(a.evidence||""),severity:["low","medium","high"].includes(String(a.severity).toLowerCase())?String(a.severity).toLowerCase():"medium"})):[],i=Array.isArray(t==null?void 0:t.green_flags)?t.green_flags.map(String):[],o=Array.isArray(t==null?void 0:t.verify_steps)?t.verify_steps.map(String).slice(0,3):[];return{verdict:n,risk_score:r,red_flags:s,green_flags:i,summary:String((t==null?void 0:t.summary)||""),verify_steps:o}}async function Li(t){const e=Di(),n=performance.now(),r=await e.generateContent(Ni.replace("%AD%",t)),s=Math.round(performance.now()-n);let i;try{i=JSON.parse(r.response.text())}catch{throw new Error("Live AI returned non-JSON output.")}return{...Pi(i),source:"LIVE_AI",ms:s}}function Mi(){return J}const $i=[{id:"upfront-fee",weight:45,severity:"high",flag:"Upfront fee requested",explain:"Legitimate employers never ask applicants to pay to apply.",patterns:[/admin(istration)?\s*fee/i,/registration\s*fee/i,/training\s*fee/i,/processing\s*fee/i,/pay\s+(rp|usd|\$)?\s?[\d.,]+\s*(to|for|before)\s*(apply|regist|start|join)/i,/\bfee\b.{0,30}\b(pay|transfer|send)\b/i,/\b(pay|transfer|send)\b.{0,30}\bfee\b/i,/deposit/i]},{id:"unrealistic-pay",weight:25,severity:"high",flag:"Unrealistic pay for the work",explain:"Very high pay for simple work with no experience is a classic lure.",patterns:[/earn\s+(\$|rp|usd)?\s?[\d.,]+\s*(per|\/)\s*(day|week)/i,/\$\s?[\d,]{3,}\s*(per|\/)\s*(day|week)/i,/rp\s?[\d.]{8,}\s*(per|\/)\s*(minggu|bulan|hari)/i,/no experience.{0,40}(high|big|fantastic)\s*(salary|pay|income)/i,/salary.{0,30}up to.{0,20}\$\s?[\d,]{4,}/i]},{id:"chat-only-contact",weight:25,severity:"medium",flag:"Contact only via personal chat app",explain:"Real recruiters use a company email or an official application page.",patterns:[/contact (us |me |only )?(via|on|through)?\s*(telegram|whatsapp|wa)\b/i,/\btelegram\b.{0,20}@[\w]+/i,/chat (us |me )?on whatsapp/i,/whatsapp (only|me|us)/i]},{id:"urgency",weight:15,severity:"medium",flag:"Urgency pressure",explain:"Pressure to decide immediately is a tactic to stop you checking.",patterns:[/apply (now|immediately|today|asap)/i,/limited slots/i,/only\s+\d+\s*(slots?|positions?|spots?)\s*left/i,/urgent(ly)?\s+(hiring|needed|required)/i,/first come,?\s*first served/i]},{id:"id-or-bank-upfront",weight:30,severity:"high",flag:"ID or bank details requested upfront",explain:"ID cards and bank details are only needed after a real offer, never to apply.",patterns:[/\b(ktp|id card|passport)\b.{0,40}\b(send|upload|share|provide|photo)\b/i,/\b(send|upload|share|provide)\b.{0,40}\b(ktp|id card|passport)\b/i,/bank (account|details)|account number/i,/send (your )?(photo of )?(id|ktp|passport)/i]},{id:"vague-role",weight:10,severity:"low",flag:"Vague job description",explain:"A real posting says what the job actually is, where, and for whom.",patterns:[/no experience needed.{0,60}work from home/i,/work from home.{0,60}no experience/i,/simple (task|job|work).{0,40}earn/i,/just (copy|paste|click|share|like)/i]},{id:"free-money-lure",weight:20,severity:"medium",flag:"Free-money / easy-cash lure",explain:"Promises of effortless income are a hallmark of job scams.",patterns:[/earn money (easily|fast|quickly|from home)/i,/make \$\d+.*(daily|a day|per day)/i,/guaranteed income/i,/passive income/i,/get rich/i]}],xi=[{flag:"Named company with a verifiable identity",patterns:[/\b(PT|CV|Ltd\.?|Inc\.?|LLC|Corp\.?)\b/i,/www\.[\w-]+\.(com|co\.id|id|org|net)/i]},{flag:"Official company email or application page",patterns:[/[\w.+-]+@[\w-]+\.(com|co\.id|id|org|net)/i,/apply (at|via|through|on) (our )?(website|careers page|portal)/i]},{flag:"Clear role, location, and responsibilities",minMatches:2,patterns:[/responsibilities:/i,/requirements:/i,/location:\s*\w+/i,/job type:\s*\w+/i]},{flag:"Real interview / selection process mentioned",notPatterns:[/no interview/i,/without (an? )?interview/i],patterns:[/interview/i,/selection process/i,/shortlisted/i,/walk-in interview/i]},{flag:"No payment requested anywhere in the ad",patterns:[]}],Bi=["Search the company name + 'scam' / 'penipuan' and check that its website, address, and reviews exist.","Check the contact: a real recruiter uses a company email or an official careers page, not a personal chat account.","Never pay anything to apply — no admin fee, training fee, or deposit — and never send ID or bank details before a real interview and offer."];function Fi(t,e){const n=t.match(e);if(!n)return"";const r=Math.max(0,n.index-20),s=Math.min(t.length,n.index+n[0].length+20),i=t.slice(r,s).replace(/\s+/g," ").trim();return(r>0?"…":"")+i+(s<t.length?"…":"")}function Ui(t){const e=Date.now(),n=[];let r=0;for(const a of $i)for(const c of a.patterns){const l=Fi(t,c);if(l){r+=a.weight,n.push({flag:a.flag,evidence:l,severity:a.severity});break}}const s=[];for(const a of xi){if(a.patterns.length===0){n.some(c=>c.flag==="Upfront fee requested")||s.push(a.flag);continue}a.notPatterns&&a.notPatterns.some(c=>c.test(t))||a.patterns.some(c=>c.test(t))&&(a.minMatches?a.patterns.filter(l=>l.test(t)).length>=a.minMatches&&s.push(a.flag):s.push(a.flag))}r=Math.max(0,r-s.length*5),r=Math.min(100,r);const i=r>=55?"DANGER":r>=10?"CAUTION":"SAFE";return{verdict:i,risk_score:r,red_flags:n,green_flags:s,summary:i==="DANGER"?"This ad shows several classic job-scam signals. Do not pay anything or send personal documents, and verify the employer independently before engaging further.":i==="CAUTION"?"This ad has some warning signs but is not conclusive. Treat it carefully and run the verification checks below before applying.":"No classic scam signals were found in this text. It still pays to verify the employer, but nothing here looks like a typical job scam.",verify_steps:Bi.slice(),source:"DEMO",ms:Date.now()-e,demoNote:"Demo analysis — matched by local rules, not live AI. Connect Firebase AI Logic to get a full Gemini verdict."}}const Gi=`URGENT HIRING!!! Work From Home Data Entry — Earn Rp 15.000.000 per week, NO EXPERIENCE NEEDED!

We are hiring 50 people immediately for simple copy-paste work from your phone. No interview, start today!

REQUIREMENTS:
- Just a phone and internet
- No experience needed, anyone can join
- First come, first served — only 20 slots left!

HOW TO APPLY:
1. Pay Rp 250.000 admin fee to activate your account
2. Send a photo of your KTP / ID card to our admin
3. Contact us ONLY via Telegram @quickcash_admin

Apply NOW! Limited slots! Earn money easily from home, guaranteed income!`,Hi=`Junior Barista — Kopi Pagi Co., Bandung, Indonesia

Kopi Pagi Co. is a neighborhood coffee shop in Bandung (Jl. Braga 12). We are looking for a full-time Junior Barista to join our team.

Job type: Full-time, on-site
Salary: Rp 3.500.000 – Rp 4.200.000 per month (based on experience)

Responsibilities:
- Prepare espresso-based drinks to our recipes
- Keep the bar clean and stocked during your shift
- Greet customers and take orders

Requirements:
- No formal experience required, but a love of coffee helps
- Able to work weekends on a rotating roster
- Friendly, reliable, and able to stand for long shifts

Selection process: shortlisted candidates are invited to a walk-in interview at the shop, followed by a 1-day paid trial shift.

How to apply: send your CV to hiring@kopipagi.example or apply at www.kopipagi.example/careers. No fees are charged at any stage of recruitment.`,y=t=>document.getElementById(t),O={busy:!1,mode:"auto"};function m(t,e,n){const r=document.createElement(t);return e&&(r.className=e),n!=null&&(r.textContent=n),r}function Y(t,e=""){const n=y("status");n.textContent=t,n.className="status "+e}function ji(t){return t==="LIVE_AI"?"LIVE AI · Gemini via Firebase AI Logic":"DEMO · local rules — no live AI"}function Vi(t){const e=y("result");e.hidden=!1,e.innerHTML="";const n=t.verdict.toLowerCase(),r=m("div","verdict-head "+n);r.appendChild(m("span","verdict",t.verdict)),r.appendChild(m("span","score",`Risk ${t.risk_score}/100`)),e.appendChild(r);const s=m("div","meter"),i=m("div","meter-fill "+n);i.style.width=`${t.risk_score}%`,s.appendChild(i),e.appendChild(s);const o=m("p","engine-badge "+(t.source==="LIVE_AI"?"live":"demo"),`${ji(t.source)} · ${t.ms} ms`);if(e.appendChild(o),t.source==="DEMO"&&t.demoNote&&e.appendChild(m("p","demo-note",t.demoNote)),e.appendChild(m("p","summary-text",t.summary)),t.red_flags.length){e.appendChild(m("h2","","Red flags"));const l=m("ul","flags red");for(const f of t.red_flags){const h=m("li",""),b=m("span","sev "+f.severity,f.severity.toUpperCase());h.appendChild(b),h.appendChild(m("strong",""," "+f.flag)),f.evidence&&h.appendChild(m("span","evidence",` — “${f.evidence}”`)),l.appendChild(h)}e.appendChild(l)}else e.appendChild(m("p","no-flags","No red flags found in this ad."));if(t.green_flags.length){e.appendChild(m("h2","","Green flags"));const l=m("ul","flags green");for(const f of t.green_flags)l.appendChild(m("li","",f));e.appendChild(l)}if(t.verify_steps.length){e.appendChild(m("h2","","Verify before you apply"));const l=m("ol","verify");for(const f of t.verify_steps)l.appendChild(m("li","",f));e.appendChild(l)}const a=m("div","actions"),c=m("button","btn secondary","Copy verdict");c.addEventListener("click",async()=>{const l=[`JobGuard AI verdict: ${t.verdict} (risk ${t.risk_score}/100)`,"",t.summary,"",...t.red_flags.map(f=>`RED FLAG [${f.severity}]: ${f.flag} — "${f.evidence}"`),...t.green_flags.map(f=>`GREEN FLAG: ${f}`),"","Verify before you apply:",...t.verify_steps.map((f,h)=>`${h+1}. ${f}`)];try{await navigator.clipboard.writeText(l.join(`
`)),c.textContent="Copied!",setTimeout(()=>c.textContent="Copy verdict",1500)}catch{c.textContent="Copy failed — select the text manually"}}),a.appendChild(c),e.appendChild(a)}function U(){const t=y("jobAd").value.length;y("count").textContent=`${t.toLocaleString()} characters · ~${Math.max(1,Math.round(t/5))} words`,y("checkBtn").disabled=O.busy||t<50,y("hint").textContent=t===0?"Paste the full job ad text — the more complete, the better the check.":t<50?"A little more text, please (at least 50 characters).":O.mode==="demo"||!ee?"Ready — demo rules will check this ad (no live AI configured).":"Ready — live Gemini will check this ad."}async function Tt(){const t=y("jobAd").value.trim();if(t.length<50||O.busy)return;O.busy=!0,U(),y("result").hidden=!0,Y("Checking…","busy");const e=O.mode==="live"||O.mode==="auto"&&ee;try{const n=e?await Li(t):Ui(t);Vi(n),Y(n.source==="LIVE_AI"?`Done — live Gemini verdict: ${n.verdict}.`:`Done — demo verdict: ${n.verdict}. (Demo rules only — connect Firebase AI Logic for live AI.)`,"ok")}catch(n){console.error(n),Y(`Live AI check failed: ${(n==null?void 0:n.message)||n}. Your text was not analyzed. If you are the developer, check the Firebase setup in NOTES.md; or switch to Demo mode to try the local rules.`,"error")}finally{O.busy=!1,U()}}function Ie(t){y("jobAd").value=t==="scam"?Gi:Hi,y("result").hidden=!0,Y("",""),U(),y("jobAd").focus()}function qi(){const t=y("modeSelect");ee?(t.value="auto",O.mode="auto"):(t.value="demo",O.mode="demo",t.disabled=!0,y("modeNote").textContent="Live AI is not configured yet (no Firebase project). Demo mode uses transparent local rules — see NOTES.md 'Going live'."),t.addEventListener("change",e=>{O.mode=e.target.value,U()})}function zi(){ee||(y("demoBanner").hidden=!1),y("appcheckNote").textContent=`App Check: ${Mi()}${Ce?" · localhost":""}`,qi(),y("sampleScamBtn").addEventListener("click",()=>Ie("scam")),y("sampleRealBtn").addEventListener("click",()=>Ie("real")),y("clearBtn").addEventListener("click",()=>{y("jobAd").value="",y("result").hidden=!0,Y("",""),U(),y("jobAd").focus()}),y("jobAd").addEventListener("input",U),y("checkBtn").addEventListener("click",Tt);const t=new URLSearchParams(location.search),e=t.get("example");(e==="scam"||e==="real")&&(Ie(e),t.get("autorun")==="1"&&setTimeout(Tt,150)),U()}zi();
