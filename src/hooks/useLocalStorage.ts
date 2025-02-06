/**
 * Hook for managing localStorage with type safety and monitoring
 */

import { useState, useEffect, useCallback } from 'react';
import { MonitoringService } from '../monitoring/MonitoringService';
import Ajv from 'ajv';

interface IStorageOptions<T> {
  schema?: object;
  onError?: (error: Error) => void;
}

/**
 * Hook for managing localStorage with type safety and monitoring
 * 
 * @param key - Storage key
 * @param initialValue - Default value if nothing in storage
 * @param options - Configuration options
 * @returns Tuple of [storedValue, setValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: IStorageOptions<T> = {}
): [T, (value: T) => void] {
  const monitoring = MonitoringService.getInstance();
  const ajv = new Ajv();

  // Get from localStorage on init
  const readValue = (): T => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }

      const parsed = JSON.parse(item);

      // Validate against schema if provided
      if (options.schema) {
        const validate = ajv.compile(options.schema);
        if (!validate(parsed)) {
          throw new Error(`Invalid stored data: ${ajv.errorsText(validate.errors)}`);
        }
      }

      return parsed;
    } catch (error) {
      monitoring.trackError(error as Error, {
        operation: 'storage_read',
        key,
        ...(error instanceof Error && error.name === 'SyntaxError' 
          ? { type: 'parse_error' } 
          : { type: 'validation_error' })
      });

      options.onError?.(error as Error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return wrapped version of useState's setter
  const setValue = useCallback((value: T) => {
    try {
      // Save to localStorage
      localStorage.setItem(key, JSON.stringify(value));
      
      // Save to state
      setStoredValue(value);

      monitoring.trackPerformance({
        type: 'storage_write',
        key,
        success: true
      });
    } catch (error) {
      monitoring.trackError(error as Error, {
        operation: 'storage_write',
        key
      });
      options.onError?.(error as Error);
    }
  }, [key, options.onError]);

  // Listen for changes across tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          const newValue = JSON.parse(event.newValue);
          
          // Validate if schema provided
          if (options.schema) {
            const validate = ajv.compile(options.schema);
            if (!validate(newValue)) {
              throw new Error(`Invalid sync data: ${ajv.errorsText(validate.errors)}`);
            }
          }

          setStoredValue(newValue);
          
          monitoring.trackPerformance({
            type: 'storage_sync',
            key,
            success: true
          });
        } catch (error) {
          monitoring.trackError(error as Error, {
            operation: 'storage_sync',
            key
          });
          options.onError?.(error as Error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, options.schema, options.onError]);

  return [storedValue, setValue];
} 