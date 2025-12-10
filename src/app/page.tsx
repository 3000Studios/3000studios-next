/**
 * Home Page (Main Landing Page)
 * Features: Hero section, featured projects showcase, call-to-action buttons
 * This is the main entry point for visitors to the 3000 Studios website
 * Future Enhancement: Will include the 3D Avatar (Shadow AI) interactive assistant
 */

import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Animated Background Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sapphire rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="gradient-text">Welcome to</span>
            <br />
            <span className="text-white">3000 STUDIOS</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional creative studio delivering cutting-edge digital experiences,
            innovative solutions, and transformative projects
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/store"
              className="px-8 py-4 bg-gold text-black font-bold rounded-lg hover:bg-platinum transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center gap-2"
            >
              Explore Store
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 glass border border-gold text-gold font-bold rounded-lg hover:bg-gold hover:text-black transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center gap-2"
            >
              View Projects
              <Sparkles size={20} />
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <div className="card text-center">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-black" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-400">
                Optimized performance for seamless user experience
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-sapphire rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Global Reach</h3>
              <p className="text-gray-400">
                Serving clients and customers worldwide
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-platinum rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-black" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Premium Quality</h3>
              <p className="text-gray-400">
                Excellence in every detail and interaction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="gradient-text">Experience the Future</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-2xl font-bold text-white mb-4">Live Streaming</h3>
              <p className="text-gray-400 mb-4">
                Watch exclusive live content and interact with our community in real-time.
              </p>
              <Link
                href="/live"
                className="text-gold hover:text-platinum transition-colors inline-flex items-center gap-2"
              >
                Watch Live <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-white mb-4">Premium Store</h3>
              <p className="text-gray-400 mb-4">
                Discover our curated collection of premium products and exclusive items.
              </p>
              <Link
                href="/store"
                className="text-gold hover:text-platinum transition-colors inline-flex items-center gap-2"
              >
                Shop Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Note: Shadow AI Avatar will be added here in future update */}
      <div className="text-center py-12 px-4 opacity-60">
        <p className="text-sm text-gray-500">
          🚀 Shadow AI Interactive Avatar - Coming Soon
        </p>
      </div>
    </div>
  );
}

