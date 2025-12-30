/**
 * VOICE API ENDPOINT
 * POST /api/voice
 * Accepts: VoiceCommand
 * Returns: { status: 'ok' }
 */

import { NextRequest, NextResponse } from 'next/server';
import { routeVoiceCommand } from '@/voice/router';
import type { VoiceCommand } from '@/voice/commands';

export async function POST(req: NextRequest) {
  try {
    const cmd: VoiceCommand = await req.json();

    // Route the command to its handler
    const result = await routeVoiceCommand(cmd);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json({
    status: 'operational',
    endpoints: {
      POST: '/api/voice',
    },
    commands: [
      'ADD_SECTION',
      'UPDATE_TEXT',
      'ADD_VIDEO',
      'ADD_IMAGE',
      'ADD_AUDIO',
      'CHANGE_THEME',
      'UPDATE_NAV',
      'PUBLISH_BLOG',
      'UPDATE_LAYOUT',
      'ADD_CTA',
      'UPDATE_CURSOR',
      'ADD_ANIMATION',
      'TOGGLE_FEATURE',
    ],
  });
}
