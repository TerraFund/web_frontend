'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Leaf, Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram, Loader2, Check } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribeState, setSubscribeState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribeState('loading');
    try {
      await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
    } catch {
      // silent
    }
    setTimeout(() => {
      setSubscribeState('success');
      setTimeout(() => {
        setSubscribeState('idle');
        setEmail('');
      }, 3000);
    }, 1000);
  };

  const socialLinks = [
    { icon: Facebook, href: 'http://instagram.com/kawacu_kennedy', label: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/Arnaud_Kennedy', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/kawacu-kennedy-47470a3a6/', label: 'LinkedIn' },
    { icon: Instagram, href: 'http://instagram.com/kawacu_kennedy', label: 'Instagram' },
  ];

  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold">TerraFund</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Connecting African landowners with global investors for sustainable agricultural development.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['About Us', 'How It Works', 'Browse Lands', 'For Investors', 'For Landowners'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-300 text-sm">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                <span>Kigali, Rwanda</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300 text-sm">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span>hello@terrafund.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300 text-sm">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span>+250785256553</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">Stay updated with the latest opportunities.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={subscribeState !== 'idle'}
                className="w-full px-4 py-3 bg-accent hover:bg-accent/90 text-secondary font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {subscribeState === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
                {subscribeState === 'success' && <Check className="h-4 w-4" />}
                {subscribeState === 'idle' && 'Subscribe'}
                {subscribeState === 'loading' && 'Subscribing...'}
                {subscribeState === 'success' && 'Subscribed!'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} TerraFund. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}