import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/logo.png'; // Add your logo file here

interface LogoProps {
  className?: string;
  linkClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '', linkClassName = '' }) => {
  return (
    <Link 
      to="/" 
      className={`flex items-center hover:opacity-90 transition-opacity h-full ${linkClassName}`}
      aria-label="DSE K-12 Connections Home"
    >
      <img
        src={logoImage}
        alt="DSE K-12 Connections"
        className={`h-8 w-auto md:h-10 object-contain py-1 ${className}`}
        loading="eager"
        priority="high"
      />
    </Link>
  );
}; 