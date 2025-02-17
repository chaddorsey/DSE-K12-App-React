import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import logoWhite from '../../../assets/images/logo-white.png';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userClaims, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const baseLinks = [
    { path: '/quiz', label: 'Quiz' },
    { path: '/connections', label: 'Connect' },
    { path: '/visualize', label: 'Visualize' },
  ];

  const getNavLinks = () => {
    return user ? baseLinks : [];
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-28 bg-primary z-50">
      <div className="h-full px-3 mx-auto max-w-7xl flex items-center">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 mr-4">
          <img 
            src={logoWhite} 
            alt="DSE K-12 Connections" 
            className="h-14 w-auto"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 text-white hover:bg-primary-light rounded-md ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Open menu</span>
          {/* Hamburger icon */}
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="flex flex-1 items-center justify-center space-x-8">
          {getNavLinks().map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`
                font-display font-bold uppercase tracking-wide text-xl text-white
                px-6 py-3 transition-colors duration-200 whitespace-nowrap
                ${isActive(path) ? 'bg-primary-dark' : 'hover:bg-primary-light'}
                rounded-md
              `}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Section */}
        <div className="flex items-center ml-auto space-x-4">
          {user ? (
            <button
              onClick={() => signOut()}
              className="
                font-display font-bold uppercase tracking-wide text-lg text-white
                px-4 py-2 transition-colors duration-200
                hover:bg-primary-light whitespace-nowrap
                rounded-md
              "
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              className="
                font-display font-bold uppercase tracking-wide text-xl text-white
                px-6 py-3 transition-colors duration-200
                hover:bg-primary-light whitespace-nowrap
                rounded-md
              "
            >
              Sign In
            </Link>
          )}
          {/* Avatar placeholder */}
          <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center">
            <span className="sr-only">User profile</span>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          absolute top-14 left-0 w-full bg-primary shadow-lg sm:hidden
          transition-transform duration-200 ease-in-out
          ${isMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full'}
        `}>
          <div className="px-4 py-2 space-y-1">
            {getNavLinks().map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`
                  block font-display font-bold uppercase tracking-wider text-sm text-white
                  px-4 py-2 transition-colors duration-200
                  ${isActive(path) ? 'bg-primary-dark' : 'hover:bg-primary-light'}
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            {/* Mobile Auth */}
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="
                  w-full text-left font-display font-bold uppercase tracking-wider text-sm text-white
                  px-4 py-2 transition-colors duration-200 hover:bg-primary-light
                "
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="
                  block font-display font-bold uppercase tracking-wider text-sm text-white
                  px-4 py-2 transition-colors duration-200 hover:bg-primary-light
                "
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}; 