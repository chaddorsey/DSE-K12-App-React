import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';
import { MonitoringService } from '../../../monitoring/MonitoringService';

// Mock monitoring
jest.mock('../../../monitoring/MonitoringService');
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
    expect(spinner).toHaveClass('loading-spinner--medium');
    expect(spinner).toHaveAttribute('aria-label', 'Loading...');
  });

  it('should render with custom size', () => {
    render(<LoadingSpinner size="large" />);
    
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toHaveClass('loading-spinner--large');
  });

  it('should render with custom label', () => {
    const label = 'Please wait...';
    render(<LoadingSpinner label={label} />);
    
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toHaveAttribute('aria-label', label);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('should not render when visible is false', () => {
    render(<LoadingSpinner visible={false} />);
    
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<LoadingSpinner className="custom-class" />);
    
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toHaveClass('custom-class');
  });
}); 