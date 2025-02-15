import React from 'react';
import { getAvatarUrl } from '@/utils/avatar';
import './Avatar.css';

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: number;
  scaleToFit?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = 'User',
  size = 40,
  scaleToFit = false,
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
        className={`avatar-image ${scaleToFit ? 'scale-to-fit' : ''}`}
        width={size}
        height={size}
        loading="lazy"
      />
    </div>
  );
};

export default Avatar; 