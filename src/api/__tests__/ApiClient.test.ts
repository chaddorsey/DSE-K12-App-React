import { ApiClient } from '../ApiClient';
import { NetworkClient } from '../../utils/NetworkClient';
import { ApiErrorHandler } from '../ApiErrorHandler';
import { 
  ValidationError, 
  AuthenticationError,
  ServerError 
} from '../../errors/ApiError';
import { logger } from '../../utils/logger';
import type { EndpointPath } from '../types/endpoints';

// Mock dependencies
jest.mock('../../utils/NetworkClient');
jest.mock('../ApiErrorHandler');
jest.mock('../../utils/logger');
jest.mock('../../services/mockApi');

describe('ApiClient', () => {
  let apiClient: ApiClient;
  let mockNetworkClient: jest.Mocked<NetworkClient>;
  let mockErrorHandler: jest.Mocked<ApiErrorHandler>;
  
  // Use a valid endpoint path for tests
  const testEndpoint = 'users' as EndpointPath;

  beforeEach(() => {
    mockNetworkClient = new NetworkClient({} as any) as jest.Mocked<NetworkClient>;
    mockErrorHandler = new ApiErrorHandler() as jest.Mocked<ApiErrorHandler>;
    
    apiClient = new ApiClient(
      mockNetworkClient,
      { baseUrl: 'https://api.example.com' },
      mockErrorHandler
    );

    // Reset mocks
    jest.clearAllMocks();
  });

  it('should successfully make a request', async () => {
    const mockResponse = new Response(
      JSON.stringify({ data: 'test' }), 
      { status: 200, statusText: 'OK' }
    );
    mockNetworkClient.request.mockResolvedValue(mockResponse);

    const result = await apiClient.request(testEndpoint);

    expect(result).toEqual({ data: 'test' });
    expect(mockNetworkClient.request).toHaveBeenCalledWith(
      `https://api.example.com/${testEndpoint}`,
      expect.any(Object)
    );
    expect(logger.info).toHaveBeenCalled();
  });

  it('should handle validation errors', async () => {
    const validationError = new ValidationError('Invalid input');
    mockNetworkClient.request.mockRejectedValue(new Error('Bad Request'));
    mockErrorHandler.handleError.mockReturnValue(validationError);

    await expect(apiClient.request(testEndpoint))
      .rejects
      .toThrow(ValidationError);

    expect(mockErrorHandler.handleError).toHaveBeenCalled();
    expect(mockErrorHandler.getRecoveryAction).toHaveBeenCalledWith(validationError);
  });

  it('should attempt recovery for auth errors', async () => {
    const authError = new AuthenticationError('Token expired');
    const mockRecovery = jest.fn();
    
    mockNetworkClient.request.mockRejectedValue(new Error('Unauthorized'));
    mockErrorHandler.handleError.mockReturnValue(authError);
    mockErrorHandler.getRecoveryAction.mockReturnValue(mockRecovery);

    await expect(apiClient.request(testEndpoint))
      .rejects
      .toThrow(AuthenticationError);

    expect(mockRecovery).toHaveBeenCalled();
  });

  it('should handle server errors', async () => {
    const serverError = new ServerError('Internal error');
    mockNetworkClient.request.mockRejectedValue(new Error('Server Error'));
    mockErrorHandler.handleError.mockReturnValue(serverError);

    await expect(apiClient.request(testEndpoint))
      .rejects
      .toThrow(ServerError);
  });

  it('should use development mock API when configured', async () => {
    const mockProcess = process as any;
    const originalEnv = mockProcess.env.NODE_ENV;
    mockProcess.env.NODE_ENV = 'development';

    const mockData = { test: true };
    const mockApi = require('../../services/mockApi').mockApi;
    mockApi.request.mockResolvedValue(mockData);

    try {
      const result = await apiClient.request(testEndpoint);
      expect(result).toEqual(mockData);
      expect(mockNetworkClient.request).not.toHaveBeenCalled();
    } finally {
      mockProcess.env.NODE_ENV = originalEnv;
    }
  });

  it('should handle network client errors', async () => {
    const networkError = new Error('Network failed');
    mockNetworkClient.request.mockRejectedValue(networkError);
    mockErrorHandler.handleError.mockReturnValue(new ServerError('Network error'));

    await expect(apiClient.request(testEndpoint))
      .rejects
      .toThrow(ServerError);

    expect(mockErrorHandler.handleError).toHaveBeenCalledWith(
      networkError,
      testEndpoint
    );
  });
}); 