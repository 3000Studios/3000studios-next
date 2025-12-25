/**
 * Store Page
 * E-commerce store front with product listings
 * Features: Enhanced product grid, filtering, sorting, search, PayPal checkout
 * Connected to MongoDB for real products and PayPal for payments
 */

export const metadata: Metadata = {
  title: 'Store | 3000 Studios',
  description: 'Browse our premium digital products and services',
};

export default function StorePage() {
  const products = getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                Premium Store
              </h1>
              <p className="text-lg text-purple-300/80">Premium digital products & services</p>
            </div>
            <CartSidebar />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Featured Collection</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400"></div>
            </div>
            <Link
              href="#all-products"
              className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm flex items-center gap-2 transition-colors"
            >
              <ShoppingCart className="text-gold" size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* All Products Section */}
        <div id="all-products">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-white mb-2">Complete Catalog</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-400"></div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-purple-300/60 text-lg mb-4">No products available yet</p>
              <Link href="/" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                Return to Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

        {/* Stats Section */}
        <div className="mt-20 pt-16 border-t border-purple-500/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
                {products.length}+
              </div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                100%
              </div>
              <p className="text-purple-300/80 font-semibold">Digital Delivery</p>
              <p className="text-purple-400/60 text-sm mt-1">Instant access to all products</p>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-black bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                ∞
              </div>
              <p className="text-purple-300/80 font-semibold">Lifetime Updates</p>
              <p className="text-purple-400/60 text-sm mt-1">Always stay ahead with new features</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
