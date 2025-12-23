/**
 * Navigation Component
 * Main site navigation bar with responsive design
 * Includes links to all public pages and admin login
 * Features: Mobile menu, active link highlighting, smooth transitions, premium marble background
 * Updated with framer-motion animations and ShadowOS mood-reactive colors (MODULE 17 PART 3)
 */

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useShadowOS } from "@/lib/shadow/os/state";

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
    { href: "/", label: "Home", hoverColor: "hover:text-gold" },
    { href: "/store", label: "Store", hoverColor: "hover:text-gold" },
    { href: "/projects", label: "Projects", hoverColor: "hover:text-teal" },
    {
      href: "/portfolio",
      label: "Portfolio",
      hoverColor: "hover:text-platinum",
    },
    { href: "/live", label: "Live", hoverColor: "hover:text-sapphire" },
    { href: "/blog", label: "Blog", hoverColor: "hover:text-purple-400" },
    { href: "/contact", label: "Contact", hoverColor: "hover:text-gold" },
    { href: "/matrix", label: "Matrix", hoverColor: "hover:text-cyan-400" },
    { href: "/login", label: "Login", hoverColor: "hover:text-gold" },
  ];

  // Mood-reactive shadow colors based on ShadowOS state
  const moodColors = {
    neutral: "shadow-gray-800",
    gold: "shadow-yellow-500",
    blue: "shadow-blue-500",
    "purple-alert": "shadow-purple-500",
    teal: "shadow-teal-400",
    "cyber-cyan": "shadow-cyan-400",
  };

  const isActiveLink = (href: string) => pathname === href;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-premium border-b border-gold/30 shadow-2xl"
          : "glass border-b border-gray-800/50"
      } ${moodColors[uiMood]}`}
    >
      {/* Premium Marble Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-90 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent"></div>
      </div>

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
                      ? "text-gold"
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

      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden glass-premium border-t border-gold/20 backdrop-blur-xl"
        >
          <div className="px-4 pt-3 pb-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="mt-6 px-8 py-3 rounded-full bg-[var(--electric-blue)] text-black font-bold text-lg shadow-[0_0_22px_rgba(0,243,255,0.45)]"
              >
                LOGIN
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
