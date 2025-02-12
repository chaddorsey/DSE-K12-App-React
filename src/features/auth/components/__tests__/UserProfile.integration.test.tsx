import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ProfileSettings } from '../ProfileSettings';
import { useAuth } from '../../context/AuthContext';
import { AuthProvider } from '../../context/AuthContext';

// Mock the auth hook
jest.mock('../../context/AuthContext');

const mockUser = {
  uid: '123',
  displayName: 'Test User',
  email: 'test@example.com',
  emailVerified: true,
  role: 'user',
  photoURL: null,
  createdAt: new Date(),
  lastLoginAt: new Date()
};

const renderWithRouter = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/" element={<Header links={[]} />} />
        <Route path="/profile" element={<ProfileSettings />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('User Profile Integration', () => {
  const mockSignOut = jest.fn();
  const mockSendVerificationEmail = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      signOut: mockSignOut,
      sendVerificationEmail: mockSendVerificationEmail,
      loading: false,
      error: null
    });
  });

  it('navigates from header avatar to profile page', async () => {
    renderWithRouter();

    // Find and click the profile button in header
    const profileButton = screen.getByLabelText('User profile settings');
    expect(profileButton).toBeInTheDocument();
    
    fireEvent.click(profileButton);

    // Verify profile page content is shown
    await waitFor(() => {
      expect(screen.getByText(mockUser.displayName)).toBeInTheDocument();
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
      expect(screen.getByText(mockUser.role)).toBeInTheDocument();
    });
  });

  it('shows verification status correctly in both header and profile', () => {
    // Mock unverified user
    (useAuth as jest.Mock).mockReturnValue({
      user: { ...mockUser, emailVerified: false },
      signOut: mockSignOut,
      sendVerificationEmail: mockSendVerificationEmail
    });

    renderWithRouter();

    // Check verification indicator in header
    const profileButton = screen.getByLabelText('User profile settings');
    expect(profileButton).toContainElement(
      document.querySelector('.bg-red-500')!
    );

    // Navigate to profile
    fireEvent.click(profileButton);

    // Check verification status in profile
    expect(screen.getByText('Not verified')).toBeInTheDocument();
    expect(screen.getByText('Resend verification')).toBeInTheDocument();
  });

  it('handles sign out flow from profile page', async () => {
    renderWithRouter('/profile');

    // Find and click sign out button
    const signOutButton = screen.getByText('Sign Out');
    fireEvent.click(signOutButton);

    // Verify sign out was called
    expect(mockSignOut).toHaveBeenCalled();
  });

  it('shows default avatar when no photo URL is provided', () => {
    renderWithRouter();

    const avatar = screen.getByAltText('Avatar for Test User');
    expect(avatar.getAttribute('src')).toContain('ui-avatars.com');
  });

  it('shows custom avatar when photo URL is provided', () => {
    const photoURL = 'https://example.com/avatar.jpg';
    (useAuth as jest.Mock).mockReturnValue({
      user: { ...mockUser, photoURL },
      signOut: mockSignOut
    });

    renderWithRouter();

    const avatar = screen.getByAltText('Avatar for Test User');
    expect(avatar.getAttribute('src')).toBe(photoURL);
  });

  it('handles resend verification email', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { ...mockUser, emailVerified: false },
      signOut: mockSignOut,
      sendVerificationEmail: mockSendVerificationEmail
    });

    renderWithRouter('/profile');

    const resendButton = screen.getByText('Resend verification');
    fireEvent.click(resendButton);

    await waitFor(() => {
      expect(mockSendVerificationEmail).toHaveBeenCalled();
    });
  });

  it('shows loading state while fetching user data', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: true,
      error: null,
      signOut: mockSignOut
    });

    renderWithRouter();

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('handles error states gracefully', () => {
    const error = new Error('Failed to load user data');
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
      error,
      signOut: mockSignOut
    });

    renderWithRouter('/profile');

    expect(screen.getByText(/failed to load user data/i)).toBeInTheDocument();
  });

  // Test accessibility
  it('maintains focus management during navigation', () => {
    renderWithRouter();

    const profileButton = screen.getByLabelText('User profile settings');
    fireEvent.click(profileButton);

    // Verify focus moves to the main heading of the profile page
    expect(document.activeElement).toBe(
      screen.getByRole('heading', { name: mockUser.displayName })
    );
  });
}); 