import { ApiClient } from '../ApiClient';
import { NetworkClient } from '../../utils/NetworkClient';
import { NetworkMonitor } from '../../utils/NetworkMonitor';
import { ApiError } from '../types';

jest.mock('../../utils/NetworkClient');

describe('ApiClient', () => {
  let apiClient: ApiClient;
  let mockNetworkClient: jest.Mocked<NetworkClient>;

  beforeEach(() => {
    mockNetworkClient = new NetworkClient(new NetworkMonitor()) as jest.Mocked<NetworkClient>;
    apiClient = new ApiClient(mockNetworkClient, {
      baseUrl: 'https://api.example.com',
      defaultHeaders: {
        'X-API-Key': 'test-key'
      }
    });
  });

  describe('GET requests', () => {
    it('should make successful GET requests', async () => {
      const mockResponse = { id: 1, name: 'Test' };
      mockNetworkClient.get.mockResolvedValueOnce(mockResponse);

      const response = await apiClient.get('/test');

      expect(response).toEqual({
        data: mockResponse,
        status: 200,
        headers: expect.any(Headers)
      });
      expect(mockNetworkClient.get).toHaveBeenCalledWith(
        '/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-API-Key': 'test-key'
          })
        })
      );
    });

    it('should handle errors', async () => {
      const mockError = new Error('Network error');
      mockNetworkClient.get.mockRejectedValueOnce(mockError);

      await expect(apiClient.get('/test')).rejects.toThrow(ApiError);
    });
  });

  describe('POST requests', () => {
    it('should make successful POST requests', async () => {
      const mockResponse = { success: true };
      const postData = { test: 'data' };
      mockNetworkClient.post.mockResolvedValueOnce(mockResponse);

      const response = await apiClient.post('/test', postData);

      expect(response.data).toEqual(mockResponse);
      expect(mockNetworkClient.post).toHaveBeenCalledWith(
        '/test',
        postData,
        expect.any(Object)
      );
    });

    it('should handle offline errors', async () => {
      mockNetworkClient.post.mockRejectedValueOnce(
        new Error('Network is offline')
      );

      await expect(apiClient.post('/test', {})).rejects.toThrow(ApiError);
      await expect(apiClient.post('/test', {})).rejects.toMatchObject({
        code: 'OFFLINE'
      });
    });
  });

  describe('PUT requests', () => {
    it('should make successful PUT requests', async () => {
      const mockResponse = { success: true };
      const putData = { test: 'data' };
      mockNetworkClient.fetch.mockResolvedValueOnce(mockResponse);

      const response = await apiClient.put('/test', putData);

      expect(response.data).toEqual(mockResponse);
      expect(mockNetworkClient.fetch).toHaveBeenCalledWith(
        '/test',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(putData),
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
    });

    it('should handle HTTP errors', async () => {
      mockNetworkClient.fetch.mockRejectedValueOnce(
        new Error('HTTP error! status: 404')
      );

      await expect(apiClient.put('/test', {})).rejects.toThrow(ApiError);
      await expect(apiClient.put('/test', {})).rejects.toMatchObject({
        status: 404,
        code: 'HTTP_ERROR'
      });
    });
  });

  describe('DELETE requests', () => {
    it('should make successful DELETE requests', async () => {
      const mockResponse = { success: true };
      mockNetworkClient.fetch.mockResolvedValueOnce(mockResponse);

      const response = await apiClient.delete('/test');

      expect(response.data).toEqual(mockResponse);
      expect(mockNetworkClient.fetch).toHaveBeenCalledWith(
        '/test',
        expect.objectContaining({
          method: 'DELETE'
        })
      );
    });

    it('should handle network errors', async () => {
      mockNetworkClient.fetch.mockRejectedValueOnce(
        new Error('Network is offline')
      );

      await expect(apiClient.delete('/test')).rejects.toThrow(ApiError);
      await expect(apiClient.delete('/test')).rejects.toMatchObject({
        code: 'OFFLINE'
      });
    });
  });
}); 