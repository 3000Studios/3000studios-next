// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import React from "react";

export default async function BlogPage() {
  // TODO: Replace with real API call to fetch blog posts
  const posts = [
    {
      title: "Welcome to the 3000 Studios Blog!",
      date: "2025-11-29",
      excerpt: "Explore the latest updates, creative breakthroughs, and AI-powered innovations from the 3000 Studios team.",
      url: "/blog/welcome",
    },
    {
      title: "How We Built a Platinum-Grade UI",
      date: "2025-11-28",
      excerpt: "A deep dive into the design, branding, and technology powering our luxury digital experience.",
      url: "/blog/platinum-ui",
    },
  ];

  return (
    <div className="p-6 md:p-10 text-white w-full max-w-5xl mx-auto min-h-screen flex flex-col items-center">
      <h1 className="text-3d text-4xl md:text-5xl font-black mb-8 platinum shadow-lg animate-fade-in-up">3000 Studios Blog</h1>
      <div className="w-full flex flex-col gap-8">
        {posts.map((post, idx) => (
          <a
            key={idx}
            href={post.url}
            className="block p-6 rounded-2xl luxury-border luxury-hover bg-marble-black/80 backdrop-blur-md transition-all duration-300 shadow-xl hover:scale-105"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-corporate-gold mb-2 text-3d shadow-lg">{post.title}</h2>
            <div className="text-sm text-corporate-silver mb-2">{post.date}</div>
            <p className="text-lg text-corporate-silver opacity-90">{post.excerpt}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
