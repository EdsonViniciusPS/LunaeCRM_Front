'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Home, Calendar, MessageSquare, Users, MoreHorizontal } from 'lucide-react';
import { ModuleType } from '@/types';

export function MobileBottomNav() {
  const {
    currentModule,
    setCurrentModule,
    isMobileMoreOpen,
    setIsMobileMoreOpen,
    conversations,
  } = useApp();

  const unreadChats = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  const navItems: Array<{ id: ModuleType | 'mais'; label: string; icon: React.ReactNode; badge?: number }> = [
    { id: 'inicio', label: 'Início', icon: <Home className="w-5 h-5" /> },
    { id: 'agenda', label: 'Agenda', icon: <Calendar className="w-5 h-5" /> },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: <MessageSquare className="w-5 h-5" />,
      badge: unreadChats > 0 ? unreadChats : undefined,
    },
    { id: 'clientes', label: 'Clientes', icon: <Users className="w-5 h-5" /> },
    { id: 'mais', label: 'Mais', icon: <MoreHorizontal className="w-5 h-5" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 glass-panel border-t border-white/60 dark:border-white/10 z-40 flex items-center justify-around px-2 shadow-2xl backdrop-blur-xl">
      {navItems.map((item) => {

        const isActive =
          item.id === 'mais'
            ? isMobileMoreOpen
            : currentModule === item.id && !isMobileMoreOpen;

        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === 'mais') {
                setIsMobileMoreOpen(true);
              } else {
                setIsMobileMoreOpen(false);
                setCurrentModule(item.id as ModuleType);
              }
            }}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 gap-1 text-[11px] font-medium transition-colors select-none touch-target ${
              isActive
                ? 'text-[#5B4BDB] dark:text-[#6E60E6]'
                : 'text-[#6B6B80] dark:text-[#9E9EB5]'
            }`}
          >
            <div className="relative">
              {item.icon}
              {item.badge && (
                <span className="absolute -top-1.5 -right-2 bg-[#14B8A6] text-white text-[9px] font-bold px-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
