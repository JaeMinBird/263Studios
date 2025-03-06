'use client';

interface CartItemProps {
  name: string;
  price: number;
  style: string;
  size: string;
  isFirst: boolean;
  isLast: boolean;
}

export default function CartItem({ name, price, style, size, isFirst, isLast }: CartItemProps) {
  return (
    <div className={`flex items-center w-full ${!isFirst && 'border-t border-black'}`}>
      {/* Fixed image container - back to fixed height with border */}
      <div className="w-20 h-20 bg-gray-100 border-r border-black flex-shrink-0">
        {/* Add your image here */}
        <div className="w-full h-full object-cover" />
      </div>
      
      {/* Item details with minimal margins */}
      <div className="flex-1 p-3 min-w-0">
        <h2 className="font-normal font-courier-prime truncate text-sm text-black mt-0">{name}</h2>
        <p className="text-sm font-courier-prime mt-0.5 text-black">Style: {style}</p>
        <p className="text-sm font-courier-prime mt-0.5 text-black mb-0">Size: {size}</p>
      </div>
      
      {/* Quantity, Remove button and price */}
      <div className="flex items-center pr-4 flex-shrink-0">
        {/* Quantity dropdown */}
        <select className="border border-black p-1 font-courier-prime text-xs w-10 text-black h-[26px]">
          {Array.from({length: 9}, (_, i) => i + 1).map((num) => (
            <option key={num}>{num}</option>
          ))}
        </select>
        
        {/* Remove button */}
        <button className="px-3 border border-black text-black hover:bg-black hover:text-white transition-colors font-courier-prime text-xs whitespace-nowrap ml-4 h-[26px]">
          Remove
        </button>
        
        {/* Price - added fixed width to ensure consistent spacing */}
        <p className="font-normal font-courier-prime whitespace-nowrap text-sm text-black ml-4 min-w-[70px] text-right">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
} 