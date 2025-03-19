'use client';
import { useEffect } from 'react';
import CartItem from '@/components/CartItem';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, subtotal, itemCount } = useCart();

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-white cursor-[url('/custom-cursor.svg'),_auto]">
      {/* Responsive container with added top margin for mobile */}
      <div className="w-full md:w-[50%] h-[90vh] md:h-[70vh] border border-black shadow-lg bg-white flex flex-col mt-14 md:mt-0 mb-2 md:my-8 overflow-hidden">
        {/* Section 1: Cart Header */}
        <div className="p-3">
          <h1 className="text-lg font-normal mb-1 font-courier-prime text-black text-center">Cart</h1>
        </div>
        <div className="border-b border-black -mx-3"></div>

        {/* Section 2: Items Count */}
        <div className="p-2">
          <p className="text-black pl-1 mb-0 font-courier-prime text-sm lowercase">
            {itemCount} items in your cart
          </p>
        </div>
        <div className="border-b border-black -mx-3"></div>

        {/* Section 3: Items List */}
        <div className="flex-1 h-[240px] overflow-y-auto">
          <div className="p-0 pb-4">
            {items.length > 0 ? (
              items.map((item, index) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  style={item.style}
                  size={item.size}
                  quantity={item.quantity}
                  image={item.image}
                  isFirst={index === 0}
                  isLast={index === items.length - 1}
                />
              ))
            ) : (
              <div className="p-4 text-center">
                <p className="font-courier-prime text-sm text-gray-600">Your cart is empty</p>
              </div>
            )}
            
            {/* Add empty space to show only 3 items */}
            {itemCount <= 3 && <div className="h-10"></div>}
          </div>
        </div>
        <div className="border-b border-black -mx-3"></div>

        {/* Section 4: Subtotal */}
        <div className="bg-white p-2">
          <p className="text-black font-courier-prime text-sm lowercase text-right">
            subtotal: ${subtotal.toFixed(2)}
          </p>
        </div>
        <div className="border-b border-black -mx-3"></div>

        {/* Section 5: Actions */}
        <div className="p-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-black text-sm font-courier-prime lowercase text-center md:text-left">
              shipping calculated at checkout
            </p>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Link 
                href="/shop"
                className="w-full md:w-auto px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors font-courier-prime text-sm lowercase text-center"
              >
                keep shopping
              </Link>
              <Link 
                href="/checkout"
                className={`w-full md:w-auto px-4 py-2 border border-black font-courier-prime text-sm lowercase text-center ${
                  items.length === 0 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-white hover:text-black transition-colors'
                }`}
                aria-disabled={items.length === 0}
                onClick={e => items.length === 0 && e.preventDefault()}
              >
                checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
