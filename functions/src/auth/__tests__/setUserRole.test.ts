import * as admin from 'firebase-admin';
import { setUserRole } from '../setUserRole';
import { FunctionRequest, FunctionContext } from '../types/functions';

jest.mock('firebase-admin', () => ({
  auth: jest.fn(() => ({
    setCustomUserClaims: jest.fn(),
  })),
  firestore: jest.fn(() => ({
    doc: jest.fn(() => ({
      update: jest.fn(),
    })),
  })),
}));

describe('setUserRole', () => {
  const mockContext = {
    auth: {
      token: {
        admin: true
      }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set user role when called by admin', async () => {
    const data = { uid: 'test-uid', role: 'manager' };
    
    await setUserRole(data as FunctionRequest, mockContext as FunctionContext);

    expect(admin.auth().setCustomUserClaims).toHaveBeenCalledWith(
      'test-uid',
      { role: 'manager' }
    );
    expect(admin.firestore().doc).toHaveBeenCalledWith('users/test-uid');
  });

  it('should reject when caller is not admin', async () => {
    const data = { uid: 'test-uid', role: 'manager' };
    const nonAdminContext = { auth: { token: { admin: false } } };

    await expect(setUserRole(data as FunctionRequest, nonAdminContext as FunctionContext))
      .rejects
      .toThrow('permission-denied');
  });

  it('should validate role input', async () => {
    const data = { uid: 'test-uid', role: 'invalid-role' };

    await expect(setUserRole(data as FunctionRequest, mockContext as FunctionContext))
      .rejects
      .toThrow('invalid-argument');
  });
}); 