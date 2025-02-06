/**
 * Loading spinner component with performance monitoring
 */

import React from 'react';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';
import './LoadingSpinner.css';

export interface ILoadingSpinnerProps {
  /** Size of the spinner */
  size?: 'small' | 'medium' | 'large';
  /** Whether the spinner is visible */
  visible?: boolean;
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Loading spinner component with size variants and accessibility support
 */
export const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({
  size = 'medium',
  visible = true,
  'aria-label': ariaLabel = 'Loading...',
  className = ''
}) => {
  usePerformanceMonitoring('LoadingSpinner');

  if (!visible) {
    return null;
  }

  return (
    <div 
      className={`loading-spinner loading-spinner--${size} ${className}`.trim()}
      role="progressbar"
      aria-label={ariaLabel}
      aria-busy="true"
    >
      <div className="loading-spinner__circle" />
    </div>
  );
}; 