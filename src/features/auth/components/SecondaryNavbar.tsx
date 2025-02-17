import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const SecondaryNavbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/onboarding', label: 'Answer Questions' },
    { path: '/questions/playground', label: 'Question Playground' },
  ];

  return (
    <nav className="fixed top-28 left-0 w-full h-12 bg-white shadow-sm z-40">
      <div className="h-full px-4 mx-auto max-w-7xl flex items-center">
        <div className="flex space-x-6">
          {navLinks.map(({ path, label }) => (
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