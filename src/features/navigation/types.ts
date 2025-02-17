import { UserRole } from '../auth/types/auth';

export interface NavLink {
  to: string;
  label: string;
  allowedRoles: UserRole[];
  requiresVerification?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { 
    to: '/', 
    label: 'Home',
    allowedRoles: ['user', 'manager', 'admin']
  },
  { 
    to: '/onboarding', 
    label: 'Onboarding',
    allowedRoles: ['user', 'manager', 'admin'],
    requiresVerification: true
  },
  { 
    to: '/connections', 
    label: 'Connections',
    allowedRoles: ['user', 'manager', 'admin'],
    requiresVerification: true
  },
  { 
    to: '/question-playground', 
    label: 'Quiz',
    allowedRoles: ['manager', 'admin']
  },
  { 
    to: '/question-editor', 
    label: 'Question Editor',
    allowedRoles: ['admin']
  },
  { 
    to: '/demo/editor', 
    label: 'Reset Questions',
    allowedRoles: ['admin']
  }
]; 