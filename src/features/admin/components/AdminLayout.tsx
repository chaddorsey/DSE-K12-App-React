import { Outlet } from 'react-router-dom';
import { AdminMenu } from './AdminMenu';

export const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminMenu />
      <main>
        <Outlet />
      </main>
    </div>
  );
}; 