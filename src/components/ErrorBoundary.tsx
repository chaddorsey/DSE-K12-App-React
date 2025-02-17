/**
 * Error boundary component with monitoring and recovery
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useErrorBoundary } from '../hooks/useErrorBoundary';

interface IErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ReactNode;
  onReset?: () => void | Promise<void>;
  onError?: (error: Error) => void;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Rename the class to ErrorBoundaryClass
class ErrorBoundaryClass extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  public state: IErrorBoundaryState = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.props.onError?.(error);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="error-boundary">
          <h2>Something went wrong</h2>
          <pre>{this.state.error?.message}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

// Export the function component as default
export function ErrorBoundary(props: IErrorBoundaryProps) {
  const {
    error,
    fallback: errorFallback,
    recover,
    onError
  } = useErrorBoundary('ErrorBoundary', {
    onError: (error) => {
      // Track error type for monitoring
      props.onError?.(error);
    }
  });

  if (error) {
    return errorFallback || props.fallback || (
      <div role="alert" className="error-boundary">
        <h2>Something went wrong</h2>
        <button
          onClick={async () => {
            try {
              await recover();
              await props.onReset?.();
            } catch (error) {
              // Recovery error is handled by useErrorBoundary
              console.error('Recovery failed:', error);
            }
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundaryClass onError={onError}>
      {props.children}
    </ErrorBoundaryClass>
  );
} 