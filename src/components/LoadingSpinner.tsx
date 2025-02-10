import React from 'react';
import './LoadingSpinner.css';

export const LoadingSpinner: React.FC = () => (
  <div className="loading-spinner-container">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
); 