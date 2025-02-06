/**
 * Hook for data fetching with caching and monitoring
 */

import { useState, useEffect, useContext, useCallback } from 'react';
import { QueryContext } from '../components/QueryProvider';
import { MonitoringService } from '../monitoring/MonitoringService';

interface IQueryState<T> {
  data?: T;
  error?: Error;
  isLoading: boolean;
}

interface IQueryResult<T> extends IQueryState<T> {
  invalidate: () => void;
}

/**
 * Hook for data fetching with caching and monitoring
 * 
 * @param key - Unique key for the query
 * @param queryFn - Function that returns a promise with the data
 * @returns Query result with data, loading state, and controls
 */
export function useQuery<T>(
  key: string,
  queryFn: () => Promise<T>
): IQueryResult<T> {
  const context = useContext(QueryContext);
  const monitoring = MonitoringService.getInstance();

  if (!context) {
    throw new Error('useQuery must be used within a QueryProvider');
  }

  const { executeQuery, invalidateQuery } = context;

  const [state, setState] = useState<IQueryState<T>>({
    isLoading: true
  });

  // Fetch data
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const data = await executeQuery(key, queryFn);
        if (mounted) {
          setState({
            data,
            isLoading: false
          });
        }
      } catch (error) {
        if (mounted) {
          setState({
            error: error as Error,
            isLoading: false
          });
          monitoring.trackError(error as Error, {
            type: 'query_error',
            metadata: { key }
          });
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [key, queryFn, executeQuery]);

  // Invalidate cache and refetch
  const invalidate = useCallback(() => {
    setState(prev => ({ ...prev, isLoading: true }));
    invalidateQuery(key);
  }, [key, invalidateQuery]);

  return {
    ...state,
    invalidate
  };
} 