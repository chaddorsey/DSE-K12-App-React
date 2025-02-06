/**
 * Hook for form state management with validation and monitoring
 */

import { useState, useCallback } from 'react';
import { MonitoringService } from '../monitoring/MonitoringService';
import * as yup from 'yup';

interface IFormOptions<T> {
  initialValues: T;
  validationSchema?: yup.Schema<T>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  onSubmit?: (values: T, helpers: IFormHelpers<T>) => Promise<void>;
}

interface IFormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  submitError?: Error;
}

interface IFormHelpers<T> {
  setSubmitting: (isSubmitting: boolean) => void;
  setErrors: (errors: Partial<Record<keyof T, string>>) => void;
  resetForm: () => void;
}

/**
 * Hook for form state management with validation and monitoring
 * 
 * @param options - Form configuration options
 * @returns Form state and handlers
 */
export function useForm<T extends Record<string, any>>(options: IFormOptions<T>) {
  const monitoring = MonitoringService.getInstance();
  const [state, setState] = useState<IFormState<T>>({
    values: options.initialValues,
    errors: {},
    touched: {},
    isSubmitting: false
  });

  // Field-level validation
  const validateField = useCallback(async (
    field: keyof T,
    value: any
  ): Promise<string | undefined> => {
    if (!options.validationSchema) return;

    try {
      await options.validationSchema.validateAt(field as string, { [field]: value });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return error.message;
      }
    }
  }, [options.validationSchema]);

  // Handle field changes
  const handleChange = useCallback((field: keyof T) => async (value: any) => {
    setState(prev => ({
      ...prev,
      values: { ...prev.values, [field]: value }
    }));

    monitoring.trackInteraction({
      type: 'form_field_change',
      field: field as string
    });

    if (options.validateOnChange) {
      const error = await validateField(field, value);
      setState(prev => ({
        ...prev,
        errors: { ...prev.errors, [field]: error }
      }));
    }
  }, [options.validateOnChange, validateField]);

  // Handle field blur
  const handleBlur = useCallback((field: keyof T) => async () => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: true }
    }));

    const error = await validateField(field, state.values[field]);
    setState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: error }
    }));
  }, [state.values, validateField]);

  // Form submission
  const handleSubmit = useCallback(async () => {
    const startTime = Date.now();
    setState(prev => ({ ...prev, isSubmitting: true }));

    try {
      if (options.validationSchema) {
        await options.validationSchema.validate(state.values, { abortEarly: false });
      }

      if (options.onSubmit) {
        await options.onSubmit(state.values, {
          setSubmitting: (isSubmitting) => 
            setState(prev => ({ ...prev, isSubmitting })),
          setErrors: (errors) => 
            setState(prev => ({ ...prev, errors })),
          resetForm: () => 
            setState({
              values: options.initialValues,
              errors: {},
              touched: {},
              isSubmitting: false
            })
        });
      }

      monitoring.trackPerformance({
        type: 'form_submit',
        success: true,
        totalTime: Date.now() - startTime
      });

    } catch (error) {
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        submitError: error as Error
      }));

      monitoring.trackError(error as Error, {
        type: 'form_submit_error',
        metadata: { values: state.values }
      });

      throw error;
    }
  }, [state.values, options.validationSchema, options.onSubmit]);

  return {
    ...state,
    handleChange,
    handleBlur,
    handleSubmit
  };
} 