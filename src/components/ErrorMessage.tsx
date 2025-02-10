import React from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="error-message">
    <div className="error-icon">⚠️</div>
    <p>{message}</p>
  </div>
); 