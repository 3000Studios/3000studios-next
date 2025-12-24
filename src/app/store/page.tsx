<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
/**
 * Store Page
 * E-commerce store front with product listings
 * Features: Enhanced product grid, filtering, sorting, search, PayPal checkout
 * Connected to MongoDB for real products and PayPal for payments
 */
<<<<<<< HEAD
=======
=======
>>>>>>> origin/copilot/update-main-with-all-branches
import { CartSidebar } from '@/components/CartSidebar';
import { CountdownTimer } from '@/components/CountdownTimer';
import { ProductCard } from '@/components/ProductCard';
import { SocialProof } from '@/components/SocialProof';
import { getProducts } from '@/lib/products-data';
import { Metadata } from 'next';
import Link from 'next/link';
<<<<<<< HEAD
>>>>>>> origin/copilot/resolve-git-conflicts
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
=======
>>>>>>> origin/copilot/update-main-with-all-branches

export const metadata: Metadata = {
  title: 'Store | 3000 Studios',
  description: 'Browse our premium digital products and services',
};

export default function StorePage() {
  const products = getProducts();

  return (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
<<<<<<< HEAD
=======
=======
>>>>>>> origin/copilot/update-main-with-all-branches
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Urgency Banner */}
      <div className="relative bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 border-b border-pink-500/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-3 text-white text-sm md:text-base font-bold">
              <span className="animate-pulse">🔥</span>
              <span>FLASH SALE ENDS IN</span>
            </div>
            <CountdownTimer />
            <div className="text-white text-sm md:text-base font-bold">
              <span>UP TO 70% OFF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Notification */}
      <SocialProof />

      {/* Header */}
      <div className="relative border-b border-purple-500/20 bg-gradient-to-b from-slate-900/80 to-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
<<<<<<< HEAD
>>>>>>> origin/copilot/resolve-git-conflicts
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
=======
>>>>>>> origin/copilot/update-main-with-all-branches
            <div>
              <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                3000 Studios Store
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
              View All <span className="text-lg">→</span>
            </Link>
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
          )}
        </div>

        {/* Stats Section */}
        <div className="mt-20 pt-16 border-t border-purple-500/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
                {products.length}+
              </div>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
              <p className="text-purple-300/80 font-semibold">Premium Products</p>
              <p className="text-purple-400/60 text-sm mt-1">Carefully curated for excellence</p>
>>>>>>> origin/copilot/resolve-git-conflicts
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
=======
              <p className="text-purple-300/80 font-semibold">Premium Products</p>
              <p className="text-purple-400/60 text-sm mt-1">Carefully curated for excellence</p>
>>>>>>> origin/copilot/update-main-with-all-branches
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
