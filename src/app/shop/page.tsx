'use client';
import { useState, useEffect, useRef } from 'react';
import ClothingHeaders from '../../components/ClothingHeaders';
import CollectionCart from '../../components/SideCart';
import ItemWindow from '../../components/ItemWindow';
import { useCart } from '@/context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  styles: Array<{ name: string; image: string }>;
  sizes: Array<{ name: string }>;
}

interface ProductCategories {
  jackets: Product[];
  shirts: Product[];
  pants: Product[];
}

export default function ShopPage() {
  const [products, setProducts] = useState<ProductCategories>({
    jackets: [],
    shirts: [],
    pants: []
  });
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('jackets');
  
  const { itemCount, subtotal } = useCart();
  
  const sectionRefs = {
    jackets: useRef<HTMLElement>(null),
    shirts: useRef<HTMLElement>(null),
    pants: useRef<HTMLElement>(null)
  };

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white flex">
      <CollectionCart isMobile />
      <CollectionCart />

      <div className="w-full md:w-2/3 mx-auto mt-10 md:mt-0 pb-20 md:pb-8">
        <ClothingHeaders activeSection={activeSection} getNavLinkClass={getNavLinkClass} isMobile />

        <section id="jackets" ref={sectionRefs.jackets as React.RefObject<HTMLElement>} className="pt-16 md:pt-40 pb-8 md:pb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 px-4">
            {products.jackets.map((product, index) => (
              <div key={product.id} className={`${
                products.jackets.length % 2 !== 0 && index === products.jackets.length - 1 
                  ? 'col-span-2 flex justify-center md:col-span-1 md:flex-none' 
                  : ''
              }`}>
                <div className={`${
                  products.jackets.length % 2 !== 0 && index === products.jackets.length - 1 
                    ? 'w-1/2 md:w-full' 
                    : 'w-full'
                }`}>
                  <ItemWindow 
                    product={product} 
                    href={`/product/${product.id}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="shirts" ref={sectionRefs.shirts as React.RefObject<HTMLElement>} className="pt-16 md:pt-20 pb-8 md:pb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 px-4">
            {products.shirts.map((product, index) => (
              <div key={product.id} className={`${
                products.shirts.length % 2 !== 0 && index === products.shirts.length - 1 
                  ? 'col-span-2 flex justify-center md:col-span-1 md:flex-none' 
                  : ''
              }`}>
                <div className={`${
                  products.shirts.length % 2 !== 0 && index === products.shirts.length - 1 
                    ? 'w-1/2 md:w-full' 
                    : 'w-full'
                }`}>
                  <ItemWindow 
                    product={product} 
                    href={`/product/${product.id}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pants" ref={sectionRefs.pants as React.RefObject<HTMLElement>} className="pt-16 md:pt-20 pb-8 md:pb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 px-4">
            {products.pants.map((product, index) => (
              <div key={product.id} className={`${
                products.pants.length % 2 !== 0 && index === products.pants.length - 1 
                  ? 'col-span-2 flex justify-center md:col-span-1 md:flex-none' 
                  : ''
              }`}>
                <div className={`${
                  products.pants.length % 2 !== 0 && index === products.pants.length - 1 
                    ? 'w-1/2 md:w-full' 
                    : 'w-full'
                }`}>
                  <ItemWindow 
                    product={product} 
                    href={`/product/${product.id}`}
                  />
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