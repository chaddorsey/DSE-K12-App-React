import React from 'react';
import { DataContainer } from '../DataContainer';
import { DashboardView } from './DashboardView';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';
import type { IDashboardData } from '../../api/types/models';

export const Dashboard: React.FC = () => {
  usePerformanceMonitoring('Dashboard');

  return (
    <DataContainer endpoint="dashboard.overview">
      {(data: IDashboardData) => <DashboardView data={data} />}
    </DataContainer>
  );
}; 