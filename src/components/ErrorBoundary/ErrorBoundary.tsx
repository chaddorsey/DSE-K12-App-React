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
import './ErrorBoundary.css';

interface IErrorBoundaryProps {
  /** Child components */
  children: React.ReactNode;
  /** Custom error UI */
  fallback?: React.ReactNode;
  /** Called when error occurs */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /** Whether to reset error state when children change */
  resetOnChange?: boolean;
  /** Called when error state is reset */
  onReset?: () => void;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  private monitoring = MonitoringService.getInstance();

  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return { hasError: true, error };
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
      this.state.hasError &&
      prevProps.children !== this.props.children
    ) {
      this.setState({ hasError: false, error: null });
      
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

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render(): React.ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      return fallback || (
        <div role="alert" className="error-boundary">
          <h3>Something went wrong</h3>
          <p>{error?.message}</p>
          <button onClick={this.handleReset}>Try Again</button>
        </div>
      );
    }

    return children;
  }
} 