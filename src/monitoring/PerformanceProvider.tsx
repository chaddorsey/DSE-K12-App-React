import React, { createContext, useContext } from 'react';
import type { PerformanceConfig } from '../providers/types';

interface IPerformanceContext {
  trackEvent: (name: string, data?: Record<string, unknown>) => void;
  startTimer: (name: string) => void;
  endTimer: (name: string) => void;
}

const PerformanceContext = createContext<IPerformanceContext | null>(null);

interface PerformanceProviderProps {
  children: React.ReactNode;
  config?: PerformanceConfig;
}

export const PerformanceProvider: React.FC<PerformanceProviderProps> = ({
  children
}) => {
  // Implementation will come later
  return (
    <PerformanceContext.Provider value={{
      trackEvent: () => {},
      startTimer: () => {},
      endTimer: () => {}
    }}>
      {children}
    </PerformanceContext.Provider>
  );
}; 