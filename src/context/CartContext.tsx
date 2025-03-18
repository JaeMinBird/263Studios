'use client';
import { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  style: string;
  size: string;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(
        i => i.productId === item.productId && i.style === item.style && i.size === item.size
      );

      if (existingItem) {
        return currentItems.map(i => 
          i.id === existingItem.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...currentItems, { ...item, id: Date.now() }];
    });
  };

  const removeFromCart = (id: number) => {
    setItems(items => items.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      subtotal,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 