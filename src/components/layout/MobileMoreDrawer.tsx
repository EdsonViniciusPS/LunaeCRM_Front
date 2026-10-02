'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ModuleType } from '@/types';
import {
  GitBranch,
  DollarSign,
  BellRing,
  Megaphone,
  Gift,
  BarChart3,
  Zap,
  Plug,
  UserCheck,
  ShieldCheck,
  Moon,
  Sun,
  WifiOff,
  Wifi,
  X,
} from 'lucide-react';

export function MobileMoreDrawer() {
  const {
    isMobileMoreOpen,
    setIsMobileMoreOpen,
    currentModule,
    setCurrentModule,
    darkMode,
    toggleDarkMode,
    isOffline,
    toggleOffline,
  } = useApp();

  if (!isMobileMoreOpen) return null;

  const moreItems: Array<{ id: ModuleType; label: string; icon: React.ReactNode; desc: string }> = [
    {
      id: 'funil',
      label: 'Funil de Vendas',
      icon: <GitBranch className="w-5 h-5 text-[#5B4BDB]" />,
      desc: 'Kanban de leads até clientes',
    },
    {
      id: 'financeiro',
      label: 'Financeiro',
      icon: <DollarSign className="w-5 h-5 text-[#14B8A6]" />,
      desc: 'Recebimentos e links Pix',
    },
    {
      id: 'lembretes',
      label: 'Lembretes',
      icon: <BellRing className="w-5 h-5 text-[#F59E0B]" />,
      desc: 'Redução de faltas por WhatsApp',
    },
    {
      id: 'campanhas',
      label: 'Campanhas',
      icon: <Megaphone className="w-5 h-5 text-[#5B4BDB]" />,
      desc: 'Disparos em massa com opt-out',
    },
    {
      id: 'fidelizacao',
      label: 'Fidelização',
      icon: <Gift className="w-5 h-5 text-[#14B8A6]" />,
      desc: 'Pontos e catálogo de prêmios',
    },
    {
      id: 'relatorios',
      label: 'Relatórios',
      icon: <BarChart3 className="w-5 h-5 text-[#5B4BDB]" />,
      desc: 'Métricas e exportação PDF/CSV',
    },
    {
      id: 'automacoes',
      label: 'Automações',
      icon: <Zap className="w-5 h-5 text-[#F59E0B]" />,
      desc: 'Quando → Se → Então',
    },
    {
      id: 'integracoes',
      label: 'Integrações',
      icon: <Plug className="w-5 h-5 text-[#6B6B80]" />,
      desc: 'Google Calendar, Pagamentos',
    },
    {
      id: 'usuarios',
      label: 'Equipe',
      icon: <UserCheck className="w-5 h-5 text-[#5B4BDB]" />,
      desc: 'Usuários e acessos',
    },
    {
      id: 'permissoes',
      label: 'Permissões',
      icon: <ShieldCheck className="w-5 h-5 text-[#14B8A6]" />,
      desc: 'Controle de papéis por módulo',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50 backdrop-blur-md md:hidden animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={() => setIsMobileMoreOpen(false)}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full glass-panel rounded-t-3xl shadow-2xl border-t border-white/60 dark:border-white/10 max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-[#E4E4EE] dark:bg-[#2E2E48] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/40 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <img
              src="/Lunae_CRM_logo_design_2K_20261001144951-Photoroom.png"
              alt="Lunae CRM Logo"
              className="w-7 h-7 object-contain rounded-md"
            />
            <h2 className="text-base font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
              Mais Módulos
            </h2>
          </div>
          <button
            onClick={() => setIsMobileMoreOpen(false)}
            className="p-1.5 text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid list */}
        <div className="p-4 overflow-y-auto max-h-[60vh] space-y-1">
          {moreItems.map((item) => {
            const active = currentModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentModule(item.id);
                  setIsMobileMoreOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 p-3 rounded-2xl text-left transition-all cursor-pointer touch-target ${
                  active
                    ? 'glass-card border border-[#5B4BDB]/40 text-[#5B4BDB] font-semibold shadow-xs'
                    : 'hover:bg-white/40 dark:hover:bg-white/5 text-[#1B1B2F] dark:text-[#ECECF5]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl glass-pill flex items-center justify-center shrink-0 border border-white/50 dark:border-white/10">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">{item.label}</div>
                  <div className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] truncate">
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile quick actions */}
        <div className="p-4 border-t border-white/40 dark:border-white/10 grid grid-cols-2 gap-2 bg-white/20 dark:bg-black/20">
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-white/50 dark:border-white/10 glass-pill text-xs font-medium text-[#1B1B2F] dark:text-[#ECECF5] touch-target cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#F59E0B]" /> : <Moon className="w-4 h-4 text-[#5B4BDB]" />}
            <span>{darkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
          </button>
          <button
            onClick={toggleOffline}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-white/50 dark:border-white/10 glass-pill text-xs font-medium text-[#1B1B2F] dark:text-[#ECECF5] touch-target cursor-pointer"
          >
            {isOffline ? <WifiOff className="w-4 h-4 text-[#F59E0B]" /> : <Wifi className="w-4 h-4 text-[#14B8A6]" />}
            <span>{isOffline ? 'Offline ativo' : 'Simular Offline'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
