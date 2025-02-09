import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute';
import { AuthProvider } from '../AuthContext';
import { usePerformanceMonitoring } from '../../../monitoring/hooks/useMonitoring';

jest.mock('../../../monitoring/hooks/useMonitoring');

const TestComponent = () => <div>Protected Content</div>;
const LoginComponent = () => <div>Login Page</div>;

describe('ProtectedRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders protected content when authenticated', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      role: 'user' as const
    };

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <AuthProvider initialUser={mockUser}>
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

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    render(
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

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('enforces role requirements', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      role: 'user' as const
    };

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <AuthProvider initialUser={mockUser}>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <TestComponent />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('tracks performance', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      role: 'admin' as const
    };

    render(
      <MemoryRouter>
        <AuthProvider initialUser={mockUser}>
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(usePerformanceMonitoring).toHaveBeenCalledWith('ProtectedRoute');
  });
}); 