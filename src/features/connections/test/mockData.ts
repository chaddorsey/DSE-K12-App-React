import { User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: '/avatars/john.jpg',
    recognitionLevel: 'FACE',
    sharedInterests: ['React', 'TypeScript']
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: '/avatars/jane.jpg',
    recognitionLevel: 'NAME',
    sharedInterests: ['Python', 'Data Science']
  },
  {
    id: '3',
    name: 'Bob Wilson',
    avatar: '/avatars/bob.jpg',
    recognitionLevel: 'TALKED',
    sharedInterests: ['Education', 'React']
  }
]; 