import React from 'react';
import { LogoutButton } from './LogoutButton';
import './Header.css';

interface User {
  id: string;
  name: string;
  email: string;
}

interface HeaderProps {
  user: User | null;
  onLogout: () => Promise<void>;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogout
}) => {
  if (!user) return null;

  const handleLogout = async () => {
    try {
      await onLogout();
    } catch (error) {
      console.error('Logout failed:', error);
      // TODO: Show error notification
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1>DSET App</h1>
        </div>
        <div className="header-right">
          <span className="user-name">{user.name}</span>
          <LogoutButton
            onLogoutStart={handleLogout}
            confirmationRequired={true}
            confirmationMessage="Are you sure you want to logout? Any unsaved progress will be lost."
          />
        </div>
      </div>
    </header>
  );
}; 