import React, { useState, useEffect } from 'react';
import { Business } from '../types';
import { LocalizeAPI } from '../services/api';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const EngagePage: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        const data = await LocalizeAPI.getBusinesses();
        setBusinesses(data);
      } catch (error) {
        console.error('Error loading businesses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBusinesses();
  }, []);

  const categories = ['all', ...Array.from(new Set(businesses.map(b => b.category)))];

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (selectedBusiness) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => setSelectedBusiness(null)}
          className="btn-secondary mb-4"
        >
          ← Back to Businesses
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={selectedBusiness.image}
            alt={selectedBusiness.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{selectedBusiness.name}</h1>
              {selectedBusiness.isVerified && (
                <span className="text-blue-500 text-xl">✓ Verified</span>
              )}
            </div>
            <p className="text-gray-600 mb-4">{selectedBusiness.description}</p>

            <div className="flex items-center space-x-4 mb-6">
              <span className="badge-primary">{selectedBusiness.category}</span>
              <div className="flex items-center">
                <span className="text-yellow-400">⭐</span>
                <span className="text-gray-600 ml-1">
                  {selectedBusiness.rating} ({selectedBusiness.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">📍 Location</h3>
              <p className="text-gray-600">{selectedBusiness.address}</p>
            </div>

            <button className="btn-primary mb-6">
              Check In (+25 points)
            </button>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Products & Services</h3>
              {selectedBusiness.products && selectedBusiness.products.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {selectedBusiness.products.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary-600">
                          ${product.price}
                        </span>
                        <span className={`text-sm ${product.inStock ? 'text-success-600' : 'text-red-500'}`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No products listed yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Local Businesses</h2>
        <p className="text-gray-600 mb-6">
          Discover and support local businesses in your community. Check in to earn points!
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search businesses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Business Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBusinesses.map((business) => (
          <div
            key={business.id}
            className="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedBusiness(business)}
          >
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{business.name}</h3>
              {business.isVerified && <span className="text-blue-500">✓</span>}
            </div>
            <p className="text-gray-600 text-sm mb-3">{business.description}</p>
            <div className="flex items-center justify-between mb-3">
              <span className="badge-primary">{business.category}</span>
              <div className="flex items-center">
                <span className="text-yellow-400">⭐</span>
                <span className="text-sm text-gray-600 ml-1">
                  {business.rating} ({business.reviewCount})
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">📍 {business.address}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {business.products?.length || 0} products
              </span>
              <button
                className="btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle check-in
                }}
              >
                Check In
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBusinesses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No businesses found matching your criteria.</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
};