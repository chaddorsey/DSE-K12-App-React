import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { SignIn } from '../components/SignIn';
import { RegistrationForm } from '../components/RegistrationForm';
import { ProfileSettings } from '../components/ProfileSettings';
import { findKnownUser } from '@/utils/known-users';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

// Mock all dependencies
jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('@/utils/known-users');
jest.mock('firebase/storage');

describe('Authentication Flow', () => {
  const mockKnownUser = {
    email: 'homer@springfield.com',
    displayName: 'Homer Simpson',
    role: 'user',
    organization: 'Nuclear Plant',
    image: 'homer.png',
    photoURL: '/assets/avatars/homer.png'
  };

  const mockFirebaseUser = {
    uid: 'test-uid',
    email: mockKnownUser.email,
    displayName: mockKnownUser.displayName,
    emailVerified: false,
    photoURL: mockKnownUser.photoURL
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (findKnownUser as jest.Mock).mockResolvedValue(mockKnownUser);
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: mockFirebaseUser });
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: mockFirebaseUser });
    (sendEmailVerification as jest.Mock).mockResolvedValue(undefined);
    (setDoc as jest.Mock).mockResolvedValue(undefined);
  });

  it('allows known users to register with email verification', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <RegistrationForm />
        </AuthProvider>
      </MemoryRouter>
    );

    // Fill registration form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockKnownUser.email }
    });
    fireEvent.change(screen.getByLabelText(/confirm email/i), {
      target: { value: mockKnownUser.email }
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'Password123!' }
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'Password123!' }
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      // Verify user creation
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        mockKnownUser.email,
        'Password123!'
      );

      // Verify profile update
      expect(updateProfile).toHaveBeenCalledWith(
        mockFirebaseUser,
        expect.objectContaining({
          displayName: mockKnownUser.displayName,
          photoURL: mockKnownUser.photoURL
        })
      );

      // Verify Firestore document creation
      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          email: mockKnownUser.email,
          displayName: mockKnownUser.displayName,
          photoURL: mockKnownUser.photoURL,
          role: mockKnownUser.role
        })
      );

      // Verify email verification sent
      expect(sendEmailVerification).toHaveBeenCalled();
    });
  });

  it('prevents registration with unknown email', async () => {
    (findKnownUser as jest.Mock).mockResolvedValue(null);

    render(
      <MemoryRouter>
        <AuthProvider>
          <RegistrationForm />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'unknown@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123!' }
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/email not found in authorized users list/i)).toBeInTheDocument();
      expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
    });
  });

  it('handles profile photo upload in settings', async () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const mockDownloadURL = 'https://example.com/photo.png';

    render(
      <MemoryRouter>
        <AuthProvider>
          <ProfileSettings />
        </AuthProvider>
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/choose profile photo/i);
    fireEvent.change(input, { target: { files: [mockFile] } });

    await waitFor(() => {
      expect(updateDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          photoURL: mockDownloadURL
        })
      );
    });
  });

  it('handles password reset flow', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </MemoryRouter>
    );

    // Click forgot password link
    fireEvent.click(screen.getByText(/forgot password/i));

    // Fill in email
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockKnownUser.email }
    });

    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(
        expect.anything(),
        mockKnownUser.email
      );
    });
  });

  it('completes email verification flow', async () => {
    const verifiedUser = { ...mockFirebaseUser, emailVerified: true };
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: verifiedUser });

    render(
      <MemoryRouter>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockKnownUser.email }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123!' }
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(updateDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          emailVerified: true
        })
      );
    });
  });

  it('handles registration errors gracefully', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
      new Error('Auth error')
    );

    render(
      <MemoryRouter>
        <AuthProvider>
          <RegistrationForm />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockKnownUser.email }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123!' }
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/auth error/i)).toBeInTheDocument();
    });
  });

  // Add more test cases for:
  // - Password reset flow
  // - Email verification completion
  // - Profile updates
  // - Error scenarios
}); 