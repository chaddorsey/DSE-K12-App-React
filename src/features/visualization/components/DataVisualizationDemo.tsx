import React, { useState } from 'react';
import { mockUsers } from '../../connections/test/mockData';
import './DataVisualizationDemo.css';

export const DataVisualizationDemo: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'scatter'|'histogram'>('scatter');
  
  return (
    <div className="visualization-demo">
      <h1>Data Visualization Demo</h1>
      
      <div className="viz-controls">
        <select 
          value={selectedView} 
          onChange={e => setSelectedView(e.target.value as 'scatter'|'histogram')}
        >
          <option value="scatter">Scatter Plot</option>
          <option value="histogram">Histogram</option>
        </select>
      </div>

      <div className="viz-container">
        {/* Placeholder for visualization components */}
        <div className="viz-placeholder">
          <p>Visualization Demo Coming Soon</p>
          <p>Will display {selectedView} of user data</p>
          <p>Sample data: {mockUsers.length} users</p>
        </div>
      </div>
    </div>
  );
}; 