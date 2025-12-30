/**
 * Matrix Events API
 * Returns recent system events
 */

import { getRecentEvents } from "@/lib/matrix/analytics";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "100");

    const events = getRecentEvents(limit);

    return NextResponse.json({
      ok: true,
      events,
      count: events.length,
    });
  } catch (error: any) {
    console.error("Events API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch events" },
      { status: 500 }
    );
  }
}
