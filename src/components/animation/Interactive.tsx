'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { triggerConfetti } from '@/lib/confetti';

interface MotionButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  celebrate?: boolean;
  className?: string;
}

export function MotionButton({
  children,
  celebrate = false,
  onClick,
  className = '',
  ...props
}: MotionButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (celebrate) {
      const rect = e.currentTarget.getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;
      triggerConfetti({ x: originX, y: originY });
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

interface FloatingElementProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export function FloatingElement({
  children,
  delay = 0,
  duration = 4,
  distance = 8,
  className = '',
  ...props
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
        delay,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
