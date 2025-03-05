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
      className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-center">
        <Link href="/" className="font-hanken-grotesk text-xl uppercase tracking-wider text-black">
          263 STUDIOS
        </Link>
      </div>
    </motion.nav>
  );
} 