import Link from 'next/link';

export const CTA = () => {
  return (
    <section id="contact" className="relative py-40 flex items-center justify-center overflow-hidden">
        {/* Glowing Orb */}
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-hologram/20 to-blue-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        
        <div className="relative z-10 text-center">
            <p className="font-sans text-xs tracking-[0.3em] text-platinum mb-8">INITIATE SEQUENCE</p>
            <Link href="mailto:hello@3000.studios" className="magnetic-trigger group block">
                <h2 className="font-display text-6xl md:text-9xl text-white mix-blend-overlay hover:mix-blend-normal transition-all duration-500 group-hover:scale-105">
                    LET'S TALK
                </h2>
                <div className="h-px w-0 bg-hologram mx-auto mt-4 group-hover:w-full transition-all duration-700 ease-in-out"></div>
            </Link>
        </div>
    </section>
  );
};
