import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        orderId: params.orderId,
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Transform the data to match the OrderDetails interface
    const orderDetails = {
      id: order.id.toString(),
      orderNumber: order.orderId,
      email: order.email,
      status: order.orderStatus,
      subtotal: Number(order.subtotal),
      shipping: Number(order.shipping),
      tax: Number(order.tax),
      total: Number(order.total),
      items: order.items.map(item => ({
        name: item.productName,
        quantity: item.quantity,
        price: Number(item.price),
        style: item.style,
        size: item.size,
      })),
      shippingAddress: {
        address: order.address1,
        addressLine2: order.address2,
        city: order.city,
        state: order.state,
        zipCode: order.zipCode,
      },
    };

    return NextResponse.json(orderDetails);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order details' },
      { status: 500 }
    );
  }
} 