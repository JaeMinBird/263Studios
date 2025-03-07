'use client';
import { useState, useEffect, useRef } from 'react';
import ClothingHeaders from '../../components/ClothingHeaders';
import CollectionCart from '../../components/CollectionCart';
import ItemWindow from '../../components/ItemWindow';

// Sample product data
const products = {
  jackets: [
    { name: 'Bomber Jacket', price: 198.00, image: '/images/jacket1.jpg' },
    { name: 'Denim Jacket', price: 168.00, image: '/images/jacket2.jpg' },
    { name: 'Parka', price: 248.00, image: '/images/jacket3.jpg' }
  ],
  shirts: [
    { name: 'Box Logo Tee', price: 48.00, image: '/images/shirt1.jpg' },
    { name: 'Striped Tee', price: 58.00, image: '/images/shirt2.jpg' },
    { name: 'Oversized Shirt', price: 78.00, image: '/images/shirt3.jpg' }
  ],
  pants: [
    { name: 'Cargo Pants', price: 128.00, image: '/images/pants1.jpg' },
    { name: 'Denim Jeans', price: 148.00, image: '/images/pants2.jpg' },
    { name: 'Track Pants', price: 98.00, image: '/images/pants3.jpg' }
  ]
};

export default function CollectPage() {
  const [itemsInCart] = useState(3);
  const [subtotal] = useState(394.00);
  const [activeSection, setActiveSection] = useState('jackets');
  const sectionRefs = {
    jackets: useRef<HTMLElement>(null),
    shirts: useRef<HTMLElement>(null),
    pants: useRef<HTMLElement>(null)
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const getNavLinkClass = (section: string) => 
    `w-full px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors font-courier-prime text-sm lowercase text-center ${
      activeSection === section ? 'bg-black text-white' : ''
    }`;

  return (
    <div className="min-h-screen bg-white flex">
      <CollectionCart itemsInCart={itemsInCart} subtotal={subtotal} />
      <CollectionCart itemsInCart={itemsInCart} subtotal={subtotal} isMobile />

      <div className="w-full md:w-2/3 mx-auto mt-10 md:mt-0">
        <ClothingHeaders activeSection={activeSection} getNavLinkClass={getNavLinkClass} isMobile />

        <ItemWindow sectionId="jackets" sectionRef={sectionRefs.jackets as React.RefObject<HTMLElement>} products={products.jackets} />
        <ItemWindow sectionId="shirts" sectionRef={sectionRefs.shirts as React.RefObject<HTMLElement>} products={products.shirts} />
        <ItemWindow sectionId="pants" sectionRef={sectionRefs.pants as React.RefObject<HTMLElement>} products={products.pants} />
      </div>

      <ClothingHeaders activeSection={activeSection} getNavLinkClass={getNavLinkClass} />
    </div>
  );
} 