'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import CollectionCart from '@/components/SideCart';
import { useCart } from '@/context/CartContext';
import { ProductDetailSkeleton } from '@/components/SkeletonLoader';

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
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { items, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    if (params.id) {
      fetch(`/api/products/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
          setLoading(false);
        });
    }
  }, [params.id]);

  // Check if this product (with same size and style) is in cart
  useEffect(() => {
    if (product && items.length > 0) {
      const cartItem = items.find(item => 
        item.productId === parseInt(product.id) && 
        item.size === selectedSize && 
        item.style === product.styles[selectedStyle]?.name
      );
      setIsInCart(!!cartItem);
    }
  }, [product, items, selectedStyle, selectedSize]);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-white">
        <CollectionCart isMobile />
        <CollectionCart />
        <ProductDetailSkeleton />
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!product) return;
    
    if (selectedSize === '') {
      alert('Please select a size');
      return;
    }

    const styleName = product.styles[selectedStyle]?.name || product.style;
    const styleImage = product.styles[selectedStyle]?.image || product.image;

    await addToCart({
      productId: parseInt(product.id),
      name: product.name,
      price: product.price,
      style: styleName,
      size: selectedSize,
      quantity: quantity,
      image: styleImage
    });

    setIsInCart(true);
  };

  const handleRemoveFromCart = async () => {
    if (!product) return;
    
    // Find the cart item with matching product ID, size, and style
    const cartItem = items.find(item => 
      item.productId === parseInt(product.id) && 
      item.size === selectedSize && 
      item.style === product.styles[selectedStyle]?.name
    );

    if (cartItem) {
      await removeFromCart(cartItem.id);
      setIsInCart(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <CollectionCart isMobile />
      <CollectionCart />

      <div className="w-full md:w-2/3 mx-auto mt-10 md:mt-0 pb-20 md:pb-8 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 md:px-12">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div 
              className="h-[240px] md:h-[360px] w-[240px] md:w-[360px] bg-gray-100"
              style={{ 
                backgroundImage: `url(${product.styles[selectedStyle]?.image || product.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4 md:pl-6">
            <h1 className="text-xl font-courier-prime text-black">{product.name}</h1>
            <p className="text-xs font-courier-prime font-bold text-black">
              Style: {product.styles[selectedStyle]?.name || product.style}
            </p>
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
                className="w-14 border border-black p-2 font-courier-prime text-sm text-black"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {[...Array(9).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            {/* Add to Cart / Remove Button */}
            <button
              onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
              className={`w-full py-2 border border-black font-courier-prime text-sm ${
                isInCart
                  ? 'bg-white text-black hover:bg-black hover:text-white'
                  : 'bg-black text-white hover:bg-white hover:text-black'
              }`}
              disabled={selectedSize === '' && !isInCart}
            >
              {isInCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>

            {/* Keep Shopping Button */}
            <Link 
              href="/shop"
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