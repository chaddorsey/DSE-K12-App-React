import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ShareStatusTracker } from '../ShareStatusTracker';
import { useShareStatus } from '../../../hooks/useShareStatus';
import { mockMonitoring } from '../../../hooks/testing/mockMonitoring';

jest.mock('../../../hooks/useShareStatus');

describe('ShareStatusTracker', () => {
  const mockUseShareStatus = useShareStatus as jest.Mock;
  
  beforeEach(() => {
    mockUseShareStatus.mockReturnValue({
      activeShares: [],
      totalProgress: 0,
      hasActiveShares: false
    });
  });

  it('renders nothing when no active shares', () => {
    render(<ShareStatusTracker />);
    expect(screen.queryByTestId('share-status')).not.toBeInTheDocument();
  });

  it('displays active share progress', () => {
    mockUseShareStatus.mockReturnValue({
      activeShares: [
        { id: '1', title: 'Test Share', progress: 50, status: 'in_progress' }
      ],
      totalProgress: 50,
      hasActiveShares: true
    });

    render(<ShareStatusTracker />);
    expect(screen.getByText('Test Share')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
  });

  it('shows error state for failed shares', () => {
    mockUseShareStatus.mockReturnValue({
      activeShares: [
        { 
          id: '1', 
          title: 'Failed Share', 
          progress: 0, 
          status: 'error',
          error: new Error('Network error')
        }
      ],
      totalProgress: 0,
      hasActiveShares: true
    });

    render(<ShareStatusTracker />);
    expect(screen.getByText('Failed Share')).toBeInTheDocument();
    expect(screen.getByText(/Network error/)).toBeInTheDocument();
  });

  it('tracks performance metrics', () => {
    const mockMonitors = mockMonitoring();
    
    mockUseShareStatus.mockReturnValue({
      activeShares: [
        { id: '1', title: 'Test Share', progress: 75, status: 'in_progress' }
      ],
      totalProgress: 75,
      hasActiveShares: true
    });

    render(<ShareStatusTracker />);

    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
      type: 'share_progress_update',
      metadata: {
        activeShares: 1,
        totalProgress: 75
      }
    });
  });
}); 