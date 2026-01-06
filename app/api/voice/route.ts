import { media } from '@/lib/mediaRegistry';
import { uiRegistry, updateRegistry } from '@/lib/uiRegistry';
import { VoiceCommand } from '@/voice/commands';
import { routeVoiceCommand } from '@/voice/router';
import { NextResponse } from 'next/server';

// Voice command types
interface VoicePayload {
  action?: 'update' | 'query';
  target?: string;
  payload?: Record<string, unknown>;
  key?: string;
  value?: unknown;
  transcript?: string;
}

// Voice command actions
interface VoiceAction {
  type: string;
  value: string;
}

// Simple command parser for natural language inputs
function parseTranscript(transcript: string): { actions: VoiceAction[]; summary: string } {
  const text = transcript.toLowerCase().trim();
  const actions: VoiceAction[] = [];
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

// Helper to search Pexels (Server-side)
async function searchPexels(query: string, type: 'video' | 'image'): Promise<string | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return null;

  const baseUrl =
    type === 'video' ? 'https://api.pexels.com/videos/search' : 'https://api.pexels.com/v1/search';
  const url = `${baseUrl}?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;

  try {
    const res = await fetch(url, { headers: { Authorization: apiKey } });
    const data = await res.json();
    if (type === 'video') {
      return data.videos?.[0]?.video_files?.[0]?.link || null;
    } else {
      return data.photos?.[0]?.src?.large2x || null;
    }
  } catch (e: unknown) {
    console.error('', _e);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Direct Voice Command (Phase 3 - Exact JSON)
    if (body.type && typeof body.type === 'string') {
      const result = await routeVoiceCommand(body as VoiceCommand);
      return NextResponse.json(result);
    }

    // 2. Natural Language / Transcript Processing
    const data = body as VoicePayload;
    if (data.transcript) {
      const text = data.transcript.toLowerCase();

      // AUTO-DETECT MEDIA REQUESTS (Pexels Integration)
      // "Put a truck video..."
      if (
        text.includes('video') ||
        text.includes('photo') ||
        text.includes('image') ||
        text.includes('picture')
      ) {
        const type = text.includes('video') ? 'video' : 'image';
        // Extract query: remove common words
        const query = text
          .replace('put a', '')
          .replace('add a', '')
          .replace('show me', '')
          .replace('video', '')
          .replace('photo', '')
          .replace('image', '')
          .replace('picture', '')
          .replace('of', '')
          .trim();

        if (query) {
          const mediaUrl = await searchPexels(query, type);
          if (mediaUrl) {
            // Queue the mutation
            const result = await routeVoiceCommand({
              type: 'ADD_MEDIA',
              payload: {
                url: mediaUrl,
                mediaType: type,
              },
            } as VoiceCommand);
            return NextResponse.json({
              ...result,
              summary: `Found and added ${type} of "${query}" from Pexels`,
            });
          }
        }
      }

      const result = parseTranscript(data.transcript);
      return NextResponse.json(result);
    }

    // ... rest of handler

    // Handle media registry updates
    if (data.target === 'media' && data.key && data.value) {
      // @ts-expect-error - dynamic registry update
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
      const command = String(data.payload.command);
      const result = parseTranscript(command);
      return NextResponse.json({ ok: true, ...result, registry: uiRegistry });
    }

    return NextResponse.json({ ok: true, media, registry: uiRegistry });
  } catch (e: unknown) {
    console.error('', _e);
    return NextResponse.json(
      { error: 'Voice command failed', details: String(e) },
      { status: 500 }
    );
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
