import { IUser, UserRole } from '../types/auth';

export const hasRole = (user: IUser | null, role: UserRole): boolean => {
  if (!user) return false;
  return user.role === role;
};

export const isAdmin = (user: IUser | null): boolean => {
  return hasRole(user, 'admin');
}; 