/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
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

// Mock Firebase
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(() => jest.fn()),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  updateProfile: jest.fn()
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn()
}));

// Clean up after each test
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

expect.extend(toHaveNoViolations); 