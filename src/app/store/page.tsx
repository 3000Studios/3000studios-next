import { CartSidebar } from "@/components/CartSidebar";
import { CountdownTimer } from "@/components/CountdownTimer";
import { ProductCard } from "@/components/ProductCard";
import { SocialProof } from "@/components/SocialProof";
import { getProducts } from "@/lib/products-data";
import { Metadata } from "next";
import Link from "next/link";

<<<<<<< HEAD
export const metadata: Metadata = {
  title: "Store | 3000 Studios",
  description: "Browse our premium digital products and services",
};

export default function StorePage() {
  const products = getProducts();
=======
"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Filter,
  Star,
  Loader2,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";
import { useProducts, useStripeCheckout } from "@/hooks/useAPI";
import { productCatalog, getAllCategories } from "../lib/productData";
import LoadingSkeleton from "../components/LoadingSkeleton";
import GoogleAdsPlaceholder from "../components/GoogleAdsPlaceholder";
import Newsletter from "../components/Newsletter";

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

const categories = ["All", ...getAllCategories()];

type SortOption = "featured" | "price-low" | "price-high" | "rating" | "newest";

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [cart, setCart] = useState<Array<Product & { quantity: number }>>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const { fetchProducts } = useProducts();
  const {
    createCheckoutSession,
    loading: checkoutLoading,
    error: checkoutError,
  } = useStripeCheckout();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
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
      console.error("Failed to load products:", err);
      // Use local catalog as fallback
      setProducts(productCatalog);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return 0; // Would use actual date if available
      case "featured":
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.productId
      );
      if (existing) {
        return prev.map((item) =>
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
      alert("Your cart is empty");
      return;
    }

    // For MVP, we'll create a session for the first item or a generic cart amount.
    // Ideally, pass the whole cart to backend to create line items.
    // Our generic `api/checkout` currently takes a single `priceId`.
    // We will assume `productId` in our catalog maps to a Stripe Price ID for now,
    // or we update the API to handle ad-hoc prices (which Stripe supports but needs config).
    // Let's call the API with the first item's ID as a placeholder for "Cart Checkout"
    // In a real app, we'd send the full cart array to the backend.

    try {
      // Assuming productId is a valid Price ID for this demo, or we use a fallback test price.
      // We will loop and hit the API for the first item found for now.
      const priceId = cart[0].productId.startsWith("price_")
        ? cart[0].productId
        : "price_1Qbl..."; // Placeholder logic

      const session = await createCheckoutSession(priceId);

      if (session.url) {
        window.location.href = session.url;
      }
    } catch (err) {
      alert(
        "Checkout failed. Please ensure products have valid Stripe Price IDs."
      );
    }
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
>>>>>>> origin/pr/50

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
<<<<<<< HEAD
              <p className="text-lg text-purple-300/80">
                Premium digital products & services
              </p>
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
              <h2 className="text-4xl font-bold text-white mb-2">
                Featured Collection
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400"></div>
            </div>
            <Link
              href="#all-products"
              className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm flex items-center gap-2 transition-colors"
=======
              <p className="text-gray-400">
                Discover our curated collection of {products.length}+ digital
                products
              </p>
            </div>
            <button
              className="relative p-3 glass-premium rounded-lg border border-gold hover:bg-gold/10 transition-all hover-lift"
              onClick={handleCheckout}
              aria-label="View shopping cart"
>>>>>>> origin/pr/50
            >
              View All <span className="text-lg">→</span>
            </Link>
          </div>
<<<<<<< HEAD
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
=======

          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products, categories, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                aria-label="Search products"
              />
            </div>

            {/* Sort */}
            <div className="flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold transition-all cursor-pointer"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-4 py-3 glass border border-gray-700 rounded-lg text-gray-300 hover:border-gold transition-all flex items-center gap-2"
              >
                <SlidersHorizontal size={20} />
                Filters
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div
            className={`flex flex-wrap gap-2 overflow-x-auto pb-2 ${
              showFilters ? "block" : "hidden lg:flex"
            }`}
          >
            <span className="text-gray-400 flex items-center gap-2 px-2">
              <Filter size={18} />
              <span className="text-sm font-medium">Categories:</span>
            </span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all hover-lift ${
                  selectedCategory === category
                    ? "bg-gold text-black"
                    : "glass border border-gray-700 text-gray-300 hover:border-gold"
                }`}
              >
                {category}
                {category !== "All" && (
                  <span className="ml-2 text-xs opacity-70">
                    ({products.filter((p) => p.category === category).length})
                  </span>
                )}
              </button>
>>>>>>> origin/pr/50
            ))}
          </div>
        </div>

<<<<<<< HEAD
        {/* All Products Section */}
        <div id="all-products">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-white mb-2">
              Complete Catalog
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-400"></div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-purple-300/60 text-lg mb-4">
                No products available yet
              </p>
              <Link
                href="/"
                className="text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                Return to Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
=======
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
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {sortedProducts.map((product) => (
                <div
                  key={product.productId}
                  className="card group hover:border-gold transition-all"
                >
                  {/* Product Image Placeholder */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-gold/20 to-sapphire/20 rounded-lg mb-4 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    {product.featured && (
                      <div className="absolute top-2 right-2 bg-gold text-black px-2 py-1 rounded text-xs font-bold">
                        FEATURED
                      </div>
                    )}
                    <div className="text-6xl opacity-30">
                      {product.category === "Templates" && "📄"}
                      {product.category === "Design" && "🎨"}
                      {product.category === "Themes" && "🌈"}
                      {product.category === "Digital" && "💎"}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <Star className="text-gold fill-gold" size={16} />
                        <span className="text-white text-sm ml-1">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">•</span>
                      <span className="text-gray-400 text-sm">
                        ({product.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gold">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.inStock && (
                        <span className="text-green-400 text-sm font-medium">
                          In Stock
                        </span>
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
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
>>>>>>> origin/pr/50
              ))}
            </div>
          )}
        </div>

<<<<<<< HEAD
        {/* Stats Section */}
        <div className="mt-20 pt-16 border-t border-purple-500/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
                {products.length}+
=======
            {/* Show result count */}
            <div className="text-center text-gray-400 mb-4">
              Showing {sortedProducts.length} of {products.length} products
            </div>
          </>
        )}

        {/* Cart Summary (if items in cart) */}
        {cart.length > 0 && (
          <div className="card bg-gradient-to-r from-gold/10 to-sapphire/10 border-gold mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Cart Summary</h3>
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-300">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="text-gold font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4 mb-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span className="text-white">Total:</span>
                <span className="text-gold">${cartTotal.toFixed(2)}</span>
>>>>>>> origin/pr/50
              </div>
              <p className="text-purple-300/80 font-semibold">
                Premium Products
              </p>
              <p className="text-purple-400/60 text-sm mt-1">
                Carefully curated for excellence
              </p>
            </div>
<<<<<<< HEAD
            <div className="text-center group">
              <div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                100%
              </div>
              <p className="text-purple-300/80 font-semibold">
                Digital Delivery
              </p>
              <p className="text-purple-400/60 text-sm mt-1">
                Instant access to all products
              </p>
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
=======
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
                  Checkout with Stripe
                </>
              )}
            </button>
            {checkoutError && (
              <p className="mt-3 text-red-400 text-sm text-center">
                {checkoutError}
              </p>
            )}
          </div>
        )}

        {/* No Results */}
        {sortedProducts.length === 0 && !isLoadingProducts && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">🔍</div>
            <p className="text-gray-400 text-lg mb-4">
              No products found matching your criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSortBy("featured");
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
              <h3 className="text-lg font-bold text-white mb-2">
                Secure Checkout
              </h3>
              <p className="text-gray-400 text-sm">
                PayPal integration - fully encrypted & secure
              </p>
            </div>
            <div className="hover-lift">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="text-lg font-bold text-white mb-2">
                Instant Delivery
              </h3>
              <p className="text-gray-400 text-sm">
                Download immediately after purchase
              </p>
            </div>
            <div className="hover-lift">
              <div className="text-4xl mb-2">💎</div>
              <h3 className="text-lg font-bold text-white mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-400 text-sm">
                Curated collection of top-tier products
>>>>>>> origin/pr/50
              </p>
            </div>
          </div>
        </div>
<<<<<<< HEAD
=======

        {/* Note */}
        <div className="mt-8 text-center text-sm text-gray-600 space-y-1">
          <p>✅ Connected to MongoDB for real products</p>
          <p>✅ Stripe checkout fully integrated</p>
          <p>✅ Affiliate link tracking enabled</p>
          <p>✅ {products.length}+ premium products available</p>
        </div>
>>>>>>> origin/pr/50
      </div>
    </div>
  );
}
