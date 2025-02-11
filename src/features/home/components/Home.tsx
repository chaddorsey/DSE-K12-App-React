import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Welcome to DSET</h1>
      <div className="demo-links">
        <Link to="/onboarding" className="demo-link">
          <h2>Start Onboarding</h2>
          <p>Take a quick quiz to help us get to know you</p>
        </Link>
        <Link to="/connections" className="demo-link">
          <h2>Connections Demo</h2>
          <p>Try our progressive recognition interface</p>
        </Link>
        {/* ... other demo links ... */}
      </div>
    </div>
  );
}; 