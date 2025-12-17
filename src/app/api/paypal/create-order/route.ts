/**
 * PayPal Create Order API Route
 * Handles PayPal payment processing
 */

import { prisma } from "@/lib/prisma";
import { createOrder } from "@/lib/services/paypal";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, userId } = body;

    // ... (rest of validation)

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // Calculate total
    const total = items.reduce((sum: number, item: any) => {
      return sum + item.price * item.quantity;
    }, 0);

    // Create PayPal order
    const paypalOrder = await createOrder({
      items: items.map((item: any) => ({
        name: item.name,
        description: item.description || item.name,
        quantity: item.quantity,
        unit_amount: {
          currency_code: "USD",
          value: item.price.toFixed(2),
        },
        affiliate_link: item.affiliateLink,
      })),
      total: total.toFixed(2),
      currency: "USD",
    });

    // Save order to database
    await prisma.order.create({
      data: {
        providerOrderId: paypalOrder.id,
        userId: userId || undefined,
        total,
        status: "pending",
        provider: "paypal",
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      orderId: paypalOrder.id,
      approvalUrl: paypalOrder.links.find((link: any) => link.rel === "approve")
        ?.href,
    });
  } catch (error) {
    console.error("PayPal create order error:", error);
    return NextResponse.json(
      { error: "Failed to create PayPal order" },
      { status: 500 }
    );
  }
}
