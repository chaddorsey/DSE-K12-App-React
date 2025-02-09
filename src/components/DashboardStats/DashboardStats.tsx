import React from 'react';
import { DataContainer } from '../DataContainer';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';
import type { IDashboardData } from '../../api/types/models';
import './DashboardStats.css';

interface IDashboardStatsProps {
  timeframe: 'day' | 'week' | 'month' | 'year';
}

export function DashboardStats({ timeframe }: IDashboardStatsProps) {
  usePerformanceMonitoring('DashboardStats');

  return (
    <DataContainer<'dashboard.overview'>
      endpoint="dashboard.overview"
      params={{ timeframe }}
    >
      {(data: IDashboardData) => (
        <div className="dashboard-stats">
          <div className="stat-item">
            <span className="stat-label">Views</span>
            <span className="stat-value">{data.stats.views}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Interactions</span>
            <span className="stat-value">{data.stats.interactions}</span>
          </div>
        </div>
      )}
    </DataContainer>
  );
} 