'use client';

import { useState } from 'react';
import CartItem from '@/components/CartItem';
import Link from 'next/link';

export default function CheckoutPage() {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [addressLine2, setAddressLine2] = useState('');

  // Sample cart items data
  const cartItems = [
    {
      name: "Box Logo Tee",
      price: 48.00,
      style: "Black",
      size: "M"
    },
    {
      name: "Hooded Sweatshirt",
      price: 148.00,
      style: "Navy",
      size: "L"
    },
    {
      name: "Beanie",
      price: 38.00,
      style: "Red",
      size: "One Size"
    }
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = shippingMethod === 'express' ? 15.00 : 5.00;
  const estimatedTax = subtotal * 0.08; // 8% tax rate
  const orderTotal = subtotal + shipping + estimatedTax;

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-white cursor-[url('/custom-cursor.svg'),_auto]">
      <div className="w-full md:w-[90%] lg:w-[85%] h-auto border border-black shadow-lg bg-white flex flex-col md:flex-row mt-14 md:mt-0 mb-2 md:my-8 overflow-hidden">
        
        {/* Mobile Order Summary Toggle */}
        <div className="md:hidden border-b border-black w-full p-3">
          <div 
            className="flex justify-between items-center w-full cursor-pointer" 
            onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
          >
            <span className="font-courier-prime text-black text-sm">order summary</span>
            <div className="flex items-center">
              <span className="font-courier-prime text-black text-sm mr-2">${subtotal.toFixed(2)}</span>
              <svg 
                className={`w-4 h-4 transition-transform ${orderSummaryOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile Order Summary Content */}
        {orderSummaryOpen && (
          <div className="md:hidden w-full border-b border-black">
            <div className="p-3 max-h-[300px] overflow-y-auto">
              {cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  name={item.name}
                  price={item.price}
                  style={item.style}
                  size={item.size}
                  isFirst={index === 0}
                  isLast={index === cartItems.length - 1}
                />
              ))}
            </div>
            <div className="p-3 bg-white">
              <div className="flex justify-between items-center mb-2">
                <input
                  type="text"
                  placeholder="Discount code"
                  className="flex-1 p-2 border border-black font-courier-prime text-sm"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button className="ml-2 px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors font-courier-prime text-sm">
                  Apply
                </button>
              </div>
              <div className="space-y-1 font-courier-prime text-sm text-black">
                <div className="flex justify-between">
                  <span>subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>estimated taxes:</span>
                  <span>${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-1 border-t border-gray-200">
                  <span>order total:</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Left Section - Checkout Form */}
        <div className="w-full md:w-[60%] h-auto md:h-[75vh] md:overflow-y-auto p-4 bg-white">
          {/* Express Checkout */}
          <div className="mb-6">
            <h2 className="text-sm font-normal mb-3 font-courier-prime text-gray-800 text-center">
              express checkout
            </h2>
            <div className="flex justify-center mb-4">
              <button className="bg-[#0070ba] text-white font-bold px-4 py-2 rounded w-full md:w-1/2 flex items-center justify-center">
                <span className="font-courier-prime text-sm">PayPal</span>
              </button>
            </div>
            <div className="flex items-center justify-center mb-3">
              <div className="flex-1 border-t border-gray-400"></div>
              <span className="mx-4 font-courier-prime text-sm text-gray-600">or</span>
              <div className="flex-1 border-t border-gray-400"></div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h2 className="text-sm font-normal mb-2 font-courier-prime text-gray-800">
              contact
            </h2>
            <div className="border-b border-gray-400 mb-3"></div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="email"
                className="w-full p-2 border border-gray-500 font-courier-prime text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Delivery Information */}
          <div className="mb-6">
            <h2 className="text-sm font-normal mb-2 font-courier-prime text-gray-800">
              delivery
            </h2>
            <div className="border-b border-gray-400 mb-3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="first name"
                className="p-2 border border-gray-500 font-courier-prime text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="last name"
                className="p-2 border border-gray-500 font-courier-prime text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                placeholder="address"
                className="p-2 border border-gray-500 font-courier-prime text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black md:col-span-2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="apt, unit, etc. (optional)"
                className="p-2 border border-gray-500 font-courier-prime text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black md:col-span-2"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
              <input
                type="text"
                placeholder="city"
                className="p-2 border border-gray-500 font-courier-prime text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="state"
                  className="p-2 border border-gray-500 font-courier-prime text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black w-1/2"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="zip code"
                  className="p-2 border border-gray-500 font-courier-prime text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black w-1/2"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="mb-6">
            <h2 className="text-sm font-normal mb-2 font-courier-prime text-gray-800">
              shipping method
            </h2>
            <div className="border-b border-gray-400 mb-3"></div>
            <div className="flex flex-col md:flex-row gap-3">
              <div
                className={`p-3 border cursor-pointer w-full md:w-1/2 ${
                  shippingMethod === 'standard' 
                    ? 'border-black bg-gray-100 text-gray-800' 
                    : 'border-gray-500 bg-white text-gray-700'
                }`}
                onClick={() => setShippingMethod('standard')}
              >
                <div className="flex justify-between mb-1">
                  <span className="font-courier-prime text-sm">Standard Shipping</span>
                  <span className="font-courier-prime text-sm">$5.00</span>
                </div>
                <p className="font-courier-prime text-xs text-gray-600">Delivery in 5-7 business days</p>
              </div>
              <div
                className={`p-3 border cursor-pointer w-full md:w-1/2 ${
                  shippingMethod === 'express' 
                    ? 'border-black bg-gray-100 text-gray-800' 
                    : 'border-gray-500 bg-white text-gray-700'
                }`}
                onClick={() => setShippingMethod('express')}
              >
                <div className="flex justify-between mb-1">
                  <span className="font-courier-prime text-sm">Express Shipping</span>
                  <span className="font-courier-prime text-sm">$15.00</span>
                </div>
                <p className="font-courier-prime text-xs text-gray-600">Delivery in 1-2 business days</p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mb-6">
            <h2 className="text-sm font-normal mb-2 font-courier-prime text-gray-800">
              payment information
            </h2>
            <div className="border-b border-gray-400 mb-3"></div>
            <div className="flex flex-col gap-0">
              {/* Credit Card Option */}
              <div>
                <div
                  className={`p-3 border cursor-pointer border-b-0 ${
                    paymentMethod === 'credit-card' 
                      ? 'border-black bg-gray-100 text-gray-800' 
                      : 'border-gray-500 bg-white text-gray-700'
                  }`}
                  onClick={() => setPaymentMethod(paymentMethod === 'credit-card' ? '' : 'credit-card')}
                >
                  <span className="font-courier-prime text-sm">credit card</span>
                </div>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    paymentMethod === 'credit-card' 
                      ? 'max-h-[500px] opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                  style={{ minHeight: paymentMethod === 'credit-card' ? '180px' : '0' }}
                >
                  <div className="p-3 border border-gray-500 border-t-0">
                    <div className="grid grid-cols-1 gap-3">
                      <input
                        type="text"
                        placeholder="card number"
                        className="p-2 border border-gray-500 font-courier-prime text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="name on card"
                        className="p-2 border border-gray-500 font-courier-prime text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="mm/yy"
                          className="p-2 border border-gray-500 font-courier-prime text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black w-1/2"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="cvv"
                          className="p-2 border border-gray-500 font-courier-prime text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black w-1/2"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Dividing line between payment options */}
              <div className="border-t border-gray-400"></div>
              
              {/* PayPal Option */}
              <div>
                <div
                  className={`p-3 border cursor-pointer border-t-0 ${
                    paymentMethod === 'paypal' 
                      ? 'border-black bg-gray-100 text-gray-800' 
                      : 'border-gray-500 bg-white text-gray-700'
                  }`}
                  onClick={() => setPaymentMethod(paymentMethod === 'paypal' ? '' : 'paypal')}
                >
                  <span className="font-courier-prime text-sm">paypal</span>
                </div>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    paymentMethod === 'paypal' 
                      ? 'max-h-[500px] opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                  style={{ minHeight: paymentMethod === 'paypal' ? '180px' : '0' }}
                >
                  <div className="p-3 border border-gray-500 border-t-0 flex items-center justify-center" style={{ height: '180px' }}>
                    <div>
                      <p className="font-courier-prime text-sm text-gray-600 text-center mb-4">you will be redirected to paypal to complete your payment.</p>
                      <div className="flex justify-center">
                        <img 
                          src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/44_Grey_PayPal_Pill_Button.png" 
                          alt="PayPal" 
                          className="h-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              className={`px-4 py-2 font-courier-prime text-sm w-full md:w-1/2 border ${
                termsAccepted 
                  ? 'border-black bg-gray-800 text-white hover:bg-gray-100 hover:text-gray-800 transition-colors' 
                  : 'border-gray-400 bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!termsAccepted}
            >
              process payment
            </button>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="hidden md:block w-[40%] h-[75vh] border-l border-black">
          <div className="h-full flex flex-col">
            <div className="p-3">
              <h2 className="text-lg font-normal mb-1 font-courier-prime text-black text-center">Order Summary</h2>
            </div>
            <div className="border-b border-black"></div>

            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-y-auto p-3">
              {cartItems.map((item, index) => (
                <div key={index} className="mb-2">
                  <CartItem
                    name={item.name}
                    price={item.price}
                    style={item.style}
                    size={item.size}
                    isFirst={index === 0}
                    isLast={index === cartItems.length - 1}
                  />
                </div>
              ))}
            </div>
            <div className="border-b border-black"></div>

            {/* Order Calculation */}
            <div className="p-3 bg-white">
              <div className="flex justify-between items-center mb-3">
                <input
                  type="text"
                  placeholder="Discount code"
                  className="flex-1 p-2 border border-black font-courier-prime text-sm"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button className="ml-2 px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors font-courier-prime text-sm">
                  Apply
                </button>
              </div>
              <div className="space-y-2 font-courier-prime text-sm text-black">
                <div className="flex justify-between">
                  <span>subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>estimated taxes:</span>
                  <span>${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
                  <span>order total:</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}