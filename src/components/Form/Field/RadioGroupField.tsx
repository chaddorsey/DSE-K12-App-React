/**
 * Radio group field component with form integration
 */

import React, { useId } from 'react';
import { useForm } from '../../../hooks/useForm';
import { IRadioGroupFieldProps } from './types';
import { MonitoringService } from '../../../monitoring/MonitoringService';
import './Field.css';

export function RadioGroupField<T extends Record<string, unknown>>({
  name,
  label,
  options,
  required,
  error,
  direction = 'vertical',
  className,
  onChange,
  onBlur,
  'aria-describedby': ariaDescribedby
}: IRadioGroupFieldProps<T>) {
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
  const currentValue = values[name] as string;

  const handleRadioChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleRadioBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
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
      <div className="field__label">
        {label}
        {required && <span className="field__required"> *</span>}
      </div>
      <div
        role="radiogroup"
        aria-labelledby={fieldId}
        aria-invalid={Boolean(hasError)}
        aria-describedby={`${errorId} ${ariaDescribedby || ''}`.trim()}
        className={`field__radio-group field__radio-group--${direction}`}
      >
        {options.map(option => {
          const optionId = `${fieldId}-${option.value}`;
          return (
            <div key={option.value} className="field__radio-option">
              <input
                type="radio"
                id={optionId}
                name={name as string}
                value={option.value}
                checked={currentValue === option.value}
                onChange={handleRadioChange}
                onBlur={handleRadioBlur}
                disabled={option.disabled}
                className="field__radio"
                required={required}
              />
              <label
                htmlFor={optionId}
                className="field__radio-label"
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
      {hasError && (
        <div id={errorId} className="field__error" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
} 