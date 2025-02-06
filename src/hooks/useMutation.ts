/**
 * Hook for managing mutations with optimistic updates and monitoring
 */

import { useState, useCallback, useContext } from 'react';
import { QueryContext } from '../components/QueryProvider';
import { MonitoringService } from '../monitoring/MonitoringService';

interface IMutationState<TData> {
  data?: TData;
  error?: Error;
  isLoading: boolean;
}

interface IMutationOptions<TData, TVariables> {
  optimisticUpdate?: (variables: TVariables) => TData;
  invalidateQueries?: string[];
  onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>;
  onError?: (error: Error, variables: TVariables) => void | Promise<void>;
}

interface IMutationResult<TData, TVariables> extends IMutationState<TData> {
  mutate: (variables: TVariables) => Promise<TData>;
  reset: () => void;
}

/**
 * Hook for managing mutations with optimistic updates and monitoring
 * 
 * @param mutationFn - Function that performs the mutation
 * @param options - Configuration options
 * @returns Mutation state and controls
 */
export function useMutation<TData = unknown, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: IMutationOptions<TData, TVariables> = {}
): IMutationResult<TData, TVariables> {
  const context = useContext(QueryContext);
  const monitoring = MonitoringService.getInstance();

  if (!context) {
    throw new Error('useMutation must be used within a QueryProvider');
  }

  const { invalidateQuery } = context;
  const [state, setState] = useState<IMutationState<TData>>({
    isLoading: false
  });

  const reset = useCallback(() => {
    setState({ isLoading: false });
  }, []);

  const mutate = useCallback(async (variables: TVariables): Promise<TData> => {
    const startTime = Date.now();
    setState({ isLoading: true });

    // Apply optimistic update if configured
    if (options.optimisticUpdate) {
      const optimisticData = options.optimisticUpdate(variables);
      setState({
        data: optimisticData,
        isLoading: true
      });
    }

    try {
      const data = await mutationFn(variables);

      // Handle success
      setState({
        data,
        isLoading: false
      });

      // Invalidate related queries
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          invalidateQuery(queryKey);
        });
      }

      // Track performance
      monitoring.trackPerformance({
        type: 'mutation_execute',
        totalTime: Date.now() - startTime,
        success: true
      });

      await options.onSuccess?.(data, variables);
      return data;

    } catch (error) {
      // Handle error
      setState({
        error: error as Error,
        isLoading: false
      });

      // Track error
      monitoring.trackError(error as Error, {
        type: 'mutation_error',
        metadata: { variables }
      });

      await options.onError?.(error as Error, variables);
      throw error;
    }
  }, [mutationFn, options, invalidateQuery]);

  return {
    ...state,
    mutate,
    reset
  };
} 