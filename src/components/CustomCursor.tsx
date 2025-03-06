'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring animation for position
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 8);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    
    // Add hover listeners to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999]"
      style={{
        x: springX,
        y: springY,
        transform: 'translate(-50%, -50%)'
      }}
      animate={{
        scale: isHovering ? 1.95 : 1.3, // 30% larger base size (1.3) and scaled hover size
        opacity: isHovering ? 0.8 : 1
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      <div className="w-5 h-5 border border-white rounded-full" />
    </motion.div>
  );
} 