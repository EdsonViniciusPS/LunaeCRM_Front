'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-[#6366F1] via-[#5B4BDB] to-[#14B8A6] origin-left shadow-[0_0_12px_rgba(91,75,219,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
}
