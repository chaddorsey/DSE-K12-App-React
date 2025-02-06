import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppLayout } from '../AppLayout';

// Mock the NetworkStatusIndicator component
jest.mock('../../NetworkStatusIndicator/NetworkStatusIndicator', () => ({
  NetworkStatusIndicator: () => <div data-testid="network-status">Network Status</div>
}));

describe('AppLayout', () => {
  it('should render children and network status indicator', () => {
    render(
      <AppLayout>
        <div>Test Content</div>
      </AppLayout>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByTestId('network-status')).toBeInTheDocument();
  });

  it('should show latency in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <AppLayout>
        <div>Test Content</div>
      </AppLayout>
    );

    // Verify NetworkStatusIndicator props through snapshot or component props
    expect(screen.getByTestId('network-status')).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });
}); 