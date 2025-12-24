/**
 * Home Page (Main Landing Page)
 * Features: High-conversion video hero, monetized UI, affiliate stacks, premium CTAs
 * Award-winning UI with premium animations and interactive elements
 */

import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Globe, Lock } from "lucide-react";
import ServicesShowcase from "./components/ServicesShowcase";
import { AdSenseUnit } from "@/components/AdSense";
import Newsletter from "./components/Newsletter";
import VideoWallpaper from "./components/VideoWallpaper";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative font-sans selection:bg-gold selection:text-black">
      {/* Sticky Upgrade Button - Revenue */}
      <div className="fixed top-24 right-4 z-50">
        <Link
          href="/store?upgrade=true"
          className="bg-gold text-black font-bold px-4 py-2 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Lock size={16} /> Upgrade
        </Link>
      </div>

      {/* Hero Section - Video + Conversion */}
      <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
        <VideoWallpaper
          videoSrc="/videos/hero-money-abstract.mp4"
          opacity={0.6}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight animate-fade-in-up">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
              BUILD WEALTH WHILE
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-300 to-gold animate-shimmer">
              YOU SLEEP
            </span>
          </h1>

          <p className="text-xl md:text-3xl text-gray-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            AI-Powered Tools, Content, and Automations That Turn Traffic Into
            Revenue.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              href="/store"
              className="bg-white text-black text-xl font-bold px-10 py-5 rounded-lg hover:bg-gold transition-colors duration-300 transform hover:-translate-y-1 shadow-xl flex items-center gap-3"
            >
              Start Free <ArrowRight className="w-6 h-6" />
            </Link>

            <Link
              href="/revenue/best-ai-tools-for-creators"
              className="border border-white/30 text-white text-xl font-medium px-10 py-5 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              See How It Works
            </Link>
          </div>

          <div className="mt-8 flex justify-center">
            <AdSenseUnit
              slot="5800977493749262"
              style={{
                display: "block",
                minHeight: "100px",
                width: "100%",
                maxWidth: "728px",
              }}
            />
          </div>
        </div>
      </section>

      {/* Tool Stack - Affiliate Revenue */}
      <section className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-4xl font-bold mb-16 gradient-text">
            Power Your Empire
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Cards would map to AFFILIATES (example static for now) */}
            {["AI Tools", "Hosting", "Finance", "Gear"].map((item) => (
              <Link
                href={`/revenue/best-${item.toLowerCase().replace(" ", "-")}`}
                key={item}
                className="p-8 rounded-2xl glass-premium border border-white/5 hover:border-gold/30 transition-all group"
              >
                <div className="text-gold mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{item}</h3>
                <p className="text-gray-400 text-sm">Top rated for 2025</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Showcase - Revenue Generation */}
      <ServicesShowcase />

      {/* Mid-Page AdSense */}
      <div className="py-12 bg-gray-900/50">
        <div className="max-w-4xl mx-auto flex justify-center px-4">
          <AdSenseUnit
            slot="5800977493749262"
            style={{ display: "block", minHeight: "100px", width: "100%" }}
          />
        </div>
      </div>

      {/* Featured Section */}
      <section className="py-24 px-4 relative z-10 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold leading-tight">
                Unlock the <span className="text-gold">Pro Tier</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Get access to exclusive API endpoints, advanced automation
                workflows, and priority compute power.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <Sparkles className="text-gold" size={16} /> Unlimited AI
                  Generation
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="text-gold" size={16} /> Priority API
                  Access
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="text-gold" size={16} /> 24/7 Support
                  Channel
                </li>
              </ul>
              <Link
                href="/store?plan=pro"
                className="inline-flex mt-6 bg-sapphire text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-600 transition-colors"
              >
                Go Pro - $49/mo
              </Link>
            </div>
            <div className="card glass-premium p-1 hover:rotate-1 transition-transform duration-500">
              <div className="bg-gray-900 rounded-xl p-8 h-full">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-gray-400">Current Plan</span>
                  <span className="text-green-400 font-mono">Active</span>
                </div>
                <div className="text-4xl font-mono mb-2">$1,240.50</div>
                <div className="text-gray-500 text-sm mb-8">
                  This Month's Revenue
                </div>
                <div className="h-32 bg-gray-800 rounded-lg flex items-end p-2 gap-1">
                  {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gold/50 hover:bg-gold transition-colors"
                      style={{ height: `${h}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Revenue/Lead Generation */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <Newsletter
            variant="hero"
            title="Join the Inner Circle"
            description="Get the exact strategies we use to scale revenue delivered to your inbox."
          />
        </div>
      </section>

      {/* Footer is handled by layout */}
    </div>
  );
}
