'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Map from '@/components/Map';
import LandCard from '@/components/LandCard';
import LandFilters from '@/components/LandFilters';

export default function BrowseLands() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});

  const mockLands = [
    {
      id: '1',
      title: 'Coffee Farm Plot #5',
      location: 'Central Kenya',
      size: 25,
      cropSuitability: 'Coffee, Tea',
      soilQuality: 'Excellent',
      waterSource: 'River',
      elevation: 1800,
    },
    {
      id: '2',
      title: 'Maize Field #12',
      location: 'Rift Valley',
      size: 50,
      cropSuitability: 'Maize, Beans',
      soilQuality: 'Good',
      waterSource: 'Well',
      elevation: 1500,
    },
    {
      id: '3',
      title: 'Fruit Orchard #8',
      location: 'Western Kenya',
      size: 15,
      cropSuitability: 'Mangoes, Avocados',
      soilQuality: 'Excellent',
      waterSource: 'Lake',
      elevation: 1200,
    },
  ];

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    // Mock filtering logic
    console.log('Filters changed:', newFilters);
  };

  return (
    <div className="min-h-screen bg-background_light dark:bg-background_dark">
      <Navbar />
      <div className="pt-16 flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Browse Lands</h1>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            {showFilters && (
              <div className="mb-8">
                <LandFilters onFiltersChange={handleFiltersChange} />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockLands.map((land) => (
                    <LandCard
                      key={land.id}
                      {...land}
                      onClick={() => console.log('View land:', land.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Map View</h3>
                  <Map
                    center={[-1.2864, 36.8172]}
                    zoom={8}
                    markers={mockLands.map(land => ({
                      id: land.id,
                      position: [-1.2864 + Math.random() * 0.1, 36.8172 + Math.random() * 0.1], // Mock positions
                      title: land.title,
                    }))}
                  />
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Lands</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{mockLands.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Average Size</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">30 acres</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Regions</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}