"use client";
<<<<<<< HEAD

import { useEffect, useState } from "react";
import axios from "axios";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import Link from "next/link";
=======
// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import { useEffect, useState } from "react";
import axios from "axios";
>>>>>>> origin/copilot/update-main-with-all-branches

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
<<<<<<< HEAD
        "https://3000studios.com/wp-json/wp/v2/posts?per_page=10&_embed"
=======
        "https://3000studios.com/wp-json/wp/v2/posts?per_page=10&_embed",
>>>>>>> origin/copilot/update-main-with-all-branches
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
<<<<<<< HEAD
    <main className="relative min-h-screen">
      <Navigation />

      <PageHeader title="PROJECTS" subtitle="Selected Works & Case Studies" />

      <div className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-2 border-hologram border-t-transparent rounded-full animate-spin"></div>
            <p className="font-sans text-xs tracking-widest text-platinum/50">
              LOADING DATA...
            </p>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="hyper-glass p-6 rounded-sm group relative overflow-hidden hover:-translate-y-2 transition-transform duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-hologram/10 blur-[50px] rounded-full group-hover:bg-hologram/20 transition-all duration-700"></div>

                {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                  <div className="relative h-48 mb-6 overflow-hidden rounded-sm">
                    <img
                      src={post._embedded["wp:featuredmedia"][0].source_url}
                      alt={post.title.rendered}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                )}

                <div className="relative z-10">
                  <span className="font-sans text-[10px] tracking-widest text-hologram mb-2 block">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <h3
                    className="font-display text-2xl mb-4 text-white group-hover:text-hologram transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div
                    className="font-sans text-sm text-platinum/60 mb-6 line-clamp-3 font-light leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <Link
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-xs tracking-widest text-white hover:text-hologram transition-colors group/link"
                  >
                    VIEW PROJECT
                    <span className="transform group-hover/link:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
=======
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
>>>>>>> origin/copilot/update-main-with-all-branches
                </div>
              </div>
            ))}
          </div>
        ) : (
<<<<<<< HEAD
          <div className="text-center py-20 hyper-glass rounded-sm">
            <p className="font-sans text-platinum/50 tracking-widest">
              NO PROJECTS FOUND
=======
          <div className="text-center glass p-12 rounded-2xl">
            <p className="text-gray-400 text-lg">
              No projects available yet. Check back soon!
>>>>>>> origin/copilot/update-main-with-all-branches
            </p>
          </div>
        )}
      </div>
<<<<<<< HEAD

      <Footer />
    </main>
=======
    </div>
>>>>>>> origin/copilot/update-main-with-all-branches
  );
}
