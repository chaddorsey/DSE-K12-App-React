import React, { useState, useEffect } from 'react';
import { ProgressiveAvatarGrid } from './ProgressiveAvatarGrid';
import { getMockUsers } from '../data/mockData';
import type { MockUser } from '../types/mock-data';
import type { RecognitionLevel, ProgressiveSelection } from '../types/progressive-selection';
import './ProgressiveAvatarDemo.css';

export const ProgressiveAvatarDemo: React.FC = () => {
  const [isProgressiveMode, setIsProgressiveMode] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<RecognitionLevel>('FACE');
  const [selections, setSelections] = useState<Record<string, ProgressiveSelection>>({});
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [users, setUsers] = useState<MockUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getMockUsers()
      .then(mockUsers => {
        setUsers(mockUsers.slice(0, 12));
        setError(null);
      })
      .catch(err => {
        console.error('Failed to load users:', err);
        setError('Failed to load user data');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleUserSelect = (userId: string) => {
    setSelections(prev => {
      const existing = prev[userId];
      if (existing && existing.recognitionLevel === currentLevel) {
        // Deselect if already selected at current level
        const { [userId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [userId]: {
          userId,
          recognitionLevel: currentLevel,
          timestamp: Date.now()
        }
      };
    });
  };

  const getLevelProgress = (level: RecognitionLevel) => {
    return Object.values(selections).filter(s => s.recognitionLevel === level).length;
  };

  const canProceedToNextLevel = getLevelProgress(currentLevel) > 0;

  const getNextLevel = (): RecognitionLevel => {
    const levels: RecognitionLevel[] = ['FACE', 'NAME', 'TALKED', 'KNOW_WELL'];
    const currentIndex = levels.indexOf(currentLevel);
    return levels[currentIndex + 1];
  };

  return (
    <div className="progressive-avatar-demo">
      <div className="demo-controls">
        <h1>Progressive Avatar Recognition Demo</h1>
        
        <div className="mode-controls">
          <button onClick={() => setIsProgressiveMode(!isProgressiveMode)}>
            Switch to {isProgressiveMode ? 'Standard' : 'Progressive'} Mode
          </button>
          {isProgressiveMode && (
            <button onClick={() => setIsReviewMode(!isReviewMode)}>
              {isReviewMode ? 'Exit Review' : 'Review Selections'}
            </button>
          )}
        </div>

        {isProgressiveMode && (
          <div className="progress-info">
            <h2>{currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1).toLowerCase()} Recognition</h2>
            <p className="instruction">
              Select people whose {currentLevel.toLowerCase()} you recognize
            </p>
            <div className="level-progress">
              {getLevelProgress(currentLevel)} people recognized at this level
            </div>
            {canProceedToNextLevel && getNextLevel() && (
              <button 
                className="next-level"
                onClick={() => setCurrentLevel(getNextLevel())}
              >
                Proceed to {getNextLevel().toLowerCase()} recognition
              </button>
            )}
          </div>
        )}
      </div>

      <ProgressiveAvatarGrid
        users={users}
        currentLevel={currentLevel}
        selections={selections}
        isProgressiveMode={isProgressiveMode}
        onUserSelect={handleUserSelect}
        onLevelChange={setCurrentLevel}
        onModeToggle={() => setIsProgressiveMode(!isProgressiveMode)}
      />

      {isReviewMode && (
        <div className="selection-review">
          <h3>Selection Summary</h3>
          {(['FACE', 'NAME', 'TALKED', 'KNOW_WELL'] as RecognitionLevel[]).map(level => (
            <div key={level} className="level-summary">
              <strong>{level}:</strong> {getLevelProgress(level)} recognized
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 