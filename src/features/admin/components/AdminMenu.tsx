import { Link } from 'react-router-dom';
import './AdminMenu.css';

export const AdminMenu = () => {
  return (
    <nav className="admin-menu">
      <Link to="/admin" className="menu-item">
        Home
      </Link>
      <Link to="/admin/analytics" className="menu-item">
        Anal.
      </Link>
      <Link to="/admin/questions/playground" className="menu-item">
        Question Playground
      </Link>
      <Link to="/admin/users" className="menu-item">
        Users
      </Link>
      <Link to="/admin/settings" className="menu-item">
        Settings
      </Link>
    </nav>
  );
}; 