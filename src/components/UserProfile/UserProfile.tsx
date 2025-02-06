import React from 'react';
import { DataContainer } from '../DataContainer/DataContainer';
import type { IUser } from '../../api/types/models';
import { UserProfileView } from './UserProfileView';

export const UserProfile: React.FC = () => {
  return (
    <DataContainer endpoint="users.profile">
      {(user) => <UserProfileView user={user} />}
    </DataContainer>
  );
}; 