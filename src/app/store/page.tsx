/**
 * Store Page
 * E-commerce store front with product listings
 * Features: Product grid, filtering, search, shopping cart integration
 * Future: Will connect to Stripe/PayPal for payments
 * 
 * CUSTOMIZATION SECTIONS:
 * - Product categories: Update categories array
 * - Product data: Replace mock data with real API
 * - Payment integration: Add Stripe/PayPal checkout
 */

'use client';

import { useState } from 'react';
import { Search, ShoppingCart, Filter, Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  inStock: boolean;
}

// Mock product data - Replace with API call in production
const mockProducts: Product[] = [
  { id: 1, name: 'Premium Digital Asset Pack', price: 99.99, category: 'Digital', rating: 4.8, image: '', inStock: true },
  { id: 2, name: 'Creative Template Bundle', price: 49.99, category: 'Templates', rating: 4.9, image: '', inStock: true },
  { id: 3, name: 'Professional Theme', price: 79.99, category: 'Themes', rating: 4.7, image: '', inStock: true },
  { id: 4, name: 'UI Component Library', price: 129.99, category: 'Digital', rating: 4.9, image: '', inStock: true },
  { id: 5, name: 'Design System Pro', price: 199.99, category: 'Design', rating: 5.0, image: '', inStock: true },
  { id: 6, name: 'Animation Pack', price: 59.99, category: 'Digital', rating: 4.6, image: '', inStock: true },
  { id: 7, name: 'Icon Set Collection', price: 39.99, category: 'Design', rating: 4.8, image: '', inStock: true },
  { id: 8, name: 'Marketing Templates', price: 89.99, category: 'Templates', rating: 4.7, image: '', inStock: true },
];

const categories = ['All', 'Digital', 'Templates', 'Themes', 'Design'];

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                Premium Store
              </h1>
              <p className="text-gray-400">
                Discover our curated collection of digital products
              </p>
            </div>
            <button className="relative p-3 glass rounded-lg border border-gold hover:bg-gold/10 transition-all">
              <ShoppingCart className="text-gold" size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-gold text-black'
                      : 'glass border border-gray-700 text-gray-300 hover:border-gold'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card group">
              {/* Product Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-gold/20 to-sapphire/20 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-6xl opacity-30">📦</div>
              </div>

              {/* Product Info */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    <Star className="text-gold fill-gold" size={16} />
                    <span className="text-white text-sm ml-1">{product.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">•</span>
                  <span className="text-gray-400 text-sm">{product.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gold">
                    ${product.price}
                  </span>
                  {product.inStock && (
                    <span className="text-green-400 text-sm">In Stock</span>
                  )}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-2 bg-gold text-black font-semibold rounded-lg hover:bg-platinum transition-all duration-300 hover:shadow-lg"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products found matching your criteria</p>
          </div>
        )}

        {/* Info Section */}
        <div className="card bg-gradient-to-r from-gold/10 to-sapphire/10 border-gold">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">🔒 Secure Checkout</h3>
              <p className="text-gray-400 text-sm">Stripe & PayPal integration coming soon</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">⚡ Instant Delivery</h3>
              <p className="text-gray-400 text-sm">Download immediately after purchase</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">💎 Premium Quality</h3>
              <p className="text-gray-400 text-sm">Curated collection of top-tier products</p>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>🚀 Full payment integration and 10,000+ product catalog coming in next update</p>
        </div>
      </div>
    </div>
  );
}
