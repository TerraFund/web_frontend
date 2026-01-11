// Main landing page component for TerraFund platform
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import { MapPin, Users, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background_light">
      <Navbar />
      <main className="pt-16">
        <HeroSection />

        {/* How It Works */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
              <p className="text-xl text-gray-600">
                Simple, secure, and sustainable process to connect landowners with investors
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connection lines for desktop */}
              <div className="hidden md:block absolute top-20 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
              <div className="hidden md:block absolute top-20 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-accent to-secondary"></div>

              <div className="text-center group">
                <div className="relative">
                  <div className="bg-gradient-to-br from-primary to-primary/80 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                    <MapPin className="w-10 h-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">List Your Land</h3>
                <p className="text-gray-600">
                  Landowners register and list their unused land with comprehensive details about location, size, soil quality, and agricultural suitability.
                </p>
              </div>

              <div className="text-center group">
                <div className="relative">
                  <div className="bg-gradient-to-br from-accent to-accent/80 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                    <Users className="w-10 h-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Connect with Investors</h3>
                <p className="text-gray-600">
                  Investors browse verified lands, filter by criteria, and send personalized investment proposals with competitive terms.
                </p>
              </div>

              <div className="text-center group">
                <div className="relative">
                  <div className="bg-gradient-to-br from-secondary to-secondary/80 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                    <Shield className="w-10 h-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Secure Transactions</h3>
                <p className="text-gray-600">
                  Negotiate terms through our platform, sign digital contracts, and complete transactions with built-in escrow protection.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FeaturesSection />

        {/* Video Demo Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">See TerraFund in Action</h2>
              <p className="text-xl text-gray-600">
                Watch how our platform connects landowners and investors seamlessly
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white">
                <div className="aspect-video bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">TerraFund Demo Video</p>
                    <p className="text-sm opacity-90">Coming Soon</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">Platform Overview</h3>
                  <p className="text-gray-600">
                    Learn how TerraFund revolutionizes land investment with our secure, transparent platform that connects landowners with global investors.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Secure Transactions</span>
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">AI Matching</span>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Real-time Chat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="animate-in slide-in-from-bottom-4 duration-1000">
                <div className="text-4xl font-bold mb-2">1,250+</div>
                <div className="text-primary-100">Active Users</div>
              </div>
              <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-200">
                <div className="text-4xl font-bold mb-2">89</div>
                <div className="text-primary-100">Lands Listed</div>
              </div>
              <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-400">
                <div className="text-4xl font-bold mb-2">$1.25M</div>
                <div className="text-primary-100">Invested</div>
              </div>
              <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-600">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-primary-100">Carbon Credits</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">What Our Users Say</h2>
              <p className="text-xl text-gray-600">
                Real stories from landowners and investors using TerraFund
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white">
                <div className="absolute top-4 right-4 text-yellow-400">
                  ★★★★★
                </div>
                <p className="text-gray-600">
                  "TerraFund helped me find investors for my family farm. The process was transparent and secure. I got fair market value and the platform handled all the paperwork."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg">
                    J
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-500">Landowner • Kigali, Rwanda</p>
                  </div>
                </div>
              </div>

              <div className="bg-white">
                <div className="absolute top-4 right-4 text-yellow-400">
                  ★★★★★
                </div>
                <p className="text-gray-600">
                  &ldquo;I found great investment opportunities in sustainable agriculture through TerraFund. The platform&apos;s analytics helped me make informed decisions.&rdquo;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg">
                    S
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah Smith</p>
                    <p className="text-sm text-gray-500">Investor • London, UK</p>
                  </div>
                </div>
              </div>

              <div className="bg-white">
                <div className="absolute top-4 right-4 text-yellow-400">
                  ★★★★★
                </div>
                <p className="text-gray-600">
                  &ldquo;The platform&apos;s verification process gives me confidence in every transaction. The carbon credit system is a great bonus for sustainable investing.&rdquo;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg">
                    M
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Mike Johnson</p>
                    <p className="text-sm text-gray-500">Landowner • Eastern Rwanda, Rwanda</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}