export interface MockUser {
  id: string;
  name: string;
  avatar: string;
  department?: string;
  role?: string;
  joinDate?: string;
  connections?: string[]; // IDs of other users they're connected to
  tags?: string[]; // e.g., 'new-hire', 'mentor', 'team-lead'
  lastInteraction?: string; // ISO date string
}

export interface MockInteraction {
  userId: string;
  targetId: string;
  type: 'meeting' | 'chat' | 'email' | 'collaboration';
  date: string;
  context?: string;
}

export interface MockRecognitionData {
  userId: string;
  recognizedById: string;
  level: 'FACE' | 'NAME' | 'TALKED' | 'KNOW_WELL';
  timestamp: string;
  context?: string;
} 