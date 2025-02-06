/**
 * Hook for form state management and validation
 */

import { useContext, useCallback, useState } from 'react';
import { FormContext } from '../components/Form/FormProvider';
import { IFormConfig, IFormState } from '../components/Form/types';
import { MonitoringService } from '../monitoring/MonitoringService';
import { usePerformanceMonitoring } from '../monitoring/hooks/useMonitoring';
import type { PerformanceEventType } from '../monitoring/types';
import { logger } from '../utils/logger';

interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  validate?: (values: T) => Record<keyof T, string> | null;
}

interface UseFormResult<T> {
  values: T;
  errors: Record<keyof T, string> | null;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleChange: (name: keyof T, value: string) => void;
}

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  onSubmit,
  validate
}: UseFormOptions<T>): UseFormResult<T> {
  const context = useContext(FormContext);
  const monitoring = MonitoringService.getInstance();
  const { trackEvent } = usePerformanceMonitoring('useForm');

  if (!context && !initialValues) {
    throw new Error('useForm must be used within a FormProvider or with initialValues');
  }

  // Use context if available, otherwise create local state
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const startTime = Date.now();
    
    try {
      trackEvent({ 
        type: 'form_submit_start',
        totalTime: 0,
        data: { formId: e.currentTarget.id }
      });

      // Validate if needed
      if (validate) {
        const validationErrors = validate(values);
        if (validationErrors) {
          setErrors(validationErrors);
          return;
        }
      }

      await onSubmit(values);
      
      const endTime = Date.now();
      trackEvent({ 
        type: 'form_submit_success',
        totalTime: endTime - startTime,
        data: { 
          formId: e.currentTarget.id,
          duration: endTime - startTime
        }
      });

    } catch (error) {
      const err = error as Error;
      logger.error('Form submission failed:', err);
      
      const endTime = Date.now();
      setErrors({ 
        submit: err.message 
      } as Record<keyof T, string>);

      trackEvent({ 
        type: 'form_submit_error',
        totalTime: endTime - startTime,
        data: { 
          formId: e.currentTarget.id,
          error: err.message,
          duration: endTime - startTime
        }
      });

    } finally {
      setIsSubmitting(false);
    }
  }, [values, onSubmit, validate, trackEvent]);

  const handleChange = useCallback((name: keyof T, value: string) => {
    const startTime = Date.now();
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear errors for this field if any
    if (errors && errors[name]) {
      setErrors(prev => prev ? { ...prev, [name]: '' } : null);
    }

    const endTime = Date.now();
    trackEvent({
      type: 'form_field_change',
      totalTime: endTime - startTime,
      data: {
        field: name,
        duration: endTime - startTime
      }
    });
  }, [errors, trackEvent]);

  return {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange
  };
} 