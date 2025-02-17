import React from 'react';
import { Navbar } from '../features/auth/components/Navbar';
import { SecondaryNavbar } from '../features/auth/components/SecondaryNavbar';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <Navbar />
        <SecondaryNavbar />
      </div>
    </header>
  );
};

export default Header; 