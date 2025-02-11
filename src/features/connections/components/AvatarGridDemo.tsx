import React, { useState } from 'react';
import { AvatarGrid } from './AvatarGrid';
import type { RecognitionLevel } from '../types';
import { mockUsers } from '../test/mockData';
import './AvatarGridDemo.css';

export const AvatarGridDemo: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<RecognitionLevel[]>([]);

  const levels: RecognitionLevel[] = ['FACE', 'NAME', 'TALKED', 'KNOW_WELL'];

  const handleUserSelect = (userId: string) => {
    console.log('Selected user:', mockUsers.find(u => u.id === userId));
  };

  return (
    <div className="avatar-grid-demo">
      <div className="demo-controls">
        <div className="search-control">
          <label htmlFor="search">Search Users:</label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type to search..."
          />
        </div>

        <div className="filter-control">
          <span>Filter by Recognition Level:</span>
          {levels.map(level => (
            <label key={level} className="level-checkbox">
              <input
                type="checkbox"
                checked={selectedLevels.includes(level)}
                onChange={(e) => {
                  setSelectedLevels(e.target.checked 
                    ? [...selectedLevels, level]
                    : selectedLevels.filter(l => l !== level)
                  );
                }}
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      <AvatarGrid
        users={mockUsers}
        searchQuery={searchQuery}
        selectedLevels={selectedLevels}
        onUserSelect={handleUserSelect}
      />
    </div>
  );
}; 