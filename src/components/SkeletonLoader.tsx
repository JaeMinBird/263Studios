'use client';
import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 ${className}`}
      aria-hidden="true"
    />
  );
};

export const ProductSkeletonCard = () => {
  return (
    <div className="relative group cursor-pointer">
      {/* Image skeleton - match aspect ratio from ItemWindow */}
      <div className="aspect-w-3 aspect-h-4 overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="mt-2 font-courier-prime text-center px-2">
        <Skeleton className="h-4 w-3/4 mx-auto mb-1" />
        <Skeleton className="h-4 w-1/3 mx-auto" />
      </div>
    </div>
  );
};

export const SkeletonProductGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
      {[...Array(6)].map((_, index) => (
        <ProductSkeletonCard key={index} />
      ))}
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className="w-full md:w-2/3 mx-auto mt-24 md:mt-20 pb-20 md:pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 md:px-12 w-full">
        {/* Product Image - matches exact dimensions in your product page */}
        <div className="flex items-center justify-center">
          <Skeleton className="h-[240px] md:h-[360px] w-[240px] md:w-[360px]" />
        </div>
        
        {/* Product Details */}
        <div className="flex flex-col mt-8 md:mt-0">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-5 w-1/4 mb-4" />
          
          {/* Style selection */}
          <div className="mb-6">
            <Skeleton className="h-4 w-1/4 mb-2" />
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-12 border border-gray-300" />
              ))}
            </div>
          </div>
          
          {/* Size selection */}
          <div className="mb-6">
            <Skeleton className="h-4 w-1/4 mb-2" />
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-14" />
              ))}
            </div>
          </div>
          
          {/* Quantity */}
          <div className="flex items-center mb-6 space-x-2">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-10 w-28" />
          </div>
          
          {/* Add to cart button */}
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
};

export const CartSkeletonItem = () => {
  return (
    <div className="flex border-b border-black py-3 px-4">
      {/* Product image */}
      <Skeleton className="w-20 h-20 mr-4" />
      
      <div className="flex-1">
        {/* Product name */}
        <Skeleton className="h-4 w-2/3 mb-1" />
        
        {/* Size and style */}
        <Skeleton className="h-3 w-1/3 mb-1" />
        
        {/* Price */}
        <Skeleton className="h-3 w-1/4 mt-2" />
      </div>
      
      {/* Quantity */}
      <div className="flex flex-col items-end">
        <Skeleton className="h-4 w-8 mb-1" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
};

export const CartPageSkeleton = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-white">
      <div className="w-full md:w-[50%] h-[90vh] md:h-[70vh] border border-black shadow-lg bg-white flex flex-col mt-14 md:mt-0 mb-2 md:my-8 overflow-hidden">
        {/* Cart Header */}
        <div className="p-3">
          <Skeleton className="h-6 w-16 mx-auto" />
        </div>
        <div className="border-b border-black -mx-3"></div>
        
        {/* Items Count */}
        <div className="p-2">
          <Skeleton className="h-4 w-40 ml-1" />
        </div>
        <div className="border-b border-black -mx-3"></div>
        
        {/* Items List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-0 pb-4">
            {[...Array(3)].map((_, i) => (
              <CartSkeletonItem key={i} />
            ))}
          </div>
        </div>
        
        {/* Subtotal */}
        <div className="border-t border-black">
          <div className="p-3 flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        
        {/* Buttons */}
        <div className="p-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <Skeleton className="h-4 w-48" />
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Skeleton className="h-10 w-full md:w-32" />
              <Skeleton className="h-10 w-full md:w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ShopPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Side Cart Area (hidden on mobile) */}
      <div className="w-1/6 fixed left-0 top-0 h-screen p-8 hidden md:block">
        <div className="flex flex-col h-full justify-center">
          <Skeleton className="h-4 w-36 mb-2" />
          <Skeleton className="h-4 w-24 mb-6" />
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      
      <div className="w-full md:w-2/3 mx-auto mt-10 md:mt-0 pb-20 md:pb-8">
        {/* Jackets Section */}
        <section id="jackets" className="pt-16 md:pt-40 pb-8 md:pb-12">
          <h2 className="text-2xl mb-8 text-center font-courier-prime">
            <Skeleton className="h-8 w-32 mx-auto" />
          </h2>
          <SkeletonProductGrid />
        </section>
        
        {/* Shirts Section */}
        <section id="shirts" className="pt-16 pb-8 md:pb-12">
          <h2 className="text-2xl mb-8 text-center font-courier-prime">
            <Skeleton className="h-8 w-32 mx-auto" />
          </h2>
          <SkeletonProductGrid />
        </section>
        
        {/* Pants Section */}
        <section id="pants" className="pt-16 pb-8 md:pb-12">
          <h2 className="text-2xl mb-8 text-center font-courier-prime">
            <Skeleton className="h-8 w-32 mx-auto" />
          </h2>
          <SkeletonProductGrid />
        </section>
      </div>
    </div>
  );
}; 