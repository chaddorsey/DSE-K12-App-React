import { useState, useCallback } from 'react';
import type { Position } from '../types/xy';

interface QuadrantStats {
  'top-left': number;
  'top-right': number;
  'bottom-left': number;
  'bottom-right': number;
}

interface MovementPattern {
  horizontal: number;
  vertical: number;
  diagonal: number;
}

export function useXYStatistics(questionId: string) {
  const [responses, setResponses] = useState<Position[]>([]);
  const [movements, setMovements] = useState<Position[][]>([]);

  const addResponse = useCallback((position: Position) => {
    setResponses(prev => [...prev, position]);
  }, []);

  const addMovement = useCallback((pattern: Position[]) => {
    setMovements(prev => [...prev, pattern]);
  }, []);

  const getQuadrantDistribution = useCallback((): QuadrantStats => {
    return responses.reduce((acc, pos) => {
      const quadrant = 
        pos.y < 0.5
          ? pos.x < 0.5 ? 'bottom-left' : 'bottom-right'
          : pos.x < 0.5 ? 'top-left' : 'top-right';
      
      acc[quadrant]++;
      return acc;
    }, {
      'top-left': 0,
      'top-right': 0,
      'bottom-left': 0,
      'bottom-right': 0
    });
  }, [responses]);

  const getMovementPattern = useCallback((): MovementPattern => {
    return movements.reduce((acc, pattern) => {
      for (let i = 1; i < pattern.length; i++) {
        const dx = Math.abs(pattern[i].x - pattern[i-1].x);
        const dy = Math.abs(pattern[i].y - pattern[i-1].y);
        
        if (dx > 0.1 && dy > 0.1) acc.diagonal++;
        else if (dx > 0.1) acc.horizontal++;
        else if (dy > 0.1) acc.vertical++;
      }
      return acc;
    }, { horizontal: 0, vertical: 0, diagonal: 0 });
  }, [movements]);

  return {
    addResponse,
    addMovement,
    getQuadrantDistribution,
    getMovementPattern
  };
} 