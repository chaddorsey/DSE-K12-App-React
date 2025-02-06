import React from 'react';
import { useApi } from '@hooks/useApi';
import type { IUser } from '@api/types/models';
import { logger } from '@utils/logger';

const UserProfile: React.FC = () => {
  const {
    data: user,
    loading,
    error,
    request
  } = useApi<IUser>({
    onError: (err) => {
      logger.error('Failed to load user profile', err);
    }
  });

  React.useEffect(() => {
    request('users.profile', {
      cache: true // Enable caching for profile
    });
  }, [request]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      {user.avatar && (
        <img src={user.avatar} alt={`${user.name}'s avatar`} />
      )}
    </div>
  );
};

export default UserProfile; 