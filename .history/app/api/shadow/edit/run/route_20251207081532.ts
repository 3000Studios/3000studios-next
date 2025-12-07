/**
 * Voice-to-Code API Route
 * Interprets natural language and executes actions
 */

import { NextResponse } from "next/server";
import { pushAnalytics } from "@/lib/matrix/analytics";
import { shadowPersonality } from "@/lib/shadow/personality";

export async function POST(req: Request) {
  try {
    const { spoken } = await req.json();

    pushAnalytics({
      type: "voice-command",
      command: spoken,
    });

    // Get AI response
    const response = await shadowPersonality(spoken, { role: "champ" });

    pushAnalytics({
      type: "voice-command-complete",
      command: spoken,
      response,
    });

    return NextResponse.json({
      ok: true,
      message: response,
      command: spoken,
    });
  } catch (error: any) {
    console.error("Voice command error:", error);
    return NextResponse.json(
      { error: error.message || "Voice command failed" },
      { status: 500 }
    );
  }
}
