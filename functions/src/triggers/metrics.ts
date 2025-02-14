import * as functions from 'firebase-functions';
import { MetricsCalculator } from '../services/MetricsCalculator';
import { TriggerError, ErrorCodes } from '../utils/errors';
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
      const response = snap.data();
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
              total: functions.firestore.FieldValue.increment(1),
              byType: {
                [response.value.type]: functions.firestore.FieldValue.increment(1)
              }
            },
            lastUpdated: functions.firestore.FieldValue.serverTimestamp()
          }, { merge: true });

          if (response.quizId) {
            const quizMetricsRef = db.doc(`metrics/quizzes/${response.quizId}`);
            transaction.set(quizMetricsRef, {
              totalParticipants: functions.firestore.FieldValue.increment(1),
              [`questionStats.${questionId}.completion`]: functions.firestore.FieldValue.increment(1),
              lastUpdated: functions.firestore.FieldValue.serverTimestamp()
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
              total: functions.firestore.FieldValue.increment(1),
              [`byTarget.${targetUserId}.total`]: functions.firestore.FieldValue.increment(1)
            },
            lastUpdated: functions.firestore.FieldValue.serverTimestamp()
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

function validateResponse(response: any): response is QuestionResponse {
  return !!(
    response &&
    response.questionId &&
    response.userId &&
    response.value &&
    response.value.type &&
    (response.value.type === 'XY' ? validateXYResponse(response.value) :
     response.value.type === 'MULTIPLE_CHOICE' ? validateMultipleChoiceResponse(response.value) :
     false)
  );
}

function validateGuess(guess: any): guess is GuessResponse {
  return !!(
    guess &&
    guess.questionId &&
    guess.userId &&
    guess.targetUserId &&
    guess.value &&
    guess.value.type &&
    (guess.value.type === 'XY' ? validateXYResponse(guess.value) :
     guess.value.type === 'MULTIPLE_CHOICE' ? validateMultipleChoiceResponse(guess.value) :
     false)
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