import React, { useEffect } from 'react';
import { useShareStatus } from '../../hooks/useShareStatus';
import { MonitoringService } from '../../monitoring/MonitoringService';
import './ShareStatusTracker.css';

export const ShareStatusTracker: React.FC = () => {
  const { activeShares, totalProgress, hasActiveShares } = useShareStatus();

  useEffect(() => {
    if (hasActiveShares) {
      MonitoringService.getInstance().trackPerformance({
        type: 'share_progress_update',
        metadata: {
          activeShares: activeShares.length,
          totalProgress
        }
      });
    }
  }, [activeShares, totalProgress, hasActiveShares]);

  if (!hasActiveShares) return null;

  return (
    <div className="share-status" data-testid="share-status">
      {activeShares.map(share => (
        <div key={share.id} className={`share-status__item share-status__item--${share.status}`}>
          <div className="share-status__header">
            <span className="share-status__title">{share.title}</span>
            {share.status === 'error' && (
              <button 
                className="share-status__retry"
                onClick={() => share.retry?.()}
                aria-label={`Retry sharing ${share.title}`}
              >
                Retry
              </button>
            )}
          </div>
          
          {share.status === 'error' ? (
            <div className="share-status__error" role="alert">
              {share.error?.message}
            </div>
          ) : (
            <div 
              className="share-status__progress"
              role="progressbar"
              aria-valuenow={share.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div 
                className="share-status__progress-bar"
                style={{ width: `${share.progress}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}; 