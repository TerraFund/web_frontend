'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-[#18next]' || 'react-i18next';
import { RootState } from '@/store';
import { toggleDarkMode } from '@/store/slices/uiSlice';
import {
  Bell,
  Palette,
  Globe,
  Shield,
  Moon,
  Sun,
  ChevronRight,
  Check,
  Lock,
  Smartphone,
  KeyRound,
  Download,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff,
  QrCode,
  ShieldAlert,
} from 'lucide-react';
import Button from '@/components/Button';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.ui);

  // Form & Toggle States
  const [notifications, setNotifications] = useState({
    email_offers: true,
    email_messages: true,
    sms_payouts: true,
    escrow_alerts: true,
    security_warnings: true,
    marketing_digest: false,
  });

  const [language, setLanguage] = useState('en');

  // 2FA State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [show2FaModal, setShow2FaModal] = useState(false);
  const [totpCode, setTotpCode] = useState('');
  const [totpSuccess, setTotpSuccess] = useState(false);

  // Password Change State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passData, setPassData] = useState({ current: '', next: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);
  const [passError, setPassError] = useState('');
  const [savingPass, setSavingPass] = useState(false);

  // Apply Dark Mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    if (!passData.current) {
      setPassError('Please enter your current password.');
      return;
    }
    if (passData.next.length < 6) {
      setPassError('New password must be at least 6 characters.');
      return;
    }
    if (passData.next !== passData.confirm) {
      setPassError('New passwords do not match.');
      return;
    }

    setSavingPass(true);
    setTimeout(() => {
      setSavingPass(false);
      setPassSuccess(true);
      setTimeout(() => {
        setPassSuccess(false);
        setShowPasswordModal(false);
        setPassData({ current: '', next: '', confirm: '' });
      }, 1500);
    }, 1000);
  };

  const handleEnable2Fa = () => {
    if (totpCode.length === 6) {
      setTotpSuccess(true);
      setTimeout(() => {
        setTwoFactorEnabled(true);
        setShow2FaModal(false);
        setTotpSuccess(false);
      }, 1200);
    }
  };

  const languages = [
    { value: 'en', label: 'English (US & International)' },
    { value: 'fr', label: 'Français (French)' },
    { value: 'sw', label: 'Kiswahili (East Africa)' },
    { value: 'es', label: 'Español' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security & Account Settings</h1>
          <p className="text-muted-foreground text-sm">
            Manage your account security, notification preferences, 2FA authentication, and system language.
          </p>
        </div>

        {/* 1. SECURITY & AUTHENTICATION */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Security & Credential Management</h2>
              <p className="text-xs text-muted-foreground">Protect your wallet and property listings with strong credentials.</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Change Password */}
            <div className="flex items-center justify-between p-4 bg-muted/30 border border-border rounded-xl">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="text-sm font-bold text-foreground">Account Password</h3>
                  <p className="text-xs text-muted-foreground">Last updated 30 days ago</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => setShowPasswordModal(true)} className="text-xs">
                Change Password
              </Button>
            </div>

            {/* Two-Factor Authentication (2FA) */}
            <div className="flex items-center justify-between p-4 bg-muted/30 border border-border rounded-xl">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-emerald-500" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-foreground">Two-Factor Authentication (2FA)</h3>
                    {twoFactorEnabled ? (
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-md">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded-md">
                        OFF
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Require TOTP authenticator app code for wallet transfers</p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (twoFactorEnabled) {
                    setTwoFactorEnabled(false);
                  } else {
                    setShow2FaModal(true);
                  }
                }}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                  twoFactorEnabled ? 'bg-emerald-500' : 'bg-muted border border-border'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                    twoFactorEnabled ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 2. NOTIFICATIONS */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Notification Preferences</h2>
              <p className="text-xs text-muted-foreground">Configure email & mobile alerts for incoming lease offers and escrow releases.</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { key: 'email_offers', label: 'Email Alerts for Incoming Lease Offers', desc: 'Get notified when an investor submits a proposal.' },
              { key: 'email_messages', label: 'Chat & Negotiation Messages', desc: 'Alerts for incoming chat messages in negotiation portal.' },
              { key: 'sms_payouts', label: 'SMS Payout Alerts', desc: 'Receive instant MoMo/Bank SMS when escrow funds unlock.' },
              { key: 'escrow_alerts', label: 'Escrow Milestone Audit Updates', desc: 'Status reports on agronomist survey verification.' },
              { key: 'security_warnings', label: 'Account Security & Login Alerts', desc: 'Notify on logins from new IP addresses.' },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors">
                <div>
                  <p className="text-xs font-bold text-foreground">{n.label}</p>
                  <p className="text-[11px] text-muted-foreground">{n.desc}</p>
                </div>
                <button
                  onClick={() => toggleNotification(n.key as any)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                    (notifications as any)[n.key] ? 'bg-primary' : 'bg-muted border border-border'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                      (notifications as any)[n.key] ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 3. APPEARANCE & INTERNATIONALIZATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Theme */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Palette className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground">Theme Appearance</h2>
                <p className="text-xs text-muted-foreground">Toggle Light or Dark interface.</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 border border-border rounded-xl">
              <div className="flex items-center gap-2">
                {darkMode ? <Moon className="w-5 h-5 text-amber-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
                <span className="text-xs font-bold text-foreground">Dark Theme Mode</span>
              </div>
              <button
                onClick={() => dispatch(toggleDarkMode())}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                  darkMode ? 'bg-primary' : 'bg-muted border border-border'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                    darkMode ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Language */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground">System Language</h2>
                <p className="text-xs text-muted-foreground">Select interface display language.</p>
              </div>
            </div>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2.5 bg-muted/40 border border-border rounded-xl text-xs font-bold text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {languages.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4. PRIVACY & DATA EXPORT */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" /> Data Privacy & Account Backup
          </h2>
          <p className="text-xs text-muted-foreground">
            Download your personal data, transaction audit receipts, and listed property records in JSON format.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify({ user: 'Geofrey Kayin', export_date: new Date().toISOString() })
                )}`;
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute('href', jsonString);
                downloadAnchor.setAttribute('download', 'terrafund_account_backup.json');
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
              }}
              className="flex items-center gap-2 text-xs"
            >
              <Download className="w-4 h-4" /> Download JSON Backup
            </Button>
          </div>
        </div>

      </div>

      {/* CHANGE PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" /> Update Account Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            {passSuccess ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-foreground">Password Updated!</h4>
                <p className="text-xs text-muted-foreground">Your account credentials have been securely updated.</p>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
                {passError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 font-semibold rounded-xl flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" /> {passError}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="font-semibold text-muted-foreground uppercase">Current Password</label>
                  <input
                    type="password"
                    value={passData.current}
                    onChange={(e) => setPassData({ ...passData, current: e.target.value })}
                    className="w-full px-3 py-2.5 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-muted-foreground uppercase">New Password</label>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={passData.next}
                    onChange={(e) => setPassData({ ...passData, next: e.target.value })}
                    className="w-full px-3 py-2.5 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="Min. 6 characters"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-muted-foreground uppercase">Confirm New Password</label>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={passData.confirm}
                    onChange={(e) => setPassData({ ...passData, confirm: e.target.value })}
                    className="w-full px-3 py-2.5 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="Repeat new password"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="text-muted-foreground text-[11px] font-semibold flex items-center gap-1"
                  >
                    {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />} {showPass ? 'Hide' : 'Show'} Password
                  </button>

                  <div className="flex gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => setShowPasswordModal(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" disabled={savingPass}>
                      {savingPass ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Password'}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 2FA SETUP MODAL */}
      {show2FaModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 text-center">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-500" /> Enable 2FA Authentication
              </h3>
              <button onClick={() => setShow2FaModal(false)} className="text-xs font-semibold text-muted-foreground">
                ✕
              </button>
            </div>

            {totpSuccess ? (
              <div className="py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-foreground text-base">2FA Security Enabled!</h4>
                <p className="text-xs text-muted-foreground">Your account is now protected with 2FA Authenticator codes.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground">
                  Scan this QR code with Google Authenticator or Authy app, then enter your 6-digit verification token below.
                </p>

                <div className="p-4 bg-white rounded-2xl w-44 h-44 mx-auto flex items-center justify-center shadow-inner border">
                  <QrCode className="w-36 h-36 text-black" />
                </div>

                <div className="p-2 bg-muted/40 rounded-xl text-xs font-mono font-bold text-primary">
                  Secret Key: TF-8842-9901-KYC
                </div>

                <input
                  type="text"
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full text-center tracking-widest font-mono text-lg py-2.5 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                />

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => setShow2FaModal(false)} className="w-full">
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleEnable2Fa} disabled={totpCode.length !== 6} className="w-full">
                    Verify & Activate
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}