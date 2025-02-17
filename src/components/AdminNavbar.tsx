import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <ul>
        <li>
          <NavLink to="/admin/onboarding">Answer Questions</NavLink>
        </li>
        <li>
          <NavLink to="/admin/questions">Questions</NavLink>
        </li>
        <li>
          <NavLink to="/admin/questions/playground">Question Playground</NavLink>
        </li>
        {/* ... other nav items */}
      </ul>
    </nav>
  );
}; 