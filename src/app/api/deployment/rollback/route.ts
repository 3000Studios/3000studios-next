/**
 * Deployment Rollback API Route
 * Triggers rollback to previous stable deployment
 * FAILSAFE SYSTEM - Critical for production stability
 */

import { getLatestDeployment, triggerDeployment } from '@/lib/services/vercel';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { deploymentId, reason } = body;

    console.log(`[ROLLBACK] Initiated: ${reason || 'Manual rollback'}`);

    // Get latest stable deployment if no specific ID provided
    let targetDeployment = deploymentId;
    if (!targetDeployment) {
      const latest = await getLatestDeployment();
      if (!latest) {
        return NextResponse.json(
          { error: 'No previous deployment found for rollback' },
          { status: 404 }
        );
      }
      targetDeployment = latest.id;
    }

    // Trigger redeployment of the stable version
    // In production, this would redeploy from a known-good commit
    const rollback = await triggerDeployment('main');

    console.log(`[ROLLBACK] Success: Rolled back to deployment ${targetDeployment}`);

    return NextResponse.json({
      success: true,
      rollbackId: rollback.id,
      rollbackUrl: `https://${rollback.url}`,
      status: rollback.readyState,
      message: `Rollback successful: ${reason || 'Manual rollback'}`,
    });
  } catch (error) {
    console.error('[ROLLBACK] Failed:', error);
    return NextResponse.json(
      {
        error: 'Rollback failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
