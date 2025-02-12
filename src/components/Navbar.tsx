import { Link } from 'react-router-dom';
import { Avatar } from './Avatar';
import './Navbar.css';

export const Navbar = () => {
  return (
    <div className="flex items-center">
      <Link 
        to="/profile" 
        className="profile-button"
      >
        <Avatar 
          src={user.photoURL} 
          name={user.displayName || user.email || 'User'} 
          size="md"
        />
        <span className="profile-text">
          {user.displayName || 'Profile'}
        </span>
      </Link>
    </div>
  );
};

<nav>
  <ul>
    <li><Link to="/dashboard">Dashboard</Link></li>
    <li><Link to="/visualizations">Visualizations</Link></li>
    <li><Link to="/demo/progressive-avatars">Progressive Avatars</Link></li>
    {user?.role === 'admin' && (
      <>
        <li><Link to="/question-editor">Question Editor</Link></li>
        <li><Link to="/demo/editor">Question Bank</Link></li>
      </>
    )}
  </ul>
</nav> 