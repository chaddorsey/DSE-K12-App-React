import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { Avatar } from './Avatar';

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-[#23235F] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-futura text-xl font-bold tracking-tight">
          DSET
        </Link>
        
        <div className="flex items-center space-x-6">
          <div className="nav-links space-x-4">
            <Link to="/questions/playground" className="text-[#B6C3E5] hover:text-white transition-colors uppercase tracking-wide text-sm font-futura font-bold">
              Question Playground
            </Link>
            <Link to="/quiz" className="text-[#B6C3E5] hover:text-white transition-colors uppercase tracking-wide text-sm font-futura font-bold">
              Quiz
            </Link>
            <Link to="/onboarding-test" className="text-[#B6C3E5] hover:text-white transition-colors uppercase tracking-wide text-sm font-futura font-bold">
              Onboarding Test
            </Link>
          </div>

          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar user={user} size="sm" />
                <span className="text-[#B6C3E5] font-dm-sans">{user.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="text-[#B6C3E5] hover:text-white transition-colors uppercase tracking-wide text-sm font-futura font-bold"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}; 