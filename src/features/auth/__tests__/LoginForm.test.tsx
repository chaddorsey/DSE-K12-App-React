import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../LoginForm';
import { useAuth } from '../AuthContext';
import { usePerformanceMonitoring } from '../../../monitoring/hooks/useMonitoring';

jest.mock('../AuthContext');
jest.mock('../../../monitoring/hooks/useMonitoring');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockLogin = jest.fn();

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      logout: jest.fn(),
      user: null,
      isAuthenticated: false
    });
  });

  it('renders login form', () => {
    render(<LoginForm onSuccess={jest.fn()} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    const onSuccess = jest.fn();
    mockLogin.mockResolvedValueOnce(undefined);

    render(<LoginForm onSuccess={onSuccess} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('displays validation errors', async () => {
    render(<LoginForm onSuccess={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('handles login failure', async () => {
    const error = new Error('Invalid credentials');
    mockLogin.mockRejectedValueOnce(error);

    render(<LoginForm onSuccess={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrong' }
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it('tracks performance', () => {
    render(<LoginForm onSuccess={jest.fn()} />);
    expect(usePerformanceMonitoring).toHaveBeenCalledWith('LoginForm');
  });
}); 