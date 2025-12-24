"use client";

import { brand } from "@/design/brand";
import { getMatrixStats, StatItem } from "@/lib/services/stats";
import { motion } from "framer-motion";
import {
  BarChart2,
  Calendar,
  CreditCard,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const ICON_MAP = {
  DollarSign,
  Users,
  Calendar,
  BarChart2,
};

export default function StatsPage() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getMatrixStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: brand.colors.text.primary }}
        >
          Data Stream
        </h1>
        <p style={{ color: brand.colors.text.secondary }}>
          Real-time analytics and performance metrics.
        </p>
      </div>

      {/* Hero Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-xl animate-pulse bg-white/5 border border-white/10"
              />
            ))
          : stats.map((stat, idx) => {
              const Icon = ICON_MAP[stat.iconName];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-xl border relative overflow-hidden group"
                  style={{
                    background: brand.colors.bg.secondary,
                    borderColor: brand.colors.border.subtle,
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className="p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors"
                      style={{ color: stat.color }}
                    >
                      <Icon size={24} />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm font-medium ${
                        stat.trend === "up" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {stat.trend === "up" ? (
                        <TrendingUp size={16} />
                      ) : (
                        <TrendingDown size={16} />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <h3
                    className="text-sm font-medium mb-1"
                    style={{ color: brand.colors.text.secondary }}
                  >
                    {stat.title}
                  </h3>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: brand.colors.text.primary }}
                  >
                    {stat.value}
                  </p>

                  <motion.div
                    className="absolute -right-4 -bottom-4 opacity-10"
                    style={{ color: stat.color }}
                  >
                    <Icon size={24} />
                    {/* Large background icon decoration */}
                    <div className="scale-[3] transform">
                      <Icon size={24} />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart (Mock) */}
        <motion.div
          className="lg:col-span-2 p-6 rounded-xl border"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            background: brand.colors.bg.elevated,
            borderColor: brand.colors.border.subtle,
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-lg font-bold"
              style={{ color: brand.colors.text.primary }}
            >
              Revenue Overview
            </h2>
            <select
              className="px-3 py-1 rounded bg-black/20 border border-white/10 text-sm outline-none"
              style={{ color: brand.colors.text.secondary }}
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Year to Date</option>
            </select>
          </div>

          {/* Visual Mock of a Chart */}
          <div className="h-64 w-full flex items-end gap-2 px-2">
            {[30, 45, 32, 60, 55, 75, 40, 50, 80, 70, 90, 65, 85, 95].map(
              (h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-sm hover:opacity-80 transition-opacity relative group"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
                  style={{ background: brand.colors.action.primary }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-gray-700">
                    ${h * 100}
                  </div>
                </motion.div>
              ),
            )}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500 border-t border-gray-800 pt-2">
            <span>Nov 1</span>
            <span>Nov 15</span>
            <span>Dec 1</span>
            <span>Dec 15</span>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          className="p-6 rounded-xl border"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            background: brand.colors.bg.elevated,
            borderColor: brand.colors.border.subtle,
          }}
        >
          <h2
            className="text-lg font-bold mb-6"
            style={{ color: brand.colors.text.primary }}
          >
            Recent Sales
          </h2>

          <div className="space-y-4">
            {[
              {
                item: "Premium Sound Pack",
                user: "User #8821",
                amount: "$29.99",
                time: "2m ago",
              },
              {
                item: "AI Voice Model",
                user: "User #1293",
                amount: "$49.99",
                time: "15m ago",
              },
              {
                item: "Cyberpunk UI Kit",
                user: "User #4421",
                amount: "$19.99",
                time: "1h ago",
              },
              {
                item: "Ultimate Bundle",
                user: "User #9932",
                amount: "$199.00",
                time: "3h ago",
              },
            ].map((sale, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-green-500/10 text-green-400">
                    <CreditCard size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {sale.item}
                    </div>
                    <div className="text-xs text-gray-500">{sale.user}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">
                    {sale.amount}
                  </div>
                  <div className="text-xs text-gray-500">{sale.time}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="w-full mt-6 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
            style={{ color: brand.colors.action.primary }}
          >
            View All Transactions
          </button>
        </motion.div>
      </div>
    </div>
  );
}
