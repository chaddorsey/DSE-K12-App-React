import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute';
import { AuthProvider } from '../AuthContext';
import { ErrorBoundary } from '../../../components/ErrorBoundary';

const TestComponent = () => <div>Protected Content</div>;
const LoginComponent = () => <div>Login Page</div>;
const UnauthorizedComponent = () => <div>Unauthorized</div>;

describe('ProtectedRoute Integration', () => {
  it('works with error boundary', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      role: 'admin' as const
    };

    render(
      <ErrorBoundary>
        <MemoryRouter>
          <AuthProvider initialUser={mockUser}>
            <ProtectedRoute>
              <TestComponent />
            </ProtectedRoute>
          </AuthProvider>
        </MemoryRouter>
      </ErrorBoundary>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('handles role-based access with error boundary', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      role: 'user' as const
    };

    render(
      <ErrorBoundary>
        <MemoryRouter initialEntries={['/admin']}>
          <AuthProvider initialUser={mockUser}>
            <Routes>
              <Route path="/unauthorized" element={<UnauthorizedComponent />} />
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
      </ErrorBoundary>
    );

    expect(screen.getByText('Unauthorized')).toBeInTheDocument();
  });
}); 