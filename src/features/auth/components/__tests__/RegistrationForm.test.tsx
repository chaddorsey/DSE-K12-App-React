import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegistrationForm } from '../RegistrationForm';
import { authService } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

jest.mock('../../services/AuthService', () => ({
  authService: {
    signUp: jest.fn(),
    sendVerificationEmail: jest.fn()
  }
}));

describe('RegistrationForm', () => {
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  it('renders registration form fields', () => {
    render(<RegistrationForm />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/display name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<RegistrationForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      expect(screen.getByText(/display name is required/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(<RegistrationForm />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' }
    });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it('validates password requirements', async () => {
    render(<RegistrationForm />);
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'short' }
    });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
    });
  });

  it('submits valid registration data', async () => {
    const mockUser = {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User'
    };
    
    (authService.signUp as jest.Mock).mockResolvedValueOnce(mockUser);
    
    render(<RegistrationForm />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByLabelText(/display name/i), {
      target: { value: 'Test User' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(authService.signUp).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
        'Test User'
      );
      expect(authService.sendVerificationEmail).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/verify-email');
    });
  });

  it('displays error message on registration failure', async () => {
    const error = new Error('Registration failed');
    (authService.signUp as jest.Mock).mockRejectedValueOnce(error);
    
    render(<RegistrationForm />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByLabelText(/display name/i), {
      target: { value: 'Test User' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/registration failed/i)).toBeInTheDocument();
    });
  });
}); 