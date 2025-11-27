/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import { NextResponse } from "next/server";
import { executeCommand } from "@/lib/commandExecutor";

export async function POST(req: Request) {
  try {
    const { command, user, origin } = await req.json();

    if (!command) {
      return NextResponse.json(
        { error: "Missing command" },
        { status: 400 }
      );
    }

    const taskId = `shadow-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    const result = await executeCommand(command);

    return NextResponse.json({
      taskId,
      command,
      user: user || "anonymous",
      origin: origin || "manual",
      timestamp: Date.now(),
      status: result.success ? "completed" : "failed",
      result: result.output || result.error,
      action: result.action,
      message: result.success ? "Command executed successfully" : "Command failed"
    });

  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
