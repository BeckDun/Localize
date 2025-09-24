import React from 'react';
import { User } from '../../types';

interface HeaderProps {
  user: User | null;
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onProfileClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">Localize</h1>
          </div>

          {user && (
            <button
              onClick={onProfileClick}
              className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <div className="text-right">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-primary-600 font-semibold">
                  {user.points} points
                </p>
              </div>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};