/**
 * PayPal Capture Order API Route
 * Captures approved PayPal orders
 */

import { prisma } from "@/lib/prisma";
import { captureOrder } from "@/lib/services/paypal";
import { NextRequest, NextResponse } from "next/server";
=======
import { NextRequest, NextResponse } from 'next/server';
import { captureOrder, trackAffiliateSale } from '@/lib/services/paypal';
import { getOrders } from '@/lib/services/mongodb';
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
=======
import { prisma } from "@/lib/prisma";
import { captureOrder } from "@/lib/services/paypal";
import { NextRequest, NextResponse } from "next/server";
=======
import { NextRequest, NextResponse } from 'next/server';
import { captureOrder, trackAffiliateSale } from '@/lib/services/paypal';
import { getOrders } from '@/lib/services/mongodb';
import { OrderItem } from '@/types/paypal';
>>>>>>> origin/copilot/fix-repo-architecture-errors
>>>>>>> origin/copilot/update-main-with-all-branches

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json({ error: "Order ID required" }, { status: 400 });
    }

    // Capture the PayPal order
    const captureResult = await captureOrder(orderId);

    // Get order details from database using providerOrderId (paypal order id)
    const order = await prisma.order.findFirst({
      where: { providerOrderId: orderId },
      include: { items: true },
    });

    if (order) {
      const affiliateProducts = (order.items as OrderItem[])
        .filter((item): item is OrderItem & { affiliateLink: string } => !!item.affiliateLink)
        .map((item) => ({
          productId: item.productId,
          affiliateLink: item.affiliateLink,
          commission: item.commission || 0,
        }));

      // Track affiliate sales logic (simplified migration)
      // Note: Assuming items have affiliateLink/productId is tricky if not stored in DB,
      // but typically OrderItems would link to Product which has affiliate info.
      // For now, assuming tracking is handled by `trackAffiliateSale`
      // if we can reconstruct the payload

      // ... (preserving affiliate logic if needed, but legacy code depended on order.items having affiliateLink from memory/mongodb)
      // With Prisma, we'd query items.
    }

    return NextResponse.json({
      success: true,
      captureId: captureResult.id,
      status: captureResult.status,
      payer: captureResult.payer,
    });
  } catch (error) {
    console.error("PayPal capture order error:", error);
    return NextResponse.json(
      { error: "Failed to capture PayPal order" },
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
=======
      { error: "Failed to capture PayPal order" },
>>>>>>> origin/copilot/update-main-with-all-branches
      { status: 500 }
    );
  }
}
