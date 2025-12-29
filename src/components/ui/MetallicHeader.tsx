'use client';

// @ts-nocheck
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MetallicHeaderProps {
  text: string;
  variant?: 'silver' | 'gold';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}

export function MetallicHeader({ 
  text, 
  variant = 'silver', 
  className,
  as: Component = 'h1' 
}: MetallicHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Component 
        className={cn(
          "font-bold tracking-tight",
          variant === 'gold' ? 'metallic-text-gold' : 'metallic-text',
          className
        )}
      >
        {text}
      </Component>
    </motion.div>
  );
}
