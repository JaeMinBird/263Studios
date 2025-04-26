import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming you're using Prisma

export async function POST(request: Request) {
  try {
    const { order, orderItems } = await request.json();

    // Create the order and its items in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the order
      const newOrder = await tx.order.create({
        data: {
          orderId: order.orderId,
          orderTime: order.orderTime,
          email: order.email,
          firstName: order.firstName,
          lastName: order.lastName,
          address1: order.address,
          address2: order.addressLine2,
          city: order.city,
          state: order.state,
          zipCode: order.zipCode,
          shippingMethod: order.shippingMethod,
          subtotal: order.subtotal,
          tax: order.tax,
          total: order.total,
          orderStatus: order.orderStatus,
        },
      });

      // Create all order items
      const orderItemsPromises = orderItems.map((item: any) =>
        tx.orderItem.create({
          data: {
            orderId: item.orderId,
            productId: item.productId,
            productName: item.productName,
            price: item.price,
            style: item.style,
            size: item.size,
            quantity: item.quantity,
          },
        })
      );

      await Promise.all(orderItemsPromises);

      return newOrder;
    });

    return NextResponse.json({ success: true, orderId: result.orderId });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
} 