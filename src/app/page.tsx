'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Users, MapPin, DollarSign, Leaf, CheckCircle } from 'lucide-react';

/* =============================================
   Testimonials Data
   ============================================= */
const testimonials = [
  {
    id: 1,
    quote: "TerraFund transformed how I manage my farmland investments. The AI matching connected me with the perfect coffee plantation in Kenya — I've seen 15% returns in just 8 months.",
    author: 'Sarah Okonkwo',
    role: 'Agricultural Investor',
    avatar: 'SO',
    rating: 5,
  },
  {
    id: 2,
    quote: "As a landowner, I struggled to find trustworthy investors. TerraFund's verification system and escrow payments gave me peace of mind. My land is now generating sustainable income.",
    author: 'James Mwangi',
    role: 'Landowner, Kericho',
    avatar: 'JM',
    rating: 5,
  },
  {
    id: 3,
    quote: "The platform's data-driven approach is incredible. Soil analysis, climate reports, and ROI projections — everything I need to make smart investment decisions in one place.",
    author: 'Amira Hassan',
    role: 'Impact Investor',
    avatar: 'AH',
    rating: 5,
  },
  {
    id: 4,
    quote: "From listing my land to receiving my first proposal took just 3 days. The direct messaging feature made negotiations smooth and transparent. Highly recommended!",
    author: 'David Kamau',
    role: 'Landowner, Nakuru',
    avatar: 'DK',
    rating: 5,
  },
];

/* =============================================
   How It Works Steps
   ============================================= */
const steps = [
  {
    step: 1,
    title: 'Create Your Account',
    description: 'Sign up as a landowner or investor and complete KYC verification to start your journey.',
    icon: Users,
    color: 'from-primary to-emerald-400',
  },
  {
    step: 2,
    title: 'Discover Opportunities',
    description: 'Browse verified land listings or list your own. Our AI engine suggests the best matches based on your profile.',
    icon: MapPin,
    color: 'from-accent to-orange-400',
  },
  {
    step: 3,
    title: 'Invest & Grow',
    description: 'Send proposals, sign contracts digitally, and manage payments through our secure escrow system.',
    icon: DollarSign,
    color: 'from-primary to-secondary',
  },
];

/* =============================================
   Stats
   ============================================= */
const stats = [
  { value: '1,200+', label: 'Active Users', icon: Users },
  { value: '89', label: 'Lands Listed', icon: MapPin },
  { value: '$2.3M+', label: 'Total Invested', icon: DollarSign },
  { value: '4,500+', label: 'Carbon Credits', icon: Leaf },
];

/* =============================================
   Main Landing Page
   ============================================= */
export default function LandingPage() {
  const { t } = useTranslation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-slide
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextTestimonial]);

  // Keyboard nav
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevTestimonial();
      if (e.key === 'ArrowRight') nextTestimonial();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextTestimonial, prevTestimonial]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              How It Works
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Three Steps to{' '}
              <span className="gradient-text">Success</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in minutes. Our platform guides you from registration to your first investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="group relative bg-background rounded-2xl border border-border p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shadow-lg">
                  {step.step}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <FeaturesSection />

      {/* Stats */}
      <section className="py-20 gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center space-y-2 fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="h-8 w-8 mx-auto text-accent mb-2" />
                <p className="text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-emerald-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold">
              Testimonials
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Trusted by{' '}
              <span className="gradient-text-accent">Thousands</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from landowners and investors who have transformed their agricultural journey with TerraFund.
            </p>
          </div>

          <div
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel */}
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-card border border-border rounded-2xl p-10 text-center space-y-6">
                      {/* Stars */}
                      <div className="flex items-center justify-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-lg text-foreground leading-relaxed italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                          {testimonial.avatar}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-foreground">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentTestimonial === index
                      ? 'bg-primary w-8'
                      : 'bg-border hover:bg-muted-foreground'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl float" />
          <div className="absolute bottom-10 left-20 w-48 h-48 bg-white/5 rounded-full blur-2xl float" style={{ animationDelay: '1s' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Ready to Start Your Agricultural{' '}
            <span className="gradient-text-accent">Investment Journey</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of investors and landowners building a sustainable future for African agriculture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-accent hover:bg-accent/90 text-secondary font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5 text-lg"
            >
              Create Free Account
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-white/30 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/10 text-lg"
            >
              Sign In
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 pt-4 text-sm text-gray-400">
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-accent" /> Free to join</span>
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-accent" /> No credit card required</span>
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-accent" /> KYC verified listings</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}