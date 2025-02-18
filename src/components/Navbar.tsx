import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { Avatar } from './Avatar';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold">
          DSET
        </Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-300">{user.displayName}</span>
              <button
                onClick={signOut}
                className="text-white hover:text-gray-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-white hover:text-gray-300"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-white hover:text-gray-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}; 