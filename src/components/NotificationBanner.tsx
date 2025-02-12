import React from 'react';

interface NotificationBannerProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: React.ReactNode;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  type = 'info',
  title,
  message
}) => {
  const styles = {
    success: 'bg-green-50 border-green-400 text-green-800',
    info: 'bg-blue-50 border-blue-400 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    error: 'bg-red-50 border-red-400 text-red-800'
  };

  return (
    <div className={`rounded-md border-l-4 p-4 ${styles[type]}`}>
      <div className="flex">
        <div className="flex-1">
          <h3 className="text-sm font-medium mb-2">{title}</h3>
          <div className="text-sm">{message}</div>
        </div>
      </div>
    </div>
  );
}; 