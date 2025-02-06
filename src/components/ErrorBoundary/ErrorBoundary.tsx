/**
 * Error boundary component for handling component errors gracefully
 */

import React from 'react';
import { ErrorDisplay } from '../ErrorDisplay/ErrorDisplay';
import { logger } from '../../utils/logger';
import { getErrorMessage } from '../../errors/errorUtils';

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
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logger.error('Component error caught by boundary:', error);
    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: IErrorBoundaryProps): void {
    if (
      this.props.resetOnChange && 
      this.state.error && 
      this.props.children !== prevProps.children
    ) {
      this.setState({ error: null });
    }
  }

  private handleReset = (): void => {
    this.setState({ error: null });
  };

  render(): React.ReactNode {
    const { error } = this.state;
    const { fallback, children } = this.props;

    if (error) {
      if (fallback) {
        return fallback;
      }
      return (
        <ErrorDisplay
          error={getErrorMessage(error)}
          onAction={this.handleReset}
        />
      );
    }

    return children;
  }
} 