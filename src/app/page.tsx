/**
 * Homepage - Conversion Optimized
 * 10-second cold traffic → revenue conversion
 * REVENUE LOCK — DO NOT MODIFY
 * Every element designed for monetization
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
import { AdSenseUnit } from "@/components/AdSense";

const AnimatedStats = lazy(() => import("./components/AnimatedStats"));
const Newsletter = lazy(() => import("./components/Newsletter"));

export default function HomePage() {
  const [showExitIntent, setShowExitIntent] = useState(false);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem('exit-intent-shown')) {
        setShowExitIntent(true);
        localStorage.setItem('exit-intent-shown', 'true');
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

      {/* AdSense Unit - Below Hero */}
      {process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <AdSenseUnit slot="1234567890" style={{ display: 'block', minHeight: '90px' }} />
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

      {/* AdSense Unit - Mid Page */}
      {process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <AdSenseUnit slot="9876543210" style={{ display: 'block', minHeight: '250px' }} />
        </div>
      )}

      {/* Social Proof Stats */}
      <section className="py-16 px-4">
        <Suspense fallback={<div className="h-32" />}>
          <AnimatedStats />
        </Suspense>
      </section>

      {/* Newsletter / Email Capture */}
      <section
        className="py-24 px-4"
        style={{ background: brand.colors.bg.secondary }}
      >
        <Suspense fallback={<div className="h-64" />}>
          <Newsletter variant="hero" title="Get Free Revenue Playbook" description="Join 10,000+ creators earning passive income with AI automation" />
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
            className="max-w-md p-8 rounded-lg relative"
            style={{
              background: brand.colors.bg.elevated,
              border: `2px solid ${brand.colors.action.primary}`,
              boxShadow: brand.colors.shadow.xl,
            }}
            onClick={(e) => e.stopPropagation()}
          >
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
    </div>
  );
}
