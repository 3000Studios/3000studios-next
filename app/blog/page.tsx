// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";
import React, { useEffect, useState } from "react";

interface BlogPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  date: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://3000studios.com/wp-json/wp/v2/posts?per_page=6&_embed")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 md:p-10 text-white w-full max-w-5xl mx-auto min-h-screen flex flex-col items-center">
      <h1 className="text-3d text-4xl md:text-5xl font-black mb-8 platinum shadow-lg animate-fade-in-up">3000 Studios Blog</h1>
      {loading ? (
        <div className="text-center text-gray-400">
          <div className="inline-block w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4">Loading blog posts...</p>
        </div>
      ) : posts.length > 0 ? (
        <div className="w-full flex flex-col gap-8">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-2xl luxury-border luxury-hover bg-marble-black/80 backdrop-blur-md transition-all duration-300 shadow-xl hover:scale-105"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-corporate-gold mb-2 text-3d shadow-lg" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <div className="text-sm text-corporate-silver mb-2">{new Date(post.date).toLocaleDateString()}</div>
              <div className="text-lg text-corporate-silver opacity-90" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No blog posts available. Check back soon!</p>
      )}
    </div>
  );
}
