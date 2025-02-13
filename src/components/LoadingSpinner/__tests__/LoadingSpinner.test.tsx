import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';
import { usePerformanceMonitoring } from '../../../monitoring/hooks/useMonitoring';

// Mock monitoring hook
jest.mock('../../../monitoring/hooks/useMonitoring', () => ({
  usePerformanceMonitoring: jest.fn()
}));

describe('LoadingSpinner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with default props', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('progressbar');
    
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('loading-spinner--medium');
    expect(spinner).toHaveAttribute('aria-label', 'Loading...');
    expect(spinner).toHaveAttribute('aria-busy', 'true');
  });

  it('should handle different sizes', () => {
    const { rerender } = render(<LoadingSpinner size="small" />);
    expect(screen.getByRole('progressbar')).toHaveClass('loading-spinner--small');

    rerender(<LoadingSpinner size="large" />);
    expect(screen.getByRole('progressbar')).toHaveClass('loading-spinner--large');
  });

  it('should handle visibility toggle', () => {
    const { rerender } = render(<LoadingSpinner visible={false} />);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

    rerender(<LoadingSpinner visible={true} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<LoadingSpinner className="custom-class" />);
    expect(screen.getByRole('progressbar')).toHaveClass('custom-class');
  });

  it('should track performance', () => {
    render(<LoadingSpinner />);
    expect(usePerformanceMonitoring).toHaveBeenCalledWith('LoadingSpinner');
  });
}); 