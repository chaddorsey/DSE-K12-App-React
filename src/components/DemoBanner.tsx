import React from 'react';
import { Link } from 'react-router-dom';
import './DemoBanner.css';

export const DemoBanner: React.FC = () => {
  return (
    <div className="demo-banner">
      🎯 Try out our new 
      <Link to="/question-demo">Interactive Question Types Demo</Link>
      <span className="badge">New</span>
    </div>
  );
}; 