'use client';

import { useState } from 'react';
import { Heart, MapPin, Droplets, Mountain, Scale, TrendingUp, Sprout } from 'lucide-react';

interface LandCardProps {
  id: string;
  title: string;
  location: string;
  size: number;
  cropSuitability: string;
  soilQuality: string;
  waterSource: string;
  elevation: number;
  price: number;
  image?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onCompare?: (id: string) => void;
  isComparing?: boolean;
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
  isFavorite = false,
  onToggleFavorite,
  onCompare,
  isComparing = false,
}: LandCardProps) {
  const [imageError, setImageError] = useState(false);

  const getSoilColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case 'excellent': return 'badge-success';
      case 'good': return 'badge-info';
      case 'fair': return 'badge-warning';
      default: return 'badge-info';
    }
  };

  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 card-hover">
      {/* Image / Placeholder */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
        {!imageError ? (
          <div className="w-full h-full gradient-primary flex items-center justify-center">
            <Sprout className="h-16 w-16 text-white/30" />
          </div>
        ) : (
          <div className="w-full h-full gradient-primary flex items-center justify-center">
            <Sprout className="h-16 w-16 text-white/30" />
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Price badge */}
        <div className="absolute top-3 left-3 px-3 py-1.5 bg-accent text-secondary font-bold text-sm rounded-lg shadow-lg">
          ${price.toLocaleString()}/ha
        </div>

        {/* Favorite button */}
        {onToggleFavorite && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(id); }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-all duration-200 shadow-md"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </button>
        )}

        {/* Soil quality badge */}
        <div className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${getSoilColor(soilQuality)}`}>
          {soilQuality} Soil
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-muted-foreground text-sm">
            <MapPin className="h-3.5 w-3.5" />
            <span>{location}</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Scale className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{size} ha</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mountain className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{elevation}m</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Droplets className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">{waterSource}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">12% ROI</span>
          </div>
        </div>

        {/* Crop suitability */}
        <div className="flex flex-wrap gap-1.5">
          {cropSuitability.split(', ').map((crop) => (
            <span key={crop} className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {crop}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button className="flex-1 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg">
            Send Proposal
          </button>
          {onCompare && (
            <button
              onClick={(e) => { e.stopPropagation(); onCompare(id); }}
              className={`px-4 py-2.5 text-sm font-medium rounded-xl border transition-all duration-200 ${
                isComparing
                  ? 'bg-accent/10 border-accent text-accent'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              Compare
            </button>
          )}
        </div>
      </div>
    </div>
  );
}