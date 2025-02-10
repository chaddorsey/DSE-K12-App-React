import React from 'react';

// Create a basic context for mocked data
const MockContext = React.createContext<null>(null);

export const MockDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Simply render children without any API context
  return <>{children}</>;
}; 