export interface User {
  id: string;
  name: string;
  avatar: string;
  recognitionLevel: RecognitionLevel;
  sharedInterests?: string[];
}

export type RecognitionLevel = 'FACE' | 'NAME' | 'TALKED' | 'KNOW_WELL';

export interface AvatarGridProps {
  users: User[];
  searchQuery: string;
  selectedLevels: RecognitionLevel[];
  onUserSelect: (userId: string) => void;
} 