'use client';

import { useUI } from '@/hooks/useUI';
import Button from './Button';
import { MapPin, Droplets, Mountain, Leaf, TrendingUp, X } from 'lucide-react';

interface Land {
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
}

interface CompareModalProps {
  lands: Land[];
}

export default function CompareModal({ lands }: CompareModalProps) {
  const { closeModal } = useUI();

  if (lands.length === 0) return null;

  return (
    <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Compare Lands ({lands.length})
        </h2>
        <button
          onClick={closeModal}
          className="p-2 hover:bg-gray-100"
        >
          <X className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      <div className={`grid gap-6 ${lands.length === 1 ? 'grid-cols-1' : lands.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {lands.map((land) => (
          <div key={land.id} className="bg-white">
            {/* Image/Placeholder */}
            <div className="relative h-32 bg-gradient-to-br from-primary via-primary to-accent overflow-hidden">
              {land.image ? (
                <img src={land.image} alt={land.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-white/80" />
                </div>
              )}
              <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Available
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">{land.title}</h3>
              <p className="text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1 text-primary" />
                {land.location}
              </p>

              {/* Key features */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Leaf className="h-4 w-4 mr-2 text-green-500" />
                  <span>Crops: {land.cropSuitability}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Water: {land.waterSource}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4 mr-2 text-purple-500" />
                  <span>Size: {land.size} acres</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mountain className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Elevation: {land.elevation}m</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    land.soilQuality === 'Excellent' ? 'bg-green-500' :
                    land.soilQuality === 'Good' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span>Soil: {land.soilQuality}</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">${land.price}/acre</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={closeModal}>
          Close Comparison
        </Button>
      </div>
    </div>
  );
}