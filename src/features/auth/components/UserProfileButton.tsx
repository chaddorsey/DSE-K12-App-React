import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '@/components/Avatar';

export const UserProfileButton: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <button
      onClick={() => navigate('/profile')}
      className="
        relative 
        inline-flex 
        items-center 
        justify-center
        rounded-full
        group
        focus:outline-none 
        focus-visible:ring-2 
        focus-visible:ring-indigo-500
        overflow-hidden
        bg-transparent
      "
      aria-label="User profile settings"
    >
      {/* Hover background with perfect circle */}
      <span className="
        absolute 
        inset-0 
        rounded-full 
        transition-colors 
        duration-200
        group-hover:bg-gray-100
        transform
        scale-110
        opacity-0
        group-hover:opacity-100
      " />
      <Avatar
        src={user.photoURL}
        name={user.displayName || user.email || 'User'}
        size="sm"
        className="
          cursor-pointer 
          touch-manipulation 
          relative 
          z-10
          p-1
        "
      />
      {!user.emailVerified && (
        <span className="absolute -top-1 -right-1 block h-3 w-3 z-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      )}
    </button>
  );
}; 