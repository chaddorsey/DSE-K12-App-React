import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { RoleBasedRoute } from '../components/RoleBasedRoute';
import { AuthProvider } from '../AuthContext';
import { UserRole } from '../types/auth';

const mockUser = {
  uid: 'test-uid',
  email: 'test@example.com',
  role: 'user' as UserRole,
  emailVerified: true
};

jest.mock('../AuthContext', () => ({
  ...jest.requireActual('../AuthContext'),
  useAuth: () => ({
    user: mockUser,
    initialLoadComplete: true
  })
}));

describe('RoleBasedRoute', () => {
  const renderWithRouter = (
    role: UserRole,
    path: string,
    element: React.ReactNode
  ) => {
    mockUser.role = role;
    return render(
      <AuthProvider>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route
              path={path}
              element={
                <RoleBasedRoute path={path}>
                  {element}
                </RoleBasedRoute>
              }
            />
            <Route path="/unauthorized" element={<div>Unauthorized</div>} />
            <Route path="/login" element={<div>Login</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );
  };

  it('should allow access to authorized roles', () => {
    renderWithRouter('admin', '/admin-page', <div>Admin Content</div>);
    expect(screen.getByText('Admin Content')).toBeInTheDocument();
  });

  it('should redirect unauthorized roles', () => {
    renderWithRouter('user', '/admin-page', <div>Admin Content</div>);
    expect(screen.getByText('Unauthorized')).toBeInTheDocument();
  });

  it('should handle verification requirements', () => {
    mockUser.emailVerified = false;
    renderWithRouter('user', '/profile', <div>Profile Content</div>);
    expect(screen.getByText('Please verify your email')).toBeInTheDocument();
  });
}); 