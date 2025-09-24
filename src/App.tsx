import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Navigation, Tab } from './components/layout/Navigation';
import { ExplorePage } from './pages/ExplorePage';
import { EngagePage } from './pages/EngagePage';
import { FeaturedPage } from './pages/FeaturedPage';
import { UserProfile } from './components/common/UserProfile';
import { User } from './types';
import { LocalizeAPI } from './services/api';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('explore');
  const [user, setUser] = useState<User | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await LocalizeAPI.getUser();
        setUser(userData);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'explore':
        return <ExplorePage />;
      case 'engage':
        return <EngagePage />;
      case 'featured':
        return <FeaturedPage />;
      default:
        return <ExplorePage />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600 mt-4">Loading Localize...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onProfileClick={() => setShowProfile(true)} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="pb-8">
        {renderCurrentPage()}
      </main>

      {showProfile && user && (
        <UserProfile
          user={user}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
}

export default App;