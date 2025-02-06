/**
 * Tests for useMutation hook
 */

import { renderHook, act } from '@testing-library/react';
import { useMutation } from '../useMutation';
import { QueryProvider } from '../../components/QueryProvider';
import { mockMonitoring } from '../testing/mockMonitoring';

describe('useMutation', () => {
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should execute mutation and update cache', async () => {
    const mutationFn = jest.fn().mockResolvedValue({ id: 1, name: 'Updated' });
    
    const { result } = renderHook(
      () => useMutation(mutationFn, {
        invalidateQueries: ['todos']
      }),
      { wrapper: QueryProvider }
    );

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      await result.current.mutate({ name: 'Updated' });
    });

    expect(mutationFn).toHaveBeenCalledWith({ name: 'Updated' });
    expect(result.current.data).toEqual({ id: 1, name: 'Updated' });
  });

  it('should handle optimistic updates', async () => {
    const mutationFn = jest.fn().mockResolvedValue({ id: 1, name: 'Server' });
    
    const { result } = renderHook(
      () => useMutation(mutationFn, {
        optimisticUpdate: (vars) => ({ id: 1, name: vars.name }),
        invalidateQueries: ['todos']
      }),
      { wrapper: QueryProvider }
    );

    let promise: Promise<void>;
    act(() => {
      promise = result.current.mutate({ name: 'Optimistic' });
    });

    // Should have optimistic data immediately
    expect(result.current.data).toEqual({ id: 1, name: 'Optimistic' });

    await act(async () => {
      await promise;
    });

    // Should have server data after completion
    expect(result.current.data).toEqual({ id: 1, name: 'Server' });
  });

  it('should handle errors and rollback', async () => {
    const error = new Error('Mutation failed');
    const mutationFn = jest.fn().mockRejectedValue(error);
    
    const { result } = renderHook(
      () => useMutation(mutationFn, {
        optimisticUpdate: () => ({ id: 1, name: 'Optimistic' }),
        invalidateQueries: ['todos']
      }),
      { wrapper: QueryProvider }
    );

    await act(async () => {
      try {
        await result.current.mutate({ name: 'Test' });
      } catch (e) {
        // Expected error
      }
    });

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined(); // Should rollback
    expect(mockMonitors.trackError).toHaveBeenCalledWith(
      error,
      expect.objectContaining({
        type: 'mutation_error'
      })
    );
  });

  it('should track performance metrics', async () => {
    const mutationFn = jest.fn().mockResolvedValue({ id: 1 });
    
    const { result } = renderHook(
      () => useMutation(mutationFn),
      { wrapper: QueryProvider }
    );

    await act(async () => {
      await result.current.mutate({ name: 'Test' });
    });

    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'mutation_execute',
        success: true
      })
    );
  });
}); 