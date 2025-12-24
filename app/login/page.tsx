"use client";

<<<<<<< HEAD
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-grow flex items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-md hyper-glass p-10 rounded-sm">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl mb-2">Welcome Back</h1>
            <p className="font-sans text-xs tracking-widest text-platinum/50">
              ENTER YOUR CREDENTIALS
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="font-sans text-[10px] tracking-widest text-platinum/70 uppercase">
                Email Address
              </label>
              <input
                type="email"
                className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-hologram/50 transition-colors rounded-sm"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="font-sans text-[10px] tracking-widest text-platinum/70 uppercase">
                Password
              </label>
              <input
                type="password"
                className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-hologram/50 transition-colors rounded-sm"
                placeholder="••••••••"
              />
            </div>

            <button className="w-full py-4 bg-white text-black font-sans text-xs tracking-[0.2em] uppercase hover:bg-hologram hover:text-white transition-colors duration-300">
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="#"
              className="font-sans text-[10px] tracking-widest text-platinum/40 hover:text-white transition-colors"
            >
              FORGOT PASSWORD?
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
=======
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      <p className="text-gray-400 mb-10">Shadow secure access portal</p>
    </div>
>>>>>>> origin/copilot/update-main-with-all-branches
  );
}
