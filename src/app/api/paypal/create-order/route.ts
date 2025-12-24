/**
 * PayPal Create Order API Route
 * Handles PayPal payment processing
 */

import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/services/paypal';
import { saveOrder } from '@/lib/services/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, userId } = body;

    // ... (rest of validation)

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // Calculate total
    const total = items.reduce((sum: number, item: { price: number; quantity: number }) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Create PayPal order
    const paypalOrder = await createOrder({
      items: items.map((item: { name: string; description?: string; quantity: number; price: number; affiliateLink?: string }) => ({
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
    await saveOrder({
      orderId: paypalOrder.id,
      userId,
      items: items.map((item: { id: string; name: string; price: number; quantity: number }) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      status: 'pending',
      paymentMethod: 'paypal',
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      orderId: paypalOrder.id,
      approvalUrl: paypalOrder.links.find((link: { rel: string; href?: string }) => link.rel === 'approve')?.href,
    });
  } catch (error) {
    console.error("PayPal create order error:", error);
    return NextResponse.json(
      { error: "Failed to create PayPal order" },
      { error: "Failed to create PayPal order" },
      { status: 500 }
    );
  }
}
