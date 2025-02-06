import { NetworkClient } from '../NetworkClient';
import { NetworkMonitor } from '../NetworkMonitor';
import { RetryError } from '../withRetry';

jest.mock('../NetworkMonitor');

describe('NetworkClient', () => {
  let networkClient: NetworkClient;
  let mockMonitor: jest.Mocked<NetworkMonitor>;

  beforeEach(() => {
    jest.useFakeTimers();
    
    mockMonitor = {
      getStatus: jest.fn().mockReturnValue({ isOnline: true }),
      detectPortalRedirect: jest.fn().mockReturnValue(false),
      subscribe: jest.fn(),
      destroy: jest.fn()
    } as unknown as jest.Mocked<NetworkMonitor>;

    networkClient = new NetworkClient(mockMonitor, {
      baseUrl: 'https://api.example.com'
    });

    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it('should make successful requests', async () => {
    const mockResponse = { data: 'test' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await networkClient.get('/test');

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/test',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('should not retry on portal redirects', async () => {
    mockMonitor.detectPortalRedirect.mockReturnValueOnce(true);
    (global.fetch as jest.Mock).mockResolvedValueOnce({});

    await expect(networkClient.get('/test')).rejects.toThrow('portal redirect');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should wait for network to be online', async () => {
    mockMonitor.getStatus.mockReturnValueOnce({ isOnline: false });

    const promise = networkClient.get('/test');
    jest.runAllTimers();

    await expect(promise).rejects.toThrow(RetryError);
  });

  it('should make POST requests with JSON data', async () => {
    const mockResponse = { success: true };
    const postData = { test: 'data' };
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await networkClient.post('/test', postData);

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/test',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(postData),
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    );
  });

  it('should handle different response types', async () => {
    const textResponse = 'text response';
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(textResponse)
    });

    const result = await networkClient.get('/test', { responseType: 'text' });

    expect(result).toBe(textResponse);
  });
}); 