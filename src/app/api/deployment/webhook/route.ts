/**
 * Deployment Webhook Handler
 * Receives deployment status updates from GitHub Actions and Vercel
 */

import { NextRequest, NextResponse } from 'next/server';
>>>>>>> origin/pr/50

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { status, branch, commit, timestamp, source } = body;

    console.log('📡 Deployment webhook received:', {
>>>>>>> origin/pr/50
      status,
      branch,
      commit: commit?.substring(0, 7),
      timestamp,
      source: source || 'github-actions',
>>>>>>> origin/pr/50
    });

    // In a production environment, you would:
    // 1. Broadcast this to connected WebSocket clients
    // 2. Store in database for history
    // 3. Trigger cache invalidation
    // 4. Send notifications

    // For now, just acknowledge receipt
    return NextResponse.json({
      success: true,
      message: 'Deployment webhook processed',
>>>>>>> origin/pr/50
      received: {
        status,
        branch,
        timestamp: timestamp || new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
>>>>>>> origin/pr/50
    );
  }
}

// Handle GET requests for webhook verification
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    message: 'Deployment webhook endpoint',
    endpoints: {
      post: 'Receive deployment status updates',
      get: 'Webhook health check',
>>>>>>> origin/pr/50
    },
  });
}
