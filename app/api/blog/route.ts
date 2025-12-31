import { NextResponse } from 'next/server';

let posts: any[] = [];

export async function POST(req: Request) {
  const body = await req.json();
  posts.push({ ...body, date: new Date().toISOString(), id: Date.now() });
  return NextResponse.json({ ok: true, post: posts[posts.length - 1] });
}

export async function GET() {
  return NextResponse.json(posts);
}
