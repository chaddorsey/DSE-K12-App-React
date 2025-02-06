/**
 * Provider component for form state and functionality
 */

import React, { createContext, useMemo, useEffect } from 'react';
import { MonitoringService } from '../../monitoring/MonitoringService';
import { IFormConfig, IFormContext } from './types';

export const FormContext = createContext<IFormContext<any> | null>(null);

interface IFormProviderProps<T extends Record<string, unknown>> extends IFormConfig<T> {
  children: React.ReactNode;
}

export function FormProvider<T extends Record<string, unknown>>({
  children,
  formId,
  ...config
}: IFormProviderProps<T>) {
  const monitoring = MonitoringService.getInstance();
  const startTime = useMemo(() => Date.now(), []);

  useEffect(() => {
    monitoring.trackPerformance({
      type: 'form_init',
      formId: formId || 'unknown',
      success: true,
      duration: Date.now() - startTime
    });
  }, [formId, monitoring, startTime]);

  // Initial context value - will be replaced by useForm hook
  const contextValue = useMemo<IFormContext<T>>(() => ({
    values: config.initialValues,
    errors: {} as Record<keyof T, string | undefined>,
    touched: {} as Record<keyof T, boolean>,
    dirty: {} as Record<keyof T, boolean>,
    isSubmitting: false,
    isValid: false,
    setFieldValue: () => {},
    setFieldTouched: () => {},
    handleSubmit: async () => {},
    resetForm: () => {}
  }), [config.initialValues]);

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
} 