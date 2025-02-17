export type UserRole = 'user' | 'manager' | 'admin';

export interface UserClaims {
  role: UserRole;
} 