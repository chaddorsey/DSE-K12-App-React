import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProfileSettings } from '../ProfileSettings';
import { useAuth } from '../../context/AuthContext';
import { PhotoUploadService } from '@/features/profile/services/PhotoUploadService';
import { doc, updateDoc } from 'firebase/firestore';

// Mock dependencies
jest.mock('../../context/AuthContext');
jest.mock('@/features/profile/services/PhotoUploadService');
jest.mock('firebase/firestore');

describe('ProfileSettings', () => {
  const mockUser = {
    uid: 'test-uid',
    email: 'test@example.com',
    displayName: 'Test User',
    photoURL: 'https://example.com/photo.jpg',
    emailVerified: false,
    role: 'user'
  };

  const mockUpdateProfile = jest.fn();
  const mockSignOut = jest.fn();
  const mockRefreshUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      updateProfile: mockUpdateProfile,
      signOut: mockSignOut,
      refreshUser: mockRefreshUser
    });
  });

  it('handles successful photo upload', async () => {
    const mockPhotoURL = 'https://example.com/new-photo.jpg';
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    // Mock successful upload
    (PhotoUploadService.prototype.uploadPhoto as jest.Mock)
      .mockResolvedValue(mockPhotoURL);

    render(<ProfileSettings />);

    // Trigger file upload
    const input = screen.getByLabelText(/choose profile photo/i);
    fireEvent.change(input, { target: { files: [mockFile] } });

    // Verify loading state
    expect(screen.getByText(/uploading/i)).toBeInTheDocument();

    await waitFor(() => {
      // Verify all updates were called
      expect(PhotoUploadService.prototype.uploadPhoto)
        .toHaveBeenCalledWith(mockFile, mockUser.uid);
      expect(mockUpdateProfile).toHaveBeenCalledWith({ photoURL: mockPhotoURL });
      expect(updateDoc).toHaveBeenCalled();
      expect(mockRefreshUser).toHaveBeenCalled();
    });

    // Verify loading state is removed
    expect(screen.queryByText(/uploading/i)).not.toBeInTheDocument();
  });

  it('handles upload errors', async () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const mockError = new Error('Upload failed');
    
    (PhotoUploadService.prototype.uploadPhoto as jest.Mock)
      .mockRejectedValue(mockError);

    render(<ProfileSettings />);

    const input = screen.getByLabelText(/choose profile photo/i);
    fireEvent.change(input, { target: { files: [mockFile] } });

    await waitFor(() => {
      expect(screen.getByText(/failed to upload photo/i)).toBeInTheDocument();
    });
  });
}); 