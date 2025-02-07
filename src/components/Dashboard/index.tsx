import React from 'react';
import { useApi } from '../../hooks/useApi';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';
import type { IDashboardData } from '../../api/types/models';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  usePerformanceMonitoring('Dashboard');
  const { data, loading, error } = useApi<IDashboardData>('dashboard.overview');

  if (loading) {
    return (
      <div className="dashboard dashboard--loading">
        <div className="dashboard__loader">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard dashboard--error">
        <div className="dashboard__error">
          <h2>Unable to load dashboard</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="dashboard" data-testid="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard__stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <div className="stat-value">{data.stats.totalUsers}</div>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <div className="stat-value">{data.stats.activeUsers}</div>
        </div>
        <div className="stat-card">
          <h3>New Users</h3>
          <div className="stat-value">{data.stats.newUsers}</div>
        </div>
      </div>
      <section className="dashboard__activity">
        <h2>Recent Activity</h2>
        <ul className="activity-list">
          {data.recentActivity.map(activity => (
            <li key={activity.id} className="activity-item">
              <span className="activity-type">{activity.type}</span>
              <span className="activity-description">{activity.description}</span>
              <time className="activity-time">{activity.timestamp}</time>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}; 