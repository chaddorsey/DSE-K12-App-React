import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppProviders } from '../AppProviders';
import { useAuth } from '../../features/auth/context/AuthContext';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';

// Mock our hooks
jest.mock('../../features/auth/context/AuthContext');
jest.mock('../../hooks/useNetworkStatus');
jest.mock('../../monitoring/hooks/useMonitoring');

// Test component that uses our contexts
const TestComponent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { isOnline } = useNetworkStatus();
  
  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </div>
      <div data-testid="network-status">
        {isOnline ? 'Online' : 'Offline'}
      </div>
    </div>
  );
};

describe('AppProviders', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Default mock implementations
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });
    (useNetworkStatus as jest.Mock).mockReturnValue({ isOnline: true });
    (usePerformanceMonitoring as jest.Mock).mockReturnValue({});
  });

  it('provides auth context', () => {
    render(
      <AppProviders>
        <TestComponent />
      </AppProviders>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
  });

  it('provides network status', () => {
    render(
      <AppProviders>
        <TestComponent />
      </AppProviders>
    );

    expect(screen.getByTestId('network-status')).toHaveTextContent('Online');
  });

  it('catches errors in child components', () => {
    const ErrorComponent = () => {
      throw new Error('Test error');
    };

    render(
      <AppProviders>
        <ErrorComponent />
      </AppProviders>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('initializes performance monitoring', () => {
    render(
      <AppProviders>
        <TestComponent />
      </AppProviders>
    );

    expect(usePerformanceMonitoring).toHaveBeenCalledWith('AppProviders');
  });
}); 