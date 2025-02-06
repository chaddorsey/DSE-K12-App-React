import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserProfile } from '../UserProfile';
import { useApi } from '../../../hooks/useApi';
import { usePerformanceMonitoring } from '../../../monitoring/hooks/useMonitoring';

// Mock hooks
jest.mock('../../../hooks/useApi');
jest.mock('../../../monitoring/hooks/useMonitoring', () => ({
  usePerformanceMonitoring: jest.fn()
}));

describe('UserProfile', () => {
  const mockUseApi = useApi as jest.Mock;
  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    avatar: 'https://example.com/avatar.jpg'
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

  it('should render user data', () => {
    mockUseApi.mockReturnValue({
      data: mockUser,
      loading: false,
      error: null,
      request: jest.fn()
    });

    render(<UserProfile />);

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByAltText(`${mockUser.name}'s avatar`)).toBeInTheDocument();
  });

  it('should show loading state', () => {
    mockUseApi.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      request: jest.fn()
    });

    render(<UserProfile />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should handle error state', () => {
    mockUseApi.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed to load profile'),
      request: jest.fn()
    });

    render(<UserProfile />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should track performance', () => {
    render(<UserProfile />);
    expect(usePerformanceMonitoring).toHaveBeenCalledWith('UserProfile');
  });
}); 