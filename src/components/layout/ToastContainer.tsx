'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X, Undo2 } from 'lucide-react';

export function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#14B8A6] shrink-0" />,
    danger: <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0" />,
    info: <Info className="w-5 h-5 text-[#5B4BDB] shrink-0" />,
  };

  const borders = {
    success: 'border-[#14B8A6]/30',
    danger: 'border-[#DC2626]/30',
    warning: 'border-[#F59E0B]/30',
    info: 'border-[#5B4BDB]/30',
  };

  return (
    <div
      aria-live="polite"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-4 bg-white dark:bg-[#1A1A2E] text-[#1B1B2F] dark:text-[#ECECF5] rounded-xl shadow-xl border ${borders[toast.type]} transition-all animate-in slide-in-from-bottom-4 fade-in duration-150`}
        >
          <div className="flex items-center gap-3">
            {icons[toast.type]}
            <p className="text-sm font-medium">{toast.message}</p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {toast.undoAction && (
              <button
                onClick={() => {
                  toast.undoAction?.();
                  dismissToast(toast.id);
                }}
                className="text-xs font-semibold text-[#5B4BDB] dark:text-[#6E60E6] hover:underline flex items-center gap-1 px-2 py-1 rounded bg-[#5B4BDB]/10 cursor-pointer"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span>Desfazer</span>
              </button>
            )}
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F] dark:hover:text-white rounded-md cursor-pointer"
              aria-label="Fechar notificação"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
