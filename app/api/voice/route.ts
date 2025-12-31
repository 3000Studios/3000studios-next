import { NextResponse } from 'next/server';

let lastCommand: any = null;

export async function POST(req: Request) {
  const body = await req.json();
  lastCommand = body;
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json(lastCommand);
}
