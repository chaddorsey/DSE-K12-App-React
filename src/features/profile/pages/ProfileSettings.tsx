import React from 'react';
import { ProfilePhotoUploader } from '../components/ProfilePhotoUploader';
import { useAuth } from '@/features/auth/context/AuthContext';

export const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  
  // Add debug logging
  console.log('Current user:', user);

  if (!user) {
    return <div>Please log in to access profile settings</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Profile Photo</h2>
        <ProfilePhotoUploader />
      </div>
      {/* Other profile settings */}
    </div>
  );
}; 