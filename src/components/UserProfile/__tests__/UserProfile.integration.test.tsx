import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserProfile } from '../UserProfile';
import { ErrorBoundary } from '../../ErrorBoundary';
import { useApi } from '../../../hooks/useApi';

// Mock hooks
jest.mock('../../../hooks/useApi');
const mockUseApi = useApi as jest.Mock;

describe('UserProfile Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should work with error boundary', () => {
    mockUseApi.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed to load profile'),
      request: jest.fn()
    });

    render(
      <ErrorBoundary>
        <UserProfile />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should work with data container', () => {
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com'
    };

    mockUseApi.mockReturnValue({
      data: mockUser,
      loading: false,
      error: null,
      request: jest.fn()
    });

    render(<UserProfile />);

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });
}); 