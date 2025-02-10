import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export const startWorker = async () => {
  return worker.start({
    onUnhandledRequest: (request, print) => {
      // Ignore static assets
      const staticExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.json', '.css', '.js'];
      try {
        const url = new URL(request.url);
        const shouldIgnore = staticExtensions.some(ext => url.pathname.endsWith(ext));
        
        if (!shouldIgnore) {
          print.warning();
        }
      } catch (error) {
        // If URL parsing fails, show the warning
        print.warning();
      }
    },
    serviceWorker: {
      url: '/mockServiceWorker.js'
    }
  });
}; 