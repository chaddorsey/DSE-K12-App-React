import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProfilePhotoUploader } from '../ProfilePhotoUploader';
import { PhotoUploadService } from '../../services/PhotoUploadService';
import { useAuth } from '@/features/auth/context/AuthContext';

jest.mock('@/features/auth/context/AuthContext');
jest.mock('../../services/PhotoUploadService');

describe('ProfilePhotoUploader', () => {
  const mockUser = {
    uid: 'test-user-123',
    photoURL: 'https://example.com/photo.jpg',
    displayName: 'Test User'
  };

  const mockUploadService = {
    uploadPhoto: jest.fn(),
    validateFile: jest.fn()
  };

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    (PhotoUploadService as jest.Mock).mockImplementation(() => mockUploadService);
  });

  it('renders current user photo if available', () => {
    render(<ProfilePhotoUploader />);
    
    const img = screen.getByAltText('Profile photo') as HTMLImageElement;
    expect(img.src).toBe(mockUser.photoURL);
  });

  it('renders placeholder when no photo is available', () => {
    (useAuth as jest.Mock).mockReturnValue({ 
      user: { ...mockUser, photoURL: null } 
    });

    render(<ProfilePhotoUploader />);
    
    expect(screen.getByText('TU')).toBeInTheDocument(); // Initials
  });

  it('shows upload overlay on hover', async () => {
    render(<ProfilePhotoUploader />);
    
    const container = screen.getByTestId('photo-uploader');
    fireEvent.mouseEnter(container);
    
    expect(screen.getByText('Change Photo')).toBeInTheDocument();
  });

  it('handles file selection', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    mockUploadService.uploadPhoto.mockResolvedValue('https://example.com/new-photo.jpg');

    render(<ProfilePhotoUploader />);
    
    const input = screen.getByTestId('photo-input');
    await userEvent.upload(input, file);

    expect(screen.getByText('Uploading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUploadService.uploadPhoto).toHaveBeenCalledWith(file, mockUser.uid);
    });
  });

  it('shows error message on upload failure', async () => {
    mockUploadService.uploadPhoto.mockRejectedValue(new Error('Upload failed'));
    
    render(<ProfilePhotoUploader />);
    
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByTestId('photo-input');
    await userEvent.upload(input, file);

    await waitFor(() => {
      expect(screen.getByText('Upload failed')).toBeInTheDocument();
    });
  });

  it('validates files before upload', async () => {
    const invalidFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    mockUploadService.validateFile.mockImplementation(() => {
      throw new Error('Invalid file type');
    });

    render(<ProfilePhotoUploader />);
    
    const input = screen.getByTestId('photo-input');
    await userEvent.upload(input, invalidFile);

    expect(screen.getByText('Invalid file type')).toBeInTheDocument();
    expect(mockUploadService.uploadPhoto).not.toHaveBeenCalled();
  });

  it('shows loading state during upload', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    let resolveUpload: (value: string) => void;
    mockUploadService.uploadPhoto.mockImplementation(
      () => new Promise(resolve => { resolveUpload = resolve; })
    );

    render(<ProfilePhotoUploader />);
    
    const input = screen.getByTestId('photo-input');
    await userEvent.upload(input, file);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    resolveUpload('https://example.com/new-photo.jpg');
    
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  it('allows photo removal', async () => {
    const mockUpdateProfile = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ 
      user: mockUser,
      updateProfile: mockUpdateProfile 
    });

    render(<ProfilePhotoUploader />);
    
    const removeButton = screen.getByText('Remove Photo');
    await userEvent.click(removeButton);

    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Yes, remove'));

    expect(mockUpdateProfile).toHaveBeenCalledWith({ photoURL: null });
  });
}); 