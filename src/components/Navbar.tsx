'use client';
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
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
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-4 pt-2 pb-1 flex justify-center">
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 shadow-sm">
          <Link href="/" className="font-courier-prime text-base uppercase tracking-wider text-black">
            263 STUDIOS
          </Link>
        </div>
      </div>
    </motion.nav>
  );
} 