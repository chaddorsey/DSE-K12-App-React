/**
 * Core monitoring types for application-wide tracking
 */

export type PerformanceEventType = 
  // Page and Component Events
  | 'page_load'
  | 'api_call'
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
  // Query-specific metrics
  queryTime?: number;
  resultCount?: number;
  cacheStatus?: 'hit' | 'miss' | 'stale';
  dedupeCount?: number;
  // Search-specific metrics
  searchTerm?: string;
  filterCount?: number;
  suggestionCount?: number;
  selectedIndex?: number;
  // Component-specific metrics
  renderCount?: number;
  interactionType?: string;
  measureName?: string;
  markName?: string;
  // Keep metadata for additional properties
  metadata?: Record<string, any>;
  data?: Record<string, unknown>;
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