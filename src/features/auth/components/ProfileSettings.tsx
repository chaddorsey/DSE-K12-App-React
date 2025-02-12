import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '@/components/Avatar';

export const ProfileSettings: React.FC = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-2 mb-6">
        <Avatar
          src={user.photoURL}
          name={user.displayName || user.email || 'User'}
          size="xs"
          className="inline-block"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.displayName || 'User'}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
          <div>
            <h2 className="font-medium">Email Verification</h2>
            <p className="text-sm text-gray-600">
              {user.emailVerified ? 'Verified' : 'Not verified'}
            </p>
          </div>
          {!user.emailVerified && (
            <button className="text-indigo-600 hover:text-indigo-500">
              Resend verification
            </button>
          )}
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