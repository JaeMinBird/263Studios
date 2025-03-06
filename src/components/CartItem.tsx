'use client';

interface CartItemProps {
  name: string;
  price: number;
  colors: string[];
  sizes: string[];
  isFirst: boolean;
  isLast: boolean;
}

export default function CartItem({ name, price, colors, sizes, isFirst, isLast }: CartItemProps) {
  return (
    <div className={`flex items-center w-full ${!isFirst && 'border-t border-black'}`}>
      {/* Image container - now snug against top and bottom */}
      <div className="w-20 h-20 bg-gray-100 border-r border-black flex-shrink-0">
        {/* Add your image here */}
      </div>
      
      {/* Item details */}
      <div className="flex-1 p-3 min-w-0">
        {/* Reduced text size by 30% */}
        <h2 className="font-medium font-courier-prime truncate text-sm">{name}</h2>
        <div className="flex gap-2 mt-1 flex-wrap">
          <select className="border border-black p-1 font-courier-prime flex-1 min-w-[100px] max-w-[45%] text-xs">
            {colors.map((color) => (
              <option key={color}>{color}</option>
            ))}
          </select>
          <select className="border border-black p-1 font-courier-prime flex-1 min-w-[100px] max-w-[45%] text-xs">
            {sizes.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Remove button and price */}
      <div className="flex items-center gap-3 pr-3 flex-shrink-0">
        {/* Reduced button size by 30% */}
        <button className="px-2 py-1 border border-black text-black hover:bg-black hover:text-white transition-colors font-courier-prime text-xs whitespace-nowrap">
          Remove
        </button>
        {/* Reduced price text size by 30% */}
        <p className="font-medium font-courier-prime whitespace-nowrap text-sm">
          ${price.toFixed(2)}
        </p>
      </div>
      
      {/* Bottom border for last item */}
      {isLast && <div className="absolute bottom-0 left-0 right-0 border-b border-black"></div>}
    </div>
  );
} 