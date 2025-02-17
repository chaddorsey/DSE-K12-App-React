import { QuestionPlayground } from '../questions/components/QuestionPlayground';
import { AdminDashboard } from './components/AdminDashboard';
import { UserManagement } from './components/UserManagement';

export const adminRoutes = [
  {
    path: '',  // Dashboard
    element: <AdminDashboard />
  },
  {
    path: 'users',
    element: <UserManagement />
  },
  {
    path: 'questions/playground',
    element: <QuestionPlayground />
  },
  // ... other admin routes
]; 