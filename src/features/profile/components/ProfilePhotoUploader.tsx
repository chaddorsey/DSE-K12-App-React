import React, { useState, useRef } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { PhotoUploadService } from '../services/PhotoUploadService';
import './ProfilePhotoUploader.css';

export const ProfilePhotoUploader: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadService = new PhotoUploadService();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('Current user:', user);
    console.log('Selected file:', file);
    if (!file || !user) return;

    try {
      setError(null);
      setIsUploading(true);
      uploadService.validateFile(file);
      
      console.log('Attempting upload for user:', user.uid);
      console.log('Using path:', `users/${user.uid}/profile.${file.name.split('.').pop()}`);
      const downloadURL = await uploadService.uploadPhoto(file, user.uid);
      console.log('Photo uploaded successfully, URL:', downloadURL);

      await updateProfile({
        photoURL: downloadURL
      });
      console.log('Profile updated with new photo URL');
    } catch (err) {
      console.error('Error in photo upload:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!user) return;
    
    try {
      await updateProfile({ photoURL: null });
      setShowRemoveConfirm(false);
    } catch (err) {
      console.error('Error removing photo:', err);
      setError('Failed to remove photo');
    }
  };

  const getInitials = () => {
    return user?.displayName
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  return (
    <div
      className="photo-uploader"
      data-testid="photo-uploader"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="photo-container">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="Profile photo" className="profile-photo" />
        ) : (
          <div className="photo-placeholder">{getInitials()}</div>
        )}

        {isHovered && !isUploading && !showRemoveConfirm && (
          <div className="upload-overlay">
            <button onClick={() => fileInputRef.current?.click()}>
              Change Photo
            </button>
            {user?.photoURL && (
              <button 
                className="remove-button"
                onClick={() => setShowRemoveConfirm(true)}
              >
                Remove Photo
              </button>
            )}
          </div>
        )}

        {isUploading && (
          <div className="upload-overlay">
            <div className="spinner" role="progressbar" />
            <span>Uploading...</span>
          </div>
        )}

        {showRemoveConfirm && (
          <div className="upload-overlay">
            <p>Are you sure?</p>
            <div className="confirm-buttons">
              <button onClick={handleRemovePhoto}>Yes, remove</button>
              <button onClick={() => setShowRemoveConfirm(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        data-testid="photo-input"
      />

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}; 