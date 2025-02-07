import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ShareSheet } from '../ShareSheet';
import { useShareMethods } from '../../../hooks/useShareMethods';

jest.mock('../../../hooks/useShareMethods');

describe('ShareSheet Integration', () => {
  const mockContent = {
    type: 'url' as const,
    url: 'https://example.com',
    title: 'Example'
  };

  it('applies correct styles to methods grid', () => {
    const { container } = render(
      <ShareSheet 
        isOpen={true}
        content={mockContent}
        onClose={jest.fn()}
      />
    );

    const methodsGrid = container.querySelector('.share-sheet__methods');
    const computedStyle = window.getComputedStyle(methodsGrid!);
    
    expect(computedStyle.display).toBe('grid');
    expect(computedStyle.gap).toBe('1rem');
  });

  it('shows hover state on method buttons', () => {
    const { container } = render(
      <ShareSheet 
        isOpen={true}
        content={mockContent}
        onClose={jest.fn()}
      />
    );

    const methodButton = container.querySelector('.share-sheet__method');
    fireEvent.mouseOver(methodButton!);
    
    const computedStyle = window.getComputedStyle(methodButton!);
    expect(computedStyle.backgroundColor).toBe('rgb(245, 245, 245)');
  });
}); 