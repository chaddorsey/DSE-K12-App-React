/**
 * Core monitoring service for tracking application health and performance
 */

import type { 
  IPerformanceMetrics, 
  IStateTransition, 
  IErrorReport,
  IAnalyticsEvent,
  PerformanceEventType
} from './types';

export interface IInteractionEvent {
  type: string;
  metadata?: Record<string, unknown>;
}

export class MonitoringService {
  private static instance: MonitoringService;
  private transitions: IStateTransition[] = [];
  private errors: IErrorReport[] = [];
  private metrics: IPerformanceMetrics[] = [];

  private constructor() {
    // Private constructor for singleton
  }

  public static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  public trackStateTransition(transition: IStateTransition): void {
    this.transitions.push({
      ...transition,
      timestamp: Date.now()
    });
    this.checkHealthMetrics();
  }

  public trackError(error: Error, metadata?: Record<string, unknown>): void {
    this.errors.push({
      error,
      metadata,
      timestamp: Date.now(),
      handled: true
    });
    this.checkHealthMetrics();
  }

  public trackPerformance(metrics: IPerformanceMetrics): void {
    this.metrics.push({
      ...metrics,
      timestamp: metrics.timestamp || Date.now()
    });
    this.checkHealthMetrics();
  }

  public trackEvent(event: IAnalyticsEvent): void {
    // Implementation for analytics tracking
    console.log('Analytics event:', event);
  }

  public trackInteraction(event: IInteractionEvent): void {
    this.track({
      type: event.type,
      category: 'interaction',
      timestamp: new Date(),
      metadata: event.metadata
    });
  }

  private checkHealthMetrics(): void {
    const recentErrors = this.getRecentErrors();
    const recentPerformance = this.getRecentPerformance();

    if (this.shouldTriggerAlert(recentErrors, recentPerformance)) {
      this.triggerHealthAlert();
    }
  }

  private getRecentErrors(timeWindow = 5 * 60 * 1000): IErrorReport[] {
    const now = Date.now();
    return this.errors.filter(e => now - e.timestamp < timeWindow);
  }

  private getRecentPerformance(timeWindow = 5 * 60 * 1000): IPerformanceMetrics[] {
    const now = Date.now();
    return this.metrics.filter(m => m.timestamp && now - m.timestamp < timeWindow);
  }

  private shouldTriggerAlert(errors: IErrorReport[], metrics: IPerformanceMetrics[]): boolean {
    const errorRate = errors.length / 5; // per minute
    const avgPerformance = metrics.reduce((acc, m) => acc + m.totalTime, 0) / metrics.length;

    return errorRate > 1 || avgPerformance > 1000; // 1 error/min or 1000ms avg
  }

  private triggerHealthAlert(): void {
    console.error('Health metrics exceeded thresholds');
  }

  private track(event: IAnalyticsEvent): void {
    console.log('Tracking:', event);
    // Implementation for actual tracking would go here
  }
}

// Remove any local type definitions and export everything from types.ts
export type { 
  IPerformanceMetrics,
  IStateTransition,
  IErrorReport,
  IAnalyticsEvent,
  PerformanceEventType
}; 