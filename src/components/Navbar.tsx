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