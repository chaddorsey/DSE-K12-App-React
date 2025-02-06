/**
 * Core type definitions for form system
 */

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
  /** Form ID for monitoring */
  formId?: string;
}

export interface IFormState<T extends Record<string, unknown>> {
  /** Current form values */
  values: T;
  /** Field-level errors */
  errors: Record<keyof T, string | undefined>;
  /** Fields that have been touched */
  touched: Record<keyof T, boolean>;
  /** Fields that have been modified */
  dirty: Record<keyof T, boolean>;
  /** Form-level submission state */
  isSubmitting: boolean;
  /** Form-level validation state */
  isValid: boolean;
  /** Form-level error */
  submitError?: Error;
}

export interface IFormContext<T extends Record<string, unknown>> extends IFormState<T> {
  /** Update a field value */
  setFieldValue: (field: keyof T, value: T[keyof T]) => void;
  /** Mark a field as touched */
  setFieldTouched: (field: keyof T) => void;
  /** Submit the form */
  handleSubmit: () => Promise<void>;
  /** Reset the form */
  resetForm: () => void;
} 