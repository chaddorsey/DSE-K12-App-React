import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { DashboardStats } from '../DashboardStats';
import { useApi } from '../../../hooks/useApi';
import { usePerformanceMonitoring } from '../../../monitoring/hooks/useMonitoring';
import type { IUseApiResult } from '../../../api/types/endpoints';

// Mock hooks
jest.mock('../../../hooks/useApi');
jest.mock('../../../monitoring/hooks/useMonitoring');

const mockUseApi = useApi as jest.MockedFunction<typeof useApi>;
const mockUsePerformanceMonitoring = usePerformanceMonitoring as jest.MockedFunction<typeof usePerformanceMonitoring>;

describe('DashboardStats', () => {
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
    mockUsePerformanceMonitoring.mockReturnValue({
      measureRender: jest.fn(),
      measureLoad: jest.fn()
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    mockUseApi.mockReturnValueOnce({
      ...mockApiResult,
      data: null,
      loading: true
    });

    render(<DashboardStats timeframe="day" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders stats data when loaded', async () => {
    render(<DashboardStats timeframe="day" />);

    await waitFor(() => {
      expect(screen.getByText('1000')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
    });
  });

  it('renders error state when API fails', async () => {
    const error = new Error('Failed to load stats');
    mockUseApi.mockReturnValueOnce({
      ...mockApiResult,
      data: null,
      error,
      errorMessage: error.message
    });

    render(<DashboardStats timeframe="day" />);
    expect(screen.getByText(/Failed to load stats/i)).toBeInTheDocument();
  });

  it('passes correct params to API', () => {
    const requestSpy = jest.fn();
    mockUseApi.mockReturnValueOnce({
      ...mockApiResult,
      data: null,
      loading: true,
      request: requestSpy
    });

    render(<DashboardStats timeframe="week" />);
    expect(requestSpy).toHaveBeenCalledWith(
      'dashboard.overview',
      expect.objectContaining({
        params: { timeframe: 'week' }
      })
    );
  });

  it('tracks performance', () => {
    render(<DashboardStats timeframe="day" />);
    expect(mockUsePerformanceMonitoring).toHaveBeenCalledWith('DashboardStats');
  });
}); 