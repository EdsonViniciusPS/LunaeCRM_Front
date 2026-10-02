'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Bell, Calendar, MessageSquare, DollarSign, Check, X } from 'lucide-react';

export function NotificationDrawer() {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setCurrentModule,
  } = useApp();

  if (!isNotificationsOpen) return null;

  const categoryIcons = {
    Agenda: <Calendar className="w-4 h-4 text-[#5B4BDB]" />,
    WhatsApp: <MessageSquare className="w-4 h-4 text-[#14B8A6]" />,
    Financeiro: <DollarSign className="w-4 h-4 text-[#F59E0B]" />,
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={() => setIsNotificationsOpen(false)}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-sm sm:max-w-md glass-panel h-full shadow-2xl border-l border-white/60 dark:border-white/10 flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 px-5 border-b border-white/50 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#5B4BDB]" />
            <h2 className="text-base font-semibold text-[#1B1B2F] dark:text-[#ECECF5]">
              Notificações
            </h2>
            {unreadCount > 0 && (
              <span className="bg-[#5B4BDB] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                {unreadCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs text-[#5B4BDB] dark:text-[#A78BFA] hover:underline font-medium cursor-pointer"
              >
                Marcar lidas
              </button>
            )}
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1.5 text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F] dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
              Nenhuma notificação no momento.
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  markNotificationRead(item.id);
                  if (item.actionModule) {
                    setCurrentModule(item.actionModule);
                    setIsNotificationsOpen(false);
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  item.read
                    ? 'glass-card border-white/40 dark:border-white/5 opacity-70 hover:opacity-100'
                    : 'glass-card border-[#5B4BDB]/40 shadow-xs hover:border-[#5B4BDB]/70'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl glass-pill flex items-center justify-center shrink-0 border border-white/50 dark:border-white/10 shadow-xs">
                    {categoryIcons[item.category]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B6B80] dark:text-[#9E9EB5]">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-[#6B6B80] dark:text-[#9E9EB5]">
                        {item.time}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-[#1B1B2F] dark:text-[#ECECF5] mt-0.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white/20 dark:bg-black/20 border-t border-white/40 dark:border-white/10 text-center text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
          Notificações em tempo real do Lunae CRM
        </div>
      </div>
    </div>
  );
}
