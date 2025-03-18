import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Create a test product
    const product = await prisma.product.create({
      data: {
        name: "Test Product",
        price: 99.99,
        image: "/images/test.jpg",
        styles: {
          create: [
            { name: "Black", image: "/images/black.jpg" }
          ]
        },
        sizes: {
          create: [
            { name: "M" }
          ]
        }
      }
    })
    
    return NextResponse.json({ success: true, product })
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json({ success: false, error: error.message })
  }
}