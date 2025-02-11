import React from 'react';
import classNames from 'classnames';
import './AvatarSkeleton.css';

interface AvatarSkeletonProps {
  className?: string;
}

export const AvatarSkeleton: React.FC<AvatarSkeletonProps> = ({ className }) => {
  return (
    <div 
      className={classNames('avatar-skeleton', className)}
      data-testid="avatar-skeleton"
      aria-disabled="true"
    >
      <div className="avatar-skeleton-image" />
      <div className="avatar-skeleton-name" />
      <div className="avatar-skeleton-level" />
    </div>
  );
}; 