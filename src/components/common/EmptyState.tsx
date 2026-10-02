'use client';

import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionText,
  onAction,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-[#E4E4EE] dark:border-[#2E2E48] bg-white/50 dark:bg-[#1A1A2E]/50 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#5B4BDB]/10 text-[#5B4BDB] dark:text-[#6E60E6] flex items-center justify-center mb-4 shadow-xs">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-[#1B1B2F] dark:text-[#ECECF5] mb-1">
        {title}
      </h3>
      <p className="text-sm text-[#6B6B80] dark:text-[#9E9EB5] max-w-sm mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionText}
        </Button>
      )}
    </div>
  );
}
