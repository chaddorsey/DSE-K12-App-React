import React from 'react';
import { Logout } from '../Logout/Logout';
import { useAuth } from '../../features/auth/AuthContext';
import './Header.css';

export const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="header">
      <div className="header__logo">App Logo</div>
      <nav className="header__nav">
        {isAuthenticated && <Logout />}
      </nav>
    </header>
  );
}; 