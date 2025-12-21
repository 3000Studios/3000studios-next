/**
 * Shadow PRIME Chat API
 * Conversational AI for visitors and admin
 */

import { NextResponse } from "next/server";
import { shadowPersonality, computeAvatarState } from "@/lib/shadow/personality";
import { pushAnalytics } from "@/lib/matrix/analytics";

export async function POST(req: Request) {
  try {
    const { input, role = "visitor" } = await req.json();

    if (!input) {
      return NextResponse.json(
        { error: "Input required" },
        { status: 400 }
      );
    }

    // Get AI response
    const text = await shadowPersonality(input, { role });
    const avatar = computeAvatarState(text);

    pushAnalytics({
      type: "shadow-chat",
      input,
      response: text,
      role,
      emotion: avatar.emotion,
    });

    return NextResponse.json({
      ok: true,
      text,
      avatar,
    });
  } catch (error: any) {
    console.error("Shadow PRIME chat error:", error);
    return NextResponse.json(
      { error: error.message || "Chat failed" },
      { status: 500 }
    );
  }
}
