import { useMemo } from 'react';
import { useResponseUpdates } from './useResponseUpdates';
import type { QuestionResponse, XYResponseValue } from '../types/response';

interface QuadrantStats {
  'top-left': number;
  'top-right': number;
  'bottom-left': number;
  'bottom-right': number;
}

interface InteractionStats {
  averageInteractions: number;
  deviceTypes: Record<string, number>;
  inputMethods: Record<string, number>;
}

interface TimeStats {
  averageTimeToAnswer: number;
  responsesByHour: Record<number, number>;
  responsesByDay: Record<string, number>;
}

interface ResponseStats {
  quadrantStats: QuadrantStats;
  interactionStats: InteractionStats;
  timeStats: TimeStats;
  loading: boolean;
  error: Error | null;
}

export function useResponseStats(questionId: string): ResponseStats {
  const { responses, loading, error } = useResponseUpdates(questionId);

  return useMemo(() => {
    if (loading || error) {
      return {
        quadrantStats: { 'top-left': 0, 'top-right': 0, 'bottom-left': 0, 'bottom-right': 0 },
        interactionStats: {
          averageInteractions: 0,
          deviceTypes: {},
          inputMethods: {}
        },
        timeStats: {
          averageTimeToAnswer: 0,
          responsesByHour: {},
          responsesByDay: {}
        },
        loading,
        error
      };
    }

    const xyResponses = responses.filter(
      (r): r is QuestionResponse & { value: XYResponseValue } => 
      r.value.type === 'XY'
    );

    // Calculate quadrant stats
    const quadrantStats = xyResponses.reduce(
      (stats, response) => {
        const { x, y } = response.value.coordinates;
        const quadrant = x < 0.5
          ? y < 0.5 ? 'bottom-left' : 'top-left'
          : y < 0.5 ? 'bottom-right' : 'top-right';
        stats[quadrant]++;
        return stats;
      },
      { 'top-left': 0, 'top-right': 0, 'bottom-left': 0, 'bottom-right': 0 } as QuadrantStats
    );

    // Calculate interaction stats
    const interactionStats = xyResponses.reduce(
      (stats, response) => {
        // Update device types
        const deviceType = response.metadata.device.type;
        stats.deviceTypes[deviceType] = (stats.deviceTypes[deviceType] || 0) + 1;

        // Update input methods
        const inputMethod = response.metadata.device.input;
        stats.inputMethods[inputMethod] = (stats.inputMethods[inputMethod] || 0) + 1;

        // Update total interactions for average calculation
        stats.totalInteractions += response.metadata.interactionCount;

        return stats;
      },
      {
        deviceTypes: {} as Record<string, number>,
        inputMethods: {} as Record<string, number>,
        totalInteractions: 0
      }
    );

    // Calculate time-based stats
    const timeStats = xyResponses.reduce(
      (stats, response) => {
        // Update average time
        stats.totalTime += response.metadata.timeToAnswer;

        // Update hourly distribution
        const hour = new Date(response.timestamp).getHours();
        stats.responsesByHour[hour] = (stats.responsesByHour[hour] || 0) + 1;

        // Update daily distribution
        const day = new Date(response.timestamp).toISOString().split('T')[0];
        stats.responsesByDay[day] = (stats.responsesByDay[day] || 0) + 1;

        return stats;
      },
      {
        totalTime: 0,
        responsesByHour: {} as Record<number, number>,
        responsesByDay: {} as Record<string, number>
      }
    );

    return {
      quadrantStats,
      interactionStats: {
        averageInteractions: xyResponses.length 
          ? interactionStats.totalInteractions / xyResponses.length 
          : 0,
        deviceTypes: interactionStats.deviceTypes,
        inputMethods: interactionStats.inputMethods
      },
      timeStats: {
        averageTimeToAnswer: xyResponses.length 
          ? timeStats.totalTime / xyResponses.length 
          : 0,
        responsesByHour: timeStats.responsesByHour,
        responsesByDay: timeStats.responsesByDay
      },
      loading,
      error
    };
  }, [responses, loading, error]);
} 