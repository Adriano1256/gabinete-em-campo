/* Gabinete em Campo: guarda o aplicativo no aparelho para abrir sem internet */
const V='gec-447f433e95',ARQ=["./", "index.html", "logo.webp", "foto.webp", "manifest.webmanifest", "lib/jspdf.umd.min.js", "lib/jspdf.plugin.autotable.min.js", "icons/icon-192.png", "sat/mun.jpg", "sat/v0.jpg", "sat/v1.jpg", "sat/v10.jpg", "sat/v11.jpg", "sat/v12.jpg", "sat/v13.jpg", "sat/v14.jpg", "sat/v15.jpg", "sat/v2.jpg", "sat/v3.jpg", "sat/v4.jpg", "sat/v5.jpg", "sat/v6.jpg", "sat/v7.jpg", "sat/v8.jpg", "sat/v9.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ARQ)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put('index.html',c));return r}).catch(()=>caches.match('index.html')));return}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.ok){const c=n.clone();caches.open(V).then(x=>x.put(e.request,c))}return n})))});
