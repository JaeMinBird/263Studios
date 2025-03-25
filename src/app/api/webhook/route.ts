import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import prisma from '@/lib/prisma';
import { OrderStatus, ShippingMethod } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface OrderDetails {
  items: {
    productId: number;
    quantity: number;
    price: number;
    size: string;
    style: string;
    name: string;
    image: string;
  }[];
  customer: {
    email: string;
    firstName: string;
    lastName: string;
  };
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
  };
  shippingMethod: 'STANDARD' | 'EXPRESS';
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

async function sendVendorNotification(order: any) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.VENDOR_EMAIL,
    subject: 'New Order Received',
    html: `
      <h1>New Order Details</h1>
      <p>Order Number: ${order.orderNumber}</p>
      <p>Customer: ${order.firstName} ${order.lastName}</p>
      <p>Total Amount: $${order.total}</p>
      <p>Shipping Address: 
        ${order.shippingAddress.address}
        ${order.shippingAddress.addressLine2 ? ', ' + order.shippingAddress.addressLine2 : ''}
        ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}
      </p>
      <h2>Items:</h2>
      ${order.items.map((item: any) => `
        <div>
          <p>${item.name} - ${item.style} - Size: ${item.size}</p>
          <p>Quantity: ${item.quantity} x $${item.price}</p>
        </div>
      `).join('')}
    `,
  };

  await transporter.sendMail(mailOptions);
}

function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
}

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    console.log('Received webhook event');
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    
    console.log('Event type:', event.type);

    if (event.type === 'payment_intent.succeeded') {
      try {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Processing payment intent:', paymentIntent.id);
        
        if (!paymentIntent.metadata.orderDetails) {
          console.error('No order details in metadata');
          return NextResponse.json({ error: 'No order details found' }, { status: 400 });
        }

        const orderDetails = JSON.parse(paymentIntent.metadata.orderDetails);
        console.log('Parsed order details:', orderDetails);

        // Check if order already exists
        const existingOrder = await prisma.order.findFirst({
          where: { paymentIntentId: paymentIntent.id }
        });

        if (existingOrder) {
          console.log('Order already exists:', existingOrder.id);
          return NextResponse.json({ success: true });
        }

        // Create order
        const order = await prisma.order.create({
          data: {
            orderNumber: `ORD-${Date.now()}`,
            paymentIntentId: paymentIntent.id,
            email: orderDetails.customer.email,
            firstName: orderDetails.customer.firstName,
            lastName: orderDetails.customer.lastName,
            subtotal: parseFloat(orderDetails.subtotal.toString()),
            shipping: parseFloat(orderDetails.shipping.toString()),
            tax: parseFloat(orderDetails.tax.toString()),
            total: parseFloat(orderDetails.total.toString()),
            status: 'PAID',
            shippingMethod: orderDetails.shippingMethod.toUpperCase() as ShippingMethod,
            shippingAddress: {
              create: {
                address: orderDetails.shippingAddress.line1,
                addressLine2: orderDetails.shippingAddress.line2 || '',
                city: orderDetails.shippingAddress.city,
                state: orderDetails.shippingAddress.state,
                zipCode: orderDetails.shippingAddress.postal_code,
              },
            },
            items: {
              create: await Promise.all(orderDetails.items.map(async (item: any) => {
                // Fetch the product to get the image URL
                const product = await prisma.product.findUnique({
                  where: { id: item.productId }
                });

                return {
                  productId: item.productId,
                  quantity: item.quantity,
                  price: parseFloat(item.price.toString()),
                  size: item.size,
                  style: item.style,
                  name: item.name,
                  image: product?.image || '', // Use the image from the database
                };
              })),
            },
          },
        });

        console.log('Order created successfully:', order.id);
        return NextResponse.json({ success: true });
      } catch (error) {
        console.error('Error processing webhook:', error);
        return NextResponse.json(
          { error: 'Error processing webhook', details: error },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }
} 