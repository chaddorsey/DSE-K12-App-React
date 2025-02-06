/**
 * File input field component with form integration
 */

import React, { useRef, useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { MonitoringService } from '../../../monitoring/MonitoringService';
import './Field.css';

interface IFileFieldProps<T extends Record<string, unknown>> {
  name: keyof T;
  label: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  required?: boolean;
  error?: string;
  onChange?: (files: FileList | null) => void;
}

export function FileField<T extends Record<string, unknown>>({
  name,
  label,
  accept,
  multiple = false,
  maxSize,
  required = false,
  error: propError,
  onChange: propOnChange
}: IFileFieldProps<T>): React.ReactElement {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const errorId = `${String(name)}-error`;
  const monitoring = MonitoringService.getInstance();

  const {
    values,
    errors,
    handleChange
  } = useForm<T>({
    initialValues: {} as T,
    onSubmit: async () => {
      // File submission handled by parent form
    }
  });

  const hasError = Boolean(errors?.[String(name)] || propError);
  const errorMessage = errors?.[String(name)] || propError;

  const validateFiles = (files: FileList | null): string | null => {
    if (!files || files.length === 0) {
      if (required) {
        return 'Please select a file';
      }
      return null;
    }

    if (maxSize) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxSize) {
          return `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`;
        }
      }
    }

    return null;
  };

  const handleFileChange = (files: FileList | null) => {
    const error = validateFiles(files);
    if (error) {
      handleChange(String(name), '');  // Empty string instead of null
      monitoring.trackPerformance({
        type: 'form_field_change',
        totalTime: 0,
        data: {
          field: String(name),
          error
        }
      });
      return;
    }

    // Convert FileList to string representation
    const fileValue = files ? Array.from(files).map(f => f.name).join(', ') : '';
    handleChange(String(name), fileValue);
    propOnChange?.(files);

    monitoring.trackPerformance({
      type: 'form_field_change',
      totalTime: 0,
      data: {
        field: String(name),
        fileCount: files?.length
      }
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event.target.files);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(false);
    handleFileChange(event.dataTransfer.files);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="field">
      <label className="field__label" htmlFor={String(name)}>
        {label}
        {required && <span className="field__required">*</span>}
      </label>

      <div
        className={`field__file-drop-zone ${dragActive ? 'field__file-drop-zone--active' : ''} ${
          hasError ? 'field__file-drop-zone--error' : ''
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          id={String(name)}
          name={String(name)}
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="field__file-input"
          required={required}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
        />
        <div className="field__file-placeholder">
          {dragActive ? 'Drop files here' : 'Click or drag files to upload'}
        </div>
      </div>

      {hasError && (
        <div id={errorId} className="field__error" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
} 