'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-md"
        >
          <div
            className="fixed inset-0"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal on desktop, Bottom Sheet on mobile (<768px) */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            className={`relative z-10 w-full ${sizeClasses[size]} glass-card rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/60 dark:border-white/10 max-h-[92vh] flex flex-col overflow-hidden`}
          >
        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-black/20 dark:bg-white/20 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between p-5 pb-3 border-b border-white/40 dark:border-white/10">
          <div>
            <h2 id="modal-title" className="text-lg font-semibold text-[#1B1B2F] dark:text-[#ECECF5]">
              {title}
            </h2>

            {description && (
              <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-0.5">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F] dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors touch-target flex items-center justify-center"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto max-h-[70vh] flex-1">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-4 px-5 bg-[#F7F7FB] dark:bg-[#121224] border-t border-[#E4E4EE] dark:border-[#2E2E48] flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  );
}
