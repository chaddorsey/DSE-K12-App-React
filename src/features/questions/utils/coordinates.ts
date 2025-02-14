import type { Position } from '../types/xy';

interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Normalizes raw pixel coordinates to 0-1 range and ensures they stay within bounds
 */
export function normalizeCoordinates(
  clientX: number,
  clientY: number,
  rect: Rect
): Position {
  const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
  return { x, y };
}

/**
 * Converts normalized coordinates back to pixel values
 */
export function denormalizeCoordinates(
  position: Position,
  rect: Rect
): { clientX: number; clientY: number } {
  return {
    clientX: position.x * rect.width + rect.left,
    clientY: position.y * rect.height + rect.top
  };
}

/**
 * Validates that coordinates are within the normalized range
 */
export function validateCoordinates(position: Position): boolean {
  return (
    position.x >= 0 &&
    position.x <= 1 &&
    position.y >= 0 &&
    position.y <= 1
  );
} 