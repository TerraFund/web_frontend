'use client';

import { useTranslation } from 'react-i18next';
import { MapPin, TrendingUp, Shield, Leaf } from 'lucide-react';

export default function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">{t('landing.features.title')}</h2>
          <p className="text-xl text-gray-600">
            Advanced features designed for modern agricultural investment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{t('landing.features.mapping')}</h3>
            <p className="text-gray-600">
              {t('landing.features.mappingDesc')}
            </p>
          </div>

          <div className="bg-white">
            <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{t('landing.features.analytics')}</h3>
            <p className="text-gray-600">
              {t('landing.features.analyticsDesc')}
            </p>
          </div>

          <div className="bg-white">
            <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{t('landing.features.escrow')}</h3>
            <p className="text-gray-600">
              {t('landing.features.escrowDesc')}
            </p>
          </div>

          <div className="bg-white">
            <div className="bg-green-100">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{t('landing.features.carbon')}</h3>
            <p className="text-gray-600">
              {t('landing.features.carbonDesc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}