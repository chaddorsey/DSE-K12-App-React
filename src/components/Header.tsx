import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';
import { UserProfileButton } from '../features/auth/components/UserProfileButton';
import './Header.css';

interface HeaderProps {
  links?: Array<{ to: string; label: string }>;
}

export function Header({ links = [] }: HeaderProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

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

  const handlePhotoUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: '/demo/photo-upload' } });
      return;
    }
    navigate('/demo/photo-upload');
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
          <Link 
            to="/demo/photo-upload" 
            onClick={handlePhotoUploadClick}
          >
            Photo Upload Demo
          </Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <UserProfileButton />
              <button 
                onClick={() => signOut()}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
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