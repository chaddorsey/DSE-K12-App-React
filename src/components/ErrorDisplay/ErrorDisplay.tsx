/**
 * Reusable error display component with user-friendly messages
 * and action buttons for error recovery
 */

import React from 'react';
import { IErrorMessageTemplate } from '../../errors/types';
import './ErrorDisplay.css';

interface IErrorDisplayProps {
  /** Error message template */
  error: IErrorMessageTemplate;
  /** Called when action button is clicked */
  onAction?: () => void;
  /** Additional CSS class names */
  className?: string;
}

export const ErrorDisplay: React.FC<IErrorDisplayProps> = ({
  error,
  onAction,
  className = ''
}) => {
  return (
    <div className={`error-display ${className}`} role="alert">
      <h3 className="error-display__title">{error.title}</h3>
      <p className="error-display__message">{error.message}</p>
      {error.action && onAction && (
        <button
          className="error-display__action"
          onClick={onAction}
          type="button"
        >
          {error.action}
        </button>
      )}
    </div>
  );
}; 