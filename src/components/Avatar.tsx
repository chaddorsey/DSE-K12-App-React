import React from 'react';
import { getAvatarUrl } from '@/utils/avatar';

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16'
};

const sizePx = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64
};

// Ring styles for different states
const ringStyles = {
  default: 'before:border-gray-200',
  hover: 'hover:before:border-indigo-500',
  active: 'before:border-indigo-600'
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className = ''
}) => {
  const avatarUrl = getAvatarUrl(src, name, sizePx[size]);
  
  return (
    <div 
      className={`
        relative
        inline-flex
        items-center
        justify-center
        ${sizeClasses[size]}
        before:absolute
        before:inset-0
        before:rounded-full
        before:border
        ${ringStyles.default}
        ${ringStyles.hover}
        before:transition-colors
        before:duration-200
      `}
    >
      <img
        src={avatarUrl}
        alt={`Avatar for ${name}`}
        className={`
          w-full
          h-full
          !rounded-full
          object-cover
          relative
          z-10
          ${className}
        `}
        style={{
          borderRadius: '9999px'
        }}
        width={sizePx[size]}
        height={sizePx[size]}
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          if (!img.src.includes('ui-avatars.com')) {
            img.src = getAvatarUrl(null, name, sizePx[size]);
          }
        }}
      />
    </div>
  );
}; 