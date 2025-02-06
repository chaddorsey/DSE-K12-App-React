/**
 * Hook for form state management with validation and monitoring
 */

import { useState, useCallback, useRef } from 'react';
import { MonitoringService } from '../monitoring/MonitoringService';
import { Schema } from 'yup';

interface IFormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  submitError: Error | null;
}

interface IFormOptions<T> {
  initialValues: T;
  validationSchema?: Schema<T>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  onSubmit?: (values: T, helpers: IFormHelpers<T>) => Promise<void>;
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
 */
export function useForm<T extends Record<string, any>>(options: IFormOptions<T>) {
  const monitoring = MonitoringService.getInstance();
  const fieldInteractionStart = useRef<Record<keyof T, number>>({} as Record<keyof T, number>);

  const [state, setState] = useState<IFormState<T>>({
    values: options.initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    submitError: null
  });

  const validateField = useCallback(async (
    field: keyof T,
    value: any
  ): Promise<string | undefined> => {
    if (!options.validationSchema) return;

    try {
      await options.validationSchema.validateAt(field as string, { [field]: value });
    } catch (error) {
      monitoring.trackError(error as Error, {
        type: 'validation',
        field: field as string
      });
      return (error as Error).message;
    }
  }, [options.validationSchema]);

  const validateForm = useCallback(async (): Promise<Partial<Record<keyof T, string>>> => {
    if (!options.validationSchema) return {};

    try {
      await options.validationSchema.validate(state.values, { abortEarly: false });
      return {};
    } catch (error: any) {
      const errors: Partial<Record<keyof T, string>> = {};
      error.inner.forEach((err: any) => {
        errors[err.path as keyof T] = err.message;
      });
      return errors;
    }
  }, [options.validationSchema, state.values]);

  const handleChange = useCallback((field: keyof T) => async (value: any) => {
    fieldInteractionStart.current[field] = Date.now();

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

  const handleBlur = useCallback((field: keyof T) => async () => {
    const interactionTime = Date.now() - (fieldInteractionStart.current[field] || Date.now());
    
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: true }
    }));

    monitoring.trackPerformance({
      type: 'field_interaction',
      field: field as string,
      totalTime: interactionTime
    });

    if (options.validateOnBlur) {
      const error = await validateField(field, state.values[field]);
      setState(prev => ({
        ...prev,
        errors: { ...prev.errors, [field]: error }
      }));
    }
  }, [options.validateOnBlur, validateField, state.values]);

  const handleSubmit = useCallback(async () => {
    const startTime = Date.now();
    setState(prev => ({ ...prev, isSubmitting: true, submitError: null }));

    try {
      const errors = await validateForm();
      if (Object.keys(errors).length > 0) {
        setState(prev => ({
          ...prev,
          errors,
          isSubmitting: false
        }));
        return;
      }

      if (options.onSubmit) {
        await options.onSubmit(state.values, {
          setSubmitting: (isSubmitting) => 
            setState(prev => ({ ...prev, isSubmitting })),
          setErrors: (errors) => 
            setState(prev => ({ ...prev, errors })),
          resetForm: () => 
            setState({ ...state, values: options.initialValues })
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
        submitError: error as Error,
        isSubmitting: false
      }));

      monitoring.trackError(error as Error, {
        type: 'submit',
        values: state.values
      });
    }
  }, [state.values, validateForm, options.onSubmit]);

  return {
    ...state,
    handleChange,
    handleBlur,
    handleSubmit
  };
} 