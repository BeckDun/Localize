import React from 'react';
import { User } from '../../types';

interface UserProfileProps {
  user: User;
  onClose: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-primary-50 rounded-lg p-4 text-center">
              <p className="text-primary-800 font-medium">Current Points</p>
              <p className="text-3xl font-bold text-primary-600">{user.points}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-gray-600 text-sm">Member Since</p>
                <p className="font-semibold text-gray-900">
                  {user.joinedDate.toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-gray-600 text-sm">Rank</p>
                <p className="font-semibold text-gray-900">
                  {user.points >= 1000 ? 'Gold' : user.points >= 500 ? 'Silver' : 'Bronze'}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Point Progress</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Next Rank: {user.points >= 1000 ? 'Platinum (2000 pts)' : user.points >= 500 ? 'Gold (1000 pts)' : 'Silver (500 pts)'}</span>
                  <span className="text-gray-600">
                    {user.points}/{user.points >= 1000 ? '2000' : user.points >= 500 ? '1000' : '500'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{
                      width: `${Math.min((user.points / (user.points >= 1000 ? 2000 : user.points >= 500 ? 1000 : 500)) * 100, 100)}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Checked in at The Local Roastery</span>
                <span className="text-success-600 font-medium">+25 pts</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Attended Coffee Workshop</span>
                <span className="text-success-600 font-medium">+50 pts</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Redeemed 20% off discount</span>
                <span className="text-red-600 font-medium">-100 pts</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="flex-1 btn-secondary">
              Edit Profile
            </button>
            <button
              onClick={onClose}
              className="flex-1 btn-primary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};