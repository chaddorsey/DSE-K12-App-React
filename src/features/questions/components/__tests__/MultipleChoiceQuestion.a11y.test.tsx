import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MultipleChoiceQuestion } from '../MultipleChoiceQuestion';
import { renderWithA11y } from '../../../../test-utils/accessibility';
import { getComputedStyle } from 'window-getcomputedstyle';

expect.extend(toHaveNoViolations);

describe('MultipleChoiceQuestion Accessibility', () => {
  const mockQuestion = {
    id: 'mc1',
    type: 'MULTIPLE_CHOICE' as const,
    prompt: 'What is your favorite color?',
    options: ['Red', 'Blue', 'Green', 'Yellow']
  };

  describe('Screen Reader Announcements', () => {
    it('announces question prompt and options count', () => {
      render(
        <MultipleChoiceQuestion
          question={mockQuestion}
          onAnswer={jest.fn()}
        />
      );

      // Check for proper ARIA labeling
      const radiogroup = screen.getByRole('radiogroup');
      expect(radiogroup).toHaveAttribute(
        'aria-labelledby',
        `question-${mockQuestion.id}-prompt`
      );
      
      // Check for options count announcement
      const description = screen.getByText(
        `Select one of the following ${mockQuestion.options.length} options`
      );
      expect(description).toHaveClass('sr-only');
      expect(radiogroup).toHaveAttribute(
        'aria-describedby',
        `question-${mockQuestion.id}-description`
      );
    });

    it('announces option selection state', () => {
      render(
        <MultipleChoiceQuestion
          question={mockQuestion}
          onAnswer={jest.fn()}
        />
      );

      const options = screen.getAllByRole('radio');
      options.forEach(option => {
        expect(option).toHaveAttribute('aria-checked', 'false');
      });
    });

    it('announces correct/incorrect state in quiz mode', () => {
      render(
        <MultipleChoiceQuestion
          question={mockQuestion}
          onAnswer={jest.fn()}
          correctAnswer="Blue"
        />
      );

      const options = screen.getAllByRole('radio');
      const blueOption = options[1]; // Blue is second option

      expect(blueOption).toHaveAttribute('aria-label', expect.stringContaining('Blue'));
      expect(blueOption).toHaveAttribute('aria-describedby', expect.stringContaining('status'));
    });
  });

  describe('Color Contrast', () => {
    const getContrastRatio = (color1: string, color2: string) => {
      // Convert colors to relative luminance and calculate contrast ratio
      const getLuminance = (r: number, g: number, b: number) => {
        const [rs, gs, bs] = [r, g, b].map(c => {
          c = c / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      };

      const getRGB = (color: string) => {
        const hex = color.replace('#', '');
        return {
          r: parseInt(hex.substr(0, 2), 16),
          g: parseInt(hex.substr(2, 2), 16),
          b: parseInt(hex.substr(4, 2), 16)
        };
      };

      const l1 = getLuminance(getRGB(color1).r, getRGB(color1).g, getRGB(color1).b);
      const l2 = getLuminance(getRGB(color2).r, getRGB(color2).g, getRGB(color2).b);

      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    };

    it('meets WCAG AA contrast requirements in normal mode', () => {
      render(
        <MultipleChoiceQuestion
          question={mockQuestion}
          onAnswer={jest.fn()}
        />
      );

      const option = screen.getAllByRole('radio')[0];
      const styles = getComputedStyle(option);
      
      // Text vs Background
      const textColor = styles.color;
      const bgColor = styles.backgroundColor;
      const contrastRatio = getContrastRatio(textColor, bgColor);
      
      // WCAG AA requires 4.5:1 for normal text
      expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
    });

    it('meets WCAG AA contrast requirements in high contrast mode', () => {
      render(
        <MultipleChoiceQuestion
          question={mockQuestion}
          onAnswer={jest.fn()}
          highContrast={true}
        />
      );

      const option = screen.getAllByRole('radio')[0];
      const styles = getComputedStyle(option);
      
      // Text vs Background in high contrast mode
      const textColor = styles.color;
      const bgColor = styles.backgroundColor;
      const contrastRatio = getContrastRatio(textColor, bgColor);
      
      // High contrast should exceed normal requirements
      expect(contrastRatio).toBeGreaterThanOrEqual(7);
    });

    it('maintains sufficient contrast for focus indicators', () => {
      render(
        <MultipleChoiceQuestion
          question={mockQuestion}
          onAnswer={jest.fn()}
        />
      );

      const option = screen.getAllByRole('radio')[0];
      option.focus();
      const styles = getComputedStyle(option);
      
      // Focus outline vs Background
      const outlineColor = styles.outlineColor;
      const bgColor = styles.backgroundColor;
      const contrastRatio = getContrastRatio(outlineColor, bgColor);
      
      // Focus indicators should be highly visible
      expect(contrastRatio).toBeGreaterThanOrEqual(3);
    });
  });
}); 