'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number | string | { toString: () => string };
  image: string;
}

interface ItemWindowProps {
  product: Product;
  href: string;
}

export default function ItemWindow({ product, href }: ItemWindowProps) {
  const formattedPrice = typeof product.price === 'number' 
    ? product.price.toFixed(2) 
    : Number(product.price.toString()).toFixed(2);

  return (
    <Link href={href}>
      <div className="relative group cursor-pointer">
        <div className="aspect-w-3 aspect-h-4 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={533}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mt-2">
          <h3 className="text-sm font-courier-prime">{product.name}</h3>
          <p className="text-sm font-courier-prime">${formattedPrice}</p>
        </div>
      </div>
    </Link>
  );
} 