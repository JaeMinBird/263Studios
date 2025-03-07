'use client';

import Link from 'next/link';
import { Product } from '@/types';

interface ItemWindowProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  href: string;
}

export default function ItemWindow({ product, href }: ItemWindowProps) {
  return (
    <Link href={href} passHref>
      <div className="cursor-pointer hover:opacity-80 transition-opacity">
        <div className="relative aspect-square bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gray background if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          {/* Gray placeholder that shows if image fails to load */}
          <div className="absolute inset-0 bg-gray-100" />
        </div>
        {/* Black border between image and text */}
        <div className="border-t border-black my-2" />
        <div className="text-center">
          <p className="text-sm font-medium">{product.name}</p>
          <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
} 