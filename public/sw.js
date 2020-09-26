let cachesData = 'appvl'

self.addEventListener('install', (event) => {
    // Perform install steps
    event.waitUntil(
        caches.open(cachesData).then(data => {
            data.addAll([
                "./static/js/bundle.js",
                './static/js/0.chunk.js',
                './static/js/main.chunk.js',
                'index.html',
                '/',
                'https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}',
            ])
        }

    ).catch(err => {
        console.log('err', err)
    })
    )
});
  
this.addEventListener('fetch', (event) => {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then(result => {
                console.log('result2:', result);
                if (result) {
                    return result;
                }
            })
        )
    }
})