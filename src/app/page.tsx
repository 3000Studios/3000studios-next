/**
 * Home Page (Main Landing Page)
 * Features: Hero section, 3D Avatar, featured projects, testimonials, stats, CTAs
 * Award-winning UI with premium animations and interactive elements
 */

import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';
import ShadowAvatar from './components/ShadowAvatar';
import ParticleBackground from './components/ParticleBackground';
import AnimatedStats from './components/AnimatedStats';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import PremiumCTA from './components/PremiumCTA';
import ServicesShowcase from './components/ServicesShowcase';
import GoogleAdsPlaceholder from './components/GoogleAdsPlaceholder';
import Newsletter from './components/Newsletter';

export default function Home() {
  return (
    <div className="min-h-screen mesh-gradient relative">
      {/* Animated Particle Background */}
      <ParticleBackground />
      
      {/* Shadow AI Avatar - Conversational Assistant */}
      <ShadowAvatar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Animated Background Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full filter blur-3xl float-animation"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sapphire rounded-full filter blur-3xl float-animation" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 fade-in-up">
            <span className="gradient-text text-shadow-gold">Welcome to</span>
            <br />
            <span className="text-white">3000 STUDIOS</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto scale-in">
            Award-Winning Creative Studio Delivering Cutting-Edge Digital Experiences,
            Innovative Solutions, and Transformative Projects That Drive Real Results
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 slide-in-left">
            <Link
              href="/store"
              className="btn-primary px-8 py-4 font-bold rounded-lg flex items-center gap-2 hover-lift"
            >
              Explore Store
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/projects"
              className="glass border border-gold text-gold px-8 py-4 font-bold rounded-lg hover:bg-gold hover:text-black transition-all duration-300 hover-lift flex items-center gap-2"
            >
              View Projects
              <Sparkles size={20} />
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <div className="card text-center hover-lift tilt">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 glow">
                <Zap className="text-black" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-400">
                Optimized performance for seamless user experience across all devices
              </p>
            </div>

            <div className="card text-center hover-lift tilt">
              <div className="w-12 h-12 bg-sapphire rounded-full flex items-center justify-center mx-auto mb-4 glow-sapphire">
                <Globe className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Global Reach</h3>
              <p className="text-gray-400">
                Serving 250+ clients and customers worldwide with excellence
              </p>
            </div>

            <div className="card text-center hover-lift tilt">
              <div className="w-12 h-12 bg-platinum rounded-full flex items-center justify-center mx-auto mb-4 shimmer">
                <Sparkles className="text-black" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Premium Quality</h3>
              <p className="text-gray-400">
                99% client satisfaction with excellence in every detail
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Statistics */}
      <AnimatedStats />

      {/* Services Showcase - Revenue Generation */}
      <ServicesShowcase />

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Google Ads Placeholder - Revenue Generation */}
      <div className="py-12 px-4">
        <GoogleAdsPlaceholder 
          slot="home-mid-content" 
          format="rectangle"
          className="max-w-6xl mx-auto"
        />
      </div>

      {/* Featured Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="gradient-text text-shadow-gold">Experience the Future</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card hover-lift">
              <div className="text-5xl mb-4">📡</div>
              <h3 className="text-2xl font-bold text-white mb-4">Live Streaming</h3>
              <p className="text-gray-400 mb-4">
                Watch exclusive live content and interact with our community in real-time.
              </p>
              <Link
                href="/live"
                className="text-gold hover:text-platinum transition-colors inline-flex items-center gap-2 font-semibold"
              >
                Watch Live <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card hover-lift">
              <div className="text-5xl mb-4">🛍️</div>
              <h3 className="text-2xl font-bold text-white mb-4">Premium Store</h3>
              <p className="text-gray-400 mb-4">
                Discover our curated collection of premium products and exclusive items.
              </p>
              <Link
                href="/store"
                className="text-gold hover:text-platinum transition-colors inline-flex items-center gap-2 font-semibold"
              >
                Shop Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <PremiumCTA />

      {/* Newsletter Section - Revenue/Lead Generation */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Newsletter 
            variant="hero"
            title="Join Our Exclusive Community"
            description="Get insider access to cutting-edge design trends, development tips, and exclusive offers"
          />
        </div>
      </section>

    </div>
  );
}

