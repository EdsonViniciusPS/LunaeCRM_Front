'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'clickable' | 'metric';
  children: React.ReactNode;
  className?: string;
}

export function Card({
  variant = 'default',
  children,
  className = '',
  ...props
}: CardProps) {
  const baseStyles =
    'glass-card rounded-2xl p-5 transition-all duration-150 relative overflow-hidden';

  const variants = {
    default: '',
    clickable:
      'cursor-pointer glass-card-hover hover:border-[#5B4BDB]/40 dark:hover:border-[#5B4BDB]/60',
    metric: 'flex flex-col justify-between',
  };


  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
