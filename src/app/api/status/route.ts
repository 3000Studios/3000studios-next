/**
 * Comprehensive Status Endpoint
 * Returns build info, environment flags, and system status
 */

import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  // Read package.json for version info
  let version = 'unknown';
  let buildId = 'unknown';
  
  try {
    const packagePath = join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
    version = packageJson.version;
  } catch (err) {
    console.error('Failed to read package.json:', err);
  }

  try {
    const buildIdPath = join(process.cwd(), '.next', 'BUILD_ID');
    buildId = readFileSync(buildIdPath, 'utf8').trim();
  } catch {
    // BUILD_ID might not exist in dev mode
    buildId = process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'dev';
  }

  // Check environment variables (without exposing secrets)
  const envFlags = {
    hasOpenAI: !!process.env.OPENAI_API_KEY,
    hasClaude: !!process.env.CLAUDE_API_KEY,
    hasGemini: !!process.env.GEMINI_API_KEY,
    hasPayPal: !!process.env.PAYPAL_CLIENT_ID,
    hasStripe: !!process.env.STRIPE_SECRET_KEY,
    hasGoogleMaps: !!process.env.GOOGLE_MAPS_API_KEY,
    nodeEnv: process.env.NODE_ENV || 'development',
    vercelEnv: process.env.VERCEL_ENV || 'local',
  };

  const status = {
    status: 'operational',
    version,
    buildId,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: '3000studios-next',
    environment: envFlags,
    endpoints: {
      health: '/api/health',
      cron: {
        content: '/api/cron/content',
        store: '/api/cron/store',
        reports: '/api/cron/reports',
      },
      features: {
        voiceToCode: '/api/voice-to-code',
        analytics: '/api/analytics',
        products: '/api/products',
        streaming: '/api/streaming',
      },
    },
    git: {
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'local',
      branch: process.env.VERCEL_GIT_COMMIT_REF || 'main',
      author: process.env.VERCEL_GIT_COMMIT_AUTHOR_NAME || 'unknown',
    },
  };

  return NextResponse.json(status, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}
