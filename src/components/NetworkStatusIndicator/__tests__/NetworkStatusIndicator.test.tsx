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

describe('NetworkStatusIndicator', () => {
  const mockUseNetworkStatus = useNetworkStatus as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNetworkStatus.mockReturnValue({
      isOnline: true,
      latency: 100,
      connectionType: '4g'
    });
  });

  it('should render online status', () => {
    render(<NetworkStatusIndicator />);
    
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveClass('network-status--top');
    expect(screen.getByRole('status')).toHaveClass('is-online');
  });

  it('should render offline status', () => {
    mockUseNetworkStatus.mockReturnValue({
      isOnline: false,
      latency: 0,
      connectionType: undefined
    });

    render(<NetworkStatusIndicator />);
    
    expect(screen.getByRole('status')).toHaveClass('is-offline');
  });

  it('should handle position prop', () => {
    render(<NetworkStatusIndicator position="bottom" />);
    expect(screen.getByRole('status')).toHaveClass('network-status--bottom');
  });

  it('should show latency when enabled', () => {
    render(<NetworkStatusIndicator showLatency />);
    expect(screen.getByText(/100ms/)).toBeInTheDocument();
    expect(screen.getByText(/4g/)).toBeInTheDocument();
  });

  it('should track performance', () => {
    render(<NetworkStatusIndicator />);
    expect(usePerformanceMonitoring).toHaveBeenCalledWith('NetworkStatusIndicator');
  });
}); 