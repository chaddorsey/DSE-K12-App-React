import React from 'react';
import type { IDashboardData } from '../../api/types/models';
import './Dashboard.css';

interface IDashboardViewProps {
  data: IDashboardData;
}

export const DashboardView: React.FC<IDashboardViewProps> = ({ data }) => {
  const { stats, recentActivity } = data;

  return (
    <div className="dashboard">
      <section className="dashboard__stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <p>{stats.activeUsers}</p>
        </div>
        <div className="stat-card">
          <h3>New Users</h3>
          <p>{stats.newUsers}</p>
        </div>
      </section>

      <section className="dashboard__activity">
        <h2>Recent Activity</h2>
        <ul className="activity-list">
          {recentActivity.map(activity => (
            <li key={activity.id} className="activity-item">
              <span className="activity-user">{activity.user}</span>
              <span className="activity-type">{activity.type}</span>
              <time className="activity-time">{activity.timestamp}</time>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}; 