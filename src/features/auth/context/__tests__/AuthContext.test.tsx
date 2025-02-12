import React from 'react';
import { render, screen, act, waitFor } from '@/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../AuthContext';
import { authService } from '../../services/AuthService';
import { IUser } from '../../types/auth';
import { auth } from '@/config/firebase';

// Mock the auth service
jest.mock('../../services/AuthService');

jest.mock('@/config/firebase', () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: jest.fn(),
    reload: jest.fn()
  }
}));

const mockUser: IUser = {
  uid: 'test-uid',
  email: 'test@example.com',
  displayName: 'Test User',
  emailVerified: true,
  createdAt: new Date(),
  lastLoginAt: new Date(),
  role: 'student',
  photoURL: null
};

// Test component that uses the auth context
const TestComponent = () => {
  const { user, loading, error, signIn, signOut } = useAuth();
  
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {user && <div>User: {user.email}</div>}
      <button onClick={() => signIn('test@example.com', 'password')}>Sign In</button>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides initial auth state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('handles successful sign in', async () => {
    (authService.signIn as jest.Mock).mockResolvedValueOnce(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const signInButton = screen.getByText('Sign In');
    await act(async () => {
      await userEvent.click(signInButton);
    });

    await waitFor(() => {
      expect(screen.getByText(`User: ${mockUser.email}`)).toBeInTheDocument();
    });
  });

  it('handles sign in error', async () => {
    const error = new Error('Invalid credentials');
    (authService.signIn as jest.Mock).mockRejectedValueOnce(error);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const signInButton = screen.getByText('Sign In');
    await act(async () => {
      await userEvent.click(signInButton);
    });

    await waitFor(() => {
      expect(screen.getByText(`Error: ${error.message}`)).toBeInTheDocument();
    });
  });

  it('handles sign out', async () => {
    (authService.signOut as jest.Mock).mockResolvedValueOnce(undefined);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const signOutButton = screen.getByText('Sign Out');
    await act(async () => {
      await userEvent.click(signOutButton);
    });

    await waitFor(() => {
      expect(screen.queryByText(/User:/)).not.toBeInTheDocument();
    });
  });

  it('initializes auth state from Firebase', async () => {
    // Mock Firebase auth state change
    const mockOnAuthStateChanged = jest.fn();
    jest.mock('firebase/auth', () => ({
      ...jest.requireActual('firebase/auth'),
      onAuthStateChanged: (auth: any, callback: any) => {
        mockOnAuthStateChanged(callback);
        callback(mockUser);
        return () => {};
      }
    }));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(mockOnAuthStateChanged).toHaveBeenCalled();
      expect(screen.getByText(`User: ${mockUser.email}`)).toBeInTheDocument();
    });
  });

  describe('refreshUser', () => {
    it('reloads user data when user is authenticated', async () => {
      const mockUser = {
        uid: 'test-uid',
        reload: jest.fn()
      };
      (auth.currentUser as any) = mockUser;

      const TestComponent = () => {
        const { refreshUser } = useAuth();
        React.useEffect(() => {
          refreshUser();
        }, [refreshUser]);
        return null;
      };

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(mockUser.reload).toHaveBeenCalled();
      });
    });

    it('does nothing when no user is authenticated', async () => {
      (auth.currentUser as any) = null;
      const mockReload = jest.fn();
      auth.reload = mockReload;

      const TestComponent = () => {
        const { refreshUser } = useAuth();
        React.useEffect(() => {
          refreshUser();
        }, [refreshUser]);
        return null;
      };

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(mockReload).not.toHaveBeenCalled();
      });
    });
  });
}); 