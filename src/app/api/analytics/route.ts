/**
 * Analytics API Route
 * Returns real-time analytics data from MongoDB
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';
import { getDashboardStats, getAnalytics } from '@/lib/services/mongodb';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeRange =
      (searchParams.get("timeRange") as "day" | "week" | "month") || "day";

    // Get stats using Prisma
    const [userCount, _orderCount, revenue] = await Promise.all([
      prisma.user.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: "paid" }, // Assuming paid status
      }),
    ]);

    const stats = {
      users: userCount,
      sessions: 0, // Implement session tracking if needed
      revenue: revenue._sum.total || 0,
      updatedAt: new Date().toISOString(),
    };

    // Detailed analytics placeholder - typically requires a dedicated analytics table or aggregations
    const analytics = {
      pageViews: [],
      events: [],
      sources: [],
    };

    return NextResponse.json({
      success: true,
      stats,
      analytics,
      timeRange,
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
