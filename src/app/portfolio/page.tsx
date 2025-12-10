import Navbar from '../components/Navbar';

export default function Portfolio() {
  const projects = [
    { id: 1, title: 'Digital Art Collection', category: 'Art', description: 'Curated digital artwork and illustrations' },
    { id: 2, title: 'Web Applications', category: 'Development', description: 'Full-stack web development projects' },
    { id: 3, title: 'UI/UX Designs', category: 'Design', description: 'Modern interface and experience designs' },
    { id: 4, title: 'Mobile Apps', category: 'Development', description: 'iOS and Android applications' },
    { id: 5, title: '3D Renders', category: 'Art', description: '3D modeling and rendering projects' },
    { id: 6, title: 'Brand Identity', category: 'Design', description: 'Logo and branding solutions' },
  ];

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen pt-16">
        <div className="fixed inset-0 pointer-events-none z-40 border-4 border-[#D4AF37]" style={{ boxShadow: 'inset 0 0 30px rgba(212, 175, 55, 0.3)' }}></div>
        
        <main className="relative z-10 container mx-auto px-4 py-12">
          <section className="text-center py-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              <span className="text-[#D4AF37]">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Showcasing our creative work and innovative projects
            </p>
          </section>

          <section className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="relative bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border-2 border-[#D4AF37] hover:border-[#FFD700] transition-all duration-300 hover:scale-105 glossy-overlay group cursor-pointer"
                >
                  <div className="relative z-10">
                    <div className="h-56 bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-4 flex items-center justify-center overflow-hidden">
                      <div className="text-6xl text-[#D4AF37] opacity-30">
                        {project.category === 'Art' ? '🎨' : project.category === 'Development' ? '💻' : '✨'}
                      </div>
                    </div>
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-black bg-[#D4AF37] rounded-full mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400">{project.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>
              ))}
            </div>
          </section>

          <section className="py-12 text-center">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900/50 to-black/50 p-8 rounded-lg border-2 border-[#D4AF37] glossy-overlay">
              <h2 className="text-3xl font-bold text-white mb-4">Like What You See?</h2>
              <p className="text-lg text-gray-300 mb-6">
                Let&apos;s collaborate on your next project and bring your vision to life.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#FFD700] transition-all duration-300 hover:scale-110"
              >
                Start a Project
              </a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
