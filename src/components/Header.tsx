import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import './Header.css';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">DSET App</div>
        <nav className="nav-links">
          <Link to="/">Questions</Link>
          <div className="demo-links">
            Demos:
            <Link to="/demo/avatar-grid">Avatar Grid</Link>
            <Link to="/demo/question-types">Question Types</Link>
            <Link to="/demo/visualization">Visualization</Link>
          </div>
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