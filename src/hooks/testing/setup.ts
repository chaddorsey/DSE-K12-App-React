/**
 * Jest setup file for hook tests
 */

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

// Setup localStorage mock
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
  key: jest.fn(),
  length: 0
};
global.localStorage = localStorageMock;

// Clear mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Add custom matchers
expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    return {
      message: () =>
        `expected ${received} to be within range ${floor} - ${ceiling}`,
      pass
    };
  }
}); 