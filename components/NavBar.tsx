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
    { href: "/dashboard", label: "Dashboard" }
  ];

  return (
    <nav className="w-full bg-black/90 border-b border-cyan-700 text-white px-6 py-4 flex items-center justify-between fixed top-0 left-0 z-50">

      <Link href="/" className="text-2xl font-extrabold text-cyan-400">
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
              className="hover:text-cyan-400 transition"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {open && (
        <ul className="md:hidden absolute top-20 right-6 bg-black p-6 border border-cyan-700 rounded-xl space-y-4 text-lg">
          {links.map((l, i) => (
            <li key={i}>
              <Link href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
