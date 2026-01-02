import { media } from '@/lib/mediaRegistry';
import { uiRegistry, updateRegistry } from '@/lib/uiRegistry';
import { NextResponse } from 'next/server';

// Voice command types
interface VoicePayload {
  action?: 'update' | 'query';
  target?: string;
  payload?: Record<string, any>;
  key?: string;
  value?: any;
  transcript?: string;
}

// Simple command parser for natural language inputs
function parseTranscript(transcript: string): { actions: any[]; summary: string } {
  const text = transcript.toLowerCase().trim();
  const actions: any[] = [];
  let summary = 'Command processed';

  // Theme commands
  if (text.includes('dark') || text.includes('night')) {
    actions.push({ type: 'setTheme', value: 'dark' });
    summary = 'Switched to dark theme';
  } else if (text.includes('light') || text.includes('day')) {
    actions.push({ type: 'setTheme', value: 'light' });
    summary = 'Switched to light theme';
  }

  // Accent commands
  if (text.includes('gold') || text.includes('yellow')) {
    actions.push({ type: 'setAccent', value: 'gold' });
    summary = 'Set accent to gold';
  } else if (text.includes('blue') || text.includes('sapphire')) {
    actions.push({ type: 'setAccent', value: 'sapphire' });
    summary = 'Set accent to sapphire';
  } else if (text.includes('platinum') || text.includes('silver') || text.includes('white')) {
    actions.push({ type: 'setAccent', value: 'platinum' });
    summary = 'Set accent to platinum';
  }

  // Action commands
  if (text.includes('deploy')) {
    actions.push({ type: 'message', value: 'Deployment triggered' });
    summary = 'Site deployment initiated';
  }
  if (text.includes('optimize') || text.includes('optimization')) {
    actions.push({ type: 'message', value: 'Optimization enabled' });
    summary = 'Optimization mode enabled';
  }

  if (actions.length === 0) {
    actions.push({ type: 'message', value: transcript });
    summary = `Received: "${transcript}"`;
  }

  return { actions, summary };
}

export async function POST(req: Request) {
  try {
    const data: VoicePayload = await req.json();

    // Handle transcript-based voice commands (from VoiceCommandCenter)
    if (data.transcript) {
      const result = parseTranscript(data.transcript);
      return NextResponse.json(result);
    }

    // Handle media registry updates
    if (data.target === 'media' && data.key && data.value) {
      // @ts-ignore - dynamic registry update
      media[data.key] = data.value;
      return NextResponse.json({ ok: true, media, registry: uiRegistry });
    }

    // Handle UI registry updates
    if (data.action === 'update' && data.target) {
      updateRegistry(data.target as keyof typeof uiRegistry, data.payload || {});
      return NextResponse.json({ ok: true, media, registry: uiRegistry });
    }

    // Handle voice-remote commands
    if (data.target === 'voice-remote' && data.payload?.command) {
      const result = parseTranscript(data.payload.command);
      return NextResponse.json({ ok: true, ...result, registry: uiRegistry });
    }

    return NextResponse.json({ ok: true, media, registry: uiRegistry });
  } catch (e) {
    console.error('Voice API error:', e);
    return NextResponse.json({ error: 'Voice command failed', details: String(e) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Voice API Online',
    endpoints: {
      POST: {
        transcript: 'Natural language voice command',
        action: 'update | query',
        target: 'media | ui | voice-remote',
      },
    },
    registry: uiRegistry,
  });
}
