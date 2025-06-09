// Al-Wasiloon Fertilizer Factory Mobile App - Service Worker
// Provides offline functionality and app-like behavior

const CACHE_NAME = 'al-wasiloon-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/app-mobile.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('Cache failed:', err);
        // Continue without caching external resources if they fail
        return caches.open(CACHE_NAME)
          .then(cache => {
            return cache.addAll(['/', '/index.html', '/app-mobile.js', '/manifest.json']);
          });
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // Clone the request because it's a stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response because it's a stream
          const responseToCache = response.clone();
          
          // Add to cache for future use
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(() => {
          // Return offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// Background sync for data synchronization
self.addEventListener('sync', event => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

// Push notification handler
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from Al-Wasiloon Factory',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" fill="%2316a34a" rx="24"/><text x="96" y="120" font-size="80" text-anchor="middle" fill="white">🏭</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" fill="%2316a34a" rx="12"/><text x="48" y="60" font-size="40" text-anchor="middle" fill="white">🏭</text></svg>',
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    },
    actions: [
      {
        action: 'view',
        title: 'View App',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Al-Wasiloon Factory', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else {
    event.waitUntil(
      clients.matchAll().then(clientList => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow('/');
      })
    );
  }
});

// Helper function for data synchronization
async function syncData() {
  try {
    console.log('Syncing data in background...');
    // This would typically sync with a server
    // For offline-first app, we'll just log the action
    return Promise.resolve();
  } catch (error) {
    console.error('Data sync failed:', error);
    throw error;
  }
}

// Share target handler (for receiving shared content)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SHARE_TARGET') {
    console.log('Received shared content:', event.data);
    // Handle shared content if needed
  }
});

// Periodic background sync
self.addEventListener('periodicsync', event => {
  if (event.tag === 'daily-sync') {
    event.waitUntil(syncData());
  }
});