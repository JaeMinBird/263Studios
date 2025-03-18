'use client';
import { useRef } from 'react';

interface ClothingHeadersProps {
  activeSection: string;
  getNavLinkClass: (section: string) => string;
  isMobile?: boolean;
}

export default function ClothingHeaders({ 
  activeSection, 
  getNavLinkClass,
  isMobile = false
}: ClothingHeadersProps) {
  if (isMobile) {
    return (
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-black">
        <nav className="flex justify-between p-4">
          <a href="#jackets" className={getNavLinkClass('jackets')}>Jackets</a>
          <a href="#shirts" className={getNavLinkClass('shirts')}>Shirts</a>
          <a href="#pants" className={getNavLinkClass('pants')}>Pants</a>
        </nav>
      </div>
    );
  }

  return (
    <div className="hidden md:block fixed right-0 top-1/2 transform -translate-y-1/2 p-4 z-40">
      <nav className="flex flex-col space-y-4">
        <a href="#jackets" className={getNavLinkClass('jackets')}>Jackets</a>
        <a href="#shirts" className={getNavLinkClass('shirts')}>Shirts</a>
        <a href="#pants" className={getNavLinkClass('pants')}>Pants</a>
      </nav>
    </div>
  );
} 