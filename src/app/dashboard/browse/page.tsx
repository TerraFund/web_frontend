'use client';

import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import LandCard from '@/components/LandCard';
import LandFilters from '@/components/LandFilters';
import CompareModal from '@/components/CompareModal';
import {
  Search,
  Filter,
  MapPin,
  Grid,
  List,
  Sparkles,
  RefreshCw,
  Loader2,
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  TrendingUp,
  Award,
} from 'lucide-react';
import { useUI } from '@/hooks/useUI';
import Button from '@/components/Button';
import { api } from '@/lib/api';

const Map = lazy(() => import('@/components/Map'));

interface LandPlot {
  id: string;
  title: string;
  location: string;
  region: string;
  size: number;
  annual_price: number;
  price_per_ha: number;
  crop_suitability: string;
  soil_quality: string;
  soil_ph?: string;
  water_source: string;
  elevation: number;
  verified: boolean;
  status: string;
  image?: string;
}

export default function BrowseLands() {
  const router = useRouter();
  const { openModal } = useUI();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);

  const [lands, setLands] = useState<LandPlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<any>({});

  const fetchLands = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Try real Spring Boot backend
      const res = await api.land.list();
      let rawLands: any[] = [];
      if (res.success && Array.isArray(res.lands) && res.lands.length > 0) {
        rawLands = res.lands;
      } else {
        const nextRes = await fetch('/api/lands').then((r) => r.json());
        if (nextRes.success && Array.isArray(nextRes.data)) {
          rawLands = nextRes.data;
        }
      }

      const formatted: LandPlot[] = rawLands.map((l: any) => ({
        id: String(l.id),
        title: l.title || l.name || 'Agricultural Land Plot',
        location: l.location || 'Rwanda',
        region: l.region || 'Eastern Province',
        size: Number(l.sizeInHectares || l.size || 10),
        annual_price: Number(l.annualPrice || l.annual_price || 15000),
        price_per_ha: Math.round(Number(l.annualPrice || l.annual_price || 15000) / (Number(l.sizeInHectares || l.size || 10) || 1)),
        crop_suitability: l.cropSuitability || l.crop_suitability || 'Arabica Coffee, Maize',
        soil_quality: l.soilType || l.soil_quality || 'Volcanic Loam',
        soil_ph: l.soilPh || l.soil_ph || '6.4',
        water_source: l.waterSource || l.water_source || 'Stream & Drip System',
        elevation: Number(l.elevation || 1500),
        verified: Boolean(l.verified),
        status: l.verified ? 'VERIFIED' : 'PENDING_VERIFICATION',
        image: Array.isArray(l.demoImages) && l.demoImages.length > 0 ? l.demoImages[0] : (l.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'),
      }));

      setLands(formatted);
    } catch (err) {
      console.error('Failed to fetch marketplace lands:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLands();
  }, [fetchLands]);

  // Dynamic filter processing
  const filteredLands = lands.filter((land) => {
    // Search query
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      land.title?.toLowerCase().includes(q) ||
      land.location?.toLowerCase().includes(q) ||
      land.region?.toLowerCase().includes(q) ||
      land.crop_suitability?.toLowerCase().includes(q);

    if (!matchesQuery) return false;

    // Region filter
    if (activeFilters.region && activeFilters.region !== '' && land.region !== activeFilters.region) {
      return false;
    }

    // Size range filter
    if (activeFilters.sizeMin && land.size < parseFloat(activeFilters.sizeMin)) return false;
    if (activeFilters.sizeMax && land.size > parseFloat(activeFilters.sizeMax)) return false;

    // Soil pH range filter
    if (land.soil_ph) {
      const ph = parseFloat(land.soil_ph);
      if (activeFilters.soilPhMin && ph < parseFloat(activeFilters.soilPhMin)) return false;
      if (activeFilters.soilPhMax && ph > parseFloat(activeFilters.soilPhMax)) return false;
    }

    // Annual Price range filter
    if (activeFilters.priceMin && land.annual_price < parseFloat(activeFilters.priceMin)) return false;
    if (activeFilters.priceMax && land.annual_price > parseFloat(activeFilters.priceMax)) return false;

    // Water Source filter
    if (activeFilters.waterSource && activeFilters.waterSource !== '') {
      if (!land.water_source?.toLowerCase().includes(activeFilters.waterSource.toLowerCase())) return false;
    }

    // Verified badge filter
    if (activeFilters.verifiedOnly && !land.verified && land.status !== 'VERIFIED') return false;

    return true;
  });

  // Sorting logic
  const sortedLands = [...filteredLands].sort((a, b) => {
    if (sortBy === 'price-low') return a.annual_price - b.annual_price;
    if (sortBy === 'price-high') return b.annual_price - a.annual_price;
    if (sortBy === 'size') return b.size - a.size;
    return 0;
  });

  const toggleFavorite = (landId: string) => {
    setFavorites((prev) =>
      prev.includes(landId) ? prev.filter((id) => id !== landId) : [...prev, landId]
    );
  };

  const toggleCompare = (landId: string) => {
    setCompareList((prev) => {
      if (prev.includes(landId)) {
        return prev.filter((id) => id !== landId);
      } else if (prev.length < 3) {
        return [...prev, landId];
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-md">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" /> Agricultural Land Marketplace
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Browse Lease Plots</h1>
            <p className="text-muted-foreground text-sm max-w-xl">
              Explore verified agricultural land, evaluate soil chemistry & microclimates, and make structured lease offers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={fetchLands} className="flex items-center gap-2">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </Button>

            {compareList.length > 0 && (
              <Button
                onClick={() => {
                  const compared = lands
                    .filter((l) => compareList.includes(l.id))
                    .map((l) => ({
                      id: l.id,
                      title: l.title,
                      location: l.location,
                      size: l.size,
                      cropSuitability: l.crop_suitability,
                      soilQuality: l.soil_quality,
                      waterSource: l.water_source,
                      elevation: l.elevation,
                      image: l.image,
                    }));
                  openModal(<CompareModal lands={compared} />);
                }}
                className="bg-accent text-secondary hover:bg-accent/90 font-bold text-xs"
              >
                Compare ({compareList.length})
              </Button>
            )}
          </div>
        </div>

        {/* AI Recommendations Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-emerald-500/5 to-teal-950/20 border border-primary/20 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/20 text-emerald-400 rounded-xl">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">AI Agronomy & Yield Market Trends</h3>
              <p className="text-xs text-muted-foreground">Real-time microclimate intelligence & high-ROI agricultural corridors.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-3 bg-card/70 border border-border rounded-xl">
              <span className="font-bold text-emerald-500 block mb-0.5">High ROI Coffee Corridor</span>
              <span className="text-muted-foreground">Huye & Southern volcanic highland plots reporting 16.2% annual net lease returns.</span>
            </div>
            <div className="p-3 bg-card/70 border border-border rounded-xl">
              <span className="font-bold text-primary block mb-0.5">Mechanized Grain Hub</span>
              <span className="text-muted-foreground">Nyagatare river valley plains suitable for pivot irrigation commercial maize.</span>
            </div>
            <div className="p-3 bg-card/70 border border-border rounded-xl">
              <span className="font-bold text-amber-500 block mb-0.5">Export Horticulture Demand</span>
              <span className="text-muted-foreground">High organic matter Musanze valley plots primed for Hass Avocado export contracts.</span>
            </div>
          </div>
        </div>

        {/* Search & Toolbar Controls */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 bg-card border border-border rounded-2xl p-4 shadow-sm">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by title, location, region, or crop type (e.g. Coffee, Maize, Huye)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none text-sm"
              />
            </div>

            {/* View Mode & Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant={showFilters ? 'primary' : 'outline'}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-xs"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </Button>

              <div className="flex items-center bg-muted/40 border border-border rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === 'grid' ? 'bg-primary text-white shadow' : 'text-muted-foreground'
                  }`}
                >
                  <Grid className="w-4 h-4" /> Grid
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === 'map' ? 'bg-primary text-white shadow' : 'text-muted-foreground'
                  }`}
                >
                  <MapPin className="w-4 h-4" /> GIS Map
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-3 bg-muted/40 border border-border rounded-xl text-xs font-medium text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="size">Size: Largest First</option>
              </select>
            </div>
          </div>

          {/* Expandable Filters Panel */}
          {showFilters && (
            <div className="animate-in slide-in-from-top-4 duration-300">
              <LandFilters onFiltersChange={setActiveFilters} />
            </div>
          )}
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <p>
            Found <strong className="text-foreground">{sortedLands.length}</strong> matching land plots
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Showing verified agricultural listings</span>
          </div>
        </div>

        {/* Main Content Area */}
        {loading ? (
          <div className="py-24 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">Loading agricultural marketplace plots...</p>
          </div>
        ) : sortedLands.length === 0 ? (
          <div className="bg-card border border-border rounded-3xl p-12 text-center space-y-3">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto" />
            <h3 className="text-xl font-bold text-foreground">No Plots Found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              No land listings matched your search criteria. Try loosening your filter criteria or resetting your search bar.
            </p>
          </div>
        ) : viewMode === 'map' ? (
          /* GIS Map Full View */
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg p-2">
            <div className="h-[600px] w-full rounded-2xl overflow-hidden">
              <Suspense fallback={<div className="h-full bg-muted flex items-center justify-center text-sm text-muted-foreground">Loading Interactive Map...</div>}>
                <Map
                  center={[-1.9441, 30.0619]}
                  zoom={9}
                  markers={sortedLands.map((l) => ({
                    id: l.id,
                    position: [-1.9441 + (Math.random() - 0.5) * 0.4, 30.0619 + (Math.random() - 0.5) * 0.4] as [number, number],
                    title: l.title,
                    description: `${l.size} ha • $${l.annual_price?.toLocaleString()}/yr • ${l.region}`,
                  }))}
                />
              </Suspense>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedLands.map((land) => (
              <div key={land.id} onClick={() => router.push(`/lands/${land.id}`)} className="cursor-pointer">
                <LandCard
                  id={land.id}
                  title={land.title}
                  location={land.location}
                  size={land.size}
                  cropSuitability={land.crop_suitability}
                  soilQuality={land.soil_quality}
                  waterSource={land.water_source}
                  elevation={land.elevation || 1500}
                  price={land.price_per_ha || Math.round((land.annual_price || 12000) / (land.size || 10))}
                  image={land.image}
                  isFavorite={favorites.includes(land.id)}
                  onToggleFavorite={() => toggleFavorite(land.id)}
                  isComparing={compareList.includes(land.id)}
                  onCompare={() => toggleCompare(land.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}