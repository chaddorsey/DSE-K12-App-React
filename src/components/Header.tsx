import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';
import { UserProfileButton } from '../features/auth/components/UserProfileButton';
import { NAV_LINKS } from '../features/navigation/types';
import './Header.css';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClearStorage = () => {
    try {
      localStorage.removeItem('questionEdits');
      console.log('Cleared question edits from localStorage');
      // Force reload to reset state
      window.location.reload();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  const handlePhotoUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: '/demo/photo-upload' } });
      return;
    }
    navigate('/demo/photo-upload');
  };

  const allowedLinks = NAV_LINKS.filter(link => {
    if (!user) return false;
    const hasRole = link.allowedRoles.includes(user.role);
    const meetsVerification = !link.requiresVerification || user.emailVerified;
    return hasRole && meetsVerification;
  });

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="/logo.png" alt="Logo" />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {allowedLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium
                    ${location.pathname === to 
                      ? 'border-b-2 border-indigo-500 text-gray-900'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link 
                to="/demo/photo-upload" 
                onClick={handlePhotoUploadClick}
              >
                Photo Upload Demo
              </Link>
            </div>
            <div className="flex-shrink-0">
              {user ? (
                <>
                  <Link to="/dashboard">Dashboard</Link>
                  <UserProfileButton />
                  <button 
                    onClick={() => signOut()}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login">Sign In</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header; 