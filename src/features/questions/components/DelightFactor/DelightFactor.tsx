import React from 'react';
import type { DelightFactor as DelightFactorType } from '../../types';
import { AnimationDelight } from './AnimationDelight';
import { AttendeeStats } from './AttendeeStats';
import { NumberAnimation } from './NumberAnimation';
import './DelightFactor.css';

interface Props {
  factor: DelightFactorType;
  onComplete?: () => void;
}

export const DelightFactor: React.FC<Props> = ({ factor, onComplete }) => {
  switch (factor.type) {
    case 'ANIMATION':
      return <AnimationDelight factor={factor} onComplete={onComplete} />;
    case 'STATS':
      return <AttendeeStats factor={factor} onComplete={onComplete} />;
    case 'NUMBER_ANIMATION':
      return <NumberAnimation factor={factor} onComplete={onComplete} />;
    default:
      return null;
  }
}; 