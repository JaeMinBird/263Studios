'use client';
import { useState } from 'react';
import Link from 'next/link';
import CollectionCart from '@/components/SideCart';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  style: string;
  description: string;
  styles: { name: string; image: string }[];
  sizes: string[];
}

export default function ProductPage() {
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [isInCart, setIsInCart] = useState(false);
  
  // Sample product data - this would typically come from an API
  const product: Product = {
    id: '1',
    name: 'Bomber Jacket',
    price: 198.00,
    image: '/images/jacket1.jpg',
    style: 'Black',
    description: 'A classic bomber jacket with modern tailoring. Made from premium materials for ultimate comfort and durability.',
    styles: [
      { name: 'Black', image: '/images/jacket1.jpg' },
      { name: 'Navy', image: '/images/jacket2.jpg' },
      { name: 'Olive', image: '/images/jacket3.jpg' }
    ],
    sizes: ['S', 'M', 'L', 'XL']
  };

  return (
    <div className="min-h-screen bg-white flex">
      <CollectionCart itemsInCart={3} subtotal={394.00} />
      <CollectionCart itemsInCart={3} subtotal={394.00} isMobile />

      <div className="w-full md:w-2/3 mx-auto mt-10 md:mt-0 pb-20 md:pb-8 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-2 px-4 md:px-8">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div 
              className="h-[240px] md:h-[360px] w-[240px] md:w-[360px] bg-gray-100"
              style={{ 
                backgroundImage: `url(${product.styles[selectedStyle].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h1 className="text-xl font-courier-prime text-black">{product.name}</h1>
            <p className="text-xs font-courier-prime font-bold text-black">Style: {product.styles[selectedStyle].name}</p>
            <p className="text-xs font-courier-prime text-gray-500">{product.description}</p>

            {/* Style Selector */}
            <div className="flex space-x-2 mt-4">
              {product.styles.map((style, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedStyle(index)}
                  className={`w-10 h-10 border ${
                    selectedStyle === index ? 'border-black' : 'border-gray-300'
                  }`}
                  style={{ 
                    backgroundImage: `url(${style.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              ))}
            </div>

            {/* Price */}
            <p className="text-xl font-courier-prime text-black mt-4">
              ${product.price.toFixed(2)}
            </p>

            {/* Size Selector and Quantity */}
            <div className="flex gap-2 items-center">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-20 border border-black py-2 px-1 font-courier-prime text-sm text-black"
              >
                <option value="" className="py-1">Select Size</option>
                {product.sizes.map((size) => (
                  <option key={size} value={size} className="py-1">{size}</option>
                ))}
              </select>

              {/* Quantity Selector */}
              <select
                className="w-20 border border-black p-2 font-courier-prime text-sm text-black"
              >
                {[...Array(10).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            {/* Add to Cart / Remove Button */}
            <button
              onClick={() => setIsInCart(!isInCart)}
              className={`w-full py-2 border border-black font-courier-prime text-sm ${
                isInCart
                  ? 'bg-white text-black hover:bg-black hover:text-white'
                  : 'bg-black text-white hover:bg-white hover:text-black'
              }`}
            >
              {isInCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>

            {/* Keep Shopping Button */}
            <Link 
              href="/collect"
              className="block w-full py-2 border border-black text-black hover:bg-black hover:text-white transition-colors font-courier-prime text-sm text-center"
            >
              Keep Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}