import React from 'react';
import { render, screen } from '@testing-library/react';
import { NetworkStatusIndicator } from '../NetworkStatusIndicator';
import { useNetworkStatus } from '../../../hooks/useNetworkStatus';
import { usePerformanceMonitoring } from '../../../monitoring/hooks/useMonitoring';

// Mock hooks
jest.mock('../../../hooks/useNetworkStatus');
jest.mock('../../../monitoring/hooks/useMonitoring', () => ({
  usePerformanceMonitoring: jest.fn()
}));

const mockUseNetworkStatus = useNetworkStatus as jest.Mock;

describe('NetworkStatusIndicator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNetworkStatus.mockReturnValue({
      online: true,
      loading: false,
      lastChecked: new Date().toISOString()
    });
  });

  it('should show online status with correct styling', () => {
    render(<NetworkStatusIndicator />);
    
    const indicator = screen.getByRole('status');
    expect(indicator).toHaveTextContent(/online/i);
    expect(indicator).toHaveClass('network-status--online');
    expect(indicator).toHaveAttribute('aria-live', 'polite');
  });

  it('should show offline status with correct styling', () => {
    mockUseNetworkStatus.mockReturnValue({
      online: false,
      loading: false,
      lastChecked: new Date().toISOString()
    });

    render(<NetworkStatusIndicator />);
    
    const indicator = screen.getByRole('status');
    expect(indicator).toHaveTextContent(/offline/i);
    expect(indicator).toHaveClass('network-status--offline');
    expect(indicator).toHaveAttribute('aria-live', 'assertive');
  });

  it('should show loading state', () => {
    mockUseNetworkStatus.mockReturnValue({
      online: true,
      loading: true,
      lastChecked: new Date().toISOString()
    });

    render(<NetworkStatusIndicator />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
  });

  it('should show last checked time', () => {
    const lastChecked = '2024-01-01T12:00:00Z';
    mockUseNetworkStatus.mockReturnValue({
      online: true,
      loading: false,
      lastChecked
    });

    render(<NetworkStatusIndicator />);
    
    expect(screen.getByTitle(/last checked/i)).toHaveTextContent(
      expect.stringContaining('12:00')
    );
  });

  it('should track performance', () => {
    render(<NetworkStatusIndicator />);
    expect(usePerformanceMonitoring).toHaveBeenCalledWith('NetworkStatusIndicator');
  });

  it('should be keyboard accessible', () => {
    render(<NetworkStatusIndicator />);
    
    const indicator = screen.getByRole('status');
    expect(indicator).toHaveAttribute('tabIndex', '0');
    expect(indicator).toHaveAttribute('role', 'status');
  });
}); 