/**
 * File input field component with form integration
 */

import React, { useId, useRef, useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { IFileFieldProps } from './types';
import { MonitoringService } from '../../../monitoring/MonitoringService';
import './Field.css';

export function FileField<T extends Record<string, unknown>>({
  name,
  label,
  required,
  error,
  accept,
  multiple,
  maxSize,
  validateFile,
  className,
  onChange,
  onBlur,
  'aria-describedby': ariaDescribedby
}: IFileFieldProps<T>) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur
  } = useForm<T>();

  const [customError, setCustomError] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const monitoring = MonitoringService.getInstance();
  const fieldId = useId();
  const errorId = `${fieldId}-error`;
  const hasError = error || customError || (touched[name] && errors[name]);
  const errorMessage = error || customError || errors[name];
  const currentFiles = values[name] as File | File[] | null;

  const validateFiles = (files: FileList): string | undefined => {
    if (maxSize) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxSize) {
          const sizeMB = Math.round(maxSize / (1024 * 1024));
          return `File size must be less than ${sizeMB}MB`;
        }
      }
    }

    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isValidType = acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          if (type.includes('/*')) {
            const [baseType] = type.split('/');
            return file.type.startsWith(baseType);
          }
          return file.type === type;
        });

        if (!isValidType) {
          return 'Invalid file type';
        }
      }
    }

    if (validateFile && files.length === 1) {
      return validateFile(files[0]);
    }

    return undefined;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const startTime = Date.now();
    try {
      const files = e.target.files;
      if (!files?.length) return;

      const validationError = validateFiles(files);
      if (validationError) {
        setCustomError(validationError);
        return;
      }

      setCustomError(undefined);
      const value = multiple ? Array.from(files) : files[0];
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

  const handleFileBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
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

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getFileNames = (): string => {
    if (!currentFiles) return 'No file chosen';
    if (Array.isArray(currentFiles)) {
      return currentFiles.length === 1
        ? currentFiles[0].name
        : `${currentFiles.length} files selected`;
    }
    return currentFiles.name;
  };

  return (
    <div className={`field ${className || ''} ${hasError ? 'field--error' : ''}`}>
      <label htmlFor={fieldId} className="field__label">
        {label}
        {required && <span className="field__required"> *</span>}
      </label>
      <div className="field__file-wrapper">
        <input
          ref={fileInputRef}
          id={fieldId}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          onBlur={handleFileBlur}
          className="field__file-input"
          data-testid="file-input"
          required={required}
          tabIndex={-1}
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="field__file-button"
          aria-invalid={Boolean(hasError)}
          aria-describedby={`${errorId} ${ariaDescribedby || ''}`.trim()}
        >
          Choose file
        </button>
        <span className="field__file-name">{getFileNames()}</span>
      </div>
      {hasError && (
        <div id={errorId} className="field__error" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
} 