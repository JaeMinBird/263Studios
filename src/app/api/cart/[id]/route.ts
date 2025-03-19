import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// PATCH /api/cart/[id] - Update cart item quantity
export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get('cartId')?.value;
    
    if (!cartId) {
      return NextResponse.json({ error: 'No cart found' }, { status: 404 });
    }
    
    // Store params in a separate variable first
    const params = context.params;
    // Access the id afterward and convert to a string immediately
    const idString = String(params?.id || '');
    // Then parse it
    const itemId = parseInt(idString);
    
    const { quantity } = await request.json();
    
    if (isNaN(itemId)) {
      return NextResponse.json({ error: 'Invalid item ID' }, { status: 400 });
    }
    
    // Check if item exists and belongs to the user's cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cartId
      }
    });
    
    if (!existingItem) {
      return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 });
    }
    
    // Update the item quantity
    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity }
    });
    
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json({ error: 'Failed to update cart item' }, { status: 500 });
  }
}

// DELETE /api/cart/[id] - Remove item from cart
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cartId = cookies().get('cartId')?.value;
    
    if (!cartId) {
      return NextResponse.json({ error: 'No cart found' }, { status: 404 });
    }
    
    const itemId = parseInt(params.id);
    
    if (isNaN(itemId)) {
      return NextResponse.json({ error: 'Invalid item ID' }, { status: 400 });
    }
    
    // Check if item exists and belongs to the user's cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cartId
      }
    });
    
    if (!existingItem) {
      return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 });
    }
    
    // Delete the item
    await prisma.cartItem.delete({
      where: { id: itemId }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json({ error: 'Failed to remove cart item' }, { status: 500 });
  }
} 