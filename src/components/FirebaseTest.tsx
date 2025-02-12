import React, { useEffect, useState } from 'react';
import { testFirebaseConnection } from '../config/firebase';

export const FirebaseTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'success' | 'error'>('testing');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const result = await testFirebaseConnection();
        setConnectionStatus(result ? 'success' : 'error');
      } catch (error) {
        console.error('Connection test failed:', error);
        setConnectionStatus('error');
      }
    };

    testConnection();
  }, []);

  return (
    <div>
      <h2>Firebase Connection Test</h2>
      <p>Status: {connectionStatus}</p>
      {connectionStatus === 'error' && (
        <p style={{ color: 'red' }}>
          Check your Firebase configuration and environment variables
        </p>
      )}
    </div>
  );
}; 