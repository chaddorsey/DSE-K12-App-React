import { faker } from '@faker-js/faker';
import { EXTENDED_QUESTIONS } from '../../../constants/questions';
import type { MockUser, MockInteraction, MockRecognitionData } from '../types/mock-data';
import { DataLoader } from './dataLoader';
import { AVATAR_DATA } from '../constants/avatars';

const DEPARTMENTS = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR'];
const ROLES = ['Engineer', 'Manager', 'Designer', 'Product Manager', 'Analyst'];
const TAGS = ['new-hire', 'mentor', 'team-lead', 'remote', 'office'];

export class EnhancedMockDataGenerator {
  private users: MockUser[] = [];
  private interactions: MockInteraction[] = [];
  private recognitionData: MockRecognitionData[] = [];
  private initializePromise: Promise<void> | null = null;

  constructor() {
    // Don't call initialize here, wait for explicit call
  }

  private async initialize() {
    if (!this.initializePromise) {
      this.initializePromise = (async () => {
        try {
          const [userData, avatarPaths] = await Promise.all([
            DataLoader.loadUserData(),
            DataLoader.loadAvatarPaths()
          ]);

          // If we can't load real data, use fallback data
          if (!userData.length) {
            console.warn('No user data loaded, using fallback data');
            this.users = this.generateFallbackUsers();
          } else {
            this.users = userData.map(user => ({
              id: user.id,
              name: user.name,
              avatar: `/assets/avatars/${user.avatarFile}`,
              department: this.getDepartmentFromResponses(user.responses),
              role: this.getRoleFromResponses(user.responses),
              joinDate: faker.date.past(2).toISOString(),
              tags: this.getTagsFromResponses(user.responses),
              lastInteraction: faker.date.recent({ days: 30 }).toISOString(),
              responses: user.responses
            }));
          }
        } catch (error) {
          console.error('Failed to initialize mock data generator:', error);
          this.users = this.generateFallbackUsers();
        }
      })();
    }
    await this.initializePromise;
  }

  private generateFallbackUsers(count: number = 20): MockUser[] {
    // Use available avatar data first
    const avatarUsers = AVATAR_DATA.map(({ filename, characterName }) => ({
      id: faker.string.uuid(),
      name: characterName,
      avatar: `/assets/avatars/${filename}`,
      department: faker.helpers.arrayElement(DEPARTMENTS),
      role: faker.helpers.arrayElement(ROLES),
      joinDate: faker.date.past(2).toISOString(),
      tags: faker.helpers.arrayElements(TAGS, { min: 1, max: 3 }),
      lastInteraction: faker.date.recent({ days: 30 }).toISOString(),
      responses: this.generateFakeResponses()
    }));

    // If more users are needed, generate them with random names and repeated avatars
    if (count > AVATAR_DATA.length) {
      const additionalUsers = Array.from({ length: count - AVATAR_DATA.length }, (_, i) => {
        const avatarData = faker.helpers.arrayElement(AVATAR_DATA);
        return {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          avatar: `/assets/avatars/${avatarData.filename}`,
          department: faker.helpers.arrayElement(DEPARTMENTS),
          role: faker.helpers.arrayElement(ROLES),
          joinDate: faker.date.past(2).toISOString(),
          tags: faker.helpers.arrayElements(TAGS, { min: 1, max: 3 }),
          lastInteraction: faker.date.recent({ days: 30 }).toISOString(),
          responses: this.generateFakeResponses()
        };
      });
      return [...avatarUsers, ...additionalUsers];
    }

    return avatarUsers.slice(0, count);
  }

  async generateEnhancedUsers(additionalCount: number = 10): Promise<MockUser[]> {
    if (!this.users.length) {
      await this.initialize();
    }

    // Generate additional users if requested
    if (additionalCount > 0) {
      const additionalUsers = this.generateFallbackUsers(additionalCount);
      this.users = [...this.users, ...additionalUsers];
    }

    return this.users;
  }

  generateInteractions(minPerUser: number = 2, maxPerUser: number = 5): MockInteraction[] {
    if (!this.users.length) return [];

    this.interactions = [];
    this.users.forEach(user => {
      const interactionCount = faker.number.int({ min: minPerUser, max: maxPerUser });
      for (let i = 0; i < interactionCount; i++) {
        const otherUsers = this.users.filter(u => u.id !== user.id);
        if (!otherUsers.length) continue;

        const target = faker.helpers.arrayElement(otherUsers);
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

  private getDepartmentFromResponses(responses: Record<string, string>): string {
    const deptQuestion = EXTENDED_QUESTIONS.find(q => q.label === 'professional_cat');
    if (deptQuestion && responses[`q${deptQuestion.number}`]) {
      return responses[`q${deptQuestion.number}`];
    }
    return faker.helpers.arrayElement(DEPARTMENTS);
  }

  private getRoleFromResponses(responses: Record<string, string>): string {
    return faker.helpers.arrayElement(ROLES);
  }

  private getTagsFromResponses(responses: Record<string, string>): string[] {
    return faker.helpers.arrayElements(TAGS, { min: 1, max: 3 });
  }

  private generateFakeResponses(): Record<string, string> {
    const responses: Record<string, string> = {};
    EXTENDED_QUESTIONS.forEach(question => {
      if (question.type === 'MC' && question.options.length) {
        responses[`q${question.number}`] = faker.helpers.arrayElement(question.options);
      } else if (question.type === 'NM') {
        responses[`q${question.number}`] = faker.number.int({ min: 0, max: 100 }).toString();
      } else {
        responses[`q${question.number}`] = faker.lorem.sentence();
      }
    });
    return responses;
  }

  generateRecognitionData(): MockRecognitionData[] {
    if (!this.users.length) return [];

    this.recognitionData = [];
    this.users.forEach(user => {
      const recognizedUsers = faker.helpers.arrayElements(
        this.users.filter(u => u.id !== user.id),
        { min: 2, max: 5 }
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
} 