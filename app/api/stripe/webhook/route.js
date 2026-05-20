// app/api/stripe/webhook/route.js
import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';
import { db } from '@/utils/db';
import { stripeInfo } from '@/utils/schema';

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // get full customer details from Stripe
    const customer = await stripe.customers.retrieve(session.customer);

    // save to your DB
    await db.insert(stripeInfo)
      .values({
        email: customer.email,
        stripeCustomerId: customer.id,
        subscriptionId: session.subscription ?? null,
        plan: 'pro',
        subscriptionStatus: 'active',
      })
      .onConflictDoUpdate({
        target: stripeInfo.email,
        set: {
          stripeCustomerId: customer.id,
          subscriptionId: session.subscription ?? null,
          plan: 'pro',
          subscriptionStatus: 'active',
          updatedAt: new Date(),
        },
      });

    console.log('✅ User saved:', customer.email);
  }

  return NextResponse.json({ received: true });
}