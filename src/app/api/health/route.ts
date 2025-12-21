/**
 * Health Check Endpoint
 * Simple liveness probe for monitoring
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      service: '3000studios-next',
    },
    { status: 200 }
  );
}
