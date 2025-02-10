import React, { useEffect, useState } from 'react';
import type { NumberAnimationDelightFactor } from '../../types';
import './DelightFactor.css';

interface Props {
  factor: NumberAnimationDelightFactor;
  onComplete?: () => void;
}

export const NumberAnimation: React.FC<Props> = ({ factor, onComplete }) => {
  const [scale, setScale] = useState(0.35);
  const [opacity, setOpacity] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const duration = factor.content.duration;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setScale(0.35 + (progress * 1.65)); // 0.35 to 2.0
      setOpacity(1 - progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
        // Wait for fade to complete before triggering onComplete
        setTimeout(() => {
          onComplete?.();
        }, 100);
      }
    };

    requestAnimationFrame(animate);
  }, [factor.content.duration, onComplete]);

  if (isComplete && opacity <= 0) return null;

  return (
    <div 
      className="number-animation"
      data-testid="number-animation"
      style={{
        transform: `scale(${scale})`,
        opacity,
        color: factor.content.color,
        fontSize: '4rem',
        fontFamily: '"Rubik", -apple-system, BlinkMacSystemFont, sans-serif',
        fontWeight: '700',
        transition: 'transform 0.05s linear'
      }}
    >
      {factor.content.number}
    </div>
  );
}; 