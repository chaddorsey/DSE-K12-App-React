import React from 'react';
import classNames from 'classnames';
import './Avatar.css';

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  xs: '24px',
  sm: '32px',
  md: '48px',
  lg: '64px',
  xl: '96px'
};

const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1rem',
  xl: '1rem'
};

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  name, 
  size = 'md',
  className 
}) => {
  const [imageError, setImageError] = React.useState(false);

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div 
      className={classNames(
        'avatar',
        className
      )}
      style={{
        width: sizes[size],
        height: sizes[size],
      }}>
      {src && !imageError ? (
        <div className="w-full h-full">
          <img
            src={src}
            alt={`${name}'s avatar`}
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="avatar-initials">
          <span 
            style={{
              fontSize: fontSizes[size]
            }}
          >
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}; 