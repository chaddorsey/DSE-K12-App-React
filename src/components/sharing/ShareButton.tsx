import React from 'react';
import { useShareDialog } from '../../hooks';
import { Button } from '../Button';
import { MonitoringService } from '../../monitoring/MonitoringService';
import type { IShareableContent } from './types';

interface IShareButtonProps {
  content: IShareableContent;
  onShare?: () => void;
  className?: string;
}

export const ShareButton: React.FC<IShareButtonProps> = ({
  content,
  onShare,
  className
}) => {
  const { openShare } = useShareDialog();
  const monitoring = MonitoringService.getInstance();

  const handleShare = async (): Promise<void> => {
    try {
      monitoring.trackInteraction({
        type: 'share_initiated',
        metadata: {
          contentType: content.type,
          title: content.title
        }
      });

      await openShare(content);
      onShare?.();
    } catch (error) {
      monitoring.trackError(error as Error, {
        component: 'ShareButton',
        content
      });
      throw error;
    }
  };

  return (
    <Button 
      onClick={handleShare}
      className={className}
      aria-label={`Share ${content.title}`}
    >
      Share
    </Button>
  );
}; 