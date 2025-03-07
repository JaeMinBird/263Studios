'use client';
import { RefObject } from 'react';

interface Product {
  name: string;
  price: number;
  image: string;
}

interface ItemWindowProps {
  sectionId: string;
  sectionRef: RefObject<HTMLElement>;
  products: Product[];
}

export default function ItemWindow({ sectionId, sectionRef, products }: ItemWindowProps) {
  return (
    <section 
      id={sectionId} 
      ref={sectionRef}
      className="h-screen flex items-center justify-center p-4 md:p-0 pt-16 md:pt-0"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full">
        {products.map((product, index) => (
          <div 
            key={index} 
            className={`w-full ${products.length % 2 !== 0 && index === products.length - 1 ? 'col-span-2 md:col-span-1' : ''}`}
          >
            <div className="flex justify-center">
              <div 
                className="h-64 md:h-80 w-full bg-gray-100 mb-2" 
                style={{ 
                  backgroundImage: `url(${product.image})`, 
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </div>
            <div className="border-t border-black pt-2">
              <p className="font-courier-prime text-black text-sm">{product.name}</p>
              <p className="font-courier-prime text-gray-500 text-sm">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 