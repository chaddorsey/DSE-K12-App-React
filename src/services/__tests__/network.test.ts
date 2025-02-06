import { networkMonitor, networkClient } from '../network';

describe('Network Service', () => {
  beforeEach(() => {
    // Reset any mocked environment variables
    process.env.REACT_APP_API_URL = undefined;
  });

  it('should initialize networkMonitor with correct config', () => {
    expect(networkMonitor).toBeDefined();
    expect(networkMonitor['pingEndpoint']).toBe('/api/health');
    expect(networkMonitor['checkInterval']).toBe(30000);
  });

  it('should initialize networkClient with correct config', () => {
    expect(networkClient).toBeDefined();
    expect(networkClient['config'].maxAttempts).toBe(3);
    expect(networkClient['config'].initialDelay).toBe(1000);
    expect(networkClient['config'].maxDelay).toBe(10000);
    expect(networkClient['config'].timeout).toBe(15000);
  });

  it('should use environment variable for API URL when available', () => {
    process.env.REACT_APP_API_URL = 'https://api.test.com';
    // Re-import to trigger new initialization
    jest.isolateModules(() => {
      const { networkClient: client } = require('../network');
      expect(client['config'].baseUrl).toBe('https://api.test.com');
    });
  });
}); 