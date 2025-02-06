/**
 * Generic container component for data fetching and error handling
 */

import React from 'react';
import { useApi } from '../../hooks/useApi';
import { EndpointPath, ResponseType } from '../../api/types/endpoints';
import { ErrorDisplay } from '../ErrorDisplay/ErrorDisplay';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

interface IDataContainerProps<P extends EndpointPath> {
  /** API endpoint path */
  endpoint: P;
  /** Loading component override */
  loadingFallback?: React.ReactNode;
  /** Error component override */
  errorFallback?: React.ReactNode;
  /** Render function for data */
  children: (data: ResponseType<P>) => React.ReactNode;
}

export function DataContainer<P extends EndpointPath>({
  endpoint,
  loadingFallback,
  errorFallback,
  children
}: IDataContainerProps<P>): React.ReactElement {
  const {
    data,
    loading,
    error,
    errorMessage,
    request
  } = useApi<ResponseType<P>>();

  React.useEffect(() => {
    request(endpoint);
  }, [endpoint, request]);

  if (loading) {
    return loadingFallback ? 
      <>{loadingFallback}</> : 
      <LoadingSpinner />;
  }

  if (error) {
    return errorFallback ? 
      <>{errorFallback}</> : 
      <ErrorDisplay 
        error={errorMessage!}
        onAction={() => request(endpoint)}
      />;
  }

  if (!data) {
    return <></>;
  }

  return <>{children(data)}</>;
} 