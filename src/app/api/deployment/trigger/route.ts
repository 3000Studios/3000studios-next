/**
 * Deployment Trigger API Route
 * Triggers Vercel deployment
 */

<<<<<<< HEAD
<<<<<<< HEAD
import { NextRequest, NextResponse } from 'next/server';
import { triggerDeployment, getDeploymentStatus } from '@/lib/services/vercel';
=======
import { triggerDeployment } from '@/lib/services/vercel';
import { NextRequest, NextResponse } from 'next/server';
>>>>>>> origin/copilot/resolve-git-conflicts
=======
import { NextRequest, NextResponse } from 'next/server';
import { triggerDeployment, getDeploymentStatus } from '@/lib/services/vercel';
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy

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
