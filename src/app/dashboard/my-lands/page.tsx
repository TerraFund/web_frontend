'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building,
  TrendingUp,
  FileText,
  Filter,
  Layers,
  DollarSign,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sprout,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import Button from '@/components/Button';

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
  status: 'VERIFIED' | 'PENDING_VERIFICATION' | 'LEASED' | string;
  verified: boolean;
  published: boolean;
  image?: string;
  created_at?: string;
}

export default function MyLandsPage() {
  const router = useRouter();
  const [lands, setLands] = useState<LandPlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMyLands = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/lands?myLands=true&status=${statusFilter}`);
      const data = await res.json();
      if (data.success) {
        setLands(data.data || []);
      }
    } catch (err) {
      console.error('Failed to load my lands:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyLands();
  }, [statusFilter]);

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setTimeout(() => {
      setLands(prev => prev.filter(l => l.id !== id));
      setDeletingId(null);
    }, 500);
  };

  const toggleStatus = (id: string) => {
    setLands(prev =>
      prev.map(l => {
        if (l.id === id) {
          const nextStatus = l.status === 'VERIFIED' ? 'LEASED' : 'VERIFIED';
          return { ...l, status: nextStatus };
        }
        return l;
      })
    );
  };

  const totalSize = lands.reduce((acc, l) => acc + (l.size || 0), 0);
  const totalValue = lands.reduce((acc, l) => acc + (l.annual_price || 0), 0);
  const verifiedCount = lands.filter(l => l.verified || l.status === 'VERIFIED').length;
  const leasedCount = lands.filter(l => l.status === 'LEASED').length;

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30';
      case 'PENDING_VERIFICATION':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/30';
      case 'LEASED':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Hero Banner Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
              <Building className="w-4 h-4" /> Landowner Property Vault
            </div>
            <h1 className="text-3xl font-bold tracking-tight">My Property Portfolio</h1>
            <p className="text-muted-foreground text-sm max-w-xl">
              Manage your agricultural land plots, verify soil agronomy documentation, and track incoming lease proposals.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <Button
              variant="outline"
              onClick={fetchMyLands}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </Button>
            <Button
              onClick={() => router.push('/dashboard/add-land')}
              className="flex items-center gap-2 shadow-lg shadow-primary/25"
            >
              <Plus className="w-4 h-4" /> Add New Land Plot
            </Button>
          </div>
        </div>

        {/* Stat Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Property Plots</span>
            <div className="text-2xl font-bold text-foreground">{lands.length}</div>
            <p className="text-[11px] text-emerald-500 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Active portfolio plots
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Acreage</span>
            <div className="text-2xl font-bold text-foreground">{totalSize.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">ha</span></div>
            <p className="text-[11px] text-muted-foreground">Across {lands.length} locations</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Verified Titles</span>
            <div className="text-2xl font-bold text-emerald-500">{verifiedCount}</div>
            <p className="text-[11px] text-emerald-500 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Verified compliance
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Annual Lease Capital</span>
            <div className="text-2xl font-bold text-primary">${totalValue.toLocaleString()}</div>
            <p className="text-[11px] text-muted-foreground">Est. yearly revenue</p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card/60 border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0 ml-2" />
            {['ALL', 'VERIFIED', 'PENDING_VERIFICATION', 'LEASED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  statusFilter === st
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-muted/40 text-muted-foreground hover:bg-muted'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>

          <span className="text-xs text-muted-foreground self-end sm:self-auto mr-2">
            Showing <strong className="text-foreground">{lands.length}</strong> listings
          </span>
        </div>

        {/* Land Cards Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">Loading landowner property portfolio...</p>
          </div>
        ) : lands.length === 0 ? (
          <div className="bg-card border border-border rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No Land Listings Found</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              You have not listed any land plots under this filter. Click below to add your first property listing.
            </p>
            <Button onClick={() => router.push('/dashboard/add-land')} className="mt-2">
              <Plus className="w-4 h-4 mr-2" /> Add Your First Land
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lands.map((plot) => (
              <div
                key={plot.id}
                className={`bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col ${
                  deletingId === plot.id ? 'opacity-30 scale-95' : ''
                }`}
              >
                {/* Property Image Header */}
                <div className="h-44 relative overflow-hidden bg-muted">
                  <img
                    src={plot.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'}
                    alt={plot.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 text-[11px] font-extrabold rounded-full border shadow-md uppercase tracking-wider backdrop-blur-md ${getBadgeStyle(
                        plot.status
                      )}`}
                    >
                      {plot.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" /> {plot.region}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-base text-foreground line-clamp-1 hover:text-primary transition-colors cursor-pointer" onClick={() => router.push(`/lands/${plot.id}`)}>
                      {plot.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{plot.location}</p>

                    {/* Specs Pills */}
                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                      <div className="p-2 bg-muted/40 rounded-xl">
                        <span className="text-muted-foreground text-[10px] uppercase block">Area Size</span>
                        <span className="font-bold text-foreground">{plot.size} Hectares</span>
                      </div>
                      <div className="p-2 bg-muted/40 rounded-xl">
                        <span className="text-muted-foreground text-[10px] uppercase block">Annual Price</span>
                        <span className="font-bold text-primary">${plot.annual_price.toLocaleString()}/yr</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-xs flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                        <Sprout className="w-4 h-4" />
                        <span className="truncate">{plot.crop_suitability.split(',')[0]}</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground font-mono">pH {plot.soil_ph || '6.4'}</span>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-border space-y-2">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/lands/${plot.id}`)}
                        className="flex-1 text-xs"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" /> View Page
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/proposals/1`)}
                        className="flex-1 text-xs"
                      >
                        <FileText className="w-3.5 h-3.5 mr-1" /> Proposals
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(plot.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10 p-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>

                    <button
                      onClick={() => toggleStatus(plot.id)}
                      className="w-full text-center text-[11px] font-semibold text-muted-foreground hover:text-primary transition-colors py-1"
                    >
                      Toggle Status ({plot.status === 'VERIFIED' ? 'Mark Leased' : 'Mark Verified'})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}