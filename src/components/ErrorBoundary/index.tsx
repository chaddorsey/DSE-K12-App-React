import React, { Component, ErrorInfo, ReactNode } from 'react';
import { MonitoringService } from '../../monitoring/MonitoringService';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    MonitoringService.getInstance().trackPerformance({
      type: 'error_boundary_catch',
      totalTime: 0,
      error,
      metadata: {
        errorInfo
      }
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong</h1>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
} 