import { getLatestDeployment } from '@/lib/services/vercel';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.GPT_BRIDGE_TOKEN}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const latest = await getLatestDeployment();
        if (!latest) {
            return NextResponse.json({ success: false, message: 'No deployments found' });
        }

        return NextResponse.json({
            success: true,
            previews: [
                {
                    name: 'Production',
                    url: `https://${latest.url}`,
                    status: latest.readyState,
                    createdAt: new Date(latest.createdAt).toISOString()
                }
            ]
        });
    } catch (error: unknown) {
        return NextResponse.json({ error: 'Failed to fetch previews' }, { status: 500 });
    }
}
