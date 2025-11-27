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
    { href: "/shadow/avatar", label: "Avatar" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/login", label: "Login" },
    { href: "/command-center", label: "Command Center" },
    { href: "/shadow", label: "Shadow" }
  ];

  return (
    <nav className="w-full bg-gradient-to-r from-black via-gray-900 to-black border-b-2 border-yellow-500 text-white px-6 py-4 flex items-center justify-between fixed top-0 left-0 z-50 shadow-2xl backdrop-blur-md">

      <Link href="/" className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 hover:scale-110 transition-all duration-300" style={{
        textShadow: '0 0 30px rgba(251, 191, 36, 1), 0 0 60px rgba(251, 191, 36, 0.6), 0 4px 12px rgba(0, 0, 0, 0.9)',
        filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.8))'
      }}>
        3000 STUDIOS
      </Link>

      <div
        className="md:hidden text-3xl cursor-pointer text-yellow-400 hover:text-yellow-300 transition-colors"
        onClick={() => setOpen(!open)}
      >
        {open ? '✕' : '☰'}
      </div>

      <ul className="hidden md:flex gap-1 text-base lg:text-lg">
        {links.map((l, i) => (
          <li key={i} className="relative group">
            <Link
              href={l.href}
              className="px-4 py-2 block rounded-lg font-bold text-gray-300 hover:text-yellow-400 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">{l.label}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          </li>
        ))}
      </ul>

      {open && (
        <ul className="md:hidden absolute top-20 right-6 bg-gradient-to-br from-black via-gray-900 to-black p-6 border-2 border-yellow-500 rounded-2xl space-y-3 text-lg shadow-2xl backdrop-blur-xl"
          style={{
            boxShadow: '0 0 60px rgba(251, 191, 36, 0.4), 0 20px 40px rgba(0, 0, 0, 0.9)'
          }}
        >
          {links.map((l, i) => (
            <li key={i}>
              <Link href={l.href} onClick={() => setOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-yellow-600/20 hover:text-yellow-400 transition-all font-bold">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
