interface Config {
  apiUrl: string;
  environment: string;
  debug: boolean;
}

declare global {
  interface Window {
    __CONFIG__: Config;
  }
}

const defaultConfig: Config = {
  apiUrl: 'http://localhost:3001',
  environment: 'development',
  debug: true
};

export const config: Config = window.__CONFIG__ || defaultConfig; 