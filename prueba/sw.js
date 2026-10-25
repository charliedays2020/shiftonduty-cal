/* ShiftOnDuty · funciona sin internet. Al publicar una versión nueva cambia V y el teléfono la toma al abrir la app. */
const V='sod-1.8-firebase49';
const BASE=['./','index.html','manifest.json','icons/icon-180.png','icons/icon-192.png','icons/icon-512.png','vendor/jsQR.js','pdfjs/pdf.min.js','pdfjs/pdf.worker.min.js','airport-photo.jpg','vendor/firebase/firebase-app-compat.js','vendor/firebase/firebase-auth-compat.js','vendor/firebase/firebase-firestore-compat.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(BASE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  if(r.mode==='navigate'){ // la app: primero internet (para tener la última versión), si no hay, la guardada
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put('index.html',cp));return res;}).catch(()=>caches.match('index.html')));return;}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res;})));});
