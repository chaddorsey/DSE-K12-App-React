import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProfileSettings } from '../ProfileSettings';
import { useAuth } from '../../context/AuthContext';
import { storage, db } from '@/config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

// Mock dependencies
jest.mock('../../context/AuthContext');
jest.mock('firebase/storage');
jest.mock('firebase/auth');
jest.mock('firebase/firestore');

const mockUser = {
  uid: 'test-uid',
  email: 'homer@springfield.com',
  displayName: 'Homer Simpson',
  photoURL: '/assets/avatars/homer.png',
  emailVerified: true,
  role: 'user'
};

describe('ProfileSettings', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      signOut: jest.fn()
    });
  });

  it('displays user information correctly', () => {
    render(<ProfileSettings />);
    
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.displayName)).toBeInTheDocument();
    expect(screen.getByText('Verified')).toBeInTheDocument();
    expect(screen.getByText(mockUser.role)).toBeInTheDocument();
  });

  it('handles photo upload successfully', async () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const mockDownloadURL = 'https://example.com/photo.png';

    // Mock storage functions
    (ref as jest.Mock).mockReturnValue('storage-ref');
    (uploadBytes as jest.Mock).mockResolvedValue({});
    (getDownloadURL as jest.Mock).mockResolvedValue(mockDownloadURL);
    (updateProfile as jest.Mock).mockResolvedValue({});
    (updateDoc as jest.Mock).mockResolvedValue({});

    render(<ProfileSettings />);

    const input = screen.getByLabelText(/choose profile photo/i);
    fireEvent.change(input, { target: { files: [mockFile] } });

    await waitFor(() => {
      expect(uploadBytes).toHaveBeenCalledWith('storage-ref', mockFile);
      expect(updateProfile).toHaveBeenCalledWith(mockUser, { photoURL: mockDownloadURL });
      expect(updateDoc).toHaveBeenCalled();
    });
  });

  it('handles upload errors', async () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    (uploadBytes as jest.Mock).mockRejectedValue(new Error('Upload failed'));

    render(<ProfileSettings />);

    const input = screen.getByLabelText(/choose profile photo/i);
    fireEvent.change(input, { target: { files: [mockFile] } });

    await waitFor(() => {
      expect(screen.getByText(/failed to upload photo/i)).toBeInTheDocument();
    });
  });
}); 