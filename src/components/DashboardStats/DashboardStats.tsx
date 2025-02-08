import React from 'react';
import { DataContainer } from '../DataContainer';
import type { ApiEndpoints } from '../types/api';

interface IDashboardStatsProps {
  timeframe: ApiEndpoints['dashboard.stats']['params']['timeframe'];
}

export function DashboardStats({
  timeframe
}: IDashboardStatsProps): React.ReactElement {
  return (
    <DataContainer<'dashboard.stats'>
      endpoint="dashboard.stats"
      params={{ timeframe }}
    >
      {(data) => (
        <div>
          <div>Views: {data.views}</div>
          <div>Interactions: {data.interactions}</div>
        </div>
      )}
    </DataContainer>
  );
} 