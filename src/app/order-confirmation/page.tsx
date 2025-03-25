'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface OrderDetails {
  id: string;
  orderNumber: string;
  email: string;
  status: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    style: string;
    size: string;
  }>;
  shippingAddress: {
    address: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get('payment_intent');
  const { clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartCleared, setCartCleared] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleSuccess = async () => {
      if (!paymentIntentId) {
        console.log('No payment intent ID found');
        router.push('/');
        return;
      }

      try {
        // Only clear cart once
        if (!cartCleared) {
          await clearCart();
          setCartCleared(true);
        }
        
        console.log('Fetching order details for:', paymentIntentId);
        
        // Add a delay to allow webhook processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const response = await fetch(`/api/orders/${paymentIntentId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          throw new Error(`Failed to fetch order details: ${errorData.error}`);
        }
     
        const data = await response.json();
        console.log('Order details received:', data);
        setOrderDetails(data);
      } catch (error) {
        console.error('Error handling success:', error);
        // Retry after 2 seconds if order not found (webhook might still be processing)
        if (error instanceof Error && error.message.includes('Order not found')) {
          setTimeout(() => handleSuccess(), 2000);
        }
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    handleSuccess();
  }, [paymentIntentId, clearCart, cartCleared, router]);

  const formatPrice = (value: number) => {
    return value.toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white cursor-[url('/custom-cursor.svg'),_auto]">
        <div className="font-courier-prime text-black text-lg lowercase">loading...</div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white cursor-[url('/custom-cursor.svg'),_auto]">
        <div className="w-full md:w-[90%] lg:w-[60%] h-auto border border-black shadow-lg bg-white flex flex-col mt-14 md:mt-0 mb-2 md:my-8 overflow-hidden p-6">
          <div className="text-center">
            <h1 className="text-2xl font-courier-prime mb-4">Order Not Found</h1>
            <p className="font-courier-prime text-gray-700 mb-6">
              We couldn't find your order details. Please contact customer support if you believe this is an error.
            </p>
            <Link
              href="/shop"
              className="px-6 py-2 border border-black bg-gray-800 text-white hover:bg-gray-100 hover:text-gray-800 transition-colors font-courier-prime text-sm"
            >
              continue shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-2 bg-white cursor-[url('/custom-cursor.svg'),_auto]">
      <div className="w-full md:w-[80%] lg:w-[50%] h-auto border border-black shadow-lg bg-white flex flex-col mt-14 md:mt-0 mb-2 md:my-4 overflow-hidden p-4">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-courier-prime mb-2 text-black lowercase">thank you for your order!</h1>
          <p className="font-courier-prime text-gray-800 lowercase">order confirmation #{orderDetails.orderNumber}</p>
          <div className="border-b border-gray-300 w-full my-3"></div>
        </div>
        
        <div className="mb-4">
          <div className="bg-gray-50 p-4 border border-gray-200 rounded-sm text-center">
            <h2 className="font-courier-prime text-gray-800 mb-2 lowercase">
              order status: <span className="font-medium lowercase">{orderDetails.status}</span>
            </h2>
            <p className="font-courier-prime text-gray-700 text-sm lowercase">
              a confirmation email has been sent to {orderDetails.email}.<br />
              you'll receive another email when your order ships.
            </p>
          </div>

          <div className="mt-4">
            <h2 className="font-courier-prime text-black mb-3 lowercase">order summary</h2>
            <div className="space-y-2 font-courier-prime text-sm">
              <div className="flex justify-between">
                <span className="text-black lowercase">subtotal:</span>
                <span className="text-black">${formatPrice(orderDetails.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black lowercase">shipping:</span>
                <span className="text-black">${formatPrice(orderDetails.shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black lowercase">tax:</span>
                <span className="text-black">${formatPrice(orderDetails.tax)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
                <span className="text-black lowercase">total:</span>
                <span className="text-black">${formatPrice(orderDetails.total)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-2">
          <Link
            href="/shop"
            className="px-6 py-2 border border-black bg-gray-800 text-white hover:bg-gray-100 hover:text-gray-800 transition-colors font-courier-prime text-sm lowercase"
          >
            continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
} 