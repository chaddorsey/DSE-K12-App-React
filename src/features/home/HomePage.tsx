import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="
          font-display font-bold uppercase tracking-wider
          text-2xl md:text-3xl lg:text-4xl
          text-primary mb-6
        ">
          Welcome to DSE K-12 Connections
        </h1>
        
        <p className="
          font-body text-base md:text-lg
          text-primary-light
          max-w-2xl mx-auto mb-8
        ">
          {user 
            ? 'Get started by exploring our features' 
            : 'Please sign in to get started'
          }
        </p>

        <div className="flex justify-center">
          {!user ? (
            <Link
              to="/login"
              className="
                font-display font-bold uppercase tracking-wider
                px-8 py-3 text-sm
                bg-primary text-white
                hover:bg-primary-light
                transition-colors duration-200
                rounded-md
              "
            >
              Sign In
            </Link>
          ) : (
            <Link
              to="/connections"
              className="
                font-display font-bold uppercase tracking-wider
                px-8 py-3 text-sm
                bg-primary text-white
                hover:bg-primary-light
                transition-colors duration-200
                rounded-md
              "
            >
              View Connections
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}; 