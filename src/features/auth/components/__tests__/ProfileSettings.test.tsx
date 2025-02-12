import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileSettings } from '../ProfileSettings';
import { useAuth } from '../../context/AuthContext';

jest.mock('../../context/AuthContext');

describe('ProfileSettings', () => {
  const mockSignOut = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when user is not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    const { container } = render(<ProfileSettings />);
    expect(container).toBeEmptyDOMElement();
  });

  it('displays user information correctly', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        displayName: 'Test User',
        email: 'test@example.com',
        emailVerified: true,
        role: 'user'
      },
      signOut: mockSignOut
    });

    render(<ProfileSettings />);
    
    const avatar = screen.getByAltText('Avatar for Test User');
    expect(avatar).toHaveClass(
      'ring-2',
      'ring-white',
      'ring-offset-1',
      'ring-offset-indigo-100'
    );
    expect(avatar.closest('div')).toHaveClass('w-4', 'h-4');
    
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Verified')).toBeInTheDocument();
    expect(screen.getByText('user')).toBeInTheDocument();
  });

  it('shows verification status and resend button for unverified email', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        displayName: 'Test User',
        email: 'test@example.com',
        emailVerified: false,
        role: 'user'
      },
      signOut: mockSignOut
    });

    render(<ProfileSettings />);
    
    expect(screen.getByText('Not verified')).toBeInTheDocument();
    expect(screen.getByText('Resend verification')).toBeInTheDocument();
  });

  it('calls signOut when sign out button is clicked', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        displayName: 'Test User',
        email: 'test@example.com',
        emailVerified: true,
        role: 'user'
      },
      signOut: mockSignOut
    });

    render(<ProfileSettings />);
    fireEvent.click(screen.getByText('Sign Out'));
    expect(mockSignOut).toHaveBeenCalled();
  });

  it('uses email as display name when displayName is not available', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        displayName: null,
        email: 'test@example.com',
        emailVerified: true,
        role: 'user'
      },
      signOut: mockSignOut
    });

    render(<ProfileSettings />);
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  it('maintains compact layout with small avatar', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        displayName: 'Test User',
        email: 'test@example.com',
        emailVerified: true,
        role: 'user'
      },
      signOut: mockSignOut
    });

    render(<ProfileSettings />);
    
    const container = screen.getByAltText('Avatar for Test User').closest('.flex');
    expect(container).toHaveClass('space-x-3');
  });
}); 