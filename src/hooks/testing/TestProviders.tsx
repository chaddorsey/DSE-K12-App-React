/**
 * Test providers wrapper for hook testing
 */

import React from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { MonitoringService } from '../../monitoring/MonitoringService';

interface ITestProvidersProps {
  children: React.ReactNode;
  options: {
    monitoring?: boolean;
    localStorage?: Record<string, unknown>;
    errorBoundary?: boolean;
  };
}

export function TestProviders({ children, options }: ITestProvidersProps) {
  // Setup mocks based on options
  React.useEffect(() => {
    if (options.localStorage) {
      for (const [key, value] of Object.entries(options.localStorage)) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
    
    return () => {
      localStorage.clear();
    };
  }, [options.localStorage]);

  let content = children;

  // Wrap with error boundary if needed
  if (options.errorBoundary) {
    content = (
      <ErrorBoundary>
        {content}
      </ErrorBoundary>
    );
  }

  return content;
} 