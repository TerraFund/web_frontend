'use client';

import { Sprout, Shield, BarChart3, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: Sprout,
    title: 'Smart Land Matching',
    description: 'AI-powered recommendations match investors with the perfect agricultural land based on soil quality, climate data, and ROI projections.',
    gradient: 'from-emerald-500 to-primary',
  },
  {
    icon: Shield,
    title: 'Verified & Secure',
    description: 'Every land listing is KYC-verified with title deed authentication. Escrow payments protect both parties throughout the transaction.',
    gradient: 'from-primary to-secondary',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Insights',
    description: 'Access real-time analytics, crop suitability reports, and market trends to make informed investment decisions with confidence.',
    gradient: 'from-accent to-orange-500',
  },
  {
    icon: MessageSquare,
    title: 'Direct Communication',
    description: 'Built-in real-time messaging enables seamless negotiation between landowners and investors, from proposal to contract signing.',
    gradient: 'from-blue-500 to-primary',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            Why TerraFund
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Everything You Need to{' '}
            <span className="gradient-text">Invest Wisely</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From AI-powered land matching to secure escrow payments, TerraFund provides the complete toolkit for agricultural investment.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-card rounded-2xl border border-border p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}