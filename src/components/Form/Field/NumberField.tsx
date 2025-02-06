/**
 * Number input field component with form integration
 */

import React, { useId } from 'react';
import { useForm } from '../../../hooks/useForm';
import { INumberFieldProps } from './types';
import { MonitoringService } from '../../../monitoring/MonitoringService';
import './Field.css';

export function NumberField<T extends Record<string, unknown>>({
  name,
  label,
  required,
  error,
  min,
  max,
  step = 1,
  showControls,
  className,
  onChange,
  onBlur,
  'aria-describedby': ariaDescribedby
}: INumberFieldProps<T>) {
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
  const currentValue = Number(values[name]) || 0;

  const handleNumberChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const startTime = Date.now();
    try {
      const value = e.target.value === '' ? '' : Number(e.target.value);
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

  const handleNumberBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
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

  const increment = async () => {
    if (max !== undefined && currentValue >= max) return;
    const newValue = currentValue + step;
    await handleChange(name)(newValue as T[keyof T]);
  };

  const decrement = async () => {
    if (min !== undefined && currentValue <= min) return;
    const newValue = currentValue - step;
    await handleChange(name)(newValue as T[keyof T]);
  };

  return (
    <div className={`field ${className || ''} ${hasError ? 'field--error' : ''}`}>
      <label htmlFor={fieldId} className="field__label">
        {label}
        {required && <span className="field__required"> *</span>}
      </label>
      <div className="field__number-wrapper">
        <input
          id={fieldId}
          type="number"
          name={name as string}
          value={values[name] as number}
          onChange={handleNumberChange}
          onBlur={handleNumberBlur}
          min={min}
          max={max}
          step={step}
          aria-invalid={Boolean(hasError)}
          aria-describedby={`${errorId} ${ariaDescribedby || ''}`.trim()}
          className="field__number"
          required={required}
        />
        {showControls && (
          <div className="field__number-controls">
            <button
              type="button"
              onClick={increment}
              className="field__number-control"
              aria-label="Increment"
              disabled={max !== undefined && currentValue >= max}
            >
              ▲
            </button>
            <button
              type="button"
              onClick={decrement}
              className="field__number-control"
              aria-label="Decrement"
              disabled={min !== undefined && currentValue <= min}
            >
              ▼
            </button>
          </div>
        )}
      </div>
      {hasError && (
        <div id={errorId} className="field__error" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
} 