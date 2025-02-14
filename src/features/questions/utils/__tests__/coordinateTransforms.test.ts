import {
  transformCoordinates,
  untransformCoordinates,
  type CoordinateSystem
} from '../coordinateTransforms';

describe('Coordinate Transformations', () => {
  describe('Cartesian System', () => {
    const cartesianSystem: CoordinateSystem = {
      type: 'cartesian',
      xRange: { min: -5, max: 5 },
      yRange: { min: -5, max: 5 }
    };

    it('should transform to custom ranges', () => {
      const normalized = { x: 0.5, y: 0.5 };
      const result = transformCoordinates(normalized, cartesianSystem);
      expect(result).toEqual({ x: 0, y: 0 }); // Center point
    });

    it('should round-trip correctly', () => {
      const original = { x: 0.75, y: 0.25 };
      const transformed = transformCoordinates(original, cartesianSystem);
      const roundTrip = untransformCoordinates(transformed, cartesianSystem);
      expect(roundTrip).toEqual(original);
    });
  });

  describe('Polar System', () => {
    const polarSystem: CoordinateSystem = {
      type: 'polar',
      xRange: { min: 0, max: 2 * Math.PI },
      yRange: { min: 0, max: 1 }
    };

    it('should transform to polar coordinates', () => {
      const normalized = { x: 0.5, y: 1 };
      const result = transformCoordinates(normalized, polarSystem);
      expect(result.x).toBeCloseTo(Math.PI); // Angle
      expect(result.y).toBe(1);              // Radius
    });
  });

  describe('Quadrant System', () => {
    const quadrantSystem: CoordinateSystem = {
      type: 'quadrant',
      xRange: { min: 0, max: 1 },
      yRange: { min: 0, max: 1 }
    };

    it('should transform to quadrants', () => {
      const positions = [
        { input: { x: 0.2, y: 0.2 }, expected: { x: 0, y: 0 } },
        { input: { x: 0.8, y: 0.2 }, expected: { x: 1, y: 0 } },
        { input: { x: 0.2, y: 0.8 }, expected: { x: 0, y: 1 } },
        { input: { x: 0.8, y: 0.8 }, expected: { x: 1, y: 1 } }
      ];

      positions.forEach(({ input, expected }) => {
        const result = transformCoordinates(input, quadrantSystem);
        expect(result).toEqual(expected);
      });
    });
  });
}); 