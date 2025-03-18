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
        
        {/* Mobile Order Summary Toggle - Updated with totals included */}
        <div className="md:hidden border-b border-black w-full p-3">
          <div 
            className="flex justify-between items-center p-3 cursor-pointer"
            onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
          >
            <span className="font-courier-prime text-sm text-gray-700">order details</span>
            <div className="flex items-center">
              <span className="font-courier-prime text-sm text-gray-700 mr-2">show</span>
              <svg 
                className={`w-4 h-4 transition-transform text-black ${orderSummaryOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Expandable content area with order totals */}
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden border-t border-gray-300 ${
              orderSummaryOpen ? 'max-h-[600px]' : 'max-h-0 border-t-0'
            }`}
          >
            <div className="p-3">
              {cartItems.map((item, index) => (
                <div key={index} className={`mb-2 ${index !== 0 && 'border-t border-gray-300'} py-2`}>
                  <div className="flex items-start">
                    {/* Image container */}
                    <div className="w-16 h-16 bg-gray-100 border border-gray-500 flex-shrink-0 flex items-center justify-center mr-3">
                      <div className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Item details */}
                    <div className="flex-1 min-w-0">
                      <h2 className="font-normal font-courier-prime truncate text-sm text-gray-800 mb-1">{item.name}</h2>
                      <p className="text-sm font-courier-prime text-gray-600 mb-1">Style: {item.style}</p>
                      <p className="text-sm font-courier-prime text-gray-600 mb-0">Size: {item.size}</p>
                    </div>
                    
                    {/* Price */}
                    <div className="ml-2">
                      <p className="font-normal font-courier-prime whitespace-nowrap text-sm text-gray-800">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Order totals in expanded section */}
              <div className="space-y-2 font-courier-prime text-sm text-black pt-2 border-t border-gray-300">
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

        {/* Left Section - Checkout Form */}
        <div className="w-full md:w-[60%] h-auto md:h-[75vh] md:overflow-y-auto p-4 bg-white">
          {/* Express Checkout - moved to the top */}
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
            
            {/* Payment selectors with animation restored */}
            <div className="relative border border-gray-500 overflow-hidden">
              {/* Credit Card Option */}
              <div 
                className={`p-3 flex items-center cursor-pointer transition-all duration-300 ${
                  paymentMethod === 'credit-card' ? 'bg-gray-100' : 'bg-white'
                } ${paymentMethod === '' ? 'border-b border-black' : ''}`}
                onClick={() => setPaymentMethod('credit-card')}
              >
                <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 flex items-center justify-center ${
                  paymentMethod === 'credit-card' 
                    ? 'border-black' 
                    : 'border-gray-500'
                }`}>
                  {paymentMethod === 'credit-card' && (
                    <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                  )}
                </div>
                <span className="font-courier-prime text-sm text-gray-700">credit card</span>
              </div>
              
              {/* Content Container with animation */}
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  paymentMethod === 'credit-card' ? 'h-[160px]' : 'h-0'
                }`}
              >
                <div className="p-3 border-t border-gray-300 h-full">
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
              
              {/* PayPal Option */}
              <div 
                className={`p-3 flex items-center cursor-pointer transition-all duration-300 ${
                  paymentMethod === 'paypal' 
                    ? 'bg-gray-100 border-t border-b border-t-black border-b-gray-300' 
                    : paymentMethod === 'credit-card'
                      ? 'bg-white border-t border-gray-500'
                      : 'bg-white'
                }`}
                onClick={() => setPaymentMethod('paypal')}
              >
                <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 flex items-center justify-center ${
                  paymentMethod === 'paypal' 
                    ? 'border-black' 
                    : 'border-gray-500'
                }`}>
                  {paymentMethod === 'paypal' && (
                    <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                  )}
                </div>
                <span className="font-courier-prime text-sm text-gray-700">paypal</span>
              </div>
            </div>
            
            {/* PayPal Content with animation - adjusted positioning to be lower */}
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden border-l border-r border-b border-gray-500 ${
                paymentMethod === 'paypal' ? 'h-[160px] -mt-[46px]' : 'h-0 -mt-0 border-0'
              }`}
            >
              <div className="p-3 border-t border-gray-300 h-full flex items-center justify-center">
                <div className="flex flex-col justify-center items-center translate-y-5">
                  <p className="font-courier-prime text-sm text-gray-600 text-center max-w-[80%] mx-auto">
                    after clicking "pay with paypal", you will be redirected to paypal to complete your purchase securely.
                  </p>
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

          {/* Mobile Order Summary Section - Redesigned with heading and show on same line */}
          <div className="md:hidden mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-normal font-courier-prime text-gray-800">
                order summary
              </h2>
              {/* "Show" toggle on same line as order summary */}
              <div className="flex items-center cursor-pointer" onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}>
                <span className="font-courier-prime text-sm text-gray-700 mr-2">show</span>
                <svg 
                  className={`w-4 h-4 transition-transform text-black ${orderSummaryOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="border-b border-gray-400 mb-3"></div>
            
            {/* Expandable items container */}
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden mb-3 ${
                orderSummaryOpen ? 'max-h-[500px]' : 'max-h-0'
              }`}
            >
              <div className="border border-gray-500 p-3 mb-3">
                {cartItems.map((item, index) => (
                  <div key={index} className={`mb-2 ${index !== 0 && 'border-t border-gray-300'} py-2`}>
                    <div className="flex items-start">
                      {/* Image container */}
                      <div className="w-16 h-16 bg-gray-100 border border-gray-500 flex-shrink-0 flex items-center justify-center mr-3">
                        <div className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Item details */}
                      <div className="flex-1 min-w-0">
                        <h2 className="font-normal font-courier-prime truncate text-sm text-gray-800 mb-1">{item.name}</h2>
                        <p className="text-sm font-courier-prime text-gray-600 mb-1">Style: {item.style}</p>
                        <p className="text-sm font-courier-prime text-gray-600 mb-0">Size: {item.size}</p>
                      </div>
                      
                      {/* Price */}
                      <div className="ml-2">
                        <p className="font-normal font-courier-prime whitespace-nowrap text-sm text-gray-800">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Always visible discount code input and order summary - removed box */}
            <div className="mb-3">
              <div className="flex items-center mb-3 gap-2">
                <input
                  type="text"
                  placeholder="discount code"
                  className="flex-1 p-2 border border-gray-500 font-courier-prime text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button className="whitespace-nowrap px-3 py-2 border border-gray-500 text-gray-700 hover:border-black hover:text-gray-900 transition-colors font-courier-prime text-sm">
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
                !termsAccepted 
                  ? 'border-gray-400 bg-gray-200 text-gray-500 cursor-not-allowed'
                  : paymentMethod === 'paypal'
                    ? 'border-[#0070ba] bg-[#0070ba] text-white hover:bg-[#005ea6] transition-colors'
                    : 'border-black bg-gray-800 text-white hover:bg-gray-100 hover:text-gray-800 transition-colors'
              }`}
              disabled={!termsAccepted}
            >
              {paymentMethod === 'paypal' ? 'pay with paypal' : 'process payment'}
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

            {/* Cart Items - Scrollable with removed quantity and remove buttons */}
            <div className="flex-1 overflow-y-auto p-3">
              {cartItems.map((item, index) => (
                <div key={index} className={`mb-2 ${index !== 0 && 'border-t border-black'} py-2`}>
                  <div className="flex items-start">
                    {/* Image container */}
                    <div className="w-20 h-20 bg-gray-100 border border-gray-500 flex-shrink-0 flex items-center justify-center mr-3">
                      <div className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Item details - now with more space */}
                    <div className="flex-1 min-w-0">
                      <h2 className="font-normal font-courier-prime truncate text-sm text-gray-800 mb-1">{item.name}</h2>
                      <p className="text-sm font-courier-prime text-gray-600 mb-1">Style: {item.style}</p>
                      <p className="text-sm font-courier-prime text-gray-600 mb-0">Size: {item.size}</p>
                    </div>
                    
                    {/* Price - maintained */}
                    <div className="ml-2">
                      <p className="font-normal font-courier-prime whitespace-nowrap text-sm text-gray-800">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-b border-black"></div>

            {/* Order Calculation with lowercase discount code input */}
            <div className="p-3 bg-white">
              <div className="flex justify-between items-center mb-3">
                <input
                  type="text"
                  placeholder="discount code"
                  className="flex-1 p-2 border border-gray-500 font-courier-prime text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-black"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button className="ml-2 px-4 py-2 border border-gray-500 text-gray-700 hover:border-black hover:text-gray-900 transition-colors font-courier-prime text-sm">
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