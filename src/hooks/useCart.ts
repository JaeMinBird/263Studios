import { useState, useEffect } from 'react';
import { db, doc, setDoc, getDoc } from '@/services/firebase';
import { getAuth } from 'firebase/auth';
import { CartItem } from '@/types';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = async (product: CartItem) => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      const docRef = doc(db, 'carts', user.uid);
      const docSnap = await getDoc(docRef);
      
      const currentCart = docSnap.exists() ? docSnap.data().items : [];
      const updatedCart = [...currentCart, product];
      
      await setDoc(docRef, { items: updatedCart });
      setCart(updatedCart);
    }
  };

  const removeFromCart = async (productId: string) => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      const docRef = doc(db, 'carts', user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const updatedCart = docSnap.data().items.filter((item: CartItem) => item.id !== productId);
        await setDoc(docRef, { items: updatedCart });
        setCart(updatedCart);
      }
    }
  };

  return { cart, addToCart, removeFromCart };
} 