import React from 'react';
import { useApi } from '../hooks/useApi';
import { ErrorDisplay } from './ErrorDisplay/ErrorDisplay';

interface Data {
  id: number;
  name: string;
  // Add other required fields
}

export const SomeDataComponent: React.FC = () => {
  const {
    data,
    loading,
    errorMessage,
    get: getData
  } = useApi<Data>();

  React.useEffect(() => {
    getData('/api/data');
  }, [getData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return (
      <ErrorDisplay
        error={errorMessage}
        onAction={() => getData('/api/data')}
      />
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      {/* Replace with actual data rendering */}
      <p>Data loaded successfully</p>
    </div>
  );
}; 