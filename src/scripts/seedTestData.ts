import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import type { QuestionResponse } from '../features/questions/types/responses';

const seedResponses = async () => {
  const responsesRef = collection(db, 'responses');

  const testResponses: Partial<QuestionResponse>[] = [
    {
      userId: 'test_user_id', // Replace with actual user ID
      questionId: 'q1',
      value: {
        type: 'MC',
        selectedOption: 'Blue'
      },
      timestamp: new Date(),
      metadata: {
        timeToAnswer: 5000,
        interactionCount: 1,
        device: {
          type: 'desktop',
          input: 'mouse'
        }
      }
    },
    {
      userId: 'test_user_id', // Replace with actual user ID
      questionId: 'q2',
      value: {
        type: 'NM',
        number: 42
      },
      timestamp: new Date(),
      metadata: {
        timeToAnswer: 3000,
        interactionCount: 1,
        device: {
          type: 'desktop',
          input: 'keyboard'
        }
      }
    }
  ];

  try {
    for (const response of testResponses) {
      await addDoc(responsesRef, response);
      console.log('Added response:', response);
    }
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

// Run the seeding
seedResponses(); 