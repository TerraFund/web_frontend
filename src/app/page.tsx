// Main landing page component for TerraFund platform
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Users, Shield, TrendingUp, Leaf, Award, CheckCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background_light dark:bg-background_dark">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary to-accent text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full animate-pulse delay-500"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Leaf className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Sustainable Agriculture Platform</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-in slide-in-from-bottom-4 duration-1000">
              Connect Landowners with
              <span className="block text-accent">Sustainable Investors</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
              TerraFund bridges the gap between landowners with unused land and investors seeking profitable, eco-friendly opportunities in agriculture.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in slide-in-from-bottom-4 duration-1000 delay-400">
              <button className="group bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Get Started Free
                <ArrowRight className="inline w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-sm">
                <Award className="inline w-5 h-5 mr-2" />
                View Success Stories
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-2 animate-in slide-in-from-bottom-4 duration-1000 delay-600">
                <CheckCircle className="w-6 h-6 text-accent" />
                <span className="text-lg">Verified Land Listings</span>
              </div>
              <div className="flex items-center justify-center space-x-2 animate-in slide-in-from-bottom-4 duration-1000 delay-700">
                <CheckCircle className="w-6 h-6 text-accent" />
                <span className="text-lg">Secure Transactions</span>
              </div>
              <div className="flex items-center justify-center space-x-2 animate-in slide-in-from-bottom-4 duration-1000 delay-800">
                <CheckCircle className="w-6 h-6 text-accent" />
                <span className="text-lg">Carbon Credits</span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">List Your Land</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Connect with Investors</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Secure Transactions</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Negotiate terms through our platform, sign digital contracts, and complete transactions with built-in escrow protection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose TerraFund?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Advanced features designed for modern agricultural investment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Precise Land Mapping</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Interactive maps with detailed land boundaries, soil analysis, and environmental data.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Investment Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Comprehensive ROI calculations, risk assessments, and market trend analysis.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Secure Escrow</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Bank-grade security with multi-signature contracts and insured transactions.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-green-100 dark:bg-green-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Carbon Credits</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Earn carbon credits through sustainable farming practices and environmental impact.
                </p>
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
        <section className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Real stories from landowners and investors using TerraFund
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
                <div className="absolute top-4 right-4 text-yellow-400">
                  ★★★★★
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  "TerraFund helped me find investors for my family farm. The process was transparent and secure. I got fair market value and the platform handled all the paperwork."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg">
                    J
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">John Doe</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Landowner • Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
                <div className="absolute top-4 right-4 text-yellow-400">
                  ★★★★★
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  "I found great investment opportunities in sustainable agriculture through TerraFund. The platform's analytics helped me make informed decisions."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg">
                    S
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Sarah Smith</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Investor • London, UK</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
                <div className="absolute top-4 right-4 text-yellow-400">
                  ★★★★★
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  "The platform's verification process gives me confidence in every transaction. The carbon credit system is a great bonus for sustainable investing."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg">
                    M
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Mike Johnson</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Landowner • Rift Valley, Kenya</p>
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