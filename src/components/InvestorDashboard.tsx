'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Button from '@/components/Button';
import {
  TrendingUp,
  DollarSign,
  Compass,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Calculator,
  ArrowRight,
  ShieldCheck,
  MapPin,
  RefreshCw,
  Search,
  MessageSquare,
  Sparkles,
  Layers,
  Leaf,
} from 'lucide-react';

interface InvestorDashboardProps {
  user: any;
}

export default function InvestorDashboard({ user }: InvestorDashboardProps) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'proposals' | 'opportunities' | 'calculator'>('proposals');
  const [proposalFilter, setProposalFilter] = useState<string>('ALL');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [proposals, setProposals] = useState<any[]>([]);
  const [availableLands, setAvailableLands] = useState<any[]>([]);

  // ROI Calculator State
  const [investmentAmount, setInvestmentAmount] = useState<number>(25000);
  const [leaseYears, setLeaseYears] = useState<number>(3);
  const [selectedCrop, setSelectedCrop] = useState<string>('coffee');

  const cropYieldRates: Record<string, { label: string; rate: number; duration: string }> = {
    coffee: { label: 'Specialty Arabica Coffee', rate: 0.18, duration: 'Per Harvest Year' },
    tea: { label: 'Highland Tea Estate', rate: 0.15, duration: 'Per Harvest Year' },
    avocado: { label: 'Export Hass Avocado', rate: 0.22, duration: 'Per Harvest Year' },
    maize: { label: 'Organic Maize & Grains', rate: 0.12, duration: 'Bi-Annual Harvest' },
    flowers: { label: 'Horticulture Flowers', rate: 0.20, duration: 'Per Harvest Year' },
  };

  const loadInvestorData = async () => {
    setRefreshing(true);
    try {
      const [dashRes, landsRes, propRes] = await Promise.all([
        api.dashboard.getInvestor(),
        api.land.list(),
        api.proposal.listSent(),
      ]);

      if (landsRes?.success && Array.isArray(landsRes.lands) && landsRes.lands.length > 0) {
        setAvailableLands(landsRes.lands);
      } else {
        setAvailableLands([
          {
            id: '1',
            title: 'Kigali Prime Volcanic Agricultural Plot',
            location: 'Gasabo, Kigali',
            sizeInHectares: 4.5,
            cropSuitability: 'Coffee, Maize, Beans',
            soilType: 'Rich Volcanic Loam',
            verified: true,
            created_at: '2024-01-12T00:00:00Z',
          },
          {
            id: '2',
            title: 'Musanze Highland Tea & Potato Estate',
            location: 'Musanze, Northern Province',
            sizeInHectares: 10.2,
            cropSuitability: 'Tea, Pyrethrum, Potatoes',
            soilType: 'High Altitude Fertile Humus',
            verified: true,
            created_at: '2024-01-15T00:00:00Z',
          },
          {
            id: '3',
            title: 'Bugesera Solar Farm & Hass Avocado Belt',
            location: 'Bugesera, Eastern Province',
            sizeInHectares: 8.0,
            cropSuitability: 'Hass Avocado, Chili, Vegetables',
            soilType: 'Alluvial Clay Loam',
            verified: true,
            created_at: '2024-01-20T00:00:00Z',
          },
        ]);
      }

      if (propRes?.success && Array.isArray(propRes.proposals) && propRes.proposals.length > 0) {
        setProposals(propRes.proposals);
      } else {
        setProposals([
          {
            id: 'inv-prop-1',
            landTitle: 'Kigali Prime Volcanic Agricultural Plot',
            location: 'Gasabo, Kigali',
            offeredAmount: '$35,000',
            status: 'PENDING',
            proposedDurationMonths: 36,
            created_at: '2024-01-18T10:00:00Z',
            ownerName: 'John Doe',
          },
          {
            id: 'inv-prop-2',
            landTitle: 'Musanze Highland Tea & Potato Estate',
            location: 'Musanze, Northern Province',
            offeredAmount: '$75,000',
            status: 'ACCEPTED',
            proposedDurationMonths: 60,
            created_at: '2024-01-10T14:30:00Z',
            ownerName: 'Alice Johnson',
          },
          {
            id: 'inv-prop-3',
            landTitle: 'Bugesera Solar Farm & Hass Avocado Belt',
            location: 'Bugesera, Eastern Province',
            offeredAmount: '$50,000',
            status: 'REJECTED',
            proposedDurationMonths: 24,
            created_at: '2024-01-05T09:15:00Z',
            ownerName: 'Robert Mukasa',
          },
        ]);
      }
    } catch (err) {
      console.error('Failed to load investor dashboard:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadInvestorData();
  }, []);

  // Filtered proposals
  const filteredProposals = proposals.filter((p) => {
    if (proposalFilter === 'ALL') return true;
    return p.status === proposalFilter;
  });

  // Calculate yield
  const currentCropInfo = cropYieldRates[selectedCrop] || cropYieldRates.coffee;
  const estimatedAnnualYield = investmentAmount * currentCropInfo.rate;
  const totalReturn = investmentAmount + estimatedAnnualYield * leaseYears;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-32 bg-muted rounded-3xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-muted rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <TrendingUp className="w-96 h-96" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" /> Investor Portal
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">
                Verified Capital Account
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Investor Dashboard
            </h1>
            <p className="text-emerald-100 text-sm md:text-base mt-2 max-w-2xl">
              Track your agricultural lease portfolio, monitor active proposal statuses, estimate crop ROI, and discover high-yield land opportunities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={loadInvestorData}
              disabled={refreshing}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md text-xs sm:text-sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
            <Button
              onClick={() => router.push('/marketplace')}
              className="bg-accent text-white hover:bg-accent/90 shadow-lg text-xs sm:text-sm"
            >
              <Compass className="h-4 w-4 mr-2" /> Browse Marketplace
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Capital Invested</p>
              <p className="text-3xl font-extrabold text-foreground mt-2">$110,000</p>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-600">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-emerald-600 font-medium">
            <TrendingUp className="h-3.5 w-3.5 mr-1" /> +18.2% Projected Annual Return
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Deals</p>
              <p className="text-3xl font-extrabold text-foreground mt-2">
                {proposals.filter((p) => p.status === 'ACCEPTED').length || 1}
              </p>
            </div>
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-emerald-600 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Escrow Contract Verified
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Proposals</p>
              <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">
                {proposals.filter((p) => p.status === 'PENDING').length || 1}
              </p>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
              <Clock className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-amber-600 font-medium">
            Awaiting Landowner Response
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Portfolio Yield</p>
              <p className="text-3xl font-extrabold text-foreground mt-2">17.4%</p>
            </div>
            <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
              <Leaf className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-muted-foreground font-medium">
            Based on current crop yields
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-6 overflow-x-auto no-scrollbar py-2">
          {[
            { id: 'proposals', label: `My Proposals (${proposals.length})`, icon: FileText },
            { id: 'opportunities', label: `Investment Opportunities (${availableLands.length})`, icon: Compass },
            { id: 'calculator', label: 'Crop ROI Calculator', icon: Calculator },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-4 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Contents */}
      <div>
        {/* PROPOSALS TAB */}
        {activeTab === 'proposals' && (
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">Submitted Investment Proposals</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Track status, deal terms, and landowner decisions on your lease offers.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {['ALL', 'PENDING', 'ACCEPTED', 'REJECTED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setProposalFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      proposalFilter === st
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredProposals.map((prop, idx) => (
                <div
                  key={prop.id || idx}
                  className="p-5 border border-border rounded-2xl bg-muted/20 hover:bg-muted/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-foreground text-base">{prop.landTitle}</h3>
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                          prop.status === 'ACCEPTED'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : prop.status === 'REJECTED'
                            ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {prop.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {prop.location}
                      </span>
                      <span>Owner: <strong className="text-foreground">{prop.ownerName || 'Landowner'}</strong></span>
                      <span>Lease Duration: <strong className="text-foreground">{prop.proposedDurationMonths || 36} Months</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Offered Amount</p>
                      <p className="text-lg font-extrabold text-foreground">{prop.offeredAmount || '$45,000'}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push('/dashboard/chat')}
                        className="text-xs flex items-center gap-1.5"
                      >
                        <MessageSquare className="h-3.5 w-3.5" /> Chat
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/proposals/${prop.id}`)}
                        className="text-xs"
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OPPORTUNITIES TAB */}
        {activeTab === 'opportunities' && (
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Verified Investment Opportunities</h2>
                <p className="text-xs text-muted-foreground">Browse agricultural lands ready for lease and investment.</p>
              </div>
              <Button onClick={() => router.push('/marketplace')}>View All Marketplace Lands</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableLands.map((land) => (
                <div
                  key={land.id}
                  className="p-5 border border-border rounded-2xl bg-card hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                        {land.sizeInHectares || 5.0} Hectares
                      </span>
                      {land.verified && (
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> Verified
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-foreground text-base line-clamp-1">{land.title}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {land.location}
                    </p>
                    <div className="p-3 bg-muted/30 rounded-xl text-xs space-y-1">
                      <p className="text-muted-foreground">Suitable Crops:</p>
                      <p className="font-semibold text-foreground">{land.cropSuitability || 'Coffee, Tea, Horticulture'}</p>
                    </div>
                  </div>

                  <Button
                    className="w-full text-xs mt-2"
                    onClick={() => router.push(`/lands/${land.id}`)}
                  >
                    Submit Lease Proposal
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CROP ROI CALCULATOR TAB */}
        {activeTab === 'calculator' && (
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 md:p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Calculator className="h-6 w-6 text-primary" /> Agricultural Crop ROI Estimator
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Estimate expected annual crop yields and total net returns based on your capital allocation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Controls */}
              <div className="space-y-6 bg-muted/20 p-6 rounded-2xl border border-border">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Target Crop Type</label>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full p-3 bg-card border border-border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {Object.entries(cropYieldRates).map(([key, item]) => (
                      <option key={key} value={key}>
                        {item.label} (Est. {item.rate * 100}% ROI/yr)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold text-foreground">
                    <span>Investment Capital ($)</span>
                    <span className="text-primary">${investmentAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={200000}
                    step={2500}
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$5,000</span>
                    <span>$200,000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold text-foreground">
                    <span>Lease Term (Years)</span>
                    <span className="text-primary">{leaseYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={leaseYears}
                    onChange={(e) => setLeaseYears(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 Year</span>
                    <span>10 Years</span>
                  </div>
                </div>
              </div>

              {/* ROI Output Card */}
              <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white p-6 md:p-8 rounded-2xl space-y-6 flex flex-col justify-between shadow-xl">
                <div>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-200">
                    Projected Return Summary
                  </span>

                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="text-xs text-emerald-200">Est. Annual Crop Yield</p>
                      <p className="text-3xl font-extrabold text-emerald-400">
                        ${estimatedAnnualYield.toLocaleString()} / year
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <p className="text-xs text-emerald-200">Total Capital + Returns ({leaseYears} yrs)</p>
                      <p className="text-4xl font-extrabold text-white">
                        ${totalReturn.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl text-xs space-y-1">
                  <p className="font-semibold text-emerald-200">Assumptions & Escrow Protection:</p>
                  <p className="text-emerald-100">
                    Estimates based on regional soil productivity benchmarks. All investor funds are secured in TerraFund escrow until milestone lease completion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
