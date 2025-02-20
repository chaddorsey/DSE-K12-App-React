export interface Profile {
  userId: string;
  bio: string;
  avatar: string;
  role: 'user' | 'admin';
  preferences: {
    notifications: boolean;
    privacy: 'public' | 'friends' | 'private';
  };
  stats?: {
    questionsAnswered: number;
    questionsCreated: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileUpdateData {
  bio?: string;
  avatar?: string;
  preferences?: Partial<Profile['preferences']>;
}

export class ProfileError extends Error {
  constructor(
    message: string,
    public code: 'NOT_FOUND' | 'VALIDATION_ERROR' | 'UNAUTHORIZED' | 'OPERATION_ERROR',
    public details?: unknown
  ) {
    super(message);
    this.name = 'ProfileError';
  }
} 