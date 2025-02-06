/**
 * Error boundary component with monitoring and recovery
 */

import React from 'react';
import { useErrorBoundary } from '../hooks/useErrorBoundary';

interface IErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onReset?: () => void | Promise<void>;
  onError?: (error: Error) => void;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundaryClass extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Forward to hook implementation
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return null; // Parent ErrorBoundary will handle UI
    }
    return this.props.children;
  }
}

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