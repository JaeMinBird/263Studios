import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import { Decimal } from '@prisma/client/runtime/library'

interface Product {
  id: number;
  name: string;
  price: Decimal;
  image: string;
  styles: Array<{ name: string; image: string }>;
  sizes: Array<{ name: string }>;
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        styles: true,
        sizes: true,
      }
    })
    
    // Add proper typing for the product parameter
    const formattedProducts = products.map((product: Product) => ({
      ...product,
      price: Number(product.price)
    }));
    
    const categorizedProducts = {
      jackets: formattedProducts.filter((p: Product) => 
        p.name.toLowerCase().includes('jacket') || 
        p.name.toLowerCase().includes('puffer')
      ),
      shirts: [],  // We'll add these later
      pants: []    // We'll add these later
    }
    
    return NextResponse.json(categorizedProducts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
} 