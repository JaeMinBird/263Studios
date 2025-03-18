import { prisma } from '@/lib/db'

export async function getCart(userId: string) {
  return await prisma.cart.findFirst({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })
}

export async function addToCart(userId: string, productId: number, quantity: number, size: string, style: string) {
  let cart = await prisma.cart.findFirst({
    where: { userId },
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    })
  }

  return await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity,
      size,
      style,
    },
  })
} 