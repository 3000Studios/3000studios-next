// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import React from "react";

export default async function ProjectsPage() {
  // TODO: Replace with real API call for projects
  const projects = [
    {
      name: "Shadow Command Center",
      description: "AI-driven dashboard for creative automation, analytics, and live control.",
      status: "Active",
    },
    {
      name: "Avatar Metaverse",
      description: "3D avatar system with real-time voice and emotion sync.",
      status: "Beta",
    },
    {
      name: "Platinum Storefront",
      description: "Luxury digital goods and NFT marketplace with gold/platinum branding.",
      status: "Launching Soon",
    },
  ];
  return (
    <div className="p-8 md:p-16 w-full max-w-5xl mx-auto min-h-screen flex flex-col items-center">
      <h1 className="text-3d text-4xl md:text-5xl font-black platinum shadow-lg animate-fade-in-up mb-8 text-center">
        Projects
      </h1>
      <div className="grid md:grid-cols-2 gap-8 w-full">
        {projects.map((proj, idx) => (
          <div key={idx} className="glass luxury-border p-8 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold text-corporate-gold mb-2">{proj.name}</h2>
            <p className="text-corporate-silver text-lg mb-2">{proj.description}</p>
            <span className="inline-block px-4 py-1 rounded-full bg-corporate-gold text-black font-bold text-sm shadow-md">
              {proj.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface WordPressPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link: string;
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
}

export default function ProjectsPage() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<WordPressPost[]>(
        "https://3000studios.com/wp-json/wp/v2/posts?per_page=10&_embed",
      )
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setPosts([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen px-4 py-12 md:py-20 w-full max-w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center mb-4 md:mb-6 glow-text">
          Projects
        </h1>

        <p className="text-lg md:text-xl text-center text-gray-300 mb-12 md:mb-16 max-w-3xl mx-auto px-4">
          Explore our latest work, innovations, and creative solutions
        </p>

        {loading ? (
          <div className="text-center text-gray-400">
            <div className="inline-block w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4">Loading projects...</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="glass p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 group"
              >
                {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                  <img
                    src={post._embedded["wp:featuredmedia"][0].source_url}
                    alt={post.title.rendered}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  {post.title.rendered}
                </h3>
                <div
                  className="text-gray-300 text-sm mb-4 line-clamp-4"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                  >
                    View →
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center glass p-12 rounded-2xl">
            <p className="text-gray-400 text-lg">
              No projects available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
