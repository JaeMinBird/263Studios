import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  context: { params: Promise<{ paymentIntentId: string }> }
) {
  try {
    // Await the params
    const { paymentIntentId } = await context.params;

    // Check if params exist
    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent ID is required' },
        { status: 400 }
      );
    }

    console.log('Fetching order for payment intent:', paymentIntentId);

    const order = await prisma.order.findFirst({
      where: {
        paymentIntentId: paymentIntentId,
      },
      include: {
        items: true,
        shippingAddress: true,
      },
    });

    console.log('Order found:', order ? 'yes' : 'no');

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Convert Decimal values to numbers before sending response
    const formattedOrder = {
      ...order,
      subtotal: Number(order.subtotal),
      shipping: Number(order.shipping),
      tax: Number(order.tax),
      total: Number(order.total),
      items: order.items.map(item => ({
        ...item,
        price: Number(item.price)
      }))
    };

    return NextResponse.json(formattedOrder);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order details' },
      { status: 500 }
    );
  }
} 