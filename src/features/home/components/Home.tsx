import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Welcome to DSET</h1>
      <div className="demo-links">
        <Link to="/onboarding" className="demo-link">
          <h2>Onboarding Demo</h2>
          <p>Try out the onboarding flow</p>
        </Link>
        <Link to="/question-playground" className="demo-link">
          <h2>Question Playground</h2>
          <p>Try out different question types</p>
        </Link>
        <Link to="/connections" className="demo-link">
          <h2>Connections Demo</h2>
          <p>Try our progressive recognition interface</p>
        </Link>
        <Link to="/question-editor" className="demo-link">
          <h2>Question Editor Demo</h2>
          <p>Create and edit questions</p>
        </Link>
        {/* ... other demo links ... */}
      </div>
    </div>
  );
}; 