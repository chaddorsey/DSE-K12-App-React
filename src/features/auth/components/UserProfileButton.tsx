import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '@/components/Avatar';
import './UserProfileButton.css';

export const UserProfileButton: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [avatarKey, setAvatarKey] = useState(0);

  useEffect(() => {
    if (user?.photoURL) {
      setAvatarKey(prev => prev + 1);
    }
  }, [user?.photoURL]);

  if (!user) return null;

  return (
    <button
      onClick={() => navigate('/profile')}
      className="profile-button-nav group"
      aria-label="User profile settings"
    >
      <span className="hover-background" />
      <div className="nav-avatar-wrapper">
        <Avatar
          key={avatarKey}
          src={user.photoURL}
          name={user.displayName || user.email || 'User'}
          size={40}
        />
        {!user.emailVerified && (
          <span className="verification-indicator">
            <span className="ping" />
            <span className="dot" />
          </span>
        )}
      </div>
    </button>
  );
}; 