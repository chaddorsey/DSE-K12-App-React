import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useKeyboardNavigation } from '../useKeyboardNavigation';
import { renderHook } from '@testing-library/react-hooks';

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
  const mockContainer = document.createElement('div');
  const items = ['1', '2', '3'].map(id => {
    const item = document.createElement('div');
    item.setAttribute('data-testid', `item-${id}`);
    mockContainer.appendChild(item);
    return item;
  });

  const containerRef = { current: mockContainer };
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    items[0].focus();
  });

  it('handles arrow key navigation', () => {
    const { result } = renderHook(() => useKeyboardNavigation({
      containerRef,
      itemSelector: '[data-testid^="item-"]',
      onSelect: mockOnSelect
    }));

    // Right arrow
    result.current.handleKeyDown({ 
      key: 'ArrowRight', 
      preventDefault: jest.fn() 
    } as unknown as React.KeyboardEvent);
    expect(document.activeElement).toBe(items[1]);

    // Left arrow
    result.current.handleKeyDown({ 
      key: 'ArrowLeft', 
      preventDefault: jest.fn() 
    } as unknown as React.KeyboardEvent);
    expect(document.activeElement).toBe(items[0]);
  });

  it('handles Home and End keys', () => {
    const { result } = renderHook(() => useKeyboardNavigation({
      containerRef,
      itemSelector: '[data-testid^="item-"]',
      onSelect: mockOnSelect
    }));

    // End key
    result.current.handleKeyDown({ 
      key: 'End', 
      preventDefault: jest.fn() 
    } as unknown as React.KeyboardEvent);
    expect(document.activeElement).toBe(items[items.length - 1]);

    // Home key
    result.current.handleKeyDown({ 
      key: 'Home', 
      preventDefault: jest.fn() 
    } as unknown as React.KeyboardEvent);
    expect(document.activeElement).toBe(items[0]);
  });

  it('handles selection with Enter and Space', () => {
    const { result } = renderHook(() => useKeyboardNavigation({
      containerRef,
      itemSelector: '[data-testid^="item-"]',
      onSelect: mockOnSelect
    }));

    // Enter key
    result.current.handleKeyDown({ 
      key: 'Enter', 
      preventDefault: jest.fn() 
    } as unknown as React.KeyboardEvent);
    expect(mockOnSelect).toHaveBeenCalledWith(items[0]);

    // Space key
    result.current.handleKeyDown({ 
      key: ' ', 
      preventDefault: jest.fn() 
    } as unknown as React.KeyboardEvent);
    expect(mockOnSelect).toHaveBeenCalledWith(items[0]);
  });

  it('wraps around when navigating past boundaries', () => {
    const { result } = renderHook(() => useKeyboardNavigation({
      containerRef,
      itemSelector: '[data-testid^="item-"]',
      onSelect: mockOnSelect
    }));

    // Navigate past end
    items[items.length - 1].focus();
    result.current.handleKeyDown({ 
      key: 'ArrowRight', 
      preventDefault: jest.fn() 
    } as unknown as React.KeyboardEvent);
    expect(document.activeElement).toBe(items[0]);

    // Navigate before start
    items[0].focus();
    result.current.handleKeyDown({ 
      key: 'ArrowLeft', 
      preventDefault: jest.fn() 
    } as unknown as React.KeyboardEvent);
    expect(document.activeElement).toBe(items[items.length - 1]);
  });

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