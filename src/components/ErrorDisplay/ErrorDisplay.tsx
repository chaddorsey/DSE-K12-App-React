/**
 * Reusable error display component with user-friendly messages
 * and action buttons for error recovery
 */

import React from 'react';
import './ErrorDisplay.css';

export interface IErrorMessageTemplate {
  title: string;
  message: string;
  details?: string;
  code?: string;
}

export interface IErrorDisplayProps {
  error: IErrorMessageTemplate;
  onRetry?: () => void;
}

export const ErrorDisplay: React.FC<IErrorDisplayProps> = ({ error, onRetry }) => {
  return (
    <div className="error-display">
      <div className="error-display__content">
        <h3 className="error-display__title">{error.title}</h3>
        <p className="error-display__message">{error.message}</p>
        {error.details && (
          <pre className="error-display__details">
            {error.details}
          </pre>
        )}
        {error.code && (
          <p className="error-display__code">
            Error code: {error.code}
          </p>
        )}
        {onRetry && (
          <button 
            className="error-display__retry-button"
            onClick={onRetry}
            type="button"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}; 