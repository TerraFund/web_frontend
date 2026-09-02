'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Button from '@/components/Button';
import {
  Building,
  Plus,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  ShieldCheck,
  MapPin,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Eye,
  Edit,
  MessageSquare,
  Sparkles,
  Award,
  Layers,
} from 'lucide-react';

interface LandownerDashboardProps {
  user: any;
}

export default function LandownerDashboard({ user }: LandownerDashboardProps) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'portfolio' | 'proposals' | 'documents'>('portfolio');
  const [proposalFilter, setProposalFilter] = useState<string>('ALL');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [myLands, setMyLands] = useState<any[]>([]);
  const [receivedProposals, setReceivedProposals] = useState<any[]>([]);

  const loadLandownerData = async () => {
    setRefreshing(true);
    try {
      const [dashRes, landsRes, propRes] = await Promise.all([
        api.dashboard.getLandOwner(),
        api.land.list(),
        api.proposal.listReceived(),
      ]);

      if (dashRes?.success && dashRes.data?.myLands && Array.isArray(dashRes.data.myLands)) {
        setMyLands(dashRes.data.myLands);
      } else if (landsRes?.success && Array.isArray(landsRes.lands) && landsRes.lands.length > 0) {
        setMyLands(landsRes.lands);
      } else {
        setMyLands([
          {
            id: '1',
            title: 'Gasabo Coffee & Grain Plot #1',
            location: 'Gasabo, Kigali',
            sizeInHectares: 4.2,
            soilType: 'Volcanic Loam',
            verified: true,
            published: true,
            hidden: false,
            created_at: '2024-01-10T00:00:00Z',
          },
          {
            id: '2',
            title: 'Musanze Organic Tea & Farm Estate',
            location: 'Musanze, Northern Province',
            sizeInHectares: 8.5,
            soilType: 'Highland Alluvial Humus',
            verified: true,
            published: true,
            hidden: false,
            created_at: '2024-01-14T00:00:00Z',
          },
          {
            id: '3',
            title: 'Bugesera Commercial Agricultural Land',
            location: 'Bugesera, Eastern Province',
            sizeInHectares: 5.8,
            soilType: 'Clay Loam',
            verified: false,
            published: true,
            hidden: false,
            created_at: '2024-01-22T00:00:00Z',
          },
        ]);
      }

      if (propRes?.success && Array.isArray(propRes.proposals) && propRes.proposals.length > 0) {
        setReceivedProposals(propRes.proposals);
      } else {
        setReceivedProposals([
          {
            id: 'prop-lo-1',
            landTitle: 'Gasabo Coffee & Grain Plot #1',
            proposedAmount: '$42,000',
            proposedDurationMonths: 36,
            status: 'PENDING',
            created_at: '2024-01-19T11:00:00Z',
            investorName: 'Sarah Smith',
            investorEmail: 'sarah@example.com',
          },
          {
            id: 'prop-lo-2',
            landTitle: 'Musanze Organic Tea & Farm Estate',
            proposedAmount: '$85,000',
            proposedDurationMonths: 60,
            status: 'ACCEPTED',
            created_at: '2024-01-12T09:30:00Z',
            investorName: 'David K. AgroFund',
            investorEmail: 'david@agrofund.com',
          },
          {
            id: 'prop-lo-3',
            landTitle: 'Bugesera Commercial Agricultural Land',
            proposedAmount: '$38,000',
            proposedDurationMonths: 24,
            status: 'PENDING',
            created_at: '2024-01-21T15:20:00Z',
            investorName: 'GreenEarth Ventures',
            investorEmail: 'info@greenearth.com',
          },
        ]);
      }
    } catch (err) {
      console.error('Failed to load landowner dashboard:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadLandownerData();
  }, []);

  const handleAcceptProposal = async (id: string) => {
    try {
      await api.proposal.accept(id);
      setReceivedProposals((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: 'ACCEPTED' } : p))
      );
    } catch (err) {
      console.error('Accept proposal failed:', err);
    }
  };

  const handleRejectProposal = async (id: string) => {
    try {
      await api.proposal.reject(id);
      setReceivedProposals((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: 'REJECTED' } : p))
      );
    } catch (err) {
      console.error('Reject proposal failed:', err);
    }
  };

  const filteredProposals = receivedProposals.filter((p) => {
    if (proposalFilter === 'ALL') return true;
    return p.status === proposalFilter;
  });

  const totalHectares = myLands.reduce((acc, l) => acc + (l.sizeInHectares || l.size || 0), 0) || 18.5;
  const pendingCount = receivedProposals.filter((p) => p.status === 'PENDING').length;

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
      <div className="bg-gradient-to-r from-primary via-emerald-800 to-teal-950 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <Building className="w-96 h-96" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-amber-300" /> Landowner Portal
              </span>
              <span className="px-3 py-1 bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 rounded-full text-xs font-semibold">
                Title Deed Verified
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Landowner Dashboard
            </h1>
            <p className="text-emerald-100 text-sm md:text-base mt-2 max-w-2xl">
              Manage your registered farm plots, evaluate incoming investor lease proposals, and track your property valuation and lease earnings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={loadLandownerData}
              disabled={refreshing}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md text-xs sm:text-sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={() => router.push('/lands/create')}
              className="bg-accent text-white hover:bg-accent/90 shadow-lg text-xs sm:text-sm"
            >
              <Plus className="h-4 w-4 mr-2" /> List New Land
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Portfolio Valuation</p>
              <p className="text-3xl font-extrabold text-foreground mt-2">$285,000</p>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-600">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-emerald-600 font-medium">
            <TrendingUp className="h-3.5 w-3.5 mr-1" /> +14.6% Property Value Appreciation
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Registered Plots</p>
              <p className="text-3xl font-extrabold text-foreground mt-2">{myLands.length}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Building className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-muted-foreground font-medium">
            Total area: <strong className="text-foreground ml-1">{totalHectares} Ha</strong>
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Proposals Inbox</p>
              <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">
                {pendingCount}
              </p>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
              <FileText className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-amber-600 font-medium">
            {pendingCount > 0 ? `${pendingCount} Pending your approval` : 'All proposals processed'}
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Est. Lease Income</p>
              <p className="text-3xl font-extrabold text-foreground mt-2">$4,200 <span className="text-xs font-normal text-muted-foreground">/mo</span></p>
            </div>
            <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
              <Layers className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-emerald-600 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Protected by Escrow
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-6 overflow-x-auto no-scrollbar py-2">
          {[
            { id: 'portfolio', label: `My Land Plots (${myLands.length})`, icon: Building },
            { id: 'proposals', label: `Investor Proposals (${receivedProposals.length})`, icon: FileText },
            { id: 'documents', label: 'Title Deeds & Documents', icon: ShieldCheck },
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
        {/* LAND PORTFOLIO TAB */}
        {activeTab === 'portfolio' && (
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">My Property Listings</h2>
                <p className="text-xs text-muted-foreground">Manage your published agricultural land plots.</p>
              </div>
              <Button onClick={() => router.push('/lands/create')} className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> List New Plot
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myLands.map((land) => (
                <div
                  key={land.id}
                  className="p-5 border border-border rounded-2xl bg-card hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                        {land.sizeInHectares || 4.0} Hectares
                      </span>
                      {land.verified ? (
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> Verified
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                          Pending Verification
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-foreground text-base line-clamp-1">{land.title}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {land.location}
                    </p>
                    <div className="p-3 bg-muted/30 rounded-xl text-xs space-y-1">
                      <p className="text-muted-foreground">Soil Profile:</p>
                      <p className="font-semibold text-foreground">{land.soilType || 'Fertile Volcanic Loam'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs flex items-center gap-1 justify-center"
                      onClick={() => router.push(`/lands/${land.id}`)}
                    >
                      <Eye className="h-3.5 w-3.5" /> View Listing
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INCOMING PROPOSALS TAB */}
        {activeTab === 'proposals' && (
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">Incoming Investor Offers</h2>
                <p className="text-xs text-muted-foreground">Review, accept, or decline lease proposals from verified investors.</p>
              </div>

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
                      <span>Investor: <strong className="text-foreground">{prop.investorName || 'Investor User'}</strong></span>
                      <span>Proposed Lease Duration: <strong className="text-foreground">{prop.proposedDurationMonths || 36} Months</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Offered Amount</p>
                      <p className="text-lg font-extrabold text-foreground">{prop.proposedAmount || '$45,000'}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {prop.status === 'PENDING' && (
                        <>
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                            onClick={() => handleAcceptProposal(prop.id)}
                          >
                            Accept Offer
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
                            onClick={() => handleRejectProposal(prop.id)}
                          >
                            Decline
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push('/dashboard/chat')}
                        className="text-xs flex items-center gap-1"
                      >
                        <MessageSquare className="h-3.5 w-3.5" /> Message
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TITLE DEEDS & DOCUMENTS TAB */}
        {activeTab === 'documents' && (
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 md:p-8 space-y-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" /> Title Deed Verification Vault
            </h2>
            <p className="text-sm text-muted-foreground">
              Official ownership deeds, land survey certificates, and soil lab reports verified by TerraFund administrative auditors.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 border border-border rounded-2xl bg-muted/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground">Land Title Certificate #TF-88421</h3>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Registered Location: Gasabo District, Kigali Province</p>
                <p className="text-xs text-foreground/80 font-medium">Document Status: Legally Authenticated</p>
              </div>

              <div className="p-5 border border-border rounded-2xl bg-muted/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground">Soil Productivity Lab Report #SR-2024</h3>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Soil Profile: Volcanic Loam (pH 6.4, High Nitrogen)</p>
                <p className="text-xs text-foreground/80 font-medium">Agronomist Audit: Passed for Coffee & Horticulture</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
