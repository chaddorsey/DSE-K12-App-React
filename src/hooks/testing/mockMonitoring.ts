/**
 * Monitoring service mocks for tests
 */

import { MonitoringService } from '../../monitoring/MonitoringService';

export function mockMonitoring() {
  const trackPerformance = jest.fn();
  const trackError = jest.fn();
  const trackInteraction = jest.fn();

  jest.spyOn(MonitoringService, 'getInstance').mockImplementation(() => ({
    trackPerformance,
    trackError,
    trackInteraction
  } as unknown as MonitoringService));

  return {
    trackPerformance,
    trackError,
    trackInteraction
  };
} 