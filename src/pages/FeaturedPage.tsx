import React, { useState, useEffect } from 'react';
import { Discount } from '../types';
import { LocalizeAPI } from '../services/api';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { mockUser } from '../services/mockData';

export const FeaturedPage: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);

  useEffect(() => {
    const loadDiscounts = async () => {
      try {
        const data = await LocalizeAPI.getDiscounts();
        setDiscounts(data);
      } catch (error) {
        console.error('Error loading discounts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDiscounts();
  }, []);

  const handleRedeemDiscount = async (discount: Discount) => {
    if (mockUser.points < discount.pointsCost) {
      alert('Not enough points to redeem this discount!');
      return;
    }

    try {
      const result = await LocalizeAPI.redeemDiscount(discount.id);
      if (result.success) {
        alert(`Discount redeemed successfully! You saved ${discount.discountPercentage}%`);
        // In a real app, we would update user points and discount redemption count
      }
    } catch (error) {
      alert('Failed to redeem discount. Please try again.');
    }
  };

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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Rewards</h2>
        <p className="text-gray-600 mb-4">
          Use your points to unlock exclusive discounts and rewards from local businesses!
        </p>
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <p className="text-primary-800 font-medium">
            Your Points Balance: <span className="text-2xl font-bold">{mockUser.points}</span> ✨
          </p>
        </div>
      </div>

      {/* Featured Discounts Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {discounts.map((discount) => {
          const canAfford = mockUser.points >= discount.pointsCost;
          const isAvailable = discount.maxRedemptions
            ? discount.currentRedemptions < discount.maxRedemptions
            : true;

          return (
            <div
              key={discount.id}
              className={`card p-6 ${!canAfford ? 'opacity-50' : 'hover:shadow-lg'} transition-all`}
            >
              <img
                src={discount.image}
                alt={discount.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{discount.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{discount.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-accent-600">
                    {discount.discountPercentage}% OFF
                  </span>
                  <span className="badge-accent">
                    {discount.pointsCost} points
                  </span>
                </div>

                <div className="text-sm text-gray-500 space-y-1">
                  <p>Valid until: {discount.validUntil.toLocaleDateString()}</p>
                  {discount.maxRedemptions && (
                    <p>
                      Available: {discount.maxRedemptions - discount.currentRedemptions} left
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedDiscount(discount)}
                disabled={!canAfford || !isAvailable}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  canAfford && isAvailable
                    ? 'bg-accent-600 hover:bg-accent-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {!canAfford
                  ? 'Not Enough Points'
                  : !isAvailable
                  ? 'Sold Out'
                  : 'View Details'}
              </button>
            </div>
          );
        })}
      </div>

      {discounts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No featured discounts available right now.</p>
          <p className="text-gray-400 text-sm mt-2">Check back soon for new rewards!</p>
        </div>
      )}

      {/* Discount Details Modal */}
      {selectedDiscount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedDiscount.title}</h3>
                <button
                  onClick={() => setSelectedDiscount(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <img
                src={selectedDiscount.image}
                alt={selectedDiscount.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 mb-2">{selectedDiscount.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-accent-600">
                      {selectedDiscount.discountPercentage}% OFF
                    </span>
                    <span className="text-lg font-semibold text-primary-600">
                      {selectedDiscount.pointsCost} points
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Terms & Conditions</h4>
                  <p className="text-sm text-gray-600">{selectedDiscount.terms}</p>
                </div>

                <div className="border-t pt-4">
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Valid until: {selectedDiscount.validUntil.toLocaleDateString()}</p>
                    {selectedDiscount.maxRedemptions && (
                      <p>
                        Remaining: {selectedDiscount.maxRedemptions - selectedDiscount.currentRedemptions}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setSelectedDiscount(null)}
                    className="flex-1 btn-secondary"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleRedeemDiscount(selectedDiscount)}
                    disabled={mockUser.points < selectedDiscount.pointsCost}
                    className="flex-1 btn-primary disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    Redeem Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Points Earning Tips */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 How to Earn More Points</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">🏪</span>
            <div>
              <h4 className="font-medium text-gray-900">Check In at Businesses</h4>
              <p className="text-sm text-gray-600">Earn 25 points for each business visit</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-2xl">🎉</span>
            <div>
              <h4 className="font-medium text-gray-900">Attend Events</h4>
              <p className="text-sm text-gray-600">Earn 25-75 points for event attendance</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-2xl">⭐</span>
            <div>
              <h4 className="font-medium text-gray-900">Leave Reviews</h4>
              <p className="text-sm text-gray-600">Earn 10 points for each helpful review</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};