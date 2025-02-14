import type { QuestionResponse, XYResponseValue, MultipleChoiceResponseValue } from '../types/response';
import type { QuestionMetrics, QuizMetrics } from '../types/metrics';

export class MetricsCalculator {
  calculateQuestionMetrics(responses: QuestionResponse[], guesses: GuessResponse[] = []): QuestionMetrics {
    const firstResponse = responses[0];
    if (!firstResponse) {
      return this.getEmptyMetrics();
    }

    const baseMetrics = {
      questionId: firstResponse.questionId,
      totalResponses: responses.length,
      totalGuesses: guesses.length,
      lastUpdated: new Date()
    };

    return {
      ...baseMetrics,
      distribution: this.calculateDistribution(responses),
      guessAccuracy: this.calculateGuessAccuracy(responses, guesses),
      timeStats: this.calculateTimeStats(responses, guesses)
    };
  }

  private calculateDistribution(responses: QuestionResponse[]) {
    const firstResponse = responses[0];
    if (!firstResponse) return {};

    if (firstResponse.value.type === 'XY') {
      return this.calculateXYDistribution(responses as QuestionResponse<XYResponseValue>[]);
    } else {
      return this.calculateMultipleChoiceDistribution(responses as QuestionResponse<MultipleChoiceResponseValue>[]);
    }
  }

  private calculateXYDistribution(responses: QuestionResponse<XYResponseValue>[]) {
    const quadrants: Record<string, number> = {
      'top-left': 0,
      'top-right': 0,
      'bottom-left': 0,
      'bottom-right': 0
    };
    const grid: Record<string, number> = {};
    let sumX = 0, sumY = 0;

    responses.forEach(response => {
      const { x, y } = response.value.coordinates;
      
      // Update quadrants
      if (y > 0.5) {
        x < 0.5 ? quadrants['top-left']++ : quadrants['top-right']++;
      } else {
        x < 0.5 ? quadrants['bottom-left']++ : quadrants['bottom-right']++;
      }

      // Update grid (5x5)
      const gridX = Math.floor(x * 5);
      const gridY = Math.floor(y * 5);
      const key = `${gridX},${gridY}`;
      grid[key] = (grid[key] || 0) + 1;

      sumX += x;
      sumY += y;
    });

    return {
      quadrants,
      grid,
      average: {
        x: responses.length ? sumX / responses.length : 0,
        y: responses.length ? sumY / responses.length : 0
      }
    };
  }

  private calculateMultipleChoiceDistribution(responses: QuestionResponse<MultipleChoiceResponseValue>[]) {
    const options: Record<string, number> = {};
    
    responses.forEach(response => {
      const option = response.value.selectedOption;
      options[option] = (options[option] || 0) + 1;
    });

    return { options };
  }

  private calculateGuessAccuracy(responses: QuestionResponse[], guesses: GuessResponse[]) {
    if (!guesses.length) return { averageScore: 0, distribution: {} };

    const scores = guesses.map(guess => guess.accuracy?.score || 0);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    // Create distribution buckets (0.0-0.1, 0.1-0.2, etc.)
    const distribution: Record<number, number> = {};
    scores.forEach(score => {
      const bucket = Math.floor(score * 10) / 10;
      distribution[bucket] = (distribution[bucket] || 0) + 1;
    });

    return { averageScore, distribution };
  }

  private calculateTimeStats(responses: QuestionResponse[], guesses: GuessResponse[]) {
    return {
      averageResponseTime: this.calculateAverageTime(responses, 'timeToAnswer'),
      averageGuessTime: this.calculateAverageTime(guesses, 'timeToGuess')
    };
  }

  private calculateAverageTime(items: Array<QuestionResponse | GuessResponse>, timeField: string) {
    if (!items.length) return 0;
    return items.reduce((sum, item) => sum + item.metadata[timeField], 0) / items.length;
  }

  private getEmptyMetrics(): QuestionMetrics {
    return {
      questionId: '',
      totalResponses: 0,
      totalGuesses: 0,
      distribution: {},
      guessAccuracy: {
        averageScore: 0,
        distribution: {}
      },
      timeStats: {
        averageResponseTime: 0,
        averageGuessTime: 0
      },
      lastUpdated: new Date()
    };
  }
} 