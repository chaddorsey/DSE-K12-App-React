import { useState, useCallback } from 'react';
import { MonitoringService } from '../monitoring/MonitoringService';
import type { IShareableContent } from '../components/sharing/types';

interface IShareOperation {
  id: string;
  title: string;
  content: IShareableContent;
  progress: number;
  status: 'pending' | 'in_progress' | 'complete' | 'error';
  error?: Error;
}

interface INewShareOperation {
  id: string;
  title: string;
  content: IShareableContent;
}

export function useShareStatus() {
  const [activeShares, setActiveShares] = useState<IShareOperation[]>([]);

  const trackShare = useCallback((share: INewShareOperation) => {
    setActiveShares(prev => [...prev, {
      ...share,
      progress: 0,
      status: 'pending'
    }]);

    MonitoringService.getInstance().trackPerformance({
      type: 'share_started',
      metadata: {
        shareId: share.id
      }
    });
  }, []);

  const updateProgress = useCallback((shareId: string, progress: number) => {
    setActiveShares(prev => prev.map(share => 
      share.id === shareId 
        ? { ...share, progress, status: 'in_progress' }
        : share
    ));
  }, []);

  const completeShare = useCallback((shareId: string) => {
    setActiveShares(prev => prev.filter(share => share.id !== shareId));

    MonitoringService.getInstance().trackPerformance({
      type: 'share_complete',
      success: true,
      metadata: {
        shareId
      }
    });
  }, []);

  const setShareError = useCallback((shareId: string, error: Error) => {
    setActiveShares(prev => prev.map(share =>
      share.id === shareId
        ? { ...share, status: 'error', error }
        : share
    ));

    MonitoringService.getInstance().trackPerformance({
      type: 'share_error',
      error,
      metadata: {
        shareId
      }
    });
  }, []);

  const retryShare = useCallback(async (shareId: string) => {
    setActiveShares(prev => prev.map(share =>
      share.id === shareId
        ? { ...share, status: 'in_progress', error: undefined, progress: 0 }
        : share
    ));
  }, []);

  const totalProgress = activeShares.reduce((sum, share) => 
    sum + (share.status === 'in_progress' ? share.progress : 0), 0
  ) / Math.max(activeShares.length, 1);

  return {
    activeShares,
    totalProgress,
    hasActiveShares: activeShares.length > 0,
    trackShare,
    updateProgress,
    completeShare,
    setShareError,
    retryShare
  };
} 