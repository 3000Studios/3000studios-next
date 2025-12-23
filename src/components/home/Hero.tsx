export const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 relative perspective-1000">
      <div className="text-center z-10 space-y-2">
        <div className="overflow-hidden">
          <h1 className="font-display text-[13vw] leading-[0.8] text-mercury mix-blend-overlay reveal-text tracking-tighter animate-in fade-in slide-in-from-bottom-10 duration-1000">
            ETHEREAL
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="font-display text-[13vw] leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-white via-mercury to-gray-800 reveal-text tracking-tighter delay-100 italic animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-backwards">
            SYSTEMS
          </h1>
        </div>
      </div>

      <div className="absolute bottom-20 left-0 w-full px-10 flex justify-between items-end font-sans text-xs tracking-widest text-platinum/50">
        <div className="border-l border-white/10 pl-4">
          PLATINUM EDITION
          <br />
          VER. 2.0.4
        </div>
        <div className="animate-bounce">SCROLL TO EXPLORE</div>
        <div className="border-r border-white/10 pr-4 text-right">
          DIGITAL ALCHEMY
          <br />
          EST. 2024
        </div>
      </div>
    </section>
  );
};
