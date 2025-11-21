'use client';

import { MapPin, Droplets, Mountain, Leaf } from 'lucide-react';

interface LandCardProps {
  id: string;
  title: string;
  location: string;
  size: number;
  cropSuitability: string;
  soilQuality: string;
  waterSource: string;
  elevation: number;
  onClick?: () => void;
}

export default function LandCard({
  id,
  title,
  location,
  size,
  cropSuitability,
  soilQuality,
  waterSource,
  elevation,
  onClick,
}: LandCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
    >
      <div className="h-48 bg-gradient-to-r from-primary to-accent flex items-center justify-center">
        <MapPin className="h-12 w-12 text-white" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Leaf className="h-4 w-4 mr-1 text-green-500" />
            <span>{cropSuitability}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Droplets className="h-4 w-4 mr-1 text-blue-500" />
            <span>{waterSource}</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">{size} acres</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Mountain className="h-4 w-4 mr-1 text-gray-500" />
            <span>{elevation}m</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">Soil: {soilQuality}</span>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}