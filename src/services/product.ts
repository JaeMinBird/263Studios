import { prisma } from '@/lib/db'

export async function getProduct(id: number) {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      styles: true,
      sizes: true,
    },
  })
}

export async function getAllProducts() {
  return await prisma.product.findMany({
    include: {
      styles: true,
      sizes: true,
    },
  })
} 