/**
 * Tests for useAsync hook
 */

import { renderHook, act } from '../testing/renderHook';
import { useAsync } from '../useAsync';
import { mockMonitoring } from '../testing/mockMonitoring';

describe('useAsync', () => {
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic functionality', () => {
    it('should handle successful async operations', async () => {
      const mockFn = jest.fn().mockResolvedValue('success');
      const { result } = renderHook(() => useAsync(mockFn));

      expect(result.current.status).toBe('idle');

      await act(async () => {
        await result.current.execute();
      });

      expect(result.current.status).toBe('success');
      expect(result.current.data).toBe('success');
      expect(result.current.error).toBeUndefined();
    });

    it('should handle errors', async () => {
      const error = new Error('test error');
      const mockFn = jest.fn().mockRejectedValue(error);
      const { result } = renderHook(() => useAsync(mockFn));

      await act(async () => {
        try {
          await result.current.execute();
        } catch (e) {
          // Expected error
        }
      });

      expect(result.current.status).toBe('error');
      expect(result.current.error).toBe(error);
      expect(result.current.data).toBeUndefined();
    });

    it('should reset state', async () => {
      const mockFn = jest.fn().mockResolvedValue('success');
      const { result } = renderHook(() => useAsync(mockFn));

      await act(async () => {
        await result.current.execute();
      });

      expect(result.current.status).toBe('success');

      act(() => {
        result.current.reset();
      });

      expect(result.current.status).toBe('idle');
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeUndefined();
    });
  });

  describe('monitoring integration', () => {
    it('should track successful operations', async () => {
      const mockFn = jest.fn().mockResolvedValue('success');
      const { result } = renderHook(() => useAsync(mockFn, {
        monitoring: {
          name: 'test_operation',
          tags: { type: 'test' }
        }
      }));

      await act(async () => {
        await result.current.execute();
      });

      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
        name: 'test_operation',
        totalTime: expect.any(Number),
        success: true,
        tags: { type: 'test' }
      });
    });

    it('should track errors', async () => {
      const error = new Error('test error');
      const mockFn = jest.fn().mockRejectedValue(error);
      const { result } = renderHook(() => useAsync(mockFn, {
        monitoring: {
          name: 'test_operation',
          tags: { type: 'test' }
        }
      }));

      await act(async () => {
        try {
          await result.current.execute();
        } catch (e) {
          // Expected error
        }
      });

      expect(mockMonitors.trackError).toHaveBeenCalledWith(
        error,
        expect.objectContaining({
          operation: 'test_operation',
          duration: expect.any(Number),
          type: 'test'
        })
      );
    });
  });

  describe('cancellation', () => {
    it('should cancel operation on unmount', async () => {
      const mockFn = jest.fn().mockImplementation(() => 
        new Promise(resolve => setTimeout(resolve, 100))
      );
      const { result, unmount } = renderHook(() => useAsync(mockFn));

      const executePromise = act(async () => {
        await result.current.execute();
      });

      unmount();

      await expect(executePromise).rejects.toThrow('Operation cancelled');
    });

    it('should not update state after unmount', async () => {
      const mockFn = jest.fn().mockResolvedValue('success');
      const { result, unmount } = renderHook(() => useAsync(mockFn));

      const executePromise = result.current.execute();
      unmount();
      await executePromise.catch(() => {});

      expect(result.current.status).toBe('idle');
    });
  });

  describe('callbacks', () => {
    it('should call onSuccess callback', async () => {
      const onSuccess = jest.fn();
      const mockFn = jest.fn().mockResolvedValue('success');
      const { result } = renderHook(() => useAsync(mockFn, { onSuccess }));

      await act(async () => {
        await result.current.execute();
      });

      expect(onSuccess).toHaveBeenCalledWith('success');
    });

    it('should call onError callback', async () => {
      const error = new Error('test error');
      const onError = jest.fn();
      const mockFn = jest.fn().mockRejectedValue(error);
      const { result } = renderHook(() => useAsync(mockFn, { onError }));

      await act(async () => {
        try {
          await result.current.execute();
        } catch (e) {
          // Expected error
        }
      });

      expect(onError).toHaveBeenCalledWith(error);
    });
  });
}); 