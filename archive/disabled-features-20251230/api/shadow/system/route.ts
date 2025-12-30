/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import { NextResponse } from "next/server";
import { getQueueStatus } from "@/shadow-engine/queue/taskQueue";

export async function GET() {
  try {
    const queueStatus = await getQueueStatus();

    return NextResponse.json({
      status: "Online",
      queue: queueStatus,
      timestamp: Date.now(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { status: "Error", error: err.message },
      { status: 500 },
    );
  }
}
