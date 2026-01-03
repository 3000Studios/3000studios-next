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
    // Simulate fetching live news
    const generateNews = () => {
      const topics = [
        'AI Integration Protocols Released for Enterprise Clients',
        'Global Tech Summit Announces New 3000 Studios Partnership',
        'Quantum Computing Breakthrough: What It Means for You',
        'Sustainable Tech: The Future of Digital Infrastructure',
        'Next-Gen Voice Systems Deployment Schedule Updated',
      ];

      const categories = ['BREAKING', 'TECHNOLOGY', 'PARTNERSHIP', 'INNOVATION', 'UPDATE'];
      const now = new Date();

      const items = topics.slice(0, 3).map((topic, i) => ({
        id: i,
        title: topic,
        category: categories[i],
        image: NEWS_IMAGES[i % NEWS_IMAGES.length],
        timestamp: new Date(now.getTime() - i * 3600000).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }));

      setNews(items);
    };

    generateNews();
    const interval = setInterval(generateNews, 60000); // Update "live" timestamps every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex-1 hover:border-blue-500/50 transition-colors overflow-hidden relative group h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-playfair text-white">Latest Updates</h3>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs text-red-500 font-bold tracking-wider">LIVE</span>
        </span>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {news.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
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
