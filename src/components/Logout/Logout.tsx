import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';
import './Logout.css';

export const Logout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  usePerformanceMonitoring('Logout');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <button 
      onClick={handleLogout}
      className="logout-button"
      aria-label="Logout"
    >
      Logout
    </button>
  );
}; 