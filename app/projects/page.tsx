"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import Link from "next/link";

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
        "https://3000studios.com/wp-json/wp/v2/posts?per_page=10&_embed"
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
    <main className="relative min-h-screen">
      {/* Full-screen background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
      >
        <source
          src="https://res.cloudinary.com/dj92eb97f/video/upload/v1766986144/3D_tunnel_to_purple_d7cofd.mp4"
          type="video/mp4"
        />
      </video>
      <div className="fixed inset-0 bg-black/50 -z-5"></div>

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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 hyper-glass rounded-sm">
            <p className="font-sans text-platinum/50 tracking-widest">
              NO PROJECTS FOUND
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
