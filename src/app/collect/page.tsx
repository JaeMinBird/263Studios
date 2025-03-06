'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

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
    jackets: useRef(null),
    shirts: useRef(null),
    pants: useRef(null)
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
      {/* Left Side - Cart Summary */}
      <div className="w-1/6 fixed left-0 top-0 h-screen p-8">
        <div className="flex flex-col h-full justify-center">
          <h2 className="font-courier-prime text-black text-sm mb-2">
            {itemsInCart} items in cart
          </h2>
          <p className="font-courier-prime text-black text-sm mb-6">
            subtotal: ${subtotal.toFixed(2)}
          </p>
          <Link 
            href="/cart"
            className="w-full px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors font-courier-prime text-sm lowercase mb-2 text-center"
          >
            view cart
          </Link>
          <button 
            className="w-full px-4 py-2 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors font-courier-prime text-sm lowercase"
          >
            checkout
          </button>
        </div>
      </div>

      {/* Center - Product Sections */}
      <div className="w-2/3 mx-auto">
        {/* Jackets Section */}
        <section 
          id="jackets" 
          ref={sectionRefs.jackets}
          className="h-screen flex items-center justify-center"
        >
          <div className="grid grid-cols-3 gap-8">
            {products.jackets.map((product, index) => (
              <div key={index} className="w-64">
                <div className="h-80 bg-gray-100 mb-2" style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover' }} />
                <div className="border-t border-black pt-2">
                  <p className="font-courier-prime text-black text-sm">{product.name}</p>
                  <p className="font-courier-prime text-gray-500 text-sm">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shirts Section */}
        <section 
          id="shirts" 
          ref={sectionRefs.shirts}
          className="h-screen flex items-center justify-center"
        >
          <div className="grid grid-cols-3 gap-8">
            {products.shirts.map((product, index) => (
              <div key={index} className="w-64">
                <div className="h-80 bg-gray-100 mb-2" style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover' }} />
                <div className="border-t border-black pt-2">
                  <p className="font-courier-prime text-black text-sm">{product.name}</p>
                  <p className="font-courier-prime text-gray-500 text-sm">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pants Section */}
        <section 
          id="pants" 
          ref={sectionRefs.pants}
          className="h-screen flex items-center justify-center"
        >
          <div className="grid grid-cols-3 gap-8">
            {products.pants.map((product, index) => (
              <div key={index} className="w-64">
                <div className="h-80 bg-gray-100 mb-2" style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover' }} />
                <div className="border-t border-black pt-2">
                  <p className="font-courier-prime text-black text-sm">{product.name}</p>
                  <p className="font-courier-prime text-gray-500 text-sm">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Side - Navigation */}
      <div className="w-1/6 fixed right-0 top-0 h-screen p-8">
        <div className="flex flex-col h-full justify-center space-y-4">
          <a 
            href="#jackets" 
            className={getNavLinkClass('jackets')}
          >
            jackets
          </a>
          <a 
            href="#shirts" 
            className={getNavLinkClass('shirts')}
          >
            shirts
          </a>
          <a 
            href="#pants" 
            className={getNavLinkClass('pants')}
          >
            pants
          </a>
        </div>
      </div>
    </div>
  );
} 