/**
 * Tests for useMutation hook
 */

import { renderHook, act } from '../testing/renderHook';
import { useMutation } from '../useMutation';
import { mockMonitoring } from '../testing/mockMonitoring';
import { queryCache } from '../useQuery';

describe('useMutation', () => {
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.clearAllMocks();
    queryCache.clear();
  });

  describe('mutation execution', () => {
    it('should execute mutation and track performance', async () => {
      const mockMutate = jest.fn().mockResolvedValue({ id: 1 });
      
      const { result } = renderHook(() => 
        useMutation('create_item', mockMutate)
      );

      await act(async () => {
        await result.current.mutate({ name: 'test' });
      });

      expect(mockMutate).toHaveBeenCalledWith({ name: 'test' });
      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
        type: 'mutation',
        operation: 'create_item',
        success: true,
        totalTime: expect.any(Number)
      });
    });

    it('should handle errors', async () => {
      const error = new Error('mutation failed');
      const mockMutate = jest.fn().mockRejectedValue(error);

      const { result } = renderHook(() => 
        useMutation('create_item', mockMutate)
      );

      await act(async () => {
        try {
          await result.current.mutate({ name: 'test' });
        } catch (e) {
          // Expected error
        }
      });

      expect(result.current.error).toBe(error);
      expect(mockMonitors.trackError).toHaveBeenCalledWith(error, {
        operation: 'mutation',
        type: 'create_item'
      });
    });
  });

  describe('optimistic updates', () => {
    it('should handle optimistic updates with rollback', async () => {
      // Setup initial query cache
      queryCache.set('items', {
        data: [{ id: 1, name: 'existing' }],
        timestamp: Date.now()
      });

      const error = new Error('mutation failed');
      const mockMutate = jest.fn().mockRejectedValue(error);

      const { result } = renderHook(() => 
        useMutation('create_item', mockMutate, {
          optimisticUpdate: (data) => ({
            queryKey: 'items',
            update: (existing: any[]) => [...existing, { id: 'temp', ...data }]
          })
        })
      );

      await act(async () => {
        try {
          await result.current.mutate({ name: 'new item' });
        } catch (e) {
          // Expected error
        }
      });

      // Should rollback to original data
      const cached = queryCache.get('items');
      expect(cached?.data).toEqual([{ id: 1, name: 'existing' }]);
    });

    it('should track optimistic update performance', async () => {
      const { result } = renderHook(() => 
        useMutation('create_item', () => Promise.resolve(), {
          optimisticUpdate: () => ({
            queryKey: 'test',
            update: (data) => data
          })
        })
      );

      await act(async () => {
        await result.current.mutate({});
      });

      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'optimistic_update',
          operation: 'create_item'
        })
      );
    });
  });

  describe('side effects', () => {
    it('should handle onSuccess callback', async () => {
      const onSuccess = jest.fn();
      const mockMutate = jest.fn().mockResolvedValue({ id: 1 });

      const { result } = renderHook(() => 
        useMutation('create_item', mockMutate, { onSuccess })
      );

      await act(async () => {
        await result.current.mutate({ name: 'test' });
      });

      expect(onSuccess).toHaveBeenCalledWith(
        { id: 1 },
        { name: 'test' }
      );
    });

    it('should invalidate related queries', async () => {
      const mockMutate = jest.fn().mockResolvedValue({ id: 1 });

      const { result } = renderHook(() => 
        useMutation('create_item', mockMutate, {
          invalidateQueries: ['items', 'item-count']
        })
      );

      // Setup some cached data
      queryCache.set('items', { data: [], timestamp: Date.now() });
      queryCache.set('item-count', { data: 0, timestamp: Date.now() });

      await act(async () => {
        await result.current.mutate({ name: 'test' });
      });

      expect(queryCache.has('items')).toBe(false);
      expect(queryCache.has('item-count')).toBe(false);
    });
  });
}); 