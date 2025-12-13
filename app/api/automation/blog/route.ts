import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST() {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You write SEO blog posts designed to monetize traffic." },
      { role: "user", content: "Write an SEO blog about using AI to make passive income." }
    ]
  });

  return NextResponse.json({
    slug: "ai-passive-income",
    title: "How AI Automation Generates Passive Income",
    content: completion.choices[0].message.content
  });
}
