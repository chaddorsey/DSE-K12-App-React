import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

const worker = setupWorker(...handlers);

const startWorker = async () => {
  if (process.env.NODE_ENV === 'development') {
    // Disable MSW for now since we don't need it for onboarding
    // await worker.start();
    return;
  }
};

export { worker, startWorker }; 