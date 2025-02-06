/**
 * Text input field component with form integration
 */

import React, { useId } from 'react';
import { useForm } from '../../../hooks/useForm';
import { ITextFieldProps } from './types';
import { MonitoringService } from '../../../monitoring/MonitoringService';
import './Field.css';

export function TextField<T extends Record<string, unknown>>({
  name,
  label,
  type = 'text',
  required,
  error,
  placeholder,
  className,
  onChange,
  onBlur,
  'aria-describedby': ariaDescribedby
}: ITextFieldProps<T>) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur
  } = useForm<T>();

  const monitoring = MonitoringService.getInstance();
  const fieldId = useId();
  const errorId = `${fieldId}-error`;
  const hasError = error || (touched[name] && errors[name]);
  const errorMessage = error || errors[name];

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const startTime = Date.now();
    try {
      await handleChange(name)(e.target.value as T[keyof T]);
      onChange?.(e);

      const endTime = Date.now();
      monitoring.trackPerformance({
        type: 'interaction',
        success: true,
        totalTime: endTime - startTime,
        duration: endTime - startTime,
        metadata: { field: name, type: 'change' }
      });
    } catch (error) {
      const endTime = Date.now();
      monitoring.trackPerformance({
        type: 'interaction',
        success: false,
        totalTime: endTime - startTime,
        duration: endTime - startTime,
        metadata: { field: name, type: 'change', error }
      });
    }
  };

  const handleInputBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const startTime = Date.now();
    try {
      await handleBlur(name)();
      onBlur?.(e);

      const endTime = Date.now();
      monitoring.trackPerformance({
        type: 'interaction',
        success: true,
        totalTime: endTime - startTime,
        duration: endTime - startTime,
        metadata: { field: name, type: 'blur' }
      });
    } catch (error) {
      const endTime = Date.now();
      monitoring.trackPerformance({
        type: 'interaction',
        success: false,
        totalTime: endTime - startTime,
        duration: endTime - startTime,
        metadata: { field: name, type: 'blur', error }
      });
    }
  };

  return (
    <div className={`field ${className || ''} ${hasError ? 'field--error' : ''}`}>
      <label htmlFor={fieldId} className="field__label">
        {label}
        {required && <span className="field__required"> *</span>}
      </label>
      <input
        id={fieldId}
        type={type}
        name={name as string}
        value={values[name] as string}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        aria-invalid={hasError}
        aria-describedby={`${errorId} ${ariaDescribedby || ''}`.trim()}
        className="field__input"
        required={required}
      />
      {hasError && (
        <div id={errorId} className="field__error" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
} 