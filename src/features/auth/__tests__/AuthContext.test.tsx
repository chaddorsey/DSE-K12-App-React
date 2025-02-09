import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import { usePerformanceMonitoring } from '../../../monitoring/hooks/useMonitoring';
import { apiClient } from '../../../services/api';

jest.mock('../../../monitoring/hooks/useMonitoring');
jest.mock('../../../services/api');

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

const TestComponent = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </div>
      {user && <div data-testid="user-email">{user.email}</div>}
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides authentication state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
  });

  it('updates authentication state when user logs in', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      role: 'user' as const
    };

    render(
      <AuthProvider initialUser={mockUser}>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com');
  });

  it('tracks performance', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(usePerformanceMonitoring).toHaveBeenCalledWith('AuthProvider');
  });

  it('throws error when useAuth is used outside AuthProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuth must be used within an AuthProvider');

    consoleError.mockRestore();
  });

  it('handles login success', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      role: 'user' as const
    };

    mockApiClient.post.mockResolvedValueOnce({ 
      token: 'mock-token',
      user: mockUser 
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const { login } = useAuth();
    await act(async () => {
      await login('test@example.com', 'password');
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com');
  });

  it('handles login failure', async () => {
    const error = new Error('Invalid credentials');
    mockApiClient.post.mockRejectedValueOnce(error);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const { login } = useAuth();
    await expect(login('test@example.com', 'wrong')).rejects.toThrow('Invalid credentials');
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
  });

  it('handles logout', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      role: 'user' as const
    };

    render(
      <AuthProvider initialUser={mockUser}>
        <TestComponent />
      </AuthProvider>
    );

    mockApiClient.post.mockResolvedValueOnce({});

    const { logout } = useAuth();
    await act(async () => {
      await logout();
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
  });
}); 