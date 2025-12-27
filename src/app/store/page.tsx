/**
 * Store Page
 * E-commerce store front with product listings.
 * Features: enhanced product grid, social proof, urgency banner, PayPal checkout.
 */

import { CartSidebar } from "@/components/CartSidebar";
import { CountdownTimer } from "@/components/CountdownTimer";
import { ProductCard } from "@/components/ProductCard";
import { SocialProof } from "@/components/SocialProof";
import { getProducts } from "@/lib/products-data";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Store | 3000 Studios",
  description: "Browse our premium digital products and services",
};

export default function StorePage() {
  const products = getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Urgency Banner */}
      <div className="relative border-b border-pink-500/50 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            <div className="flex items-center gap-3 text-sm font-bold text-white md:text-base">
              <span className="animate-pulse">🔥</span>
              <span>FLASH SALE ENDS IN</span>
            </div>
            <CountdownTimer />
            <div className="text-sm font-bold text-white md:text-base">
              <span>UP TO 70% OFF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Notification */}
      <SocialProof />

      {/* Header */}
      <div className="relative border-b border-purple-500/20 bg-gradient-to-b from-slate-900/80 to-slate-950/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-black text-transparent sm:text-6xl">
                3000 Studios Store
              </h1>
              <p className="text-lg text-purple-300/80">Premium digital products & services</p>
            </div>
            <CartSidebar />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Featured Section */}
        <div className="mb-20">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-4xl font-bold text-white">Featured Collection</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400" />
            </div>
            <Link
              href="#all-products"
              className="text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
            >
              View All <span className="text-lg">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* All Products Section */}
        <div id="all-products">
          <div className="mb-10">
            <h2 className="mb-2 text-4xl font-bold text-white">Complete Catalog</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-400" />
          </div>

          {products.length === 0 ? (
            <div className="py-20 text-center">
              <p className="mb-4 text-lg text-purple-300/60">No products available yet</p>
              <Link href="/" className="font-semibold text-cyan-400 hover:text-cyan-300">
                Return to Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="mt-20 border-t border-purple-500/20 pt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-5xl font-black text-transparent">
                {products.length}+
              </div>
              <p className="font-semibold text-purple-300/80">Premium Products</p>
              <p className="mt-1 text-sm text-purple-400/60">Carefully curated for excellence</p>
            </div>
            <div className="text-center">
              <div className="mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-5xl font-black text-transparent">
                100%
              </div>
              <p className="font-semibold text-purple-300/80">Digital Delivery</p>
              <p className="mt-1 text-sm text-purple-400/60">Instant access to all products</p>
            </div>
            <div className="text-center">
              <div className="mb-3 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-5xl font-black text-transparent">
                ∞
              </div>
              <p className="font-semibold text-purple-300/80">Lifetime Updates</p>
              <p className="mt-1 text-sm text-purple-400/60">Always stay ahead with new features</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
