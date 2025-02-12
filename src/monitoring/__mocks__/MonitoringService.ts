export const MonitoringService = {
  getInstance: jest.fn(() => ({
    trackEvent: jest.fn(),
    trackError: jest.fn()
  }))
}; 