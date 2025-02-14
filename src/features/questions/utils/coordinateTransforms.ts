import type { Position } from '../types/xy';

export interface Range {
  min: number;
  max: number;
}

export interface CoordinateSystem {
  xRange: Range;
  yRange: Range;
  type: 'cartesian' | 'polar' | 'quadrant';
}

/**
 * Transforms normalized coordinates (0-1) to the target coordinate system
 */
export function transformCoordinates(
  normalizedPos: Position,
  targetSystem: CoordinateSystem
): Position {
  switch (targetSystem.type) {
    case 'cartesian':
      return {
        x: scaleToRange(normalizedPos.x, targetSystem.xRange),
        y: scaleToRange(normalizedPos.y, targetSystem.yRange)
      };
    
    case 'polar':
      return {
        x: normalizedPos.x * 2 * Math.PI, // angle in radians
        y: normalizedPos.y               // radius (0-1)
      };
    
    case 'quadrant':
      return {
        x: Math.floor(normalizedPos.x * 2), // 0 or 1
        y: Math.floor(normalizedPos.y * 2)  // 0 or 1
      };
    
    default:
      return normalizedPos;
  }
}

/**
 * Transforms coordinates from target system back to normalized (0-1)
 */
export function untransformCoordinates(
  pos: Position,
  sourceSystem: CoordinateSystem
): Position {
  switch (sourceSystem.type) {
    case 'cartesian':
      return {
        x: unscaleFromRange(pos.x, sourceSystem.xRange),
        y: unscaleFromRange(pos.y, sourceSystem.yRange)
      };
    
    case 'polar':
      return {
        x: pos.x / (2 * Math.PI),
        y: pos.y
      };
    
    case 'quadrant':
      return {
        x: (pos.x + 0.5) / 2,
        y: (pos.y + 0.5) / 2
      };
    
    default:
      return pos;
  }
}

// Helper functions
function scaleToRange(normalized: number, range: Range): number {
  return normalized * (range.max - range.min) + range.min;
}

function unscaleFromRange(value: number, range: Range): number {
  return (value - range.min) / (range.max - range.min);
} 