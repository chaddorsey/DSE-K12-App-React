import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

async function prepare() {
  if (process.env.NODE_ENV === 'development') {
    const { startWorker } = await import('./mocks/browser');
    console.log('Starting mock service worker...');
    await startWorker();
    console.log('Mock service worker started');
  }
}

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

prepare().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}); 