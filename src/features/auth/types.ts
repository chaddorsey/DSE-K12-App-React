export interface IUser {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  preferences?: Record<string, unknown>;
} 