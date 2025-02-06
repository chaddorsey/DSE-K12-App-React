/**
 * Tests for API client implementation
 */

import { ApiClient, ApiError } from '../client';
import { MonitoringService } from '../../monitoring/MonitoringService';

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock monitoring
jest.mock('../../monitoring/MonitoringService', () => ({
  MonitoringService: {
    getInstance: jest.fn(() => ({
      trackPerformance: jest.fn(),
      trackError: jest.fn()
    }))
  }
}));

describe('ApiClient', () => {
  let client: ApiClient;
  let monitoring: jest.Mocked<MonitoringService>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockReset();
    client = new ApiClient('https://api.example.com');
    monitoring = MonitoringService.getInstance() as jest.Mocked<MonitoringService>;
  });

  describe('request methods', () => {
    it('should make GET request correctly', async () => {
      const mockResponse = { data: 'test' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await client.get('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should make POST request with data', async () => {
      const mockData = { name: 'test' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true })
      });

      await client.post('/test', mockData);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(mockData)
        })
      );
    });
  });

  describe('error handling', () => {
    it('should handle API errors', async () => {
      const errorResponse = {
        code: 'VALIDATION_ERROR',
        message: 'Invalid data',
        status: 400
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: () => Promise.resolve(errorResponse)
      });

      await expect(client.post('/test', {})).rejects.toThrow(ApiError);
      expect(monitoring.trackError).toHaveBeenCalled();
    });

    it('should retry on server errors', async () => {
      mockFetch
        .mockRejectedValueOnce(new Error('Server error'))
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ success: true })
        });

      const result = await client.get('/test', { retries: 2 });

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(result).toEqual({ success: true });
    });

    it('should not retry on client errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ code: 'BAD_REQUEST' })
      });

      await expect(client.get('/test', { retries: 3 })).rejects.toThrow();
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('monitoring', () => {
    it('should track successful requests', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true })
      });

      await client.get('/test');

      expect(monitoring.trackPerformance).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'api_get',
          success: true,
          metadata: expect.objectContaining({
            url: '/test',
            attempt: 1
          })
        })
      );
    });

    it('should track failed requests', async () => {
      const error = new Error('Network error');
      mockFetch.mockRejectedValueOnce(error);

      await expect(client.get('/test')).rejects.toThrow();

      expect(monitoring.trackError).toHaveBeenCalledWith(
        error,
        expect.objectContaining({
          url: '/test',
          attempt: 1,
          method: 'GET'
        })
      );
    });
  });
}); 