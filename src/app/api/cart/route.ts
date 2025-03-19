import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Helper to get cart ID from cookie
async function getCartId() {
  const cookieStore = await cookies();
  let cartId = cookieStore.get('cartId')?.value;
  
  return cartId;
}

// Ensure user has a cart
async function ensureCart() {
  const cookieStore = await cookies();
  let cartId = await getCartId();
  
  if (!cartId) {
    // Create a new cart
    const cart = await prisma.cart.create({
      data: {}
    });
    cartId = cart.id;
    
    // Set cart ID in cookie (2 week expiry)
    cookieStore.set('cartId', cartId, { 
      expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      path: '/' 
    });
  }
  
  return cartId;
}

// GET /api/cart - Get cart contents
export async function GET() {
  try {
    const cartId = await getCartId();
    
    if (!cartId) {
      return NextResponse.json({ items: [] });
    }
    
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            product: {
              include: {
                styles: true
              }
            }
          }
        }
      }
    });
    
    if (!cart) {
      return NextResponse.json({ items: [] });
    }
    
    // Transform items to match frontend model
    const items = cart.items.map(item => ({
      id: item.id,
      productId: item.productId,
      name: item.product.name,
      price: Number(item.product.price),
      style: item.style,
      size: item.size,
      quantity: item.quantity,
      image: item.product.styles.find(s => s.name === item.style)?.image || item.product.image
    }));
    
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

// POST /api/cart - Add item to cart
export async function POST(request: Request) {
  try {
    const cartId = await ensureCart();
    const data = await request.json();
    const { productId, quantity, size, style } = data;
    
    console.log('Adding to cart:', { productId, quantity, size, style });
    
    if (!productId || !quantity || !size || !style) {
      return NextResponse.json({ 
        error: 'Missing required fields', 
        received: { productId, quantity, size, style } 
      }, { status: 400 });
    }
    
    // Get product details
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        styles: true
      }
    });
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId,
        productId,
        size,
        style
      }
    });
    
    if (existingItem) {
      // Update quantity if item exists
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
      
      return NextResponse.json(updatedItem);
    }
    
    // Create new item if it doesn't exist
    const newItem = await prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
        size,
        style
      }
    });
    
    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ 
      error: 'Failed to add item to cart',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// DELETE /api/cart - Clear cart
export async function DELETE() {
  try {
    const cartId = await getCartId();
    
    if (!cartId) {
      return NextResponse.json({ success: true });
    }
    
    // Delete all items in the cart
    await prisma.cartItem.deleteMany({
      where: { cartId }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json({ error: 'Failed to clear cart' }, { status: 500 });
  }
} 