// sw.js
const cache_assets = [
    "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/alpinejs/3.5.2/cdn.js",
    // "/style.css",
    "/curing-calculator/docroot/index.html",
    "/curing-calculator/docroot/"
];

let cache_name = "CureCalculator"; // The string used to identify our cache
self.addEventListener("install", event => {
    console.log("installing...");
    event.waitUntil(
        caches
            .open(cache_name)
            .then(cache => {
                return cache.addAll(cache_assets);
            })
            .catch(err => console.error(err))
    );
});

self.addEventListener("fetch", event => {
    if (event.request.url === "http://192.168.0.35/curing-calculator/docroot/index.html") {
        // or whatever your app's URL is
        event.respondWith(
            fetch(event.request).catch(err =>
                self.cache.open(cache_name).then(cache => cache.match("/curing-calculator/docroot/index.html"))
            )
        );
    } else {
        event.respondWith(
            fetch(event.request).catch(err =>
                caches.match(event.request).then(response => response)
            )
        );
    }
});
