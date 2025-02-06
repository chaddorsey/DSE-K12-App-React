/**
 * TextArea field component with form integration
 */

import React, { useId } from 'react';
import { useForm } from '../../../hooks/useForm';
import { ITextAreaFieldProps } from './types';
import { MonitoringService } from '../../../monitoring/MonitoringService';
import './Field.css';

export function TextAreaField<T extends Record<string, unknown>>({
  name,
  label,
  required,
  error,
  placeholder,
  rows = 3,
  maxLength,
  showCharacterCount,
  className,
  onChange,
  onBlur,
  'aria-describedby': ariaDescribedby
}: ITextAreaFieldProps<T>) {
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
  const countId = `${fieldId}-count`;
  const hasError = error || (touched[name] && errors[name]);
  const errorMessage = error || errors[name];
  const currentValue = (values[name] as string) || '';

  const handleTextAreaChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleTextAreaBlur = async (e: React.FocusEvent<HTMLTextAreaElement>) => {
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

  const describedBy = [
    hasError && errorId,
    showCharacterCount && countId,
    ariaDescribedby
  ].filter(Boolean).join(' ');

  return (
    <div className={`field ${className || ''} ${hasError ? 'field--error' : ''}`}>
      <label htmlFor={fieldId} className="field__label">
        {label}
        {required && <span className="field__required"> *</span>}
      </label>
      <textarea
        id={fieldId}
        name={name as string}
        value={currentValue}
        onChange={handleTextAreaChange}
        onBlur={handleTextAreaBlur}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={Boolean(hasError)}
        aria-describedby={describedBy}
        className="field__textarea"
        required={required}
      />
      {showCharacterCount && maxLength && (
        <div id={countId} className="field__character-count">
          {currentValue.length}/{maxLength}
        </div>
      )}
      {hasError && (
        <div id={errorId} className="field__error" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
} 