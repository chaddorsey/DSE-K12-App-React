import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { AppProviders } from '../AppProviders';
import { useAuth } from '../../features/auth/context/AuthContext';
import { useNetwork } from '../../features/network/NetworkProvider';
import { NetworkMonitor } from '../../utils/NetworkMonitor';

const TestComponent: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const { isOnline } = useNetwork();

  return (
    <div>
      <div data-testid="status">
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'} - 
        {isOnline ? 'Online' : 'Offline'}
      </div>
      <button onClick={() => login({ email: 'test@test.com', password: 'test' })}>
        Login
      </button>
    </div>
  );
};

describe('AppProviders Integration', () => {
  it('handles auth state changes', async () => {
    render(
      <AppProviders>
        <TestComponent />
      </AppProviders>
    );

    expect(screen.getByTestId('status')).toHaveTextContent('Not Authenticated');
    
    await act(async () => {
      await screen.getByRole('button').click();
    });

    expect(screen.getByTestId('status')).toHaveTextContent('Authenticated');
  });

  it('handles network status changes', async () => {
    const networkMonitor = NetworkMonitor.getInstance();
    
    render(
      <AppProviders>
        <TestComponent />
      </AppProviders>
    );

    expect(screen.getByTestId('status')).toHaveTextContent('Online');
    
    await act(async () => {
      networkMonitor.updateStatus({ isOnline: false });
    });

    expect(screen.getByTestId('status')).toHaveTextContent('Offline');
  });

  it('maintains context isolation', () => {
    const TestWrapper = () => (
      <>
        <AppProviders>
          <TestComponent />
        </AppProviders>
        <AppProviders>
          <TestComponent />
        </AppProviders>
      </>
    );

    render(<TestWrapper />);
    
    const statuses = screen.getAllByTestId('status');
    expect(statuses).toHaveLength(2);
    expect(statuses[0]).toHaveTextContent('Not Authenticated');
    expect(statuses[1]).toHaveTextContent('Not Authenticated');
  });
}); 