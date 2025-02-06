/**
 * Checkbox field component with form integration
 */

import React, { useId } from 'react';
import { useForm } from '../../../hooks/useForm';
import { ICheckboxFieldProps } from './types';
import { MonitoringService } from '../../../monitoring/MonitoringService';
import './Field.css';

export function CheckboxField<T extends Record<string, unknown>>({
  name,
  label,
  checkboxLabel,
  required,
  error,
  className,
  onChange,
  onBlur,
  'aria-describedby': ariaDescribedby
}: ICheckboxFieldProps<T>) {
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

  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const startTime = Date.now();
    try {
      await handleChange(name)(e.target.checked as T[keyof T]);
      onChange?.(e);

      monitoring.trackPerformance({
        type: 'interaction',
        success: true,
        duration: Date.now() - startTime,
        metadata: { field: name, type: 'change' }
      });
    } catch (error) {
      monitoring.trackPerformance({
        type: 'interaction',
        success: false,
        duration: Date.now() - startTime,
        metadata: { field: name, type: 'change', error }
      });
    }
  };

  const handleCheckboxBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const startTime = Date.now();
    try {
      await handleBlur(name)();
      onBlur?.(e);

      monitoring.trackPerformance({
        type: 'interaction',
        success: true,
        duration: Date.now() - startTime,
        metadata: { field: name, type: 'blur' }
      });
    } catch (error) {
      monitoring.trackPerformance({
        type: 'interaction',
        success: false,
        duration: Date.now() - startTime,
        metadata: { field: name, type: 'blur', error }
      });
    }
  };

  return (
    <div className={`field field--checkbox ${className || ''} ${hasError ? 'field--error' : ''}`}>
      {label && (
        <div className="field__label">
          {label}
          {required && <span className="field__required"> *</span>}
        </div>
      )}
      <div className="field__checkbox-wrapper">
        <input
          id={fieldId}
          type="checkbox"
          name={name as string}
          checked={Boolean(values[name])}
          onChange={handleCheckboxChange}
          onBlur={handleCheckboxBlur}
          aria-invalid={Boolean(hasError)}
          aria-describedby={`${errorId} ${ariaDescribedby || ''}`.trim()}
          className="field__checkbox"
          required={required}
        />
        <label 
          htmlFor={fieldId}
          className="field__checkbox-label"
        >
          {checkboxLabel}
        </label>
      </div>
      {hasError && (
        <div id={errorId} className="field__error" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
} 