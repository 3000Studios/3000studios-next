import { NextResponse } from "next/server";

export async function POST() {
  const post = {
    title: "AI Automation That Actually Makes Money",
    slug: "ai-automation-monetization",
    body: "This article was generated automatically to drive SEO traffic and affiliate conversions.",
    publishedAt: new Date().toISOString()
  };

  return NextResponse.json({ ok: true, post });
}
