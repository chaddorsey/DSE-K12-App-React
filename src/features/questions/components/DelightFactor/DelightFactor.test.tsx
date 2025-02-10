import React from 'react';
import { render, screen } from '@testing-library/react';
import { DelightFactor } from './DelightFactor';
import type { AnimationDelightFactor } from '../../types';

describe('DelightFactor', () => {
  const mockAnimationFactor: AnimationDelightFactor = {
    id: 'celebration1',
    type: 'ANIMATION',
    timing: 'POST_ANSWER',
    trigger: 'ON_CORRECT',
    animationType: 'CELEBRATION',
    content: {
      animation: 'confetti',
      duration: 2000
    },
    questionTypes: ['MULTIPLE_CHOICE']
  };

  it('renders animation delight factor', () => {
    render(
      <DelightFactor
        factor={mockAnimationFactor}
        onComplete={jest.fn()}
      />
    );
    
    expect(screen.getByTestId('animation-delight')).toBeInTheDocument();
  });
}); 