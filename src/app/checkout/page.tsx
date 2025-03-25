'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Add these interfaces at the top of the file
interface CheckoutFormProps {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  shippingMethod: 'standard' | 'express';
  termsAccepted: boolean;
  setTermsAccepted: (value: boolean) => void;
  orderTotal: number;
  items: Array<{
    id: number;
    productId: number;
    name: string;
    price: number;
    style: string;
    size: string;
    quantity: number;
    image: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
}

// Create a new CheckoutForm component
function CheckoutForm({
  email,
  firstName,
  lastName,
  address,
  addressLine2,
  city,
  state,
  zipCode,
  shippingMethod,
  termsAccepted,
  setTermsAccepted,
  orderTotal,
  items,
  subtotal,
  shipping,
  tax,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements || !termsAccepted) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_URL}/order-confirmation`,
          payment_method_data: {
            billing_details: {
              name: `${firstName} ${lastName}`,
              email: email,
              address: {
                line1: address,
                line2: addressLine2 || undefined,
                city: city,
                state: state,
                postal_code: zipCode,
                country: 'US',
              },
            },
          },
        },
        redirect: 'if_required',
      });

      if (result.error) {
        setErrorMessage(result.error.message || 'An error occurred');
        setIsProcessing(false);
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        // Payment successful, redirect to confirmation page
        router.push(`/order-confirmation?payment_intent=${result.paymentIntent.id}`);
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* ... existing form fields ... */}

      {/* Replace the credit card section with Stripe's PaymentElement */}
          <div className="mb-6">
            <h2 className="text-sm font-normal mb-2 font-courier-prime text-gray-800">
              payment information
            </h2>
            <div className="border-b border-gray-400 mb-3"></div>
        <div className="border border-gray-500 p-4 bg-white">
          <PaymentElement />
                </div>
        {errorMessage && (
          <p className="mt-2 text-red-600 text-sm font-courier-prime">{errorMessage}</p>
        )}
          </div>

          {/* Terms and Conditions */}
          <div className="mb-6">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 mr-2"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span className="font-courier-prime text-sm text-gray-700">
                I agree to the <a href="#" className="underline text-gray-800">Terms of Service</a> and <a href="#" className="underline text-gray-800">Privacy Policy</a>
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-3">
            <Link 
              href="/cart"
              className="px-4 py-2 border border-gray-500 text-gray-700 hover:border-black hover:text-gray-900 transition-colors font-courier-prime text-sm text-center w-full md:w-1/2"
            >
              cancel
            </Link>
            <button 
          type="submit"
          disabled={!termsAccepted || isProcessing || !stripe || !elements}
              className={`px-4 py-2 font-courier-prime text-sm w-full md:w-1/2 border ${
            !termsAccepted || isProcessing
                  ? 'border-gray-400 bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'border-black bg-gray-800 text-white hover:bg-gray-100 hover:text-gray-800 transition-colors'
              }`}
            >
          {isProcessing ? 'processing...' : 'process payment'}
            </button>
          </div>
    </form>
  );
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState('');
  
  // Form state
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Calculate totals
  const shipping = shippingMethod === 'express' ? 15.00 : 5.00;
  const estimatedTax = subtotal * 0.08; // 8% tax rate
  const orderTotal = subtotal + shipping + estimatedTax;

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  useEffect(() => {
    if (items.length > 0) {
      // Create PaymentIntent when the page loads
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: orderTotal,
          orderDetails: {
            items,
            customer: {
              email,
              firstName,
              lastName,
            },
            shippingAddress: {
              line1: address,
              line2: addressLine2,
              city,
              state,
              postal_code: zipCode,
            },
            shippingMethod: shippingMethod.toUpperCase(),
            subtotal,
            shipping,
            tax: estimatedTax,
            total: orderTotal,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [items, orderTotal, address, addressLine2, city, state, zipCode, shippingMethod, email, firstName, lastName]);

  if (!clientSecret) return null;

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-white cursor-[url('/custom-cursor.svg'),_auto]">
      <div className="w-full md:w-[90%] lg:w-[85%] h-auto border border-black shadow-lg bg-white flex flex-col md:flex-row mt-14 md:mt-0 mb-2 md:my-8 overflow-hidden">
        <Elements 
          stripe={stripePromise} 
          options={{
            clientSecret,
            appearance: {
              theme: 'stripe',
              variables: {
                colorPrimary: '#000000',
                colorBackground: '#ffffff',
                colorText: '#000000',
                colorDanger: '#df1b41',
                fontFamily: 'Courier Prime, monospace',
              },
            },
          }}
        >
          <div className="w-full md:w-[60%] h-auto md:h-[75vh] md:overflow-y-auto p-4 bg-white">
            {/* Customer Information */}
            <div className="mb-6">
              <h2 className="text-sm font-normal mb-2 font-courier-prime text-gray-800">
                customer information
              </h2>
              <div className="border-b border-gray-400 mb-3"></div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-500 font-courier-prime text-sm text-gray-800 placeholder-gray-500"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-1/2 p-2 border border-gray-500 font-courier-prime text-sm text-gray-800 placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-1/2 p-2 border border-gray-500 font-courier-prime text-sm text-gray-800 placeholder-gray-500"
                />
                  </div>
                </div>

            {/* Shipping Address */}
            <div className="mb-6">
              <h2 className="text-sm font-normal mb-2 font-courier-prime text-gray-800">
                shipping address
              </h2>
              <div className="border-b border-gray-400 mb-3"></div>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-500 font-courier-prime text-sm text-gray-800 placeholder-gray-500"
              />
              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-500 font-courier-prime text-sm text-gray-800 placeholder-gray-500"
              />
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-1/3 p-2 border border-gray-500 font-courier-prime text-sm text-gray-800 placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-1/3 p-2 border border-gray-500 font-courier-prime text-sm text-gray-800 placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-1/3 p-2 border border-gray-500 font-courier-prime text-sm text-gray-800 placeholder-gray-500"
                />
                </div>
              </div>

            {/* Shipping Method */}
            <div className="mb-6">
              <h2 className="text-sm font-normal mb-2 font-courier-prime text-gray-800">
                shipping method
              </h2>
              <div className="border-b border-gray-400 mb-3"></div>
              <div className="flex gap-2">
                <button
                  className={`w-1/2 p-2 border border-black font-courier-prime text-sm ${
                    shippingMethod === 'standard'
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-black hover:text-white'
                  }`}
                  onClick={() => setShippingMethod('standard')}
                >
                  Standard ($5.00)
                </button>
                <button
                  className={`w-1/2 p-2 border border-black font-courier-prime text-sm ${
                    shippingMethod === 'express'
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-black hover:text-white'
                  }`}
                  onClick={() => setShippingMethod('express')}
                >
                  Express ($15.00)
            </button>
          </div>
        </div>

            <CheckoutForm
              email={email}
              firstName={firstName}
              lastName={lastName}
              address={address}
              addressLine2={addressLine2}
              city={city}
              state={state}
              zipCode={zipCode}
              shippingMethod={shippingMethod}
              termsAccepted={termsAccepted}
              setTermsAccepted={setTermsAccepted}
              orderTotal={orderTotal}
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              tax={estimatedTax}
            />
            </div>
        </Elements>

        {/* Order Summary Section */}
        <div className="w-full md:w-[40%] h-auto bg-gray-50 p-4">
          <h2 className="text-sm font-normal mb-2 font-courier-prime text-gray-800">
            order summary
          </h2>
          <div className="border-b border-gray-400 mb-3"></div>
          
          {/* Cart Items */}
          <div className="max-h-[40vh] overflow-y-auto mb-4">
              {items.map((item, index) => (
              <div key={item.id} className="mb-4 last:mb-0">
                <div className="flex gap-4">
                  <div className="w-20 h-20 relative flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                      fill
                      className="object-cover"
                        />
                    </div>
                  <div className="flex-grow">
                    <p className="font-courier-prime text-sm text-gray-800">{item.name}</p>
                    <p className="font-courier-prime text-xs text-gray-600">
                      Style: {item.style}
                    </p>
                    <p className="font-courier-prime text-xs text-gray-600">
                      Size: {item.size}
                    </p>
                    <p className="font-courier-prime text-xs text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="font-courier-prime text-sm text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          {/* Order Totals */}
          <div className="space-y-2 font-courier-prime text-sm border-t border-gray-300 pt-4">
                <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-800">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
              <span className="text-gray-600">Estimated Tax</span>
              <span className="text-gray-800">${estimatedTax.toFixed(2)}</span>
                </div>
            <div className="flex justify-between pt-2 border-t border-gray-300">
              <span className="font-medium text-gray-800">Total</span>
              <span className="font-medium text-gray-800">${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}