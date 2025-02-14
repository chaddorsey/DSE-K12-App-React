/**
 * Core monitoring types for application-wide tracking
 */

export type PerformanceEventType = 
  | 'auth_login' 
  | 'auth_logout'
  | 'auth_register'
  | 'profile_update'
  | 'stats_update'
  // Page and Component Events
  | 'page-load'
  | 'api-call'
  | 'component_mount'
  | 'component_unmount'
  | 'state_update'
  | 'render'
  | 'interaction'
  | 'measure'
  | 'performance_mark'
  | 'performance_measure'
  // Form Events
  | 'form_submit_start'
  | 'form_submit_success'
  | 'form_submit_error'
  | 'form_field_change'
  // Network Events
  | 'network_status_change'
  | 'error_boundary_catch'
  // Query Events
  | 'query_cache_hit'
  | 'query_cache_miss'
  | 'query_error'
  | 'query_start'
  | 'query_complete'
  | 'query_dedupe'
  | 'query_execute'
  | 'query_invalidate'
  | 'query_cache_init'
  | 'cache_update'
  // Search Events
  | 'search_execute'
  | 'search_error'
  | 'search_filter'
  | 'typeahead_execute'
  | 'typeahead_select'
  | 'typeahead_error'
  | 'component_render'
  | 'api_request'
  | 'share_methods_detected'
  | 'share_method_selected'
  | 'share_complete'
  | 'share_error';

export interface IPerformanceMetrics {
  type: PerformanceEventType;
  success: boolean;
  totalTime: number;
  metadata?: Record<string, unknown>;
}

export interface IStateTransition {
  from: string;
  to: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export interface IErrorReport {
  error: Error;
  context?: Record<string, unknown>;
  timestamp: number;
  handled: boolean;
}

export interface IAnalyticsEvent {
  type: string;
  category: string;
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