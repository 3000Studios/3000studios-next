/**
<<<<<<< HEAD
<<<<<<< HEAD
 * Home Page (Main Landing Page)
 * Features: High-conversion video hero, monetized UI, affiliate stacks, premium CTAs
 * Award-winning UI with premium animations and interactive elements
=======
 * Homepage - Conversion Optimized
 * 10-second cold traffic → revenue conversion
 * REVENUE LOCK — DO NOT MODIFY
 * Every element designed for monetization
>>>>>>> origin/copilot/update-main-with-all-branches
 */

"use client";

import { brand } from "@/design/brand";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Play,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Suspense, lazy, useEffect, useState } from "react";
import VideoHero from "./components/VideoHero";
import ConsentBanner from "./components/ConsentBanner";
import AffiliateToolCards from "./components/AffiliateToolCards";
import StickyUpgradeButton from "./components/StickyUpgradeButton";

const AnimatedStats = lazy(() => import("./components/AnimatedStats"));
const Newsletter = lazy(() => import("./components/Newsletter"));
const InteractiveAvatar = lazy(() => import("./components/InteractiveAvatar"));

export default function HomePage() {
  const [showExitIntent, setShowExitIntent] = useState(false);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (typeof window !== 'undefined' && e.clientY <= 0) {
        const shown = localStorage.getItem('exit-intent-shown');
        if (!shown) {
          setShowExitIntent(true);
          localStorage.setItem('exit-intent-shown', 'true');
        }
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
      {/* Sticky Upgrade Button */}
      <StickyUpgradeButton />

      {/* Consent Banner for GDPR/AdSense Compliance */}
      <ConsentBanner />

      {/* Hero Section - Above the Fold */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Video Hero Background */}
        <VideoHero 
          mp4Src="/media/bg.mp4"
          opacity={0.2}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Main Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{
                color: brand.colors.text.primary,
                textShadow: brand.colors.shadow.glow,
              }}
            >
              <span
                style={{
                  background: brand.colors.gradient.primary,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                AI-Powered Tools, Content, and Automations
              </span>
              <br />
              That Make Money While You Sleep
            </h1>
          </motion.div>

          {/* Supporting Copy */}
          <motion.p
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
            style={{ color: brand.colors.text.secondary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From zero to revenue in 10 seconds • No code required • Scale automatically
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/store"
                className="px-10 py-5 font-bold rounded-lg flex items-center gap-3 text-lg shadow-2xl"
                style={{
                  background: brand.colors.gradient.primary,
                  color: brand.colors.text.inverse,
                  boxShadow: '0 0 40px rgba(0, 245, 212, 0.6)',
                }}
              >
                <Zap size={24} fill="currentColor" />
                Start Free
                <ArrowRight size={24} />
              </Link>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="#how-it-works"
                className="px-10 py-5 font-bold rounded-lg flex items-center gap-3 text-lg"
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: brand.colors.text.primary,
                  border: `2px solid ${brand.colors.action.secondary}`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <Play size={24} />
                See How It Works
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 text-sm"
            style={{ color: brand.colors.text.secondary }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle size={18} style={{ color: brand.colors.revenue.positive }} />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} style={{ color: brand.colors.revenue.positive }} />
              <span>Setup in 60 Seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} style={{ color: brand.colors.revenue.positive }} />
              <span>Cancel Anytime</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AdSense Auto Ads Placement Hint - Below Hero */}
      {/* Auto Ads will automatically place ads here once your AdSense account is approved */}
      {/* After approval, you can create manual ad units in AdSense dashboard and replace this section */}
      {process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div 
            className="min-h-[90px] flex items-center justify-center"
            style={{ 
              background: 'rgba(0, 245, 212, 0.05)',
              border: '1px dashed rgba(0, 245, 212, 0.2)',
              borderRadius: '8px'
            }}
          >
            <p className="text-gray-500 text-sm">AdSense Auto Ads will appear here once approved</p>
          </div>
        </div>
      )}

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4" style={{ background: brand.colors.bg.secondary }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: brand.colors.text.primary }}
            >
              Revenue in 3 Simple Steps
            </h2>
            <p style={{ color: brand.colors.text.secondary }}>
              Start earning while you focus on what matters
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Tools',
                description: 'Select from AI-powered tools, templates, and automations designed to generate revenue',
                icon: <Sparkles size={40} />,
              },
              {
                step: '02',
                title: 'Set & Forget',
                description: 'Configure once and let AI automation handle content, marketing, and sales 24/7',
                icon: <Zap size={40} />,
              },
              {
                step: '03',
                title: 'Watch It Grow',
                description: 'Monitor real-time analytics as your automated empire generates passive income',
                icon: <CheckCircle size={40} />,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-lg text-center relative"
                style={{
                  background: brand.colors.bg.elevated,
                  border: `1px solid ${brand.colors.border.default}`,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ 
                  y: -8,
                  borderColor: brand.colors.action.primary,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Step Number */}
                <div 
                  className="text-6xl font-bold mb-4 opacity-20"
                  style={{ color: brand.colors.action.primary }}
                >
                  {item.step}
                </div>

                {/* Icon */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{
                    background: brand.colors.gradient.primary,
                    boxShadow: brand.colors.shadow.glow,
                  }}
                >
                  <div style={{ color: brand.colors.text.inverse }}>
                    {item.icon}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ color: brand.colors.text.primary }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p style={{ color: brand.colors.text.secondary }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate Tool Stack */}
      <AffiliateToolCards />

<<<<<<< HEAD
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
=======
      {/* AdSense Auto Ads Placement Hint - Mid Page */}
      {/* Auto Ads will automatically place ads here once your AdSense account is approved */}
      {/* After approval, create ad units in AdSense dashboard with slot IDs and use AdSenseUnit component */}
      {process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div 
            className="min-h-[250px] flex items-center justify-center"
            style={{ 
              background: 'rgba(0, 245, 212, 0.05)',
              border: '1px dashed rgba(0, 245, 212, 0.2)',
              borderRadius: '8px'
            }}
          >
            <p className="text-gray-500 text-sm">AdSense Auto Ads will appear here once approved</p>
>>>>>>> origin/copilot/update-main-with-all-branches
          </div>
        </div>
      )}

      {/* Social Proof Stats */}
      <section className="py-16 px-4">
        <Suspense fallback={<div className="h-32" />}>
          <AnimatedStats />
        </Suspense>
      </section>

<<<<<<< HEAD
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

=======
      {/* Newsletter / Email Capture */}
      <section
        className="py-24 px-4"
        style={{ background: brand.colors.bg.secondary }}
      >
        <Suspense fallback={<div className="h-64" />}>
          <Newsletter variant="hero" title="Get Free Revenue Playbook" description="Join 10,000+ creators earning passive income with AI automation" />
        </Suspense>
      </section>

>>>>>>> origin/copilot/update-main-with-all-branches
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
<<<<<<< HEAD
            className="max-w-md p-8 rounded-lg"
=======
            className="max-w-md p-8 rounded-lg relative"
>>>>>>> origin/copilot/update-main-with-all-branches
            style={{
              background: brand.colors.bg.elevated,
              border: `2px solid ${brand.colors.action.primary}`,
              boxShadow: brand.colors.shadow.xl,
            }}
            onClick={(e) => e.stopPropagation()}
          >
<<<<<<< HEAD
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
=======
            <div 
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-6xl"
            >
              🎁
            </div>
            <h3
              className="text-3xl font-bold mb-4 text-center"
              style={{ color: brand.colors.text.primary }}
            >
              Wait! Special Offer
            </h3>
            <p className="mb-6 text-center text-lg" style={{ color: brand.colors.text.secondary }}>
              Get <span className="text-2xl font-bold" style={{ color: brand.colors.revenue.positive }}>50% OFF</span> your first month + exclusive AI automation templates
            </p>
            <div className="space-y-3">
              <Link
                href="/store"
                className="block w-full text-center px-6 py-4 rounded-lg font-bold text-lg"
                style={{
                  background: brand.colors.gradient.primary,
                  color: brand.colors.text.inverse,
                  boxShadow: brand.colors.shadow.glow,
                }}
                onClick={() => setShowExitIntent(false)}
              >
                Claim Offer Now
              </Link>
              <button
                onClick={() => setShowExitIntent(false)}
                className="w-full text-sm"
                style={{ color: brand.colors.text.secondary }}
              >
                No thanks, I'll pay full price
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Shadow AI Avatar - Always present on Home */}
      <Suspense fallback={null}>
        <InteractiveAvatar />
      </Suspense>
>>>>>>> origin/copilot/update-main-with-all-branches
    </div>
  );
}
