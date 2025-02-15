import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '@/components/Avatar';
import './UserProfileButton.css';

export const UserProfileButton: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If no user, don't render anything
  if (!user) {
    return null;
  }

  const handleClick = () => {
    navigate('/profile');
  };

  return (
    <button
      className="profile-button-nav"
      onClick={handleClick}
      aria-label="User profile settings"
    >
      <Avatar
        src={user.photoURL}
        name={user.displayName || 'User'}
        size="small"
      />
      {/* Optional notification indicator */}
      {user.needsVerification && (
        <span className="notification-dot">
          <span className="ping" />
        </span>
      )}
    </button>
  );
}; 