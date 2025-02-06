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
import { ErrorDisplay } from '../ErrorDisplay';
import { LoadingSpinner } from '../LoadingSpinner';
import { usePerformanceMonitoring } from '../../hooks/usePerformanceMonitoring';
import { Schema } from 'yup';
import { logger } from '../../utils/logger';
import './FormContainer.css';

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

export interface IFormRenderProps<T> {
  data: T;
  errors: Record<keyof T, string>;
  isSubmitting: boolean;
  handleChange: (field: keyof T, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export interface IFormContainerProps<P extends EndpointPath> {
  /** API endpoint */
  endpoint: P;
  /** Initial form values */
  initialValues: Record<string, unknown>;
  /** Validation schema */
  validationSchema?: Schema<RequestBody<P>>;
  /** Success callback */
  onSubmit: (values: Record<string, unknown>) => Promise<void>;
  /** Form render function */
  children: (props: IFormRenderProps<Record<string, unknown>>) => React.ReactNode;
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
  error?: Error;
  onRetry?: () => void;
}

interface IFormError {
  title: string;
  message: string;
  details?: string;
  code?: string;
  stack?: string;
  name?: string;
}

interface ValidationError {
  inner: Array<{
    path?: string;
    message: string;
  }>;
}

export function FormContainer<P extends EndpointPath>({
  endpoint,
  initialValues,
  validationSchema,
  onSubmit,
  children,
  title,
  subtitle,
  isLoading = false,
  error,
  onRetry
}: IFormContainerProps<P>): React.ReactElement {
  const [state, setState] = useState<IFormState<RequestBody<P>>>({
    data: initialValues as RequestBody<P>,
    errors: {} as Record<keyof RequestBody<P>, string>,
    touched: {} as Record<keyof RequestBody<P>, boolean>,
    dirty: {} as Record<keyof RequestBody<P>, boolean>,
    isSubmitting: false,
    isValid: true
  });

  const [localError, setLocalError] = useState<IFormError | null>(null);
  const { trackEvent } = usePerformanceMonitoring('FormContainer');

  const validate = useCallback(async (values: RequestBody<P>) => {
    if (!validationSchema) return {};
    try {
      await validationSchema.validate(values, { abortEarly: false });
      return {};
    } catch (err: unknown) {
      if (isValidationError(err)) {
        return handleValidationError(err);
      }
      return {};
    }
  }, [validationSchema]);

  // Type guard for validation error
  const isValidationError = (error: unknown): error is ValidationError => {
    return (
      error !== null &&
      typeof error === 'object' &&
      'inner' in error &&
      Array.isArray((error as ValidationError).inner) &&
      (error as ValidationError).inner.every(
        (item) =>
          typeof item === 'object' &&
          item !== null &&
          'message' in item &&
          typeof item.message === 'string' &&
          (!('path' in item) || typeof item.path === 'string')
      )
    );
  };

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

  const handleValidationError = (validationErr: ValidationError): Record<string, string> => {
    const errors: Record<string, string> = {};
    validationErr.inner.forEach((error) => {
      if (error.path) {
        errors[error.path] = error.message;
      }
    });
    return errors;
  };

  const handleError = (err: unknown): IFormError => {
    if (err instanceof Error) {
      return {
        title: 'Error',
        message: err.message,
        details: err.stack,
        name: err.name
      };
    }

    if (typeof err === 'string') {
      return {
        title: 'Error',
        message: err
      };
    }

    return {
      title: 'Error',
      message: 'An unexpected error occurred',
      details: JSON.stringify(err, null, 2)
    };
  };

  const handleRetry = () => {
    setLocalError(null);
    onRetry?.();
  };

  if (isLoading) {
    return (
      <div className="form-container form-container--loading">
        <LoadingSpinner />
      </div>
    );
  }

  const errorToDisplay = error || localError;
  if (errorToDisplay) {
    const formattedError = handleError(errorToDisplay);
    return (
      <div className="form-container form-container--error">
        <ErrorDisplay
          error={{
            title: formattedError.title,
            message: formattedError.message,
            ...(formattedError.details && { details: formattedError.details }),
            ...(formattedError.code && { code: formattedError.code })
          }}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="form-container">
      {title && <h2 className="form-container__title">{title}</h2>}
      {subtitle && <p className="form-container__subtitle">{subtitle}</p>}
      <div className="form-container__content">
        {children({
          data: state.data,
          errors: state.errors,
          isSubmitting: state.isSubmitting,
          handleChange: setFieldValue,
          handleSubmit
        })}
      </div>
    </div>
  );
} 