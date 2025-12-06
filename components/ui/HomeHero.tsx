"use client";
import { motion } from "framer-motion";

export function HomeHero() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.3 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <h1 className="text-6xl font-bold tracking-tight hover-gold">
        Welcome to <span className="text-gold">3000 Studios</span>
      </h1>
      <p className="text-xl text-platinum/80">
        Elite design. Cinematic UI. A future-class digital brand.
      </p>
      <button className="px-8 py-4 bg-gold text-black font-bold text-xl rounded-xl hover:scale-105 shadow-xl hover:shadow-gold/40">
        Enter Command Center
      </button>
    </motion.div>
  );
}
