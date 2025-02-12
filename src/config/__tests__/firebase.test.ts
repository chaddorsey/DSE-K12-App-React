import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

jest.mock('firebase/app');
jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('firebase/storage');

describe('Firebase Config', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'development';
  });

  it('connects to emulators in development', () => {
    require('../firebase');

    expect(connectAuthEmulator).toHaveBeenCalledWith(
      expect.anything(),
      'http://localhost:5005'
    );
    expect(connectFirestoreEmulator).toHaveBeenCalledWith(
      expect.anything(),
      'localhost',
      5006
    );
    expect(connectStorageEmulator).toHaveBeenCalledWith(
      expect.anything(),
      'localhost',
      5008
    );
  });

  it('uses production config in production', () => {
    process.env.NODE_ENV = 'production';
    require('../firebase');

    expect(connectAuthEmulator).not.toHaveBeenCalled();
    expect(connectFirestoreEmulator).not.toHaveBeenCalled();
    expect(connectStorageEmulator).not.toHaveBeenCalled();
  });
}); 