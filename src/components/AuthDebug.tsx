import React from 'react';
import { useAuth } from '../features/auth/AuthContext';

export const AuthDebug = () => {
  const { user } = useAuth();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-2 text-xs font-mono">
      <div className="max-w-7xl mx-auto">
        <pre>
          {JSON.stringify({ email: user?.email }, null, 2)}
        </pre>
      </div>
    </div>
  );
}; 