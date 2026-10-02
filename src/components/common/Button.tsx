'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#5B4BDB] focus:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none cursor-pointer select-none';

  const variants = {
    primary: 'bg-[#5B4BDB] hover:bg-[#4A3BC4] text-white shadow-sm',
    secondary: 'bg-white dark:bg-[#1A1A2E] text-[#1B1B2F] dark:text-[#ECECF5] border border-[#E4E4EE] dark:border-[#2E2E48] hover:bg-[#F7F7FB] dark:hover:bg-[#25253E] shadow-sm',
    ghost: 'bg-transparent text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F] dark:hover:text-[#ECECF5] hover:bg-black/5 dark:hover:bg-white/5',
    danger: 'bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-sm',
  };

  const sizes = {
    sm: 'text-xs h-9 px-3 gap-1.5 min-w-[36px]',
    md: 'text-sm h-11 px-4 gap-2 min-h-[44px]', // Mobile-first >= 44px
    lg: 'text-base h-12 px-6 gap-2.5 min-h-[48px]',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>Aguarde...</span>
        </>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
