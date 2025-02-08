import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { MonitoringService } from '../../../monitoring/MonitoringService';
import type { AuthState } from '../../../providers/types';

// Mock monitoring service
jest.mock('../../../monitoring/MonitoringService', () => ({
  MonitoringService: {
    getInstance: jest.fn(() => ({
      trackStateTransition: jest.fn(),
      trackError: jest.fn()
    }))
  }
}));

const mockUser: NonNullable<AuthState['user']> = {
  id: '1',
  email: 'test@test.com',
  roles: ['user']
};

const mockAuthState: AuthState = {
  isAuthenticated: true,
  user: mockUser
};

const TestComponent: React.FC = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  
  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </div>
      {user && <div data-testid="user-email">{user.email}</div>}
      <button onClick={() => login({ email: 'test@test.com', password: 'password' })}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthProvider', () => {
  const mockMonitoring = MonitoringService.getInstance();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides initial unauthenticated state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    expect(screen.queryByTestId('user-email')).not.toBeInTheDocument();
  });

  it('handles login success', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Login'));
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    expect(screen.getByTestId('user-email')).toHaveTextContent('test@test.com');
    expect(mockMonitoring.trackStateTransition).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'unauthenticated',
        to: 'authenticating',
        component: 'AuthProvider',
        metadata: { email: 'test@test.com' }
      })
    );
    expect(mockMonitoring.trackStateTransition).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'authenticating',
        to: 'authenticated',
        success: true,
        component: 'AuthProvider',
        duration: expect.any(Number)
      })
    );
  });

  it('handles logout', async () => {
    render(
      <AuthProvider initialState={mockAuthState}>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user-email')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText('Logout'));
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    expect(screen.queryByTestId('user-email')).not.toBeInTheDocument();
    expect(mockMonitoring.trackStateTransition).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'authenticated',
        to: 'unauthenticating',
        component: 'AuthProvider'
      })
    );
    expect(mockMonitoring.trackStateTransition).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'unauthenticating',
        to: 'unauthenticated',
        success: true,
        component: 'AuthProvider',
        duration: expect.any(Number)
      })
    );
  });

  it('maintains auth state across rerenders', () => {
    const { rerender } = render(
      <AuthProvider initialState={mockAuthState}>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    expect(screen.getByTestId('user-email')).toHaveTextContent(mockUser.email);

    rerender(
      <AuthProvider initialState={mockAuthState}>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    expect(screen.getByTestId('user-email')).toHaveTextContent(mockUser.email);
  });

  it('throws error when useAuth is used outside provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuth must be used within AuthProvider');

    consoleError.mockRestore();
  });
}); 