import React, { useEffect } from 'react';
import type { AnimationDelightFactor } from '../../types';
import confetti from 'canvas-confetti';

interface AnimationDelightProps {
  factor: AnimationDelightFactor;
  onComplete?: () => void;
}

export const AnimationDelight: React.FC<AnimationDelightProps> = ({
  factor,
  onComplete
}) => {
  useEffect(() => {
    if (factor.animationType === 'CELEBRATION') {
      switch (factor.content.animation) {
        case 'confetti':
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          break;
        // Add other celebration animations here
      }
    }

    const timer = setTimeout(() => {
      onComplete?.();
    }, factor.content.duration);

    return () => clearTimeout(timer);
  }, [factor, onComplete]);

  return <div data-testid="animation-delight" className="animation-container" />;
}; 