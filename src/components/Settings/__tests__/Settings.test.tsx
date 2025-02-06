import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Settings } from '../Settings';
import { useApi } from '../../../hooks/useApi';
import { usePerformanceMonitoring } from '../../../monitoring/hooks/useMonitoring';

// Mock hooks
jest.mock('../../../hooks/useApi');
jest.mock('../../../monitoring/hooks/useMonitoring', () => ({
  usePerformanceMonitoring: jest.fn()
}));

describe('Settings', () => {
  const mockUseApi = useApi as jest.Mock;
  const mockSettings = {
    theme: 'light',
    notifications: true,
    language: 'en',
    timezone: 'UTC'
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

  it('should render settings form', () => {
    mockUseApi.mockReturnValue({
      data: mockSettings,
      loading: false,
      error: null,
      request: jest.fn()
    });

    render(<Settings />);

    expect(screen.getByLabelText(/Theme/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Notifications/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Language/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Timezone/i)).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const mockRequest = jest.fn().mockResolvedValue(mockSettings);
    mockUseApi.mockReturnValue({
      data: mockSettings,
      loading: false,
      error: null,
      request: mockRequest
    });

    render(<Settings />);

    fireEvent.change(screen.getByLabelText(/Theme/i), {
      target: { value: 'dark' }
    });

    fireEvent.click(screen.getByText(/Save Settings/i));

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith('users.settings', {
        method: 'PUT',
        body: expect.objectContaining({ theme: 'dark' })
      });
    });
  });

  it('should show loading state', () => {
    mockUseApi.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      request: jest.fn()
    });

    render(<Settings />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should handle error state', () => {
    mockUseApi.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed to load settings'),
      request: jest.fn()
    });

    render(<Settings />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should track performance', () => {
    render(<Settings />);
    expect(usePerformanceMonitoring).toHaveBeenCalledWith('Settings');
  });
}); 