'use client';
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isMobile) return; // Disable hide on mobile
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
      style={{
        backgroundColor: 'transparent',
        borderBottom: 'none',
        paddingTop: isMobile ? '1rem' : '0',
        paddingBottom: '0'
      }}
      variants={{
        visible: { y: 0 },
        hidden: { y: "calc(-150%)" },
      }}
      animate={isMobile ? "visible" : hidden ? "hidden" : "visible"}
      transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-4 pt-2 pb-1 flex justify-around items-center">
        {/* Collect - Left Side */}
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 shadow-sm">
          <Link href="/collect" className="font-courier-prime text-base lowercase tracking-wider text-black">
            shop
          </Link>
        </div>
        {/* 263 STUDIOS - Center */}
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 shadow-sm">
          <Link href="/" className="font-courier-prime text-base uppercase tracking-wider text-black">
            263 STUDIOS
          </Link>
        </div>
        {/* Cart - Right Side */}
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 shadow-sm">
          <Link href="/cart" className="font-courier-prime text-base lowercase tracking-wider text-black">
            cart
          </Link>
        </div>
      </div>
    </motion.nav>
  );
} 