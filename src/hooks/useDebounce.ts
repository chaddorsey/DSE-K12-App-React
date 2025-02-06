/**
 * Hook for debouncing values with performance monitoring
 */

import { useState, useEffect, useRef } from 'react';
import { MonitoringService } from '../monitoring/MonitoringService';

interface IDebounceOptions {
  monitoringKey?: string;
  maxWait?: number;
}

/**
 * Hook that debounces a value with performance monitoring
 * 
 * @param value - Value to debounce
 * @param delay - Debounce delay in milliseconds
 * @param options - Configuration options
 * @returns Debounced value
 */
export function useDebounce<T>(
  value: T,
  delay: number,
  options: IDebounceOptions = {}
): T {
  const monitoring = MonitoringService.getInstance();
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  const timeoutRef = useRef<NodeJS.Timeout>();
  const maxWaitTimeoutRef = useRef<NodeJS.Timeout>();
  const lastValueRef = useRef<T>(value);
  const lastUpdateTimeRef = useRef<number>(Date.now());
  const startTimeRef = useRef<number>();

  useEffect(() => {
    startTimeRef.current = Date.now();
    // Track when the value changes
    lastValueRef.current = value;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      monitoring.trackPerformance({
        type: 'debounce_cancel',
        totalTime: 0,
        metadata: { reason: 'cancel' }
      });
    }

    // Set up new timeout
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
      lastUpdateTimeRef.current = Date.now();

      monitoring.trackPerformance({
        type: 'debounce_update',
        totalTime: Date.now() - (startTimeRef.current || 0),
        metadata: {
          value
        }
      });
    }, delay);

    // Handle maxWait option
    if (options.maxWait && !maxWaitTimeoutRef.current) {
      const timeSinceLastUpdate = Date.now() - lastUpdateTimeRef.current;
      const remainingMaxWait = options.maxWait - timeSinceLastUpdate;

      if (remainingMaxWait <= 0) {
        // Max wait exceeded, update immediately
        if (lastValueRef.current !== debouncedValue) {
          setDebouncedValue(lastValueRef.current);
          lastUpdateTimeRef.current = Date.now();
        }
      } else {
        // Set maxWait timeout
        maxWaitTimeoutRef.current = setTimeout(() => {
          if (lastValueRef.current !== debouncedValue) {
            setDebouncedValue(lastValueRef.current);
            lastUpdateTimeRef.current = Date.now();
          }
          maxWaitTimeoutRef.current = undefined;
        }, remainingMaxWait);
      }
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (maxWaitTimeoutRef.current) {
        clearTimeout(maxWaitTimeoutRef.current);
      }
      if (value !== debouncedValue) {
        monitoring.trackPerformance({
          type: 'debounce_cancel',
          totalTime: 0,
          metadata: { reason: 'unmount' }
        });
      }
    };
  }, [value, delay, options.maxWait, options.monitoringKey, debouncedValue]);

  return debouncedValue;
} 