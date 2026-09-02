'use client';

import React, { useState } from 'react';
import { Filter, X, ShieldCheck, DollarSign, Sprout, MapPin, SlidersHorizontal } from 'lucide-react';

interface LandFiltersProps {
  onFiltersChange: (filters: any) => void;
}

export default function LandFilters({ onFiltersChange }: LandFiltersProps) {
  const [filters, setFilters] = useState({
    sizeMin: '',
    sizeMax: '',
    region: '',
    soilPhMin: '',
    soilPhMax: '',
    waterSource: '',
    priceMin: '',
    priceMax: '',
    verifiedOnly: false,
  });

  const handleChange = (key: string, value: any) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const clearFilters = () => {
    const cleared = {
      sizeMin: '',
      sizeMax: '',
      region: '',
      soilPhMin: '',
      soilPhMax: '',
      waterSource: '',
      priceMin: '',
      priceMax: '',
      verifiedOnly: false,
    };
    setFilters(cleared);
    onFiltersChange(cleared);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-primary" /> Advanced Plot Filters
        </h3>
        <button
          onClick={clearFilters}
          className="text-xs font-semibold text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
        >
          <X className="h-3.5 w-3.5" /> Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Region */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-primary" /> Province / Region
          </label>
          <select
            value={filters.region}
            onChange={(e) => handleChange('region', e.target.value)}
            className="w-full px-3 py-2.5 bg-muted/40 border border-border rounded-xl text-xs font-medium text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="">All Regions & Provinces</option>
            <option value="Southern Province">Southern Province</option>
            <option value="Northern Province">Northern Province</option>
            <option value="Eastern Province">Eastern Province</option>
            <option value="Western Province">Western Province</option>
            <option value="Kigali City">Kigali City</option>
          </select>
        </div>

        {/* Size Hectares */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <Sprout className="w-3.5 h-3.5 text-emerald-500" /> Plot Size (Hectares)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Ha"
              value={filters.sizeMin}
              onChange={(e) => handleChange('sizeMin', e.target.value)}
              className="w-full px-3 py-2 bg-muted/40 border border-border rounded-xl text-xs font-medium text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <input
              type="number"
              placeholder="Max Ha"
              value={filters.sizeMax}
              onChange={(e) => handleChange('sizeMax', e.target.value)}
              className="w-full px-3 py-2 bg-muted/40 border border-border rounded-xl text-xs font-medium text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Soil pH Range */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <Sprout className="w-3.5 h-3.5 text-amber-500" /> Soil pH Range (4.0 - 8.5)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.1"
              placeholder="Min pH"
              value={filters.soilPhMin}
              onChange={(e) => handleChange('soilPhMin', e.target.value)}
              className="w-full px-3 py-2 bg-muted/40 border border-border rounded-xl text-xs font-medium text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <input
              type="number"
              step="0.1"
              placeholder="Max pH"
              value={filters.soilPhMax}
              onChange={(e) => handleChange('soilPhMax', e.target.value)}
              className="w-full px-3 py-2 bg-muted/40 border border-border rounded-xl text-xs font-medium text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Annual Price Range */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> Annual Price ($ USD)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min $"
              value={filters.priceMin}
              onChange={(e) => handleChange('priceMin', e.target.value)}
              className="w-full px-3 py-2 bg-muted/40 border border-border rounded-xl text-xs font-medium text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <input
              type="number"
              placeholder="Max $"
              value={filters.priceMax}
              onChange={(e) => handleChange('priceMax', e.target.value)}
              className="w-full px-3 py-2 bg-muted/40 border border-border rounded-xl text-xs font-medium text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-border">
        {/* Water Source */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Water Source:</span>
          <select
            value={filters.waterSource}
            onChange={(e) => handleChange('waterSource', e.target.value)}
            className="px-3 py-1.5 bg-muted/40 border border-border rounded-xl text-xs font-medium text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="">Any Water Source</option>
            <option value="River">River / Canal Access</option>
            <option value="Borehole">Borehole & Well</option>
            <option value="Spring">Natural Spring</option>
            <option value="Drip">Solar Drip System</option>
          </select>
        </div>

        {/* Verified Badge Checkbox Toggle */}
        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-foreground">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => handleChange('verifiedOnly', e.target.checked)}
            className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
          />
          <ShieldCheck className="w-4 h-4 text-emerald-500" /> Verified Plots Only
        </label>
      </div>
    </div>
  );
}