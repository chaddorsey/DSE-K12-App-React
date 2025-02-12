import { render, screen } from '@testing-library/react';
import { EmailVerification } from '../EmailVerification';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn()
}));

describe('EmailVerification', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  it('redirects to login if no user', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    
    render(<EmailVerification />);
    
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('displays verification instructions with user email', () => {
    const mockUser = {
      email: 'test@example.com'
    };
    
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    
    render(<EmailVerification />);
    
    expect(screen.getByText(/verify your email/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/)).toBeInTheDocument();
  });

  it('shows emulator instructions in development', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    
    const mockUser = { email: 'test@example.com' };
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    
    render(<EmailVerification />);
    
    expect(screen.getByText(/localhost:9099\/auth/)).toBeInTheDocument();
    
    process.env.NODE_ENV = originalEnv;
  });
}); 