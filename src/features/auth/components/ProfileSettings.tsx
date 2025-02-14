import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ProfilePhotoUploader } from '@/features/profile/components/ProfilePhotoUploader';
import './ProfileSettings.css';

export const ProfileSettings: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="profile-settings">
      <h1 className="text-2xl font-semibold mb-6">Profile Settings</h1>
      
      <section className="profile-section">
        <h2 className="text-lg font-medium mb-4">Profile Photo</h2>
        <div className="photo-section">
          <ProfilePhotoUploader />
        </div>
      </section>

      <section className="profile-section">
        <h2 className="text-lg font-medium mb-4">Account Information</h2>
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
        </div>
      </section>

      {!user.emailVerified && (
        <section className="profile-section verification-warning">
          <h2 className="text-lg font-medium mb-2">Email Verification Required</h2>
          <p className="text-gray-600">
            Please verify your email address to access all features.
          </p>
        </section>
      )}
    </div>
  );
}; 