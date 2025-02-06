/**
 * Test utilities for form field components
 */
import { mockMonitoring } from '../../../../hooks/testing/mockMonitoring';

export const verifyPerformanceTracking = (mockMonitors: ReturnType<typeof mockMonitoring>) => {
  expect(mockMonitors.trackPerformance).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'interaction',
      success: true,
      totalTime: expect.any(Number),
      duration: expect.any(Number),
      metadata: expect.objectContaining({
        type: expect.stringMatching(/^(change|blur)$/),
      })
    })
  );
}; 