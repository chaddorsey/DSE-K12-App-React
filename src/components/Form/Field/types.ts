/**
 * Types for form field components
 */

import { ChangeEvent, FocusEvent } from 'react';

export interface IFieldProps<T extends Record<string, unknown>, K extends keyof T = keyof T> {
  /** Field name/key */
  name: K;
  /** Field label */
  label: string;
  /** Whether field is required */
  required?: boolean;
  /** Custom error message */
  error?: string;
  /** Additional CSS class */
  className?: string;
  /** ARIA description ID */
  'aria-describedby'?: string;
}

export interface ITextFieldProps<T extends Record<string, unknown>> extends IFieldProps<T> {
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  /** Placeholder text */
  placeholder?: string;
  /** Custom onChange handler */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Custom onBlur handler */
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export interface ISelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ISelectFieldProps<T extends Record<string, unknown>> extends IFieldProps<T> {
  /** Options for select */
  options: ISelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Whether multiple selection is allowed */
  multiple?: boolean;
  /** Custom onChange handler */
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  /** Custom onBlur handler */
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void;
}

export interface ICheckboxFieldProps<T extends Record<string, unknown>> extends IFieldProps<T> {
  /** Checkbox label text */
  checkboxLabel: string;
  /** Custom onChange handler */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Custom onBlur handler */
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export interface ITextAreaFieldProps<T extends Record<string, unknown>> extends IFieldProps<T> {
  /** Placeholder text */
  placeholder?: string;
  /** Number of rows */
  rows?: number;
  /** Maximum length */
  maxLength?: number;
  /** Whether to show character count */
  showCharacterCount?: boolean;
  /** Custom onChange handler */
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  /** Custom onBlur handler */
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
}

export interface IRadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface IRadioGroupFieldProps<T extends Record<string, unknown>> extends IFieldProps<T> {
  /** Radio options */
  options: IRadioOption[];
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Custom onChange handler */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Custom onBlur handler */
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export interface INumberFieldProps<T extends Record<string, unknown>> extends IFieldProps<T> {
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step value */
  step?: number;
  /** Show increment/decrement controls */
  showControls?: boolean;
  /** Custom onChange handler */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Custom onBlur handler */
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export interface IFileFieldProps<T extends Record<string, unknown>> extends IFieldProps<T> {
  /** Accepted file types */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Custom file validation */
  validateFile?: (file: File) => string | undefined;
  /** Custom onChange handler */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Custom onBlur handler */
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
} 