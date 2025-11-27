/*







































}  }    );      { status: 500 }      { ok: false, error: err.message },    return NextResponse.json(  } catch (err: any) {    });      message: "Command received, Champ.",      taskId,      status: "queued",    return NextResponse.json({    });      timestamp: Date.now(),      origin: origin || "manual",      user: user || "anonymous",      command,      id: taskId,    await addTaskToQueue({    // Add to queue    const taskId = `shadow-${Date.now()}-${Math.floor(Math.random() * 10000)}`;    // Generate unique task ID    }      );        { status: 400 }        { error: "Missing command" },      return NextResponse.json(    if (!command) {    const { command, user, origin } = await req.json();  try {export async function POST(req: Request) {import { addTaskToQueue } from "@/shadow-engine/queue/taskQueue"; *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import { NextResponse } from "next/server";