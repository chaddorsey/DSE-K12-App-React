import { NetworkClient } from '../NetworkClient';
import { NetworkMonitor } from '../NetworkMonitor';
import { NetworkError, OfflineError, HttpError } from '../../errors/NetworkError';
import { logger } from '../logger';

// Mock dependencies
jest.mock('../NetworkMonitor');
jest.mock('../logger');

describe('NetworkClient', () => {
  let networkClient: NetworkClient;
  let mockMonitor: jest.Mocked<NetworkMonitor>;
  let originalFetch: typeof global.fetch;

  beforeAll(() => {
    originalFetch = global.fetch;
  });

  beforeEach(() => {
    // Setup mock monitor
    mockMonitor = new NetworkMonitor() as jest.Mocked<NetworkMonitor>;
    mockMonitor.getStatus.mockReturnValue({ isOnline: true });
    mockMonitor.checkConnection.mockResolvedValue({ isOnline: true });

    // Create network client instance
    networkClient = new NetworkClient(mockMonitor, {
      retryPolicy: {
        maxAttempts: 3,
        backoffMs: 100
      }
    });

    // Reset logger mock
    jest.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('should successfully make a request', async () => {
    const mockResponse = { ok: true, json: () => Promise.resolve({ data: 'test' }) };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const response = await networkClient.request('https://api.example.com/test');
    expect(response).toBe(mockResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should retry failed requests', async () => {
    const mockError = new Error('Network error');
    const mockSuccess = { ok: true, json: () => Promise.resolve({ data: 'test' }) };
    
    global.fetch = jest.fn()
      .mockRejectedValueOnce(mockError)
      .mockRejectedValueOnce(mockError)
      .mockResolvedValueOnce(mockSuccess);

    const response = await networkClient.request('https://api.example.com/test');
    
    expect(response).toBe(mockSuccess);
    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(logger.warn).toHaveBeenCalledTimes(2);
  });

  it('should handle offline status', async () => {
    mockMonitor.getStatus.mockReturnValue({ isOnline: false });

    await expect(networkClient.request('https://api.example.com/test'))
      .rejects
      .toThrow(OfflineError);
    
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should handle HTTP errors', async () => {
    const errorResponse = { 
      ok: false, 
      status: 404,
      text: () => Promise.resolve('Not Found')
    };
    global.fetch = jest.fn().mockResolvedValue(errorResponse);

    await expect(networkClient.request('https://api.example.com/test'))
      .rejects
      .toThrow(NetworkError);
    
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should timeout long requests', async () => {
    jest.useFakeTimers();
    
    global.fetch = jest.fn().mockImplementation(() => new Promise(resolve => {
      setTimeout(resolve, 6000); // Longer than default timeout
    }));

    const requestPromise = networkClient.request('https://api.example.com/test', {
      timeout: 1000
    });

    jest.advanceTimersByTime(2000);
    
    await expect(requestPromise).rejects.toThrow();
    
    jest.useRealTimers();
  });

  it('should use exponential backoff for retries', async () => {
    jest.useFakeTimers();
    
    const mockError = new Error('Network error');
    global.fetch = jest.fn().mockRejectedValue(mockError);

    const requestPromise = networkClient.request('https://api.example.com/test');
    
    // First attempt fails immediately
    await jest.advanceTimersByTimeAsync(0);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Second attempt after backoff
    await jest.advanceTimersByTimeAsync(100);
    expect(global.fetch).toHaveBeenCalledTimes(2);

    // Third attempt after doubled backoff
    await jest.advanceTimersByTimeAsync(200);
    expect(global.fetch).toHaveBeenCalledTimes(3);

    await expect(requestPromise).rejects.toThrow();
    
    jest.useRealTimers();
  });

  it('should merge config options correctly', async () => {
    const mockResponse = { ok: true, json: () => Promise.resolve({ data: 'test' }) };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    await networkClient.request('https://api.example.com/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      retry: {
        maxAttempts: 2
      }
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/test',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
    );
  });
}); 