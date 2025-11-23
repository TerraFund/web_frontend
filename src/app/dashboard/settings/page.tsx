'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { Bell, Shield, Palette, Globe } from 'lucide-react';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: i18n.language || 'en',
  });

  // Update language when i18n language changes
  useEffect(() => {
    setSettings(prev => ({ ...prev, language: i18n.language }));
  }, [i18n.language]);

  const handleSave = () => {
    // Change language if it was updated
    if (settings.language !== i18n.language) {
      i18n.changeLanguage(settings.language);
    }
    // Mock save
    console.log('Settings saved:', settings);
  };

  return (
    <div className="p-8">
       <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{t('settings.title')}</h1>

        <div className="space-y-8">
        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center mb-6">
                  <Bell className="h-5 w-5 mr-2" />
                  {t('settings.notifications')}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900 dark:text-white">{t('settings.notifications.email')}</label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.notifications.emailDesc')}</p>
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
                      <label className="text-sm font-medium text-gray-900 dark:text-white">{t('settings.notifications.push')}</label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.notifications.pushDesc')}</p>
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
                  {t('settings.appearance')}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900 dark:text-white">{t('settings.appearance.darkMode')}</label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.appearance.darkModeDesc')}</p>
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
                  {t('settings.language')}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('settings.language.label')}</label>
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
                  {t('settings.security')}
                </h2>
                <div className="space-y-4">
                  <Button variant="outline">{t('settings.security.changePassword')}</Button>
                  <Button variant="outline">{t('settings.security.twoFactor')}</Button>
                  <Button variant="outline" className="text-red-600 hover:text-red-800">
                    {t('settings.security.deleteAccount')}
                  </Button>
                </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
                <Button onClick={handleSave}>{t('settings.save')}</Button>
        </div>
      </div>
    </div>
  </div>
  );
}