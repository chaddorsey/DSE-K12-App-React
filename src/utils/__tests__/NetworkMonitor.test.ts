import { NetworkMonitor, INetworkStatus } from '../NetworkMonitor';

// Extend Jest's expect
import '@testing-library/jest-dom';

describe('NetworkMonitor', () => {
  let networkMonitor: NetworkMonitor;
  let mockStatus: INetworkStatus;
  
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = jest.fn();
    
    // Mock navigator.onLine
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      get: jest.fn(() => true),
      set: jest.fn()
    });
    
    networkMonitor = new NetworkMonitor({
      pingEndpoint: '/api/health',
      checkInterval: 30000
    });

    mockStatus = {
      isOnline: true,
      lastChecked: new Date()
    };
  });

  afterEach(() => {
    networkMonitor.destroy();
    jest.resetAllMocks();
  });

  it('should initialize with correct default status', () => {
    const callback = jest.fn();
    networkMonitor.subscribe(callback);
    
    expect(callback).toHaveBeenCalledWith(expect.objectContaining<INetworkStatus>({
      isOnline: true,
      lastChecked: expect.any(Date)
    }));
  });

  it('should detect offline status', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    
    const status = await networkMonitor.checkConnection();
    
    expect(status).toEqual(expect.objectContaining<INetworkStatus>({
      isOnline: false,
      lastChecked: expect.any(Date)
    }));
  });

  it('should detect portal redirects', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValueOnce({
      headers: new Headers({ 'content-type': 'text/html' }),
      redirected: true
    });
    
    const status = await networkMonitor.checkConnection();
    
    expect(status).toEqual(expect.objectContaining<INetworkStatus>({
      isOnline: false,
      lastChecked: expect.any(Date)
    }));
  });

  it('should measure connection type based on latency', async () => {
    jest.useFakeTimers();
    
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockImplementationOnce(() => {
      jest.advanceTimersByTime(500);
      return Promise.resolve({
        headers: new Headers({ 'content-type': 'application/json' }),
        redirected: false
      });
    });
    
    const statusPromise = networkMonitor.checkConnection();
    jest.runAllTimers();
    const status = await statusPromise;
    
    expect(status).toEqual(expect.objectContaining<INetworkStatus>({
      isOnline: true,
      connectionType: '3g',
      latency: expect.any(Number),
      lastChecked: expect.any(Date)
    }));
    
    jest.useRealTimers();
  });
}); 