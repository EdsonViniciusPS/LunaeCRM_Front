'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

import { ModuleType } from '@/types';
import {
  Home,
  Calendar,
  MessageSquare,
  Users,
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
  Wifi,
  WifiOff,
} from 'lucide-react';

interface NavItem {
  id: ModuleType;
  label: string;
  icon: React.ReactNode;
  badge?: number | string;
}

export function Sidebar() {
  const { user, signOut } = useAuth();
  const {
    currentModule,
    setCurrentModule,
    darkMode,
    toggleDarkMode,
    isOffline,
    toggleOffline,
    whatsAppConnected,
    conversations,
  } = useApp();


  const unreadChats = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  const mainNavItems: NavItem[] = [
    { id: 'inicio', label: 'Início', icon: <Home className="w-5 h-5 shrink-0" /> },
    { id: 'agenda', label: 'Agenda', icon: <Calendar className="w-5 h-5 shrink-0" /> },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: <MessageSquare className="w-5 h-5 shrink-0" />,
      badge: unreadChats > 0 ? unreadChats : undefined,
    },
    { id: 'clientes', label: 'Clientes', icon: <Users className="w-5 h-5 shrink-0" /> },
    { id: 'funil', label: 'Funil de Vendas', icon: <GitBranch className="w-5 h-5 shrink-0" /> },
    { id: 'financeiro', label: 'Financeiro', icon: <DollarSign className="w-5 h-5 shrink-0" /> },
  ];

  const secondaryNavItems: NavItem[] = [
    { id: 'lembretes', label: 'Lembretes', icon: <BellRing className="w-5 h-5 shrink-0" /> },
    { id: 'campanhas', label: 'Campanhas', icon: <Megaphone className="w-5 h-5 shrink-0" /> },
    { id: 'fidelizacao', label: 'Fidelização', icon: <Gift className="w-5 h-5 shrink-0" /> },
    { id: 'relatorios', label: 'Relatórios', icon: <BarChart3 className="w-5 h-5 shrink-0" /> },
    { id: 'automacoes', label: 'Automações', icon: <Zap className="w-5 h-5 shrink-0" /> },
    { id: 'integracoes', label: 'Integrações', icon: <Plug className="w-5 h-5 shrink-0" /> },
  ];

  const configNavItems: NavItem[] = [
    { id: 'usuarios', label: 'Equipe', icon: <UserCheck className="w-5 h-5 shrink-0" /> },
    { id: 'permissoes', label: 'Permissões', icon: <ShieldCheck className="w-5 h-5 shrink-0" /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-[72px] lg:w-[240px] h-screen glass-panel border-r border-white/60 dark:border-white/10 shrink-0 sticky top-0 transition-all select-none z-30 shadow-lg shadow-black/5">
      {/* Brand Logo */}
      <div className="h-16 flex items-center px-4 lg:px-5 border-b border-white/40 dark:border-white/10 justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/Lunae_CRM_logo_design_2K_20261001144951-Photoroom.png"
            alt="Lunae CRM Logo"
            className="w-9 h-9 object-contain rounded-lg"
          />
          <div className="hidden lg:block">
            <span className="font-bold text-lg tracking-tight text-[#1B1B2F] dark:text-white">
              Lunae
            </span>
            <span className="text-[10px] uppercase font-bold text-[#5B4BDB] dark:text-[#6E60E6] ml-1 px-1.5 py-0.5 rounded bg-[#5B4BDB]/10">
              CRM
            </span>
          </div>
        </div>
      </div>


      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-4 px-2 lg:px-3 space-y-6">
        {/* Core Nav */}
        <div>
          <p className="hidden lg:block text-[11px] font-semibold text-[#6B6B80] dark:text-[#9E9EB5] px-3 mb-2 uppercase tracking-wider">
            Principal
          </p>
          <div className="space-y-1">
            {mainNavItems.map((item) => {
              const active = currentModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentModule(item.id)}
                  title={item.label}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer group ${active
                      ? 'bg-[#5B4BDB] text-white shadow-sm shadow-[#5B4BDB]/30'
                      : 'text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F] dark:hover:text-[#ECECF5] hover:bg-[#F7F7FB] dark:hover:bg-[#25253E]'
                    }`}
                >
                  <span className={`${active ? 'text-white' : 'text-[#6B6B80] dark:text-[#9E9EB5] group-hover:text-[#5B4BDB]'}`}>
                    {item.icon}
                  </span>
                  <span className="hidden lg:inline flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${active
                          ? 'bg-white text-[#5B4BDB]'
                          : 'bg-[#14B8A6] text-white'
                        }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modules Nav */}
        <div>
          <p className="hidden lg:block text-[11px] font-semibold text-[#6B6B80] dark:text-[#9E9EB5] px-3 mb-2 uppercase tracking-wider">
            Módulos
          </p>
          <div className="space-y-1">
            {secondaryNavItems.map((item) => {
              const active = currentModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentModule(item.id)}
                  title={item.label}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer group ${active
                      ? 'bg-[#5B4BDB] text-white shadow-sm'
                      : 'text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F] dark:hover:text-[#ECECF5] hover:bg-[#F7F7FB] dark:hover:bg-[#25253E]'
                    }`}
                >
                  <span className={`${active ? 'text-white' : 'text-[#6B6B80] dark:text-[#9E9EB5] group-hover:text-[#5B4BDB]'}`}>
                    {item.icon}
                  </span>
                  <span className="hidden lg:inline flex-1 text-left">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Config Nav */}
        <div>
          <p className="hidden lg:block text-[11px] font-semibold text-[#6B6B80] dark:text-[#9E9EB5] px-3 mb-2 uppercase tracking-wider">
            Gestão
          </p>
          <div className="space-y-1">
            {configNavItems.map((item) => {
              const active = currentModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentModule(item.id)}
                  title={item.label}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer group ${active
                      ? 'bg-[#5B4BDB] text-white shadow-sm'
                      : 'text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F] dark:hover:text-[#ECECF5] hover:bg-[#F7F7FB] dark:hover:bg-[#25253E]'
                    }`}
                >
                  <span className={`${active ? 'text-white' : 'text-[#6B6B80] dark:text-[#9E9EB5] group-hover:text-[#5B4BDB]'}`}>
                    {item.icon}
                  </span>
                  <span className="hidden lg:inline flex-1 text-left">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer controls & User Profile */}
      <div className="p-3 border-t border-white/40 dark:border-white/10 space-y-2">
        {/* Link to Landing Page */}
        <Link
          href="/"
          className="w-full flex items-center justify-center lg:justify-start gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#5B4BDB] dark:text-[#A78BFA] hover:bg-[#5B4BDB]/10 transition-colors"
          title="Ver Página de Apresentação e Vendas"
        >
          <span className="text-base shrink-0">🌐</span>
          <span className="hidden lg:inline truncate">Página de Vendas</span>
        </Link>

        {/* User Card / Logout */}
        {user ? (
          <div className="pt-1 border-t border-white/40 dark:border-white/10">
            <div className="flex items-center justify-between p-2 rounded-xl glass-card">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#5B4BDB] to-[#14B8A6] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="hidden lg:block truncate">
                  <p className="text-xs font-bold text-[#1B1B2F] dark:text-white truncate">
                    {user.displayName || 'Usuário'}
                  </p>
                  <p className="text-[10px] text-[#6B6B80] dark:text-[#9E9EB5] truncate">
                    {user.email || 'Conta ativa'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                title="Sair da conta"
                className="hidden lg:flex p-1.5 text-[#DC2626] hover:bg-[#DC2626]/10 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <span className="text-xs font-bold">Sair</span>
              </button>
            </div>
          </div>
        ) : (
          <Link
            href="/auth"
            className="w-full flex items-center justify-center lg:justify-start gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#5B4BDB] text-white hover:bg-[#4A3BC4] transition-colors shadow-sm"
          >
            <span className="hidden lg:inline">Fazer Login</span>
            <span className="lg:hidden text-xs">Entrar</span>
          </Link>
        )}


        <div className="flex items-center justify-between">
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center justify-center lg:justify-start gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#6B6B80] dark:text-[#9E9EB5] hover:bg-[#F7F7FB] dark:hover:bg-[#25253E] transition-colors"
            title="Alternar tema"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-[#F59E0B]" />
            ) : (
              <Moon className="w-4 h-4 text-[#5B4BDB]" />
            )}
            <span className="hidden lg:inline">{darkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
          </button>
        </div>

        {/* Offline simulator toggle button (for testing spec requirements) */}
        <button
          onClick={toggleOffline}
          className={`w-full flex items-center justify-center lg:justify-start gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
            isOffline
              ? 'bg-[#F59E0B]/20 text-[#B45309] dark:text-[#FBBF24]'
              : 'text-[#6B6B80] dark:text-[#9E9EB5] hover:bg-black/5 dark:hover:bg-white/5'
          }`}
          title="Simular modo offline"
        >
          {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
          <span className="hidden lg:inline">{isOffline ? 'Offline ativo' : 'Simular Offline'}</span>
        </button>
      </div>
    </aside>
  );
}
