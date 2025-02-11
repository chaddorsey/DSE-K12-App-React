import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import './Header.css';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleClearStorage = () => {
    try {
      localStorage.removeItem('questionEdits');
      console.log('Cleared question edits from localStorage');
      // Force reload to reset state
      window.location.reload();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <Link to="/" className="logo">DSET App</Link>
          <button 
            onClick={handleClearStorage}
            className="clear-storage-button"
          >
            Reset Questions
          </button>
        </div>
        <nav className="nav-links">
          <Link to="/onboarding">Onboarding</Link>
          <Link to="/demo/progressive-avatars">Connections</Link>
          <Link to="/question-playground">Quiz</Link>
          {isAuthenticated && (
            <div className="user-section">
              <span className="user-name">{user?.name}</span>
              <button
                onClick={logout}
                className="logout-button"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}; 