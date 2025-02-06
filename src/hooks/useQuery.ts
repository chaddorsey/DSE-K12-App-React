/**
 * Hook for data fetching with caching and monitoring
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { MonitoringService } from '../monitoring/MonitoringService';

interface IQueryOptions<T> {
  cacheTime?: number;
  backgroundRefetch?: boolean;
  initialData?: T;
}

interface IQueryState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isBackgroundLoading: boolean;
  lastUpdated: number | null;
}

// Global cache for sharing data between hooks
const queryCache = new Map<string, { data: unknown; timestamp: number }>();

/**
 * Hook for data fetching with caching, monitoring, and optimistic updates
 * 
 * @param key - Unique key for caching
 * @param fetchFn - Function to fetch data
 * @param options - Query configuration options
 */
export function useQuery<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: IQueryOptions<T> = {}
) {
  const monitoring = MonitoringService.getInstance();
  const {
    cacheTime = 5 * 60 * 1000, // 5 minutes default
    backgroundRefetch = false,
    initialData = null
  } = options;

  const [state, setState] = useState<IQueryState<T>>({
    data: initialData,
    error: null,
    isLoading: true,
    isBackgroundLoading: false,
    lastUpdated: null
  });

  const isMounted = useRef(true);
  
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Check cache and update state
  useEffect(() => {
    const cached = queryCache.get(key);
    if (cached && Date.now() - cached.timestamp < cacheTime) {
      setState(prev => ({
        ...prev,
        data: cached.data as T,
        isLoading: false,
        lastUpdated: cached.timestamp
      }));
    }
  }, [key, cacheTime]);

  const executeFetch = useCallback(async (isBackground = false) => {
    const startTime = Date.now();
    
    setState(prev => ({
      ...prev,
      isLoading: !isBackground,
      isBackgroundLoading: isBackground,
      error: null
    }));

    try {
      const data = await fetchFn();
      
      if (isMounted.current) {
        setState(prev => ({
          ...prev,
          data,
          isLoading: false,
          isBackgroundLoading: false,
          lastUpdated: Date.now()
        }));

        queryCache.set(key, {
          data,
          timestamp: Date.now()
        });

        monitoring.trackPerformance({
          type: 'query',
          key,
          success: true,
          totalTime: Date.now() - startTime
        });
      }

      return data;
    } catch (error) {
      if (isMounted.current) {
        setState(prev => ({
          ...prev,
          error: error as Error,
          isLoading: false,
          isBackgroundLoading: false
        }));

        monitoring.trackError(error as Error, {
          operation: 'query',
          key
        });
      }
      throw error;
    }
  }, [key, fetchFn]);

  const refetch = useCallback(async () => {
    return executeFetch(false);
  }, [executeFetch]);

  const refetchInBackground = useCallback(async () => {
    if (backgroundRefetch) {
      return executeFetch(true);
    }
  }, [backgroundRefetch, executeFetch]);

  const invalidate = useCallback(async () => {
    queryCache.delete(key);
    return refetch();
  }, [key, refetch]);

  const setData = useCallback((newData: T) => {
    const startTime = Date.now();
    
    setState(prev => ({
      ...prev,
      data: newData,
      lastUpdated: Date.now()
    }));

    queryCache.set(key, {
      data: newData,
      timestamp: Date.now()
    });

    monitoring.trackPerformance({
      type: 'optimistic_update',
      key,
      success: true,
      totalTime: Date.now() - startTime
    });
  }, [key]);

  // Initial fetch if no cached data
  useEffect(() => {
    if (!queryCache.has(key)) {
      refetch();
    }
  }, [key, refetch]);

  return {
    ...state,
    refetch,
    refetchInBackground,
    invalidate,
    setData
  };
} 