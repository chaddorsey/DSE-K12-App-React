import { db } from '../config/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import type { QuestionResponse } from '../features/questions/types/responses';
import type { QuestionTypeString } from '../features/questions/types/questions';
import { logger } from '../utils/logger';

interface SeedOptions {
  email: string;
  count?: number;
}

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateResponses = (userId: string, count: number): Partial<QuestionResponse>[] => {
  const responses: Partial<QuestionResponse>[] = [];
  const questionTypes = ['MC', 'NM'] as const; // Only using types that QuizService supports
  const mcOptions = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];
  
  for (let i = 0; i < count; i++) {
    const type = questionTypes[i % questionTypes.length] as QuestionTypeString;
    const now = new Date();
    const baseResponse = {
      id: `response_${i}`,
      userId,
      questionId: `question_${i}`,
      timestamp: now,
      metadata: {
        timeToAnswer: getRandomInt(2000, 10000),
        interactionCount: getRandomInt(1, 5),
        device: {
          type: Math.random() > 0.5 ? 'desktop' : 'mobile',
          input: Math.random() > 0.5 ? 'mouse' : 'touch'
        },
        confidence: Math.random()
      }
    };

    let value;
    switch (type) {
      case 'MC':
        value = {
          type: 'MC' as const,
          selectedOption: mcOptions[getRandomInt(0, mcOptions.length - 1)]
        };
        break;
      case 'NM':
        value = {
          type: 'NM' as const,
          number: getRandomInt(1, 100)
        };
        break;
    }

    responses.push({
      ...baseResponse,
      value
    });
  }

  return responses;
};

const seedResponses = async ({ email, count = 12 }: SeedOptions) => {
  try {
    // Find user
    logger.info('Looking up user...', { email });
    const usersRef = db.collection('users');
    
    // Log the query we're about to run
    logger.debug('Running query:', {
      collection: 'users',
      where: { field: 'email', operator: '==', value: email.toLowerCase() }
    });
    
    const snapshot = await usersRef.where('email', '==', email.toLowerCase()).get();
    
    // Log what we got back
    logger.debug('Query results:', {
      empty: snapshot.empty,
      size: snapshot.size,
      docs: snapshot.docs.map(doc => ({
        id: doc.id,
        email: doc.data().email,
        displayName: doc.data().displayName
      }))
    });

    if (snapshot.empty) {
      // List all users to verify collection access
      logger.debug('Listing all users for verification...');
      const allUsers = await usersRef.get();
      logger.debug('All users:', {
        count: allUsers.size,
        users: allUsers.docs.map(doc => ({
          id: doc.id,
          email: doc.data().email,
          displayName: doc.data().displayName
        }))
      });

      logger.error('No user found with email:', email);
      return;
    }

    const user = snapshot.docs[0];
    const userId = user.id;
    logger.info('Found user', { 
      userId,
      email: user.data().email,
      displayName: user.data().displayName
    });

    // Generate and save responses
    logger.info('Generating responses...', { count });
    const responses = generateResponses(userId, count);
    const responsesRef = db.collection('responses');

    logger.info('Saving responses...');
    for (const response of responses) {
      // Convert Date to Timestamp only when saving to Firestore
      const firestoreResponse = {
        ...response,
        timestamp: Timestamp.fromDate(response.timestamp as Date)
      };
      
      await responsesRef.add(firestoreResponse);
      logger.debug('Saved response:', {
        questionId: response.questionId,
        type: response.value?.type
      });
    }

    logger.info('Seeding complete!', { 
      count: responses.length,
      types: responses.map(r => r.value?.type)
    });
  } catch (error) {
    logger.error('Error seeding data:', error);
  }
};

// Allow running from command line
if (require.main === module) {
  const email = process.argv[2] || 'user@test.com';
  const count = parseInt(process.argv[3] || '12', 10);
  
  if (!email) {
    logger.error('Please provide an email address');
    process.exit(1);
  }

  seedResponses({ email, count })
    .then(() => process.exit(0))
    .catch(error => {
      logger.error('Fatal error:', error);
      process.exit(1);
    });
}

export { seedResponses }; 