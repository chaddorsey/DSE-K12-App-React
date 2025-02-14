import { 
  normalizeCoordinates, 
  denormalizeCoordinates,
  validateCoordinates 
} from '../coordinates';

describe('Coordinate Utilities', () => {
  const testRect = {
    left: 100,
    top: 100,
    width: 200,
    height: 200
  };

  describe('normalizeCoordinates', () => {
    it('should normalize center coordinates correctly', () => {
      const result = normalizeCoordinates(200, 200, testRect);
      expect(result).toEqual({ x: 0.5, y: 0.5 });
    });

    it('should clamp coordinates to valid range', () => {
      const outside = normalizeCoordinates(0, 400, testRect);
      expect(outside).toEqual({ x: 0, y: 1 });
    });

    it('should handle edge cases', () => {
      const topLeft = normalizeCoordinates(100, 100, testRect);
      const bottomRight = normalizeCoordinates(300, 300, testRect);

      expect(topLeft).toEqual({ x: 0, y: 0 });
      expect(bottomRight).toEqual({ x: 1, y: 1 });
    });
  });

  describe('denormalizeCoordinates', () => {
    it('should convert normalized coordinates to pixels', () => {
      const result = denormalizeCoordinates({ x: 0.5, y: 0.5 }, testRect);
      expect(result).toEqual({ clientX: 200, clientY: 200 });
    });

    it('should handle edge cases', () => {
      const topLeft = denormalizeCoordinates({ x: 0, y: 0 }, testRect);
      const bottomRight = denormalizeCoordinates({ x: 1, y: 1 }, testRect);

      expect(topLeft).toEqual({ clientX: 100, clientY: 100 });
      expect(bottomRight).toEqual({ clientX: 300, clientY: 300 });
    });
  });

  describe('validateCoordinates', () => {
    it('should validate coordinates within range', () => {
      expect(validateCoordinates({ x: 0.5, y: 0.5 })).toBe(true);
      expect(validateCoordinates({ x: 0, y: 0 })).toBe(true);
      expect(validateCoordinates({ x: 1, y: 1 })).toBe(true);
    });

    it('should reject coordinates outside range', () => {
      expect(validateCoordinates({ x: -0.1, y: 0.5 })).toBe(false);
      expect(validateCoordinates({ x: 0.5, y: 1.1 })).toBe(false);
      expect(validateCoordinates({ x: 1.5, y: 1.5 })).toBe(false);
    });
  });
}); 