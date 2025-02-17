import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export const SecondaryNavbar = () => {
  const { userClaims } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const adminLinks = [
    { path: '/admin/questions/playground', label: 'Question Playground' },
    { path: '/dashboard', label: 'Analytics Dashboard' },
  ];

  // Only render if user has admin/manager role
  if (!userClaims?.role || !['admin', 'manager'].includes(userClaims.role)) {
    return null;
  }

  return (
    <nav className="fixed top-28 left-0 w-full h-12 bg-white shadow-sm z-40">
      <div className="h-full px-4 mx-auto max-w-7xl flex items-center">
        <div className="flex space-x-6">
          {adminLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`
                font-display font-bold uppercase tracking-wider text-xs
                px-3 py-2 transition-colors duration-200 whitespace-nowrap
                ${isActive(path) 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-primary-light hover:text-primary'}
              `}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}; 