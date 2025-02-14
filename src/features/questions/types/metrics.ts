interface ResponseMetrics {
  questionId: string;
  totalResponses: number;
  lastUpdated: Date;
  
  // For XY Questions
  xyMetrics?: {
    distribution: {
      quadrants: Record<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right', number>;
      grid: Record<string, number>; // "x,y" -> count for heatmap
    };
    average: {
      x: number;
      y: number;
    };
  };

  // For Multiple Choice
  multipleChoiceMetrics?: {
    optionCounts: Record<string, number>;
  };

  // For friend comparisons
  userResponses: {
    userId: string;
    response: {
      value: number | string | { x: number; y: number };
      timestamp: Date;
    };
  }[];
} 