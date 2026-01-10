import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: 'Missing body' }, { status: 400 });

    // Accept either structured command or { transcript: string }
    if (body.transcript) {
      // Minimal legacy parsing example (expand with your router)
      const transcript: string = String(body.transcript);
      const actions: string[] = [];
      const lowerTranscript = transcript.toLowerCase();

      if (lowerTranscript.includes('dark')) actions.push('setTheme:dark');
      if (lowerTranscript.includes('light')) actions.push('setTheme:light');
      if (lowerTranscript.includes('deploy')) actions.push('trigger:deploy');
      if (lowerTranscript.includes('status')) actions.push('get:systemStatus');

      return NextResponse.json({
        success: true,
        summary: `Parsed ${actions.length} actions from transcript: "${transcript}"`,
        actions,
      });
    }

    if (body.type && body.payload) {
      // Structured voice command — pass to server voice router (implement later)
      return NextResponse.json({
        success: true,
        message: 'Structured command received; handler not yet wired.',
        type: body.type,
      });
    }

    return NextResponse.json({ error: 'Unsupported command format' }, { status: 400 });
  } catch (err) {
    console.error('voice route error', err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
