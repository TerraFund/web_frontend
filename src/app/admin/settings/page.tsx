'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import { Settings, Save, Mail, Shield, DollarSign, Globe, Database, Bell } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    platform: {
      name: 'TerraFund',
      description: 'Decentralized Land Investment Platform',
      contactEmail: 'admin@terrafund.com',
      supportEmail: 'support@terrafund.com',
    },
    security: {
      sessionTimeout: 30,
      passwordMinLength: 8,
      twoFactorRequired: false,
      ipWhitelist: '',
    },
    payments: {
      escrowFee: 2.5,
      platformFee: 5.0,
      minInvestment: 1000,
      maxInvestment: 100000,
      currency: 'USD',
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      disputeAlerts: true,
      systemAlerts: true,
    },
    features: {
      aiRecommendations: true,
      disputeResolution: true,
      escrowService: true,
      kycRequired: true,
    },
  });

  const [activeTab, setActiveTab] = useState<'platform' | 'security' | 'payments' | 'notifications' | 'features'>('platform');

  const handleSave = () => {
    // Mock API call
    console.log('Saving settings:', settings);
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <Settings className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Platform Settings</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              {[
                { id: 'platform', label: 'Platform', icon: Globe },
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'payments', label: 'Payments', icon: DollarSign },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'features', label: 'Features', icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Platform Settings */}
            {activeTab === 'platform' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Platform Configuration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Platform Name
                    </label>
                    <input
                      type="text"
                      value={settings.platform.name}
                      onChange={(e) => updateSetting('platform', 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={settings.platform.contactEmail}
                      onChange={(e) => updateSetting('platform', 'contactEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={settings.platform.description}
                      onChange={(e) => updateSetting('platform', 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Support Email
                    </label>
                    <input
                      type="email"
                      value={settings.platform.supportEmail}
                      onChange={(e) => updateSetting('platform', 'supportEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security Configuration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Minimum Password Length
                    </label>
                    <input
                      type="number"
                      value={settings.security.passwordMinLength}
                      onChange={(e) => updateSetting('security', 'passwordMinLength', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactorRequired}
                        onChange={(e) => updateSetting('security', 'twoFactorRequired', e.target.checked)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Require Two-Factor Authentication
                      </span>
                    </label>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      IP Whitelist (comma-separated)
                    </label>
                    <textarea
                      value={settings.security.ipWhitelist}
                      onChange={(e) => updateSetting('security', 'ipWhitelist', e.target.value)}
                      placeholder="192.168.1.1, 10.0.0.1"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Payment Configuration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Escrow Fee (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={settings.payments.escrowFee}
                      onChange={(e) => updateSetting('payments', 'escrowFee', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Platform Fee (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={settings.payments.platformFee}
                      onChange={(e) => updateSetting('payments', 'platformFee', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Minimum Investment ($)
                    </label>
                    <input
                      type="number"
                      value={settings.payments.minInvestment}
                      onChange={(e) => updateSetting('payments', 'minInvestment', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Maximum Investment ($)
                    </label>
                    <input
                      type="number"
                      value={settings.payments.maxInvestment}
                      onChange={(e) => updateSetting('payments', 'maxInvestment', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Default Currency
                    </label>
                    <select
                      value={settings.payments.currency}
                      onChange={(e) => updateSetting('payments', 'currency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications' },
                    { key: 'pushNotifications', label: 'Push Notifications' },
                    { key: 'disputeAlerts', label: 'Dispute Alerts' },
                    { key: 'systemAlerts', label: 'System Alerts' },
                  ].map((setting) => (
                    <label key={setting.key} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.notifications[setting.key as keyof typeof settings.notifications] as boolean}
                        onChange={(e) => updateSetting('notifications', setting.key, e.target.checked)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {setting.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Feature Settings */}
            {activeTab === 'features' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Feature Toggles</h2>
                <div className="space-y-4">
                  {[
                    { key: 'aiRecommendations', label: 'AI Recommendations' },
                    { key: 'disputeResolution', label: 'Dispute Resolution System' },
                    { key: 'escrowService', label: 'Escrow Service' },
                    { key: 'kycRequired', label: 'KYC Required for Registration' },
                  ].map((feature) => (
                    <label key={feature.key} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.features[feature.key as keyof typeof settings.features] as boolean}
                        onChange={(e) => updateSetting('features', feature.key, e.target.checked)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {feature.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}