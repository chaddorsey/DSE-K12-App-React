import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../LoginForm';
import { AuthProvider } from '../AuthContext';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { apiClient } from '../../../services/api';

jest.mock('../../../services/api');
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('LoginForm Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('works with AuthProvider and ErrorBoundary', async () => {
    mockApiClient.post.mockResolvedValueOnce({
      token: 'test-token',
      user: {
        id: '1',
        email: 'test@example.com',
        role: 'user'
      }
    });

    const onSuccess = jest.fn();

    render(
      <ErrorBoundary>
        <AuthProvider>
          <LoginForm onSuccess={onSuccess} />
        </AuthProvider>
      </ErrorBoundary>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('handles API errors gracefully', async () => {
    mockApiClient.post.mockRejectedValueOnce(new Error('Network error'));

    render(
      <ErrorBoundary>
        <AuthProvider>
          <LoginForm onSuccess={jest.fn()} />
        </AuthProvider>
      </ErrorBoundary>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
  });
}); 