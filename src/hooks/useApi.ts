/**
 * Hook for making type-safe API requests with automatic state management
 */

import { useState, useCallback, useEffect } from 'react';
import { EndpointPath, ResponseType, RequestBody, ApiResponse, IUseApiResult, IUseApiOptions } from '../api/types/endpoints';
import { IRequestOptions } from '../api/ApiClient';
import { ApiError } from '../api/types/errors';
import { apiClient } from '../services/api';
import { getErrorMessage } from '../errors/errorUtils';
import type { IErrorMessageTemplate } from '../errors/types';
import { logger } from '../utils/logger';

/** API request state */
interface IApiState<T> {
  /** Response data */
  data: T | null;
  /** Loading state */
  loading: boolean;
  /** Error from last request */
  error: ApiError | null;
  /** User-friendly error message */
  errorMessage: IErrorMessageTemplate | null;
}

/** Hook configuration options */
interface IUseApiOptions<T> {
  /** Initial data */
  initialData?: T;
  /** Callback when request succeeds */
  onSuccess?: (data: T) => void;
  /** Callback when request fails */
  onError?: (error: ApiError) => void;
  /** Default request options */
  requestOptions?: Omit<IRequestOptions, 'body'>;
}

/** Hook return value */
interface IUseApiResult<T> extends IApiState<T> {
  /** Make API request */
  request: <P extends EndpointPath>(
    path: P,
    options?: IRequestOptions<RequestBody<P>>
  ) => Promise<ResponseType<P>>;
  /** Reset state */
  reset: () => void;
}

/**
 * Hook for making API requests with automatic state management
 * @template T Type of the response data
 * @param endpoint Endpoint path
 * @param options Hook configuration options
 * @returns API state and request methods
 */
export function useApi<T>(endpoint: EndpointPath, options?: IUseApiOptions<T>): IUseApiResult<T> {
  const [state, setState] = useState<IApiState<T>>({
    data: options?.initialData ?? null,
    loading: false,
    error: null,
    errorMessage: null
  });

  const reset = useCallback(() => {
    setState({
      data: options?.initialData ?? null,
      loading: false,
      error: null,
      errorMessage: null
    });
  }, [options?.initialData]);

  const request = useCallback(async <P extends EndpointPath>(
    path: P,
    requestOptions?: IRequestOptions<RequestBody<P>>
  ): Promise<ResponseType<P>> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      logger.info(`API Request started: ${path}`);
      const response = await apiClient.request(path, {
        ...options?.requestOptions,
        ...requestOptions
      });

      setState(prev => ({
        ...prev,
        data: response as T,
        loading: false,
        error: null,
        errorMessage: null
      }));

      options?.onSuccess?.(response as T);
      logger.info(`API Request succeeded: ${path}`);
      return response;
    } catch (err) {
      const error = err as ApiError;
      const errorMessage = getErrorMessage(error);

      setState(prev => ({
        ...prev,
        loading: false,
        error,
        errorMessage,
        // Keep existing data on error unless specified
        data: requestOptions?.body ? null : prev.data
      }));

      options?.onError?.(error);
      logger.error(`API Request failed: ${path}`, error);
      throw error;
    }
  }, [options]);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const response = await apiClient.request(endpoint);
        if (mounted) {
          setState(prev => ({
            ...prev,
            data: response as T,
            loading: false,
            error: null,
            errorMessage: null
          }));
        }
      } catch (err) {
        if (mounted) {
          logger.error('API request failed', err);
          setState(prev => ({
            ...prev,
            loading: false,
            error: err instanceof Error ? err : new Error('Unknown error'),
            errorMessage: null,
            data: null
          }));
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [endpoint]);

  return {
    ...state,
    request,
    reset
  };
} 