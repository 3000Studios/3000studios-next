import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://newsapi.org/v2/top-headlines?category=technology&pageSize=5&apiKey=" +
      process.env.NEWS_API_KEY
  );

  const data = await res.json();
  return NextResponse.json(data.articles || []);
}
