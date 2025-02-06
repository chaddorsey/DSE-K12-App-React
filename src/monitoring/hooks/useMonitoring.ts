/**
 * React hooks for component-level monitoring
 */

import { useEffect, useRef } from 'react';
import { MonitoringService } from '../MonitoringService';
import { PerformanceBaseline } from '../PerformanceBaseline';

export function usePerformanceMonitoring(componentName: string): void {
  const startTime = useRef(Date.now());
  const monitoring = MonitoringService.getInstance();
  const baseline = PerformanceBaseline.getInstance();

  useEffect(() => {
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