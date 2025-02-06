/**
 * Provider component for query cache and state management
 */

import React, { createContext, useCallback, useRef, useMemo } from 'react';
import { MonitoringService } from '../monitoring/MonitoringService';

interface IQueryCache {
  [key: string]: {
    data: any;
    timestamp: number;
    promise?: Promise<any>;
  };
}

interface IQueryContext {
  cache: IQueryCache;
  executeQuery: <T>(key: string, queryFn: () => Promise<T>) => Promise<T>;
  invalidateQuery: (key: string) => void;
}

export const QueryContext = createContext<IQueryContext | null>(null);

interface IQueryProviderProps {
  children: React.ReactNode;
  maxAge?: number; // Cache TTL in ms
}

export function QueryProvider({ 
  children, 
  maxAge = 5 * 60 * 1000 // 5 minutes default
}: IQueryProviderProps) {
  const monitoring = MonitoringService.getInstance();
  const startTime = useRef(Date.now());
  const cacheRef = useRef<IQueryCache>({});

  // Execute query with deduplication and caching
  const executeQuery = useCallback(async <T,>(
    key: string,
    queryFn: () => Promise<T>
  ): Promise<T> => {
    const cache = cacheRef.current;
    const now = Date.now();

    // Check for valid cached data
    if (cache[key]) {
      const { data, timestamp } = cache[key];
      if (now - timestamp < maxAge) {
        monitoring.trackPerformance({
          type: 'query_cache_hit',
          component: 'QueryProvider',
          totalTime: 0,
          metadata: { key }
        });
        return data;
      }
    }

    // Check for in-flight request
    if (cache[key]?.promise) {
      monitoring.trackPerformance({
        type: 'query_dedupe',
        component: 'QueryProvider',
        totalTime: 0,
        metadata: { key }
      });
      return cache[key].promise;
    }

    // Execute new query
    try {
      const queryStart = Date.now();
      const promise = queryFn();
      cache[key] = { ...cache[key], promise };

      const data = await promise;
      cache[key] = { data, timestamp: now };

      monitoring.trackPerformance({
        type: 'query_execute',
        component: 'QueryProvider',
        totalTime: Date.now() - queryStart,
        metadata: { key, success: true }
      });

      return data;
    } catch (error) {
      delete cache[key]; // Clear failed query
      monitoring.trackError(error as Error, {
        type: 'query_execute',
        component: 'QueryProvider',
        metadata: { key }
      });
      throw error;
    }
  }, [maxAge]);

  // Invalidate cached query
  const invalidateQuery = useCallback((key: string) => {
    delete cacheRef.current[key];
    monitoring.trackPerformance({
      type: 'query_invalidate',
      component: 'QueryProvider',
      totalTime: 0,
      metadata: { key }
    });
  }, []);

  // Create context value
  const contextValue = useMemo(() => ({
    cache: cacheRef.current,
    executeQuery,
    invalidateQuery
  }), [executeQuery, invalidateQuery]);

  // Track provider initialization
  React.useEffect(() => {
    monitoring.trackPerformance({
      type: 'query_cache_init',
      component: 'QueryProvider',
      totalTime: Date.now() - startTime.current
    });
  }, []);

  return (
    <QueryContext.Provider value={contextValue}>
      {children}
    </QueryContext.Provider>
  );
} 