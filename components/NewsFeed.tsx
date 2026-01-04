'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  category: string;
  image: string;
  timestamp: string;
}

const NEWS_IMAGES = [
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&q=80',
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&q=80',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&q=80',
];

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  category: string;
  image: string;
  timestamp: string;
}

const NEWS_IMAGES = [
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&q=80',
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&q=80',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&q=80',
];

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setNews(data);
        } else {
          throw new Error('No data');
        }
      } catch (error: unknown) {
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/item"
          >
            <div className="w-16 h-16 bg-gray-700 rounded-md shrink-0 overflow-hidden relative">
              <Image
                src={item.image}
                alt="News"
                fill
                className="object-cover group-hover/item:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#D4AF37] font-bold tracking-wider border border-[#D4AF37]/30 px-1.5 py-0.5 rounded-sm">
                  {item.category}
                </span>
                <span className="text-[10px] text-gray-500">{item.timestamp}</span>
              </div>
              <div className="text-sm text-gray-200 line-clamp-2 font-medium leading-snug group-hover/item:text-[#D4AF37] transition-colors">
                {item.title}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
