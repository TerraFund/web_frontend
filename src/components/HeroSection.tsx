'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Award } from 'lucide-react';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-accent text-white py-24 overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full animate-pulse delay-500"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <span className="text-sm font-medium">Sustainable Agriculture Platform</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-in slide-in-from-bottom-4 duration-1000">
          {t('landing.hero.title')}
        </h1>

        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
          {t('landing.hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in slide-in-from-bottom-4 duration-1000 delay-400">
          <Link href="/auth/register" className="group bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center">
            {t('landing.hero.getStarted')}
            <ArrowRight className="inline w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-sm">
            <Award className="inline w-5 h-5 mr-2" />
            {t('landing.hero.viewStories')}
          </button>
        </div>
      </div>
    </section>
  );
}