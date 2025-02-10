import React from 'react';
import type { AttendeeStatsDelightFactor } from '../../types';
import './DelightFactor.css';

interface Props {
  factor: AttendeeStatsDelightFactor;
  onComplete?: () => void;
}

export const AttendeeStats: React.FC<Props> = ({ factor, onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="stats-delight" data-testid="stats-delight">
      <div className="stats-message">
        {factor.content.message}
      </div>
    </div>
  );
}; 