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
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}

  const summaryParts = actions.map((action) => {
    if (action.type === 'setTheme') return `Theme → ${action.value}`;
    if (action.type === 'setAccent') return `Accent → ${action.value}`;
    return action.value;
  });

  return {
    summary: summaryParts.join('; ') || 'No change',
    actions,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    // NEW: Structured command API
    if (body && 'type' in body && 'payload' in body) {
      const command = body as VoiceCommand;

      // Validate command
      if (!validateCommand(command)) {
        return NextResponse.json({ error: 'Invalid command structure' }, { status: 400 });
      }

      // Route and execute
      const result = await routeCommand(command);

      if (!result.success) {
        return NextResponse.json(
          { error: result.error, files_changed: result.files_changed },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        files_changed: result.files_changed,
        commit_sha: result.commit_sha,
        message: `Command executed: ${command.type}`,
      });
    }

    // LEGACY: Transcript parsing (backward compatibility)
    const transcript = typeof body?.transcript === 'string' ? body.transcript : '';

    if (!transcript.trim()) {
      return NextResponse.json({ error: 'Transcript is required' }, { status: 400 });
    }

    if (transcript.length > 800) {
      return NextResponse.json({ error: 'Transcript too long' }, { status: 413 });
    }

    const response = parseActions(transcript);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
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
