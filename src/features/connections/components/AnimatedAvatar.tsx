import React from 'react';
import type { User } from '../types';
import './AnimatedAvatar.css';

interface AnimatedAvatarProps {
  user: User;
  onClick: () => void;
}

export const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({ user, onClick }) => {
  return (
    <div 
      className="animated-avatar"
      data-testid={`avatar-${user.id}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="gridcell"
      tabIndex={0}
      aria-label={`${user.name}, Recognition Level: ${user.recognitionLevel}`}
    >
      <div className="avatar-image">
        <img 
          src={user.avatar} 
          alt={`${user.name}'s avatar`}
          loading="lazy"
        />
      </div>
      <div className="avatar-name">{user.name}</div>
      <div className="avatar-level" aria-hidden="true">
        {user.recognitionLevel}
      </div>
    </div>
  );
}; 