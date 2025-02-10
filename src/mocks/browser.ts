import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

const worker = setupWorker(...handlers);

const startWorker = async () => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('Starting MSW worker...');
      await worker.start({
        onUnhandledRequest: 'bypass',
        quiet: true,
        serviceWorker: {
          url: '/mockServiceWorker.js',
          options: {
            scope: '/'
          }
        }
      });
      console.log('MSW worker started successfully');
    }
  } catch (error) {
    console.error('Failed to start MSW worker:', error);
  }
};

export { worker, startWorker }; 