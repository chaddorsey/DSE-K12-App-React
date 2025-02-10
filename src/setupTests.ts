/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';

// Mock fetch globally
global.fetch = jest.fn(() => 
  Promise.resolve({
    headers: new Headers({ 'content-type': 'application/json' }),
    redirected: false
  })
) as jest.Mock;

// Mock window.navigator
Object.defineProperty(window, 'navigator', {
  value: {
    onLine: true
  },
  writable: true,
  configurable: true
});

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

expect.extend(toHaveNoViolations); 