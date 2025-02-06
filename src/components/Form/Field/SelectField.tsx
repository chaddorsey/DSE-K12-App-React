/**
 * Select field component with form integration
 */

import React, { useId } from 'react';
import { useForm } from '../../../hooks/useForm';
import { ISelectFieldProps } from './types';
import { MonitoringService } from '../../../monitoring/MonitoringService';
import './Field.css';

export function SelectField<T extends Record<string, unknown>>({
  name,
  label,
  options,
  required,
  error,
  placeholder,
  multiple,
  className,
  onChange,
  onBlur,
  'aria-describedby': ariaDescribedby
}: ISelectFieldProps<T>) {
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

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const startTime = Date.now();
    try {
      const value = multiple 
        ? Array.from(e.target.selectedOptions, option => option.value)
        : e.target.value;

      await handleChange(name)(value as T[keyof T]);
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

  const handleSelectBlur = async (e: React.FocusEvent<HTMLSelectElement>) => {
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
      <select
        id={fieldId}
        name={name as string}
        value={values[name] as string | string[]}
        onChange={handleSelectChange}
        onBlur={handleSelectBlur}
        multiple={multiple}
        aria-invalid={Boolean(hasError)}
        aria-describedby={`${errorId} ${ariaDescribedby || ''}`.trim()}
        className="field__select"
        required={required}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {hasError && (
        <div id={errorId} className="field__error" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
} 