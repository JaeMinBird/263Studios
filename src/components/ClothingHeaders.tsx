'use client';
import { useRef } from 'react';

interface ClothingHeadersProps {
  activeSection: string;
  getNavLinkClass: (section: string) => string;
  isMobile?: boolean;
}

export default function ClothingHeaders({ activeSection, getNavLinkClass, isMobile = false }: ClothingHeadersProps) {
  if (isMobile) {
    return (
      <div className="md:hidden sticky top-[3rem] z-10 pb-4 pt-8">
        <div className="flex justify-center space-x-4 px-4">
          <a href="#jackets" className={getNavLinkClass('jackets')}>jackets</a>
          <a href="#shirts" className={getNavLinkClass('shirts')}>shirts</a>
          <a href="#pants" className={getNavLinkClass('pants')}>pants</a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-1/6 fixed right-0 top-0 h-screen p-8 hidden md:block">
      <div className="flex flex-col h-full justify-center space-y-4">
        <a href="#jackets" className={getNavLinkClass('jackets')}>jackets</a>
        <a href="#shirts" className={getNavLinkClass('shirts')}>shirts</a>
        <a href="#pants" className={getNavLinkClass('pants')}>pants</a>
      </div>
    </div>
  );
} 