import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { useApi } from './hooks/useApi';
import { usePerformanceMonitoring } from './monitoring/hooks/useMonitoring';

// Mock hooks
jest.mock('./hooks/useApi');
jest.mock('./monitoring/hooks/useMonitoring', () => ({
  usePerformanceMonitoring: jest.fn()
}));

// Mock lazy-loaded components
jest.mock('./components/NetworkStatusIndicator', () => ({
  NetworkStatusIndicator: () => <div data-testid="network-status">Network Status</div>
}));

jest.mock('./components/LoadingSpinner', () => ({
  LoadingSpinner: () => <div role="progressbar">Loading...</div>
}));

jest.mock('./components/Dashboard', () => ({
  __esModule: true,
  default: () => <div data-testid="dashboard">Dashboard</div>
}));

jest.mock('./components/UserProfile', () => ({
  __esModule: true,
  default: () => <div data-testid="user-profile">User Profile</div>
}));

jest.mock('./components/Settings', () => ({
  __esModule: true,
  default: () => <div data-testid="settings">Settings</div>
}));

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
};

describe('App Integration', () => {
  const mockUseApi = useApi as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseApi.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      request: jest.fn()
    });
  });

  it('should render network status indicator', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('network-status')).toBeInTheDocument();
  });

  it('should render loading spinner during route transitions', () => {
    mockUseApi.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      request: jest.fn()
    });

    renderWithRouter(<App />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should handle route navigation', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('should track performance', () => {
    renderWithRouter(<App />);
    expect(usePerformanceMonitoring).toHaveBeenCalledWith('App');
  });
}); 