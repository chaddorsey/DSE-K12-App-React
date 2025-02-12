import { db } from '../config/firebase';
import { doc, setDoc, collection, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { faker } from '@faker-js/faker';
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

const DEPARTMENTS = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales'];
const INTERESTS = ['AI', 'Web Dev', 'Mobile', 'UX', 'Data Science', 'DevOps'];

export const devDataService = {
  generateDummyUser(): DummyUser {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    return {
      uid: `dummy_${faker.string.uuid()}`, // Prefix dummy IDs
      email: faker.internet.email({ firstName, lastName }),
      displayName: `${firstName} ${lastName}`,
      photoURL: faker.image.avatar(),
      department: faker.helpers.arrayElement(DEPARTMENTS),
      interests: faker.helpers.arrayElements(INTERESTS, { min: 1, max: 4 }),
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
    try {
      logger.info(`Seeding ${count} dummy users...`);
      await this.clearDummyData(); // Clear existing dummy data first
      
      const batch = [];
      for (let i = 0; i < count; i++) {
        const dummyUser = this.generateDummyUser();
        const userRef = doc(collection(db, 'users'), dummyUser.uid);
        batch.push(setDoc(userRef, dummyUser));
      }

      await Promise.all(batch);
      logger.info('Dummy users seeded successfully');
    } catch (error) {
      logger.error('Error seeding dummy users:', error);
      throw error;
    }
  }
}; 