'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface CollectionCartProps {
  isMobile?: boolean;
}

export default function CollectionCart({ isMobile = false }: CollectionCartProps) {
  const { itemCount, subtotal, isLoading } = useCart();

  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.div 
          className="w-full md:hidden fixed bottom-0 h-auto p-4 bg-white border-t border-black z-50 shadow-lg"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <motion.h2 
                className="font-courier-prime text-black text-sm font-bold"
                key={`mobile-count-${itemCount}`}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isLoading ? `${itemCount} items in cart` : `${itemCount} items in cart`}
              </motion.h2>
              <motion.p 
                className="font-courier-prime text-black text-sm font-bold"
                key={`mobile-subtotal-${subtotal}`}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                ${subtotal.toFixed(2)}
              </motion.p>
            </div>
            <div className="flex space-x-2">
              <Link href="/cart" className="flex-1 px-4 py-2 bg-white text-black border border-black font-courier-prime text-sm lowercase text-center hover:bg-black hover:text-white transition-colors">
                view cart
              </Link>
              <Link href="/checkout" className="flex-1 px-4 py-2 bg-black text-white border border-black font-courier-prime text-sm lowercase text-center hover:bg-white hover:text-black transition-colors">
                checkout
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="w-1/6 fixed left-0 top-0 h-screen p-8 hidden md:block"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col h-full justify-center">
          <motion.h2 
            className="font-courier-prime text-black text-sm mb-2"
            key={`desktop-count-${itemCount}`}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isLoading ? `${itemCount} items in cart` : `${itemCount} items in cart`}
          </motion.h2>
          <motion.p 
            className="font-courier-prime text-black text-sm mb-6"
            key={`desktop-subtotal-${subtotal}`}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            subtotal: ${subtotal.toFixed(2)}
          </motion.p>
          <Link href="/cart" className="w-full px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors font-courier-prime text-sm lowercase mb-2 text-center">
            view cart
          </Link>
          <Link href="/checkout" className="w-full px-4 py-2 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors font-courier-prime text-sm lowercase text-center">
            checkout
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 