import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminMenu.css';

export const AdminMenu = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.includes(path) ? 'active' : '';
  };

  return (
    <nav className="admin-menu">
      <Link 
        to="/admin/questions/playground" 
        className={`menu-item ${isActive('/questions/playground')}`}
      >
        Question Playground
      </Link>
    </nav>
  );
}; 