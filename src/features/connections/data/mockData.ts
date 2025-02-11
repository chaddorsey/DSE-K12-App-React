import { EnhancedMockDataGenerator } from '../utils/enhancedMockDataGenerator';
import type { MockUser, MockInteraction, MockRecognitionData } from '../types/mock-data';

let mockDataPromise: Promise<{
  users: MockUser[];
  interactions: MockInteraction[];
  recognitionData: MockRecognitionData[];
}> | null = null;

async function initializeMockData() {
  if (!mockDataPromise) {
    mockDataPromise = (async () => {
      try {
        const generator = new EnhancedMockDataGenerator();
        const users = await generator.generateEnhancedUsers();
        const interactions = generator.generateInteractions();
        const recognitionData = generator.generateRecognitionData();
        return { users, interactions, recognitionData };
      } catch (error) {
        console.error('Failed to initialize mock data:', error);
        return { users: [], interactions: [], recognitionData: [] };
      }
    })();
  }
  return mockDataPromise;
}

export async function getMockUsers() {
  const data = await initializeMockData();
  return data.users;
}

export async function getMockInteractions() {
  const data = await initializeMockData();
  return data.interactions;
}

export async function getMockRecognitionData() {
  const data = await initializeMockData();
  return data.recognitionData;
}

// Export specific subsets for different scenarios
export async function getNewHires() {
  const data = await initializeMockData();
  return data.users.filter(u => 
    u.tags?.includes('new-hire') && 
    new Date(u.joinDate!).getTime() > Date.now() - (90 * 24 * 60 * 60 * 1000)
  );
}

export async function getTeamMembers(departmentId: string) {
  const data = await initializeMockData();
  return data.users.filter(u => u.department === departmentId);
}

export async function getUserInteractions(userId: string) {
  const data = await initializeMockData();
  return data.interactions.filter(i => i.userId === userId || i.targetId === userId);
}

export async function getUserRecognitionData(userId: string) {
  const data = await initializeMockData();
  return data.recognitionData.filter(r => r.recognizedById === userId);
} 