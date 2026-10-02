'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CheckCircle, XCircle, MessageSquare, Eye, Send, DollarSign, Calendar, Clock, RefreshCw } from 'lucide-react';
import { api } from '@/lib/api';

export default function Proposals() {
  const { user } = useSelector((state: RootState) => state.auth);
  const isLandowner = user?.role === 'landowner' || user?.role === 'LAND_OWNER';
  
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>(isLandowner ? 'received' : 'sent');
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [animatingProposal, setAnimatingProposal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [proposals, setProposals] = useState<any[]>([]);

  const defaultMockProposals = [
    {
      id: '1',
      investorName: 'Sarah Johnson',
      landTitle: 'Coffee Farm Plot #5',
      amount: 50000,
      duration: 5,
      message: 'Interested in sustainable coffee production partnership with modern irrigation.',
      status: 'pending',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      investorName: 'Mike Chen',
      landTitle: 'Maize Field #12',
      amount: 25000,
      duration: 3,
      message: 'Looking to invest in high-yield maize cultivation and solar storage.',
      status: 'accepted',
      createdAt: '2024-01-10',
    },
  ];

  const fetchProposals = async () => {
    setLoading(true);
    try {
      if (activeTab === 'received') {
        const res = await api.proposal.listReceived();
        if (res.success && res.proposals && res.proposals.length > 0) {
          setProposals(res.proposals.map(p => ({
            id: String(p.id),
            investorName: p.investorName || (p.investorID ? `Investor #${p.investorID}` : 'Investor'),
            landTitle: p.landTitle || (p.landID ? `Plot #${p.landID}` : p.title || 'Land Parcel'),
            amount: Number(p.budget || p.amount || 0),
            duration: Number(p.durationInMonths ? Math.round(Number(p.durationInMonths) / 12) : (p.duration || 1)),
            message: p.description || p.message || p.purpose || 'Agricultural partnership proposal',
            status: (p.status || 'pending').toLowerCase(),
            createdAt: p.createdAt || (p.createdOn ? String(p.createdOn).substring(0, 10) : new Date().toISOString().substring(0, 10)),
            raw: p
          })));
        } else {
          setProposals(defaultMockProposals);
        }
      } else {
        const res = await api.proposal.listSent();
        if (res.success && res.proposals && res.proposals.length > 0) {
          setProposals(res.proposals.map(p => ({
            id: String(p.id),
            investorName: p.investorName || 'You (Investor)',
            landTitle: p.landTitle || (p.landID ? `Plot #${p.landID}` : p.title || 'Land Parcel'),
            amount: Number(p.budget || p.amount || 0),
            duration: Number(p.durationInMonths ? Math.round(Number(p.durationInMonths) / 12) : (p.duration || 1)),
            message: p.description || p.message || p.purpose || 'Agricultural partnership proposal',
            status: (p.status || 'pending').toLowerCase(),
            createdAt: p.createdAt || (p.createdOn ? String(p.createdOn).substring(0, 10) : new Date().toISOString().substring(0, 10)),
            raw: p
          })));
        } else {
          setProposals([
            {
              id: '101',
              investorName: 'You (Investor)',
              landTitle: 'Eastern Province Cassava Basin',
              amount: 35000,
              duration: 2,
              message: 'Proposed high-density mechanized cassava processing lease.',
              status: 'pending',
              createdAt: '2024-01-20',
            }
          ]);
        }
      }
    } catch (e) {
      console.error('Failed to load proposals:', e);
      setProposals(defaultMockProposals);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, [activeTab]);

  const handleAccept = async (id: string) => {
    setAnimatingProposal(id);
    try {
      await api.proposal.accept(id);
      setProposals(prev => prev.map(p => p.id === id ? { ...p, status: 'accepted' } : p));
      if (selectedProposal && selectedProposal.id === id) {
        setSelectedProposal((prev: any) => ({ ...prev, status: 'accepted' }));
      }
    } catch (err) {
      console.error('Error accepting proposal:', err);
    } finally {
      setTimeout(() => setAnimatingProposal(null), 600);
    }
  };

  const handleReject = async (id: string) => {
    setAnimatingProposal(id);
    try {
      await api.proposal.reject(id);
      setProposals(prev => prev.map(p => p.id === id ? { ...p, status: 'rejected' } : p));
      if (selectedProposal && selectedProposal.id === id) {
        setSelectedProposal((prev: any) => ({ ...prev, status: 'rejected' }));
      }
    } catch (err) {
      console.error('Error rejecting proposal:', err);
    } finally {
      setTimeout(() => setAnimatingProposal(null), 600);
    }
  };

  const handleCancel = async (id: string) => {
    setAnimatingProposal(id);
    try {
      await api.proposal.cancel(id);
      setProposals(prev => prev.map(p => p.id === id ? { ...p, status: 'canceled' } : p));
      if (selectedProposal && selectedProposal.id === id) {
        setSelectedProposal((prev: any) => ({ ...prev, status: 'canceled' }));
      }
    } catch (err) {
      console.error('Error canceling proposal:', err);
    } finally {
      setTimeout(() => setAnimatingProposal(null), 600);
    }
  };

  const openProposalModal = (proposal: any) => {
    setSelectedProposal(proposal);
    setShowModal(true);
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Proposals</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Review and manage lease and funding proposals between landowners and verified investors.
            </p>
          </div>
          <button
            onClick={fetchProposals}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors self-start"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="border-b border-border">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('received')}
              className={`py-3 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'received'
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-muted-foreground hover:text-foreground/80 hover:border-border'
              }`}
            >
              Received Proposals
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`py-3 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'sent'
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-muted-foreground hover:text-foreground/80 hover:border-border'
              }`}
            >
              Sent Proposals
            </button>
          </nav>
        </div>

        {/* Proposals List Card */}
        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/30">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {activeTab === 'received' ? 'Incoming Investor Proposals' : 'Your Submitted Proposals'} ({proposals.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-8 space-y-4">
              <div className="h-16 bg-muted rounded-xl animate-pulse" />
              <div className="h-16 bg-muted rounded-xl animate-pulse" />
            </div>
          ) : proposals.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No proposals found</p>
              <p className="text-xs mt-1">There are no {activeTab} proposals at this time.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {proposals.map((proposal, index) => (
                <div
                  key={proposal.id}
                  className="p-6 hover:bg-muted/40 transition-colors"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 ${animatingProposal === proposal.id ? 'opacity-50' : ''}`}>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-bold text-foreground">
                          {proposal.investorName}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize ${
                          proposal.status === 'pending'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            : proposal.status === 'accepted'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                        }`}>
                          {proposal.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Interested in: <span className="font-medium text-foreground">{proposal.landTitle}</span>
                      </p>
                      <p className="text-sm text-foreground/80 line-clamp-2">
                        {proposal.message}
                      </p>
                      <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
                        <div className="flex items-center text-primary font-bold">
                          <DollarSign className="w-3.5 h-3.5 mr-0.5" />
                          <span>${proposal.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          <span>{proposal.duration} years lease</span>
                        </div>
                        <span>Date: {proposal.createdAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 md:pt-0 self-end md:self-center">
                      <button
                        onClick={() => openProposalModal(proposal)}
                        className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        title="View details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>

                      {/* Landowner actions on received pending proposals */}
                      {activeTab === 'received' && proposal.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleAccept(proposal.id)}
                            className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded-xl transition-all"
                            title="Accept proposal"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleReject(proposal.id)}
                            className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-all"
                            title="Reject proposal"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </>
                      )}

                      {/* Investor action on sent pending proposals */}
                      {activeTab === 'sent' && proposal.status === 'pending' && (
                        <button
                          onClick={() => handleCancel(proposal.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg border border-rose-200 dark:border-rose-900 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Proposal Detail Modal */}
      {showModal && selectedProposal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Proposal Details
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Reference #{selectedProposal.id}</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-muted/40 p-4 rounded-2xl">
                <div>
                  <h4 className="font-bold text-foreground">{selectedProposal.investorName}</h4>
                  <p className="text-xs text-muted-foreground">Investor</p>
                </div>
                <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full capitalize ${
                  selectedProposal.status === 'pending'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : selectedProposal.status === 'accepted'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  {selectedProposal.status}
                </span>
              </div>

              <div className="bg-muted/30 p-4 rounded-2xl border border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Target Parcel</span>
                <p className="text-base font-bold text-foreground mt-0.5">{selectedProposal.landTitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-2xl border border-border">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Offered Budget</span>
                  <p className="text-2xl font-black text-primary mt-1">${selectedProposal.amount.toLocaleString()}</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-2xl border border-border">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lease Term</span>
                  <p className="text-2xl font-black text-foreground mt-1">{selectedProposal.duration} Years</p>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-2xl border border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Proposal Message & Scope</span>
                <p className="text-sm text-foreground/90 mt-1 leading-relaxed">{selectedProposal.message}</p>
              </div>

              {activeTab === 'received' && selectedProposal.status === 'pending' && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      handleAccept(selectedProposal.id);
                      setShowModal(false);
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Accept Proposal
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedProposal.id);
                      setShowModal(false);
                    }}
                    className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject Proposal
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}