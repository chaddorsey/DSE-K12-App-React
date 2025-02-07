import { useState, useEffect } from 'react';
import { MonitoringService } from '../monitoring/MonitoringService';
import type { IShareMethod, IShareableContent } from '../components/sharing/types';

export function useShareMethods() {
  const [availableMethods, setAvailableMethods] = useState<IShareMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function detectMethods() {
      try {
        const methods: IShareMethod[] = [];

        // Native share
        if (typeof navigator !== 'undefined' && navigator.share) {
          methods.push({
            id: 'native',
            label: 'Share',
            icon: 'share',
            isAvailable: async () => true,
            share: async (content: IShareableContent) => {
              await navigator.share({
                title: content.title,
                text: content.title,
                url: content.url
              });
            }
          });
        }

        // QR Code
        methods.push({
          id: 'qr',
          label: 'Show QR Code',
          icon: 'qrcode',
          isAvailable: async () => true,
          share: async (content: IShareableContent) => {
            // QR code sharing will be implemented in QRCodeShare component
            return Promise.resolve();
          }
        });

        // Clipboard
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          methods.push({
            id: 'copy',
            label: 'Copy Link',
            icon: 'copy',
            isAvailable: async () => true,
            share: async (content: IShareableContent) => {
              if (content.url) {
                await navigator.clipboard.writeText(content.url);
              }
            }
          });
        }

        setAvailableMethods(methods);
        MonitoringService.getInstance().trackPerformance({
          type: 'share_methods_detected',
          metadata: {
            availableMethods: methods.map(m => m.id)
          }
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to detect share methods'));
      } finally {
        setLoading(false);
      }
    }

    detectMethods();
  }, []);

  return {
    availableMethods,
    loading,
    error
  };
} 