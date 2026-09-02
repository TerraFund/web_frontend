'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';
import Button from '@/components/Button';
import Input from '@/components/Input';
import {
  User,
  Shield,
  FileText,
  Star,
  Camera,
  MapPin,
  Calendar,
  TrendingUp,
  Award,
  Users,
  Settings,
  Edit3,
  Upload,
  CheckCircle2,
  Clock,
  DollarSign,
  Phone,
  Mail,
  Building,
  ShieldCheck,
  Check,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const currentUser = user || {
    name: 'Geofrey Kayin',
    email: 'geofreykayin@gmail.com',
    role: 'landowner',
    phone: '+250 788 123 456',
    location: 'Kigali, Rwanda',
    bio: 'Pioneer agricultural landowner specializing in high-altitude organic coffee estates and automated drip-irrigated farmland.',
    kyc_status: 'verified',
    created_at: '2024-01-10T00:00:00Z',
  };

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: currentUser.name || 'Geofrey Kayin',
    email: currentUser.email || 'geofreykayin@gmail.com',
    phone: currentUser.phone || '+250 788 123 456',
    bio: currentUser.bio || 'Pioneer agricultural landowner specializing in high-altitude organic coffee estates and automated drip-irrigated farmland.',
    location: currentUser.location || 'Kigali, Rwanda',
    website: 'https://terrafund.org',
  });

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditing(false);
    }, 1500);
  };

  const mockReviews = [
    { id: '1', from: 'Sarah Johnson (Impact Investor)', rating: 5, comment: 'Exceptional transparency during title deed verification. Soil pH report was 100% accurate.', date: '2024-01-15' },
    { id: '2', from: 'Mike Chen (AgroFund Africa)', rating: 5, comment: 'Punctual lease milestone payouts and seamless escrow workflow. Highly recommended landowner.', date: '2024-01-10' },
    { id: '3', from: 'David Kim (AgriTech Ventures)', rating: 5, comment: 'Great communication during proposal negotiations. Irrigation infrastructure was top-notch.', date: '2024-01-08' },
  ];

  const mockActivity = [
    { id: '1', type: 'land_listed', title: 'Listed new plot: Musanze Avocado Valley', description: '28 Hectares in Northern Province', date: '2024-01-20', icon: MapPin },
    { id: '2', type: 'deal_closed', title: 'Accepted Escrow Lease Contract', description: 'Agreed $42,000 annual lease for Coffee Estate #5', date: '2024-01-18', icon: CheckCircle2 },
    { id: '3', type: 'review_received', title: 'Received 5-Star Investor Review', description: 'Review left by Sarah Johnson', date: '2024-01-15', icon: Star },
    { id: '4', type: 'kyc_verified', title: 'KYC Level 2 Audit Approved', description: 'National ID and Title Deed validated', date: '2024-01-12', icon: ShieldCheck },
  ];

  const portfolioGrowthData = [
    { month: 'Jan', value: 120000 },
    { month: 'Feb', value: 145000 },
    { month: 'Mar', value: 180000 },
    { month: 'Apr', value: 210000 },
    { month: 'May', value: 250000 },
    { month: 'Jun', value: 285000 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Account Profile</h1>
            <p className="text-muted-foreground text-sm">Manage your identity details, verified credentials, and activity log.</p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard/settings')}
            className="flex items-center gap-2 text-xs"
          >
            <Settings className="w-4 h-4" /> Account Settings
          </Button>
        </div>

        {/* Profile Card Header */}
        <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar Circle */}
            <div className="relative group shrink-0">
              <div className="w-28 h-28 bg-gradient-to-br from-primary via-emerald-600 to-teal-800 rounded-2xl flex items-center justify-center text-white text-4xl font-extrabold shadow-xl border-4 border-card">
                {formData.name.charAt(0)}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-md border border-card cursor-pointer hover:bg-emerald-600 transition-colors">
                <Camera className="w-4 h-4" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-foreground">{formData.name}</h2>
                    <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified {currentUser.role}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-primary" /> {formData.email}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-500" /> {formData.location}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 text-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                  </Button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground max-w-2xl">{formData.bio}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-6 overflow-x-auto no-scrollbar py-2">
            {[
              { id: 'overview', label: 'Profile Overview', icon: User },
              { id: 'portfolio', label: 'Portfolio Growth', icon: TrendingUp },
              { id: 'activity', label: 'Activity Log', icon: Clock },
              { id: 'reviews', label: 'Investor Reviews (3)', icon: Star },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-md'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form / Info Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" /> Personal Information
                  </h3>
                  {saveSuccess && (
                    <span className="text-xs font-bold text-emerald-500 flex items-center gap-1 animate-in fade-in">
                      <Check className="w-4 h-4" /> Saved Successfully!
                    </span>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2.5 bg-muted/40 border border-border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2.5 bg-muted/40 border border-border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3 py-2.5 bg-muted/40 border border-border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Location</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-3 py-2.5 bg-muted/40 border border-border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Public Bio</label>
                      <textarea
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full px-3 py-2.5 bg-muted/40 border border-border rounded-xl text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                      <Button size="sm" onClick={handleSave}>Save Profile</Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    <div className="p-3 bg-muted/30 rounded-xl space-y-1">
                      <span className="text-muted-foreground uppercase text-[10px]">Full Name</span>
                      <p className="font-bold text-foreground text-sm">{formData.name}</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-xl space-y-1">
                      <span className="text-muted-foreground uppercase text-[10px]">Email Address</span>
                      <p className="font-bold text-foreground text-sm">{formData.email}</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-xl space-y-1">
                      <span className="text-muted-foreground uppercase text-[10px]">Phone Contact</span>
                      <p className="font-bold text-foreground text-sm">{formData.phone}</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-xl space-y-1">
                      <span className="text-muted-foreground uppercase text-[10px]">Location</span>
                      <p className="font-bold text-foreground text-sm">{formData.location}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Identity & Verification Card */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground">KYC Identity Verification</h4>
                      <p className="text-xs text-emerald-500 font-semibold">Level 2 Verified (National ID & Title Deed)</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push('/auth/kyc')}
                    className="text-xs flex items-center gap-1"
                  >
                    View Status <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" /> Platform Badges & Trust Score
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <p className="font-bold text-foreground">Verified Landowner</p>
                      <p className="text-muted-foreground text-[11px]">Validated 100% legal title deeds.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3">
                    <Star className="w-5 h-5 text-amber-500 shrink-0 fill-amber-500" />
                    <div>
                      <p className="font-bold text-foreground">Top-Rated Host</p>
                      <p className="text-muted-foreground text-[11px]">5.0 rating across all investor offers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-bold text-foreground text-base">Portfolio Valuation Over Time ($ USD)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip formatter={(val) => [`$${val}`, 'Portfolio Capital']} />
                  <Line type="monotone" dataKey="value" stroke="#0B6E4F" strokeWidth={3} dot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-foreground text-base mb-4">Recent Account Activity</h3>
            <div className="space-y-4">
              {mockActivity.map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className="p-4 bg-muted/30 border border-border rounded-xl flex items-start gap-4 text-xs">
                    <div className="p-2 bg-primary/10 text-primary rounded-xl shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground">{act.title}</p>
                      <p className="text-muted-foreground">{act.description}</p>
                      <span className="text-[10px] text-muted-foreground font-mono">{act.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-foreground text-base mb-4">Verified Investor Ratings</h3>
            <div className="space-y-4">
              {mockReviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-muted/30 border border-border rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">{rev.from}</span>
                    <div className="flex items-center text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{rev.comment}</p>
                  <span className="text-[10px] text-muted-foreground font-mono">{rev.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}