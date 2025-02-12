import { render, screen, act } from '@testing-library/react';
import { FirebaseConnectionStatus } from './FirebaseConnectionStatus';
import { testFirestoreConnection } from '../config/firebase';
import { AuthProvider } from '../features/auth/context/AuthContext';

// Mock Firebase config
jest.mock('../config/firebase', () => ({
  testFirestoreConnection: jest.fn()
}));

describe('FirebaseConnectionStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows success status when connection test passes', async () => {
    (testFirestoreConnection as jest.Mock).mockResolvedValue(true);

    render(
      <AuthProvider>
        <FirebaseConnectionStatus />
      </AuthProvider>
    );

    // Wait for async connection test
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Firebase:')).toBeInTheDocument();
    expect(screen.getByText('●')).toHaveClass('text-emerald-500');
  });

  it('shows error status when connection test fails', async () => {
    (testFirestoreConnection as jest.Mock).mockResolvedValue(false);

    render(
      <AuthProvider>
        <FirebaseConnectionStatus />
      </AuthProvider>
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Firebase:')).toBeInTheDocument();
    expect(screen.getByText('○')).toHaveClass('text-red-500');
  });

  it('shows nothing while testing', () => {
    (testFirestoreConnection as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(true), 1000))
    );

    render(
      <AuthProvider>
        <FirebaseConnectionStatus />
      </AuthProvider>
    );

    expect(screen.queryByText('Firebase:')).not.toBeInTheDocument();
  });
}); 