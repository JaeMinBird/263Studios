'use client';

interface Product {
  name: string;
  price: number;
  image: string;
}

interface ItemWindowProps {
  product: Product;
}

export default function ItemWindow({ product }: ItemWindowProps) {
  return (
    <div className="w-full">
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
  );
} 