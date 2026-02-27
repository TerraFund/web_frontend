'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Leaf, TrendingUp, Shield, Globe } from 'lucide-react';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl float" style={{ animationDelay: '0.8s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="text-white space-y-8 fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
              <Leaf className="h-4 w-4 text-accent" />
              <span>Sustainable Land Investment Platform</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              Invest in{' '}
              <span className="gradient-text-accent">Africa&apos;s</span>
              <br />Agricultural Future
            </h1>

            <p className="text-lg lg:text-xl text-gray-300 max-w-lg leading-relaxed">
              {t('hero.subtitle', 'Connect with verified landowners, access AI-powered recommendations, and fund sustainable agriculture across Africa.')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/register"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-secondary font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5"
              >
                {t('hero.cta', 'Get Started')}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/50"
              >
                Learn More
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="text-sm text-gray-300"><strong className="text-white">1,200+</strong> Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                <span className="text-sm text-gray-300"><strong className="text-white">$2.3M</strong> Invested</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-accent" />
                <span className="text-sm text-gray-300"><strong className="text-white">15</strong> Countries</span>
              </div>
            </div>
          </div>

          {/* Right: Visual element */}
          <div className="hidden lg:block relative fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Main card */}
              <div className="glass-card rounded-3xl p-8 space-y-6" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Premium Coffee Farm</h3>
                    <p className="text-gray-400 text-sm">Kericho, Kenya</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-accent font-bold text-lg">50 ha</p>
                    <p className="text-gray-400 text-xs">Size</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-accent font-bold text-lg">87%</p>
                    <p className="text-gray-400 text-xs">AI Match</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-accent font-bold text-lg">12%</p>
                    <p className="text-gray-400 text-xs">Est. ROI</p>
                  </div>
                </div>
                <button className="w-full py-3 bg-primary hover:bg-primary/80 text-white font-semibold rounded-xl transition-all duration-200">
                  Send Proposal
                </button>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-accent text-secondary px-4 py-2 rounded-full text-sm font-bold shadow-lg float">
                ✓ Verified
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20 float" style={{ animationDelay: '1s' }}>
                🌱 Sustainable
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}