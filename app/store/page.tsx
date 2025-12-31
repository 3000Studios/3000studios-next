export default function Store() {
  return (
    <section className="p-12 text-white min-h-screen">
      <h1 className="text-5xl font-bold mb-6 gradient-text">3000 Studios Store</h1>
      <p className="text-gray-400 mb-8">Premium digital products and services</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-premium hover-lift">
          <h3 className="text-2xl font-bold mb-4">Live Wallpapers</h3>
          <p className="text-gray-400 mb-4">Premium animated backgrounds</p>
          <button className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-bold rounded-lg hover:scale-105 transition-transform">
            Browse Collection
          </button>
        </div>
        
        <div className="card-premium hover-lift">
          <h3 className="text-2xl font-bold mb-4">Code Snippets</h3>
          <p className="text-gray-400 mb-4">Production-ready components</p>
          <button className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-bold rounded-lg hover:scale-105 transition-transform">
            View Library
          </button>
        </div>
        
        <div className="card-premium hover-lift">
          <h3 className="text-2xl font-bold mb-4">Services</h3>
          <p className="text-gray-400 mb-4">Custom development solutions</p>
          <button className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-bold rounded-lg hover:scale-105 transition-transform">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
