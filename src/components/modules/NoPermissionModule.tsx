'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/common/Button';

export function NoPermissionModule() {
  const { setCurrentModule, showToast } = useApp();

  const handleRequestAccess = () => {
    showToast('Solicitação de acesso enviada para o administrador.', 'success');
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-md mx-auto space-y-4 animate-in fade-in duration-150">
      <div className="w-16 h-16 rounded-2xl bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center shadow-xs">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <h2 className="text-xl font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
          Sem acesso
        </h2>
        <p className="text-xs sm:text-sm text-[#6B6B80] dark:text-[#9E9EB5] leading-relaxed">
          Você não tem acesso a esta área. Peça ao administrador para liberar.
        </p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center gap-2 w-full justify-center">
        <Button
          variant="secondary"
          size="md"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => setCurrentModule('inicio')}
        >
          Voltar ao Início
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={handleRequestAccess}
        >
          Solicitar acesso
        </Button>
      </div>
    </div>
  );
}
