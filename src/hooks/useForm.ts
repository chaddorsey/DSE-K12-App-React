/**
 * Hook for form state management and validation
 */

import { useContext, useCallback, useState, useEffect } from 'react';
import { FormContext } from '../components/Form/FormProvider';
import { IFormConfig, IFormState } from '../components/Form/types';
import { MonitoringService } from '../monitoring/MonitoringService';

export function useForm<T extends Record<string, unknown>>(
  config?: IFormConfig<T>
): IFormState<T> & {
  handleChange: (field: keyof T) => (value: T[keyof T]) => Promise<void>;
  handleBlur: (field: keyof T) => () => Promise<void>;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
  submitError?: Error;
} {
  const context = useContext(FormContext);
  const monitoring = MonitoringService.getInstance();

  if (!context && !config) {
    throw new Error('useForm must be used within a FormProvider or with config');
  }

  // Use context if available, otherwise create local state
  const [state, setState] = useState<IFormState<T>>(() => ({
    values: (context?.values ?? config?.initialValues) as T,
    errors: {} as Record<keyof T, string | undefined>,
    touched: {} as Record<keyof T, boolean>,
    dirty: {} as Record<keyof T, boolean>,
    isSubmitting: false,
    isValid: true,
    submitError: undefined
  }));

  const validate = useCallback(async (values: T): Promise<Record<keyof T, string | undefined>> => {
    if (!config?.validationSchema) return {} as Record<keyof T, string | undefined>;

    try {
      await config.validationSchema.validate(values, { abortEarly: false });
      return {} as Record<keyof T, string | undefined>;
    } catch (err) {
      const errors = {} as Record<keyof T, string | undefined>;
      if (err.inner) {
        err.inner.forEach((error: any) => {
          errors[error.path as keyof T] = error.message;
        });
      }
      return errors;
    }
  }, [config?.validationSchema]);

  const handleChange = useCallback((field: keyof T) => async (value: T[keyof T]) => {
    const newValues = { ...state.values, [field]: value };
    const newDirty = { ...state.dirty, [field]: true };
    
    setState(prev => ({
      ...prev,
      values: newValues,
      dirty: newDirty
    }));

    if (config?.validateOnChange) {
      const errors = await validate(newValues);
      setState(prev => ({
        ...prev,
        errors,
        isValid: Object.keys(errors).length === 0
      }));
    }
  }, [state.values, state.dirty, config?.validateOnChange, validate]);

  const handleBlur = useCallback((field: keyof T) => async () => {
    const newTouched = { ...state.touched, [field]: true };
    
    setState(prev => ({
      ...prev,
      touched: newTouched
    }));

    if (config?.validateOnBlur) {
      const errors = await validate(state.values);
      setState(prev => ({
        ...prev,
        errors,
        isValid: Object.keys(errors).length === 0
      }));
    }
  }, [state.values, state.touched, config?.validateOnBlur, validate]);

  const handleSubmit = useCallback(async () => {
    if (!config?.onSubmit) return;

    setState(prev => ({ ...prev, isSubmitting: true }));
    const startTime = Date.now();

    try {
      const errors = await validate(state.values);
      if (Object.keys(errors).length > 0) {
        setState(prev => ({
          ...prev,
          errors,
          isValid: false,
          isSubmitting: false
        }));
        return;
      }

      await config.onSubmit(state.values);
      
      monitoring.trackPerformance({
        type: 'form_submission',
        formId: config.formId || 'unknown',
        success: true,
        duration: Date.now() - startTime
      });

      setState(prev => ({
        ...prev,
        isSubmitting: false,
        submitError: undefined
      }));
    } catch (error) {
      monitoring.trackPerformance({
        type: 'form_submission',
        formId: config.formId || 'unknown',
        success: false,
        duration: Date.now() - startTime
      });

      setState(prev => ({
        ...prev,
        isSubmitting: false,
        submitError: error as Error
      }));
    }
  }, [state.values, config, validate, monitoring]);

  const resetForm = useCallback(() => {
    setState({
      values: config?.initialValues as T,
      errors: {} as Record<keyof T, string | undefined>,
      touched: {} as Record<keyof T, boolean>,
      dirty: {} as Record<keyof T, boolean>,
      isSubmitting: false,
      isValid: true,
      submitError: undefined
    });
  }, [config?.initialValues]);

  return {
    ...state,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  };
} 