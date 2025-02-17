import * as functions from 'firebase-functions';
import { MetricsCalculator } from '../services/MetricsCalculator';
import { FieldValue } from 'firebase-admin/firestore';
import { QuestionResponse, GuessResponse } from '../types/metrics';
import { logError, logInfo } from '../utils/logging';
import { withRetry, RetryableError } from '../utils/retry';

const calculator = new MetricsCalculator();

export const onResponseCreate = functions.firestore
  .document('responses/{responseId}')
  .onCreate(async (snap, context) => {
    const operationId = context.eventId;
    const logContext = {
      functionName: 'onResponseCreate',
      operationId,
      responseId: snap.id
    };

    try {
      const response = snap.data() as QuestionResponse;
      if (!validateResponse(response)) {
        throw new RetryableError(
          'Invalid response data',
          new Error('Validation failed'),
          false // Don't retry validation failures
        );
      }

      const { questionId } = response;
      const db = snap.ref.firestore();
      
      await withRetry(async () => {
        await db.runTransaction(async (transaction) => {
          // Update question metrics
          const questionMetricsRef = db.doc(`metrics/questions/${questionId}`);
          const [responses, guesses] = await Promise.all([
            db.collection('responses')
              .where('questionId', '==', questionId)
              .get(),
            db.collection('guesses')
              .where('questionId', '==', questionId)
              .get()
          ]);

          const metrics = calculator.calculateQuestionMetrics(
            responses.docs.map(d => d.data()),
            guesses.docs.map(d => d.data())
          );

          transaction.set(questionMetricsRef, metrics, { merge: true });

          // Update user stats
          const userStatsRef = db.doc(`userStats/${response.userId}`);
          transaction.set(userStatsRef, {
            responseStats: {
              total: FieldValue.increment(1),
              byType: {
                [response.value.type]: FieldValue.increment(1)
              }
            },
            lastUpdated: FieldValue.serverTimestamp()
          }, { merge: true });

          if (response.quizId) {
            const quizMetricsRef = db.doc(`metrics/quizzes/${response.quizId}`);
            transaction.set(quizMetricsRef, {
              totalParticipants: FieldValue.increment(1),
              [`questionStats.${questionId}.completion`]: FieldValue.increment(1),
              lastUpdated: FieldValue.serverTimestamp()
            }, { merge: true });
          }
        });

        logInfo('Successfully updated metrics', {
          ...logContext,
          questionId,
          quizId: response.quizId
        });
      }, {
        maxAttempts: 3,
        initialDelayMs: 1000
      });

    } catch (error) {
      logError(error, logContext);
      
      // Only throw retryable errors
      if (error instanceof RetryableError && error.isRetryable) {
        throw error;
      }
    }
  });

export const onGuessCreate = functions.firestore
  .document('guesses/{guessId}')
  .onCreate(async (snap, context) => {
    const operationId = context.eventId;
    const logContext = {
      functionName: 'onGuessCreate',
      operationId,
      guessId: snap.id
    };

    try {
      const guess = snap.data();
      if (!validateGuess(guess)) {
        throw new RetryableError(
          'Invalid guess data',
          new Error('Validation failed'),
          false
        );
      }

      const { questionId, userId, targetUserId } = guess;
      const db = snap.ref.firestore();

      await withRetry(async () => {
        await db.runTransaction(async (transaction) => {
          // Update metrics
          const questionMetricsRef = db.doc(`metrics/questions/${questionId}`);
          const [responses, guesses] = await Promise.all([
            db.collection('responses')
              .where('questionId', '==', questionId)
              .get(),
            db.collection('guesses')
              .where('questionId', '==', questionId)
              .get()
          ]);

          const metrics = calculator.calculateQuestionMetrics(
            responses.docs.map(d => d.data()),
            guesses.docs.map(d => d.data())
          );

          transaction.set(questionMetricsRef, metrics, { merge: true });

          // Update user stats
          const userStatsRef = db.doc(`userStats/${userId}`);
          transaction.set(userStatsRef, {
            guessStats: {
              total: FieldValue.increment(1),
              [`byTarget.${targetUserId}.total`]: FieldValue.increment(1)
            },
            lastUpdated: FieldValue.serverTimestamp()
          }, { merge: true });
        });

        logInfo('Successfully updated guess metrics', {
          ...logContext,
          questionId,
          targetUserId
        });
      }, {
        maxAttempts: 3,
        initialDelayMs: 1000
      });

    } catch (error) {
      logError(error, logContext);
      
      if (error instanceof RetryableError && error.isRetryable) {
        throw error;
      }
    }
  });

function validateResponse(response: unknown): response is QuestionResponse {
  return !!(
    response &&
    typeof (response as QuestionResponse).questionId === 'string' &&
    typeof (response as QuestionResponse).userId === 'string' &&
    (response as QuestionResponse).value &&
    typeof (response as QuestionResponse).value.type === 'string'
  );
}

function validateGuess(guess: unknown): guess is GuessResponse {
  return !!(
    guess &&
    typeof (guess as GuessResponse).questionId === 'string' &&
    typeof (guess as GuessResponse).userId === 'string' &&
    typeof (guess as GuessResponse).targetUserId === 'string'
  );
}

function validateXYResponse(value: any): boolean {
  return !!(
    value.coordinates &&
    typeof value.coordinates.x === 'number' &&
    typeof value.coordinates.y === 'number' &&
    value.coordinates.x >= 0 &&
    value.coordinates.x <= 1 &&
    value.coordinates.y >= 0 &&
    value.coordinates.y <= 1
  );
}

function validateMultipleChoiceResponse(value: any): boolean {
  return !!(
    value.selectedOption &&
    typeof value.selectedOption === 'string'
  );
} 