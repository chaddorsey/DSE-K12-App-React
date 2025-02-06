/**
 * React hooks for component-level monitoring
 */

import { useEffect, useRef } from 'react';
import { MonitoringService } from '../MonitoringService';
import { PerformanceBaseline } from '../PerformanceBaseline';
import type { IPerformanceMetrics, PerformanceEventType } from '../types';

interface UsePerformanceMonitoringResult {
  trackEvent: (event: Omit<IPerformanceMetrics, 'timestamp'>) => void;
}

export function usePerformanceMonitoring(
  componentName: string
): UsePerformanceMonitoringResult {
  const startTime = useRef(Date.now());
  const monitoring = MonitoringService.getInstance();
  const baseline = PerformanceBaseline.getInstance();

  useEffect(() => {
    monitoring.trackPerformance({
      type: 'page_load',
      component: componentName,
      timestamp: Date.now()
    });

    return () => {
      const renderTime = Date.now() - startTime.current;
      const metrics = {
        componentRender: renderTime,
        stateUpdate: 0,
        apiCall: 0,
        totalTime: renderTime,
        timestamp: Date.now()
      };

      monitoring.trackPerformance(metrics);
      baseline.updateBaseline(componentName, metrics);

      // Check against baseline
      const currentBaseline = baseline.getBaseline(componentName);
      if (currentBaseline && renderTime > currentBaseline.metrics.p95RenderTime) {
        monitoring.trackEvent({
          category: 'performance',
          action: 'render-time-exceeded',
          label: componentName,
          value: renderTime,
          metadata: {
            baseline: currentBaseline.metrics.p95RenderTime,
            difference: renderTime - currentBaseline.metrics.p95RenderTime
          }
        });
      }
    };
  }, [componentName]);

  const trackEvent = (event: Omit<IPerformanceMetrics, 'timestamp'>) => {
    monitoring.trackPerformance({
      ...event,
      component: componentName,
      timestamp: Date.now()
    });
  };

  return { trackEvent };
}

export function useStateTransitionMonitoring(stateName: string): {
  trackTransition: (from: string, to: string) => void;
} {
  const monitoring = MonitoringService.getInstance();

  const trackTransition = (from: string, to: string): void => {
    monitoring.trackStateTransition({
      from,
      to,
      success: true,
      duration: 0
    });
  };

  return { trackTransition };
} 