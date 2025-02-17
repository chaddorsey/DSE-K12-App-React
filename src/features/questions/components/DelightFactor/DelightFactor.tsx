import React from 'react';
import Confetti from 'react-confetti';
import type { DelightFactor as DelightFactorType } from '../../types/delightFactors';
import { AnimationDelight } from './AnimationDelight';
import { AttendeeStats } from './AttendeeStats';
import { NumberAnimation } from './NumberAnimation';
import './DelightFactor.css';

interface Props {
  factor: DelightFactorType;
  onComplete: () => void;
}

export const DelightFactor: React.FC<Props> = ({ factor, onComplete }) => {
  if (factor.type === 'ANIMATION' && factor.content.animation === 'confetti') {
    return (
      <div className="delight-factor">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
          onConfettiComplete={onComplete}
          confettiSource={{
            x: window.innerWidth / 2,
            y: window.innerHeight,
            w: window.innerWidth/2,
            h: window.innerHeight/4
          }}
          initialVelocityY={{ min: -25, max: -35 }}
          gravity={1}
          wind={0.01}
          colors={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']}
        />
      </div>
    );
  }
  
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