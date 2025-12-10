import Navbar from '../components/Navbar';

export default function Store() {
  const products = [
    { id: 1, name: 'Premium Code Pin Pack', price: '$29.99', category: 'Digital' },
    { id: 2, name: 'Marble Wallpaper Collection', price: '$19.99', category: 'Wallpapers' },
    { id: 3, name: 'Live Background Set', price: '$39.99', category: 'Wallpapers' },
    { id: 4, name: 'Custom Code Snippet', price: '$49.99', category: 'Digital' },
    { id: 5, name: 'Designer Theme Pack', price: '$59.99', category: 'Themes' },
    { id: 6, name: 'Exclusive Art Bundle', price: '$99.99', category: 'Bundle' },
  ];

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen pt-16">
        <div className="fixed inset-0 pointer-events-none z-40 border-4 border-[#D4AF37]" style={{ boxShadow: 'inset 0 0 30px rgba(212, 175, 55, 0.3)' }}></div>
        
        <main className="relative z-10 container mx-auto px-4 py-12">
          <section className="text-center py-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              <span className="text-[#D4AF37]">Store</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Premium digital products, wallpapers, and creative assets
            </p>
          </section>

          <section className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="relative bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border-2 border-[#D4AF37] hover:border-[#FFD700] transition-all duration-300 hover:scale-105 glossy-overlay group"
                >
                  <div className="relative z-10">
                    <div className="h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-4 flex items-center justify-center">
                      <div className="text-4xl text-[#D4AF37] opacity-50">
                        {product.category === 'Wallpapers' ? '🖼️' : product.category === 'Digital' ? '💻' : '🎨'}
                      </div>
                    </div>
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-black bg-[#D4AF37] rounded-full mb-2">
                      {product.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-3xl font-bold text-[#D4AF37] mb-4">{product.price}</p>
                    <button className="w-full px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#FFD700] transition-all duration-300 hover:scale-105">
                      Add to Cart
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>
              ))}
            </div>
          </section>

          <section className="py-12 text-center">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900/50 to-black/50 p-8 rounded-lg border-2 border-[#D4AF37] glossy-overlay">
              <h2 className="text-3xl font-bold text-white mb-4">Need Something Custom?</h2>
              <p className="text-lg text-gray-300 mb-6">
                Contact us for custom designs, commissioned work, or enterprise solutions.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#FFD700] transition-all duration-300 hover:scale-110"
              >
                Get in Touch
              </a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
