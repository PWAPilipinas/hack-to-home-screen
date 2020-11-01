'use strict';

let cn = '1.21';
let cacheWhiteList = ['1.21'];
let assetsList = [
    '/offline.html',
    '/index.html',
    '/index.js',
    '/assets/fonts/iconfont/material-icons.css',
    '/assets/fonts/iconfont/MaterialIcons-Regular.eot',
    '/assets/fonts/iconfont/MaterialIcons-Regular.ijmap',
    '/assets/fonts/iconfont/MaterialIcons-Regular.svg',
    '/assets/fonts/iconfont/MaterialIcons-Regular.ttf',
    '/assets/fonts/iconfont/MaterialIcons-Regular.woff',
    '/assets/fonts/iconfont/MaterialIcons-Regular.woff2',
    '/assets/js/jquery.min.js',
    '/assets/js/lodash.min.js',
    '/assets/materialize/css/materialize.css',
    '/assets/materialize/css/materialize.min.css',
    '/assets/materialize/js/materialize.js',
    '/assets/materialize/js/materialize.min.js'
];

// Install Event
self.addEventListener('install', event => {
    // Open the cache
    event.waitUntil(caches.open(cn)
        .then(cache => {
            // Fetch all the assets from the array
            return cache.addAll(assetsList);
        }).then(() => {
            console.log("done caching");
        })
    );
});


self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                //Fallback to network
                return response || fetch(event.request);
            })
            .catch(r => {
                let method = event.request.method;

                if (method !== 'POST') {
                    return caches.match('index.html');
                }

            })
    );
});

// Remove Old Caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (cacheWhiteList.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});