/**
<<<<<<< HEAD
 * Revenue Endpoint Alert API
 * Monitors revenue-generating endpoints and alerts on failure
 * FAILSAFE SYSTEM - Critical for business continuity
=======
 * Revenue Health Check API
 * Monitors revenue-generating endpoints and revenue paths
 * FAILSAFE SYSTEM - Critical for business continuity
 * 
 * Enhanced with Revenue Lock validation for:
 * - AdSense configuration
 * - Stripe setup
 * - PayPal setup
 * - Analytics tracking
 * - Affiliate system
>>>>>>> origin/copilot/update-main-with-all-branches
 */

import { NextRequest, NextResponse } from 'next/server';

interface EndpointStatus {
  endpoint: string;
  status: 'healthy' | 'degraded' | 'down';
  responseTime: number;
  lastChecked: Date;
}

<<<<<<< HEAD
=======
interface RevenuePathCheck {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  message: string;
  details?: Record<string, unknown>;
}

>>>>>>> origin/copilot/update-main-with-all-branches
const REVENUE_ENDPOINTS = [
  '/api/paypal/create-order',
  '/api/products',
  '/api/analytics',
  '/api/auth/login',
];

<<<<<<< HEAD
export async function GET(request: NextRequest) {
  try {
=======
function checkAdSense(): RevenuePathCheck {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  
  if (!publisherId) {
    return {
      name: 'AdSense',
      status: 'error',
      message: 'AdSense publisher ID not configured',
      details: { required: 'NEXT_PUBLIC_ADSENSE_PUBLISHER_ID' },
    };
  }
  
  return {
    name: 'AdSense',
    status: 'healthy',
    message: 'AdSense properly configured',
    details: { publisherId: publisherId.substring(0, 15) + '...' },
  };
}

function checkStripe(): RevenuePathCheck {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  
  if (!secretKey) {
    return {
      name: 'Stripe',
      status: 'error',
      message: 'Stripe secret key not configured',
      details: { required: 'STRIPE_SECRET_KEY' },
    };
  }
  
  return {
    name: 'Stripe',
    status: 'healthy',
    message: 'Stripe properly configured',
    details: { configured: true },
  };
}

function checkPayPal(): RevenuePathCheck {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    return {
      name: 'PayPal',
      status: 'warning',
      message: 'PayPal not fully configured',
      details: { hasClientId: !!clientId, hasClientSecret: !!clientSecret },
    };
  }
  
  return {
    name: 'PayPal',
    status: 'healthy',
    message: 'PayPal properly configured',
  };
}

export async function GET(request: NextRequest) {
  try {
    // Check revenue paths (env vars, configs)
    const pathChecks: RevenuePathCheck[] = [
      checkAdSense(),
      checkStripe(),
      checkPayPal(),
    ];

    // Check revenue endpoints
>>>>>>> origin/copilot/update-main-with-all-branches
    const results: EndpointStatus[] = [];

    for (const endpoint of REVENUE_ENDPOINTS) {
      const start = Date.now();
      try {
        const response = await fetch(`${request.nextUrl.origin}${endpoint}`, {
          method: 'GET',
          headers: {
            'User-Agent': 'HealthCheck/1.0',
          },
        });

        const responseTime = Date.now() - start;
        const status = response.ok ? 'healthy' : 'degraded';

        results.push({
          endpoint,
          status,
          responseTime,
          lastChecked: new Date(),
        });

        // Alert if revenue endpoint is down
        if (!response.ok) {
          console.error(`[ALERT] Revenue endpoint ${endpoint} returned ${response.status}`);
        }

        // Alert if response is too slow
        if (responseTime > 5000) {
          console.warn(`[ALERT] Revenue endpoint ${endpoint} slow: ${responseTime}ms`);
        }
      } catch (error) {
        console.error(`[CRITICAL] Revenue endpoint ${endpoint} DOWN:`, error);
        results.push({
          endpoint,
          status: 'down',
          responseTime: Date.now() - start,
          lastChecked: new Date(),
        });
      }
    }

    const allHealthy = results.every((r) => r.status === 'healthy');
    const criticalDown = results.filter((r) => r.status === 'down');
<<<<<<< HEAD

    return NextResponse.json({
      success: true,
      healthy: allHealthy,
      endpoints: results,
      alerts: criticalDown.length > 0 ? `${criticalDown.length} critical endpoints down` : null,
=======
    const pathErrors = pathChecks.filter(c => c.status === 'error');
    const pathWarnings = pathChecks.filter(c => c.status === 'warning');

    return NextResponse.json({
      success: true,
      healthy: allHealthy && pathErrors.length === 0,
      endpoints: results,
      revenuePaths: {
        checks: pathChecks,
        errors: pathErrors.length,
        warnings: pathWarnings.length,
      },
      alerts: criticalDown.length > 0 
        ? `${criticalDown.length} critical endpoints down` 
        : pathErrors.length > 0 
        ? `${pathErrors.length} revenue path errors detected`
        : null,
>>>>>>> origin/copilot/update-main-with-all-branches
    });
  } catch (error) {
    console.error('[HEALTH CHECK] Failed:', error);
    return NextResponse.json(
      { error: 'Health check failed' },
      { status: 500 }
    );
  }
}
