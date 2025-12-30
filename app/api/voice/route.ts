/**
 * VOICE API ENDPOINT
 * POST /api/voice
 * Accepts: VoiceCommand
 * Returns: { status: 'ok', mutationId, message }
 */

import { NextRequest, NextResponse } from 'next/server';
import { routeVoiceCommand } from '@/voice/router';
import { logVoiceCommand } from '@/voice/logger';
import type { VoiceCommand } from '@/voice/commands';

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const cmd: VoiceCommand = await req.json();

    // Route the command to its handler
    const result = await routeVoiceCommand(cmd);

    const duration = Date.now() - startTime;

    // Log the command execution
    await logVoiceCommand(cmd.type, cmd as Record<string, any>, result, duration);

    return NextResponse.json(result);
  } catch (error) {
    const duration = Date.now() - startTime;
    const message = error instanceof Error ? error.message : 'Unknown error';

    // Log the error
    await logVoiceCommand('UNKNOWN', {}, { status: 'error', message }, duration);

    return NextResponse.json({ status: 'error', message }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json({
    status: 'operational',
    endpoints: {
      POST: '/api/voice',
      GET: '/api/voice (this endpoint)',
      logs: '/api/admin/voice-logs',
    },
    commands: ['UPDATE_TEXT', 'ADD_SECTION', 'ADD_MEDIA', 'CHANGE_STYLE', 'PUBLISH_BLOG'],
  });
}
