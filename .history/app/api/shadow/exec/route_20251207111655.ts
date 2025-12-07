/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import shadow from "@/lib/shadowActions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { command } = await req.json();

  const gpt = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-5.1-codex-max",
      messages: [
        {
          role: "system",
          content:
            "You are SHADOW. Convert natural language into exact actions for the website, git, or file system. Respond ONLY in JSON.",
        },
        { role: "user", content: command },
      ],
      response_format: { type: "json_object" },
    }),
  }).then((r) => r.json());

  if (!gpt.choices?.[0]?.message?.content) {
    return NextResponse.json({ error: "Invalid GPT response" }, { status: 500 });
  }

  let action;
  try {
    action = JSON.parse(gpt.choices[0].message.content);
  } catch (error) {
    return NextResponse.json({ error: "Failed to parse GPT response" }, { status: 500 });
  }

  const result = await shadow.run(action);

  return NextResponse.json(result);
}
