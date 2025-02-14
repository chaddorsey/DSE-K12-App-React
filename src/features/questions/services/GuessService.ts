import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { ResponseService } from './ResponseService';
import { MetricsCalculator } from './MetricsCalculator';
import type { 
  GuessResponse, 
  QuestionResponse, 
  GuessValue, 
  GuessMetadata,
  XYValue,
  MultipleChoiceValue
} from '../types';

interface GuessAccuracy {
  distance?: number;    // For XY
  correct?: boolean;    // For Multiple Choice
  score: number;       // Normalized 0-1
}

export class GuessService {
  private readonly guessesRef = collection(db, 'guesses');

  constructor(
    private responseService: ResponseService,
    private metricsCalculator: MetricsCalculator
  ) {}

  async submitGuess(
    userId: string,
    targetUserId: string,
    questionId: string,
    value: GuessValue,
    metadata: GuessMetadata
  ): Promise<string> {
    // Check if target has responded
    const targetResponse = await this.responseService.getResponse(targetUserId, questionId);
    if (!targetResponse) {
      throw new Error('Target has not responded yet');
    }

    // Create guess document
    const guessDoc = doc(this.guessesRef);
    const guess: GuessResponse = {
      id: guessDoc.id,
      userId,
      targetUserId,
      questionId,
      value,
      metadata,
      timestamp: new Date()
    };

    // Calculate accuracy if target has responded
    const accuracy = await this.calculateAccuracy(guess, targetResponse);
    const guessWithAccuracy = {
      ...guess,
      accuracy
    };

    // Store guess
    await setDoc(guessDoc, guessWithAccuracy);

    return guessDoc.id;
  }

  async calculateAccuracy(
    guess: GuessResponse,
    actualResponse: QuestionResponse
  ): Promise<GuessAccuracy> {
    if (guess.value.type !== actualResponse.value.type) {
      throw new Error('Response type mismatch');
    }

    if (guess.value.type === 'XY') {
      return this.calculateXYAccuracy(
        guess.value as XYValue,
        actualResponse.value as XYValue
      );
    } else {
      return this.calculateMultipleChoiceAccuracy(
        guess.value as MultipleChoiceValue,
        actualResponse.value as MultipleChoiceValue
      );
    }
  }

  private calculateXYAccuracy(
    guess: XYValue,
    actual: XYValue
  ): GuessAccuracy {
    const dx = guess.coordinates.x - actual.coordinates.x;
    const dy = guess.coordinates.y - actual.coordinates.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Convert distance to score (0-1)
    // Maximum possible distance is sqrt(2), so normalize accordingly
    const score = Math.max(0, 1 - (distance / Math.SQRT2));

    return {
      distance,
      score
    };
  }

  private calculateMultipleChoiceAccuracy(
    guess: MultipleChoiceValue,
    actual: MultipleChoiceValue
  ): GuessAccuracy {
    const correct = guess.selectedOption === actual.selectedOption;
    return {
      correct,
      score: correct ? 1 : 0
    };
  }

  async revealGuess(
    guessId: string,
    targetUserId: string
  ): Promise<GuessResponse> {
    const guessDoc = await getDoc(doc(this.guessesRef, guessId));
    if (!guessDoc.exists()) {
      throw new Error('Guess not found');
    }

    const guess = guessDoc.data() as GuessResponse;
    
    // Verify target has responded
    const response = await this.responseService.getResponse(
      targetUserId,
      guess.questionId
    );
    if (!response) {
      throw new Error('Cannot reveal guess before target responds');
    }

    return guess;
  }

  async getGuessesForQuestion(
    questionId: string,
    targetUserId: string
  ): Promise<GuessResponse[]> {
    // Get target's response first
    const response = await this.responseService.getResponse(targetUserId, questionId);
    if (!response) {
      return [];
    }

    // Get all guesses for this question/target
    const guessesQuery = query(
      this.guessesRef,
      where('questionId', '==', questionId),
      where('targetUserId', '==', targetUserId)
    );

    const guessesSnapshot = await getDocs(guessesQuery);
    return guessesSnapshot.docs.map(doc => doc.data() as GuessResponse);
  }
} 