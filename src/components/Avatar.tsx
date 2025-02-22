import React from 'react';

interface AvatarProps {
  user: {
    photoURL?: string | null;
    email?: string | null;
  };
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<AvatarProps> = ({ user, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  if (user.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt="User avatar"
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    );
  }

  // Get initials from email
  const initials = user.email
    ? user.email.split('@')[0].slice(0, 2).toUpperCase()
    : '??';

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-primary-600 text-white flex items-center justify-center font-medium`}
    >
      {initials}
    </div>
  );
}; 