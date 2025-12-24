/**
 * Affiliate Tracking API Route
<<<<<<< HEAD
 *
 * Handles affiliate link tracking, click recording, and commission attribution.
 *
=======
 * 
 * Handles affiliate link tracking, click recording, and commission attribution.
 * 
>>>>>>> origin/copilot/update-main-with-all-branches
 * Endpoints:
 * - GET /api/affiliate?code=XXX&product=YYY - Track affiliate click and redirect
 * - POST /api/affiliate/track - Record affiliate conversion
 * - GET /api/affiliate/stats?code=XXX - Get affiliate stats (admin)
 */

<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { mongodb, affiliate as affiliateConfig } from "@/lib/apiClients";
import crypto from "crypto";
=======
import { NextRequest, NextResponse } from 'next/server';
import { mongodb, affiliate as affiliateConfig } from '@/lib/apiClients';
import crypto from 'crypto';
>>>>>>> origin/copilot/update-main-with-all-branches

// Cookie duration in days
const COOKIE_DURATION = affiliateConfig.cookieDuration || 30;

/**
 * Track affiliate click and set tracking cookie
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
<<<<<<< HEAD
    const affiliateCode = searchParams.get("code");
    const productId = searchParams.get("product");
    const redirectUrl = searchParams.get("redirect") || "/store";

    if (!affiliateCode) {
      return NextResponse.json(
        { error: "Affiliate code is required" },
        { status: 400 },
=======
    const affiliateCode = searchParams.get('code');
    const productId = searchParams.get('product');
    const redirectUrl = searchParams.get('redirect') || '/store';

    if (!affiliateCode) {
      return NextResponse.json(
        { error: 'Affiliate code is required' },
        { status: 400 }
>>>>>>> origin/copilot/update-main-with-all-branches
      );
    }

    // Validate affiliate code exists
    if (mongodb.isConfigured()) {
      try {
        const db = await mongodb.db;
<<<<<<< HEAD
        const affiliate = await db.collection("affiliates").findOne({
=======
        const affiliate = await db.collection('affiliates').findOne({
>>>>>>> origin/copilot/update-main-with-all-branches
          code: affiliateCode,
          active: true,
        });

        if (!affiliate) {
          return NextResponse.json(
<<<<<<< HEAD
            { error: "Invalid affiliate code" },
            { status: 404 },
=======
            { error: 'Invalid affiliate code' },
            { status: 404 }
>>>>>>> origin/copilot/update-main-with-all-branches
          );
        }

        // Record the click
<<<<<<< HEAD
        await db.collection("affiliate_clicks").insertOne({
=======
        await db.collection('affiliate_clicks').insertOne({
>>>>>>> origin/copilot/update-main-with-all-branches
          affiliateId: affiliate._id,
          code: affiliateCode,
          productId: productId || null,
          timestamp: new Date(),
<<<<<<< HEAD
          userAgent: request.headers.get("user-agent"),
          referrer: request.headers.get("referer"),
          ip:
            request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "unknown",
        });

        // Update affiliate stats
        await db.collection("affiliates").updateOne(
          { _id: affiliate._id },
          {
            $inc: {
              totalClicks: 1,
              [`clicksByProduct.${productId || "general"}`]: 1,
=======
          userAgent: request.headers.get('user-agent'),
          referrer: request.headers.get('referer'),
          ip: request.headers.get('x-forwarded-for') || 
              request.headers.get('x-real-ip') || 
              'unknown',
        });

        // Update affiliate stats
        await db.collection('affiliates').updateOne(
          { _id: affiliate._id },
          { 
            $inc: { 
              totalClicks: 1,
              [`clicksByProduct.${productId || 'general'}`]: 1,
>>>>>>> origin/copilot/update-main-with-all-branches
            },
            $set: {
              lastClickAt: new Date(),
            },
<<<<<<< HEAD
          },
        );
      } catch (dbError) {
        console.error("Database error tracking affiliate click:", dbError);
=======
          }
        );
      } catch (dbError) {
        console.error('Database error tracking affiliate click:', dbError);
>>>>>>> origin/copilot/update-main-with-all-branches
        // Continue even if DB fails - we can still set cookie
      }
    }

    // Set affiliate tracking cookie
    const cookieValue = JSON.stringify({
      code: affiliateCode,
      product: productId,
      timestamp: Date.now(),
    });

    const signature = crypto
<<<<<<< HEAD
      .createHmac("sha256", affiliateConfig.secret || "default-secret")
      .update(cookieValue)
      .digest("hex");

    const response = NextResponse.redirect(new URL(redirectUrl, request.url));

    response.cookies.set("affiliate_tracking", cookieValue, {
      maxAge: COOKIE_DURATION * 24 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    response.cookies.set("affiliate_sig", signature, {
      maxAge: COOKIE_DURATION * 24 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
=======
      .createHmac('sha256', affiliateConfig.secret || 'default-secret')
      .update(cookieValue)
      .digest('hex');

    const response = NextResponse.redirect(new URL(redirectUrl, request.url));
    
    response.cookies.set('affiliate_tracking', cookieValue, {
      maxAge: COOKIE_DURATION * 24 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    response.cookies.set('affiliate_sig', signature, {
      maxAge: COOKIE_DURATION * 24 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
>>>>>>> origin/copilot/update-main-with-all-branches
    });

    return response;
  } catch (error) {
<<<<<<< HEAD
    console.error("Affiliate tracking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
=======
    console.error('Affiliate tracking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
>>>>>>> origin/copilot/update-main-with-all-branches
    );
  }
}

/**
 * Record affiliate conversion (sale)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, orderTotal, products } = body;

    if (!orderId || !orderTotal) {
      return NextResponse.json(
<<<<<<< HEAD
        { error: "Order ID and total are required" },
        { status: 400 },
=======
        { error: 'Order ID and total are required' },
        { status: 400 }
>>>>>>> origin/copilot/update-main-with-all-branches
      );
    }

    // Get affiliate tracking cookie
<<<<<<< HEAD
    const trackingCookie = request.cookies.get("affiliate_tracking")?.value;
    const signatureCookie = request.cookies.get("affiliate_sig")?.value;

    if (!trackingCookie || !signatureCookie) {
      return NextResponse.json(
        { message: "No affiliate tracking found" },
        { status: 200 },
=======
    const trackingCookie = request.cookies.get('affiliate_tracking')?.value;
    const signatureCookie = request.cookies.get('affiliate_sig')?.value;

    if (!trackingCookie || !signatureCookie) {
      return NextResponse.json(
        { message: 'No affiliate tracking found' },
        { status: 200 }
>>>>>>> origin/copilot/update-main-with-all-branches
      );
    }

    // Verify signature
    const expectedSignature = crypto
<<<<<<< HEAD
      .createHmac("sha256", affiliateConfig.secret || "default-secret")
      .update(trackingCookie)
      .digest("hex");

    if (signatureCookie !== expectedSignature) {
      console.error("Invalid affiliate tracking signature");
      return NextResponse.json(
        { error: "Invalid tracking signature" },
        { status: 400 },
=======
      .createHmac('sha256', affiliateConfig.secret || 'default-secret')
      .update(trackingCookie)
      .digest('hex');

    if (signatureCookie !== expectedSignature) {
      console.error('Invalid affiliate tracking signature');
      return NextResponse.json(
        { error: 'Invalid tracking signature' },
        { status: 400 }
>>>>>>> origin/copilot/update-main-with-all-branches
      );
    }

    // Parse tracking data
    const trackingData = JSON.parse(trackingCookie);
    const affiliateCode = trackingData.code;

    // Calculate commission
    const commissionRate = affiliateConfig.commissionRate / 100;
    const commission = orderTotal * commissionRate;

    if (mongodb.isConfigured()) {
      const db = await mongodb.db;
<<<<<<< HEAD

      // Find affiliate
      const affiliate = await db.collection("affiliates").findOne({
=======
      
      // Find affiliate
      const affiliate = await db.collection('affiliates').findOne({
>>>>>>> origin/copilot/update-main-with-all-branches
        code: affiliateCode,
        active: true,
      });

      if (!affiliate) {
        return NextResponse.json(
<<<<<<< HEAD
          { error: "Affiliate not found" },
          { status: 404 },
=======
          { error: 'Affiliate not found' },
          { status: 404 }
>>>>>>> origin/copilot/update-main-with-all-branches
        );
      }

      // Record conversion
<<<<<<< HEAD
      await db.collection("affiliate_conversions").insertOne({
=======
      await db.collection('affiliate_conversions').insertOne({
>>>>>>> origin/copilot/update-main-with-all-branches
        affiliateId: affiliate._id,
        code: affiliateCode,
        orderId,
        orderTotal,
        commission,
        commissionRate: affiliateConfig.commissionRate,
        products: products || [],
        timestamp: new Date(),
        clickTimestamp: new Date(trackingData.timestamp),
<<<<<<< HEAD
        status: "pending", // pending, approved, paid
      });

      // Update affiliate stats
      await db.collection("affiliates").updateOne(
=======
        status: 'pending', // pending, approved, paid
      });

      // Update affiliate stats
      await db.collection('affiliates').updateOne(
>>>>>>> origin/copilot/update-main-with-all-branches
        { _id: affiliate._id },
        {
          $inc: {
            totalConversions: 1,
            totalRevenue: orderTotal,
            totalCommission: commission,
          },
          $set: {
            lastConversionAt: new Date(),
          },
<<<<<<< HEAD
        },
=======
        }
>>>>>>> origin/copilot/update-main-with-all-branches
      );

      return NextResponse.json({
        success: true,
        affiliate: affiliateCode,
        commission,
        commissionRate: affiliateConfig.commissionRate,
      });
    }

    return NextResponse.json({
      success: true,
<<<<<<< HEAD
      message: "Conversion tracked (DB not configured)",
    });
  } catch (error) {
    console.error("Affiliate conversion tracking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
=======
      message: 'Conversion tracked (DB not configured)',
    });
  } catch (error) {
    console.error('Affiliate conversion tracking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
>>>>>>> origin/copilot/update-main-with-all-branches
    );
  }
}
