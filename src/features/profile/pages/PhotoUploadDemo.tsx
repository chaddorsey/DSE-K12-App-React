import React, { useState } from 'react';
import { ProfilePhotoUploader } from '../components/ProfilePhotoUploader';
import { useAuth } from '@/features/auth/context/AuthContext';

interface DemoState {
  attempts: number;
  lastUpload: Date | null;
  errors: string[];
}

export const PhotoUploadDemo = () => {
  const { user } = useAuth();
  const [demoState, setDemoState] = useState<DemoState>({
    attempts: 0,
    lastUpload: null,
    errors: []
  });

  const handleUploadComplete = () => {
    setDemoState(prev => ({
      ...prev,
      attempts: prev.attempts + 1,
      lastUpload: new Date()
    }));
  };

  const handleError = (error: string) => {
    setDemoState(prev => ({
      ...prev,
      attempts: prev.attempts + 1,
      errors: [...prev.errors, error]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Photo Upload Demo</h1>
        <p className="text-gray-600">
          Test the photo upload functionality with different file types and sizes.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Upload Interface</h2>
          <ProfilePhotoUploader />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Demo Statistics</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Current User</h3>
              <p className="text-sm text-gray-600">
                {user ? `${user.displayName} (${user.email})` : 'Not logged in'}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Upload Attempts</h3>
              <p className="text-sm text-gray-600">{demoState.attempts}</p>
            </div>

            {demoState.lastUpload && (
              <div>
                <h3 className="font-medium text-gray-700">Last Upload</h3>
                <p className="text-sm text-gray-600">
                  {demoState.lastUpload.toLocaleString()}
                </p>
              </div>
            )}

            {demoState.errors.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-700">Recent Errors</h3>
                <ul className="text-sm text-red-600 list-disc list-inside">
                  {demoState.errors.slice(-3).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        <section className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Testing Instructions</h2>
          <div className="prose prose-sm">
            <ul className="list-disc list-inside space-y-2">
              <li>Try uploading different image formats (JPG, PNG, WebP)</li>
              <li>Test with various file sizes (small: &lt;100KB, large: &gt;5MB)</li>
              <li>Verify image optimization by checking final file size</li>
              <li>Test error handling by attempting invalid file types</li>
              <li>Verify progress indication during processing and upload</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}; 