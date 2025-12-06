/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./NavBar.module.css";

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
    { href: "/collaborators", label: "Team" },
    { href: "/login", label: "Login" },
    { href: "/command-center", label: "Command Center" },
    { href: "/shadow", label: "Shadow" },
    { href: "/shadow-login", label: "Shadow Login" },
  ];

  return (
    <nav className="w-full bg-corporate-gradient border-b-2 border-corporate-gold text-white px-6 py-4 flex items-center justify-between fixed top-0 left-0 z-50 shadow-2xl backdrop-blur-md font-corporate">
      <Link
        href="/"
        className="text-2xl md:text-3xl font-black navbar-3d"
      >
        3000 STUDIOS
      </Link>

      <div
        className="md:hidden text-3xl cursor-pointer text-corporate-gold hover:text-corporate-bronze transition-colors"
        onClick={() => setOpen(!open)}
      >
        {open ? "✕" : "☰"}
      </div>

      <ul className={styles["navbar-list"] + " hidden md:flex text-base lg:text-lg gap-2"}>
        {links.map((l, i) => (
          <li key={i} className="relative group">
            <Link
              href={l.href}
              className="px-4 py-2 block rounded-lg navbar-3d transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">{l.label}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-corporate-steel/30 to-corporate-steel/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          </li>
        ))}
      </ul>

      {open && (
        <ul
          className="md:hidden absolute top-20 right-6 bg-corporate-navy border-2 border-corporate-gold rounded-2xl p-6 space-y-3 text-lg shadow-2xl backdrop-blur-xl navbar-mobile-list w-64"
        >
          {links.map((l, i) => (
            <li key={i}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-corporate-steel hover:text-corporate-gold transition-all font-bold text-corporate-silver"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
