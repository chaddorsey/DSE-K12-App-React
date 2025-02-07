import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ShareButton } from '../ShareButton';
import { useShareDialog } from '../../../hooks';
import { MonitoringService } from '../../../monitoring/MonitoringService';
import type { IShareableContent } from '../types';

jest.mock('../../../hooks/useShareDialog');
jest.mock('../../../monitoring/MonitoringService');

describe('ShareButton', () => {
  const mockContent: IShareableContent = {
    type: 'url',
    url: 'https://example.com',
    title: 'Test Content'
  };

  const mockUseShareDialog = useShareDialog as jest.Mock;
  const mockOpenShare = jest.fn();

  beforeEach(() => {
    mockUseShareDialog.mockReturnValue({
      isOpen: false,
      content: null,
      openShare: mockOpenShare,
      closeShare: jest.fn()
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders share button', () => {
    const { getByRole } = render(
      <ShareButton content={mockContent} />
    );
    
    expect(getByRole('button')).toHaveTextContent('Share');
  });

  it('opens share dialog on click', () => {
    const { getByRole } = render(
      <ShareButton content={mockContent} />
    );

    fireEvent.click(getByRole('button'));
    expect(mockOpenShare).toHaveBeenCalledWith(mockContent);
  });

  it('tracks share button clicks', () => {
    const mockTrackPerformance = jest.fn();
    MonitoringService.getInstance = jest.fn().mockReturnValue({
      trackPerformance: mockTrackPerformance
    });

    const { getByRole } = render(
      <ShareButton content={mockContent} />
    );

    fireEvent.click(getByRole('button'));

    expect(mockTrackPerformance).toHaveBeenCalledWith({
      type: 'share_method_selected',
      metadata: {
        contentType: 'url',
        title: 'Test Content'
      }
    });
  });
}); 