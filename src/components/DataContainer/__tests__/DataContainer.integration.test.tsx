import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { DataContainer } from '../DataContainer';
import { ErrorBoundary } from '../../ErrorBoundary';
import { ApiError } from '../../../api/types/errors';
import { useApi } from '../../../hooks/useApi';

// Mock hooks
jest.mock('../../../hooks/useApi');
const mockUseApi = useApi as jest.Mock;

describe('DataContainer Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should work with error boundary', async () => {
    const error = new ApiError('API Error', 500);
    mockUseApi.mockReturnValue({
      loading: false,
      error,
      data: null,
      request: jest.fn()
    });
    
    render(
      <ErrorBoundary>
        <DataContainer 
          endpoint="users.profile"
          errorFallback={<div>Custom error view</div>}
        >
          {() => { throw error; }}
        </DataContainer>
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should handle nested data containers', async () => {
    // Mock responses for nested containers
    mockUseApi
      .mockReturnValueOnce({
        loading: false,
        error: null,
        data: { name: 'Test User' },
        request: jest.fn()
      })
      .mockReturnValueOnce({
        loading: false,
        error: null,
        data: { theme: 'light' },
        request: jest.fn()
      });

    render(
      <DataContainer endpoint="users.profile">
        {(user) => (
          <DataContainer endpoint="users.settings">
            {(settings) => (
              <div>
                <div>{user.name}</div>
                <div>{settings.theme}</div>
              </div>
            )}
          </DataContainer>
        )}
      </DataContainer>
    );

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('light')).toBeInTheDocument();
    });
  });
}); 