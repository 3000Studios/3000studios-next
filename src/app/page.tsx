import Navbar from './components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen pt-16">
        {/* Gold border perimeter */}
        <div className="fixed inset-0 pointer-events-none z-40 border-4 border-[#D4AF37]" style={{ boxShadow: 'inset 0 0 30px rgba(212, 175, 55, 0.3)' }}></div>
        
        <main className="relative z-10 container mx-auto px-4 py-12">
          {/* Hero Section */}
          <section className="text-center py-20">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              <span className="text-[#D4AF37]">3000</span> Studios
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Digital Art • Code • Creative Innovation
            </p>
          </section>

          {/* Code Pins Section */}
          <section className="py-16">
            <h2 className="text-4xl font-bold text-[#D4AF37] mb-8 text-center">Code Pins</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="relative bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border-2 border-[#D4AF37] hover:border-[#FFD700] transition-all duration-300 hover:scale-105 glossy-overlay group"
                >
                  <div className="relative z-10">
                    <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-4 flex items-center justify-center">
                      <div className="text-6xl text-[#D4AF37] opacity-50">
                        {'</>'}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Code Pin {item}</h3>
                    <p className="text-gray-400">Creative coding snippet showcase</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>
              ))}
            </div>
          </section>

          {/* Live Wallpapers Section */}
          <section className="py-16">
            <h2 className="text-4xl font-bold text-[#D4AF37] mb-8 text-center">Live Wallpapers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="relative bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border-2 border-[#D4AF37] hover:border-[#FFD700] transition-all duration-300 hover:scale-105 glossy-overlay group cursor-pointer"
                >
                  <div className="relative z-10">
                    <div className="h-64 bg-gradient-to-br from-white/10 via-gray-800 to-black/50 rounded mb-4 flex items-center justify-center overflow-hidden">
                      <div className="text-4xl text-white/30">
                        Marble Wallpaper {item}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Wallpaper {item}</h3>
                    <p className="text-gray-400">Black & white marble design</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Section */}
          <section className="py-16 text-center">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900/50 to-black/50 p-12 rounded-lg border-2 border-[#D4AF37] glossy-overlay">
              <h2 className="text-4xl font-bold text-white mb-4">Welcome to 3000 Studios</h2>
              <p className="text-xl text-gray-300 mb-8">
                Where creativity meets technology. Explore our collection of digital art, code snippets, and innovative designs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/store"
                  className="px-8 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#FFD700] transition-all duration-300 hover:scale-110"
                >
                  Visit Store
                </a>
                <a
                  href="/portfolio"
                  className="px-8 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-110"
                >
                  View Portfolio
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
