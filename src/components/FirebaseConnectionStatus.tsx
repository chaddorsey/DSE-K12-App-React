import React, { useEffect, useState } from 'react';
import { testFirestoreConnection } from '../config/firebase';
import { useAuth } from '../features/auth/context/AuthContext';

export const FirebaseConnectionStatus: React.FC = () => {
  const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const { user } = useAuth();

  useEffect(() => {
    const testConnection = async () => {
      const isConnected = await testFirestoreConnection();
      setStatus(isConnected ? 'success' : 'error');
    };

    testConnection();
  }, []);

  if (status === 'testing') return null;

  return (
    <div className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
      Firebase: {' '}
      <span className={`
        ${status === 'success' ? 'text-emerald-500' : 'text-red-500'}
        font-bold
      `}>
        {status === 'success' ? '●' : '○'}
      </span>
    </div>
  );
}; 