'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/store';
import { toggleDarkMode } from '@/store/slices/uiSlice';
import { Bell, Palette, Globe, Shield, Moon, Sun, ChevronRight, Check } from 'lucide-react';

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    proposals: true,
    messages: true,
    marketing: false,
  });
  const [language, setLanguage] = useState(i18n.language || 'en');

  // Apply dark mode class to <html> whenever darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'sw', label: 'Kiswahili' },
    { value: 'es', label: 'Español' },
  ];

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('settings.title')}</h1>
          <p className="text-muted-foreground mt-1">Manage your preferences and account settings</p>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{t('settings.notifications')}</h2>
              <p className="text-sm text-muted-foreground">Choose how you receive updates</p>
            </div>
          </div>
          <div className="space-y-3">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                <span className="text-sm font-medium text-foreground capitalize">{key.replace('_', ' ')} notifications</span>
                <button
                  onClick={() => toggleNotification(key as keyof typeof notifications)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-primary' : 'bg-border'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-5' : ''}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Palette className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{t('settings.appearance')}</h2>
              <p className="text-sm text-muted-foreground">Customize the look and feel</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="h-5 w-5 text-accent" /> : <Sun className="h-5 w-5 text-accent" />}
              <div>
                <span className="text-sm font-medium text-foreground">{t('settings.appearance.darkMode')}</span>
                <p className="text-xs text-muted-foreground">{t('settings.appearance.darkModeDesc')}</p>
              </div>
            </div>
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${darkMode ? 'bg-primary' : 'bg-border'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${darkMode ? 'translate-x-5' : ''}`} />
            </button>
          </div>
        </div>

        {/* Language */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{t('settings.language')}</h2>
              <p className="text-sm text-muted-foreground">Select your preferred language</p>
            </div>
          </div>
          <div className="space-y-1">
            {languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => handleLanguageChange(lang.value)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                  language === lang.value ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50 text-foreground'
                }`}
              >
                <span className="text-sm font-medium">{lang.label}</span>
                {language === lang.value && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{t('settings.security')}</h2>
              <p className="text-sm text-muted-foreground">Manage your account security</p>
            </div>
          </div>
          <div className="space-y-1">
            {[
              { label: t('settings.security.changePassword'), description: 'Update your account password' },
              { label: t('settings.security.twoFactor'), description: 'Add an extra layer of security' },
              { label: 'Active Sessions', description: 'Manage your logged-in devices' },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group"
              >
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}