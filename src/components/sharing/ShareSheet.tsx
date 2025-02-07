import React, { useEffect } from 'react';
import { Dialog } from '../Dialog';
import { LoadingSpinner } from '../LoadingSpinner';
import { useShareMethods } from '../../hooks/useShareMethods';
import { MonitoringService } from '../../monitoring/MonitoringService';
import type { IShareableContent } from './types';
import './ShareSheet.css';

export interface IShareSheetProps {
  content: IShareableContent;
  onShare?: () => void;
}

export const ShareSheet: React.FC<IShareSheetProps> = ({ content, onShare }) => {
  const { availableMethods, loading, error } = useShareMethods();

  const handleMethodSelect = async (methodId: string) => {
    const method = availableMethods.find(m => m.id === methodId);
    if (!method) return;

    try {
      await method.share(content);
      MonitoringService.getInstance().trackPerformance({
        type: 'share_method_selected',
        metadata: {
          methodId,
          contentType: content.type
        }
      });
      onShare?.();
    } catch (err) {
      // Error handling will be managed by ShareStatusTracker
    }
  };

  return (
    <Dialog isOpen={true} onClose={onShare} title="Share">
      <div className="share-sheet">
        {loading && (
          <div className="share-sheet__loading">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="share-sheet__error" role="alert">
            {error.message}
          </div>
        )}

        {!loading && !error && (
          <div className="share-sheet__methods">
            {availableMethods.map(method => (
              <button
                key={method.id}
                className="share-sheet__method"
                onClick={() => handleMethodSelect(method.id)}
              >
                <span className={`share-sheet__method-icon icon-${method.icon}`} />
                <span className="share-sheet__method-label">{method.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </Dialog>
  );
}; 