import React, { useRef } from 'react';
import { useFilteredUsers } from '../hooks/useFilteredUsers';
import { AnimatedAvatar } from './AnimatedAvatar';
import { useKeyboardNavigation } from '../../../features/accessibility/hooks/useKeyboardNavigation';
import { useAccessibility } from '../../../features/accessibility/context/AccessibilityContext';
import type { AvatarGridProps } from '../types';
import './AvatarGrid.css';

export const AvatarGrid: React.FC<AvatarGridProps> = ({
  users,
  searchQuery,
  selectedLevels,
  onUserSelect
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const filteredUsers = useFilteredUsers(users, searchQuery, selectedLevels);
  const { highContrast } = useAccessibility();
  
  useKeyboardNavigation({
    containerRef: gridRef,
    selector: '[role="gridcell"]',
    wrap: true,
    horizontal: true,
    vertical: true
  });

  return (
    <div 
      ref={gridRef}
      className={`avatar-grid ${highContrast ? 'high-contrast' : ''}`}
      role="grid"
      aria-label="User avatars grid"
      aria-rowcount={Math.ceil(filteredUsers.length / 4)}
      aria-colcount={4}
    >
      <div role="row">
        {filteredUsers.map(user => (
          <AnimatedAvatar
            key={user.id}
            user={user}
            onClick={() => onUserSelect(user.id)}
          />
        ))}
      </div>
      {filteredUsers.length === 0 && (
        <div 
          className="no-results"
          role="alert"
          aria-live="polite"
        >
          No users found matching your search criteria
        </div>
      )}
    </div>
  );
}; 