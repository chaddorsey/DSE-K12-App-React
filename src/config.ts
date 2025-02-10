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
  apiUrl: '/api',
  environment: 'development',
  debug: true
};

export const config: Config = window.__CONFIG__ || defaultConfig; 