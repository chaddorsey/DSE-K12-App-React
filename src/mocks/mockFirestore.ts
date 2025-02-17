import type { Firestore, CollectionReference, DocumentReference, QuerySnapshot } from '@firebase/firestore';

const createMockCollection = () => {
  const docs = new Map();

  return {
    add: jest.fn(async (data) => {
      const id = data.id || Math.random().toString(36).substr(2, 9);
      docs.set(id, { ...data, id });
      return { id, get: () => ({ data: () => docs.get(id) }) };
    }),
    doc: jest.fn((id) => ({
      get: async () => ({ data: () => docs.get(id) }),
      set: async (data) => {
        docs.set(id, { ...data, id });
        return;
      }
    })),
    where: jest.fn(() => ({
      get: async () => ({
        docs: Array.from(docs.values()).map(doc => ({
          data: () => doc
        }))
      })
    }))
  };
};

export const mockFirestore = {
  collection: jest.fn((name) => createMockCollection())
} as unknown as Firestore; 