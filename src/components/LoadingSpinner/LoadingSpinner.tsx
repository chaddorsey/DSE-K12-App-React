/**
 * Loading spinner component with performance monitoring
 */

import React from 'react';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';
import './LoadingSpinner.css';

export interface ILoadingSpinnerProps {
  /** Size of the spinner */
  size?: 'small' | 'medium' | 'large';
  /** Accessible label for screen readers */
  label?: string;
  /** Additional CSS class */
  className?: string;
  /** Whether the spinner is visible */
  visible?: boolean;
}

export const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({
  size = 'medium',
  label = 'Loading...',
  className = '',
  visible = true
}) => {
  usePerformanceMonitoring('LoadingSpinner');

  if (!visible) return null;

  return (
    <div 
      className={`loading-spinner loading-spinner--${size} ${className}`}
      role="progressbar"
      aria-label={label}
      aria-busy="true"
    >
      <div className="loading-spinner__circle" />
      <span className="loading-spinner__label">{label}</span>
    </div>
  );
}; 