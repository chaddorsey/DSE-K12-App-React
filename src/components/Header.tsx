import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';
import { UserProfileButton } from '../features/auth/components/UserProfileButton';
import './Header.css';

interface HeaderProps {
  links?: Array<{ to: string; label: string }>;
}

export function Header({ links = [] }: HeaderProps) {
  const { user, signOut } = useAuth();

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
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <UserProfileButton />
            </>
          ) : (
            <Link to="/login">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header; 