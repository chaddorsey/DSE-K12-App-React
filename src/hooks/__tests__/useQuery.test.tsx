/**
 * Tests for useQuery hook
 */

import { renderHook, act } from '../testing/renderHook';
import { useQuery } from '../useQuery';
import { mockMonitoring } from '../testing/mockMonitoring';

describe('useQuery', () => {
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('data fetching', () => {
    it('should fetch and cache data', async () => {
      const mockFetch = jest.fn().mockResolvedValue({ data: 'test' });
      
      const { result } = renderHook(() => 
        useQuery('test-key', mockFetch)
      );

      expect(result.current.isLoading).toBe(true);

      await act(async () => {
        await result.current.refetch();
      });

      expect(result.current.data).toEqual({ data: 'test' });
      expect(result.current.isLoading).toBe(false);
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Should use cache on second render
      const { result: result2 } = renderHook(() => 
        useQuery('test-key', mockFetch)
      );
      expect(result2.current.data).toEqual({ data: 'test' });
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should handle errors', async () => {
      const error = new Error('fetch error');
      const mockFetch = jest.fn().mockRejectedValue(error);

      const { result } = renderHook(() => 
        useQuery('test-key', mockFetch)
      );

      await act(async () => {
        await result.current.refetch();
      });

      expect(result.current.error).toBe(error);
      expect(mockMonitors.trackError).toHaveBeenCalledWith(error, {
        operation: 'query',
        key: 'test-key'
      });
    });
  });

  describe('caching', () => {
    it('should respect cache time', async () => {
      jest.useFakeTimers();
      const mockFetch = jest.fn().mockResolvedValue({ data: 'test' });

      const { result, rerender } = renderHook(() => 
        useQuery('test-key', mockFetch, { cacheTime: 1000 })
      );

      await act(async () => {
        await result.current.refetch();
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Advance past cache time
      act(() => {
        jest.advanceTimersByTime(1100);
      });

      rerender();
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('should support manual invalidation', async () => {
      const mockFetch = jest.fn().mockResolvedValue({ data: 'test' });

      const { result } = renderHook(() => 
        useQuery('test-key', mockFetch)
      );

      await act(async () => {
        await result.current.refetch();
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);

      await act(async () => {
        await result.current.invalidate();
      });

      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('optimistic updates', () => {
    it('should support optimistic updates', async () => {
      const mockFetch = jest.fn().mockResolvedValue({ data: 'test' });

      const { result } = renderHook(() => 
        useQuery('test-key', mockFetch)
      );

      await act(async () => {
        await result.current.refetch();
      });

      act(() => {
        result.current.setData({ data: 'optimistic' });
      });

      expect(result.current.data).toEqual({ data: 'optimistic' });
    });

    it('should track optimistic update performance', async () => {
      const { result } = renderHook(() => 
        useQuery('test-key', () => Promise.resolve({ data: 'test' }))
      );

      act(() => {
        result.current.setData({ data: 'optimistic' });
      });

      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
        type: 'optimistic_update',
        key: 'test-key',
        success: true
      });
    });
  });

  describe('background updates', () => {
    it('should support background refetching', async () => {
      const mockFetch = jest.fn()
        .mockResolvedValueOnce({ data: 'initial' })
        .mockResolvedValueOnce({ data: 'updated' });

      const { result } = renderHook(() => 
        useQuery('test-key', mockFetch, { 
          backgroundRefetch: true 
        })
      );

      await act(async () => {
        await result.current.refetch();
      });

      expect(result.current.data).toEqual({ data: 'initial' });

      await act(async () => {
        await result.current.refetchInBackground();
      });

      expect(result.current.data).toEqual({ data: 'updated' });
      expect(result.current.isBackgroundLoading).toBe(false);
    });
  });
}); 