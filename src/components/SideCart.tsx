'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface CollectionCartProps {
  isMobile?: boolean;
}

export default function CollectionCart({ isMobile = false }: CollectionCartProps) {
  const { itemCount, subtotal, isLoading } = useCart();

  if (isLoading) {
    return null; // Prevent flash during loading
  }

  if (isMobile) {
    return (
      <div className="w-full md:hidden fixed bottom-0 h-auto p-4 bg-white border-t border-black z-50 shadow-lg">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="font-courier-prime text-black text-sm font-bold">
              {itemCount} items in cart
            </h2>
            <p className="font-courier-prime text-black text-sm font-bold">
              ${subtotal.toFixed(2)}
            </p>
          </div>
          <div className="flex space-x-2">
            <Link href="/cart" className="flex-1 px-4 py-2 bg-white text-black border border-black font-courier-prime text-sm lowercase text-center hover:bg-black hover:text-white transition-colors">
              view cart
            </Link>
            <Link href="/checkout" className="flex-1 px-4 py-2 bg-black text-white border border-black font-courier-prime text-sm lowercase text-center hover:bg-white hover:text-black transition-colors">
              checkout
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-1/6 fixed left-0 top-0 h-screen p-8 hidden md:block">
      <div className="flex flex-col h-full justify-center">
        <h2 className="font-courier-prime text-black text-sm mb-2">
          {itemCount} items in cart
        </h2>
        <p className="font-courier-prime text-black text-sm mb-6">
          subtotal: ${subtotal.toFixed(2)}
        </p>
        <Link href="/cart" className="w-full px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors font-courier-prime text-sm lowercase mb-2 text-center">
          view cart
        </Link>
        <Link href="/checkout" className="w-full px-4 py-2 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors font-courier-prime text-sm lowercase text-center">
          checkout
        </Link>
      </div>
    </div>
  );
} 