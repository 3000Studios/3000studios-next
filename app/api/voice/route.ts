import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const STORE = path.join(process.cwd(), 'voice-state.json');

export async function POST(req: Request) {
  const body = await req.json();
  fs.writeFileSync(STORE, JSON.stringify(body, null, 2));
  return NextResponse.json({ ok: true });
}

export async function GET() {
  if (!fs.existsSync(STORE)) return NextResponse.json(null);
  return NextResponse.json(JSON.parse(fs.readFileSync(STORE, 'utf-8')));
}
