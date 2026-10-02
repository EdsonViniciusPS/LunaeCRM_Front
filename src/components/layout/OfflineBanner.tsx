'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { WifiOff, RotateCw } from 'lucide-react';

export function OfflineBanner() {
  const { isOffline, toggleOffline } = useApp();

  if (!isOffline) return null;

  return (
    <div className="w-full bg-[#F59E0B] text-[#1B1B2F] px-4 py-2 text-xs md:text-sm font-medium flex items-center justify-between shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-2 max-w-2xl mx-auto">
        <WifiOff className="w-4 h-4 shrink-0 text-[#1B1B2F]" />
        <span>
          <strong>Você está offline.</strong> Alterações serão enviadas quando a conexão voltar.
        </span>
      </div>
      <button
        onClick={toggleOffline}
        className="text-xs font-semibold underline hover:opacity-80 flex items-center gap-1 cursor-pointer shrink-0"
      >
        <RotateCw className="w-3 h-3" />
        <span>Reconectar</span>
      </button>
    </div>
  );
}
