import { media as registry } from '@/lib/mediaRegistry';
import { NextResponse } from 'next/server';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dj92eb97f';
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.GPT_BRIDGE_TOKEN}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { query } = await req.json();
        if (!query) {
            return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
        }

        const lowerQuery = query.toLowerCase();

        // 1. Search Cloudinary if configured
        if (API_KEY && API_SECRET) {
            const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search?expression=${encodeURIComponent(query)}&max_results=20`,
                { headers: { 'Authorization': `Basic ${auth}` } }
            );

            if (response.ok) {
                const data = await response.json();
                return NextResponse.json({
                    success: true,
                    source: 'cloud',
                    assets: data.resources.map((r: any) => ({
                        name: r.public_id,
                        url: r.secure_url,
                        type: r.resource_type
                    }))
                });
            }
        }

        // 2. Search local registry fallback
        const matches = [];
        if (registry.introVideo.includes(lowerQuery)) matches.push({ name: 'Intro Video', url: registry.introVideo, type: 'video' });

        registry.avatars.forEach((a: any, i: number) => {
            const url = a.url || a;
            if (typeof url === 'string' && url.includes(lowerQuery)) {
                matches.push({ name: `Avatar ${i + 1}`, url, type: 'image' });
            }
        });

        return NextResponse.json({
            success: true,
            source: 'registry',
            assets: matches
        });

    } catch (error: unknown) {
        return NextResponse.json({ error: 'Failed to fetch assets' }, { status: 500 });
    }
}
