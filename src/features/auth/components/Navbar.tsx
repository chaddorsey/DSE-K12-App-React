import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Menu } from '@headlessui/react';
import logoWhite from '../../../assets/images/logo-white.png';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userClaims, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const baseLinks = [
    { path: '/quiz', label: 'Quiz' },
    { path: '/connections', label: 'Connect' },
    { path: '/visualize', label: 'Visualize' },
  ];

  const getNavLinks = () => {
    return user ? baseLinks : [];
  };

  const profileMenuItems = [
    {
      label: 'Sign Out',
      onClick: async () => {
        await signOut();
        navigate('/');
      },
      className: 'text-red-600'
    }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-28 bg-primary z-50">
      <div className="h-full px-2 mx-auto max-w-7xl flex items-center">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 mr-2">
          <img 
            src={logoWhite} 
            alt="DSE K-12 Connections" 
            className="h-11 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="flex flex-1 items-center justify-center space-x-2 overflow-x-auto">
          {getNavLinks().map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`
                font-display font-bold uppercase tracking-wide text-base text-white
                px-3 py-2 transition-colors duration-200 whitespace-nowrap
                ${isActive(path) ? 'bg-primary-dark' : 'hover:bg-primary-light'}
                rounded-md
              `}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="flex items-center ml-auto">
          {!user && (
            <Link
              to="/login"
              className="
                font-display font-bold uppercase tracking-wide text-base text-white
                px-3 py-2 mr-2 transition-colors duration-200
                hover:bg-primary-light whitespace-nowrap rounded-md
              "
            >
              Sign In
            </Link>
          )}
          
          {/* Profile Menu */}
          {user && (
            <Menu as="div" className="relative">
              <Menu.Button className="w-11 h-11 rounded-full bg-primary-light flex items-center justify-center hover:bg-primary-dark transition-colors duration-200">
                <span className="sr-only">Open user menu</span>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {profileMenuItems.map((item) => (
                    <Menu.Item key={item.label}>
                      {({ active }) => (
                        <button
                          onClick={item.onClick}
                          className={`${active ? 'bg-gray-100' : ''} ${item.className || ''} block w-full text-left px-4 py-2 text-sm`}
                        >
                          {item.label}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Menu>
          )}
        </div>
      </div>
    </nav>
  );
}; 