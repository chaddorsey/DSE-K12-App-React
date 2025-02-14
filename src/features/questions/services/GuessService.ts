import type { GuessResponse, QuestionResponse } from '../types';

interface GuessAccuracy {
  distance?: number;    // For XY
  correct?: boolean;    // For Multiple Choice
  score: number;       // Normalized 0-1
}

export class GuessService {
  async submitGuess(
    userId: string,
    targetUserId: string,
    questionId: string,
    guess: GuessValue,
    metadata: GuessMetadata
  ): Promise<string> {
    // 1. Validate the guess
    // 2. Check if target has responded
    // 3. Calculate accuracy if response exists
    // 4. Store guess
    // 5. Update metrics
  }

  async calculateAccuracy(
    guess: GuessResponse,
    actualResponse: QuestionResponse
  ): Promise<GuessAccuracy> {
    // Calculate accuracy based on question type
  }

  async revealGuess(
    guessId: string,
    targetUserId: string
  ): Promise<GuessResponse> {
    // Check conditions and reveal guess
  }

  async getGuessesForQuestion(
    questionId: string,
    targetUserId: string
  ): Promise<GuessResponse[]> {
    // Get all guesses for a question/target
  }
} 