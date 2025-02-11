import { renderHook, act } from '@testing-library/react-hooks';
import { useProgressiveFocus } from '../useProgressiveFocus';

describe('useProgressiveFocus', () => {
  const mockRef = {
    current: document.createElement('div')
  };

  beforeEach(() => {
    // Setup mock grid structure
    mockRef.current.innerHTML = `
      <div role="gridcell" data-user-id="1" tabindex="0">User 1</div>
      <div role="gridcell" data-user-id="2" tabindex="0">User 2</div>
      <div role="gridcell" data-user-id="3" tabindex="0">User 3</div>
    `;
    document.body.appendChild(mockRef.current);
  });

  afterEach(() => {
    document.body.removeChild(mockRef.current);
  });

  it('maintains focus on level change', () => {
    const { result } = renderHook(() => useProgressiveFocus(mockRef));

    // Focus first cell
    act(() => {
      const firstCell = mockRef.current.querySelector('[data-user-id="1"]');
      firstCell?.focus();
      result.current.saveFocusedElement();
    });

    // Simulate level change
    act(() => {
      result.current.restoreFocus();
    });

    expect(document.activeElement).toBe(
      mockRef.current.querySelector('[data-user-id="1"]')
    );
  });

  it('handles focus when selected element is removed', () => {
    const { result } = renderHook(() => useProgressiveFocus(mockRef));

    // Focus second cell
    act(() => {
      const secondCell = mockRef.current.querySelector('[data-user-id="2"]');
      secondCell?.focus();
      result.current.saveFocusedElement();
    });

    // Remove focused element
    act(() => {
      const secondCell = mockRef.current.querySelector('[data-user-id="2"]');
      secondCell?.remove();
      result.current.restoreFocus();
    });

    // Should focus next available element
    expect(document.activeElement).toBe(
      mockRef.current.querySelector('[data-user-id="3"]')
    );
  });

  it('maintains focus position in grid after reordering', () => {
    const { result } = renderHook(() => useProgressiveFocus(mockRef));

    // Focus middle element
    act(() => {
      const secondCell = mockRef.current.querySelector('[data-user-id="2"]');
      secondCell?.focus();
      result.current.saveFocusedElement();
    });

    // Simulate reordering by moving elements
    act(() => {
      const grid = mockRef.current;
      const cells = Array.from(grid.children);
      grid.appendChild(cells[0]); // Move first to last
      result.current.restoreFocus();
    });

    // Should maintain relative position (middle)
    expect(document.activeElement).toBe(
      mockRef.current.querySelector('[data-user-id="2"]')
    );
  });
});