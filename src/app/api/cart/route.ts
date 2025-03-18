import { getCart, addToCart } from '@/services/cart'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const userId = request.headers.get('user-id') // You'll need to implement proper auth
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const cart = await getCart(userId)
    return NextResponse.json(cart)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const userId = request.headers.get('user-id') // You'll need to implement proper auth
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { productId, quantity, size, style } = await request.json()
    const cartItem = await addToCart(userId, productId, quantity, size, style)
    return NextResponse.json(cartItem)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 })
  }
} 