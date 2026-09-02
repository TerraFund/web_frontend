'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { api } from '@/lib/api';
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  ShieldCheck,
  DollarSign,
  Calendar,
  User,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  Download,
  Lock,
  Layers,
  CheckSquare,
} from 'lucide-react';

export default function ProposalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const proposalId = params?.id as string;

  const [proposal, setProposal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'terms' | 'contract' | 'milestones'>('terms');

  useEffect(() => {
    async function fetchProposalDetails() {
      try {
        const res = await fetch(`/api/proposals/${proposalId}`);
        const data = await res.json();
        if (data.success && data.proposal) {
          setProposal(data.proposal);
        } else {
          setProposal({
            id: proposalId,
            landId: '1',
            landTitle: 'Gasabo Coffee & Grain Plot #1',
            landLocation: 'Gasabo District, Kigali Province',
            proposedAmount: '$42,000',
            proposedDurationMonths: 36,
            status: 'PENDING',
            created_at: '2024-01-19T11:00:00Z',
            investorName: 'Sarah Smith',
            investorEmail: 'sarah@example.com',
            investorPhone: '+254 712 345 678',
            landownerName: 'Gasabo Co-op',
            landownerEmail: 'john@example.com',
            intendedCrop: 'Specialty Arabica Coffee',
            paymentTerms: 'Annual Advance via TerraFund Escrow',
            notes: 'We intend to establish organic washed coffee processing and drip irrigation for 4.2 Hectares.',
            escrowStatus: 'SECURED_IN_ESCROW',
            milestones: [
              { step: 1, title: 'Contract Execution & Escrow Lock', completed: true, date: '2024-01-19' },
              { step: 2, title: 'Land Site Handover & Soil Audit', completed: false, date: 'Pending' },
              { step: 3, title: 'Season 1 Planting & Irrigation Setup', completed: false, date: 'Pending' },
              { step: 4, title: 'First Harvest Yield Profit Split', completed: false, date: 'Pending' },
            ],
          });
        }
      } catch (err) {
        console.error('Error fetching proposal:', err);
      } finally {
        setLoading(false);
      }
    }

    if (proposalId) fetchProposalDetails();
  }, [proposalId]);

  const handleAccept = async () => {
    setActionLoading(true);
    try {
      await api.proposal.accept(proposalId);
      setProposal((prev: any) => ({ ...prev, status: 'ACCEPTED' }));
    } catch (err) {
      console.error('Accept error:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    setActionLoading(true);
    try {
      await api.proposal.reject(proposalId);
      setProposal((prev: any) => ({ ...prev, status: 'REJECTED' }));
    } catch (err) {
      console.error('Reject error:', err);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-7xl mx-auto p-8 w-full space-y-8 pt-24">
          <div className="h-10 bg-muted rounded w-1/3 animate-pulse" />
          <div className="h-64 bg-muted rounded-3xl animate-pulse" />
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
            Proposal Ref: #{proposal?.id}
          </span>
        </div>

        {/* Top Banner */}
        <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
                    proposal?.status === 'ACCEPTED'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : proposal?.status === 'REJECTED'
                      ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {proposal?.status === 'ACCEPTED' && <CheckCircle className="h-3.5 w-3.5" />}
                  {proposal?.status === 'REJECTED' && <XCircle className="h-3.5 w-3.5" />}
                  {proposal?.status === 'PENDING' && <Clock className="h-3.5 w-3.5" />}
                  {proposal?.status}
                </span>

                <span className="text-xs text-muted-foreground">
                  Submitted on {new Date(proposal?.created_at || Date.now()).toLocaleDateString()}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">
                Lease Proposal for {proposal?.landTitle}
              </h1>
              <p className="text-xs text-muted-foreground mt-1">{proposal?.landLocation}</p>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center gap-3">
              {proposal?.status === 'PENDING' && (
                <>
                  <Button
                    onClick={handleAccept}
                    disabled={actionLoading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5"
                  >
                    Accept Proposal
                  </Button>
                  <Button
                    onClick={handleReject}
                    disabled={actionLoading}
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50 text-xs font-bold"
                  >
                    Decline
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                onClick={() => router.push('/dashboard/chat')}
                className="text-xs font-bold flex items-center gap-1.5"
              >
                <MessageSquare className="h-4 w-4" /> Chat with Partner
              </Button>
            </div>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-border">
            <div className="p-4 rounded-2xl bg-muted/20 border border-border">
              <p className="text-xs text-muted-foreground">Offered Lease Capital</p>
              <p className="text-2xl font-extrabold text-foreground mt-1">{proposal?.proposedAmount}</p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/20 border border-border">
              <p className="text-xs text-muted-foreground">Proposed Duration</p>
              <p className="text-2xl font-extrabold text-foreground mt-1">
                {proposal?.proposedDurationMonths} Months
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/20 border border-border">
              <p className="text-xs text-muted-foreground">Agricultural Focus</p>
              <p className="text-base font-extrabold text-foreground mt-2 line-clamp-1">
                {proposal?.intendedCrop}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">TerraFund Escrow</p>
              <p className="text-sm font-extrabold text-emerald-800 dark:text-emerald-200 mt-2 flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> Protected
              </p>
            </div>
          </div>
        </div>

        {/* Details & Agreement Tabs */}
        <div className="space-y-6">
          <div className="border-b border-border">
            <nav className="flex space-x-6 overflow-x-auto no-scrollbar py-2">
              {[
                { id: 'terms', label: 'Proposal Terms & Parties', icon: FileText },
                { id: 'contract', label: 'Legal Escrow Draft', icon: Lock },
                { id: 'milestones', label: 'Milestone Progress Tracker', icon: CheckSquare },
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
          {activeTab === 'terms' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Investor Info */}
              <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Investor Details</h3>
                    <p className="text-xs text-muted-foreground">Offer Sender</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs pt-3 border-t border-border">
                  <p className="font-bold text-foreground text-sm">{proposal?.investorName}</p>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-primary" /> {proposal?.investorEmail}
                  </p>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-primary" /> {proposal?.investorPhone}
                  </p>
                </div>
              </div>

              {/* Landowner Info */}
              <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-lg">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Landowner Details</h3>
                    <p className="text-xs text-muted-foreground">Property Owner</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs pt-3 border-t border-border">
                  <p className="font-bold text-foreground text-sm">{proposal?.landownerName}</p>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-secondary" /> {proposal?.landownerEmail}
                  </p>
                </div>
              </div>

              {/* Notes & Special Requests */}
              <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 space-y-3">
                <h3 className="font-bold text-foreground text-base">Proposed Farm Development Notes</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {proposal?.notes}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'contract' && (
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" /> Standard Agricultural Lease Agreement
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Digitally generated contract bound by TerraFund Escrow Smart Agreement Terms.
                  </p>
                </div>

                <Button variant="outline" className="text-xs flex items-center gap-2">
                  <Download className="h-4 w-4" /> Download PDF Draft
                </Button>
              </div>

              <div className="p-6 bg-muted/20 rounded-2xl border border-border text-xs space-y-4 font-mono text-muted-foreground leading-relaxed">
                <p className="font-bold text-foreground">THIS AGRICULTURAL LAND LEASE AGREEMENT ("Agreement") is entered into by and between:</p>
                <p>1. <strong>LESSOR:</strong> {proposal?.landownerName} ({proposal?.landownerEmail})</p>
                <p>2. <strong>LESSEE:</strong> {proposal?.investorName} ({proposal?.investorEmail})</p>
                <p><strong>PREMISES:</strong> Agricultural Plot situated at {proposal?.landLocation} ("{proposal?.landTitle}").</p>
                <p><strong>CONSIDERATION:</strong> Total sum of {proposal?.proposedAmount} payable in scheduled milestone releases via TerraFund Escrow for a term of {proposal?.proposedDurationMonths} months.</p>
                <p><strong>CROP INTENTION:</strong> {proposal?.intendedCrop}. Both parties acknowledge soil conservation rules and agronomist verification requirements.</p>
              </div>
            </div>
          )}

          {activeTab === 'milestones' && (
            <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
              <h3 className="text-xl font-bold text-foreground">Milestone & Escrow Release Schedule</h3>

              <div className="space-y-4">
                {proposal?.milestones?.map((m: any) => (
                  <div
                    key={m.step}
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                      m.completed
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-foreground'
                        : 'bg-muted/20 border-border text-muted-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          m.completed ? 'bg-emerald-600 text-white' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {m.completed ? <CheckCircle className="h-4 w-4" /> : m.step}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-foreground">{m.title}</p>
                        <p className="text-xs text-muted-foreground">Target Date: {m.date}</p>
                      </div>
                    </div>

                    <span className="text-xs font-bold">
                      {m.completed ? 'COMPLETED' : 'PENDING'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
