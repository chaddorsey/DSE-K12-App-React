import { MockDataGenerator } from '../mockDataGenerator';

describe('MockDataGenerator', () => {
  let generator: MockDataGenerator;

  beforeEach(() => {
    generator = new MockDataGenerator('/test/avatars');
  });

  it('generates the specified number of users', () => {
    const users = generator.generateUsers(10);
    expect(users).toHaveLength(10);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('avatar');
  });

  it('generates interactions between users', () => {
    generator.generateUsers(5);
    const interactions = generator.generateInteractions(1, 3);
    
    expect(interactions.length).toBeGreaterThanOrEqual(5);
    expect(interactions[0]).toHaveProperty('userId');
    expect(interactions[0]).toHaveProperty('targetId');
    expect(interactions[0].userId).not.toBe(interactions[0].targetId);
  });

  it('generates recognition data', () => {
    generator.generateUsers(5);
    const recognitionData = generator.generateRecognitionData();
    
    expect(recognitionData.length).toBeGreaterThan(0);
    expect(recognitionData[0]).toHaveProperty('level');
    expect(['FACE', 'NAME', 'TALKED', 'KNOW_WELL']).toContain(recognitionData[0].level);
  });

  it('produces consistent data with seeding', () => {
    const data1 = MockDataGenerator.getSeededData(123);
    const data2 = MockDataGenerator.getSeededData(123);
    
    expect(data1.users[0].id).toBe(data2.users[0].id);
    expect(data1.users[0].name).toBe(data2.users[0].name);
  });
}); 