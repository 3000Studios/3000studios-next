import { NextResponse } from 'next/server';

/**
 * GPT BRIDGE ENDPOINT
 * Receives commands from Custom GPT and forwards to voice API
 *
 * This endpoint acts as a secure bridge between OpenAI Custom GPT
 * and the internal voice command API.
 *
 * Authentication: Bearer token (GPT_BRIDGE_TOKEN env var)
 *
 * Usage:
 * POST /api/gpt-bridge
 * Authorization: Bearer <token>
 * Body: VoiceCommand JSON
 */

export async function POST(req: Request) {
    try {
        // Verify authentication
        const authHeader = req.headers.get('authorization');
        const expectedToken = process.env.GPT_BRIDGE_TOKEN;

        if (!expectedToken) {
            console.error('GPT_BRIDGE_TOKEN not configured');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        if (authHeader !== `Bearer ${expectedToken}`) {
            console.warn('Unauthorized GPT bridge access attempt');
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await req.json();

        // Compatibility Map: Convert 'instruction' from Custom GPT to 'transcript' for Voice API
        const payload = { ...body };
        if (payload.instruction && !payload.transcript) {
            payload.transcript = payload.instruction;
        }

        // Log the command for audit trail
        console.log('GPT Bridge command received:', {
            type: payload.type || (payload.transcript ? 'transcript' : 'unknown'),
            timestamp: new Date().toISOString(),
        });

        // Forward to voice API
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://3000studios.com';
        const voiceApiUrl = `${baseUrl}/api/voice`;

        const response = await fetch(voiceApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Voice API error:', errorText);
            return NextResponse.json(
                {
                    error: 'Voice API failed',
                    details: errorText,
                    status: response.status,
                },
                { status: response.status }
            );
        }

        const result = await response.json();

        // Log success
        console.log('GPT Bridge command executed successfully:', {
            success: result.success || true,
            message: result.message || result.summary,
        });

        return NextResponse.json({
            success: true,
            result,
            timestamp: new Date().toISOString(),
        });
    } catch (error: unknown) {
        console.error('GPT Bridge error:', error);
        return NextResponse.json(
            {
                error: 'Bridge failed',
                details: error instanceof Error ? (error instanceof Error ? (error instanceof Error ? error.message : "Unknown error") : "Unknown error") : String(error)
            },
            { status: 500 }
        );
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
