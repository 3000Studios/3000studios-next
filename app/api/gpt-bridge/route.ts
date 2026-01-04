import { appendFileSync } from 'fs';
import { NextResponse } from 'next/server';
import { join } from 'path';

/**
 * GPT BRIDGE ENDPOINT
 * Receives commands from Custom GPT and forwards to voice API
 */

const LOG_FILE = join(process.cwd(), 'logs', '3kai-audit.log');

function auditLog(data: any) {
    try {
        const logEntry = JSON.stringify({
            timestamp: new Date().toISOString(),
            ...data
        }) + '\n';
        appendFileSync(LOG_FILE, logEntry);
    } catch (err) {
        console.error('Failed to write audit log:', err);
    }
}

export async function POST(req: Request) {
    const requestId = `3kai-${Math.random().toString(36).substring(2, 9)}`;

    try {
        // Verify authentication
        const authHeader = req.headers.get('authorization');
        const expectedToken = process.env.GPT_BRIDGE_TOKEN;

        if (!expectedToken) {
            auditLog({ requestId, event: 'AUTH_CONFIG_ERROR' });
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        if (authHeader !== `Bearer ${expectedToken}`) {
            auditLog({ requestId, event: 'AUTH_FAILURE', header: authHeader });
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();

        // Compatibility Map: Convert 'instruction' from Custom GPT to 'transcript' for Voice API
        const payload = { ...body };
        if (payload.instruction && !payload.transcript) {
            payload.transcript = payload.instruction;
        }

        auditLog({
            requestId,
            event: 'COMMAND_RECEIVED',
            type: payload.type || (payload.transcript ? 'transcript' : 'unknown'),
            payload
        });

        // Forward to voice API
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://3000studios.com';
        const voiceApiUrl = `${baseUrl}/api/voice`;

        const response = await fetch(voiceApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok) {
            auditLog({ requestId, event: 'VOICE_API_ERROR', status: response.status, result });
            return NextResponse.json(
                { error: 'Voice API failed', details: result, status: response.status },
                { status: response.status }
            );
        }

        auditLog({ requestId, event: 'COMMAND_SUCCESS', result });

        return NextResponse.json({
            success: true,
            requestId,
            result,
            timestamp: new Date().toISOString(),
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal server error";
        auditLog({ requestId, event: 'INTERNAL_ERROR', error: message });
        console.error('GPT Bridge error:', error);
        return NextResponse.json({ error: 'Bridge failed', requestId, details: message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({
        status: 'GPT Bridge Online',
        version: '1.0.0',
        description: 'Secure bridge between Custom GPT and voice command API',
        endpoints: {
            POST: 'Send voice commands from Custom GPT',
        },
        authentication: 'Bearer token required',
        documentation: '/docs/CUSTOM_GPT_SETUP.md',
    });
}
