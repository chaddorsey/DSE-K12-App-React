import React from 'react';
import { DataContainer } from '../DataContainer';
import { UserProfileView } from './UserProfileView';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';
import type { IUser } from '../../api/types/models';

export const UserProfile: React.FC = () => {
  usePerformanceMonitoring('UserProfile');

  return (
    <DataContainer endpoint="users.profile">
      {(user: IUser) => <UserProfileView user={user} />}
    </DataContainer>
  );
}; 