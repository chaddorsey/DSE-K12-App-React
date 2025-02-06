import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Settings } from '../Settings';
import { ErrorBoundary } from '../../ErrorBoundary';
import { useApi } from '../../../hooks/useApi';

// Mock hooks
jest.mock('../../../hooks/useApi');
const mockUseApi = useApi as jest.Mock;

describe('Settings Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should work with error boundary', () => {
    mockUseApi.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed to load settings'),
      request: jest.fn()
    });

    render(
      <ErrorBoundary>
        <Settings />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should work with form container', async () => {
    const mockSettings = {
      theme: 'light',
      notifications: true,
      language: 'en',
      timezone: 'UTC'
    };

    mockUseApi.mockReturnValue({
      data: mockSettings,
      loading: false,
      error: null,
      request: jest.fn()
    });

    render(<Settings />);

    fireEvent.change(screen.getByLabelText(/Theme/i), {
      target: { value: 'dark' }
    });

    fireEvent.click(screen.getByText(/Save Settings/i));

    await waitFor(() => {
      expect(screen.getByText(/Settings saved/i)).toBeInTheDocument();
    });
  });
}); 