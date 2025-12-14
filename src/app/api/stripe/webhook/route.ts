/**
 * Stripe Webhook Handler
 * Processes Stripe events (payment_intent.succeeded, etc.)
 */

import { RATE_LIMITS, withRateLimit } from '@/lib/rate-limit';
import { withSecurity } from '@/lib/security';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

const handler = async (request: NextRequest) => {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe not configured. Set STRIPE_SECRET_KEY.' },
        { status: 500 }
      );
    }

    const body = await request.text();
    const signature = request.headers.get('stripe-signature') || '';

    let event: Stripe.Event;

    // Verify webhook signature
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('⚠️ Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Handle events
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('✅ Payment successful:', {
          sessionId: session.id,
          customerEmail: session.customer_email,
          amountTotal: session.amount_total,
          currency: session.currency,
        });

        // TODO: Send confirmation email
        // TODO: Update database with order
        // TODO: Log to Matrix analytics
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('✅ Payment intent succeeded:', {
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        });
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error('❌ Payment failed:', {
          id: paymentIntent.id,
          error: paymentIntent.last_payment_error?.message,
        });
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        console.log('🔄 Charge refunded:', {
          id: charge.id,
          amount: charge.amount_refunded,
        });
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
};

export const POST = withRateLimit(
  withSecurity(handler, { cors: false, csrf: false }),
  RATE_LIMITS.payment
);
