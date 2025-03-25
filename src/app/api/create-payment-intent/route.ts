import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, orderDetails } = body;

    console.log('Creating payment intent with details:', { amount, orderDetails });

    // Validate the order details match our expected format
    if (!orderDetails.items || !orderDetails.customer || !orderDetails.shippingAddress) {
      console.error('Invalid order details:', orderDetails);
      return NextResponse.json(
        { error: 'Invalid order details format' },
        { status: 400 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        orderDetails: JSON.stringify(orderDetails),
      },
      payment_method_types: ['card'],
      automatic_payment_methods: {
        enabled: false,
      },
    });

    console.log('Payment intent created:', paymentIntent.id);
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Error creating payment intent', details: error },
      { status: 500 }
    );
  }
} 