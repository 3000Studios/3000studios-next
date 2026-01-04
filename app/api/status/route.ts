import { getLatestDeployment } from '@/lib/services/vercel';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.GPT_BRIDGE_TOKEN}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const latest = await getLatestDeployment();

    return NextResponse.json({
      success: true,
      status: latest ? latest.readyState : 'unknown',
      lastDeployment: latest ? {
        id: latest.id,
        url: latest.url,
        createdAt: latest.createdAt
      } : null,
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 });
  }
}
