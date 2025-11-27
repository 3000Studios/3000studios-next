/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/experience", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/store", label: "Store" },
    { href: "/live", label: "Live Stream" },
    { href: "/shadow/avatar", label: "Avatar" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/login", label: "Login" },
    { href: "/command-center", label: "Command Center" },
    { href: "/shadow", label: "Shadow" }
  ];

  return (
    <nav className="w-full bg-corporate-gradient border-b-2 border-corporate-gold text-white px-6 py-4 flex items-center justify-between fixed top-0 left-0 z-50 shadow-2xl backdrop-blur-md font-corporate">

      <Link href="/" className="text-2xl md:text-3xl font-heading font-black text-corporate-gold hover:scale-110 transition-all duration-300" style={{
        textShadow: '0 0 20px rgba(212, 175, 55, 0.8), 0 0 40px rgba(212, 175, 55, 0.4)',
        filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))'
      }}>
        3000 STUDIOS
      </Link>

      <div
        className="md:hidden text-3xl cursor-pointer text-corporate-gold hover:text-corporate-bronze transition-colors"
        onClick={() => setOpen(!open)}
      >
        {open ? '✕' : '☰'}
      </div>

      <ul className="hidden md:flex gap-1 text-base lg:text-lg">
        {links.map((l, i) => (
          <li key={i} className="relative group">
            <Link
              href={l.href}
              className="px-4 py-2 block rounded-lg font-bold text-corporate-silver hover:text-corporate-gold transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">{l.label}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-corporate-steel/30 to-corporate-steel/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          </li>
        ))}
      </ul>

      {open && (
        <ul className="md:hidden absolute top-20 right-6 bg-corporate-navy border-2 border-corporate-gold rounded-2xl p-6 space-y-3 text-lg shadow-2xl backdrop-blur-xl"
          style={{
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.3), 0 20px 40px rgba(0, 0, 0, 0.9)'
          }}
        >
          {links.map((l, i) => (
            <li key={i}>
              <Link href={l.href} onClick={() => setOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-corporate-steel hover:text-corporate-gold transition-all font-bold text-corporate-silver">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
