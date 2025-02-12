import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserProfileButton } from '../UserProfileButton';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Mock the hooks
jest.mock('../../context/AuthContext');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('UserProfileButton', () => {
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders nothing when user is not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    const { container } = render(<UserProfileButton />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders avatar with user info when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        displayName: 'Test User',
        email: 'test@example.com',
        emailVerified: true
      }
    });

    render(<UserProfileButton />);
    expect(screen.getByAltText('Avatar for Test User')).toBeInTheDocument();
  });

  it('shows verification indicator when email is not verified', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        displayName: 'Test User',
        email: 'test@example.com',
        emailVerified: false
      }
    });

    render(<UserProfileButton />);
    expect(screen.getByLabelText('User profile settings')).toContainElement(
      document.querySelector('.bg-red-500')!
    );
  });

  it('navigates to profile page on click', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        displayName: 'Test User',
        email: 'test@example.com'
      }
    });

    render(<UserProfileButton />);
    fireEvent.click(screen.getByLabelText('User profile settings'));
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });
}); 