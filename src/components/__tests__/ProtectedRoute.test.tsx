/**
 * Tests for ProtectedRoute component
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute';
import { AuthProvider } from '../../features/auth/AuthContext';
import { mockMonitoring } from '../../hooks/testing/mockMonitoring';

// Mock useAuth to control auth state in tests
jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({
    user: null,
    isLoading: false
  }))
}));

describe('ProtectedRoute', () => {
  const mockMonitors = mockMonitoring();
  const { useAuth } = require('../../hooks/useAuth');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const TestComponent = () => <div>Protected Content</div>;
  const LoginComponent = () => <div>Login Page</div>;

  const renderProtectedRoute = (isAuthenticated = false) => {
    // Mock localStorage
    if (isAuthenticated) {
      localStorage.setItem('auth_token', 'mock-token');
    } else {
      localStorage.clear();
    }

    return render(
      <MemoryRouter initialEntries={['/protected']}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <TestComponent />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );
  };

  it('renders protected content when authenticated', () => {
    renderProtectedRoute(true);
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    renderProtectedRoute(false);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('should handle role-based access', () => {
    useAuth.mockImplementation(() => ({
      user: { id: 1, email: 'test@example.com', roles: ['user'] },
      isLoading: false
    }));

    const { getByText } = render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/unauthorized" element={<div>Unauthorized</div>} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRoles={['admin']} redirectTo="/unauthorized">
                <TestComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText('Unauthorized')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    useAuth.mockImplementation(() => ({
      user: null,
      isLoading: true
    }));

    const { getByText } = render(
      <MemoryRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<TestComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should track access attempts', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(mockMonitors.trackInteraction).toHaveBeenCalledWith({
      type: 'route_access_attempt',
      success: false,
      metadata: {
        path: expect.any(String)
      }
    });
  });
}); 