import { useMemo } from 'react';
import type { User, RecognitionLevel } from '../types';

export const useFilteredUsers = (
  users: User[],
  searchQuery: string,
  selectedLevels: RecognitionLevel[]
) => {
  return useMemo(() => {
    let filtered = users;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(query)
      );
    }

    // Apply level filters
    if (selectedLevels.length > 0) {
      filtered = filtered.filter(user =>
        selectedLevels.includes(user.recognitionLevel)
      );
    }

    return filtered;
  }, [users, searchQuery, selectedLevels]);
}; 