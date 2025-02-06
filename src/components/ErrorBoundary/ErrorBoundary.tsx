/**
 * Error boundary component for gracefully handling React component errors.
 * Provides fallback UI and error reporting functionality.
 * 
 * @example
 * ```tsx
 * <ErrorBoundary
 *   fallback={<CustomError />}
 *   onError={(error) => logError(error)}
 * >
 *   <ChildComponent />
 * </ErrorBoundary>
 * ```
 */

import React from 'react';
import { logger } from '../../utils/logger';
import { MonitoringService } from '../../monitoring/MonitoringService';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';

interface IErrorBoundaryProps {
  /** Component to render when error occurs */
  fallback?: React.ReactNode;
  /** Called when error is caught */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /** Whether to reset error state when children change */
  resetOnChange?: boolean;
  /** Child components */
  children: React.ReactNode;
}

interface IErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  private monitoring = MonitoringService.getInstance();

  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logger.error('Component error caught by boundary:', error);
    
    // Track error with monitoring
    this.monitoring.trackError(error, {
      componentStack: errorInfo.componentStack,
      resetOnChange: this.props.resetOnChange
    });

    // Track state transition
    this.monitoring.trackStateTransition({
      from: 'normal',
      to: 'error',
      success: false,
      duration: 0,
      error,
      component: 'ErrorBoundary'
    });

    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: IErrorBoundaryProps): void {
    if (
      this.props.resetOnChange && 
      this.state.error && 
      this.props.children !== prevProps.children
    ) {
      this.setState({ error: null });
      
      // Track recovery
      this.monitoring.trackStateTransition({
        from: 'error',
        to: 'normal',
        success: true,
        duration: 0,
        component: 'ErrorBoundary'
      });
    }
  }

  render(): React.ReactNode {
    const { error } = this.state;
    const { fallback, children } = this.props;

    if (error) {
      return fallback || <div role="alert">Something went wrong</div>;
    }

    return children;
  }
} 