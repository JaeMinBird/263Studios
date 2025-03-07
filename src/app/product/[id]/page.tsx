'use client';
import { useState } from 'react';
import Link from 'next/link';
import CollectionCart from '@/components/CollectionCart';

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

      <div className="w-full md:w-2/3 mx-auto mt-10 md:mt-0 pb-20 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8">
          {/* Product Image */}
          <div className="md:-ml-16">
            <div 
              className="h-[400px] md:h-[600px] w-full bg-gray-100"
              style={{ 
                backgroundImage: `url(${product.styles[selectedStyle].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h1 className="text-2xl font-courier-prime text-black">{product.name}</h1>
            <p className="text-sm font-courier-prime font-bold text-black">Style: {product.styles[selectedStyle].name}</p>
            <p className="text-sm font-courier-prime text-gray-500">{product.description}</p>

            {/* Style Selector */}
            <div className="flex space-x-2 mt-4">
              {product.styles.map((style, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedStyle(index)}
                  className={`w-16 h-16 border ${
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
            <p className="text-2xl font-courier-prime text-black mt-4">
              ${product.price.toFixed(2)}
            </p>

            {/* Size Selector */}
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full border border-black p-2 font-courier-prime text-sm text-black"
            >
              <option value="">Select Size</option>
              {product.sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>

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