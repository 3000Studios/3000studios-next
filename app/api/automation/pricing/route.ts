import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST() {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a pricing optimization engine." },
      { role: "user", content: "Optimize pricing for a $49 digital AI product with low conversion." }
    ]
  });

  return NextResponse.json({
    recommendation: response.choices[0].message.content
  });
}
