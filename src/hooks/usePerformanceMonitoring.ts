/**
 * Hook for monitoring component performance including renders, interactions, and custom measurements.
 * Integrates with the global monitoring service to track performance metrics.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { trackInteraction, mark, measure } = usePerformanceMonitoring('MyComponent');
 *
 *   const handleClick = async () => {
 *     await trackInteraction('button_click', async () => {
 *       // Async operation here
 *     });
 *   };
 *
 *   return <button onClick={handleClick}>Click Me</button>;
 * }
 * ```
 *
 * @param componentName - Unique identifier for the component
 * @param options - Configuration options
 * @param options.tags - Custom tags to include with all performance metrics
 * @returns Object containing performance tracking utilities
 */

import { useEffect, useRef, useCallback } from 'react';
import { MonitoringService } from '../monitoring/MonitoringService';

interface IPerformanceMonitoringOptions {
  /** Custom tags to include with all performance metrics */
  tags?: Record<string, string>;
}

/**
 * Metadata for tracking interactions
 */
interface IInteractionMetadata {
  /** Custom key-value pairs for additional context */
  [key: string]: string;
}

export function usePerformanceMonitoring(
  componentName: string,
  options: IPerformanceMonitoringOptions = {}
) {
  const monitoring = MonitoringService.getInstance();
  const isInitialRender = useRef(true);
  const renderStartTime = useRef(Date.now());

  // Track render time
  useEffect(() => {
    const renderTime = Date.now() - renderStartTime.current;
    
    monitoring.trackPerformance({
      type: 'render',
      component: componentName,
      totalTime: renderTime,
      isInitial: isInitialRender.current,
      tags: options.tags
    });

    isInitialRender.current = false;
    renderStartTime.current = Date.now();
  });

  // Track interactions
  const trackInteraction = useCallback(async <T>(
    interactionType: string,
    callback: () => Promise<T>,
    metadata?: IInteractionMetadata
  ): Promise<T> => {
    const startTime = Date.now();
    
    try {
      const result = await callback();
      
      monitoring.trackPerformance({
        type: 'interaction',
        component: componentName,
        interaction: interactionType,
        totalTime: Date.now() - startTime,
        success: true,
        tags: {
          ...options.tags,
          ...metadata
        }
      });

      return result;
    } catch (error) {
      monitoring.trackPerformance({
        type: 'interaction',
        component: componentName,
        interaction: interactionType,
        totalTime: Date.now() - startTime,
        success: false,
        error: error as Error,
        tags: {
          ...options.tags,
          ...metadata
        }
      });

      throw error;
    }
  }, [componentName, options.tags]);

  // Performance marks and measures
  const mark = useCallback((markName: string) => {
    const fullMarkName = `${componentName}:${markName}`;
    performance.mark(fullMarkName);
    return fullMarkName;
  }, [componentName]);

  const measure = useCallback((
    measureName: string,
    startMark: string,
    endMark: string
  ) => {
    const startMarkName = `${componentName}:${startMark}`;
    const endMarkName = `${componentName}:${endMark}`;
    
    const measure = performance.measure(
      `${componentName}:${measureName}`,
      startMarkName,
      endMarkName
    );

    monitoring.trackPerformance({
      type: 'measure',
      component: componentName,
      name: measureName,
      totalTime: measure.duration,
      tags: options.tags
    });
  }, [componentName, options.tags]);

  // Cleanup
  useEffect(() => {
    return () => {
      // Clear any performance marks for this component
      performance.getEntriesByType('mark')
        .filter(entry => entry.name.startsWith(`${componentName}:`))
        .forEach(entry => performance.clearMarks(entry.name));
    };
  }, [componentName]);

  return {
    trackInteraction,
    mark,
    measure
  };
} 