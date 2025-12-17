"use client";

import { authenticate } from "@/lib/actions";
import { AlertCircle, Lock, Mail } from "lucide-react";
import { useActionState, useState } from "react"; // React 19 hook

export default function LoginPage() {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sapphire rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Login Card */}
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-4">
              <Lock className="text-black" size={32} />
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              THE MATRIX
            </h1>
            <p className="text-gray-400">Admin Access Portal</p>
          </div>

          {/* Login Form */}
          <form action={dispatch} className="space-y-6">
            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm flex items-center gap-2">
                <AlertCircle size={18} />
                <p>{errorMessage}</p>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                  placeholder="••••••••••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <LoginButton />
          </form>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              🔒 Secure authentication • Admin credentials required
            </p>
          </div>

          <div className="mt-8 text-center">
            {/* We will add the actual component logic below in a clean way */}
            <EmergencyRequestButton />
          </div>
        </div>
      </div>
    </div>
  );
}

import { sendEmergencyMagicLink } from "@/lib/actions";

function EmergencyRequestButton() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmergency = async () => {
    if (!confirm("Send emergency login link to mr.jwswain@gmail.com?")) return;

    setLoading(true);
    setMessage("");
    try {
      const result = await sendEmergencyMagicLink("mr.jwswain@gmail.com");
      if (result.success) {
        setMessage("✅ Check your email (or console)");
      } else {
        setMessage("❌ Failed to send");
      }
    } catch (e) {
      setMessage("❌ Error");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleEmergency}
        disabled={loading}
        className="text-xs text-red-500 hover:text-red-400 underline decoration-dotted transition-colors disabled:opacity-50"
      >
        {loading ? "Sending..." : "Lost Access? Request Emergency Link"}
      </button>
      {message && <p className="text-xs text-gold animate-pulse">{message}</p>}
    </div>
  );
}

function LoginButton() {
  // We can use useFormStatus here if needed, but for now simple button
  return (
    <button
      type="submit"
      className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-platinum transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Enter THE MATRIX
    </button>
  );
}
