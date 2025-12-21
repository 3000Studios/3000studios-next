/**
 * Deployment Status API Route
 * Get current deployment status
 */

<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { getLatestDeployment } from "@/lib/services/vercel";
=======
import { NextRequest, NextResponse } from 'next/server';
import { getLatestDeployment } from '@/lib/services/vercel';
>>>>>>> origin/pr/50

export async function GET(request: NextRequest) {
  try {
    const deployment = await getLatestDeployment();

    if (!deployment) {
      return NextResponse.json({
<<<<<<< HEAD
        status: "no_deployments",
        message: "No deployments found",
=======
        status: 'no_deployments',
        message: 'No deployments found',
>>>>>>> origin/pr/50
      });
    }

    return NextResponse.json({
<<<<<<< HEAD
      status: "success",
=======
      status: 'success',
>>>>>>> origin/pr/50
      deployment: {
        id: deployment.id,
        url: `https://${deployment.url}`,
        state: deployment.readyState,
        createdAt: deployment.createdAt,
      },
    });
  } catch (error) {
<<<<<<< HEAD
    console.error("Deployment status API error:", error);
    return NextResponse.json(
      { error: "Failed to get deployment status" },
      { status: 500 },
=======
    console.error('Deployment status API error:', error);
    return NextResponse.json(
      { error: 'Failed to get deployment status' },
      { status: 500 }
>>>>>>> origin/pr/50
    );
  }
}
