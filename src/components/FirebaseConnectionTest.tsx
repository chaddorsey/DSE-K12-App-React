import React, { useEffect, useState } from 'react';
import { testFirebaseConnection } from '../config/firebase';

export const FirebaseConnectionTest: React.FC = () => {
  const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Starting Firebase connection test...');
        const isConnected = await testFirebaseConnection();
        console.log('Connection test result:', isConnected);
        setStatus(isConnected ? 'success' : 'error');
      } catch (error) {
        console.error('Connection test error:', error);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Firebase Connection Test</h2>
      <div className="mb-2">
        Status: <span className={`font-bold ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {status}
        </span>
      </div>
      {status === 'error' && (
        <div className="text-red-600">
          <p>Make sure:</p>
          <ul className="list-disc ml-6">
            <li>Firebase emulators are running (npm run emulators)</li>
            <li>Environment variables are set correctly</li>
            <li>You're using the correct ports (check firebase.json)</li>
          </ul>
          {errorMessage && (
            <p className="mt-2">Error details: {errorMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}; 