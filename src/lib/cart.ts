import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';

export async function ensureCart() {
  const cookieStore = cookies();
  let cartId = cookieStore.get('cartId')?.value;

  if (!cartId) {
    const newCart = await prisma.cart.create({
      data: {}
    });
    cartId = newCart.id;

    cookieStore.set('cartId', cartId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
  }

  return cartId;
} 