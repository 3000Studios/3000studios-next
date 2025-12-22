import { CartSidebar } from "@/components/CartSidebar";
import { CountdownTimer } from "@/components/CountdownTimer";
import { ProductCard } from "@/components/ProductCard";
import { SocialProof } from "@/components/SocialProof";
import { getProducts } from "@/lib/products-data";
import { Metadata } from "next";
import Link from "next/link";

'use client';

import { usePayPalCheckout, useProducts } from '@/hooks/useAPI';
import { Filter, Loader2, Search, ShoppingCart, SlidersHorizontal, Star } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import GoogleAdsPlaceholder from '../components/GoogleAdsPlaceholder';
import LoadingSkeleton from '../components/LoadingSkeleton';
import Newsletter from '../components/Newsletter';
import { getAllCategories, productCatalog } from '../lib/productData';

interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  reviewCount: number;
  image?: string;
  inStock: boolean;
  affiliateLink?: string;
  featured?: boolean;
  tags?: string[];
}

const categories = ['All', ...getAllCategories()];

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [cart, setCart] = useState<Array<Product & { quantity: number }>>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const { fetchProducts } = useProducts();
  const { createOrder, loading: checkoutLoading, error: checkoutError } = usePayPalCheckout();

  const loadProducts = useCallback(async () => {
    try {
      // Try to fetch from API first
      const data = await fetchProducts();
      if (data.products && data.products.length > 0) {
        setProducts(data.products);
      } else {
        // Fallback to local product catalog
        setProducts(productCatalog);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
      // Use local catalog as fallback
      setProducts(productCatalog);
    } finally {
      setIsLoadingProducts(false);
    }
  }, [fetchProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return 0; // Would use actual date if available
      case 'featured':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.productId);
      if (existing) {
        return prev.map(item =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    try {
      const orderData = await createOrder(
        cart.map(item => ({
          id: item.productId,
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
          affiliateLink: item.affiliateLink,
        }))
      );

      // Redirect to PayPal approval URL
      if (orderData.approvalUrl) {
        window.location.href = orderData.approvalUrl;
      }
    } catch {
      alert('Checkout failed. Please try again.');
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
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
            <div>
              <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                3000 Studios Store
              </h1>
              <p className="text-lg text-purple-300/80">
                Premium digital products & services
              </p>
            </div>
            <button
              className="relative p-3 glass-premium rounded-lg border border-gold hover:bg-gold/10 transition-all hover-lift"
              onClick={handleCheckout}
              aria-label="View shopping cart"
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

        {/* Google Ads Placeholder - Revenue Generation */}
        <GoogleAdsPlaceholder
          slot="store-top-banner"
          format="horizontal"
          className="mb-8"
        />

        {/* Products Grid */}
        {isLoadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            <LoadingSkeleton variant="product" count={8} />
          </div>

                  {/* Product Info */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <Star className="text-gold fill-gold" size={16} />
                        <span className="text-white text-sm ml-1">{product.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">•</span>
                      <span className="text-gray-400 text-sm">({product.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gold">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.inStock && (
                        <span className="text-green-400 text-sm font-medium">In Stock</span>
                      )}
                    </div>
                    {/* Tags */}
                    {product.tags && product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {product.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-sapphire/20 text-sapphire rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="w-full py-2 bg-gradient-to-r from-gold to-yellow-500 text-black font-semibold rounded-lg hover:from-platinum hover:to-white transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
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
              <p className="text-purple-300/80 font-semibold">
                Premium Products
              </p>
              <p className="text-purple-400/60 text-sm mt-1">
                Carefully curated for excellence
              </p>
            </div>
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-platinum transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {checkoutLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingCart size={20} />
                  Checkout with PayPal
                </>
              )}
            </button>
            {checkoutError && (
              <p className="mt-3 text-red-400 text-sm text-center">{checkoutError}</p>
            )}
          </div>
        )}

        {/* No Results */}
        {sortedProducts.length === 0 && !isLoadingProducts && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">🔍</div>
            <p className="text-gray-400 text-lg mb-4">No products found matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSortBy('featured');
              }}
              className="px-6 py-2 bg-gold text-black font-semibold rounded-lg hover:bg-platinum transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Mid-Content Ad */}
        {sortedProducts.length > 8 && (
          <GoogleAdsPlaceholder
            slot="store-mid-content"
            format="rectangle"
            className="my-12"
          />
        )}

        {/* Newsletter Signup */}
        <div className="my-12">
          <Newsletter
            title="Get Exclusive Product Updates"
            description="Be the first to know about new products, special discounts, and limited-time offers"
            showBenefits={false}
          />
        </div>

        {/* Info Section */}
        <div className="card-premium bg-gradient-to-r from-gold/10 to-sapphire/10 border-gold">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="hover-lift">
              <div className="text-4xl mb-2">🔒</div>
              <h3 className="text-lg font-bold text-white mb-2">Secure Checkout</h3>
              <p className="text-gray-400 text-sm">PayPal integration - fully encrypted & secure</p>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-black bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                ∞
              </div>
              <p className="text-purple-300/80 font-semibold">
                Lifetime Updates
              </p>
              <p className="text-purple-400/60 text-sm mt-1">
                Always stay ahead with new features
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
