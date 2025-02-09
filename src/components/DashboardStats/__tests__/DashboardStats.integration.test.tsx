import React from 'react';
import { render, screen } from '@testing-library/react';
import { DashboardStats } from '../DashboardStats';
import { ErrorBoundary } from '../../ErrorBoundary';
import { useApi } from '../../../hooks/useApi';
import type { IUseApiResult } from '../../../api/types/endpoints';

// Mock hooks
jest.mock('../../../hooks/useApi');

const mockUseApi = useApi as jest.MockedFunction<typeof useApi>;

describe('DashboardStats Integration', () => {
  const mockData = {
    stats: {
      views: 1000,
      interactions: 500,
      totalUsers: 100,
      activeUsers: 50,
      newUsers: 10
    },
    recentActivity: []
  };

  const mockApiResult: IUseApiResult<typeof mockData> = {
    data: mockData,
    loading: false,
    error: null,
    errorMessage: '',
    request: jest.fn(),
    reset: jest.fn()
  };

  beforeEach(() => {
    mockUseApi.mockReturnValue(mockApiResult);
  });

  it('works within error boundary', () => {
    render(
      <ErrorBoundary>
        <DashboardStats timeframe="day" />
      </ErrorBoundary>
    );

    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('handles API errors gracefully', () => {
    const error = new Error('API Error');
    mockUseApi.mockReturnValueOnce({
      ...mockApiResult,
      data: null,
      error,
      errorMessage: error.message
    });

    render(
      <ErrorBoundary>
        <DashboardStats timeframe="day" />
      </ErrorBoundary>
    );

    expect(screen.getByText(/API Error/i)).toBeInTheDocument();
  });
}); 