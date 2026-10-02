'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import {
  Search,
  Bell,
  Plus,
  Sun,
  Moon,
  Menu,
  Globe,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/common/Button';


export function Topbar() {
  const { user, signOut } = useAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const {
    currentModule,
    setIsGlobalSearchOpen,
    setIsNotificationsOpen,
    notifications,
    whatsAppConnected,
    toggleWhatsAppConnected,
    darkMode,
    toggleDarkMode,
    setCurrentModule,
    setIsMobileMoreOpen,
  } = useApp();


  const moduleTitles: Record<string, { title: string; subtitle?: string }> = {
    inicio: { title: 'Visão Geral', subtitle: 'Acompanhe métricas e atendimentos de hoje' },
    agenda: { title: 'Agenda', subtitle: 'Organize e acompanhe seus atendimentos' },
    whatsapp: { title: 'WhatsApp', subtitle: 'Caixa de entrada compartilhada com clientes' },
    clientes: { title: 'Clientes', subtitle: 'Fichas completas e histórico de atendimentos' },
    funil: { title: 'Funil de Vendas', subtitle: 'Acompanhe leads até virarem clientes fiéis' },
    financeiro: { title: 'Financeiro', subtitle: 'Controle de recebimentos, pendências e links Pix' },
    lembretes: { title: 'Lembretes Automáticos', subtitle: 'Configure mensagens para reduzir faltas' },
    campanhas: { title: 'Campanhas', subtitle: 'Disparos em massa com opt-out automático' },
    fidelizacao: { title: 'Fidelização', subtitle: 'Recompensas e cupons de retorno' },
    relatorios: { title: 'Relatórios', subtitle: 'Análise detalhada de performance e exportação' },
    automacoes: { title: 'Automações', subtitle: 'Fluxos automáticos Quando → Se → Então' },
    integracoes: { title: 'Integrações', subtitle: 'Conecte WhatsApp, Google Calendar e pagamentos' },
    usuarios: { title: 'Equipe e Usuários', subtitle: 'Gerencie permissões e membros' },
    permissoes: { title: 'Permissões por Função', subtitle: 'Controle de acesso por módulo' },
  };

  const currentInfo = moduleTitles[currentModule] || { title: 'Lunae CRM' };
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 glass-panel border-b border-white/60 dark:border-white/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Left: Mobile hamburger or Module Title */}

      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          onClick={() => setIsMobileMoreOpen(true)}
          className="md:hidden p-2 -ml-2 text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F] dark:hover:text-white rounded-lg touch-target flex items-center justify-center"
          aria-label="Abrir menu de módulos"
        >
          <Menu className="w-5 h-5" />
        </button>

        <img
          src="/Lunae_CRM_logo_design_2K_20261001144951-Photoroom.png"
          alt="Lunae CRM Logo"
          className="md:hidden w-8 h-8 object-contain rounded-md"
        />

        <div>
          <h1 className="text-base sm:text-lg font-bold text-[#1B1B2F] dark:text-[#ECECF5] leading-tight">
            {currentInfo.title}
          </h1>
          {currentInfo.subtitle && (
            <p className="hidden sm:block text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
              {currentInfo.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Center/Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search trigger */}
        <button
          onClick={() => setIsGlobalSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-2 text-xs text-[#6B6B80] dark:text-[#9E9EB5] glass-pill rounded-xl hover:border-[#5B4BDB]/40 transition-colors touch-target cursor-pointer"
        >
          <Search className="w-4 h-4 text-[#5B4BDB]" />
          <span className="hidden sm:inline">Buscar clientes, agenda...</span>
          <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/10">
            Ctrl K
          </kbd>
        </button>

        {/* WhatsApp Status Indicator Pill (clickable for demo testing) */}
        <button
          onClick={toggleWhatsAppConnected}
          title={
            whatsAppConnected
              ? 'WhatsApp Conectado (Clique para simular desconexão)'
              : 'WhatsApp Desconectado (Clique para reconectar)'
          }
          className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer select-none ${
            whatsAppConnected
              ? 'bg-[#14B8A6]/10 text-[#0D9488] dark:text-[#2DD4BF] border-[#14B8A6]/30 hover:bg-[#14B8A6]/20'
              : 'bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/30 animate-pulse'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              whatsAppConnected ? 'bg-[#14B8A6]' : 'bg-[#DC2626]'
            }`}
          />
          <span>{whatsAppConnected ? 'WhatsApp OK' : 'WhatsApp Off'}</span>
        </button>

        {/* Notifications Bell */}
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className="relative p-2.5 text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F] dark:hover:text-white rounded-xl hover:bg-white/50 dark:hover:bg-white/10 transition-colors touch-target flex items-center justify-center cursor-pointer"
          aria-label="Abrir notificações"
        >
          <Bell className="w-5 h-5" />
          {unreadNotifications > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#DC2626] rounded-full ring-2 ring-white dark:ring-[#1A1A2E]" />
          )}
        </button>

        {/* Quick New Appointment Button */}
        <Button
          onClick={() => setCurrentModule('agenda')}
          variant="primary"
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          className="shadow-sm font-medium"
        >
          <span className="hidden sm:inline">Novo</span> Agendamento
        </Button>

        {/* Link to Site / Sales Landing Page */}
        <Link
          href="/"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-[#5B4BDB] dark:text-[#A78BFA] glass-pill hover:bg-[#5B4BDB]/15 transition-colors"
          title="Ver Página de Vendas da Lunae"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Ver Site</span>
        </Link>

        {/* User Profile Pill / Dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full border border-white/50 dark:border-white/10 glass-pill hover:bg-white/70 dark:hover:bg-white/15 transition-all cursor-pointer shadow-xs"
            aria-label="Menu do usuário"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#5B4BDB] to-[#14B8A6] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="hidden lg:inline text-xs font-semibold text-[#1B1B2F] dark:text-white max-w-[100px] truncate">
              {user?.displayName?.split(' ')[0] || 'Minha Conta'}
            </span>
          </button>

          {/* User Dropdown */}
          {userDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-56 glass-card rounded-2xl shadow-2xl py-2 z-50 animate-scaleUp"
              onClick={() => setUserDropdownOpen(false)}
            >
              <div className="px-4 py-2 border-b border-white/40 dark:border-white/10">
                <p className="text-xs font-bold text-[#1B1B2F] dark:text-white truncate">
                  {user?.displayName || 'Usuário Lunae'}
                </p>
                <p className="text-[11px] text-[#6B6B80] dark:text-[#9E9EB5] truncate">
                  {user?.email || 'Acesso ativo'}
                </p>
                {user?.isDemo && (
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#5B4BDB]/10 text-[#5B4BDB]">
                    Modo Demonstração
                  </span>
                )}
              </div>


              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-xs text-[#1B1B2F] dark:text-white hover:bg-[#F7F7FB] dark:hover:bg-[#25253E] transition-colors"
              >
                <Globe className="w-4 h-4 text-[#5B4BDB]" />
                <span>Página de Vendas / Apresentação</span>
              </Link>

              <button
                onClick={() => toggleDarkMode()}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#1B1B2F] dark:text-white hover:bg-[#F7F7FB] dark:hover:bg-[#25253E] transition-colors text-left"
              >
                {darkMode ? <Sun className="w-4 h-4 text-[#F59E0B]" /> : <Moon className="w-4 h-4 text-[#5B4BDB]" />}
                <span>{darkMode ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}</span>
              </button>

              <div className="border-t border-[#E4E4EE] dark:border-[#2E2E48] mt-1 pt-1">
                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#DC2626] hover:bg-[#DC2626]/10 transition-colors text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair da Conta</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
