import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '@/components/Avatar';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { PhotoUploadService } from '@/features/profile/services/PhotoUploadService';

export const ProfileSettings: React.FC = () => {
  const { user, signOut, updateProfile, refreshUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const uploadService = new PhotoUploadService();

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('Current user in handlePhotoUpload:', user);
    if (!file || !user?.uid) return;

    try {
      setUploading(true);
      setError(null);

      console.log('Attempting upload with user ID:', user.uid);
      
      // Upload using PhotoUploadService
      const photoURL = await uploadService.uploadPhoto(file, user.uid);

      // Update auth profile using context
      await updateProfile({ photoURL });

      // Update Firestore document
      await updateDoc(doc(db, 'users', user.uid), {
        photoURL
      });

      // Refresh the user data to show new photo
      await refreshUser();

    } catch (err) {
      console.error('Error uploading photo:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload photo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
      
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <Avatar 
            src={user.photoURL} 
            name={user.displayName || user.email || 'User'} 
            size="xl"
            className="ring-4 ring-gray-200 hover:ring-indigo-500 transition-colors"
          />
          {process.env.NODE_ENV === 'development' && (
            <div className="text-xs text-gray-500">
              <p>Photo URL: {user.photoURL || 'none'}</p>
              <p>Display Name: {user.displayName || 'none'}</p>
            </div>
          )}
          <div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={uploading}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100
                  disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </label>
            {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1">{user.email}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Display Name</label>
          <p className="mt-1">{user.displayName || 'Not set'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Verification</label>
          <p className="mt-1">
            {user.emailVerified ? 'Verified' : 'Not verified'}
          </p>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
          <div>
            <h2 className="font-medium">Role</h2>
            <p className="text-sm text-gray-600">{user.role}</p>
          </div>
        </div>

        <button
          onClick={() => signOut()}
          className="w-full mt-6 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}; 