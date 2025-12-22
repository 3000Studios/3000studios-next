export const Marquee = () => {
  return (
    <div className="relative z-20 py-12 border-y border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
            <span className="font-sans text-7xl font-bold text-transparent stroke-text mx-8 opacity-20" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>IMMERSIVE</span>
            <span className="font-display text-7xl text-white mx-8 italic">Web Experiences</span>
            <span className="font-sans text-7xl font-bold text-transparent stroke-text mx-8 opacity-20" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>CREATIVE</span>
            <span className="font-display text-7xl text-white mx-8 italic">Development</span>
             <span className="font-sans text-7xl font-bold text-transparent stroke-text mx-8 opacity-20" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>IMMERSIVE</span>
            <span className="font-display text-7xl text-white mx-8 italic">Web Experiences</span>
        </div>
    </div>
  );
};
