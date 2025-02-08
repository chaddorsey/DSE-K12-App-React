/**
 * Integration tests for API infrastructure
 */

import { ApiClient } from '../client';
import { ValidationError, NetworkError, AuthenticationError } from '../../utils/errors';
import { MonitoringService } from '../../monitoring/MonitoringService';
import type { IApiResponse } from '../types';

// Mock monitoring service
jest.mock('../../monitoring/MonitoringService');

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Real monitoring instance for integration testing
const monitoring = MonitoringService.getInstance();

describe('API Infrastructure Integration', () => {
  let client: ApiClient;
  let trackErrorSpy: jest.SpyInstance;
  const trackPerformanceSpy = jest.spyOn(monitoring, 'trackPerformance');

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockReset();
    client = new ApiClient({
      baseUrl: 'https://api.test.com'
    });
    
    trackErrorSpy = jest.spyOn(MonitoringService.getInstance(), 'trackError');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Error Handling Flow', () => {
    it('should handle validation errors with proper monitoring', async () => {
      const validationError = {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input',
        fields: { email: ['Invalid format'] }
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () => Promise.resolve(validationError)
      });

      try {
        await client.post('/users', { email: 'invalid' });
        fail('Should have thrown error');
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect(trackErrorSpy).toHaveBeenCalledWith(
          expect.any(Error),
          expect.objectContaining({
            url: '/users',
            method: 'POST'
          })
        );
      }
    });

    it('should handle authentication flow errors', async () => {
      // First request - valid token
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: 'success' })
      });

      // Second request - token expired
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: () => Promise.resolve({
          code: 'AUTH_ERROR',
          message: 'Token expired'
        })
      });

      // First request should succeed
      await client.get('/protected');
      expect(trackPerformanceSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true
        })
      );

      // Second request should fail with auth error
      try {
        await client.get('/protected');
        fail('Should have thrown error');
      } catch (error) {
        expect(error).toBeInstanceOf(AuthenticationError);
        expect(trackErrorSpy).toHaveBeenCalledWith(
          expect.any(Error),
          expect.objectContaining({
            attempt: 1
          })
        );
      }
    });

    it('should handle network errors with retries', async () => {
      const networkError = new Error('Network failure');
      mockFetch
        .mockRejectedValueOnce(networkError)  // First attempt fails
        .mockRejectedValueOnce(networkError)  // Second attempt fails
        .mockResolvedValueOnce({             // Third attempt succeeds
          ok: true,
          json: () => Promise.resolve({ success: true })
        });

      const result = await client.get('/data', { retries: 3 });

      expect(result).toEqual({ success: true });
      expect(mockFetch).toHaveBeenCalledTimes(3);
      expect(trackErrorSpy).toHaveBeenCalledTimes(2);
      expect(trackPerformanceSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          metadata: expect.objectContaining({
            attempt: 3
          })
        })
      );
    });
  });

  describe('Performance Monitoring Flow', () => {
    it('should track request lifecycle timings', async () => {
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
      mockFetch.mockImplementationOnce(async () => {
        await delay(50);  // Simulate network delay
        return {
          ok: true,
          json: () => Promise.resolve({ data: 'test' })
        };
      });

      const startTime = Date.now();
      await client.get('/slow-endpoint');
      const endTime = Date.now();

      expect(trackPerformanceSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'api_get',
          totalTime: expect.any(Number)
        })
      );

      const { totalTime } = trackPerformanceSpy.mock.calls[0][0];
      expect(totalTime).toBeGreaterThanOrEqual(50);
      expect(totalTime).toBeLessThanOrEqual(endTime - startTime);
    });

    it('should batch multiple rapid requests efficiently', async () => {
      const responses = Array(5).fill({
        ok: true,
        json: () => Promise.resolve({ success: true })
      });

      mockFetch.mockResolvedValueOnce(responses[0])
               .mockResolvedValueOnce(responses[1])
               .mockResolvedValueOnce(responses[2])
               .mockResolvedValueOnce(responses[3])
               .mockResolvedValueOnce(responses[4]);

      // Make multiple requests in parallel
      await Promise.all([
        client.get('/endpoint1'),
        client.get('/endpoint2'),
        client.get('/endpoint3'),
        client.get('/endpoint4'),
        client.get('/endpoint5')
      ]);

      expect(trackPerformanceSpy).toHaveBeenCalledTimes(5);
      
      // Verify each request was tracked independently
      const uniqueRequestIds = new Set(
        trackPerformanceSpy.mock.calls.map(
          call => call[0].tags?.url
        )
      );
      expect(uniqueRequestIds.size).toBe(5);
    });
  });

  describe('Error Recovery Flow', () => {
    it('should handle intermittent failures gracefully', async () => {
      const networkError = new NetworkError('Connection lost');
      let attemptCount = 0;

      mockFetch.mockImplementation(async () => {
        attemptCount++;
        if (attemptCount % 2 === 1) {
          throw networkError;
        }
        return {
          ok: true,
          json: () => Promise.resolve({ success: true })
        };
      });

      const results = await Promise.allSettled([
        client.get('/endpoint1', { retries: 2 }),
        client.get('/endpoint2', { retries: 2 }),
        client.get('/endpoint3', { retries: 2 })
      ]);

      const successfulRequests = results.filter(
        result => result.status === 'fulfilled'
      );
      expect(successfulRequests.length).toBeGreaterThan(0);

      // Verify error tracking for failed attempts
      const errorTrackingCalls = trackErrorSpy.mock.calls.filter(
        call => call[0] === networkError
      );
      expect(errorTrackingCalls.length).toBeGreaterThan(0);
    });
  });
}); 