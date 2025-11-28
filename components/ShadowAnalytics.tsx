"use client";

import { useState, useEffect } from "react";

interface AnalyticsData {
  totalCommands: number;
  successRate: number;
  avgResponseTime: number;
  activeConnections: number;
  systemUptime: string;
  memoryUsage: number;
  cpuUsage: number;
}

export default function ShadowAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalCommands: 0,
    successRate: 0,
    avgResponseTime: 0,
    activeConnections: 0,
    systemUptime: "0h 0m",
    memoryUsage: 0,
    cpuUsage: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics({
        totalCommands: Math.floor(Math.random() * 1000) + 500,
        successRate: Math.floor(Math.random() * 10) + 90,
        avgResponseTime: Math.floor(Math.random() * 200) + 100,
        activeConnections: Math.floor(Math.random() * 5) + 1,
        systemUptime: `h m`,
        memoryUsage: Math.floor(Math.random() * 30) + 40,
        cpuUsage: Math.floor(Math.random() * 40) + 20,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({
    title,
    value,
    unit,
  }: {
    title: string;
    value: string | number;
    unit?: string;
  }) => (
    <div className="bg-corporate-navy border border-corporate-steel rounded-lg p-4">
      <h4 className="text-corporate-silver text-xs font-medium uppercase tracking-wide mb-2">
        {title}
      </h4>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-heading font-bold text-white">
          {value}
        </span>
        {unit && <span className="text-corporate-silver text-sm">{unit}</span>}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-heading font-bold text-corporate-gold">
        System Analytics
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Commands" value={analytics.totalCommands} />
        <StatCard title="Success Rate" value={analytics.successRate} unit="%" />
        <StatCard
          title="Avg Response"
          value={analytics.avgResponseTime}
          unit="ms"
        />
        <StatCard
          title="Active Connections"
          value={analytics.activeConnections}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="System Uptime" value={analytics.systemUptime} />
        <StatCard title="Memory Usage" value={analytics.memoryUsage} unit="%" />
        <StatCard title="CPU Usage" value={analytics.cpuUsage} unit="%" />
      </div>
    </div>
  );
}
