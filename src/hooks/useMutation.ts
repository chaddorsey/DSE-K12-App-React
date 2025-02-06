/**
 * Hook for handling data mutations with optimistic updates and monitoring
 */

import { useState, useCallback } from 'react';
import { MonitoringService } from '../monitoring/MonitoringService';
import { queryCache } from './useQuery';

interface IMutationState<TData> {
  data: TData | null;
  error: Error | null;
  isLoading: boolean;
}

interface IOptimisticUpdate<TData, TVariables> {
  queryKey: string;
  update: (oldData: TData, variables: TVariables) => TData;
}

interface IMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>;
  onError?: (error: Error, variables: TVariables) => void | Promise<void>;
  optimisticUpdate?: (variables: TVariables) => IOptimisticUpdate<any, TVariables>;
  invalidateQueries?: string[];
}

/**
 * Hook for handling data mutations with optimistic updates and monitoring
 * 
 * @param operationType - Type of mutation operation for monitoring
 * @param mutationFn - Function that performs the mutation
 * @param options - Configuration options
 */
export function useMutation<TData, TVariables>(
  operationType: string,
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: IMutationOptions<TData, TVariables> = {}
) {
  const monitoring = MonitoringService.getInstance();
  const [state, setState] = useState<IMutationState<TData>>({
    data: null,
    error: null,
    isLoading: false
  });

  const mutate = useCallback(async (variables: TVariables) => {
    const startTime = Date.now();
    setState({ data: null, error: null, isLoading: true });

    // Handle optimistic update
    let optimisticSnapshot: { key: string; data: unknown } | null = null;
    if (options.optimisticUpdate) {
      const update = options.optimisticUpdate(variables);
      const cached = queryCache.get(update.queryKey);
      
      if (cached) {
        optimisticSnapshot = {
          key: update.queryKey,
          data: cached.data
        };

        const optimisticData = update.update(cached.data, variables);
        queryCache.set(update.queryKey, {
          data: optimisticData,
          timestamp: Date.now()
        });

        monitoring.trackPerformance({
          type: 'optimistic_update',
          operation: operationType,
          success: true,
          totalTime: Date.now() - startTime
        });
      }
    }

    try {
      const data = await mutationFn(variables);
      
      setState({ data, error: null, isLoading: false });

      // Handle success side effects
      if (options.onSuccess) {
        await options.onSuccess(data, variables);
      }

      // Invalidate related queries
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach(key => {
          queryCache.delete(key);
        });
      }

      monitoring.trackPerformance({
        type: 'mutation',
        operation: operationType,
        success: true,
        totalTime: Date.now() - startTime
      });

      return data;
    } catch (error) {
      setState({ data: null, error: error as Error, isLoading: false });

      // Rollback optimistic update
      if (optimisticSnapshot) {
        queryCache.set(optimisticSnapshot.key, {
          data: optimisticSnapshot.data,
          timestamp: Date.now()
        });
      }

      // Handle error side effects
      if (options.onError) {
        await options.onError(error as Error, variables);
      }

      monitoring.trackError(error as Error, {
        operation: 'mutation',
        type: operationType
      });

      throw error;
    }
  }, [operationType, mutationFn, options, monitoring]);

  return {
    ...state,
    mutate
  };
} 