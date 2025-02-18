import { Firestore, collection, query, where, getDocs } from 'firebase/firestore';
import type { Quiz, QuizQuestion } from '../types/quiz';
import type { QuestionResponse, MCQuestionResponse, NMQuestionResponse } from '../../questions/types/responses';
import type { MultipleChoiceQuestion, NumericQuestion } from '../../questions/types/questions';
import { logger } from '../../../utils/logger';

export class QuizService {
  private readonly RESPONSES_COLLECTION = 'responses';
  private readonly QUIZ_SIZE = 5;

  constructor(private readonly db: Firestore) {}

  async generateQuiz(targetUserId: string): Promise<Quiz> {
    try {
      const responses = await this.getUserResponses(targetUserId);
      logger.debug('Retrieved responses:', { count: responses.length });
      
      if (responses.length === 0) {
        throw new Error('This user has not answered any questions yet');
      }

      // Shuffle responses and take QUIZ_SIZE unique ones
      const shuffledResponses = this.shuffleArray([...responses]);
      const uniqueResponses = this.getUniqueResponses(shuffledResponses);
      const quizResponses = uniqueResponses.slice(0, this.QUIZ_SIZE);

      logger.debug('Generated quiz:', { 
        totalResponses: responses.length,
        uniqueQuestions: uniqueResponses.length,
        quizSize: quizResponses.length
      });

      return {
        id: this.generateQuizId(),
        targetUserId,
        questions: quizResponses.map(response => this.createQuizQuestion(response)),
        timestamp: new Date()
      };
    } catch (error) {
      logger.error('Error generating quiz:', error);
      throw error;
    }
  }

  private getUniqueResponses(responses: QuestionResponse[]): QuestionResponse[] {
    const seen = new Set<string>();
    return responses.filter(response => {
      if (seen.has(response.questionId)) {
        return false;
      }
      seen.add(response.questionId);
      return true;
    });
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private isValidResponse(response: QuestionResponse): boolean {
    if (!response.value || !response.value.type) {
      return false;
    }

    switch (response.value.type) {
      case 'MC':
        return typeof response.value.selectedOption === 'string';
      case 'NM':
        return typeof response.value.number === 'number';
      default:
        return false;
    }
  }

  private async getUserResponses(userId: string): Promise<QuestionResponse[]> {
    try {
      logger.debug('📝 RESPONSES: Starting fetch', { userId });
      
      const responsesRef = collection(this.db, this.RESPONSES_COLLECTION);
      const q = query(responsesRef, where('userId', '==', userId));
      
      const snapshot = await getDocs(q);
      logger.debug('📝 RESPONSES: Query results', {
        empty: snapshot.empty,
        size: snapshot.size
      });

      if (snapshot.empty) {
        return [];
      }

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as QuestionResponse[];

    } catch (error) {
      logger.error('Query error:', error);
      throw error;
    }
  }

  private createQuizQuestion(response: QuestionResponse): QuizQuestion {
    const baseQuestion = {
      id: response.id,
      questionId: response.questionId,
      text: `What did ${response.userId} answer? [${response.value.type === 'MC' 
        ? (response as MCQuestionResponse).value.selectedOption
        : (response as NMQuestionResponse).value.number}]`,
      prompt: `What did ${response.userId} answer?`,
      label: 'Response Question',
      category: 'RESPONSES',
      number: 1,
      requiredForOnboarding: false,
      includeInOnboarding: false
    };

    switch (response.value.type) {
      case 'MC': {
        const mcResponse = response as MCQuestionResponse;
        // Generate options first to ensure consistent order
        const options = this.generateMCOptions(mcResponse.value.selectedOption);
        const mcQuestion: MultipleChoiceQuestion & { 
          correctAnswer: string;
          options: string[];
        } = {
          ...baseQuestion,
          type: 'MC',
          correctAnswer: mcResponse.value.selectedOption,
          options: options
        };
        
        logger.debug('Created MC question:', {
          correctAnswer: mcQuestion.correctAnswer,
          options: mcQuestion.options,
          originalResponse: mcResponse.value.selectedOption
        });
        
        return mcQuestion;
      }
      case 'NM': {
        const nmResponse = response as NMQuestionResponse;
        const correctNumber = nmResponse.value.number;
        const nmQuestion: NumericQuestion & {
          correctAnswer: string;
          options: number[];
        } = {
          ...baseQuestion,
          type: 'NM',
          min: 0,
          max: correctNumber * 2,
          step: 1,
          correctAnswer: correctNumber.toString(),
          options: this.generateNumericOptions(correctNumber)
        };

        logger.debug('Created NM question:', {
          correctAnswer: nmQuestion.correctAnswer,
          options: nmQuestion.options,
          originalResponse: correctNumber
        });

        return nmQuestion;
      }
      default:
        throw new Error(`Unsupported question type: ${(response.value as any).type}`);
    }
  }

  private generateMCOptions(correctAnswer: string): string[] {
    const mockOptions = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];
    const otherOptions = mockOptions.filter(opt => opt.toLowerCase() !== correctAnswer.toLowerCase());
    const shuffledOthers = this.shuffleArray(otherOptions);
    
    // Take 3 distractors and add the correct answer
    const options = [...shuffledOthers.slice(0, 3), correctAnswer];
    // Shuffle again to randomize correct answer position
    return this.shuffleArray(options);
  }

  private generateNumericOptions(correctAnswer: number): number[] {
    // Generate reasonable numeric distractors
    return [
      correctAnswer,
      correctAnswer * 0.5,
      correctAnswer * 1.5,
      correctAnswer + 10
    ];
  }

  private generateQuizId(): string {
    return `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
} 