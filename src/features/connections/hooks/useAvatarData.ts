import { useState, useEffect } from 'react';
import { getMockUsers } from '../data/mockData';
import type { MockUser } from '../types/mock-data';

interface UseAvatarDataResult {
  avatars: MockUser[];
  isLoading: boolean;
  error: Error | null;
}

export const useAvatarData = (): UseAvatarDataResult => {
  const [avatars, setAvatars] = useState<MockUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadAvatars = async () => {
      try {
        setIsLoading(true);
        const users = await getMockUsers();
        setAvatars(users);
        setError(null);
      } catch (err) {
        console.error('Failed to load avatars:', err);
        setError(err instanceof Error ? err : new Error('Failed to load avatars'));
      } finally {
        setIsLoading(false);
      }
    };

    loadAvatars();
  }, []);

  return { avatars, isLoading, error };
}; 