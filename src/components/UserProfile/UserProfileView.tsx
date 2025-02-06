import React from 'react';
import type { IUser } from '../../api/types/models';
import './UserProfile.css';

interface IUserProfileViewProps {
  user: IUser;
}

export const UserProfileView: React.FC<IUserProfileViewProps> = ({ user }) => {
  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      {user.avatar && (
        <img 
          src={user.avatar} 
          alt={`${user.name}'s avatar`}
          className="user-profile__avatar"
        />
      )}
    </div>
  );
}; 