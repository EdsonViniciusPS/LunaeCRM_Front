'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Clock, HelpCircle } from 'lucide-react';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

export function Badge({
  variant = 'neutral',
  children,
  icon,
  className = '',
  size = 'md',
}: BadgeProps) {
  const defaultIcons = {
    success: <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />,
    warning: <AlertTriangle className="w-3.5 h-3.5 shrink-0" />,
    danger: <AlertCircle className="w-3.5 h-3.5 shrink-0" />,
    neutral: <Clock className="w-3.5 h-3.5 shrink-0" />,
  };

  const variants = {
    success: 'bg-[#14B8A6]/10 text-[#0D9488] dark:text-[#2DD4BF] border border-[#14B8A6]/20',
    warning: 'bg-[#F59E0B]/10 text-[#D97706] dark:text-[#FBBF24] border border-[#F59E0B]/20',
    danger: 'bg-[#DC2626]/10 text-[#DC2626] dark:text-[#EF4444] border border-[#DC2626]/20',
    neutral: 'bg-[#6B6B80]/10 text-[#6B6B80] dark:text-[#9E9EB5] border border-[#E4E4EE] dark:border-[#2E2E48]',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium rounded-full',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium rounded-full',
  };

  return (
    <span
      className={`inline-flex items-center ${variants[variant]} ${sizes[size]} select-none shrink-0 ${className}`}
    >
      {icon !== undefined ? icon : defaultIcons[variant]}
      <span>{children}</span>
    </span>
  );
}
