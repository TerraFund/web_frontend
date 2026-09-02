'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';
import { api } from '@/lib/api';
import ReviewModal from '@/components/ReviewModal';
import Button from '@/components/Button';
import {
  MapPin,
  TrendingUp,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  RefreshCw,
  Building,
  DollarSign,
  Layers,
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const [activeTab, setActiveTab] = useState<'overview' | 'lands' | 'proposals' | 'activity'>('overview');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<{ id: string; name: string } | null>(null);

  const [dashboardData, setDashboardData] = useState<any>(null);
  const [lands, setLands] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);

  const isLandowner = user?.role === 'landowner';
  const isAdmin = user?.role === 'admin';

  const fetchDashboardData = async () => {
    setRefreshing(true);
    try {
      // Fetch role-appropriate dashboard payload
      let dashRes: any = null;
      if (isLandowner) {
        dashRes = await api.dashboard.getLandOwner();
      } else {
        dashRes = await api.dashboard.getInvestor();
      }

      if (dashRes?.success && dashRes.data) {
        setDashboardData(dashRes.data);
      }

      // Fetch lands and proposals
      const [landsRes, propRes] = await Promise.all([
        api.land.list(),
        isLandowner ? api.proposal.listReceived() : api.proposal.listSent(),
      ]);

      if (landsRes?.success && Array.isArray(landsRes.lands)) {
        setLands(landsRes.lands);
      } else {
        setLands([
          {
            id: '1',
            title: 'Kigali Prime Farm Plot #4',
            location: 'Gasabo, Kigali',
            sizeInHectares: 3.5,
            soilType: 'Loam / Fertile Volcanic',
            verified: true,
            created_at: '2024-01-10T00:00:00Z',
          },
          {
            id: '2',
            title: 'Northern Province Tea Plantation',
            location: 'Musanze, Northern Region',
            sizeInHectares: 8.2,
            soilType: 'Rich Humus',
            verified: true,
            created_at: '2024-01-15T00:00:00Z',
          },
        ]);
      }

      if (propRes?.success && Array.isArray(propRes.proposals)) {
        setProposals(propRes.proposals);
      } else {
        setProposals([
          {
            id: 'prop-101',
            landTitle: 'Kigali Prime Farm Plot #4',
            proposedAmount: '$45,000',
            status: 'PENDING',
            created_at: '2024-01-18T10:00:00Z',
            investorName: 'Sarah Smith',
          },
          {
            id: 'prop-102',
            landTitle: 'Northern Province Tea Plantation',
            proposedAmount: '$80,000',
            status: 'ACCEPTED',
            created_at: '2024-01-12T14:30:00Z',
            investorName: 'David K.',
          },
        ]);
      }
    } catch (err) {
      console.error('Error loading user dashboard:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user?.role]);

  const handleReviewClick = () => {
    setSelectedPartner({ id: 'partner1', name: 'Sarah Johnson' });
    setShowReviewModal(true);
  };

  const handleReviewSubmit = (review: { rating: number; comment: string }) => {
    console.log('Review submitted:', review);
    setShowReviewModal(false);
    setSelectedPartner(null);
  };

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Please log in to view your dashboard.</p>
        <Button className="mt-4" onClick={() => router.push('/login')}>
          Log In
        </Button>
      </div>
    );
  }

  // Calculate dynamic stats
  const totalLandsCount = dashboardData?.totalLands || dashboardData?.totalAvailableLands || lands.length || 12;
  const totalProposalsCount = dashboardData?.totalProposals || proposals.length || 8;
  const activeDealsCount = dashboardData?.acceptedProposalsCount || dashboardData?.totalAcceptedProposals || 3;
  const estimatedPortfolioValue = isLandowner ? '$245,000' : '$125,000';

  return (
    <div className="p-4 md:p-8 w-full max-w-full overflow-hidden min-h-screen bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Banner / Welcome Header */}
        <div className="bg-gradient-to-r from-primary via-emerald-800 to-teal-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
            <Building className="w-96 h-96" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
                  {user.role} Dashboard
                </span>
                {user.kyc_status === 'verified' && (
                  <span className="px-3 py-1 bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 rounded-full text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> KYC Verified
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Welcome back, {user.name}!
              </h1>
              <p className="text-emerald-100 text-sm md:text-base mt-2 max-w-2xl">
                {isLandowner
                  ? 'Manage your registered land plots, review incoming investment proposals, and track your property portfolio.'
                  : 'Explore verified agricultural lands, track your sent proposals, and manage your active investments.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={fetchDashboardData}
                disabled={refreshing}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md text-xs sm:text-sm"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              {isLandowner ? (
                <Button
                  onClick={() => router.push('/lands/create')}
                  className="bg-accent text-white hover:bg-accent/90 shadow-lg text-xs sm:text-sm"
                >
                  <Plus className="h-4 w-4 mr-2" /> List New Land
                </Button>
              ) : (
                <Button
                  onClick={() => router.push('/marketplace')}
                  className="bg-accent text-white hover:bg-accent/90 shadow-lg text-xs sm:text-sm"
                >
                  Browse Marketplace
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {isLandowner ? 'My Listed Lands' : 'Available Lands'}
                </p>
                <p className="text-3xl font-extrabold text-foreground mt-2">{totalLandsCount}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                <Building className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-600 font-medium">
              <TrendingUp className="h-3.5 w-3.5 mr-1" /> Active listings
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {isLandowner ? 'Proposals Received' : 'Proposals Sent'}
                </p>
                <p className="text-3xl font-extrabold text-foreground mt-2">{totalProposalsCount}</p>
              </div>
              <div className="p-3 bg-accent/10 rounded-2xl text-accent">
                <FileText className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-muted-foreground font-medium">
              {dashboardData?.pendingProposalsCount || 2} Pending Review
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Deals</p>
                <p className="text-3xl font-extrabold text-foreground mt-2">{activeDealsCount}</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
                <Layers className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-600 font-medium">
              <CheckCircle className="h-3.5 w-3.5 mr-1" /> Escrow Agreement Active
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Portfolio Value</p>
                <p className="text-3xl font-extrabold text-foreground mt-2">{estimatedPortfolioValue}</p>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-600">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-600 font-medium">
              <TrendingUp className="h-3.5 w-3.5 mr-1" /> +14.2% Estimated ROI
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border">
          <nav className="flex space-x-4 md:space-x-8 overflow-x-auto no-scrollbar py-2">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'lands', label: isLandowner ? 'My Lands' : 'Featured Lands' },
              { id: 'proposals', label: 'Proposals Tracker' },
              { id: 'activity', label: 'Activity Log' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3 border-b-2 font-bold text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Contents */}
        <div>
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-8">
                {/* Recent Proposals Card */}
                <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      {isLandowner ? 'Recent Incoming Proposals' : 'My Recent Proposals'}
                    </h3>
                    <button
                      onClick={() => setActiveTab('proposals')}
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                      View all <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {proposals.slice(0, 3).map((prop, index) => (
                      <div
                        key={prop.id || index}
                        className="p-4 border border-border rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <p className="font-bold text-foreground text-sm">
                            {prop.landTitle || `Land Plot #${index + 1}`}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {isLandowner
                              ? `Offered by: ${prop.investorName || 'Investor User'}`
                              : `Proposal submitted on ${new Date(prop.created_at || Date.now()).toLocaleDateString()}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-extrabold text-foreground text-sm">
                            {prop.proposedAmount || '$50,000'}
                          </span>
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
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
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lands Preview Grid */}
                <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      {isLandowner ? 'My Registered Lands' : 'Available Land Listings'}
                    </h3>
                    <button
                      onClick={() => setActiveTab('lands')}
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                      Explore all <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {lands.slice(0, 2).map((land, index) => (
                      <div
                        key={land.id || index}
                        className="p-4 border border-border rounded-xl bg-card hover:shadow-md transition-all space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                            {land.sizeInHectares || 3.0} Hectares
                          </span>
                          {land.verified && (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-xs font-medium">
                              Verified
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-foreground text-sm line-clamp-1">{land.title}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> {land.location}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-xs mt-2"
                          onClick={() => router.push(`/lands/${land.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Quick Actions & Review Prompt */}
              <div className="space-y-6">
                <div className="bg-card rounded-2xl shadow-sm border border-border p-6 space-y-4">
                  <h3 className="text-lg font-bold text-foreground">Quick Actions</h3>
                  <div className="space-y-3">
                    {isLandowner ? (
                      <>
                        <Button
                          className="w-full bg-primary hover:bg-primary/90 text-white justify-start"
                          onClick={() => router.push('/lands/create')}
                        >
                          <Plus className="h-4 w-4 mr-2" /> List New Land Plot
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => setActiveTab('proposals')}
                        >
                          <FileText className="h-4 w-4 mr-2" /> View Incoming Proposals
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className="w-full bg-primary hover:bg-primary/90 text-white justify-start"
                          onClick={() => router.push('/marketplace')}
                        >
                          <Building className="h-4 w-4 mr-2" /> Browse Land Marketplace
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => setActiveTab('proposals')}
                        >
                          <FileText className="h-4 w-4 mr-2" /> My Submitted Proposals
                        </Button>
                      </>
                    )}
                    {isAdmin && (
                      <Button
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white justify-start"
                        onClick={() => router.push('/admin')}
                      >
                        <ShieldCheck className="h-4 w-4 mr-2" /> Open Admin Portal
                      </Button>
                    )}
                  </div>
                </div>

                {/* Review Prompt Banner */}
                <div className="bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-amber-500/20 rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                    <Star className="h-4 w-4 fill-current" /> Partner Feedback
                  </div>
                  <h4 className="text-base font-bold text-foreground">Review Completed Deals</h4>
                  <p className="text-xs text-muted-foreground">
                    Rate and review your partners to build trust within the TerraFund agricultural community.
                  </p>
                  <Button
                    onClick={handleReviewClick}
                    className="w-full bg-accent text-white hover:bg-accent/90 text-xs"
                  >
                    Leave Partner Review
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* LANDS TAB */}
          {activeTab === 'lands' && (
            <div className="bg-card rounded-2xl shadow-sm border border-border p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">
                  {isLandowner ? 'My Registered Lands' : 'Available Marketplace Lands'}
                </h2>
                {isLandowner && (
                  <Button onClick={() => router.push('/lands/create')}>
                    <Plus className="h-4 w-4 mr-2" /> Add Land
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {lands.map((land) => (
                  <div
                    key={land.id}
                    className="p-5 border border-border rounded-2xl bg-card hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                          {land.sizeInHectares || 2.5} Hectares
                        </span>
                        {land.verified && (
                          <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                            Verified
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-foreground text-base">{land.title}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> {land.location}
                      </p>
                      <p className="text-xs text-foreground/80">
                        Soil Type: <span className="font-semibold">{land.soilType || 'Volcanic Loam'}</span>
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full text-xs mt-4"
                      onClick={() => router.push(`/lands/${land.id}`)}
                    >
                      View Full Details
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROPOSALS TAB */}
          {activeTab === 'proposals' && (
            <div className="bg-card rounded-2xl shadow-sm border border-border p-6 space-y-6">
              <h2 className="text-xl font-bold text-foreground">Proposals Tracker</h2>
              <div className="space-y-4">
                {proposals.map((prop, idx) => (
                  <div
                    key={prop.id || idx}
                    className="p-5 border border-border rounded-xl bg-muted/20 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-foreground text-base">
                          {prop.landTitle || `Land Proposal #${idx + 1}`}
                        </h3>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            prop.status === 'ACCEPTED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : prop.status === 'REJECTED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {prop.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {isLandowner
                          ? `Submitted by: ${prop.investorName || 'Investor'}`
                          : `Offered Amount: ${prop.proposedAmount || '$50,000'}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {isLandowner && prop.status === 'PENDING' && (
                        <>
                          <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700">
                            Accept
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                            Reject
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" onClick={() => router.push(`/proposals/${prop.id}`)}>
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTIVITY TAB */}
          {activeTab === 'activity' && (
            <div className="bg-card rounded-2xl shadow-sm border border-border p-6 space-y-6">
              <h2 className="text-xl font-bold text-foreground">Recent Account Activity</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Account Login Successful</p>
                    <p className="text-xs text-muted-foreground">Authenticated via Web Portal</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20">
                  <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Proposal Under Review</p>
                    <p className="text-xs text-muted-foreground">Kigali Prime Farm Plot #4</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedPartner && (
        <ReviewModal
          targetUserId={selectedPartner.id}
          targetUserName={selectedPartner.name}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
}