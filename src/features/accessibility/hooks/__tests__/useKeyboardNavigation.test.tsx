import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useKeyboardNavigation } from '../useKeyboardNavigation';

const TestComponent: React.FC<{
  vertical?: boolean;
  horizontal?: boolean;
  wrap?: boolean;
  onEscape?: () => void;
}> = ({ vertical, horizontal, wrap, onEscape }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useKeyboardNavigation({
    containerRef,
    selector: '[role="option"]',
    vertical,
    horizontal,
    wrap,
    onEscape
  });

  return (
    <div ref={containerRef}>
      <div role="option" tabIndex={0}>Option 1</div>
      <div role="option" tabIndex={0}>Option 2</div>
      <div role="option" tabIndex={0}>Option 3</div>
    </div>
  );
};

describe('useKeyboardNavigation', () => {
  it('handles vertical navigation', () => {
    render(<TestComponent vertical />);
    const options = screen.getAllByRole('option');
    options[0].focus();

    // Navigate down
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
    expect(options[1]).toHaveFocus();

    // Navigate up
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowUp' });
    expect(options[0]).toHaveFocus();
  });

  it('handles horizontal navigation', () => {
    render(<TestComponent horizontal />);
    const options = screen.getAllByRole('option');
    options[0].focus();

    // Navigate right
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
    expect(options[1]).toHaveFocus();

    // Navigate left
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowLeft' });
    expect(options[0]).toHaveFocus();
  });

  it('wraps navigation when enabled', () => {
    render(<TestComponent vertical wrap />);
    const options = screen.getAllByRole('option');
    options[0].focus();

    // Navigate up from first element
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowUp' });
    expect(options[2]).toHaveFocus();

    // Navigate down from last element
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
    expect(options[0]).toHaveFocus();
  });

  it('does not wrap navigation when disabled', () => {
    render(<TestComponent vertical wrap={false} />);
    const options = screen.getAllByRole('option');
    options[0].focus();

    // Try to navigate up from first element
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowUp' });
    expect(options[0]).toHaveFocus();

    // Navigate to last element and try to go further
    options[2].focus();
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
    expect(options[2]).toHaveFocus();
  });

  it('handles Home and End keys', () => {
    render(<TestComponent />);
    const options = screen.getAllByRole('option');
    options[1].focus();

    // Navigate to first element
    fireEvent.keyDown(document.activeElement!, { key: 'Home' });
    expect(options[0]).toHaveFocus();

    // Navigate to last element
    fireEvent.keyDown(document.activeElement!, { key: 'End' });
    expect(options[2]).toHaveFocus();
  });

  it('calls onEscape when Escape key is pressed', () => {
    const handleEscape = jest.fn();
    render(<TestComponent onEscape={handleEscape} />);
    const options = screen.getAllByRole('option');
    options[0].focus();

    fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
    expect(handleEscape).toHaveBeenCalled();
  });

  it('maintains focus index across navigation', () => {
    render(<TestComponent vertical />);
    const options = screen.getAllByRole('option');
    options[0].focus();

    // Navigate down twice
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
    expect(options[2]).toHaveFocus();

    // Navigate up once
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowUp' });
    expect(options[1]).toHaveFocus();
  });

  it('updates focus index when focus changes outside navigation', () => {
    render(<TestComponent vertical />);
    const options = screen.getAllByRole('option');
    
    // Focus second option directly
    options[1].focus();
    
    // Navigate down should go to third option
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
    expect(options[2]).toHaveFocus();
    
    // Navigate up should go back to second option
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowUp' });
    expect(options[1]).toHaveFocus();
  });
}); 