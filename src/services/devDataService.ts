import { db } from '../config/firebase';
import { 
  doc, 
  setDoc, 
  collection, 
  getDocs, 
  query, 
  where, 
  deleteDoc,
  addDoc 
} from 'firebase/firestore';
// import { faker } from '@faker-js/faker';
import { logger } from '../utils/logger';

export interface DummyUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  department: string;
  interests: string[];
  onboardingCompleted: boolean;
  isDummy: true; // Flag to identify dummy data
}

const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'Customer Support',
  'Human Resources'
] as const;

const INTERESTS = [
  'Programming',
  'Design',
  'Data Science',
  'Product Management',
  'Artificial Intelligence',
  'Machine Learning',
  'Cloud Computing'
] as const;

const ROLES = ['user', 'admin', 'moderator'] as const;

export const devDataService = {
  generateDummyUser(): DummyUser {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    return {
      uid: `dummy_${faker.string.uuid()}`, // Prefix dummy IDs
      email: faker.internet.email({ firstName, lastName }),
      displayName: `${firstName} ${lastName}`,
      photoURL: faker.image.avatar(),
      department: DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)],
      interests: Array.from({ length: faker.number.int({ min: 1, max: 4 }) })
        .map(() => INTERESTS[Math.floor(Math.random() * INTERESTS.length)]),
      onboardingCompleted: faker.datatype.boolean(),
      isDummy: true
    };
  },

  async clearDummyData() {
    try {
      logger.info('Clearing dummy user data...');
      
      // Clear dummy users
      const usersRef = collection(db, 'users');
      const dummyQuery = query(usersRef, where('isDummy', '==', true));
      const snapshot = await getDocs(dummyQuery);
      
      await Promise.all(
        snapshot.docs.map(doc => deleteDoc(doc.ref))
      );

      logger.info('Dummy data cleared successfully');
    } catch (error) {
      logger.error('Error clearing dummy data:', error);
      throw error;
    }
  },

  async seedDummyUsers(count: number = 50) {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('Attempting to seed dummy users in non-development environment');
      return;
    }

    try {
      // Clear existing dummy users first
      await this.clearDummyData();
      
      const users = Array.from({ length: count }, () => ({
        id: `dummy_${Math.random().toString(36).substr(2, 9)}`,
        isDummy: true,
        // ... other user properties
      }));

      const usersCollection = collection(db, 'users');
      await Promise.all(users.map(user => 
        setDoc(doc(usersCollection, user.id), user)
      ));

      logger.info(`Successfully seeded ${count} dummy users`);
    } catch (error) {
      logger.error('Error seeding dummy users:', error);
      throw error;
    }
  }
};

export const generateTestUsers = (count: number) => {
  return Array(count).fill(null).map((_, index) => ({
    id: `test-user-${index}`,
    name: `Test User ${index}`,
    email: `test${index}@example.com`,
    // ... other user properties
  }));
}; 