// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-40 backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-2xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        
        <Link href="/">
          <span className="text-3xl font-extrabold bg-gradient-to-br from-cyan-300 via-purple-500 to-green-300 bg-clip-text text-transparent hover:scale-110 transition-all duration-300 cursor-pointer inline-block">
            3000 STUDIOS
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white text-3xl hover:text-purple-400 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 font-bold text-lg">
          <Link 
            className="relative text-white hover:text-cyan-300 transition-all duration-300 group" 
            href="/"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-300 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            className="relative text-white hover:text-purple-300 transition-all duration-300 group" 
            href="/experience"
          >
            Experience
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-300 to-pink-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            className="relative text-white hover:text-green-300 transition-all duration-300 group" 
            href="/projects"
          >
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-300 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            className="relative text-white hover:text-yellow-300 transition-all duration-300 group" 
            href="/shadow"
          >
            Shadow
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 md:hidden">
            <div className="flex flex-col gap-4 p-6 font-bold text-lg">
              <Link 
                className="text-white hover:text-cyan-300 transition-all" 
                href="/"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link 
                className="text-white hover:text-purple-300 transition-all" 
                href="/experience"
                onClick={() => setOpen(false)}
              >
                Experience
              </Link>
              <Link 
                className="text-white hover:text-green-300 transition-all" 
                href="/projects"
                onClick={() => setOpen(false)}
              >
                Projects
              </Link>
              <Link 
                className="text-white hover:text-yellow-300 transition-all" 
                href="/shadow"
                onClick={() => setOpen(false)}
              >
                Shadow
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
