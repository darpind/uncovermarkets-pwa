self.addEventListener("install", event => {
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  clients.claim();
});
self.addEventListener("fetch", event => {
  // Basic pass-through; you can add caching strategies here if needed
});
