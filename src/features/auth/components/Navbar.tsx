import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import logoWhite from '../../../assets/images/logo-white.png';

export const Navbar = () => {
  const { user, userClaims, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const baseLinks = [
    { path: '/visualize', label: 'Visualize' },
  ];

  const userLinks = [
    { path: '/connections', label: 'Connections' },
  ];

  const adminLinks = [
    { path: '/quiz', label: 'Quiz Manager' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  const getNavLinks = () => {
    const links = [...baseLinks];
    if (user) {
      links.push(...userLinks);
      if (userClaims?.role === 'admin') {
        links.push(...adminLinks);
      }
    }
    return links;
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-primary z-50">
      <div className="h-full flex items-center justify-between px-8">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img 
            src={logoWhite} 
            alt="DSE K-12 Connections" 
            className="h-8 w-auto"
          />
        </Link>

        {/* Navigation Links - now with flex-grow to distribute space */}
        <div className="flex-grow flex items-center justify-center space-x-12 mx-8">
          {getNavLinks().map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`
                font-display font-bold uppercase tracking-wider text-sm text-white
                px-4 py-2 transition-colors duration-200
                ${isActive(path) ? 'bg-primary-dark' : 'hover:bg-primary-light'}
              `}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="flex-shrink-0">
          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => signOut()}
                className="
                  font-display font-bold uppercase tracking-wider text-sm text-white
                  px-4 py-2 transition-colors duration-200
                  hover:bg-primary-light
                "
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="
                font-display font-bold uppercase tracking-wider text-sm text-white
                px-4 py-2 transition-colors duration-200
                hover:bg-primary-light
              "
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}; 