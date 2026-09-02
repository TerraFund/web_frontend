'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { api } from '@/lib/api';
import {
  MapPin,
  ShieldCheck,
  CheckCircle,
  ArrowLeft,
  DollarSign,
  Droplets,
  Sprout,
  FileText,
  User,
  Phone,
  Mail,
  Compass,
  Calendar,
  Layers,
  Send,
  Loader2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';

export default function LandDetailPage() {
  const params = useParams();
  const router = useRouter();
  const landId = params?.id as string;

  const [land, setLand] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'agronomy' | 'map' | 'owner'>('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Modal State
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [submittingProposal, setSubmittingProposal] = useState(false);
  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const [proposalForm, setProposalForm] = useState({
    offeredAmount: '',
    durationMonths: '36',
    intendedCrop: 'Specialty Coffee',
    notes: '',
  });

  useEffect(() => {
    async function fetchLandDetails() {
      try {
        const res = await fetch(`/api/lands/${landId}`);
        const data = await res.json();
        if (data.success && data.land) {
          setLand(data.land);
          setProposalForm((prev) => ({
            ...prev,
            offeredAmount: String(data.land.leasePricePerYear || 35000),
          }));
        } else {
          // Fallback data
          setLand({
            id: landId,
            title: `Agricultural Land Plot #${landId}`,
            location: 'Gasabo District, Kigali Province',
            coordinates: '1°56\'24.8"S 30°03\'35.9"E',
            sizeInHectares: 4.5,
            pricePerHectare: 8500,
            leasePricePerYear: 35000,
            soilType: 'Fertile Volcanic Loam',
            soilPh: 6.4,
            organicMatter: '4.8%',
            waterAccess: 'Perennial Stream & Drip Irrigation System',
            cropSuitability: ['Specialty Coffee', 'Export Maize', 'Organic Beans'],
            verified: true,
            titleDeedNumber: `UPI 1/02/14/03/${landId}884`,
            ownerName: 'Gasabo Agricultural Co-op',
            ownerEmail: 'contact@gasabo-agro.rw',
            ownerPhone: '+250 788 123 456',
            description: 'Prime agricultural land situated on fertile volcanic slopes in Gasabo. Features perennial stream water access, all-weather road connectivity, and high soil nutrient density.',
            images: [
              'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80',
            ],
            agronomyReport: {
              nitrogenContent: 'High (0.24%)',
              phosphorusContent: 'Optimal (35 ppm)',
              potassiumContent: 'Rich (210 ppm)',
              drainageScore: '92 / 100',
              historicalYield: '4.2 Tons / Ha (2023)',
            },
          });
        }
      } catch (err) {
        console.error('Error loading land details:', err);
      } finally {
        setLoading(false);
      }
    }

    if (landId) fetchLandDetails();
  }, [landId]);

  const handleProposalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingProposal(true);
    try {
      await api.proposal.send({
        landId,
        landTitle: land?.title,
        offeredAmount: `$${Number(proposalForm.offeredAmount).toLocaleString()}`,
        proposedDurationMonths: Number(proposalForm.durationMonths),
        intendedCrop: proposalForm.intendedCrop,
        notes: proposalForm.notes,
      });
      setProposalSubmitted(true);
      setTimeout(() => {
        setProposalSubmitted(false);
        setShowProposalModal(false);
      }, 2500);
    } catch (err) {
      console.error('Failed to submit proposal:', err);
    } finally {
      setSubmittingProposal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-7xl mx-auto p-8 w-full space-y-8 pt-24">
          <div className="h-8 bg-muted rounded w-1/3 animate-pulse" />
          <div className="h-96 bg-muted rounded-3xl animate-pulse" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Back Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </button>
          <span className="text-xs text-muted-foreground font-mono">
            Title Deed: {land?.titleDeedNumber}
          </span>
        </div>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                {land?.sizeInHectares} Hectares
              </span>
              {land?.verified && (
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Title Deed Verified
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              {land?.title}
            </h1>
            <p className="text-muted-foreground text-sm flex items-center gap-1.5 mt-2">
              <MapPin className="h-4 w-4 text-primary" /> {land?.location}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              className="bg-accent text-white hover:bg-accent/90 shadow-lg text-sm px-6 py-3"
              onClick={() => setShowProposalModal(true)}
            >
              <Send className="h-4 w-4 mr-2" /> Submit Lease Proposal
            </Button>
          </div>
        </div>

        {/* Image Gallery Carousel */}
        <div className="space-y-4">
          <div className="relative h-96 md:h-[480px] w-full rounded-3xl overflow-hidden bg-card border border-border shadow-md">
            <img
              src={land?.images?.[selectedImageIndex] || land?.images?.[0]}
              alt={land?.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {land?.images?.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) =>
                      prev === 0 ? land.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 text-foreground backdrop-blur-md hover:bg-background transition-all shadow-lg"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) =>
                      prev === land.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 text-foreground backdrop-blur-md hover:bg-background transition-all shadow-lg"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {land?.images?.length > 1 && (
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
              {land.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`h-20 w-32 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImageIndex === idx ? 'border-primary scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details (Tabs) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border-b border-border">
              <nav className="flex space-x-6 overflow-x-auto no-scrollbar py-2">
                {[
                  { id: 'overview', label: 'Property Overview', icon: Info },
                  { id: 'agronomy', label: 'Soil & Agronomy', icon: Sprout },
                  { id: 'map', label: 'GIS Map & Location', icon: Compass },
                  { id: 'owner', label: 'Landowner Profile', icon: User },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-2.5 px-4 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
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

            {/* TAB CONTENTS */}
            {activeTab === 'overview' && (
              <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">About this Plot</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{land?.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="p-4 rounded-xl bg-muted/20 border border-border space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Droplets className="h-4 w-4 text-sky-500" /> Water Access
                    </p>
                    <p className="text-sm font-bold text-foreground">{land?.waterAccess}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/20 border border-border space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Layers className="h-4 w-4 text-emerald-500" /> Soil Profile
                    </p>
                    <p className="text-sm font-bold text-foreground">{land?.soilType}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-foreground mb-3">Suitable Crop Suitabilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {land?.cropSuitability?.map((crop: string) => (
                      <span
                        key={crop}
                        className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Sprout className="h-3.5 w-3.5" /> {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'agronomy' && (
              <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                <h3 className="text-xl font-bold text-foreground">Soil & Agronomy Analysis</h3>
                <p className="text-xs text-muted-foreground">
                  Verified lab report audit conducted for TerraFund agricultural verification.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-muted/20 border border-border">
                    <p className="text-xs text-muted-foreground">Soil pH Level</p>
                    <p className="text-2xl font-extrabold text-foreground mt-1">{land?.soilPh || 6.4}</p>
                    <span className="text-xs text-emerald-600 font-medium">Optimal for crops</span>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/20 border border-border">
                    <p className="text-xs text-muted-foreground">Organic Matter</p>
                    <p className="text-2xl font-extrabold text-foreground mt-1">{land?.organicMatter || '4.8%'}</p>
                    <span className="text-xs text-emerald-600 font-medium">High fertility</span>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/20 border border-border">
                    <p className="text-xs text-muted-foreground">Drainage Score</p>
                    <p className="text-2xl font-extrabold text-foreground mt-1">
                      {land?.agronomyReport?.drainageScore || '92 / 100'}
                    </p>
                    <span className="text-xs text-emerald-600 font-medium">Excellent drainage</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
                  <h4 className="font-bold text-foreground text-sm">NPK Nutrient Profile</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>Nitrogen: <strong className="text-foreground">{land?.agronomyReport?.nitrogenContent}</strong></div>
                    <div>Phosphorus: <strong className="text-foreground">{land?.agronomyReport?.phosphorusContent}</strong></div>
                    <div>Potassium: <strong className="text-foreground">{land?.agronomyReport?.potassiumContent}</strong></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'map' && (
              <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                <h3 className="text-xl font-bold text-foreground">GIS Map Coordinates</h3>
                <p className="text-xs text-muted-foreground">GPS Location: {land?.coordinates}</p>

                <div className="h-64 bg-slate-900 rounded-2xl flex items-center justify-center text-white relative overflow-hidden border border-border">
                  <div className="absolute inset-0 bg-emerald-950/40 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Compass className="h-12 w-12 text-accent mx-auto animate-bounce" />
                      <p className="font-bold text-lg">{land?.location}</p>
                      <p className="text-xs text-emerald-300 font-mono">{land?.coordinates}</p>
                      <span className="px-3 py-1 bg-accent/20 border border-accent/40 rounded-full text-xs font-semibold">
                        GIS Verified Boundary
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'owner' && (
              <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                <h3 className="text-xl font-bold text-foreground">Landowner & Title Deed Info</h3>
                <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold">
                      {land?.ownerName?.[0] || 'O'}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{land?.ownerName}</h4>
                      <p className="text-xs text-muted-foreground">Verified Property Owner</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs pt-3 border-t border-border">
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4 text-primary" /> {land?.ownerEmail}
                    </p>
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4 text-primary" /> {land?.ownerPhone}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Action Card */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-sm sticky top-24">
              <div>
                <p className="text-xs text-muted-foreground">Annual Lease Price</p>
                <p className="text-3xl font-extrabold text-foreground mt-1">
                  ${Number(land?.leasePricePerYear || 35000).toLocaleString()}
                  <span className="text-xs font-normal text-muted-foreground"> / year</span>
                </p>
                <p className="text-xs text-emerald-600 font-semibold mt-1">
                  ~${Math.round((land?.leasePricePerYear || 35000) / (land?.sizeInHectares || 4.5)).toLocaleString()} per Hectare
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 text-sm shadow-md"
                  onClick={() => setShowProposalModal(true)}
                >
                  <Send className="h-4 w-4 mr-2" /> Make Lease Proposal
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-sm"
                  onClick={() => router.push('/dashboard/chat')}
                >
                  <Mail className="h-4 w-4 mr-2" /> Contact Landowner
                </Button>
              </div>

              <div className="p-4 bg-muted/20 rounded-xl text-xs space-y-2 text-muted-foreground">
                <div className="flex items-center gap-1.5 font-bold text-foreground">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" /> TerraFund Escrow Guard
                </div>
                <p>
                  Your lease deposit is protected in escrow and released only upon milestone agreement execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* PROPOSAL MODAL */}
      {showProposalModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" /> Submit Lease Proposal
              </h3>
              <button
                onClick={() => setShowProposalModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {proposalSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h4 className="text-xl font-bold text-foreground">Proposal Submitted!</h4>
                <p className="text-xs text-muted-foreground">
                  The landowner has been notified. Track progress in your Proposals Tracker.
                </p>
              </div>
            ) : (
              <form onSubmit={handleProposalSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Offered Annual Lease Amount ($)</label>
                  <input
                    type="number"
                    value={proposalForm.offeredAmount}
                    onChange={(e) => setProposalForm({ ...proposalForm, offeredAmount: e.target.value })}
                    className="w-full p-3 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Proposed Lease Term</label>
                  <select
                    value={proposalForm.durationMonths}
                    onChange={(e) => setProposalForm({ ...proposalForm, durationMonths: e.target.value })}
                    className="w-full p-3 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="12">1 Year (12 Months)</option>
                    <option value="24">2 Years (24 Months)</option>
                    <option value="36">3 Years (36 Months)</option>
                    <option value="60">5 Years (60 Months)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Intended Agricultural Crop</label>
                  <input
                    type="text"
                    value={proposalForm.intendedCrop}
                    onChange={(e) => setProposalForm({ ...proposalForm, intendedCrop: e.target.value })}
                    className="w-full p-3 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. Arabica Coffee, Tea, Avocado"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Additional Terms / Notes</label>
                  <textarea
                    rows={3}
                    value={proposalForm.notes}
                    onChange={(e) => setProposalForm({ ...proposalForm, notes: e.target.value })}
                    className="w-full p-3 bg-muted/20 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Specify milestone requirements, soil prep support, etc."
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowProposalModal(false)}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submittingProposal}
                    className="bg-primary text-white text-xs px-6"
                  >
                    {submittingProposal ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Send Proposal'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
