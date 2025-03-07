'use client';
import { useState, useEffect, useRef } from 'react';
import ClothingHeaders from '../../components/ClothingHeaders';
import CollectionCart from '../../components/CollectionCart';
import ItemWindow from '../../components/ItemWindow';

// Sample product data
const products = {
  jackets: [
    { id: 1, name: 'Bomber Jacket', price: 198.00, image: '/images/jacket1.jpg' },
    { id: 2, name: 'Denim Jacket', price: 168.00, image: '/images/jacket2.jpg' },
    { id: 3, name: 'Parka', price: 248.00, image: '/images/jacket3.jpg' }
  ],
  shirts: [
    { id: 4, name: 'Box Logo Tee', price: 48.00, image: '/images/shirt1.jpg' },
    { id: 5, name: 'Striped Tee', price: 58.00, image: '/images/shirt2.jpg' },
    { id: 6, name: 'Oversized Shirt', price: 78.00, image: '/images/shirt3.jpg' }
  ],
  pants: [
    { id: 7, name: 'Cargo Pants', price: 128.00, image: '/images/pants1.jpg' },
    { id: 8, name: 'Denim Jeans', price: 148.00, image: '/images/pants2.jpg' },
    { id: 9, name: 'Track Pants', price: 98.00, image: '/images/pants3.jpg' }
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
    `w-full px-4 py-2 border border-black transition-colors font-courier-prime text-sm lowercase text-center ${
      activeSection === section 
        ? 'bg-black text-white' 
        : 'bg-white text-black hover:bg-black hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-white flex">
      <CollectionCart itemsInCart={itemsInCart} subtotal={subtotal} />
      <CollectionCart itemsInCart={itemsInCart} subtotal={subtotal} isMobile />

      <div className="w-full md:w-2/3 mx-auto mt-10 md:mt-0 pb-20 md:pb-8">
        <ClothingHeaders activeSection={activeSection} getNavLinkClass={getNavLinkClass} isMobile />

        <section id="jackets" ref={sectionRefs.jackets as React.RefObject<HTMLElement>} className="pt-16 md:pt-40 pb-8 md:pb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 px-4">
            {products.jackets.map((product, index) => (
              <div key={index} className={`${
                products.jackets.length % 2 !== 0 && index === products.jackets.length - 1 
                  ? 'col-span-2 flex justify-center md:col-span-1 md:flex-none' 
                  : ''
              }`}>
                <div className={`${
                  products.jackets.length % 2 !== 0 && index === products.jackets.length - 1 
                    ? 'w-1/2 md:w-full' 
                    : 'w-full'
                }`}>
                  <ItemWindow product={product} href={`/product/${product.id}`} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="shirts" ref={sectionRefs.shirts as React.RefObject<HTMLElement>} className="pt-16 md:pt-20 pb-8 md:pb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 px-4">
            {products.shirts.map((product, index) => (
              <div key={index} className={`${
                products.shirts.length % 2 !== 0 && index === products.shirts.length - 1 
                  ? 'col-span-2 flex justify-center md:col-span-1 md:flex-none' 
                  : ''
              }`}>
                <div className={`${
                  products.shirts.length % 2 !== 0 && index === products.shirts.length - 1 
                    ? 'w-1/2 md:w-full' 
                    : 'w-full'
                }`}>
                  <ItemWindow product={product} href={`/product/${product.id}`} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pants" ref={sectionRefs.pants as React.RefObject<HTMLElement>} className="pt-16 md:pt-20 pb-8 md:pb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 px-4">
            {products.pants.map((product, index) => (
              <div key={index} className={`${
                products.pants.length % 2 !== 0 && index === products.pants.length - 1 
                  ? 'col-span-2 flex justify-center md:col-span-1 md:flex-none' 
                  : ''
              }`}>
                <div className={`${
                  products.pants.length % 2 !== 0 && index === products.pants.length - 1 
                    ? 'w-1/2 md:w-full' 
                    : 'w-full'
                }`}>
                  <ItemWindow product={product} href={`/product/${product.id}`} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <ClothingHeaders activeSection={activeSection} getNavLinkClass={getNavLinkClass} />
    </div>
  );
} 