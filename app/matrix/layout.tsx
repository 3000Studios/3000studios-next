"use client";

import { brand } from "@/design/brand";
import { motion } from "framer-motion";
import {
  Activity,
  BarChart2,
  Lock,
  LogOut,
  Terminal,
  Video,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function MatrixLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "Bossman") {
      setIsAuthenticated(true);
    } else {
      setError("Access Denied");
      setPasswordInput("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    router.push("/login"); // or just reset state
  };

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: brand.colors.bg.primary }}
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: brand.colors.text.primary }}
            >
              MATRIX ACCESS
            </h1>
            <p style={{ color: brand.colors.text.secondary }}>
              Restricted Area
            </p>
          </div>

          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  size={20}
                  style={{ color: brand.colors.text.tertiary }}
                />
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full pl-10 pr-4 py-3 rounded-lg outline-none transition-all"
                  style={{
                    background: brand.colors.bg.elevated,
                    border: `1px solid ${
                      error
                        ? brand.colors.state.error
                        : brand.colors.border.default
                    }`,
                    color: brand.colors.text.primary,
                  }}
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm"
                style={{ color: brand.colors.state.error }}
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold transition-all hover:scale-[1.02]"
              style={{
                background: brand.colors.action.primary,
                color: brand.colors.text.inverse,
                boxShadow: brand.colors.shadow.glow,
              }}
            >
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      name: "Command Center",
      path: "/matrix",
      icon: <Terminal size={20} />,
    },
    {
      name: "Stats Dashboard",
      path: "/matrix/stats",
      icon: <BarChart2 size={20} />,
    },
    {
      name: "Stream Studio",
      path: "/matrix/stream",
      icon: <Video size={20} />,
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: brand.colors.bg.primary }}
    >
      {/* Matrix Navigation Bar */}
      <div
        className="border-b"
        style={{
          background: brand.colors.bg.secondary,
          borderColor: brand.colors.border.subtle,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Activity
                size={24}
                style={{ color: brand.colors.action.primary }}
              />
              <span
                className="font-bold text-xl tracking-wider"
                style={{ color: brand.colors.text.primary }}
              >
                MATRIX
              </span>
            </div>

            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all relative"
                    style={{
                      color: isActive
                        ? brand.colors.text.primary
                        : brand.colors.text.secondary,
                      background: isActive
                        ? brand.colors.bg.elevated
                        : "transparent",
                    }}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg border-b-2"
                        style={{ borderColor: brand.colors.action.primary }}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p
                className="text-xs font-bold"
                style={{ color: brand.colors.action.primary }}
              >
                ADMIN ACCESS
              </p>
              <p
                className="text-xs"
                style={{ color: brand.colors.text.tertiary }}
              >
                admin@3000studios.com
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              style={{ color: brand.colors.text.secondary }}
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
