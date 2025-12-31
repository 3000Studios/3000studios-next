import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { route, jsx } = await req.json();

    const target = path.join(process.cwd(), 'app', route, 'page.tsx');
    if (!fs.existsSync(target)) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    fs.writeFileSync(target, jsx);
    return NextResponse.json({ ok: true, updated: route });
  } catch (error: any) {
    return NextResponse.json({ 
      ok: false, 
      error: error.message 
    }, { status: 500 });
  }
}
