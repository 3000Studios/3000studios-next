"use client";
import Link from "next/link";
import { useState } from "react";

const nav = [
  { label: "Home", href: "/" },
  { label: "Store", href: "/store" },
  { label: "Apps", href: "/apps" },
  { label: "Live", href: "/live" },
  { label: "Vault", href: "/profile" }
];

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur bg-black/70 border-b border-white/10">
      <nav className="flex justify-center gap-10 py-4">
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            onMouseEnter={() => setActive(n.href)}
            onMouseLeave={() => setActive(null)}
            className="relative uppercase font-bold tracking-widest text-slate-200 hover:text-yellow-400 transition"
          >
            {n.label}
            {active === n.href && (
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full animate-glow" />
            )}
          </Link>
        ))}
      </nav>
    </header>
  );
}
