/**
<<<<<<< HEAD
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
=======
 * Enhanced Homepage with Brand System
 * High-conversion hero, proof section, funnels, exit-intent
 */

"use client";

import { brand } from "@/design/brand";
import { motion } from "framer-motion";
import {
  ArrowRight,
  DollarSign,
  MessageSquare,
  ShoppingCart,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Suspense, lazy, useEffect, useState } from "react";

const ShadowAvatar = lazy(() => import("./components/InteractiveAvatar"));
const AnimatedStats = lazy(() => import("./components/AnimatedStats"));
const Newsletter = lazy(() => import("./components/Newsletter"));

export default function HomePage() {
  const [showExitIntent, setShowExitIntent] = useState(false);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowExitIntent(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  return (
    <div
      className="min-h-screen relative"
      style={{ background: brand.colors.bg.primary }}
    >
      {/* Shadow AI Avatar */}
      <Suspense fallback={null}>
        <ShadowAvatar />
      </Suspense>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl"
            style={{ background: brand.colors.gradient.glow }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 255, 136, 0.2) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1
              className="font-bold mb-6"
              style={{
                ...brand.typography.styles.h1,
                color: brand.colors.text.primary,
                textShadow: brand.colors.shadow.glow,
              }}
            >
              Command Your
              <br />
              <span
                style={{
                  background: brand.colors.gradient.primary,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Digital Empire
              </span>
            </h1>
          </motion.div>

          {/* Value Proposition */}
          <motion.p
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
            style={{ color: brand.colors.text.secondary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Elite AI-powered platform • Voice-controlled deployments • Real-time
            revenue optimization
            <br />
            <span style={{ color: brand.colors.action.secondary }}>
              The only studio that obeys your voice commands
            </span>
          </motion.p>

          {/* Primary CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              whileHover={brand.motion.microInteractions.buttonHover}
              whileTap={brand.motion.microInteractions.buttonTap}
            >
              <Link
                href="/store"
                className="px-8 py-4 font-bold rounded-lg flex items-center gap-2 text-lg"
                style={{
                  background: brand.colors.gradient.primary,
                  color: brand.colors.text.inverse,
                  boxShadow: brand.colors.shadow.glow,
                }}
              >
                <ShoppingCart size={24} />
                Explore Store
                <ArrowRight size={24} />
              </Link>
            </motion.div>

            <motion.div
              whileHover={brand.motion.microInteractions.buttonHover}
              whileTap={brand.motion.microInteractions.buttonTap}
            >
              <Link
                href="/matrix"
                className="px-8 py-4 font-bold rounded-lg flex items-center gap-2 text-lg"
                style={{
                  background: brand.colors.bg.glass,
                  color: brand.colors.action.secondary,
                  border: `2px solid ${brand.colors.action.secondary}`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <Zap size={24} />
                Command Center
              </Link>
            </motion.div>
          </motion.div>

          {/* Social Proof / Live Stats */}
          <Suspense fallback={<div className="h-32" />}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <AnimatedStats />
            </motion.div>
          </Suspense>
        </div>
      </section>

      {/* Value Propositions Section */}
      <section
        className="py-24 px-4"
        style={{ background: brand.colors.bg.secondary }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={brand.motion.variants.staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Trophy size={32} />,
                title: "Award-Winning Design",
                description:
                  "Elite UI/UX that converts visitors into customers",
                color: brand.colors.action.primary,
              },
              {
                icon: <MessageSquare size={32} />,
                title: "Voice-Controlled",
                description: "Update your site by speaking—no code required",
                color: brand.colors.action.secondary,
              },
              {
                icon: <DollarSign size={32} />,
                title: "Revenue-Optimized",
                description: "Every pixel designed to maximize conversions",
                color: brand.colors.revenue.positive,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={brand.motion.variants.slideUp}
                className="p-8 rounded-lg text-center"
                style={{
                  background: brand.colors.bg.glass,
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${brand.colors.border.subtle}`,
                }}
                whileHover={{
                  y: -8,
                  boxShadow: brand.colors.shadow.lg,
                  transition: { duration: 0.3 },
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: item.color,
                    boxShadow: `0 0 20px ${item.color}80`,
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ color: brand.colors.text.primary }}
                >
                  {item.title}
                </h3>
                <p style={{ color: brand.colors.text.secondary }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Funnels Section - Quick Access */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-12"
            style={{ color: brand.colors.text.primary }}
          >
            Choose Your Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                href: "/store",
                label: "Shop Products",
                icon: <ShoppingCart size={24} />,
              },
              {
                href: "/projects",
                label: "View Projects",
                icon: <Sparkles size={24} />,
              },
              { href: "/live", label: "Watch Live", icon: <Users size={24} /> },
              {
                href: "/matrix",
                label: "Voice Control",
                icon: <Zap size={24} />,
              },
            ].map((funnel, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={funnel.href}
                  className="block p-6 rounded-lg"
                  style={{
                    background: brand.colors.bg.elevated,
                    border: `1px solid ${brand.colors.border.default}`,
                  }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div style={{ color: brand.colors.action.primary }}>
                      {funnel.icon}
                    </div>
                    <span
                      className="font-semibold"
                      style={{ color: brand.colors.text.primary }}
                    >
                      {funnel.label}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
>>>>>>> origin/copilot/resolve-git-conflicts
          </div>
        </div>
      </section>

<<<<<<< HEAD
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
=======
      {/* Newsletter / Email Capture */}
      <section
        className="py-24 px-4"
        style={{ background: brand.colors.bg.secondary }}
      >
        <Suspense fallback={<div className="h-64" />}>
          <Newsletter />
        </Suspense>
      </section>

      {/* Exit Intent Modal */}
      {showExitIntent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: brand.colors.bg.overlay }}
          onClick={() => setShowExitIntent(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md p-8 rounded-lg"
            style={{
              background: brand.colors.bg.elevated,
              border: `2px solid ${brand.colors.action.primary}`,
              boxShadow: brand.colors.shadow.xl,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: brand.colors.text.primary }}
            >
              Wait! Before you go...
            </h3>
            <p className="mb-6" style={{ color: brand.colors.text.secondary }}>
              Get 20% off your first purchase + exclusive voice control access
            </p>
            <Link
              href="/store"
              className="block w-full text-center px-6 py-3 rounded-lg font-bold"
              style={{
                background: brand.colors.gradient.primary,
                color: brand.colors.text.inverse,
              }}
              onClick={() => setShowExitIntent(false)}
            >
              Claim Your Discount
            </Link>
          </motion.div>
        </motion.div>
      )}
>>>>>>> origin/copilot/resolve-git-conflicts
    </div>
  );
}
