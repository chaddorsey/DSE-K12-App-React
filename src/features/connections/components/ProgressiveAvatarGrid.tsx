import React, { useRef, useEffect } from 'react';
import type { User } from '../types/user';
import type { RecognitionLevel, ProgressiveSelection } from '../types/progressive-selection';
import { useKeyboardNavigation } from '../../../features/accessibility/hooks/useKeyboardNavigation';
import { useProgressiveFocus } from '../hooks/useProgressiveFocus';
import classNames from 'classnames';
import './ProgressiveAvatarGrid.css';
import { AvatarSkeleton } from './AvatarSkeleton';
import { useVisibleItemPriority } from '../hooks/useVisibleItemPriority';

export interface ProgressiveAvatarGridProps {
  users: User[];
  currentLevel: RecognitionLevel;
  selections: Record<string, ProgressiveSelection>;
  isProgressiveMode: boolean;
  onUserSelect: (userId: string) => void;
  onLevelChange: (level: RecognitionLevel) => void;
  onModeToggle: () => void;
  loading?: boolean;
  loadingProgress?: number;
  partialLoading?: Record<string, boolean>;
  onPriorityChange?: (visibleIds: string[]) => void;
}

export const ProgressiveAvatarGrid: React.FC<ProgressiveAvatarGridProps> = ({
  users,
  currentLevel,
  selections,
  isProgressiveMode,
  onUserSelect,
  onLevelChange,
  onModeToggle,
  loading = false,
  loadingProgress = 0,
  partialLoading = {},
  onPriorityChange
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { saveFocusedElement, restoreFocus } = useProgressiveFocus(gridRef);

  const { handleKeyDown } = useKeyboardNavigation({
    containerRef: gridRef,
    itemSelector: '[role="gridcell"]',
    onSelect: (element) => {
      const userId = element.getAttribute('data-user-id');
      if (userId) onUserSelect(userId);
    }
  });

  // Handle keyboard shortcuts for level navigation
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!e.ctrlKey) return;

      const levelMap: Record<string, RecognitionLevel> = {
        '1': 'FACE',
        '2': 'NAME',
        '3': 'TALKED',
        '4': 'KNOW_WELL'
      };

      const newLevel = levelMap[e.key];
      if (newLevel) {
        saveFocusedElement();
        onLevelChange(newLevel);
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [onLevelChange, saveFocusedElement]);

  // Restore focus after level changes
  useEffect(() => {
    restoreFocus();
  }, [currentLevel, restoreFocus]);

  // Add hook usage
  useVisibleItemPriority({
    users,
    containerRef: gridRef,
    onPriorityChange: (visibleIds) => {
      onPriorityChange?.(visibleIds);
    }
  });

  if (loading) {
    const progressPercent = Math.round(loadingProgress * 100);
    
    return (
      <div className="progressive-avatar-grid" data-testid="avatar-grid-loading">
        <div className="grid-controls">
          <div 
            className="level-indicator mode-indicator" 
            role="status"
          >
            {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1).toLowerCase()} Recognition
          </div>
          <button disabled>
            {isProgressiveMode ? 'Switch to Standard' : 'Switch to Progressive'}
          </button>
        </div>

        <div className="loading-progress">
          <div
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="progress-bar"
            style={{ '--progress': `${progressPercent}%` } as React.CSSProperties}
          >
            <span className="visually-hidden">Loading: {progressPercent}%</span>
          </div>
        </div>

        <div role="alert" className="visually-hidden">
          Loading user grid... {progressPercent}% complete
        </div>

        <div className="avatar-grid">
          {users.map(user => (
            <AvatarSkeleton key={user.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="progressive-avatar-grid">
      <div className="grid-controls">
        <div 
          className="level-indicator mode-indicator" 
          role="status"
          aria-live="polite"
        >
          {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1).toLowerCase()} Recognition
        </div>
        <button onClick={onModeToggle}>
          {isProgressiveMode ? 'Switch to Standard' : 'Switch to Progressive'}
        </button>
      </div>

      <div
        ref={gridRef}
        role="grid"
        className="avatar-grid"
        onKeyDown={handleKeyDown}
        aria-label="User recognition grid"
      >
        {users.map(user => {
          const selection = selections[user.id];
          const isLoading = partialLoading[user.id];

          if (isLoading) {
            return (
              <AvatarSkeleton
                key={user.id}
                className={selection ? `selected-${selection.recognitionLevel.toLowerCase()}` : ''}
                data-testid={`avatar-${user.id}-skeleton`}
              />
            );
          }

          return (
            <div
              key={user.id}
              data-testid={`avatar-${user.id}`}
              data-user-id={user.id}
              role="gridcell"
              tabIndex={0}
              className={classNames('avatar-cell', {
                [`selected-${selection?.recognitionLevel.toLowerCase()}`]: selection,
                'current-level': isProgressiveMode && !selection
              })}
              onClick={() => onUserSelect(user.id)}
            >
              <img
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                className="avatar-image"
              />
              <div className="avatar-name">{user.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export interface ProgressiveModeControlsProps {
  currentLevel: RecognitionLevel;
  isProgressiveMode: boolean;
  onLevelChange: (level: RecognitionLevel) => void;
  onModeToggle: () => void;
  completedSelections: number;
  totalUsers: number;
}

export interface ProgressiveAvatarProps {
  user: User;
  currentLevel: RecognitionLevel;
  selection?: ProgressiveSelection;
  isProgressiveMode: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

// Hook for managing keyboard navigation and selection
export interface UseProgressiveGridNavigation {
  selectedId: string | null;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  navigateGrid: (direction: 'up' | 'down' | 'left' | 'right') => void;
  selectCurrent: () => void;
}

// Hook for managing progressive selection state
export interface UseProgressiveSelection {
  state: {
    currentLevel: RecognitionLevel;
    selections: Record<string, ProgressiveSelection>;
    isProgressive: boolean;
  };
  actions: {
    toggleProgressiveMode: () => void;
    setCurrentLevel: (level: RecognitionLevel) => void;
    selectUser: (userId: string) => void;
    clearSelections: () => void;
  };
  metrics: {
    completedSelections: number;
    progressPercentage: number;
    remainingUsers: number;
  };
} 