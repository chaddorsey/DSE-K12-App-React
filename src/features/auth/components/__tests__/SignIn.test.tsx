import React from 'react';
import { render, screen, waitFor } from '@/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { SignIn } from '../SignIn';
import { useAuth } from '../../context/AuthContext';

// Mock useAuth hook
jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn()
}));

describe('SignIn', () => {
  const mockSignIn = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      loading: false,
      error: null
    });
  });

  it('renders sign in form', () => {
    render(<SignIn />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('handles successful sign in', async () => {
    mockSignIn.mockResolvedValueOnce(undefined);
    render(<SignIn />);

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('displays validation errors for invalid input', async () => {
    render(<SignIn />);

    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('displays error message on sign in failure', async () => {
    const error = new Error('Invalid credentials');
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      loading: false,
      error
    });

    render(<SignIn />);

    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it('shows loading state during sign in', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      loading: true,
      error: null
    });

    render(<SignIn />);

    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('provides password reset link', () => {
    render(<SignIn />);
    
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });
}); 