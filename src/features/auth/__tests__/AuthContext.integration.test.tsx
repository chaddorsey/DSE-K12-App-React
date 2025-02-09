import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { act } from 'react-dom/test-utils';

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

describe('AuthContext Integration', () => {
  it('works within error boundary', () => {
    render(
      <ErrorBoundary>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('auth-status')).toBeInTheDocument();
  });

  it('handles errors gracefully', () => {
    const ErrorComponent = () => {
      const { login } = useAuth();
      React.useEffect(() => {
        login('test@example.com', 'password').catch(() => {});
      }, [login]);
      return null;
    };

    render(
      <ErrorBoundary>
        <AuthProvider>
          <ErrorComponent />
        </AuthProvider>
      </ErrorBoundary>
    );

    expect(screen.getByText(/Not implemented/i)).toBeInTheDocument();
  });

  it('persists authentication state', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      role: 'user' as const
    };

    render(
      <ErrorBoundary>
        <AuthProvider initialUser={mockUser}>
          <TestComponent />
        </AuthProvider>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    expect(localStorage.getItem('auth_token')).toBe(null);
  });

  it('clears token on logout', async () => {
    localStorage.setItem('auth_token', 'test-token');
    
    render(
      <ErrorBoundary>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </ErrorBoundary>
    );

    const { logout } = useAuth();
    await act(async () => {
      await logout();
    });

    expect(localStorage.getItem('auth_token')).toBeNull();
  });
}); 