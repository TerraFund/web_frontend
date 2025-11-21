'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Input from './components/Input';
import { Bell, Shield, Palette, Globe } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: 'en',
  });

  const handleSave = () => {
    // Mock save
    console.log('Settings saved:', settings);
  };

  return (
    <div className="min-h-screen bg-background_light dark:bg-background_dark">
      <Navbar />
      <div className="pt-16 flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Settings</h1>

            <div className="space-y-8">
              {/* Notifications */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center mb-6">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Receive push notifications in browser</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Appearance */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center mb-6">
                  <Palette className="h-5 w-5 mr-2" />
                  Appearance
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Toggle dark/light theme</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.darkMode}
                      onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Language */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center mb-6">
                  <Globe className="h-5 w-5 mr-2" />
                  Language & Region
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="sw">Kiswahili</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center mb-6">
                  <Shield className="h-5 w-5 mr-2" />
                  Security
                </h2>
                <div className="space-y-4">
                  <Button variant="outline">Change Password</Button>
                  <Button variant="outline">Enable Two-Factor Authentication</Button>
                  <Button variant="outline" className="text-red-600 hover:text-red-800">
                    Delete Account
                  </Button>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={handleSave}>Save Settings</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}