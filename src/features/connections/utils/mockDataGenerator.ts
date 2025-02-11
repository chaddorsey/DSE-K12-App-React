import { faker } from '@faker-js/faker';
import type { MockUser, MockInteraction, MockRecognitionData } from '../types/mock-data';

const DEPARTMENTS = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR'];
const ROLES = ['Engineer', 'Manager', 'Designer', 'Product Manager', 'Analyst'];
const TAGS = ['new-hire', 'mentor', 'team-lead', 'remote', 'office'];

export class MockDataGenerator {
  private users: MockUser[] = [];
  private interactions: MockInteraction[] = [];
  private recognitionData: MockRecognitionData[] = [];

  constructor(private readonly avatarBasePath: string) {}

  generateUsers(count: number): MockUser[] {
    for (let i = 0; i < count; i++) {
      const user: MockUser = {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        avatar: `${this.avatarBasePath}/avatar_${(i % 20) + 1}.jpg`, // Assuming 20 avatar images
        department: faker.helpers.arrayElement(DEPARTMENTS),
        role: faker.helpers.arrayElement(ROLES),
        joinDate: faker.date.past(2).toISOString(),
        tags: faker.helpers.arrayElements(TAGS, { min: 1, max: 3 }),
        lastInteraction: faker.date.recent({ days: 30 }).toISOString()
      };
      this.users.push(user);
    }
    return this.users;
  }

  generateInteractions(minPerUser: number = 2, maxPerUser: number = 5): MockInteraction[] {
    this.users.forEach(user => {
      const interactionCount = faker.number.int({ min: minPerUser, max: maxPerUser });
      for (let i = 0; i < interactionCount; i++) {
        const target = faker.helpers.arrayElement(
          this.users.filter(u => u.id !== user.id)
        );
        
        const interaction: MockInteraction = {
          userId: user.id,
          targetId: target.id,
          type: faker.helpers.arrayElement(['meeting', 'chat', 'email', 'collaboration']),
          date: faker.date.recent({ days: 90 }).toISOString(),
          context: faker.helpers.arrayElement([
            'Team meeting',
            'Project collaboration',
            'Coffee chat',
            'Onboarding session',
            'Code review'
          ])
        };
        this.interactions.push(interaction);
      }
    });
    return this.interactions;
  }

  generateRecognitionData(): MockRecognitionData[] {
    this.users.forEach(user => {
      const recognizedUsers = faker.helpers.arrayElements(
        this.users.filter(u => u.id !== user.id),
        { min: 5, max: 15 }
      );

      recognizedUsers.forEach(recognized => {
        const level = faker.helpers.arrayElement(['FACE', 'NAME', 'TALKED', 'KNOW_WELL']);
        const recognition: MockRecognitionData = {
          userId: recognized.id,
          recognizedById: user.id,
          level,
          timestamp: faker.date.recent({ days: 30 }).toISOString(),
          context: level === 'TALKED' || level === 'KNOW_WELL' 
            ? faker.helpers.arrayElement([
                'Met at team lunch',
                'Worked on project together',
                'Regular meetings',
                'Coffee chat'
              ])
            : undefined
        };
        this.recognitionData.push(recognition);
      });
    });
    return this.recognitionData;
  }

  // Helper to get consistent data for demos/tests
  static getSeededData(seed: number = 123): {
    users: MockUser[];
    interactions: MockInteraction[];
    recognitionData: MockRecognitionData[];
  } {
    faker.seed(seed);
    const generator = new MockDataGenerator('/assets/avatars');
    const users = generator.generateUsers(30);
    const interactions = generator.generateInteractions();
    const recognitionData = generator.generateRecognitionData();
    return { users, interactions, recognitionData };
  }
} 