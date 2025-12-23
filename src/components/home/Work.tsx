import Link from "next/link";

export const Work = () => {
  return (
    <section id="work" className="relative z-10 py-32 px-6">
      <div className="max-w-7xl mx-auto space-y-40">
        {/* Case 1 */}
        <div className="group grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 perspective-1000">
            <div className="hyper-glass p-3 rounded-sm transform transition-all duration-700 group-hover:rotate-y-6 group-hover:scale-105 h-[400px] bg-gray-900/50">
              {/* Placeholder for image */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black opacity-50"></div>
            </div>
          </div>
          <div className="md:col-span-5 flex flex-col justify-center">
            <span className="font-sans text-hologram text-xs tracking-widest mb-4 block">
              FINTECH
            </span>
            <h3 className="font-display text-5xl mb-6 italic">Nova Finance</h3>
            <p className="font-sans text-platinum/70 font-light mb-8 leading-relaxed">
              A complete rebranding for a decentralized exchange. Focusing on
              dark mode data visualization and real-time socket connections.
            </p>
            <Link
              href="#"
              className="magnetic-trigger inline-flex items-center gap-3 text-xs tracking-widest uppercase hover:text-hologram transition-colors"
            >
              View Case Study
            </Link>
          </div>
        </div>

        {/* Case 2 */}
        <div className="group grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 order-2 md:order-1 flex flex-col justify-center text-right md:text-left">
            <span className="font-sans text-hologram text-xs tracking-widest mb-4 block">
              ARCHITECTURE
            </span>
            <h3 className="font-display text-5xl mb-6 italic">
              Apex Structures
            </h3>
            <p className="font-sans text-platinum/70 font-light mb-8 leading-relaxed">
              Immersive portfolio for a brutalist architecture firm. Featuring
              smooth scroll interactions and procedural gallery generation.
            </p>
            <Link
              href="#"
              className="magnetic-trigger inline-flex items-center gap-3 text-xs tracking-widest uppercase hover:text-hologram transition-colors"
            >
              View Case Study
            </Link>
          </div>
          <div className="md:col-span-7 order-1 md:order-2 perspective-1000">
            <div className="hyper-glass p-3 rounded-sm transform transition-all duration-700 group-hover:rotate-y-6 group-hover:scale-105 h-[400px] bg-gray-900/50">
              {/* Placeholder for image */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
