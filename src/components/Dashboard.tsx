import React from 'react';
import { useApi } from '../hooks/useApi';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import './Dashboard.css';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalSessions: number;
  averageSessionDuration: string;
  engagementRate: string;
  completionRate: string;
}

interface DashboardData {
  title: string;
  stats: DashboardStats;
  recentActivity: {
    newUsers: number;
    completedSessions: number;
    activeQuizzes: number;
  };
  trends: {
    userGrowth: string;
    sessionGrowth: string;
    completionTrend: string;
  };
}

interface ApiResponse {
  status: string;
  data: DashboardData;
}

export const Dashboard: React.FC = () => {
  const { data, loading, error } = useApi<ApiResponse>('dashboard.overview');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data || !data.data) return <ErrorMessage message="No data available" />;

  const { stats, recentActivity, trends } = data.data;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <p>{stats.activeUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Sessions</h3>
          <p>{stats.totalSessions}</p>
        </div>
        {/* Add more stat cards as needed */}
      </div>
      {/* Add more dashboard sections */}
    </div>
  );
}; 