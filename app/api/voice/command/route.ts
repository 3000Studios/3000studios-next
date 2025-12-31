import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { action, payload } = await req.json();

  try {
    if (action === 'edit-page') {
      const target = path.join(process.cwd(), 'app', payload.route, 'page.tsx');
      fs.writeFileSync(target, payload.code);
    }

    if (action === 'add-component') {
      const target = path.join(process.cwd(), 'app/components', payload.name + '.tsx');
      fs.writeFileSync(target, payload.code);
    }

    if (action === 'deploy') {
      execSync('git add . && git commit -m "voice update" && git push', { stdio: 'inherit' });
    }

    // Log every change
    const logPath = path.join(process.cwd(), 'voice-commands.log');
    fs.appendFileSync(logPath, `${new Date().toISOString()} - ${action} - ${JSON.stringify(payload)}\n`);

    return NextResponse.json({ ok: true, action, timestamp: new Date().toISOString() });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
