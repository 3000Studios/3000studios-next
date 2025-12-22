<<<<<<< HEAD
"use client";
=======
/**
 * Navigation Component
 * Main site navigation bar with responsive design
 * Includes links to all public pages and admin login
 * Features: Mobile menu, active link highlighting, smooth transitions, premium marble background
 * Updated with framer-motion animations and ShadowOS mood-reactive colors (MODULE 17 PART 3)
 */
>>>>>>> origin/pr/50

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";

<<<<<<< HEAD
// --- Sound Generation Utility ---
const playElectricSound = () => {
  try {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const bufferSize = 2048;
    const whiteNoise = ctx.createScriptProcessor(bufferSize, 1, 1);

    whiteNoise.onaudioprocess = (e) => {
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    };

    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.05;

    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 1200;

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.2);

    setTimeout(() => {
      whiteNoise.disconnect();
      gainNode.disconnect();
      filter.disconnect();
      ctx.close();
    }, 240);
  } catch {
    // Audio context could be blocked; fail silently
  }
};

// --- Electric Link ---
type ElectricLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
};

const ElectricLink = ({
  href,
  label,
  isActive,
  onClick,
}: ElectricLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isZapping, setIsZapping] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const router = useRouter();

  const arcPaths = useMemo(
    () => [
      "M0,20 Q25,12 50,20 T100,20",
      "M0,20 Q25,28 50,20 T100,20",
      "M0,20 Q25,16 50,20 T100,20",
    ],
    [],
  );

  useEffect(() => {
    const timer = setInterval(
      () => {
        if (Math.random() > 0.65 && !isHovered) {
          setIsZapping(true);
          setTimeout(() => setIsZapping(false), 220);
        }
      },
      Math.random() * 3500 + 1800,
    );

    return () => clearInterval(timer);
  }, [isHovered]);

  const handleHover = () => {
    setIsHovered(true);
    playElectricSound();
  };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsExploding(true);
    playElectricSound();
    playElectricSound();

    setTimeout(() => {
      onClick?.();
      router.push(href);
    }, 420);
  };

  return (
    <div className="relative group">
      <Link
        href={href}
        onClick={handleClick}
        onMouseEnter={handleHover}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative block px-4 py-2 text-lg font-bold tracking-wider transition-all duration-300 ${
          isActive ? "text-[var(--electric-blue)]" : "text-gray-200"
        } ${isExploding ? "opacity-0 scale-150" : "opacity-100"}`}
        style={{
          textShadow:
            isHovered || isZapping || isActive
              ? "0 0 6px #fff, 0 0 12px #00f3ff, 0 0 28px #00f3ff"
              : "none",
        }}
      >
        {label}

        <AnimatePresence>
          {(isHovered || isZapping) && (
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
            >
              {arcPaths.map((d, idx) => (
                <motion.path
                  key={idx}
                  d={d}
                  stroke="#00f3ff"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.35,
                    repeat: Infinity,
                    delay: idx * 0.05,
                  }}
                />
              ))}
            </motion.svg>
          )}
        </AnimatePresence>
      </Link>

      {isExploding && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[var(--electric-blue)] rounded-full"
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [1, 0],
                x: (Math.random() - 0.5) * 120,
                y: (Math.random() - 0.5) * 120,
                opacity: [1, 0],
              }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
          ))}
          <motion.div
            className="absolute inset-0 bg-white rounded-full"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.45 }}
          />
        </div>
      )}
    </div>
  );
};
=======
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useShadowOS } from '@/lib/shadow/os/state';
>>>>>>> origin/pr/50

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { uiMood } = useShadowOS();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
<<<<<<< HEAD
    { href: "/", label: "HOME" },
    { href: "/store", label: "STORE" },
    { href: "/vendors-platform", label: "VENDORS" },
    { href: "/projects", label: "PROJECTS" },
    { href: "/portfolio", label: "PORTFOLIO" },
    { href: "/live", label: "LIVE" },
    { href: "/blog", label: "BLOG" },
    { href: "/contact", label: "CONTACT" },
=======
    { href: '/', label: 'Home', hoverColor: 'hover:text-gold' },
    { href: '/store', label: 'Store', hoverColor: 'hover:text-gold' },
    { href: '/projects', label: 'Projects', hoverColor: 'hover:text-teal' },
    { href: '/portfolio', label: 'Portfolio', hoverColor: 'hover:text-platinum' },
    { href: '/live', label: 'Live', hoverColor: 'hover:text-sapphire' },
    { href: '/blog', label: 'Blog', hoverColor: 'hover:text-purple-400' },
    { href: '/contact', label: 'Contact', hoverColor: 'hover:text-gold' },
    { href: '/matrix', label: 'Matrix', hoverColor: 'hover:text-cyan-400' },
    { href: '/login', label: 'Login', hoverColor: 'hover:text-gold' },
>>>>>>> origin/pr/50
  ];
  
  // Mood-reactive shadow colors based on ShadowOS state
  const moodColors = {
    neutral: 'shadow-gray-800',
    gold: 'shadow-yellow-500',
    blue: 'shadow-blue-500',
    'purple-alert': 'shadow-purple-500',
    teal: 'shadow-teal-400',
    'cyber-cyan': 'shadow-cyan-400',
  };

  const isActiveLink = (href: string) => pathname === href;

  return (
<<<<<<< HEAD
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-md py-2 border-b border-[var(--platinum)]/40"
          : "bg-black/50 backdrop-blur-sm py-4 border-b border-[var(--platinum)]/30"
      }`}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,243,255,0.12),_transparent_45%)]" />
=======
    <motion.nav 
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-premium border-b border-gold/30 shadow-2xl' 
          : 'glass border-b border-gray-800/50'
      } ${moodColors[uiMood]}`}
    >
      {/* Premium Marble Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-90 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent"></div>
      </div>
>>>>>>> origin/pr/50

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center space-x-3 group relative z-10"
          >
            <div className="relative w-12 h-12 transition-transform group-hover:scale-110 duration-300">
              <Image
                src="/brand-logo.png"
                alt="3000 Studios"
                width={48}
                height={48}
                className="drop-shadow-[0_0_18px_rgba(0,243,255,0.45)]"
              />
            </div>
            <div
              className="text-2xl font-black tracking-tighter text-white group-hover:text-[var(--electric-blue)] transition-colors duration-300"
              style={{ textShadow: "0 0 12px rgba(0,243,255,0.25)" }}
            >
              3000 STUDIOS
            </div>
          </Link>

<<<<<<< HEAD
          <div className="hidden md:flex items-center justify-center flex-1 ml-10">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <ElectricLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={isActiveLink(link.href)}
                />
              ))}
            </div>
          </div>

          <div className="hidden md:block ml-4">
            <Link
              href="/login"
              className="relative px-6 py-2 overflow-hidden font-bold text-white rounded-full group bg-gray-900 border border-[var(--platinum)]/40 hover:border-[var(--electric-blue)]"
            >
              <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[var(--electric-blue)] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease" />
              <span className="relative transition duration-300 group-hover:text-black ease">
                LOGIN
              </span>
            </Link>
=======
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className={`relative text-sm lg:text-base font-medium transition-all duration-200 ${
                    isActiveLink(link.href)
                      ? 'text-gold'
                      : `text-gray-300 ${link.hoverColor}`
                  }`}
                >
                  {link.label}
                  {isActiveLink(link.href) && (
                    <motion.span 
                      layoutId="activeLink"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
>>>>>>> origin/pr/50
          </div>

          <button
            onClick={() => setIsMenuOpen((p) => !p)}
            className="md:hidden relative p-2 text-gray-300 hover:text-[var(--electric-blue)] transition-colors z-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

<<<<<<< HEAD
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 min-h-screen bg-black/95 backdrop-blur-xl md:hidden pt-24 px-4"
          >
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <ElectricLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={isActiveLink(link.href)}
                  onClick={() => setIsMenuOpen(false)}
                />
              ))}
=======
      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden glass-premium border-t border-gold/20 backdrop-blur-xl"
        >
          <div className="px-4 pt-3 pb-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
>>>>>>> origin/pr/50
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="mt-6 px-8 py-3 rounded-full bg-[var(--electric-blue)] text-black font-bold text-lg shadow-[0_0_22px_rgba(0,243,255,0.45)]"
              >
                LOGIN
              </Link>
<<<<<<< HEAD
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
=======
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
>>>>>>> origin/pr/50
  );
}
