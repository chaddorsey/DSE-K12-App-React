import React from 'react';
import './Avatar.css';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = '', 
  size = 'medium',
  className = ''
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderContent = () => {
    if (src) {
      return <img src={src} alt={alt} className="avatar-image" />;
    }

    // Only try to get initials if we have a non-empty alt text
    const initials = alt ? getInitials(alt) : 'U';
    return <div className="avatar-initials">{initials}</div>;
  };

  return (
    <div className={`avatar avatar-${size} ${className}`.trim()}>
      {renderContent()}
    </div>
  );
};

export default Avatar; 