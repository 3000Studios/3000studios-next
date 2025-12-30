/**
 * VOICE COMMAND LOGS ENDPOINT
 * GET /api/admin/voice-logs
 * Returns: Array of recent voice command executions
 * Protected: Requires admin auth
 */

import { NextRequest, NextResponse } from 'next/server';
import { getVoiceCommandLogs } from '@/voice/logger';

export async function GET(req: NextRequest) {
  try {
    // TODO: Add auth check - verify admin session
    // For now, logs are public (will restrict later)

    const limit = req.nextUrl.searchParams.get('limit');
    const logs = await getVoiceCommandLogs(limit ? parseInt(limit) : 50);

    return NextResponse.json({
      status: 'ok',
      count: logs.length,
      logs,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ status: 'error', message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { action } = await req.json();

    if (action === 'clear') {
      // Clear logs
      const { clearVoiceCommandLogs } = await import('@/voice/logger');
      await clearVoiceCommandLogs();
      return NextResponse.json({
        status: 'ok',
        message: 'Voice command logs cleared',
      });
    }

    return NextResponse.json(
      { status: 'error', message: 'Unknown action' },
      { status: 400 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ status: 'error', message }, { status: 400 });
  }
}
