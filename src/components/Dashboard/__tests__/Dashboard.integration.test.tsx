import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dashboard } from '../Dashboard';
import { ErrorBoundary } from '../../ErrorBoundary';
import { useApi } from '../../../hooks/useApi';

// Mock hooks
jest.mock('../../../hooks/useApi');
const mockUseApi = useApi as jest.Mock;

describe('Dashboard Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should work with error boundary', () => {
    mockUseApi.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed to load dashboard'),
      request: jest.fn()
    });

    render(
      <ErrorBoundary>
        <Dashboard />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should work with data container', () => {
    const mockData = {
      stats: {
        totalUsers: 1000,
        activeUsers: 750,
        newUsers: 50
      },
      recentActivity: []
    };

    mockUseApi.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      request: jest.fn()
    });

    render(<Dashboard />);

    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('750')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });
}); 