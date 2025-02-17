import { QuestionResponse, GuessResponse, MetricsUpdate } from '../types/metrics';

export class MetricsCalculator {
  calculateQuestionMetrics(
    responses: QuestionResponse[],
    guesses: GuessResponse[]
  ): MetricsUpdate {
    const byType: { [key: string]: number } = {};
    
    // Calculate response type frequencies
    responses.forEach(response => {
      const type = response.value.type;
      byType[type] = (byType[type] || 0) + 1;
    });

    return {
      total: responses.length,
      byType,
      lastUpdated: new Date()
    };
  }
} 