import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dashboard } from '../Dashboard';
import { useApi } from '../../../hooks/useApi';
import { usePerformanceMonitoring } from '../../../monitoring/hooks/useMonitoring';

// Mock hooks
jest.mock('../../../hooks/useApi');
jest.mock('../../../monitoring/hooks/useMonitoring', () => ({
  usePerformanceMonitoring: jest.fn()
}));

describe('Dashboard', () => {
  const mockUseApi = useApi as jest.Mock;
  const mockDashboardData = {
    stats: {
      totalUsers: 1000,
      activeUsers: 750,
      newUsers: 50
    },
    recentActivity: [
      { id: 1, type: 'login', user: 'user1', timestamp: '2023-01-01' },
      { id: 2, type: 'settings', user: 'user2', timestamp: '2023-01-02' }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseApi.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      request: jest.fn()
    });
  });

  it('should render dashboard data', () => {
    mockUseApi.mockReturnValue({
      data: mockDashboardData,
      loading: false,
      error: null,
      request: jest.fn()
    });

    render(<Dashboard />);

    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('750')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    mockUseApi.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      request: jest.fn()
    });

    render(<Dashboard />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should handle error state', () => {
    mockUseApi.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed to load dashboard'),
      request: jest.fn()
    });

    render(<Dashboard />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should track performance', () => {
    render(<Dashboard />);
    expect(usePerformanceMonitoring).toHaveBeenCalledWith('Dashboard');
  });
}); 