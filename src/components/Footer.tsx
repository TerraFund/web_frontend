'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  const { darkMode } = useSelector((state: RootState) => state.ui);

  return (
    <footer className={`w-full ${darkMode ? 'bg-background_dark text-text_secondary' : 'bg-background_light text-gray-600'} py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">TerraFund</h3>
            <p className="text-sm">
              Connecting landowners with investors for sustainable land development.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary">How it Works</a></li>
              <li><a href="#" className="hover:text-primary">Browse Lands</a></li>
              <li><a href="#" className="hover:text-primary">Invest</a></li>
              <li><a href="#" className="hover:text-primary">List Land</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary">Help Center</a></li>
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 hover:text-primary cursor-pointer" />
              <Mail className="h-5 w-5 hover:text-primary cursor-pointer" />
            </div>
            <div className="mt-4">
              <input
                type="email"
                placeholder="Subscribe to newsletter"
                className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border`}
              />
              <button className="mt-2 w-full bg-primary text-white py-2 rounded-lg hover:bg-accent">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm">
          <p>&copy; 2025 TerraFund. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}