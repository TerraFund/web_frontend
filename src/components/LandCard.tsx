'use client';

import { MapPin, Droplets, Mountain, Leaf, Heart, Star, TrendingUp } from 'lucide-react';

interface LandCardProps {
  id: string;
  title: string;
  location: string;
  size: number;
  cropSuitability: string;
  soilQuality: string;
  waterSource: string;
  elevation: number;
  price?: number;
  image?: string;
  onClick?: () => void;
  isFavorite?: boolean;
  onFavorite?: () => void;
  isInCompare?: boolean;
  onCompare?: () => void;
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
  price,
  image,
  onClick,
  isFavorite = false,
  onFavorite,
  isInCompare = false,
  onCompare,
}: LandCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1 group"
    >
      {/* Image/Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-primary via-primary to-accent overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MapPin className="h-16 w-16 text-white/80" />
          </div>
        )}

        {/* Overlay with price and favorite */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-between p-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-sm font-bold text-gray-900">${price}/acre</span>
          </div>
           <button
             onClick={(e) => {
               e.stopPropagation();
               onFavorite?.();
             }}
             className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
           >
             <Heart className={`h-4 w-4 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-500'}`} />
           </button>
        </div>

        {/* Status badge */}
        <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Available
        </div>

        {/* Compare checkbox */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCompare?.();
            }}
            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
              isInCompare
                ? 'bg-primary border-primary text-white'
                : 'bg-white/90 border-gray-300 text-gray-600 hover:border-primary'
            }`}
          >
            {isInCompare && <span className="text-xs">✓</span>}
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-primary" />
              {location}
            </p>
          </div>
          <div className="flex items-center text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium ml-1 text-gray-700 dark:text-gray-300">4.8</span>
          </div>
        </div>

        {/* Key features */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Leaf className="h-4 w-4 mr-2 text-green-500" />
            <span className="truncate">{cropSuitability}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Droplets className="h-4 w-4 mr-2 text-blue-500" />
            <span>{waterSource}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <TrendingUp className="h-4 w-4 mr-2 text-purple-500" />
            <span>{size} acres</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Mountain className="h-4 w-4 mr-2 text-gray-500" />
            <span>{elevation}m</span>
          </div>
        </div>

        {/* Soil quality and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              soilQuality === 'Excellent' ? 'bg-green-500' :
              soilQuality === 'Good' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Soil: {soilQuality}</span>
          </div>
          <button className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}