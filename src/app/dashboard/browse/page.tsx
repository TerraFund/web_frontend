'use client';

import { useState, lazy, Suspense } from 'react';
import LandCard from '@/components/LandCard';
import LandFilters from '@/components/LandFilters';
import CompareModal from '@/components/CompareModal';
import { Search, Filter, MapPin, Grid, List, Sparkles } from 'lucide-react';
import { useUI } from '@/hooks/useUI';

const Map = lazy(() => import('@/components/Map'));

export default function BrowseLands() {
  const { openModal } = useUI();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);

  const mockLands = [
    {
      id: '1',
      title: 'Coffee Farm Plot #5',
      location: 'Central Rwanda',
      size: 25,
      cropSuitability: 'Coffee, Tea',
      soilQuality: 'Excellent',
      waterSource: 'River',
      elevation: 1800,
      price: 1500,
      image: '/lands/coffee-farm.jpg',
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
      price: 1200,
      image: '/lands/maize-field.jpg',
    },
    {
      id: '3',
      title: 'Fruit Orchard #8',
      location: 'Western Rwanda',
      size: 15,
      cropSuitability: 'Mangoes, Avocados',
      soilQuality: 'Excellent',
      waterSource: 'Lake',
      elevation: 1200,
      price: 1800,
      image: '/lands/fruit-orchard.jpg',
    },
  ];

  const filteredLands = mockLands.filter(land =>
    land.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    land.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    land.cropSuitability.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFiltersChange = (newFilters: Record<string, unknown>) => {
    // Mock filtering logic
    console.log('Filters changed:', newFilters);
  };

  const toggleFavorite = (landId: string) => {
    setFavorites(prev =>
      prev.includes(landId)
        ? prev.filter(id => id !== landId)
        : [...prev, landId]
    );
  };

  const toggleCompare = (landId: string) => {
    setCompareList(prev => {
      if (prev.includes(landId)) {
        return prev.filter(id => id !== landId);
      } else if (prev.length < 3) {
        return [...prev, landId];
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Browse Lands</h1>
          <p className="text-lg text-gray-600">Discover investment opportunities in sustainable agriculture</p>
        </div>

        {/* Search and Controls */}
        <div className="bg-white">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location, crop type, or land name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  showFilters
                    ? 'bg-primary text-white'
                    : 'bg-gray-100'
                }`}
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>

              <div className="flex items-center border border-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-l-xl transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-primary text-white'
                      : 'text-gray-600'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-r-xl transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-primary text-white'
                      : 'text-gray-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

               <select
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
                 className="px-4 py-3 border border-gray-200"
               >
                 <option value="newest">Newest First</option>
                 <option value="price-low">Price: Low to High</option>
                 <option value="price-high">Price: High to Low</option>
                 <option value="size">Size</option>
               </select>

                {compareList.length > 0 && (
                  <button
                    onClick={() => {
                      const comparedLands = mockLands.filter(land => compareList.includes(land.id));
                      openModal(<CompareModal lands={comparedLands} />);
                    }}
                    className="px-4 py-3 bg-secondary text-white rounded-xl hover:bg-secondary/80 transition-colors"
                  >
                    Compare ({compareList.length})
                  </button>
                )}
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <LandFilters onFiltersChange={handleFiltersChange} />
            </div>
          )}
        </div>

         {/* AI Recommendations */}
         <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6 mb-8">
           <div className="flex items-center mb-4">
             <Sparkles className="w-6 h-6 text-accent mr-3" />
             <h2 className="text-xl font-semibold text-gray-900">AI Recommendations</h2>
           </div>
           <p className="text-gray-600">
             Based on your profile and market trends, here are personalized land investment opportunities:
           </p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="bg-white">
               <h3 className="font-medium text-gray-900">High ROI Potential</h3>
                <p className="text-sm text-gray-600">Coffee farms in Central Rwanda showing 15-20% annual returns</p>
             </div>
             <div className="bg-white">
               <h3 className="font-medium text-gray-900">Sustainable Focus</h3>
               <p className="text-sm text-gray-600">Organic maize fields with water conservation features</p>
             </div>
             <div className="bg-white">
               <h3 className="font-medium text-gray-900">Market Trend</h3>
                <p className="text-sm text-gray-600">Increasing demand for avocado orchards in Western Rwanda</p>
             </div>
           </div>
         </div>

         {/* Results Count */}
         <div className="flex items-center justify-between mb-6">
           <p className="text-gray-600">
             Showing <span className="font-semibold text-gray-900">{filteredLands.length}</span> lands
           </p>
           <div className="flex items-center gap-2 text-sm text-gray-500">
             <MapPin className="w-4 h-4" />
              Central Rwanda • Eastern Rwanda • Western Rwanda
           </div>
         </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1'
            }`}>
              {filteredLands.map((land) => (
                <LandCard
                  key={land.id}
                  {...land}
                  isFavorite={favorites.includes(land.id)}
                  onFavorite={() => toggleFavorite(land.id)}
                  isInCompare={compareList.includes(land.id)}
                  onCompare={() => toggleCompare(land.id)}
                  onClick={() => console.log('View land:', land.id)}
                />
              ))}
            </div>

            {filteredLands.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-900">No lands found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            {/* Map View */}
            <div className="bg-white">
              <h3 className="text-lg font-semibold text-gray-900">
                <MapPin className="w-5 h-5 text-primary" />
                Map View
              </h3>
              <Suspense fallback={<div className="h-64 bg-gray-200"></div>}>
                <Map
                  center={[-1.2864, 36.8172]}
                  zoom={8}
                  markers={filteredLands.map(land => ({
                    id: land.id,
                    position: [-1.2864 + Math.random() * 0.1, 36.8172 + Math.random() * 0.1],
                    title: land.title,
                  }))}
                />
              </Suspense>
            </div>

            {/* Quick Stats */}
            <div className="bg-white">
              <h3 className="text-lg font-semibold text-gray-900">Market Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Lands</span>
                  <span className="text-lg font-bold text-primary">{mockLands.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Price</span>
                  <span className="text-lg font-bold text-accent">$1,500/acre</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Regions</span>
                  <span className="text-lg font-bold text-secondary">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Area</span>
                  <span className="text-lg font-bold text-primary">90 acres</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                     <p className="text-sm text-gray-900">New land listing in Central Rwanda</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Investment proposal submitted</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Contract signed for Fruit Orchard</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}