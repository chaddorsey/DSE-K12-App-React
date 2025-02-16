import { AVATAR_DATA } from '../constants/avatars';
import Papa from 'papaparse';

interface RawUserData {
  id: string;
  name: string;
  avatarFile: string;
  responses: Record<string, string>;
}

export class DataLoader {
  private static readonly AVATAR_BASE_PATH = '/assets/avatars';
  private static readonly USER_DATA_PATH = '/data/user_list.csv';

  static async loadUserData(): Promise<RawUserData[]> {
    try {
      const response = await fetch(this.USER_DATA_PATH);
      if (!response.ok) {
        console.warn(`Failed to load user data CSV: ${response.statusText}`);
        return this.generateFallbackData();
      }

      const csvText = await response.text();
      const { data, errors } = Papa.parse(csvText, { 
        header: true,
        skipEmptyLines: true 
      });

      if (errors.length > 0) {
        console.warn('CSV parsing errors:', errors);
        return this.generateFallbackData();
      }

      return (data as any[]).map(row => {
        const responses: Record<string, string> = {};
        
        // Extract known question responses from CSV columns
        const questionColumns = [
          'cat_dog', 'star_wars_trek', 'professional_cat', 
          'num_tvs', 'secret'
        ];

        questionColumns.forEach(col => {
          if (row[col]) {
            responses[col] = row[col];
          }
        });

        return {
          id: row.id || faker.string.uuid(),
          name: row.name || faker.person.fullName(),
          avatarFile: row.avatar || faker.helpers.arrayElement(AVATAR_DATA).filename,
          responses
        };
      });
    } catch (error) {
      console.error('Error loading user data:', error);
      return this.generateFallbackData();
    }
  }

  private static generateFallbackData(): RawUserData[] {
    return AVATAR_DATA.map(({ filename, characterName }) => ({
      id: faker.string.uuid(),
      name: characterName,
      avatarFile: filename,
      responses: {
        cat_dog: faker.helpers.arrayElement(['Cat person', 'Dog person']),
        star_wars_trek: faker.helpers.arrayElement(['Star Wars', 'Star Trek', 'Both', 'Neither']),
        professional_cat: faker.helpers.arrayElement(['Engineer', 'Designer', 'Student', 'Other']),
        num_tvs: faker.number.int({ min: 0, max: 5 }).toString(),
        secret: faker.lorem.sentence()
      }
    }));
  }

  static async loadAvatarPaths(): Promise<string[]> {
    return AVATAR_DATA.map(({ filename }) => `${this.AVATAR_BASE_PATH}/${filename}`);
  }

  private static getMockData = () => {
    if (process.env.NODE_ENV === 'development') {
      // Dynamic import for development only
      return import('./mockDataGenerator').then(module => module.generateMockData());
    }
    return Promise.resolve([]);
  };
} 