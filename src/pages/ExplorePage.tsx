import React, { useState, useEffect } from 'react';
import { Event, Business } from '../types';
import { LocalizeAPI } from '../services/api';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

type ViewMode = 'list' | 'map';

export const ExplorePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [events, setEvents] = useState<Event[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [eventsData, businessesData] = await Promise.all([
          LocalizeAPI.getEvents(),
          LocalizeAPI.getBusinesses()
        ]);
        setEvents(eventsData);
        setBusinesses(businessesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Your Community</h2>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search events and places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* View Toggle */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📋 List View
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'map'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🗺️ Map View
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center mb-6">
          <div className="text-center">
            <p className="text-gray-600 text-lg">🗺️ Interactive Map View</p>
            <p className="text-gray-500 text-sm mt-2">Map integration would be implemented here</p>
            <p className="text-gray-500 text-sm">Showing {filteredEvents.length} events and {filteredBusinesses.length} places</p>
          </div>
        </div>
      ) : null}

      {/* Events Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <div key={event.id} className="card p-4">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
              <p className="text-gray-600 text-sm mb-2">{event.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {event.date.toLocaleDateString()} at {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <span className="badge-success">+{event.pointsReward} points</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">📍 {event.location}</p>
              <button className="btn-primary w-full mt-3">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Businesses Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Local Places</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBusinesses.map((business) => (
            <div key={business.id} className="card p-4">
              <img
                src={business.image}
                alt={business.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{business.name}</h4>
                {business.isVerified && <span className="text-blue-500">✓</span>}
              </div>
              <p className="text-gray-600 text-sm mb-2">{business.description}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="badge-primary">{business.category}</span>
                <div className="flex items-center">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-sm text-gray-600 ml-1">
                    {business.rating} ({business.reviewCount})
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-3">📍 {business.address}</p>
              <button className="btn-primary w-full">
                Check In
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};