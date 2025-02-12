import React, { useState, useEffect, useCallback } from 'react';
import { ProgressiveAvatarGrid } from './ProgressiveAvatarGrid';
import { useUsers } from '../hooks/useUsers';
import type { RecognitionLevel, ProgressiveSelection } from '../types/progressive-selection';
import { ProgressiveAvatar } from './ProgressiveAvatar';
import { SearchBar } from '../../../components/SearchBar';
import { useAvatarData } from '../hooks/useAvatarData';
import './ProgressiveAvatarDemo.css';

export const ProgressiveAvatarDemo: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<string>('face');
  const [selections, setSelections] = useState<Record<string, ProgressiveSelection>>({});
  const [isProgressiveMode, setIsProgressiveMode] = useState(true);
  const [progress, setProgress] = useState(0);
  const { users, isLoading, error } = useUsers();
  const { avatars, isLoading: avatarsLoading, error: avatarsError } = useAvatarData();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query.toLowerCase());
  }, []);

  const filteredUsers = React.useMemo(() => {
    if (!searchQuery) return users;
    
    return users.filter(user => 
      user.name.toLowerCase().includes(searchQuery) ||
      user.role?.toLowerCase().includes(searchQuery) ||
      user.department?.toLowerCase().includes(searchQuery)
    );
  }, [users, searchQuery]);

  if (isLoading || avatarsLoading) {
    return <div>Loading users...</div>;
  }

  if (error || avatarsError) {
    return <div>Error: {error || avatarsError?.message}</div>;
  }

  const handleUserSelect = (userId: string) => {
    setSelections(prev => ({
      ...prev,
      [userId]: {
        userId,
        recognitionLevel: currentLevel as RecognitionLevel,
        timestamp: Date.now()
      }
    }));
  };

  const getLevelProgress = (level: RecognitionLevel) => {
    return Object.values(selections).filter(s => s.recognitionLevel === level).length;
  };

  const canProceedToNextLevel = getLevelProgress(currentLevel as RecognitionLevel) > 0;

  const handleLevelComplete = (level: string) => {
    setProgress((prev) => prev + 25);
    // Move to next level
    switch (level) {
      case 'face':
        setCurrentLevel('name');
        break;
      case 'name':
        setCurrentLevel('talked');
        break;
      case 'talked':
        setCurrentLevel('know_well');
        break;
      default:
        break;
    }
  };

  return (
    <div className="progressive-avatar-demo">
      <h1 className="text-2xl font-bold mb-4">Progressive Avatar Recognition</h1>
      
      <div className="demo-controls">
        <p className="instruction">
          Select all the people whose {currentLevel === 'face' ? 'faces you recognize' : 
            currentLevel === 'name' ? 'names you know' :
            currentLevel === 'talked' ? 'you have talked to' :
            'you know well'}
        </p>
        
        <div className="loading-progress">
          <div className="progress-bar" style={{ '--progress': `${progress}%` } as React.CSSProperties} />
        </div>
      </div>

      {isLoading ? (
        <div>Loading users...</div>
      ) : (
        <ProgressiveAvatarGrid 
          users={users}
          currentLevel={currentLevel as RecognitionLevel}
          selections={selections}
          isProgressiveMode={isProgressiveMode}
          onUserSelect={handleUserSelect}
          onLevelChange={setCurrentLevel}
          onModeToggle={() => setIsProgressiveMode(!isProgressiveMode)}
          onLevelComplete={handleLevelComplete}
        />
      )}
    </div>
  );
}; 