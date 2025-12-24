<<<<<<< HEAD
import { getStoreOptimizer } from '@/jobs/storeOptimizer';
import { getPricingEngine } from '@/lib/pricing';
import { NextRequest, NextResponse } from 'next/server';
=======
import { getPricingEngine } from '@/lib/pricing';
import { NextRequest, NextResponse } from 'next/server';
import { optimizeStore } from "@/jobs/storeOptimizer";
import { logAIEvent } from "@/lib/ai-logger";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {NextResponse }
>>>>>>> origin/copilot/update-main-with-all-branches

export async function POST(req: NextRequest) {
  try {
    // Verify Vercel cron secret
    const secret = req.headers.get('x-vercel-cron-secret');
    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const optimizer = getStoreOptimizer();
    const actions = await optimizer.optimize();

    // Get top products after optimization
    const pricingEngine = getPricingEngine();
    const topProducts = pricingEngine.getTopProducts(3);

    return NextResponse.json({
      success: true,
      actionsApplied: actions.length,
      topProducts,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Cron] Store optimization error:', error);
    return NextResponse.json(
      { error: 'Optimization failed' },
      { status: 500 }
    );
  }
}

export const preferredRegion = 'auto';
