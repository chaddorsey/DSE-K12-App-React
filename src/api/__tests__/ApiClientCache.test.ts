import { ApiClient } from '../ApiClient';
import { NetworkClient } from '../../utils/NetworkClient';
import { NetworkMonitor } from '../../utils/NetworkMonitor';
import { RequestCache } from '../../utils/RequestCache';

describe('ApiClientCache', () => {
  let client: ApiClient;
  let networkClient: NetworkClient;
  let mockCache: jest.Mocked<RequestCache>;

  beforeEach(() => {
    networkClient = new NetworkClient(new NetworkMonitor());
    
    // Create mock cache with correct type casting
    mockCache = {
      get: jest.fn(),
      set: jest.fn(),
      clear: jest.fn(),
      delete: jest.fn(), // Add any required methods from RequestCache interface
      has: jest.fn()
    } as unknown as jest.Mocked<RequestCache>;

    client = new ApiClient(networkClient, {
      baseUrl: 'https://api.example.com',
      cacheConfig: {
        ttl: 300000, // 5 minutes
        maxEntries: 100
      }
    });
  });

  // ... rest of test file ...
}); 