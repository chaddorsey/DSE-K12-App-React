/**
 * Tests for LocalStorage strategy
 */

import { LocalStorage } from '../LocalStorage';
import { ICacheEntry } from '../../CacheManager';

describe('LocalStorage', () => {
  let storage: LocalStorage;
  const testEntry: ICacheEntry<unknown> = {
    data: { test: 'data' },
    timestamp: Date.now()
  };

  beforeEach(() => {
    storage = new LocalStorage('test:');
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should store and retrieve entries', () => {
    storage.set('test', testEntry);
    expect(storage.get('test')).toEqual(testEntry);
  });

  it('should handle JSON parse errors', () => {
    localStorage.setItem('test:invalid', 'invalid json');
    expect(storage.get('invalid')).toBeUndefined();
  });

  it('should handle storage quota exceeded', () => {
    const mockError = new Error('QuotaExceededError');
    mockError.name = 'QuotaExceededError';
    
    jest.spyOn(localStorage, 'setItem').mockImplementationOnce(() => {
      throw mockError;
    });

    storage.set('test', testEntry);
    // Should not throw and should clear storage
    expect(storage.size()).toBe(0);
  });

  it('should only clear prefixed entries', () => {
    storage.set('test1', testEntry);
    localStorage.setItem('other', 'value');
    storage.clear();

    expect(storage.size()).toBe(0);
    expect(localStorage.getItem('other')).toBe('value');
  });

  it('should return filtered entries', () => {
    storage.set('test1', testEntry);
    storage.set('test2', { ...testEntry, data: 'other' });
    localStorage.setItem('other', 'value');

    const entries = storage.entries();
    expect(entries).toHaveLength(2);
    expect(entries[0][0]).toBe('test1');
    expect(entries[1][0]).toBe('test2');
  });
}); 