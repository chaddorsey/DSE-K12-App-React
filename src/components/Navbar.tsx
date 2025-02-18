import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { Avatar } from './Avatar';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/dashboard' ? 'active' : ''}>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className={location.pathname.startsWith('/quiz') ? 'active' : ''}>
          <Link to="/quiz">Quiz</Link>
        </li>
        {user.role === 'admin' && (
          <>
            <li className={location.pathname === '/question-editor' ? 'active' : ''}>
              <Link to="/question-editor">Question Editor</Link>
            </li>
            <li className={location.pathname === '/demo/editor' ? 'active' : ''}>
              <Link to="/demo/editor">Question Bank</Link>
            </li>
          </>
        )}
      </ul>
      <div className="profile-section">
        <Link to="/profile" className="profile-button">
          <Avatar 
            src={user.avatarUrl} 
            name={user.name || 'User'} 
            size={32}
          />
          <span className="profile-text">
            {user.name || 'Profile'}
          </span>
        </Link>
      </div>
    </nav>
  );
}; 