/**
 * Tests for useQuery hook
 */

import { renderHook, act } from '@testing-library/react';
import { useQuery } from '../useQuery';
import { QueryProvider } from '../../components/QueryProvider';
import { mockMonitoring } from '../testing/mockMonitoring';

describe('useQuery', () => {
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and cache data', async () => {
    const queryFn = jest.fn().mockResolvedValue('test data');
    
    const { result, waitForNextUpdate } = renderHook(
      () => useQuery('test-key', queryFn),
      { wrapper: QueryProvider }
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe('test data');
    expect(queryFn).toHaveBeenCalledTimes(1);

    // Should use cached data
    const { result: result2 } = renderHook(
      () => useQuery('test-key', queryFn),
      { wrapper: QueryProvider }
    );

    expect(result2.current.data).toBe('test data');
    expect(queryFn).toHaveBeenCalledTimes(1);
  });

  it('should handle errors', async () => {
    const error = new Error('Failed to fetch');
    const queryFn = jest.fn().mockRejectedValue(error);

    const { result, waitForNextUpdate } = renderHook(
      () => useQuery('test-key', queryFn),
      { wrapper: QueryProvider }
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(error);
    expect(mockMonitors.trackError).toHaveBeenCalledWith(
      error,
      expect.objectContaining({
        type: 'query_error',
        metadata: { key: 'test-key' }
      })
    );
  });

  it('should support manual invalidation', async () => {
    const queryFn = jest.fn()
      .mockResolvedValueOnce('first')
      .mockResolvedValueOnce('second');

    const { result, waitForNextUpdate } = renderHook(
      () => useQuery('test-key', queryFn),
      { wrapper: QueryProvider }
    );

    await waitForNextUpdate();
    expect(result.current.data).toBe('first');

    act(() => {
      result.current.invalidate();
    });

    await waitForNextUpdate();
    expect(result.current.data).toBe('second');
    expect(queryFn).toHaveBeenCalledTimes(2);
  });

  it('should deduplicate concurrent requests', async () => {
    const queryFn = jest.fn().mockResolvedValue('test data');

    const { result: result1, waitForNextUpdate: wait1 } = renderHook(
      () => useQuery('test-key', queryFn),
      { wrapper: QueryProvider }
    );

    const { result: result2, waitForNextUpdate: wait2 } = renderHook(
      () => useQuery('test-key', queryFn),
      { wrapper: QueryProvider }
    );

    await Promise.all([wait1(), wait2()]);

    expect(result1.current.data).toBe('test data');
    expect(result2.current.data).toBe('test data');
    expect(queryFn).toHaveBeenCalledTimes(1);
  });

  it('should track performance metrics', async () => {
    const queryFn = jest.fn().mockResolvedValue('test data');

    const { waitForNextUpdate } = renderHook(
      () => useQuery('test-key', queryFn),
      { wrapper: QueryProvider }
    );

    await waitForNextUpdate();

    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'query_execute',
        metadata: {
          key: 'test-key',
          success: true
        }
      })
    );
  });
}); 