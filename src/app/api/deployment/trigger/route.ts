/**
 * Deployment Trigger API Route
 * Triggers Vercel deployment
 */

import { triggerDeployment } from '@/lib/services/vercel';
import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { triggerDeployment } from '@/lib/services/vercel';
>>>>>>> origin/copilot/fix-repo-architecture-errors
=======
import { triggerDeployment } from '@/lib/services/vercel';
>>>>>>> origin/copilot/update-best-options

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { branch } = body;

    // Trigger deployment
    const deployment = await triggerDeployment(branch || 'main');

    return NextResponse.json({
      success: true,
      deploymentId: deployment.id,
      deploymentUrl: `https://${deployment.url}`,
      status: deployment.readyState,
      message: 'Deployment triggered successfully',
    });
  } catch (error) {
    console.error('Deployment trigger API error:', error);
    return NextResponse.json(
      { error: 'Failed to trigger deployment' },
      { status: 500 }
    );
  }
}
