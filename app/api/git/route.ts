import { execSync } from 'child_process';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    execSync('git add .');
    execSync(`git commit -m "${message || 'voice update'}"`);
    execSync('git push');
    return NextResponse.json({ ok: true, deployed: true });
  } catch (error: any) {
    return NextResponse.json({ 
      ok: false, 
      error: error.message 
    }, { status: 500 });
  }
}
