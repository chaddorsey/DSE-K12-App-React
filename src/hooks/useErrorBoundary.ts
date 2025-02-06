/**
 * Hook for handling component errors with monitoring and recovery
 */

import { useState, useCallback, ReactNode } from 'react';
import { MonitoringService } from '../monitoring/MonitoringService';

interface IErrorContext {
  [key: string]: unknown;
}

interface IErrorOptions {
  context?: IErrorContext;
  recoveryAction?: () => Promise<void>;
  fallback?: ReactNode;
}

interface IErrorState {
  error: Error | null;
  fallback: ReactNode | null;
  recoveryAction?: () => Promise<void>;
}

/**
 * Hook that provides error handling capabilities with monitoring integration
 * 
 * @param componentName - Name of the component for monitoring
 * @returns Error handling utilities and state
 */
export function useErrorBoundary(componentName: string) {
  const monitoring = MonitoringService.getInstance();
  const [errorState, setErrorState] = useState<IErrorState>({
    error: null,
    fallback: null
  });

  const reportError = useCallback((
    error: Error,
    options: IErrorOptions = {}
  ) => {
    setErrorState({
      error,
      fallback: options.fallback ?? null,
      recoveryAction: options.recoveryAction
    });

    monitoring.trackError(error, {
      component: componentName,
      handled: true,
      context: options.context
    });
  }, [componentName]);

  const recover = useCallback(async () => {
    const startTime = Date.now();
    const { error, recoveryAction } = errorState;

    if (recoveryAction) {
      try {
        await recoveryAction();
        
        monitoring.trackPerformance({
          type: 'error_recovery',
          component: componentName,
          success: true,
          error,
          totalTime: Date.now() - startTime
        });
      } catch (recoveryError) {
        monitoring.trackPerformance({
          type: 'error_recovery',
          component: componentName,
          success: false,
          error: recoveryError as Error,
          totalTime: Date.now() - startTime
        });
        
        // Re-report the recovery error
        reportError(recoveryError as Error);
        return;
      }
    }

    setErrorState({
      error: null,
      fallback: null
    });
  }, [componentName, errorState, reportError]);

  const onError = useCallback((error: Error) => {
    monitoring.trackError(error, {
      component: componentName,
      source: 'error_boundary',
      handled: true
    });

    setErrorState({
      error,
      fallback: null
    });
  }, [componentName]);

  const onReset = useCallback(() => {
    setErrorState({
      error: null,
      fallback: null
    });
  }, []);

  return {
    // State
    error: errorState.error,
    fallback: errorState.fallback,
    hasError: errorState.error !== null,

    // Methods
    reportError,
    recover,
    onError,
    onReset
  };
} 