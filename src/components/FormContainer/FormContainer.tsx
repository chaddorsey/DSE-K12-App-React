/**
 * Generic container component for form handling with validation and submission.
 * Provides type-safe form state management and error handling through a render prop pattern.
 * 
 * @example
 * ```tsx
 * <FormContainer endpoint="users.settings">
 *   {({ data, handleSubmit }) => (
 *     <form onSubmit={handleSubmit}>
 *       <input
 *         value={data.name}
 *         onChange={e => setFieldValue('name', e.target.value)}
 *       />
 *     </form>
 *   )}
 * </FormContainer>
 * ```
 */

import React, { useCallback, useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { EndpointPath, RequestBody } from '../../api/types/endpoints';
import { ErrorDisplay } from '../ErrorDisplay/ErrorDisplay';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';
import { Schema } from 'yup';

export interface IFormConfig<T extends Record<string, unknown>> {
  /** Initial form values */
  initialValues: T;
  /** Validation schema */
  validationSchema?: Schema<T>;
  /** Form submission handler */
  onSubmit: (values: T) => Promise<void>;
  /** Validate on field change */
  validateOnChange?: boolean;
  /** Validate on field blur */
  validateOnBlur?: boolean;
}

export interface IFormState<T extends Record<string, unknown>> {
  /** Form data */
  data: T;
  /** Field-level errors */
  errors: Record<keyof T, string>;
  /** Field-level touched state */
  touched: Record<keyof T, boolean>;
  /** Field-level dirty state */
  dirty: Record<keyof T, boolean>;
  /** Form-level submission state */
  isSubmitting: boolean;
  /** Form-level validation state */
  isValid: boolean;
  /** Form-level error */
  submitError?: Error;
}

export interface IFormRenderProps<T extends Record<string, unknown>> extends IFormState<T> {
  /** Update a field value */
  setFieldValue: (field: keyof T, value: T[keyof T]) => void;
  /** Mark a field as touched */
  setFieldTouched: (field: keyof T) => void;
  /** Submit the form */
  handleSubmit: () => Promise<void>;
  /** Reset the form */
  resetForm: () => void;
}

export interface IFormContainerProps<P extends EndpointPath> {
  /** API endpoint */
  endpoint: P;
  /** Initial form values */
  initialValues: Partial<RequestBody<P>>;
  /** Validation schema */
  validationSchema?: Schema<RequestBody<P>>;
  /** Success callback */
  onSubmit: (values: RequestBody<P>) => Promise<void>;
  /** Form render function */
  children: (props: IFormRenderProps<RequestBody<P>>) => React.ReactNode;
}

export function FormContainer<P extends EndpointPath>({
  endpoint,
  initialValues,
  validationSchema,
  onSubmit,
  children
}: IFormContainerProps<P>): React.ReactElement {
  usePerformanceMonitoring('FormContainer');

  const [state, setState] = useState<IFormState<RequestBody<P>>>({
    data: initialValues as RequestBody<P>,
    errors: {} as Record<keyof RequestBody<P>, string>,
    touched: {} as Record<keyof RequestBody<P>, boolean>,
    dirty: {} as Record<keyof RequestBody<P>, boolean>,
    isSubmitting: false,
    isValid: true
  });

  const validate = useCallback(async (values: RequestBody<P>) => {
    if (!validationSchema) return {};
    try {
      await validationSchema.validate(values, { abortEarly: false });
      return {};
    } catch (err) {
      const errors: Record<string, string> = {};
      err.inner.forEach((error: any) => {
        errors[error.path] = error.message;
      });
      return errors;
    }
  }, [validationSchema]);

  const setFieldValue = useCallback(async (field: keyof RequestBody<P>, value: RequestBody<P>[keyof RequestBody<P>]) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      dirty: { ...prev.dirty, [field]: true }
    }));
  }, []);

  const setFieldTouched = useCallback((field: keyof RequestBody<P>) => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: true }
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    setState(prev => ({ ...prev, isSubmitting: true }));

    const errors = await validate(state.data);
    if (Object.keys(errors).length > 0) {
      setState(prev => ({
        ...prev,
        errors,
        isSubmitting: false,
        isValid: false
      }));
      return;
    }

    try {
      await onSubmit(state.data);
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        isValid: true,
        submitError: undefined
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        submitError: error as Error
      }));
    }
  }, [state.data, validate, onSubmit]);

  const resetForm = useCallback(() => {
    setState({
      data: initialValues as RequestBody<P>,
      errors: {} as Record<keyof RequestBody<P>, string>,
      touched: {} as Record<keyof RequestBody<P>, boolean>,
      dirty: {} as Record<keyof RequestBody<P>, boolean>,
      isSubmitting: false,
      isValid: true,
      submitError: undefined
    });
  }, [initialValues]);

  return (
    <>
      {state.submitError && <ErrorDisplay error={state.submitError} />}
      {children({
        ...state,
        setFieldValue,
        setFieldTouched,
        handleSubmit,
        resetForm
      })}
    </>
  );
} 