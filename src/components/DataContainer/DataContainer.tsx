/**
 * Generic container component for data fetching and error handling
 */

import React, { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { EndpointPath, IApiResponse, IUseApiOptions, ApiEndpoints } from '../../api/types/endpoints';
import { ErrorDisplay } from '../ErrorDisplay';
import { LoadingSpinner } from '../LoadingSpinner';
import { usePerformanceMonitoring } from '../../hooks/usePerformanceMonitoring';
import './DataContainer.css';

interface IDataContainerProps<P extends EndpointPath> {
  endpoint: P;
  params?: ApiEndpoints[P]['params'];
  children: (data: ApiEndpoints[P]['response']) => React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  apiOptions?: IUseApiOptions<IApiResponse<P>>;
}

export function DataContainer<P extends EndpointPath>({
  endpoint,
  params,
  children,
  loadingComponent = <LoadingSpinner />,
  errorComponent,
  apiOptions
}: IDataContainerProps<P>): React.ReactElement {
  const { data, error, loading, request, reset } = useApi<IApiResponse<P>>(endpoint, apiOptions);
  const { trackEvent } = usePerformanceMonitoring('DataContainer');

  // Initial fetch
  useEffect(() => {
    request(endpoint);
  }, [endpoint, request]);

  if (loading) {
    return (
      <div className="data-container data-container--loading">
        {loadingComponent}
      </div>
    );
  }

  if (error) {
    const errorDisplay = errorComponent || (
      <ErrorDisplay
        error={{
          title: 'Error Loading Data',
          message: error.message,
          details: error.stack,
          code: error.name
        }}
        onRetry={async () => {
          trackEvent({
            type: 'api_call',
            totalTime: 0,
            data: {
              endpoint,
              action: 'retry'
            }
          });
          await request(endpoint);
        }}
      />
    );

    return (
      <div className="data-container data-container--error">
        {errorDisplay}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="data-container data-container--empty">
        No data available
      </div>
    );
  }

  return (
    <div className="data-container">
      {children(data)}
    </div>
  );
} 