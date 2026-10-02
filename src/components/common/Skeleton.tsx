'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'line' | 'card' | 'table';
  rows?: number;
}

export function Skeleton({ className = '', variant = 'line', rows = 3 }: SkeletonProps) {
  const shimmer = 'animate-pulse bg-[#E4E4EE] dark:bg-[#2E2E48] rounded-md';

  if (variant === 'card') {
    return (
      <div className={`p-5 rounded-2xl border border-[#E4E4EE] dark:border-[#2E2E48] bg-white dark:bg-[#1A1A2E] space-y-3 ${className}`}>
        <div className={`h-4 w-1/3 ${shimmer}`} />
        <div className={`h-8 w-1/2 ${shimmer}`} />
        <div className={`h-3 w-3/4 ${shimmer}`} />
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className={`space-y-3 w-full ${className}`}>
        <div className={`h-10 w-full ${shimmer} rounded-lg`} />
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className={`h-14 w-full ${shimmer} rounded-lg opacity-80`} />
        ))}
      </div>
    );
  }

  return <div className={`${shimmer} ${className}`} />;
}
