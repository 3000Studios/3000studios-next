'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Stock {
  symbol: string;
  price: number;
}

const FALLBACK_STOCKS: Stock[] = [
  { symbol: 'AAPL', price: 185.92 },
  { symbol: 'MSFT', price: 420.55 },
  { symbol: 'GOOGL', price: 173.69 },
  { symbol: 'AMZN', price: 178.22 },
  { symbol: 'TSLA', price: 175.79 },
  { symbol: 'NVDA', price: 875.28 },
  { symbol: 'BTC', price: 67500.0 },
];

export default function StockMarquee() {
  const [stocks, setStocks] = useState<Stock[]>(FALLBACK_STOCKS);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await fetch('/api/stock');
        if (!res.ok) throw new Error('Stock API failed');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // Flatten data if necessary or just map
          setStocks(data);
        }
      } catch (e) {
        console.warn('Using fallback stocks', e);
      }
    };

    fetchStocks();
    const interval = setInterval(fetchStocks, 300000); // 5 mins
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-white/10 h-10 flex items-center overflow-hidden">
      <motion.div
        className="flex gap-12 items-center whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          duration: 30, // Slow scroll
          ease: 'linear',
        }}
        style={{ width: 'max-content' }}
      >
        {/* Repeat list to create infinite loop effect */}
        {[...stocks, ...stocks, ...stocks].map((stock, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="font-bold text-[#D4AF37]">{stock.symbol}</span>
            <span className="text-white">${stock.price.toFixed(2)}</span>
            <span className="text-xs text-green-500">▲</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
