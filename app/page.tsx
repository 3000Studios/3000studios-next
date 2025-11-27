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

const FloatingAvatar = dynamic(() => import("../components/FloatingAvatar"), { ssr: false });

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
      <FloatingAvatar />

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
          <div className="glass p-6 rounded-xl text-center hover:border-yellow-500/50 transition-all group">
            <svg className="w-16 h-16 mx-auto mb-4 text-yellow-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <h3 className="text-xl font-bold mb-2 text-yellow-400">Ultra Fast</h3>
            <p className="text-gray-400 text-sm">Next.js 15 + Vercel edge network</p>
          </div>
          <div className="glass p-6 rounded-xl text-center hover:border-yellow-500/50 transition-all group">
            <svg className="w-16 h-16 mx-auto mb-4 text-yellow-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clipRule="evenodd"/>
            </svg>
            <h3 className="text-xl font-bold mb-2 text-yellow-400">AI Powered</h3>
            <p className="text-gray-400 text-sm">Voice commands & automation</p>
          </div>
          <div className="glass p-6 rounded-xl text-center hover:border-yellow-500/50 transition-all group">
            <svg className="w-16 h-16 mx-auto mb-4 text-yellow-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd"/>
            </svg>
            <h3 className="text-xl font-bold mb-2 text-yellow-400">Animated UI</h3>
            <p className="text-gray-400 text-sm">Smooth GPU-accelerated graphics</p>
          </div>
          <div className="glass p-6 rounded-xl text-center hover:border-yellow-500/50 transition-all group">
            <svg className="w-16 h-16 mx-auto mb-4 text-yellow-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
            </svg>
            <h3 className="text-xl font-bold mb-2 text-yellow-400">Headless CMS</h3>
            <p className="text-gray-400 text-sm">WordPress API integration</p>
          </div>
        </div>
      </section>
    </main>
  );
}
