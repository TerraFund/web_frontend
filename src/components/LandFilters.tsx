'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface LandFiltersProps {
  onFiltersChange: (filters: any) => void;
}

export default function LandFilters({ onFiltersChange }: LandFiltersProps) {
  const [filters, setFilters] = useState({
    sizeMin: '',
    sizeMax: '',
    region: '',
    soilQuality: '',
    waterSource: '',
    elevationMin: '',
    elevationMax: '',
  });

  const handleChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const cleared = {
      sizeMin: '',
      sizeMax: '',
      region: '',
      soilQuality: '',
      waterSource: '',
      elevationMin: '',
      elevationMax: '',
    };
    setFilters(cleared);
    onFiltersChange(cleared);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h3>
        <button
          onClick={clearFilters}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Size (acres)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              value={filters.sizeMin}
              onChange={(e) => handleChange('sizeMin', e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              value={filters.sizeMax}
              onChange={(e) => handleChange('sizeMax', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Region
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
            value={filters.region}
            onChange={(e) => handleChange('region', e.target.value)}
          >
            <option value="">All Regions</option>
            <option value="central">Central</option>
            <option value="rift-valley">Rift Valley</option>
            <option value="western">Western</option>
            <option value="eastern">Eastern</option>
            <option value="coast">Coast</option>
            <option value="northern">Northern</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Soil Quality
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
            value={filters.soilQuality}
            onChange={(e) => handleChange('soilQuality', e.target.value)}
          >
            <option value="">Any Quality</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Water Source
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
            value={filters.waterSource}
            onChange={(e) => handleChange('waterSource', e.target.value)}
          >
            <option value="">Any Source</option>
            <option value="river">River</option>
            <option value="lake">Lake</option>
            <option value="well">Well</option>
            <option value="rainwater">Rainwater</option>
            <option value="irrigation">Irrigation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Elevation (m)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              value={filters.elevationMin}
              onChange={(e) => handleChange('elevationMin', e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              value={filters.elevationMax}
              onChange={(e) => handleChange('elevationMax', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}