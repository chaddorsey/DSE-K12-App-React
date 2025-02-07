import React from 'react';
import { useShareDialog } from '../../hooks';
import { Button } from '../Button';
import { MonitoringService } from '../../monitoring/MonitoringService';
import type { IShareableContent } from './types';

interface IShareButtonProps {
  content: IShareableContent;
  className?: string;
}

export const ShareButton: React.FC<IShareButtonProps> = ({ 
  content,
  className
}) => {
  const { openShare } = useShareDialog();

  const handleClick = () => {
    MonitoringService.getInstance().trackPerformance({
      type: 'share_method_selected',
      metadata: {
        contentType: content.type,
        title: content.title
      }
    });
    
    openShare(content);
  };

  return (
    <Button
      onClick={handleClick}
      className={className}
      aria-label={`Share ${content.title}`}
    >
      Share
    </Button>
  );
}; 