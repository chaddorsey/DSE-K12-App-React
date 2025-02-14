import React, { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProfileService } from '../services/ProfileService';
import { Profile, ProfileError } from '../types';

export const ProfileDemo: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user) {
      // Save the current location and redirect to login
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    const loadProfile = async () => {
      try {
        setLoading(true);
        const profileService = new ProfileService();
        const userProfile = await profileService.getProfile(user.uid);
        setProfile(userProfile);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, navigate, location.pathname]);

  const handleUpdateBio = async () => {
    if (!user || !profile) return;
    
    try {
      const newBio = prompt('Enter new bio:', profile.bio);
      if (newBio === null) return;

      const profileService = new ProfileService();
      await profileService.updateProfile(user.uid, { bio: newBio });
      setProfile(prev => prev ? { ...prev, bio: newBio } : null);
    } catch (err) {
      setError('Failed to update bio');
    }
  };

  const handleUpdateStats = async () => {
    if (!user || !profile) return;
    
    try {
      const profileService = new ProfileService();
      await profileService.updateStats(user.uid, {
        questionsAnswered: profile.stats.questionsAnswered + 1
      });
      setProfile(prev => prev ? {
        ...prev,
        stats: {
          ...prev.stats,
          questionsAnswered: prev.stats.questionsAnswered + 1
        }
      } : null);
    } catch (err) {
      setError('Failed to update stats');
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profile Demo</h2>
      
      {profile && (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Bio</h3>
            <p>{profile.bio}</p>
            <button 
              onClick={handleUpdateBio}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
              Update Bio
            </button>
          </div>

          <div>
            <h3 className="font-semibold">Stats</h3>
            <p>Questions Answered: {profile.stats.questionsAnswered}</p>
            <p>Quizzes Taken: {profile.stats.quizzesTaken}</p>
            <p>Accurate Guesses: {profile.stats.accurateGuesses}</p>
            <button 
              onClick={handleUpdateStats}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
              Simulate Answer Question
            </button>
          </div>

          <div>
            <h3 className="font-semibold">Preferences</h3>
            <p>Notifications: {profile.preferences.notifications ? 'On' : 'Off'}</p>
            <p>Privacy: {profile.preferences.privacy}</p>
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-semibold">Raw Profile Data:</h3>
            <pre className="mt-2 text-sm">
              {JSON.stringify(profile, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}; 