import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BaseSlider } from '../BaseSlider';

describe('BaseSlider', () => {
  const defaultProps = {
    id: 'test-slider',
    min: 0,
    max: 100,
    onChange: jest.fn(),
    onComplete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default value', () => {
    render(<BaseSlider {...defaultProps} />);
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveValue('50');
  });

  it('updates value on drag', () => {
    render(<BaseSlider {...defaultProps} />);
    const slider = screen.getByRole('slider');
    
    fireEvent.change(slider, { target: { value: '75' } });
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(75);
  });

  it('calls onComplete when dragging ends', () => {
    render(<BaseSlider {...defaultProps} />);
    const slider = screen.getByRole('slider');
    
    fireEvent.mouseDown(slider);
    fireEvent.change(slider, { target: { value: '75' } });
    fireEvent.mouseUp(slider);
    
    expect(defaultProps.onComplete).toHaveBeenCalled();
  });

  it('respects min and max values', () => {
    render(<BaseSlider {...defaultProps} min={20} max={80} />);
    const slider = screen.getByRole('slider');
    
    fireEvent.change(slider, { target: { value: '10' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith(20);
    
    fireEvent.change(slider, { target: { value: '90' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith(80);
  });

  it('snaps to steps when provided', () => {
    render(<BaseSlider {...defaultProps} step={10} />);
    const slider = screen.getByRole('slider');
    
    fireEvent.change(slider, { target: { value: '77' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith(80);
  });

  describe('touch interactions', () => {
    it('handles touch start and end events', () => {
      render(<BaseSlider {...defaultProps} />);
      const slider = screen.getByRole('slider');
      
      fireEvent.touchStart(slider);
      expect(slider).toHaveAttribute('data-dragging', 'true');
      
      fireEvent.touchEnd(slider);
      expect(slider).not.toHaveAttribute('data-dragging');
      expect(defaultProps.onComplete).toHaveBeenCalled();
    });

    it('handles touch move events', () => {
      render(<BaseSlider {...defaultProps} />);
      const slider = screen.getByRole('slider');
      
      // Simulate touch move
      fireEvent.touchStart(slider);
      fireEvent.touchMove(slider, {
        touches: [{ clientX: 75, clientY: 0 }]
      });
      
      expect(defaultProps.onChange).toHaveBeenCalled();
    });

    it('prevents default touch behavior to avoid scrolling', () => {
      render(<BaseSlider {...defaultProps} />);
      const slider = screen.getByRole('slider');
      const preventDefault = jest.fn();
      
      fireEvent.touchMove(slider, {
        preventDefault,
        touches: [{ clientX: 75, clientY: 0 }]
      });
      
      expect(preventDefault).toHaveBeenCalled();
    });

    it('handles touch cancellation', () => {
      render(<BaseSlider {...defaultProps} />);
      const slider = screen.getByRole('slider');
      
      fireEvent.touchStart(slider);
      fireEvent.touchCancel(slider);
      
      expect(slider).not.toHaveAttribute('data-dragging');
      expect(defaultProps.onComplete).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('supports keyboard navigation', () => {
      render(<BaseSlider {...defaultProps} />);
      const slider = screen.getByRole('slider');
      
      fireEvent.keyDown(slider, { key: 'ArrowRight' });
      expect(defaultProps.onChange).toHaveBeenCalledWith(51);
      
      fireEvent.keyDown(slider, { key: 'ArrowLeft' });
      expect(defaultProps.onChange).toHaveBeenCalledWith(50);
    });

    it('provides correct ARIA attributes', () => {
      render(<BaseSlider {...defaultProps} />);
      const slider = screen.getByRole('slider');
      
      expect(slider).toHaveAttribute('aria-valuemin', '0');
      expect(slider).toHaveAttribute('aria-valuemax', '100');
      expect(slider).toHaveAttribute('aria-valuenow', '50');
    });
  });
}); 