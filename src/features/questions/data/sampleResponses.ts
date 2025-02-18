import type { QuestionResponse } from '../types/questions';

export const sampleResponses: QuestionResponse[] = [
  {
    id: 'resp1',
    userId: 'user1',
    questionId: 'q1',
    value: {
      type: 'MC',
      selectedOption: 'Blue'
    },
    metadata: {
      timeToAnswer: 3000,
      interactionCount: 1,
      device: {
        type: 'browser',
        input: 'mouse'
      }
    },
    timestamp: new Date()
  },
  {
    id: 'resp2',
    userId: 'user2',
    questionId: 'q1',
    value: {
      type: 'MC',
      selectedOption: 'Red'
    },
    metadata: {
      timeToAnswer: 2500,
      interactionCount: 1,
      device: {
        type: 'browser',
        input: 'mouse'
      }
    },
    timestamp: new Date()
  },
  {
    id: 'resp3',
    userId: 'user1',
    questionId: 'q2',
    value: {
      type: 'NM',
      number: 15
    },
    metadata: {
      timeToAnswer: 4000,
      interactionCount: 2,
      device: {
        type: 'browser',
        input: 'keyboard'
      }
    },
    timestamp: new Date()
  }
]; 