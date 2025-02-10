import React from 'react';
import type { DelightFactor as DelightFactorType } from '../../types';
import { AnimationDelight } from './AnimationDelight';
import './DelightFactor.css';

interface DelightFactorProps {
  factor: DelightFactorType;
  onComplete?: () => void;
}

export const DelightFactor: React.FC<DelightFactorProps> = ({
  factor,
  onComplete
}) => {
  switch (factor.type) {
    case 'ANIMATION':
      return (
        <AnimationDelight
          factor={factor}
          onComplete={onComplete}
        />
      );
    default:
      return null;
  }
}; 