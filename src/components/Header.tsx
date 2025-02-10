import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { logger } from '../utils/logger';
import './Header.css';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setError(null);
      await logout();
      navigate('/login');
    } catch (err) {
      setError('Error logging out. Please try again.');
      logger.error('Logout failed', { error: err });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">DSET App</div>
        <nav className="nav-links">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="nav-button"
          >
            Dashboard
          </button>
          <button 
            onClick={() => navigate('/playground')} 
            className="nav-button"
          >
            Playground
          </button>
          {isAuthenticated && (
            <div className="user-section">
              <span className="user-name">{user?.name}</span>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="logout-button"
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
              {error && <div className="error-message">{error}</div>}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}; 