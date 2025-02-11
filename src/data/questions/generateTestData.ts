import { faker } from '@faker-js/faker';
import type { Question } from '../../features/questions/types';

export function generateTestQuestions(count: number): Question[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `test-q${i + 1}`,
    type: faker.helpers.arrayElement(['MC', 'OP', 'NM', 'SCALE']),
    text: faker.lorem.sentence(),
    label: faker.helpers.slugify(faker.lorem.words(2)),
    category: faker.helpers.arrayElement(['PERSONALITY', 'PROFESSIONAL', 'DEMOGRAPHIC', 'INTERESTS']),
    number: i + 1,
    options: faker.helpers.maybe(() => Array.from({ length: 4 }, () => faker.lorem.words(3)), { probability: 0.5 }),
    requiredForOnboarding: faker.datatype.boolean(),
    includeInOnboarding: faker.datatype.boolean()
  }));
} 