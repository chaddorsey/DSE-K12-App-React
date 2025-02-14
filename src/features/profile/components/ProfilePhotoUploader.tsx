import React, { useState, useRef } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { PhotoUploadService } from '../services/PhotoUploadService';
import { Avatar } from '@/components/Avatar';
import './ProfilePhotoUploader.css';

export const ProfilePhotoUploader: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoService = new PhotoUploadService();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?.uid) return;

    setUploading(true);
    setError(null);
    let uploadedPhotoURL: string | null = null;

    try {
      // First upload the photo
      uploadedPhotoURL = await photoService.uploadPhoto(user.uid, file);
      console.log('Photo uploaded successfully:', uploadedPhotoURL);
      
      // Then update the user profile with just the photoURL
      await updateUserProfile({ photoURL: uploadedPhotoURL });
      console.log('Profile updated with new photo');
      
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Photo upload/update error:', err);
      
      // If we uploaded the photo but failed to update the profile, clean up
      if (uploadedPhotoURL && err instanceof Error && err.message === 'Failed to update profile') {
        try {
          await photoService.removePhoto(user.uid);
          console.log('Cleaned up uploaded photo after failed profile update');
        } catch (cleanupErr) {
          console.error('Failed to clean up uploaded photo:', cleanupErr);
        }
      }
      
      setError(err instanceof Error ? err.message : 'Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!user?.uid) return;
    
    setUploading(true);
    setError(null);

    try {
      await photoService.removePhoto(user.uid);
      // Update user profile to remove photo URL
      await updateUserProfile({ photoURL: null });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove photo');
      console.error('Photo removal error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="photo-uploader">
      <div className="avatar-container">
        <Avatar 
          src={user?.photoURL} 
          alt={user?.displayName || user?.email || 'User'} 
          size="large"
        />
        {uploading && <div className="upload-overlay">Uploading...</div>}
      </div>
      
      <div className="controls">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="file-input"
        />
        
        {user?.photoURL && (
          <button
            onClick={handleRemovePhoto}
            disabled={uploading}
            className="remove-photo"
          >
            Remove Photo
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}; 