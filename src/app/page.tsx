'use client';
import { useState, useRef } from 'react';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleHover = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return ( 
    <div className="min-h-screen font-courier-prime">
      {/* GIF Section */}
      <section className="relative h-[95vh] bg-black overflow-hidden">
        {/* Video Container */}
        <div className="absolute inset-0 w-full h-full">
          {/* Video */}
          <video 
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover transition-all duration-300 ${
              isHovered ? 'filter grayscale-[50%] blur-sm' : ''
            }`}
            preload="auto"
            controls={false}
          >
            <source src="/videos/brand.mp4" type="video/mp4" />
            <source src="/videos/brand.webp" type="video/webp" />
            <source src="/videos/brand.ogv" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="font-courier-prime text-[133.2%] inline-block relative"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            {/* Subtle Blur Background */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-lg -z-10 transition-all duration-300 group-hover:bg-black/40 group-hover:backdrop-blur-md" />
            <a 
              href="/shop"
              className="block text-white/90 hover:text-white transition-all duration-300 whitespace-nowrap relative px-4 py-2 font-medium group"
            >
              Shop Spring // Summer '25
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="pt-8 pb-16 bg-white flex flex-col items-center justify-center">
        <h2 className="text-6xl mb-2 text-gray-900 font-courier-prime">About</h2>
        
        {/* Dictionary-style breakdown */}
        <div className="mt-4 text-gray-600 text-center md:text-left font-courier-prime">
          <p className="text-base">
            <span className="font-bold">2 6 3</span> <span className="italic">(noun)</span> <span className="text-gray-500">/ tu: siks thri: /</span>
          </p>
          <p className="text-sm mt-2">
            <span className="font-bold">1.</span> a creative collective redefining modern fashion
          </p>
          <p className="text-sm mt-1">
            <span className="font-bold">2.</span> a movement blending art, culture, and innovation
          </p>
          <p className="text-sm mt-1">
            <span className="font-bold">3.</span> a student project unlike any other
          </p>
        </div>

        {/* Followup Section */}
        <div className="mt-8 text-center text-gray-600 font-courier-prime">
          <p className="font-bold">263 STUDIOS</p>
          <p className="mt-1">
            <span className="text-gray-600">a project by </span>
            <a 
              href="https://jaebirdsall.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-gray-800 relative group"
            >
              <span className="lowercase">
                jae birdsall
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-black transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </span>
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
