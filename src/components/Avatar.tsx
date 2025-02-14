import React from 'react';
import { getAvatarUrl } from '@/utils/avatar';
import './Avatar.css';

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: number;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = 'User',
  size = 40,
  className = ''
}) => {
  const avatarUrl = getAvatarUrl(src, name, size);

  return (
    <div 
      className={`avatar-container ${className}`}
      style={{ 
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
      }}
    >
      <img
        src={avatarUrl}
        alt={`Avatar for ${name}`}
        className="avatar-image"
        loading="lazy"
      />
    </div>
  );
};

export default Avatar; 