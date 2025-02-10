import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../Logout';
import { useAuth } from '../../../features/auth/AuthContext';
import { usePerformanceMonitoring } from '../../../monitoring/hooks/useMonitoring';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

jest.mock('../../../features/auth/AuthContext');
jest.mock('../../../monitoring/hooks/useMonitoring');

describe('Logout', () => {
  const mockLogout = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ logout: mockLogout });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders logout button', () => {
    render(<Logout />);
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('calls logout and navigates to login page when clicked', async () => {
    render(<Logout />);
    const button = screen.getByRole('button', { name: /logout/i });
    
    fireEvent.click(button);
    
    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('tracks performance', () => {
    render(<Logout />);
    expect(usePerformanceMonitoring).toHaveBeenCalledWith('Logout');
  });
}); 