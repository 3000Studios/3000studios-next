import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, mood } = await req.json();
    const voiceModel = "gpt-4o-mini-tts";

    const resp = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: voiceModel,
        voice: "alloy",
        input: text,
        format: "wav",
      }),
    });

    const arrayBuf = await resp.arrayBuffer();
    return new NextResponse(arrayBuf, { headers: { "Content-Type": "audio/wav" } });
  } catch (err) {
    return NextResponse.json({ error: "Voice error" }, { status: 500 });
  }
}/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import { NextResponse } from "next/server";
import { shadowEngine } from "../../../../lib/shadow-core/engine";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const audio = form.get("audio") as Blob;

    if (!audio) {
      return NextResponse.json({ ok: false, error: "No audio provided" });
    }

    const buffer = Buffer.from(await audio.arrayBuffer());
    
    const formData = new FormData();
    formData.append("file", new Blob([buffer]), "audio.webm");
    formData.append("model", "whisper-1");
    formData.append("response_format", "text");

    const transcriptResponse = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: formData
    });

    if (!transcriptResponse.ok) {
      throw new Error(`Whisper API error: ${transcriptResponse.statusText}`);
    }

    const transcript = await transcriptResponse.text();
    const result = await shadowEngine.execute(transcript, {});
    
    return NextResponse.json({ transcript, result });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message });
  }
}
