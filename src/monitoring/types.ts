/**
 * Core monitoring types for application-wide tracking
 */

import { PerformanceEventType } from './MonitoringService';

export interface IPerformanceMetrics {
  type: PerformanceEventType;
  component?: string;
  timestamp?: number;
  totalTime: number;
  queryKey?: string;
  duration?: number;
  componentRender?: number;
  stateUpdate?: number;
  apiCall?: number;
  // Performance monitoring fields
  isInitial?: boolean;
  interaction?: string;
  name?: string;
  tags?: string[] | Record<string, string>;
  success?: boolean;
  error?: Error;
  // Keep metadata for additional properties
  metadata?: Record<string, any>;
}

export interface IStateTransition {
  from: string;
  to: string;
  action: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface IErrorReport {
  error: Error;
  context: Record<string, unknown>;
  timestamp: number;
  handled: boolean;
}

export interface IAnalyticsEvent {
  type: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
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