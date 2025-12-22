export const Services = () => {
  return (
    <section id="expertise" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-10">
                <h2 className="font-display text-6xl text-mercury">Core Expertise</h2>
                <p className="font-sans text-sm text-platinum max-w-sm mt-6 md:mt-0">We architect digital scarcity through high-end visual design and robust engineering.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="hyper-glass p-10 rounded-lg group relative overflow-hidden magnetic-trigger">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-hologram/20 blur-[60px] rounded-full group-hover:bg-hologram/30 transition-all duration-700"></div>
                    <div className="relative z-10 transform transition-transform duration-500 group-hover:translate-z-10">
                        <h3 className="font-display text-3xl mb-4">Art Direction</h3>
                        <p className="font-sans text-sm text-platinum/60 leading-relaxed">
                            Defining visual languages that separate brands from the noise. We build aesthetic systems that scale.
                        </p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="hyper-glass p-10 rounded-lg group relative overflow-hidden magnetic-trigger lg:translate-y-12">
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 blur-[60px] rounded-full group-hover:bg-hologram/30 transition-all duration-700"></div>
                    <div className="relative z-10 transform transition-transform duration-500 group-hover:translate-z-10">
                         <h3 className="font-display text-3xl mb-4">Web Design</h3>
                        <p className="font-sans text-sm text-platinum/60 leading-relaxed">
                            Award-winning interfaces merging storytelling with intuitive UX patterns. Designed for conversion.
                        </p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="hyper-glass p-10 rounded-lg group relative overflow-hidden magnetic-trigger lg:translate-y-24">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-hologram/10 blur-[60px] rounded-full group-hover:bg-hologram/30 transition-all duration-700"></div>
                    <div className="relative z-10 transform transition-transform duration-500 group-hover:translate-z-10">
                         <h3 className="font-display text-3xl mb-4">Development</h3>
                        <p className="font-sans text-sm text-platinum/60 leading-relaxed">
                            Cutting-edge frontend engineering using Next.js, WebGL, and creative coding techniques.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};
