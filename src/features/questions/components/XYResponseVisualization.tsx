import React, { useMemo } from 'react';
import { useResponseUpdates } from '../hooks/useResponseUpdates';
import type { XYResponseValue } from '../types/response';
import './XYResponseVisualization.css';

interface Props {
  questionId: string;
  width?: number;
  height?: number;
}

export const XYResponseVisualization: React.FC<Props> = ({
  questionId,
  width = 400,
  height = 400
}) => {
  const { responses, loading, error } = useResponseUpdates(questionId);

  const { points, density } = useMemo(() => {
    if (!responses.length) return { points: [], density: [] };

    const xyResponses = responses.filter(
      r => r.value.type === 'XY'
    ) as Array<{ id: string; value: XYResponseValue }>;

    // Calculate density map (10x10 grid)
    const gridSize = 10;
    const densityMap = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => 0)
    );

    xyResponses.forEach(response => {
      const { x, y } = response.value.coordinates;
      const gridX = Math.floor(x * gridSize);
      const gridY = Math.floor(y * gridSize);
      densityMap[gridY][gridX]++;
    });

    return {
      points: xyResponses,
      density: densityMap
    };
  }, [responses]);

  if (loading) {
    return <div data-testid="visualization-loading">Loading responses...</div>;
  }

  if (error) {
    return <div className="error-message">{error.message}</div>;
  }

  return (
    <div 
      className="xy-visualization"
      style={{ width, height }}
      data-testid="response-heatmap"
    >
      <div className="density-overlay" data-testid="density-overlay">
        {density.map((row, y) => (
          <div key={y} className="density-row">
            {row.map((value, x) => (
              <div
                key={`${x}-${y}`}
                className="density-cell"
                style={{
                  opacity: value / Math.max(...density.flat(), 1)
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {points.map(response => (
        <div
          key={response.id}
          className="response-point"
          data-testid={`response-point-${response.id}`}
          style={{
            left: `${response.value.coordinates.x * 100}%`,
            top: `${response.value.coordinates.y * 100}%`
          }}
        />
      ))}
    </div>
  );
}; 