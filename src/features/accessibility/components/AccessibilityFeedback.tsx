import React, { useState, useEffect } from 'react';
import './AccessibilityFeedback.css';

interface Props {
  message: string;
}

export const AccessibilityFeedback: React.FC<Props> = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, [message]);

  if (!visible) return null;

  return (
    <div 
      className="accessibility-feedback" 
      role="status" 
      aria-live="polite"
    >
      {message}
    </div>
  );
}; 