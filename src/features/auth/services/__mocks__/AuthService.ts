import { IUser } from '../../types/auth';

export const authService = {
  signUp: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
  resetPassword: jest.fn(),
  getUserData: jest.fn()
}; 