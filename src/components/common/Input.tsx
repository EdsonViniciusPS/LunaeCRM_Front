'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export function Input({
  label,
  error,
  helperText,
  icon,
  className = '',
  id,
  disabled,
  ...props
}: InputProps) {
  const generatedId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={generatedId}
          className="text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5] flex items-center gap-1"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 pointer-events-none text-[#6B6B80] dark:text-[#9E9EB5]">
            {icon}
          </div>
        )}
        <input
          id={generatedId}
          disabled={disabled}
          className={`w-full min-h-[44px] rounded-lg border bg-white dark:bg-[#1A1A2E] text-[#1B1B2F] dark:text-[#ECECF5] text-sm md:text-sm placeholder:text-[#6B6B80]/60 dark:placeholder:text-[#9E9EB5]/50 px-3.5 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5B4BDB] disabled:opacity-50 disabled:bg-[#F7F7FB] dark:disabled:bg-[#121224] disabled:cursor-not-allowed ${
            icon ? 'pl-10' : ''
          } ${
            error
              ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20'
              : 'border-[#E4E4EE] dark:border-[#2E2E48] hover:border-[#6B6B80]/40'
          } ${className}`}
          {...props}
        />
      </div>

      {error ? (
        <div className="flex items-center gap-1.5 text-xs text-[#DC2626] font-medium mt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">{helperText}</p>
      ) : null}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Select({
  label,
  error,
  helperText,
  children,
  className = '',
  id,
  disabled,
  ...props
}: SelectProps) {
  const generatedId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={generatedId}
          className="text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5]"
        >
          {label}
        </label>
      )}
      <select
        id={generatedId}
        disabled={disabled}
        className={`w-full min-h-[44px] rounded-lg border bg-white dark:bg-[#1A1A2E] text-[#1B1B2F] dark:text-[#ECECF5] text-sm px-3.5 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5B4BDB] disabled:opacity-50 disabled:bg-[#F7F7FB] dark:disabled:bg-[#121224] ${
          error
            ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20'
            : 'border-[#E4E4EE] dark:border-[#2E2E48] hover:border-[#6B6B80]/40'
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error ? (
        <div className="flex items-center gap-1.5 text-xs text-[#DC2626] font-medium mt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">{helperText}</p>
      ) : null}
    </div>
  );
}
