import type { 
  GuessResponse, 
  QuestionResponse,
  XYValue,
  MultipleChoiceValue,
  ResponseMetadata,
  GuessMetadata
} from '../types';
import type { 
  MetricsSummary, 
  ResponseMetrics, 
  GuessMetrics,
  QuestionMetrics
} from '../types/metrics';

export interface QuestionMetrics {
  questionId: string;
  totalResponses: number;
  totalGuesses: number;
  distribution: Record<string, number>;
  guessAccuracy: {
    averageScore: number;
    distribution: Record<string, number>;
  };
  timeStats: {
    averageResponseTime: number;
    averageGuessTime: number;
  };
  lastUpdated: Date;
}

export class MetricsCalculator {
  calculateResponseMetrics(response: QuestionResponse): ResponseMetrics {
    return {
      accuracy: this.calculateResponseAccuracy(response),
      confidence: response.metadata.confidence,
      timeToAnswer: response.metadata.timeToAnswer,
      interactionCount: response.metadata.interactionCount,
      deviceType: response.metadata.device.type
    };
  }

  calculateGuessMetrics(
    guess: GuessResponse, 
    targetResponse: QuestionResponse
  ): GuessMetrics {
    const baseMetrics = {
      questionId: guess.questionId,
      totalResponses: 1,
      lastUpdated: new Date(),
      accuracy: this.calculateGuessAccuracy(guess, targetResponse),
      confidence: guess.metadata.confidence,
      timeToAnswer: targetResponse.metadata.timeToAnswer,
      interactionCount: targetResponse.metadata.interactionCount,
      deviceType: guess.metadata.device.type,
      targetAccuracy: this.calculateResponseAccuracy(targetResponse),
      targetConfidence: targetResponse.metadata.confidence,
      userResponses: []
    };

    return baseMetrics;
  }

  calculateQuestionMetrics(
    responses: QuestionResponse[], 
    guesses: GuessResponse[] = []
  ): QuestionMetrics {
    const firstResponse = responses[0];
    if (!firstResponse) {
      return this.getEmptyMetrics();
    }

    return {
      questionId: firstResponse.questionId,
      totalResponses: responses.length,
      totalGuesses: guesses.length,
      distribution: this.calculateDistribution(responses),
      guessAccuracy: this.calculateGuessAccuracyDistribution(guesses, responses),
      timeStats: {
        averageResponseTime: this.calculateAverageTime(responses, 'timeToAnswer'),
        averageGuessTime: this.calculateAverageTime(guesses, 'timeToGuess')
      },
      lastUpdated: new Date()
    };
  }

  private calculateDistribution(responses: QuestionResponse[]): Record<string, number> {
    const firstResponse = responses[0];
    if (!firstResponse) return {};

    if (firstResponse.value.type === 'XY') {
      return this.calculateXYDistribution(responses);
    } else {
      return this.calculateMultipleChoiceDistribution(responses);
    }
  }

  private calculateXYDistribution(responses: QuestionResponse[]): Record<string, number> {
    const distribution: Record<string, number> = {};
    
    responses.forEach(response => {
      if (response.value.type === 'XY') {
        const { x, y } = response.value.coordinates;
        const quadrant = this.getQuadrant(x, y);
        distribution[quadrant] = (distribution[quadrant] || 0) + 1;
      }
    });

    return distribution;
  }

  private getQuadrant(x: number, y: number): string {
    return `${y > 0.5 ? 'top' : 'bottom'}-${x > 0.5 ? 'right' : 'left'}`;
  }

  private calculateMultipleChoiceDistribution(responses: QuestionResponse[]): Record<string, number> {
    const options: Record<string, number> = {};
    
    responses.forEach(response => {
      if (response.value.type === 'MULTIPLE_CHOICE') {
        const option = response.value.selectedOption;
        options[option] = (options[option] || 0) + 1;
      }
    });

    return options;
  }

  private calculateGuessAccuracy(
    guess: GuessResponse,
    target: QuestionResponse
  ): number {
    if (guess.value.type !== target.value.type) {
      return 0;
    }

    if (guess.value.type === 'XY') {
      return this.calculateXYAccuracy(
        guess.value as XYValue,
        target.value as XYValue
      );
    } else {
      return this.calculateMultipleChoiceAccuracy(
        guess.value as MultipleChoiceValue,
        target.value as MultipleChoiceValue
      );
    }
  }

  private calculateGuessAccuracyDistribution(
    guesses: GuessResponse[],
    responses: QuestionResponse[]
  ): { averageScore: number; distribution: Record<string, number> } {
    if (!guesses.length) return { averageScore: 0, distribution: {} };

    const scores = guesses.map(guess => {
      const targetResponse = responses.find(r => r.questionId === guess.questionId);
      return targetResponse ? this.calculateGuessAccuracy(guess, targetResponse) : 0;
    });

    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const distribution = this.createScoreDistribution(scores);

    return { averageScore, distribution };
  }

  private createScoreDistribution(scores: number[]): Record<string, number> {
    const distribution: Record<string, number> = {};
    scores.forEach(score => {
      const bucket = Math.floor(score * 10) / 10;
      distribution[bucket] = (distribution[bucket] || 0) + 1;
    });
    return distribution;
  }

  private calculateAverageTime(
    items: Array<QuestionResponse | GuessResponse>, 
    timeField: keyof ResponseMetadata | keyof GuessMetadata
  ): number {
    if (!items.length) return 0;
    const validItems = items.filter(item => 
      typeof item.metadata[timeField] === 'number'
    );
    return validItems.length ? 
      validItems.reduce((sum, item) => sum + (item.metadata[timeField] as number), 0) / validItems.length : 
      0;
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

  private calculateResponseAccuracy(response: QuestionResponse): number {
    // Implementation
    return 0;
  }

  private calculateXYAccuracy(
    guess: XYValue,
    actual: XYValue
  ): number {
    const dx = guess.coordinates.x - actual.coordinates.x;
    const dy = guess.coordinates.y - actual.coordinates.y;
    return 1 - Math.sqrt(dx * dx + dy * dy) / Math.SQRT2;
  }

  private calculateMultipleChoiceAccuracy(
    guess: MultipleChoiceValue,
    actual: MultipleChoiceValue
  ): number {
    return guess.selectedOption === actual.selectedOption ? 1 : 0;
  }
} 