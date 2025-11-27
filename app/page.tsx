// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import LiveWallpaper from "../components/LiveWallpaper";
import HomeHero from "../components/HomeHero";
import CryptoTicker from "../components/CryptoTicker";

const CompactAvatar = dynamic(() => import("../components/CompactAvatar"), { ssr: false });

interface WordPressPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
}

export default function Home() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<WordPressPost[]>(
        "https://3000studios.com/wp-json/wp/v2/posts?per_page=3&_embed"
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
    <main className="relative w-full max-w-full overflow-x-hidden">
      <LiveWallpaper />
      <HomeHero />
      <CompactAvatar />

      {/* Crypto Ticker */}
      <section className="max-w-6xl mx-auto mt-12 md:mt-20 px-4 w-full">
        <CryptoTicker />
      </section>

      {/* Featured Posts from WordPress */}
      <section className="max-w-6xl mx-auto mt-12 md:mt-20 px-4 w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-10 glow-text">
          Featured Projects
        </h2>
        
        {loading ? (
          <div className="text-center text-gray-400">
            <div className="inline-block w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
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
                <h3 className="text-2xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                  {post.title.rendered}
                </h3>
                <div
                  className="text-gray-300 text-sm mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
                >
                  Read More →
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">
            No posts available. Check back soon!
          </p>
        )}
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto mt-28 px-4 mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 glow-text">
          System Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass p-6 rounded-xl text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Ultra Fast</h3>
            <p className="text-gray-400 text-sm">Next.js 15 + Vercel edge network</p>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI Powered</h3>
            <p className="text-gray-400 text-sm">Voice commands & automation</p>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-xl font-bold mb-2">Animated UI</h3>
            <p className="text-gray-400 text-sm">Smooth GPU-accelerated graphics</p>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <div className="text-5xl mb-4">🔗</div>
            <h3 className="text-xl font-bold mb-2">Headless CMS</h3>
            <p className="text-gray-400 text-sm">WordPress API integration</p>
          </div>
        </div>
      </section>
    </main>
  );
}
