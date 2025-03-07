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
    <div className={`flex items-center w-full ${!isFirst && 'border-t border-black'} ${isLast && 'border-b border-black'}`}>
      {/* Image container - vertically centered */}
      <div className="w-20 h-20 bg-gray-100 border-r border-black flex-shrink-0 flex items-center justify-center">
        <div className="w-full h-full object-cover" />
      </div>
      
      {/* Item details */}
      <div className="flex-1 px-3 min-w-0 flex flex-col justify-center py-2">
        <h2 className="font-normal font-courier-prime truncate text-sm text-black mb-0">{name}</h2>
        <p className="text-sm font-courier-prime mt-0.5 text-black mb-0">Style: {style}</p>
        <p className="text-sm font-courier-prime mt-0.5 text-black mb-0">Size: {size}</p>
        
        {/* Mobile controls */}
        <div className="md:hidden mt-2 flex items-center gap-2">
          <select className="border border-black p-1 font-courier-prime text-xs w-10 text-black h-[26px]">
            {Array.from({length: 9}, (_, i) => i + 1).map((num) => (
              <option key={num}>{num}</option>
            ))}
          </select>
          <button className="px-3 border border-black text-black hover:bg-black hover:text-white transition-colors font-courier-prime text-xs whitespace-nowrap h-[26px]">
            Remove
          </button>
        </div>
      </div>
      
      {/* Mobile price */}
      <div className="md:hidden flex items-center pr-4">
        <p className="font-normal font-courier-prime whitespace-nowrap text-sm text-black min-w-[70px] text-right">
          ${price.toFixed(2)}
        </p>
      </div>
      
      {/* Desktop controls */}
      <div className="hidden md:flex items-center pr-4 flex-shrink-0">
        <select className="border border-black p-1 font-courier-prime text-xs w-10 text-black h-[26px]">
          {Array.from({length: 9}, (_, i) => i + 1).map((num) => (
            <option key={num}>{num}</option>
          ))}
        </select>
        <button className="px-3 border border-black text-black hover:bg-black hover:text-white transition-colors font-courier-prime text-xs whitespace-nowrap ml-4 h-[26px]">
          Remove
        </button>
        <p className="font-normal font-courier-prime whitespace-nowrap text-sm text-black ml-4 min-w-[70px] text-right">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
} 