'use client';

import { cloudinaryImage } from '@/lib/cloudinary';
import Link from 'next/link';

export const Navigation = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur text-white px-6 py-4 border-b border-gray-800">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <img
          src={cloudinaryImage('a2bb86b9dcc2e2c5dbec225a5d241605', {
            width: 50,
            height: 50,
            crop: 'fit',
            quality: 'auto',
            format: 'auto',
          })}
          alt="3000 Studios Logo"
          className="w-12 h-12 object-contain"
        />
        <span className="text-xl font-bold">3000 Studios</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="#gallery" className="hover:text-gray-300 transition-colors">
          Gallery
        </Link>
        <Link href="#features" className="hover:text-gray-300 transition-colors">
          Features
        </Link>
        <Link href="/contact" className="hover:text-gray-300 transition-colors">
          Contact
        </Link>
      </div>

      {/* CTA Button */}
      <button className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-100 transition-colors hidden md:block">
        Book Now
      </button>
    </div>
  </nav>
);

