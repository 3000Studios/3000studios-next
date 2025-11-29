// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import React from "react";

async function fetchDashboardData() {
  // TODO: Replace with real API calls for analytics, traffic, revenue, logs, and system status
  return {
    analytics: {
      visitors: 12894,
      pageViews: 48213,
      bounceRate: 0.37,
      avgSession: "4m 12s",
    },
    revenue: {
      total: 12450.32,
      mrr: 1042.50,
      newCustomers: 23,
    },
    system: {
      status: "Online",
      uptime: "99.998%",
      lastDeploy: "2025-11-29 02:14 UTC",
    },
    logs: [
      { time: "02:14", event: "Deploy completed", status: "success" },
      { time: "01:58", event: "API sync", status: "success" },
      { time: "01:45", event: "User login", status: "success" },
    ],
  };
}

export default async function DashboardPage() {
  const data = await fetchDashboardData();
  return (
    <div className="p-6 md:p-10 w-full max-w-7xl mx-auto min-h-screen flex flex-col items-center">
      <h1 className="text-3d text-4xl md:text-5xl font-black platinum shadow-lg animate-fade-in-up mb-8 text-center">
        3000 Studios Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
        {/* Analytics */}
        <div className="glass luxury-border p-8 rounded-2xl flex flex-col items-center shadow-xl">
          <h2 className="text-xl font-bold text-corporate-gold mb-2">Analytics</h2>
          <div className="text-3xl font-black text-3d mb-2">{data.analytics.visitors.toLocaleString()}</div>
          <div className="text-corporate-silver mb-1">Visitors</div>
          <div className="text-lg text-corporate-gold mb-1">{data.analytics.pageViews.toLocaleString()} Page Views</div>
          <div className="text-corporate-silver mb-1">Bounce Rate: <span className="text-corporate-gold">{(data.analytics.bounceRate * 100).toFixed(1)}%</span></div>
          <div className="text-corporate-silver">Avg. Session: <span className="text-corporate-gold">{data.analytics.avgSession}</span></div>
        </div>
        {/* Revenue */}
        <div className="glass luxury-border p-8 rounded-2xl flex flex-col items-center shadow-xl">
          <h2 className="text-xl font-bold text-corporate-gold mb-2">Revenue</h2>
          <div className="text-3xl font-black text-3d mb-2">${data.revenue.total.toLocaleString(undefined, {minimumFractionDigits:2})}</div>
          <div className="text-corporate-silver mb-1">Total Revenue</div>
          <div className="text-lg text-corporate-gold mb-1">MRR: ${data.revenue.mrr.toLocaleString(undefined, {minimumFractionDigits:2})}</div>
          <div className="text-corporate-silver">New Customers: <span className="text-corporate-gold">{data.revenue.newCustomers}</span></div>
        </div>
        {/* System Status */}
        <div className="glass luxury-border p-8 rounded-2xl flex flex-col items-center shadow-xl">
          <h2 className="text-xl font-bold text-corporate-gold mb-2">System Status</h2>
          <div className="text-3xl font-black text-3d mb-2">{data.system.status}</div>
          <div className="text-corporate-silver mb-1">Uptime: <span className="text-corporate-gold">{data.system.uptime}</span></div>
          <div className="text-corporate-silver">Last Deploy: <span className="text-corporate-gold">{data.system.lastDeploy}</span></div>
        </div>
      </div>
      {/* Logs */}
      <div className="w-full max-w-3xl glass luxury-border p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold text-corporate-gold mb-4">Recent Activity</h2>
        <ul className="divide-y divide-corporate-steel/30">
          {data.logs.map((log, idx) => (
            <li key={idx} className="flex items-center justify-between py-2 text-corporate-silver">
              <span className="font-mono text-base text-corporate-gold mr-4">{log.time}</span>
              <span className="flex-1">{log.event}</span>
              <span className={log.status === "success" ? "text-green-400" : "text-red-400"}>{log.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
