'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
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
  addToCart: (item: Omit<CartItem, 'id'>) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  subtotal: number;
  itemCount: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  // Load cart on initial render
  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    setIsLoading(true);
    try {
      const response = await fetch('/api/cart');
      if (!response.ok) throw new Error('Failed to fetch cart');
      const data = await response.json();
      setItems(data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addToCart(item: Omit<CartItem, 'id'>) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          style: item.style
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to add item to cart: ${errorData.error || response.statusText}`);
      }
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function removeFromCart(id: number) {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to remove item from cart');
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateQuantity(id: number, quantity: number) {
    setIsLoading(true);
    try {
      console.log(`Updating item ${id} to quantity ${quantity}`);
      
      const response = await fetch(`/api/cart/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update cart item: ${errorData.error || response.statusText}`);
      }
      
      // Update local state without refetching
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function clearCart() {
    setIsLoading(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to clear cart');
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
        isLoading
      }}
    >
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