/**
 * Hook for handling async operations with monitoring
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { MonitoringService } from '../monitoring/MonitoringService';

interface IAsyncState<T> {
  status: 'idle' | 'pending' | 'success' | 'error';
  data?: T;
  error?: Error;
}

interface IUseAsyncOptions {
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
  retries?: number;
  monitoring?: {
    name?: string;
    tags?: Record<string, string>;
  };
}

export function useAsync<T>(
  asyncFn: () => Promise<T>,
  options: IUseAsyncOptions = {}
) {
  const [state, setState] = useState<IAsyncState<T>>({
    status: 'idle'
  });

  const monitoring = MonitoringService.getInstance();
  const mountedRef = useRef(true);
  const abortController = useRef(new AbortController());

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      abortController.current.abort();
    };
  }, []);

  const execute = useCallback(async () => {
    const startTime = Date.now();
    setState({ status: 'pending' });

    try {
      const signal = abortController.current.signal;
      const data = await Promise.race([
        asyncFn(),
        new Promise<never>((_, reject) => {
          signal.addEventListener('abort', () => {
            reject(new Error('Operation cancelled'));
          });
        })
      ]);

      if (mountedRef.current) {
        setState({ status: 'success', data });
        options.onSuccess?.(data);

        monitoring.trackPerformance({
          type: options.monitoring?.name || 'async_operation',
          totalTime: Date.now() - startTime,
          success: true,
          tags: options.monitoring?.tags
        });
      }

      return data;
    } catch (error) {
      if (mountedRef.current) {
        setState({ status: 'error', error: error as Error });
        options.onError?.(error as Error);

        monitoring.trackError(error as Error, {
          operation: options.monitoring?.name,
          duration: Date.now() - startTime,
          ...options.monitoring?.tags
        });
      }

      throw error;
    }
  }, [asyncFn, options, monitoring]);

  return {
    execute,
    ...state,
    reset: useCallback(() => {
      setState({ status: 'idle' });
    }, [])
  };
} 