import { testFirestoreConnection } from './firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

jest.mock('firebase/firestore');

describe('testFirestoreConnection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns true when Firestore write succeeds', async () => {
    (setDoc as jest.Mock).mockResolvedValue(undefined);

    const result = await testFirestoreConnection();
    expect(result).toBe(true);
  });

  it('returns false when Firestore write fails', async () => {
    (setDoc as jest.Mock).mockRejectedValue(new Error('Firestore error'));

    const result = await testFirestoreConnection();
    expect(result).toBe(false);
  });

  it('logs appropriate messages in development', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    process.env.NODE_ENV = 'development';
    
    await testFirestoreConnection();

    expect(consoleSpy).toHaveBeenCalledWith('Testing Firestore emulator connection...');
    expect(consoleSpy).toHaveBeenCalledWith('Firebase emulator connection successful');
  });
}); 