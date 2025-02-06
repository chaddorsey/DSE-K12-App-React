/**
 * Tests for AuthProvider component
 */

import React from 'react';
import { render, act } from '@testing-library/react';
import { AuthProvider } from '../AuthProvider';
import { useAuth } from '../../hooks/useAuth';
import { mockMonitoring } from '../../hooks/testing/mockMonitoring';

// Mock storage
const mockStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: mockStorage });

// Mock API calls
const mockApi = {
  login: jest.fn(),
  logout: jest.fn(),
  signup: jest.fn(),
  resetPassword: jest.fn()
};

describe('AuthProvider', () => {
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.clearAllMocks();
    mockStorage.getItem.mockReturnValue(null);
  });

  const TestComponent = () => {
    const auth = useAuth();
    return (
      <div>
        {auth.user ? (
          <span>Logged in as {auth.user.email}</span>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    );
  };

  it('should provide initial authentication state', () => {
    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByText('Not logged in')).toBeInTheDocument();
  });

  it('should handle successful login', async () => {
    const credentials = { email: 'test@example.com', password: 'password' };
    const user = { id: 1, email: credentials.email };
    mockApi.login.mockResolvedValueOnce({ user, token: 'token' });

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      const auth = useAuth();
      await auth.login(credentials);
    });

    expect(getByText(`Logged in as ${user.email}`)).toBeInTheDocument();
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      'auth_token',
      expect.any(String)
    );
    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
      type: 'auth_login',
      success: true,
      totalTime: expect.any(Number)
    });
  });

  it('should handle login errors', async () => {
    const error = new Error('Invalid credentials');
    mockApi.login.mockRejectedValueOnce(error);

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      const auth = useAuth();
      try {
        await auth.login({ email: 'test@example.com', password: 'wrong' });
      } catch (e) {
        // Expected error
      }
    });

    expect(getByText('Not logged in')).toBeInTheDocument();
    expect(mockMonitors.trackError).toHaveBeenCalledWith(
      error,
      expect.objectContaining({
        type: 'auth_error',
        operation: 'login'
      })
    );
  });

  it('should handle logout', async () => {
    mockStorage.getItem.mockReturnValueOnce('token');
    mockApi.logout.mockResolvedValueOnce({});

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      const auth = useAuth();
      await auth.logout();
    });

    expect(getByText('Not logged in')).toBeInTheDocument();
    expect(mockStorage.removeItem).toHaveBeenCalledWith('auth_token');
    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
      type: 'auth_logout',
      success: true,
      totalTime: expect.any(Number)
    });
  });

  it('should restore session from storage', () => {
    const token = 'stored_token';
    const user = { id: 1, email: 'test@example.com' };
    mockStorage.getItem.mockReturnValueOnce(token);
    mockApi.validateToken.mockResolvedValueOnce({ user });

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByText(`Logged in as ${user.email}`)).toBeInTheDocument();
  });
}); 