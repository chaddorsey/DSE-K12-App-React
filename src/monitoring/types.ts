/**
 * Core monitoring types for application-wide tracking
 */

export interface IPerformanceMetrics {
  componentRender: number;
  stateUpdate: number;
  apiCall: number;
  totalTime: number;
  timestamp: number;
}

export interface IStateTransition {
  from: string;
  to: string;
  timestamp: number;
  duration: number;
  success: boolean;
  component?: string;
  error?: Error;
}

export interface IErrorReport {
  error: Error;
  componentStack?: string;
  context: Record<string, unknown>;
  timestamp: number;
  handled: boolean;
}

export interface IAnalyticsEvent {
  category: 'ui' | 'error' | 'performance' | 'state';
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

export interface IPerformanceBaseline {
  componentName: string;
  metrics: {
    meanRenderTime: number;
    p95RenderTime: number;
    meanTotalTime: number;
    p95TotalTime: number;
  };
  sampleSize: number;
  lastUpdated: number;
} 