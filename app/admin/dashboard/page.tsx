"use client";

import { motion } from "framer-motion";
import Card from "../../ui/Card";

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-red-400 mb-8"
      >
        Command Center
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* System Status */}
        <Card className="bg-red-950/30 border-red-500/20">
          <h3 className="text-xl font-bold text-red-300 mb-4">System Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Server</span>
              <span className="text-green-400">● Online</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Database</span>
              <span className="text-green-400">● Connected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">API</span>
              <span className="text-green-400">● Running</span>
            </div>
          </div>
        </Card>

        {/* Revenue Overview */}
        <Card className="bg-red-950/30 border-red-500/20">
          <h3 className="text-xl font-bold text-red-300 mb-4">Revenue</h3>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-yellow-400">$0.00</div>
            <div className="text-sm text-gray-400">This Month</div>
          </div>
        </Card>

        {/* Content Stats */}
        <Card className="bg-red-950/30 border-red-500/20">
          <h3 className="text-xl font-bold text-red-300 mb-4">Content</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Projects</span>
              <span className="text-white font-bold">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Blog Posts</span>
              <span className="text-white font-bold">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Pages</span>
              <span className="text-white font-bold">12</span>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-red-950/30 border-red-500/20 md:col-span-2 lg:col-span-3">
          <h3 className="text-xl font-bold text-red-300 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors">
              New Project
            </button>
            <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-black rounded transition-colors">
              Publish Content
            </button>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors">
              View Analytics
            </button>
          </div>
        </Card>

        {/* Automation Hooks */}
        <Card className="bg-red-950/30 border-red-500/20 md:col-span-2 lg:col-span-3">
          <h3 className="text-xl font-bold text-red-300 mb-4">Automation Center</h3>
          <p className="text-gray-400">
            Future integration points for automated workflows, content management, and system operations.
          </p>
        </Card>
      </div>
    </div>
  );
}
