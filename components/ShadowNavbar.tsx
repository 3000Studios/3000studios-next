// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";

import Link from "next/link";

export default function ShadowNavbar() {
  return (
    <div className="w-full bg-purple-900/40 backdrop-blur-sm border-b border-purple-700/40 p-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">SHADOW COMMAND CENTER</h1>
        <span className="text-sm opacity-80">3000 STUDIOS • LIVE CONTROL</span>
      </div>
      <div className="flex gap-4 text-sm flex-wrap">
        <Link href="/" className="text-cyan-300 hover:text-cyan-100 transition-colors">Home</Link>
        <Link href="/shadow/avatar" className="text-blue-300 hover:text-blue-100 transition-colors">Avatar</Link>
        <Link href="/projects" className="text-green-300 hover:text-green-100 transition-colors">Projects</Link>
        <Link href="/dashboard" className="text-orange-300 hover:text-orange-100 transition-colors">Dashboard</Link>
        <Link href="/experience" className="text-yellow-300 hover:text-yellow-100 transition-colors">Experience</Link>
      </div>
    </div>
  );
}
