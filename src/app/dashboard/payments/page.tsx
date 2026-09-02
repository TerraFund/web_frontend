'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import {
  CreditCard,
  Download,
  Eye,
  Lock,
  Plus,
  ShieldCheck,
  Smartphone,
  Building2,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  CheckCircle,
  Clock,
  Loader2,
  FileText,
  Sparkles,
} from 'lucide-react';

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<'history' | 'methods' | 'escrow'>('history');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [txFilter, setTxFilter] = useState('ALL');

  const [wallet, setWallet] = useState<any>({
    availableBalance: 38500,
    escrowLockedFunds: 85000,
    totalLeaseEarnings: 12400,
  });

  const [transactions, setTransactions] = useState<any[]>([]);

  // Modals state
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showAddMethodModal, setShowAddMethodModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);

  const [depositForm, setDepositForm] = useState({
    amount: '10000',
    channel: 'MTN Mobile Money',
    phoneOrCard: '+250 788 123 456',
    contractId: 'C-88421',
  });
  const [submittingDeposit, setSubmittingDeposit] = useState(false);
  const [depositSuccess, setDepositSuccess] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState<any[]>([
    {
      id: 'm-1',
      type: 'momo',
      name: 'MTN Mobile Money',
      account: '+250 788 123 456',
      isDefault: true,
      provider: 'MTN Rwanda',
    },
    {
      id: 'm-2',
      type: 'airtel',
      name: 'Airtel Money',
      account: '+250 733 987 654',
      isDefault: false,
      provider: 'Airtel Rwanda',
    },
    {
      id: 'm-3',
      type: 'card',
      name: 'Visa Debit',
      account: '**** 4242',
      isDefault: false,
      provider: 'Bank of Kigali',
    },
  ]);

  const loadPaymentsData = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/payments');
      const data = await res.json();
      if (data.success && data.data) {
        setTransactions(data.data.transactions || []);
        if (data.data.walletSummary) {
          setWallet(data.data.walletSummary);
        }
      } else {
        setTransactions([
          {
            id: 'tx-101',
            type: 'ESCROW_DEPOSIT',
            channel: 'MTN Mobile Money',
            channelDetails: '+250 788 123 456',
            amount: 35000,
            status: 'COMPLETED',
            date: '2024-01-15T10:30:00Z',
            description: 'Annual Lease Escrow Deposit for Gasabo Coffee & Grain Plot #1',
            contractId: 'C-88421',
            reference: 'MOMO-88492019',
          },
          {
            id: 'tx-102',
            type: 'MILESTONE_RELEASE',
            channel: 'Escrow Release',
            channelDetails: 'TerraFund Smart Contract',
            amount: 15000,
            status: 'COMPLETED',
            date: '2024-01-18T14:15:00Z',
            description: 'Milestone 1 Payout: Land Handover & Soil Preparation Audit',
            contractId: 'C-88421',
            reference: 'ESCROW-REL-002',
          },
          {
            id: 'tx-103',
            type: 'ESCROW_LOCK',
            channel: 'Visa Card',
            channelDetails: '**** 4242',
            amount: 50000,
            status: 'LOCKED_IN_ESCROW',
            date: '2024-01-20T09:45:00Z',
            description: '5-Year Lease Escrow Lock for Musanze Organic Tea Estate',
            contractId: 'C-99102',
            reference: 'CARD-VISA-9912',
          },
        ]);
      }
    } catch (err) {
      console.error('Failed to load payments data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPaymentsData();
  }, []);

  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingDeposit(true);
    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(depositForm),
      });
      const data = await res.json();
      if (data.success && data.transaction) {
        setTransactions((prev) => [data.transaction, ...prev]);
        setWallet((prev: any) => ({
          ...prev,
          escrowLockedFunds: prev.escrowLockedFunds + Number(depositForm.amount),
        }));
        setDepositSuccess(true);
        setTimeout(() => {
          setDepositSuccess(false);
          setShowDepositModal(false);
        }, 2000);
      }
    } catch (err) {
      console.error('Deposit error:', err);
    } finally {
      setSubmittingDeposit(false);
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (txFilter === 'ALL') return true;
    return tx.type === txFilter || tx.status === txFilter;
  });

  if (loading) {
    return (
      <div className="p-4 md:p-8 space-y-6">
        <div className="h-32 bg-muted rounded-3xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 bg-muted rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 w-full max-w-full overflow-hidden space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-300" /> Escrow Protected
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">
              USD Multi-Currency Wallet
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Payments & Escrow Gateway
          </h1>
          <p className="text-emerald-100 text-sm max-w-2xl">
            Deposit lease capital via Mobile Money or Card, monitor locked escrow milestones, and process automated payout disbursements.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <Button
            onClick={loadPaymentsData}
            disabled={refreshing}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md text-xs sm:text-sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={() => setShowDepositModal(true)}
            className="bg-accent text-white hover:bg-accent/90 shadow-lg text-xs sm:text-sm"
          >
            <Plus className="h-4 w-4 mr-2" /> Deposit to Escrow
          </Button>
        </div>
      </div>

      {/* Wallet Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-semibold">Available Wallet Balance</p>
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-600">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-foreground mt-2">
            ${Number(wallet.availableBalance).toLocaleString()}
          </p>
          <p className="text-xs text-emerald-600 font-semibold mt-3 flex items-center gap-1">
            <ArrowUpRight className="h-3.5 w-3.5" /> Ready for instant withdrawal or reinvestment
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-semibold">Escrow Locked Funds</p>
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
              <Lock className="h-6 w-6" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">
            ${Number(wallet.escrowLockedFunds).toLocaleString()}
          </p>
          <p className="text-xs text-amber-600 font-semibold mt-3 flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> Bound to active lease contracts
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-semibold">Total Lease Earnings</p>
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-foreground mt-2">
            ${Number(wallet.totalLeaseEarnings).toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground font-semibold mt-3 flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Milestone payouts completed
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-6 overflow-x-auto no-scrollbar py-2">
          {[
            { id: 'history', label: `Transaction History (${transactions.length})`, icon: FileText },
            { id: 'methods', label: `Payment Channels (${paymentMethods.length})`, icon: Smartphone },
            { id: 'escrow', label: 'Escrow Milestone Release', icon: Lock },
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
      <div>
        {/* TRANSACTION HISTORY */}
        {activeTab === 'history' && (
          <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">Escrow & Wallet Ledger</h2>
                <p className="text-xs text-muted-foreground">Complete log of deposits, escrow holds, and milestone payouts.</p>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {['ALL', 'ESCROW_DEPOSIT', 'MILESTONE_RELEASE', 'ESCROW_LOCK'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setTxFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      txFilter === st
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {st.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground uppercase font-bold">
                    <th className="py-3 px-4">Date & Ref</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Channel</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-xs">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4 font-mono">
                        <p className="font-bold text-foreground">
                          {new Date(tx.date || Date.now()).toLocaleDateString()}
                        </p>
                        <p className="text-muted-foreground text-[10px]">{tx.reference}</p>
                      </td>

                      <td className="py-4 px-4 font-medium text-foreground">
                        <p className="font-bold">{tx.description}</p>
                        <span className="text-[11px] text-muted-foreground">Contract ID: {tx.contractId}</span>
                      </td>

                      <td className="py-4 px-4 font-medium text-foreground">
                        <span className="px-2.5 py-1 bg-muted rounded-md text-[11px]">
                          {tx.channel} ({tx.channelDetails})
                        </span>
                      </td>

                      <td className="py-4 px-4 font-extrabold text-foreground text-sm">
                        ${Number(tx.amount).toLocaleString()}
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            tx.status === 'COMPLETED'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <button
                          onClick={() => setSelectedReceipt(tx)}
                          className="text-primary hover:text-accent font-bold flex items-center gap-1"
                        >
                          <Eye className="h-3.5 w-3.5" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PAYMENT METHODS */}
        {activeTab === 'methods' && (
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Saved Payment Channels</h2>
                <p className="text-xs text-muted-foreground">Manage your Mobile Money numbers, debit cards, and bank accounts.</p>
              </div>
              <Button onClick={() => setShowAddMethodModal(true)} className="flex items-center gap-2 text-xs">
                <Plus className="h-4 w-4" /> Add Payment Channel
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paymentMethods.map((pm) => (
                <div key={pm.id} className="p-5 border border-border rounded-2xl bg-muted/20 space-y-4 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {pm.type === 'momo' || pm.type === 'airtel' ? (
                        <Smartphone className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <CreditCard className="h-5 w-5 text-primary" />
                      )}
                      <h3 className="font-bold text-foreground text-sm">{pm.name}</h3>
                    </div>
                    {pm.isDefault && (
                      <span className="px-2 py-0.5 bg-primary text-white rounded-md text-[10px] font-bold">
                        Default
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Account Number / Phone:</p>
                    <p className="font-mono text-base font-extrabold text-foreground mt-0.5">{pm.account}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{pm.provider}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ESCROW MILESTONE PAYOUTS */}
        {activeTab === 'escrow' && (
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Lock className="h-5 w-5 text-emerald-600" /> Milestone Escrow Release Portal
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Release funds from escrow to landowner upon verified milestone completion.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: 'c-1',
                  land: 'Gasabo Coffee & Grain Plot #1',
                  milestone: 'Milestone 2: Season 1 Planting & Irrigation Setup',
                  amount: '$10,000',
                  status: 'READY_FOR_RELEASE',
                },
                {
                  id: 'c-2',
                  land: 'Musanze Organic Tea Estate',
                  milestone: 'Milestone 1: Title Deed Handover & Soil Prep Audit',
                  amount: '$15,000',
                  status: 'RELEASED',
                },
              ].map((m) => (
                <div
                  key={m.id}
                  className="p-5 border border-border rounded-2xl bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-bold text-foreground text-base">{m.land}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{m.milestone}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Milestone Value</p>
                      <p className="text-lg font-extrabold text-foreground">{m.amount}</p>
                    </div>

                    <Button
                      disabled={m.status === 'RELEASED'}
                      className={`text-xs ${
                        m.status === 'RELEASED'
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {m.status === 'RELEASED' ? 'Funds Released' : 'Approve & Release'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* DEPOSIT MODAL */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" /> Deposit Funds into Escrow
              </h3>
              <button
                onClick={() => setShowDepositModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {depositSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h4 className="text-xl font-bold text-foreground">Deposit Successful!</h4>
                <p className="text-xs text-muted-foreground">
                  Funds have been processed and locked into TerraFund Escrow.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDepositSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Select Payment Channel</label>
                  <select
                    value={depositForm.channel}
                    onChange={(e) => setDepositForm({ ...depositForm, channel: e.target.value })}
                    className="w-full p-3 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="MTN Mobile Money">MTN Mobile Money (MoMo)</option>
                    <option value="Airtel Money">Airtel Money</option>
                    <option value="Visa Card">Visa / Mastercard Debit</option>
                    <option value="Bank Wire">Bank Wire Transfer</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Deposit Amount ($ USD)</label>
                  <input
                    type="number"
                    value={depositForm.amount}
                    onChange={(e) => setDepositForm({ ...depositForm, amount: e.target.value })}
                    className="w-full p-3 bg-muted/20 border border-border rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Phone Number / Account Ref</label>
                  <input
                    type="text"
                    value={depositForm.phoneOrCard}
                    onChange={(e) => setDepositForm({ ...depositForm, phoneOrCard: e.target.value })}
                    className="w-full p-3 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+250 788 000 000"
                    required
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowDepositModal(false)}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submittingDeposit}
                    className="bg-primary text-white text-xs px-6"
                  >
                    {submittingDeposit ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Confirm Deposit'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* RECEIPT MODAL */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Escrow Transaction Receipt
              </h3>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 bg-muted/20 rounded-2xl border border-border space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reference:</span>
                <span className="font-bold text-foreground">{selectedReceipt.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-bold text-foreground">{selectedReceipt.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-extrabold text-foreground text-sm">
                  ${Number(selectedReceipt.amount).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Channel:</span>
                <span className="font-bold text-foreground">{selectedReceipt.channel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contract ID:</span>
                <span className="font-bold text-foreground">{selectedReceipt.contractId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-bold text-emerald-600">{selectedReceipt.status}</span>
              </div>
            </div>

            <Button
              onClick={() => setSelectedReceipt(null)}
              className="w-full text-xs"
            >
              Close Receipt
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}