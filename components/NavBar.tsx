// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

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
    { href: "/command-center", label: "Command Center" }
  ];

  return (
    <nav className="w-full bg-black/95 border-b border-yellow-600 text-white px-6 py-4 flex items-center justify-between fixed top-0 left-0 z-50 shadow-2xl">

      <Link href="/" className="text-2xl font-extrabold text-yellow-400 hover:text-yellow-300 transition-all hover:scale-110" style={{
        textShadow: '0 0 20px rgba(251, 191, 36, 0.8), 0 4px 8px rgba(0, 0, 0, 0.9)'
      }}>
        3000 STUDIOS
      </Link>

      <div
        className="md:hidden text-3xl cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        ☰
      </div>

      <ul className="hidden md:flex gap-6 text-lg">
        {links.map((l, i) => (
          <li key={i}>
            <Link
              href={l.href}
              className="hover:text-yellow-400 transition-all hover:scale-110 inline-block"
              style={{
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
              }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {open && (
        <ul className="md:hidden absolute top-20 right-6 bg-black/95 p-6 border border-yellow-600 rounded-xl space-y-4 text-lg shadow-2xl">
          {links.map((l, i) => (
            <li key={i}>
              <Link href={l.href} onClick={() => setOpen(false)} className="hover:text-yellow-400 transition-all">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
